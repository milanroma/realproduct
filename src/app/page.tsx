import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description: "Professional custom application development services. We build web applications, mobile apps (hybrid & native), and desktop software tailored to your business needs.",
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Custom App Development
              <span className="gradient-text"> That Drives Results</span>
            </h1>
            <p className="hero-description">
              We specialize in building high-quality web applications, mobile apps (hybrid & native), 
              and desktop software that transform your business ideas into powerful digital solutions.
            </p>
            <div className="hero-cta">
              <Link href="/contact" className="btn btn-primary">
                Get Started
              </Link>
              <Link href="/portfolio" className="btn btn-secondary">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-description">
              Comprehensive development solutions for all your digital needs
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🌐</div>
              <h3 className="service-title">Web Development</h3>
              <p className="service-description">
                Modern, responsive web applications built with cutting-edge technologies. 
                From simple websites to complex web platforms.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3 className="service-title">Mobile Development</h3>
              <p className="service-description">
                Native and hybrid mobile applications for iOS and Android. 
                We choose the best approach based on your requirements.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">💻</div>
              <h3 className="service-title">Desktop Applications</h3>
              <p className="service-description">
                Cross-platform desktop software solutions that deliver 
                powerful performance and seamless user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-us">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose RealProduct?</h2>
            <p className="section-description">
              We combine technical expertise with business understanding
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-item">
              <h3 className="feature-title">Expert Team</h3>
              <p className="feature-description">
                Experienced developers skilled in the latest technologies and best practices.
              </p>
            </div>

            <div className="feature-item">
              <h3 className="feature-title">Custom Solutions</h3>
              <p className="feature-description">
                Every project is tailored to your specific business needs and goals.
              </p>
            </div>

            <div className="feature-item">
              <h3 className="feature-title">Quality Assurance</h3>
              <p className="feature-description">
                Rigorous testing and quality control ensure reliable, bug-free applications.
              </p>
            </div>

            <div className="feature-item">
              <h3 className="feature-title">Ongoing Support</h3>
              <p className="feature-description">
                We provide maintenance and support to keep your applications running smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Build Your Next App?</h2>
            <p className="cta-description">
              Let's discuss your project and bring your vision to life
            </p>
            <Link href="/contact" className="btn btn-primary btn-large">
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
