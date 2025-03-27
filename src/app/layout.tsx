import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CloseEscape - Discover Your Perfect Trip",
    template: "%s | CloseEscape",
  },
  description:
    "Find travel destinations that match your budget and distance preferences",
  keywords: [
    "travel",
    "trip planning",
    "budget travel",
    "local destinations",
    "travel recommendations",
  ],
  authors: [{ name: "CloseEscape Team" }],
  creator: "CloseEscape",
  publisher: "CloseEscape",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://CloseEscape.com",
    siteName: "CloseEscape",
    title: "CloseEscape - Discover Your Perfect Trip",
    description:
      "Find travel destinations that match your budget and distance preferences",
    images: [
      {
        url: "https://CloseEscape.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CloseEscape - Discover Your Perfect Trip",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloseEscape - Discover Your Perfect Trip",
    description:
      "Find travel destinations that match your budget and distance preferences",
    images: ["https://CloseEscape.com/twitter-image.jpg"],
    creator: "@CloseEscape",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-arp="">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="pt-16">
          {" "}
          {/* Add padding to account for fixed navbar */}
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
