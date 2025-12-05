import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with RealProduct. Send us a message or email us at info@realproduct.dev. We're here to help with your web, mobile, and desktop development needs.",
  keywords: [
    "contact realproduct",
    "software development contact",
    "app development inquiry",
    "web development contact",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us - RealProduct | Get in Touch",
    description: "Get in touch with RealProduct. We're here to help with your development needs.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - RealProduct",
    description: "Get in touch with RealProduct. We're here to help with your development needs.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

