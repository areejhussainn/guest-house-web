import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ras Grand | Guest House Rasdhoo, Maldives",
  description:
    "Welcome to Ras Grand - a warm and cozy island guest house in Rasdhoo, Maldives. Experience authentic Maldivian hospitality with comfortable rooms, beautiful beaches, and genuine local experiences.",
  keywords: [
    "Maldives",
    "Rasdhoo",
    "guest house",
    "budget Maldives",
    "island stay",
    "diving",
    "snorkeling",
    "local island",
  ],
  openGraph: {
    title: "Ras Grand | Guest House Rasdhoo, Maldives",
    description: "Your island home in Rasdhoo, Maldives",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased`}
      >
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
