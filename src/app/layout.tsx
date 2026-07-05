import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ToastContainer from "@/components/ui/Toast";

const playfair = Playfair_Display({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Padma Variety Stores | Premium Beauty & Cosmetics in Kolkata",
  description:
    "Discover your natural beauty at Padma Variety Stores. Premium skincare, makeup, fragrances and more in Barasat, Kolkata.",
  keywords: ["cosmetics", "skincare", "makeup", "fragrances", "Kolkata", "beauty store"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-warm-white text-dark-brown antialiased">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
