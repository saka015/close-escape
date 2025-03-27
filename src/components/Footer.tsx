import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0A1C1A] py-12 border-t border-[#1B4D3E]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              {/* <Image
                src="/logo.png"
                alt="CloseEscape Logo"
                width={30}
                height={30}
                className="rounded-full"
              /> */}
              <span className="text-xl font-bold text-[#F1FAEE]">
                CloseEscape
              </span>
            </div>
            <p className="text-[#A8DADC] max-w-md">
              Your gateway to discovering perfect travel destinations that match
              your budget and preferences.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#F1FAEE]">
                Navigation
              </h3>
              <ul className="space-y-2 text-[#A8DADC]">
                <li>
                  <Link
                    href="/"
                    className="hover:text-[#F4A261] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore"
                    className="hover:text-[#F4A261] transition-colors"
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#F4A261] transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#F4A261] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#F1FAEE]">
                Resources
              </h3>
              <ul className="space-y-2 text-[#A8DADC]">
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-[#F4A261] transition-colors"
                  >
                    Travel Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guides"
                    className="hover:text-[#F4A261] transition-colors"
                  >
                    Travel Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tips"
                    className="hover:text-[#F4A261] transition-colors"
                  >
                    Budget Tips
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#F1FAEE]">
                Legal
              </h3>
              <ul className="space-y-2 text-[#A8DADC]">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-[#F4A261] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-[#F4A261] transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1B4D3E] mt-12 pt-8 text-center text-[#A8DADC]">
          <p>© {new Date().getFullYear()} CloseEscape. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
