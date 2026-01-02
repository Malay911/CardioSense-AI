import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CardioSense AI - Cardiovascular Disease Prediction",
  description: "Advanced AI-powered cardiovascular risk assessment tool. Leverage machine learning to assess your heart health.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-[#0a0a0a] text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
