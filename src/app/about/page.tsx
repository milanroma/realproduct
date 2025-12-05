import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "RealProduct - 20+ years of experience in application development. Our team of skilled engineers delivers web, mobile, and desktop solutions.",
  keywords: [
    "about realproduct",
    "software development company",
    "experienced developers",
    "engineering team",
    "application development experts",
  ],
  openGraph: {
    title: "About Us - RealProduct | 20+ Years of Experience",
    description: "Learn about RealProduct - a team of skilled engineers with 20+ years of experience in application development.",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">About Us</h1>
            <p className="page-hero-description">
              With over 20 years of experience, we're a team of skilled engineers 
              dedicated to building exceptional digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="about-story">
        <div className="container">
          <div className="about-story-content">
            <div className="about-story-text">
              <h2 className="about-section-title">Our Story</h2>
              <div className="about-text-content">
                <p>
                  With <strong className="highlight">20+ years of experience</strong> in the software development industry, 
                  RealProduct has established itself as a trusted partner for businesses seeking 
                  innovative digital solutions.
                </p>
                <p>
                  Our journey began with a simple mission: to transform complex business challenges 
                  into elegant, user-friendly applications. Over the years, we've evolved alongside 
                  technology, mastering new frameworks, platforms, and methodologies while maintaining 
                  our commitment to quality and excellence.
                </p>
                <p>
                  Today, we specialize in developing custom web applications, mobile apps (both hybrid 
                  and native), and desktop software that drive business growth and enhance user experiences.
                </p>
              </div>
            </div>
            <div className="about-story-stats">
              <div className="stat-card">
                <div className="stat-number">20+</div>
                <div className="stat-label">Years of Experience</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100+</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Team</h2>
            <p className="section-description">
              A dedicated team of skilled engineers passionate about creating exceptional software
            </p>
          </div>

          <div className="team-content">
            <div className="team-description">
              <p>
                Our team is composed of <strong>experienced engineers</strong> who bring diverse 
                expertise to every project. From frontend specialists and backend architects to 
                mobile developers and DevOps engineers, we have the talent and knowledge to tackle 
                any development challenge.
              </p>
              <p>
                What sets us apart is our collaborative approach. We work closely with clients to 
                understand their unique needs, ensuring that every solution we build is tailored 
                to their specific business goals and requirements.
              </p>
            </div>

            <div className="team-values">
              <div className="value-card">
                <div className="value-icon">🎯</div>
                <h3 className="value-title">Expertise</h3>
                <p className="value-description">
                  Deep technical knowledge across multiple platforms and technologies
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">🤝</div>
                <h3 className="value-title">Collaboration</h3>
                <p className="value-description">
                  Working closely with clients to understand and deliver on their vision
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">⚡</div>
                <h3 className="value-title">Innovation</h3>
                <p className="value-description">
                  Staying ahead of technology trends to deliver cutting-edge solutions
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">✅</div>
                <h3 className="value-title">Quality</h3>
                <p className="value-description">
                  Rigorous testing and quality assurance in every project we deliver
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="about-services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What We Do</h2>
            <p className="section-description">
              Comprehensive development services across all platforms
            </p>
          </div>

          <div className="services-overview">
            <div className="service-overview-card">
              <div className="service-overview-icon">🌐</div>
              <h3 className="service-overview-title">Web Development</h3>
              <p className="service-overview-description">
                Modern, scalable web applications built with the latest technologies
              </p>
            </div>
            <div className="service-overview-card">
              <div className="service-overview-icon">📱</div>
              <h3 className="service-overview-title">Mobile Development</h3>
              <p className="service-overview-description">
                Native and hybrid mobile apps for iOS and Android platforms
              </p>
            </div>
            <div className="service-overview-card">
              <div className="service-overview-icon">💻</div>
              <h3 className="service-overview-title">Desktop Applications</h3>
              <p className="service-overview-description">
                Cross-platform desktop software solutions for Windows, macOS, and Linux
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Work With Us?</h2>
            <p className="cta-description">
              Let's discuss how our team of engineers can help bring your project to life
            </p>
            <div className="cta-buttons">
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

