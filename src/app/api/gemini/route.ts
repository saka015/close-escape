import { NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  Content,
  GenerateContentResult,
} from "@google/generative-ai";

// Ensure API key exists
const API_KEY = "AIzaSyAV4MROWliABDoGF5jGPiu1xc1UdLM6Ibc";

// Initialize Google Generative AI with error handling
function initializeGeminiAPI() {
  if (!API_KEY) {
    // Log error server-side for debugging, but don't expose key details
    console.error(
      "FATAL ERROR: GEMINI_API_KEY is missing in environment variables."
    );
    return null;
  }
  return new GoogleGenerativeAI(API_KEY);
}

const genAI = initializeGeminiAPI();
const model = genAI?.getGenerativeModel({ model: "gemini-2.0-flash" }); // Initialize model once

// Helper function to extract JSON reliably
function extractJson(text: string): any | null {
  // 1. Try direct parsing (most efficient if the response is clean JSON)
  try {
    return JSON.parse(text);
  } catch (e) {
    /* ignore and try next method */
  }

  // 2. Try extracting from markdown code blocks (```json ... ```)
  const codeBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch && codeBlockMatch[1]) {
    try {
      return JSON.parse(codeBlockMatch[1]);
    } catch (e) {
      /* ignore and try next method */
    }
  }

  // 3. Try finding the first '{' and last '}' or first '[' and last ']' as a fallback
  // Note: This is still less reliable but better than the original regex
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  const firstBracket = text.indexOf("[");
  const lastBracket = text.lastIndexOf("]");

  let jsonText = null;

  // Prioritize array if found
  if (firstBracket !== -1 && lastBracket > firstBracket) {
    jsonText = text.substring(firstBracket, lastBracket + 1);
  } else if (firstBrace !== -1 && lastBrace > firstBrace) {
    jsonText = text.substring(firstBrace, lastBrace + 1);
  }

  if (jsonText) {
    try {
      return JSON.parse(jsonText);
    } catch (e) {
      /* ignore, parsing failed */
    }
  }

  // 4. If none worked, return null
  console.warn("Could not extract valid JSON from Gemini response.");
  return null;
}

export async function POST(request: Request) {
  console.log("API Key available:", !!API_KEY);
  console.log("API Key length:", API_KEY?.length);

  // Check if API was initialized properly
  if (!genAI || !model) {
    console.error("Gemini API initialization failed - API key may be invalid");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const { prompt, budget, distance, location } = await request.json();

    // Create a more structured prompt to get better JSON responses
    const structuredPrompt = `
      You are a travel recommendation system. Based on the following criteria:
      - Budget: Around ₹${budget}
      - Distance: Within ${distance} km of ${
      location?.city ||
      `coordinates (${location?.latitude}, ${location?.longitude})`
    }

      Suggest exactly 6 travel destinations.

      IMPORTANT: Respond ONLY with a valid JSON array of objects with this exact structure:
      [
        {
          "destination": "Name of Place",
          "description": "Brief description of the place",
          "estimatedCost": "₹X,XXX approx",
          "travelTime": "X hours Y mins"
        },
        ...
      ]

      Do not include any text before or after the JSON array. No markdown formatting, no explanations.
    `;

    console.log("Sending structured prompt to Gemini:", structuredPrompt);

    const result = await model.generateContent(structuredPrompt);
    const response = await result.response;
    const text = response.text();

    console.log("Raw Gemini response:", text);

    // Attempt to parse JSON using the helper function
    const parsedData = extractJson(text);

    // Validate the parsed data structure
    if (parsedData && Array.isArray(parsedData) && parsedData.length > 0) {
      // Ensure each suggestion has the required fields
      const validSuggestions = parsedData.filter(
        (item) =>
          item &&
          typeof item.destination === "string" &&
          typeof item.description === "string" &&
          typeof item.estimatedCost === "string" &&
          typeof item.travelTime === "string"
      );

      if (validSuggestions.length > 0) {
        return NextResponse.json({ suggestions: validSuggestions });
      }
    }

    // If we couldn't get valid suggestions, create fallback suggestions
    const fallbackSuggestions = [
      {
        destination: "Local Park",
        description:
          "A peaceful park within your city with walking trails and picnic areas.",
        estimatedCost: "₹500 approx",
        travelTime: "15-30 mins",
      },
      {
        destination: "Nearby Town",
        description:
          "A charming town with local markets and cultural attractions.",
        estimatedCost: `₹${Math.floor(budget / 3)} approx`,
        travelTime: `${Math.floor(distance / 30)} hours`,
      },
      {
        destination: "Nature Reserve",
        description:
          "Beautiful natural area with hiking trails and wildlife viewing opportunities.",
        estimatedCost: `₹${Math.floor(budget / 2)} approx`,
        travelTime: `${Math.floor(distance / 40)} hours 30 mins`,
      },
    ];

    console.log("Using fallback suggestions due to invalid AI response");
    return NextResponse.json({
      suggestions: fallbackSuggestions,
      note:
        "These are fallback suggestions as the AI response format was invalid.",
    });
  } catch (error) {
    console.error("Error calling Gemini API or processing request:", error);

    // More detailed error handling
    let errorMessage =
      "Failed to get trip suggestions due to an internal server error.";
    let statusCode = 500;

    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string"
    ) {
      console.error("Specific Error:", error.message);

      // Handle specific error cases
      if (error.message.includes("API key not valid")) {
        errorMessage = "Server configuration error: Invalid API Key.";
      } else if (error.message.includes("Request timed out")) {
        errorMessage = "Request to AI service timed out. Please try again.";
        statusCode = 503; // Service Unavailable
      } else if (error.message.includes("quota")) {
        errorMessage = "AI service quota exceeded. Please try again later.";
        statusCode = 429; // Too Many Requests
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
