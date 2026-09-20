import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = localFont({
  src: "../public/fonts/geist.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "../public/fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FAFAFA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jev-speedtest.amanydv.in"),
  title: {
    default: "JEV Speed Test | Real-Time LLM vs Structured Evaluation Benchmark",
    template: "%s | JEV Speed Test",
  },
  description:
    "Interactive real-time speed test and latency benchmark comparing Jev (typesafe-ai/jev) against traditional sequential LLM chains. Measure latency, throughput, token cost, and parallel decision speed.",
  applicationName: "JEV Speed Test",
  authors: [{ name: "Aman Yadav", url: "https://amanydv.in" }],
  generator: "Next.js",
  keywords: [
    "jev speedtest",
    "jev speed test",
    "jev-speedtest",
    "jev benchmark",
    "typesafe-ai jev",
    "typesafe ai",
    "llm speed test",
    "llm benchmark",
    "structured output benchmark",
    "ai latency test",
    "sequential vs parallel llm",
    "aman yadav",
    "fast llm evaluation",
  ],
  creator: "Aman Yadav",
  publisher: "Aman Yadav",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JEV Speed Test | Real-Time LLM vs Structured Evaluation Benchmark",
    description:
      "Measure and compare structured decision speed: 6 sequential LLM roundtrips vs 1 parallel Jev evaluation. Live telemetry, cost estimation, and accuracy metrics.",
    url: "https://jev-speedtest.amanydv.in",
    siteName: "JEV Speed Test",
    images: [
      {
        url: "/og-banner.png",
        width: 1200,
        height: 630,
        alt: "JEV Speed Test: LLM vs Jev Benchmark",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JEV Speed Test | Real-Time LLM vs Structured Evaluation Benchmark",
    description:
      "Live developer benchmark comparing Jev (typesafe-ai/jev) parallel evaluation vs traditional sequential LLM decision chains.",
    images: ["/og-banner.png"],
    creator: "@aman100xdev",
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
  category: "technology",
  icons: {
    icon: "/jev-icon.png",
    apple: "/jev-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full overflow-hidden antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="h-full overflow-hidden flex flex-col bg-[#FAFAFA] text-[#111111]">
        {children}
      </body>
    </html>
  );
}
