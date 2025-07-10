import React from "react";
import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import ToggleButton from "../components/ToggleButton";


const monoSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartSupport",
  description: "AI-powered Customer Support",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${monoSans.className} antialiased`}>
      
      <div className="fixed top-4 right-4 z-50">
          <ToggleButton />
        </div>
        {children}
      </body>
    </html>
  );
}