import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RealProduct - Custom App Development | Web, Mobile & Desktop",
    template: "%s | RealProduct",
  },
  description: "Professional custom application development services. We build web applications, mobile apps (hybrid & native), and desktop software tailored to your business needs.",
  keywords: [
    "app development",
    "web development",
    "mobile app development",
    "desktop application",
    "hybrid mobile apps",
    "native mobile apps",
    "custom software",
    "software development",
    "application development",
  ],
  authors: [{ name: "RealProduct" }],
  creator: "RealProduct",
  publisher: "RealProduct",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "RealProduct",
    title: "RealProduct - Custom App Development | Web, Mobile & Desktop",
    description: "Professional custom application development services. We build web applications, mobile apps (hybrid & native), and desktop software tailored to your business needs.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RealProduct - App Development Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RealProduct - Custom App Development | Web, Mobile & Desktop",
    description: "Professional custom application development services. We build web applications, mobile apps (hybrid & native), and desktop software.",
    images: ["/og-image.jpg"],
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
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <StructuredData />
      </head>
      <body className={inter.variable}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
