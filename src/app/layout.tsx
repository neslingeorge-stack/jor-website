import type { Metadata } from "next";
import {
  Barlow_Condensed,
  DM_Sans,
  IBM_Plex_Sans,
  JetBrains_Mono,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toast } from "@/components/ui/Toast";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "JOR — Just On Road | India's Driver Matching Engine",
    template: "%s | JOR",
  },
  description:
    "JOR connects verified commercial drivers with fleet owners across India. Post a job, get an AI-matched verified driver in minutes. Launching in Bangalore.",
  keywords: [
    "driver matching app India",
    "commercial driver hire",
    "fleet driver app Bangalore",
    "truck driver jobs India",
    "JOR app",
    "Just On Road",
    "FleetPrime",
  ],
  authors: [{ name: "FleetPrime Solutions Pvt. Ltd." }],
  openGraph: {
    title: "JOR — The Road Starts Here",
    description:
      "India's live driver matching engine for commercial trucking.",
    url: "https://jor.in",
    siteName: "JOR",
    images: [
      {
        url: "/og-jor.png",
        width: 1200,
        height: 630,
        alt: "JOR — Just On Road",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JOR — Just On Road",
    description:
      "India's Driver Matching Engine. Launching in Bangalore.",
    images: ["/og-jor.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
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
      className={`${barlowCondensed.variable} ${dmSans.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-dvh">
        {children}
        <Toast />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
