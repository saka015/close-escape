"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Define the type for the API response
type TripSuggestion = {
  destination: string;
  description: string;
  estimatedCost: string;
  travelTime: string;
};

// Add these missing type definitions
type ApiResponse = {
  suggestions: TripSuggestion[];
};

type ApiErrorResponse = {
  error: string;
  rawResponse?: string;
};

type Location = {
  latitude: number;
  longitude: number;
  city?: string;
  loading: boolean;
  error: string | null;
};

export default function ExplorePage() {
  const [budget, setBudget] = useState(10000);
  const [distance, setDistance] = useState(15);
  const [loading, setLoading] = useState(false);
  const [tripSuggestions, setTripSuggestions] = useState<TripSuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [rawErrorResponse, setRawErrorResponse] = useState<string | null>(null);
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
    city: undefined,
    loading: true,
    error: null,
  });

  // Get user's location when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      setLocation((prev) => ({ ...prev, loading: true, error: null }));

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Try to get city name using reverse geocoding
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
            );
            const data = await response.json();
            const city =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              "your location";

            setLocation({
              latitude,
              longitude,
              city,
              loading: false,
              error: null,
            });
          } catch (error) {
            // If reverse geocoding fails, still set coordinates
            setLocation({
              latitude,
              longitude,
              loading: false,
              error: null,
            });
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation({
            latitude: 0,
            longitude: 0,
            loading: false,
            error:
              "Could not access your location. Please enable location services.",
          });
        }
      );
    } else {
      setLocation({
        latitude: 0,
        longitude: 0,
        loading: false,
        error: "Geolocation is not supported by your browser.",
      });
    }
  }, []);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(parseInt(e.target.value));
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(parseInt(e.target.value));
  };

  const findTrips = async () => {
    setLoading(true);
    setError(null);
    setRawErrorResponse(null);
    setTripSuggestions([]);

    // Don't proceed if we don't have location
    if (location.error) {
      setError(location.error);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget,
          distance,
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
            city: location.city,
          },
          prompt: `Suggest 3 travel destinations within ${distance} km of ${
            location.city ||
            `coordinates (${location.latitude}, ${location.longitude})`
          } that would cost around ₹${budget}. Provide 'destination', 'description', 'estimatedCost', and 'travelTime'.`,
        }),
      });

      const data: ApiResponse | ApiErrorResponse = await response.json();
      console.log("API Response Data:", data);

      if (!response.ok) {
        let message = `API request failed with status ${response.status}`;
        if ("error" in data && data.error) {
          message = data.error;
          if (data.rawResponse) {
            setRawErrorResponse(data.rawResponse);
            console.error("Raw response from failed API:", data.rawResponse);
          }
        }
        throw new Error(message);
      }

      if ("suggestions" in data && data.suggestions) {
        if (!Array.isArray(data.suggestions)) {
          console.error(
            "API returned suggestions but it's not an array:",
            data.suggestions
          );
          throw new Error("Received invalid suggestions format from server.");
        }
        const validSuggestions = data.suggestions.filter(
          (s) =>
            s &&
            typeof s.destination === "string" &&
            typeof s.description === "string"
        );
        setTripSuggestions(validSuggestions);
        if (validSuggestions.length !== data.suggestions.length) {
          console.warn(
            "Some suggestions were filtered out due to invalid format."
          );
        }
      } else {
        throw new Error("Received unexpected response format from server.");
      }
    } catch (error) {
      console.error("Error finding trips:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An unknown error occurred while fetching trip suggestions"
      );
      setTripSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-48 mx-auto p-6 flex flex-col gap-8 bg-[#102A26] text-[#F1FAEE] min-h-screen">
      <h1 className="text-3xl mb-6 text-center font-bold animate-fadeDown">
        Explore Trips
      </h1>

      {/* Location Status */}
      <div className="p-4 bg-[rgba(27,77,62,0.3)] rounded-lg text-center">
        {location.loading ? (
          <p>Detecting your location...</p>
        ) : location.error ? (
          <p className="text-red-400">{location.error}</p>
        ) : (
          <p>
            Finding trips near{" "}
            {location.city ||
              `your location (${location.latitude.toFixed(
                4
              )}, ${location.longitude.toFixed(4)})`}
          </p>
        )}
      </div>

      {/* Budget Slider */}
      <div className="flex flex-col gap-4 p-6 bg-[rgba(27,77,62,0.3)] rounded-lg">
        <label htmlFor="budget" className="text-lg font-medium">
          Budget: ₹{budget.toLocaleString()}
        </label>
        <input
          type="range"
          id="budget"
          min="1000"
          max="50000"
          step="1000"
          value={budget}
          onChange={handleBudgetChange}
          className="w-full h-2 bg-[#3A7D44] rounded-lg appearance-none cursor-pointer accent-[#F4A261]"
        />
      </div>

      {/* Distance Slider */}
      <div className="flex flex-col gap-4 p-6 bg-[rgba(27,77,62,0.3)] rounded-lg">
        <label htmlFor="distance" className="text-lg font-medium">
          Distance: {distance} km
        </label>
        <input
          type="range"
          id="distance"
          min="5"
          max="30"
          step="1"
          value={distance}
          onChange={handleDistanceChange}
          className="w-full h-2 bg-[#3A7D44] rounded-lg appearance-none cursor-pointer accent-[#F4A261]"
        />
      </div>

      {/* Find Trips Button */}
      <div className="flex justify-center">
        <Button
          className="bg-[#F4A261] text-[#102A26] rounded px-6 py-3 text-lg font-semibold transition-all duration-200 hover:bg-[#e76f51] hover:scale-105 active:scale-95 disabled:bg-[#3A7D44] disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={findTrips}
          disabled={loading || location.loading}
        >
          {loading ? "Searching..." : "Find Trips"}
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-600 text-white p-4 rounded-lg mt-4 text-center">
          <p>{error}</p>
          {rawErrorResponse && (
            <details className="mt-2 text-xs text-left">
              <summary>Show raw response</summary>
              <pre className="whitespace-pre-wrap break-all bg-red-700 p-2 rounded mt-1">
                <code>{rawErrorResponse}</code>
              </pre>
            </details>
          )}
        </div>
      )}

      {/* Trip Suggestions */}
      {!loading && tripSuggestions.length === 0 && !error && (
        <p className="text-center text-[#a8dadc] mt-6">
          Enter your budget and desired distance, then click "Find Trips"!
        </p>
      )}

      {tripSuggestions.length > 0 && (
        <div className="mt-8 p-6 bg-[rgba(27,77,62,0.3)] rounded-lg animate-slideUp">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Trip Suggestions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tripSuggestions.map((trip, index) => (
              <div
                key={trip.destination || index}
                className="bg-[#1B4D3E] rounded-lg p-6 shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${index * 150 + 200}ms` }}
              >
                <h3 className="text-xl font-semibold text-[#F4A261] mb-3">
                  {trip.destination}
                </h3>
                <p className="text-[#F1FAEE] mb-4 leading-relaxed">
                  {trip.description}
                </p>
                <div className="flex flex-col gap-2">
                  <span className="text-[#F1FAEE] text-sm">
                    <strong>Cost:</strong> {trip.estimatedCost}
                  </span>
                  <span className="text-[#F1FAEE] text-sm">
                    <strong>Travel Time:</strong> {trip.travelTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
