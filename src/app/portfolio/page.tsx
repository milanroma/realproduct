import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "View our portfolio of successful projects. Coming soon - we're preparing to showcase our best work.",
  alternates: {
    canonical: "/portfolio",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Portfolio - RealProduct",
    description: "View our portfolio of successful projects. Coming soon - we're preparing to showcase our best work.",
    url: "/portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - RealProduct",
    description: "View our portfolio of successful projects.",
  },
};

export default function PortfolioPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Portfolio</h1>
            <p className="page-hero-description">
              We're currently preparing our portfolio to showcase our best work.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="coming-soon">
        <div className="container">
          <div className="coming-soon-content">
            <div className="coming-soon-icon">🚀</div>
            <h2 className="coming-soon-title">Coming Soon</h2>
            <p className="coming-soon-description">
              We're working hard to bring you an amazing showcase of our projects. 
              Check back soon to see our portfolio of successful web, mobile, and desktop applications.
            </p>
            <div className="coming-soon-actions">
              <Link href="/contact" className="btn btn-primary btn-large">
                Get in Touch
              </Link>
              <Link href="/services" className="btn btn-secondary btn-large">
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

