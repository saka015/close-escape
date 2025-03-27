"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLeaf, FaMapMarkedAlt, FaHandshake } from "react-icons/fa";

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#102A26] text-[#F1FAEE]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#F1FAEE] to-[#F4A261] bg-clip-text text-transparent">
            About CloseEscape
          </h1>
          <p className="text-xl text-[#A8DADC] max-w-2xl mx-auto mb-8">
            Discover the story behind our mission to help travelers find perfect
            local destinations within their budget.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 bg-[#0A1C1A]">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-[#F4A261]">Our Story</h2>
              <p className="text-[#F1FAEE] mb-4">
                CloseEscape was born from a simple observation: many of us travel
                far and wide seeking adventure, while overlooking amazing
                destinations right in our own backyard.
              </p>
              <p className="text-[#F1FAEE] mb-4">
                Founded in 2023 by a group of travel enthusiasts and tech
                innovators, we set out to create a platform that would help people
                discover local gems that fit their budget and travel preferences.
              </p>
              <p className="text-[#F1FAEE]">
                Our AI-powered recommendation engine analyzes thousands of
                potential destinations to suggest the perfect trips based on your
                location, budget, and distance preferences.
              </p>
            </div>
            <div className="md:w-1/2 bg-[#1B4D3E] p-6 rounded-lg shadow-lg">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-[#3A7D44] flex items-center justify-center h-64">
                <div className="text-center p-6">
                  <FaMapMarkedAlt className="text-6xl text-[#F4A261] mx-auto mb-4" />
                  <p className="text-[#F1FAEE] italic">
                    "The best journeys are not always the farthest from home."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#F4A261]">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1B4D3E] p-6 rounded-lg shadow-lg text-center">
              <div className="text-[#F4A261] text-4xl mb-4 flex justify-center">
                <FaLeaf />
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainable Travel</h3>
              <p className="text-[#A8DADC]">
                Promoting local tourism reduces carbon footprints and supports
                sustainable travel practices.
              </p>
            </div>
            <div className="bg-[#1B4D3E] p-6 rounded-lg shadow-lg text-center">
              <div className="text-[#F4A261] text-4xl mb-4 flex justify-center">
                <FaHandshake />
              </div>
              <h3 className="text-xl font-bold mb-3">Support Local Economies</h3>
              <p className="text-[#A8DADC]">
                We help travelers discover and support local businesses and
                communities.
              </p>
            </div>
            <div className="bg-[#1B4D3E] p-6 rounded-lg shadow-lg text-center">
              <div className="text-[#F4A261] text-4xl mb-4 flex justify-center">
                <FaMapMarkedAlt />
              </div>
              <h3 className="text-xl font-bold mb-3">Accessible Adventures</h3>
              <p className="text-[#A8DADC]">
                Making travel accessible to everyone by finding options that fit
                any budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-[#0A1C1A]">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#F4A261]">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#1B4D3E] rounded-lg overflow-hidden shadow-lg">
              <div className="h-48 bg-[#3A7D44] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-[#102A26] flex items-center justify-center text-[#F1FAEE] font-bold text-3xl">
                  A
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Arjun Patel</h3>
                <p className="text-[#A8DADC] mb-4">Founder & CEO</p>
                <p className="text-[#F1FAEE]">
                  Travel enthusiast with a passion for discovering hidden gems.
                </p>
              </div>
            </div>
            <div className="bg-[#1B4D3E] rounded-lg overflow-hidden shadow-lg">
              <div className="h-48 bg-[#3A7D44] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-[#102A26] flex items-center justify-center text-[#F1FAEE] font-bold text-3xl">
                  S
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Sneha Gupta</h3>
                <p className="text-[#A8DADC] mb-4">CTO</p>
                <p className="text-[#F1FAEE]">
                  AI expert focused on creating personalized travel experiences.
                </p>
              </div>
            </div>
            <div className="bg-[#1B4D3E] rounded-lg overflow-hidden shadow-lg">
              <div className="h-48 bg-[#3A7D44] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-[#102A26] flex items-center justify-center text-[#F1FAEE] font-bold text-3xl">
                  R
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Rahul Sharma</h3>
                <p className="text-[#A8DADC] mb-4">Head of Partnerships</p>
                <p className="text-[#F1FAEE]">
                  Building relationships with local tourism boards and businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl bg-gradient-to-r from-[#1B4D3E] to-[#3A7D44] rounded-2xl p-10 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Exploring?</h2>
          <p className="text-xl text-[#F1FAEE] mb-8 max-w-2xl mx-auto">
            Discover amazing destinations near you that fit your budget and
            preferences.
          </p>
          <Link href="/explore">
            <button className="bg-[#F4A261] text-[#102A26] hover:bg-[#e76f51] px-8 py-3 rounded-lg text-lg font-medium transition-colors">
              Find Your Next Trip
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
} 