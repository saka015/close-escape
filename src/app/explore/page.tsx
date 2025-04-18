"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaMapMarkedAlt, FaRupeeSign, FaRoute } from "react-icons/fa";

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

  const handleTripCardClick = (destination: string) => {
    if (!location.latitude || !location.longitude) {
      alert("Your location is not available. Cannot open directions.");
      return;
    }

    // Format the Google Maps URL with directions from user location to destination
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${
      location.latitude
    },${location.longitude}&destination=${encodeURIComponent(
      destination
    )}&travelmode=driving`;

    // Open in a new tab
    window.open(mapsUrl, "_blank");
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#102A26] text-[#F1FAEE]">
      {/* Header Section */}
      <section className="pt-12 pb-8 px-4 bg-[#0A1C1A]">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#F1FAEE] to-[#F4A261] bg-clip-text text-transparent animate-fadeDown">
            Find Your Perfect Trip
          </h1>
          <p className="text-xl text-[#A8DADC] max-w-2xl mx-auto">
            Set your budget and preferred distance to discover amazing
            destinations near you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Location Status */}
          <div className="p-6 bg-[rgba(27,77,62,0.5)] rounded-lg text-center mb-10 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-center mb-2">
              <FaMapMarkedAlt className="text-[#F4A261] text-2xl mr-2" />
              <h2 className="text-xl font-semibold">Your Location</h2>
            </div>
            {location.loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#F4A261] mr-2"></div>
                <p>Detecting your location...</p>
              </div>
            ) : location.error ? (
              <p className="text-red-400">{location.error}</p>
            ) : (
              <p>
                Finding trips near{" "}
                <span className="font-semibold text-[#F4A261]">
                  {location.city ||
                    `your location (${location.latitude.toFixed(
                      4
                    )}, ${location.longitude.toFixed(4)})`}
                </span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Budget Slider */}
            <div className="flex flex-col gap-4 p-6 bg-[rgba(27,77,62,0.5)] rounded-lg shadow-lg backdrop-blur-sm">
              <div className="flex items-center mb-2">
                <FaRupeeSign className="text-[#F4A261] text-xl mr-2" />
                <label htmlFor="budget" className="text-lg font-medium">
                  Your Budget
                </label>
              </div>
              <p className="text-2xl font-bold text-[#F4A261] mb-2">
                ₹{budget.toLocaleString()}
              </p>
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
              <div className="flex justify-between text-sm text-[#A8DADC]">
                <span>₹1,000</span>
                <span>₹25,000</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* Distance Slider */}
            <div className="flex flex-col gap-4 p-6 bg-[rgba(27,77,62,0.5)] rounded-lg shadow-lg backdrop-blur-sm">
              <div className="flex items-center mb-2">
                <FaRoute className="text-[#F4A261] text-xl mr-2" />
                <label htmlFor="distance" className="text-lg font-medium">
                  Travel Distance
                </label>
              </div>
              <p className="text-2xl font-bold text-[#F4A261] mb-2">
                {distance} km
              </p>
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
              <div className="flex justify-between text-sm text-[#A8DADC]">
                <span>5 km</span>
                <span>15 km</span>
                <span>30 km</span>
              </div>
            </div>
          </div>

          {/* Find Trips Button */}
          <div className="flex justify-center mb-12">
            <Button
              className="bg-[#F4A261] text-[#102A26] rounded-lg px-8 py-4 text-lg font-semibold transition-all duration-200 hover:bg-[#e76f51] hover:scale-105 active:scale-95 disabled:bg-[#3A7D44] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
              onClick={findTrips}
              disabled={loading || location.loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#102A26] mr-2"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                "Find Trips"
              )}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-600 text-white p-6 rounded-lg mb-10 text-center shadow-lg">
              <p className="font-semibold mb-2">Error</p>
              <p>{error}</p>
              {rawErrorResponse && (
                <details className="mt-4 text-xs text-left">
                  <summary className="cursor-pointer font-medium">
                    Show technical details
                  </summary>
                  <pre className="whitespace-pre-wrap break-all bg-red-700 p-4 rounded mt-2 overflow-auto max-h-40">
                    <code>{rawErrorResponse}</code>
                  </pre>
                </details>
              )}
            </div>
          )}

          {/* Initial Message */}
          {!loading && tripSuggestions.length === 0 && !error && (
            <div className="text-center text-[#A8DADC] p-10 bg-[rgba(27,77,62,0.3)] rounded-lg shadow-lg">
              <p className="text-xl mb-4">
                Ready to discover your next adventure?
              </p>
              <p>
                Adjust your budget and desired distance, then click "Find
                Trips"!
              </p>
            </div>
          )}

          {/* Trip Suggestions */}
          {tripSuggestions.length > 0 && (
            <div className="mt-8 p-8 bg-[rgba(27,77,62,0.5)] rounded-lg shadow-xl animate-slideUp">
              <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[#F1FAEE] to-[#F4A261] bg-clip-text text-transparent">
                Your Trip Suggestions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tripSuggestions.map((trip, index) => (
                  <div
                    key={trip.destination || index}
                    className="bg-[#1B4D3E] rounded-lg overflow-visible shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300 animate-fadeIn cursor-pointer relative group  mt-8"
                    style={{ animationDelay: `${index * 150 + 200}ms` }}
                    onClick={() => handleTripCardClick(trip.destination)}
                  >
                    {/* Tooltip - Repositioned */}
                    <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r rounded-lg rounded-b-none from-[#3A7D44] to-[#1B4D3E] text-white text-sm py-1 px-3  shadow-lg -top-8 left-1/2 transform -translate-x-1/2 pointer-events-none z-20 whitespace-nowrap">
                      Click to get directions
                    </div>

                    <div className="h-32 bg-gradient-to-r rounded-lg rounded-b-none from-[#3A7D44] to-[#1B4D3E] flex items-center justify-center">
                      <h3 className="text-xl font-semibold text-[#F1FAEE] px-4 text-center">
                        {trip.destination}
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="text-[#F1FAEE] mb-6 leading-relaxed">
                        {trip.description}
                      </p>
                      <div className="flex flex-col gap-3 border-t border-[#3A7D44] pt-4">
                        <div className="flex items-center">
                          <FaRupeeSign className="text-[#F4A261] mr-2" />
                          <span className="text-[#F1FAEE]">
                            <strong>Cost:</strong> {trip.estimatedCost}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FaRoute className="text-[#F4A261] mr-2" />
                          <span className="text-[#F1FAEE]">
                            <strong>Travel Time:</strong> {trip.travelTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
