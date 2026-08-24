import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sample Roofing (Pty) Ltd | Leading Roofing & Waterproofing Specialists",
  description: "South Africa's premier roofing, waterproofing, and building envelope specialists. Serving residential, commercial, and industrial properties with written guarantees.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${manrope.variable}`}>
      <body className="antialiased bg-white text-slate-900 min-h-screen flex flex-col selection:bg-[#0F2C59] selection:text-white">
        <ScrollToTop />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
