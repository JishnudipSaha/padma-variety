import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ToastContainer from "@/components/ui/Toast";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-white text-primary antialiased">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
