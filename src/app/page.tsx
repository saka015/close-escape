"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaWallet, FaCompass } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/explore");
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#102A26] text-[#F1FAEE]">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center min-h-[90vh] px-4 py-20 overflow-hidden">
        {/* Background pattern/image */}
        <div className="absolute inset-0 opacity-20 z-0">
          <Image
            src="/world-map.png"
            alt="World Map Background"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl p-8 rounded-xl bg-[rgba(27,77,62,0.5)] shadow-2xl backdrop-blur-sm animate-[fadeIn_0.8s_ease-in-out]">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#F1FAEE] to-[#F4A261] bg-clip-text text-transparent">
            Discover Your Perfect Trip
          </h1>
          <p className="text-xl mb-10 leading-relaxed text-[#F1FAEE] opacity-90 max-w-2xl">
            Find amazing travel destinations that match your budget and distance
            preferences. Explore local getaways and hidden gems near you.
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-[#F4A261] text-[#102A26] text-lg font-semibold px-10 py-6 rounded-lg transition-all duration-300 border-none shadow-md hover:bg-[#e76f51] hover:transform hover:-translate-y-1 hover:shadow-lg"
          >
            Start Exploring
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0A1C1A]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#F1FAEE] to-[#F4A261] bg-clip-text text-transparent">
            How CloseEscape Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-[#1B4D3E] p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="text-[#F4A261] text-4xl mb-6 flex justify-center">
                <FaMapMarkerAlt />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Share Your Location
              </h3>
              <p className="text-[#A8DADC] text-center">
                We use your current location to find the best destinations
                nearby that match your preferences.
              </p>
            </div>

            <div className="bg-[#1B4D3E] p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="text-[#F4A261] text-4xl mb-6 flex justify-center">
                <FaWallet />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Set Your Budget
              </h3>
              <p className="text-[#A8DADC] text-center">
                Tell us how much you want to spend, and we'll find destinations
                that fit within your budget.
              </p>
            </div>

            <div className="bg-[#1B4D3E] p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="text-[#F4A261] text-4xl mb-6 flex justify-center">
                <FaCompass />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Discover Trips
              </h3>
              <p className="text-[#A8DADC] text-center">
                Get personalized trip suggestions with descriptions, costs, and
                travel times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#102A26]">
        <div className="container mx-auto max-w-4xl bg-gradient-to-r from-[#1B4D3E] to-[#3A7D44] rounded-2xl p-10 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Next Adventure?
          </h2>
          <p className="text-xl text-[#F1FAEE] mb-8 max-w-2xl mx-auto">
            Discover amazing destinations within your budget and preferred
            distance.
          </p>
          <Link href="/explore">
            <Button className="bg-[#F4A261] text-[#102A26] hover:bg-[#e76f51] px-8 py-4 rounded-lg text-lg font-medium  transition-colors">
              Find Trips Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#0A1C1A]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#F1FAEE] to-[#F4A261] bg-clip-text text-transparent">
            What Travelers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#1B4D3E] p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#3A7D44] flex items-center justify-center text-[#F1FAEE] font-bold text-xl">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Aisha P.</h4>
                  <p className="text-sm text-[#A8DADC]">Mumbai</p>
                </div>
              </div>
              <p className="text-[#F1FAEE] italic">
                "CloseEscape helped me discover a beautiful hill station just 3
                hours from my city that fit perfectly in my budget. Would never
                have found it otherwise!"
              </p>
            </div>

            <div className="bg-[#1B4D3E] p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#3A7D44] flex items-center justify-center text-[#F1FAEE] font-bold text-xl">
                  R
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Rahul M.</h4>
                  <p className="text-sm text-[#A8DADC]">Delhi</p>
                </div>
              </div>
              <p className="text-[#F1FAEE] italic">
                "I was looking for a weekend getaway and CloseEscape suggested
                three perfect options. The cost estimates were accurate and the
                descriptions were spot on."
              </p>
            </div>

            <div className="bg-[#1B4D3E] p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#3A7D44] flex items-center justify-center text-[#F1FAEE] font-bold text-xl">
                  P
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Priya S.</h4>
                  <p className="text-sm text-[#A8DADC]">Bangalore</p>
                </div>
              </div>
              <p className="text-[#F1FAEE] italic">
                "As a budget traveler, I love how CloseEscape lets me set my
                price range and find trips that won't break the bank. It's
                become my go-to travel planning tool."
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
