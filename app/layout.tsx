import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/nav-bar";
import Image from "next/image";
import classicPainting from '@/classic-painting.png';

const defaultUrl = process.env.VERCEL_URL
  // do I need this?
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Aaron Cantu Theology",
  description: "Aaron Cantu's Blog",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        {/* Hero */}
        <div className="relative w-full h-64 overflow-hidden">
          {/* 1. The Image (Base layer) */}
          <Image 
            src={classicPainting}
            alt="classical painting" 
            fill={true} 
            className="relative z-0 object-cover object-center" 
            priority
          />
          
          {/* 2. The Tint Overlay (Middle layer) */}
          <div className="absolute inset-0 z-10 bg-black/40 mix-blend-multiply" />
          
          {/* 3. The Text Container (Top layer) */}
          <div className="absolute inset-0 z-20 flex items-center justify-center text-white">
            <h1 className="text-4xl font-bold tracking-wide drop-shadow-lg">
              Aaron Cantu&apos;s Blog
            </h1>
          </div>
        </div>
        <Navbar />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
