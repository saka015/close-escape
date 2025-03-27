'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/explore');
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-[#102A26] text-[#F1FAEE] p-4">
      <div className="flex flex-col items-center justify-center text-center max-w-3xl p-8 rounded-xl bg-[rgba(27,77,62,0.3)] shadow-2xl animate-[fadeIn_0.8s_ease-in-out]">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#F1FAEE] to-[#F4A261] bg-clip-text text-transparent md:text-4xl sm:text-3xl">
          Discover Your Perfect Trip
        </h1>
        <p className="text-xl mb-10 leading-relaxed text-[#F1FAEE] opacity-90 md:text-lg sm:text-base">
          Find travel destinations that match your budget and distance preferences
        </p>
        <Button 
          onClick={handleGetStarted}
          size="lg"
          className="bg-[#F4A261] text-[#102A26] text-lg font-semibold px-10 py-3 rounded-lg transition-all duration-300 border-none shadow-md hover:bg-[#e76f51] hover:transform hover:-translate-y-1 hover:shadow-lg"
        >
          Get Started
        </Button>
      </div>
    </main>
  );
}
