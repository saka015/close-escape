"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#102A26] bg-opacity-90 backdrop-blur-sm z-50 border-b border-[#1B4D3E]">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* <Image
            src="/logo.png"
            alt="CloseEscape Logo"
            width={40}
            height={40}
            className="rounded-full"
          /> */}
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F1FAEE] to-[#F4A261]">
            CloseEscape
          </span>
        </div>

        <div className="hidden md:flex space-x-6">
          <Link
            href="/"
            className={`${
              pathname === "/"
                ? "text-[#F4A261]"
                : "text-[#F1FAEE] hover:text-[#F4A261]"
            } transition-colors`}
          >
            Home
          </Link>
          <Link
            href="/explore"
            className={`${
              pathname === "/explore"
                ? "text-[#F4A261]"
                : "text-[#F1FAEE] hover:text-[#F4A261]"
            } transition-colors`}
          >
            Explore
          </Link>
          <Link
            href="/about"
            className={`${
              pathname === "/about"
                ? "text-[#F4A261]"
                : "text-[#F1FAEE] hover:text-[#F4A261]"
            } transition-colors`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`${
              pathname === "/contact"
                ? "text-[#F4A261]"
                : "text-[#F1FAEE] hover:text-[#F4A261]"
            } transition-colors`}
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/explore">
            <button className="bg-[#F4A261] hover:bg-[#e76f51] text-[#102A26] px-4 py-2 rounded-full text-sm font-medium transition-colors">
              Get Started
            </button>
          </Link>
          <button className="md:hidden text-[#F1FAEE]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
