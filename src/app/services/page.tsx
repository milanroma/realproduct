import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description: "Comprehensive application development services: Web applications, Mobile apps (hybrid & native), and Desktop software solutions. Expert development team ready to build your next project.",
  keywords: [
    "web development services",
    "mobile app development",
    "desktop application development",
    "hybrid mobile apps",
    "native mobile apps",
    "custom software development",
    "application development services",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services - RealProduct | Web, Mobile & Desktop Development",
    description: "Comprehensive application development services for web, mobile, and desktop platforms.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services - RealProduct",
    description: "Comprehensive application development services for web, mobile, and desktop platforms.",
  },
};

export default function ServicesPage() {
  const services = [
    {
      id: "web",
      title: "Web Development",
      icon: "🌐",
      description: "We build modern, scalable web applications that deliver exceptional user experiences and drive business growth.",
      features: [
        "Responsive Design",
        "Progressive Web Apps (PWA)",
        "E-commerce Solutions",
        "Web Portals & Dashboards",
        "API Development & Integration",
        "Content Management Systems",
      ],
      technologies: [
        "React, Next.js, Vue.js",
        "Node.js, Express",
        "TypeScript, JavaScript",
        "REST & GraphQL APIs",
        "PostgreSQL, MongoDB",
        "AWS, Vercel, Docker",
      ],
      process: [
        "Requirements Analysis",
        "UI/UX Design",
        "Development & Testing",
        "Deployment & Maintenance",
      ],
    },
    {
      id: "mobile",
      title: "Mobile Development",
      icon: "📱",
      description: "Native and hybrid mobile applications for iOS and Android. We choose the best approach based on your needs, budget, and timeline.",
      features: [
        "Native iOS & Android Apps",
        "Hybrid Mobile Applications",
        "Cross-platform Development",
        "App Store Optimization",
        "Push Notifications",
        "Offline Functionality",
      ],
      technologies: [
        "React Native, Flutter",
        "Swift, Kotlin",
        "iOS & Android SDKs",
        "Firebase, Supabase",
        "App Store & Play Store",
        "CI/CD Pipelines",
      ],
      process: [
        "Platform Strategy",
        "Design & Prototyping",
        "Development & QA",
        "Store Submission & Launch",
      ],
      hybridVsNative: {
        hybrid: {
          title: "Hybrid Apps",
          pros: [
            "Single codebase for iOS & Android",
            "Faster development time",
            "Lower cost",
            "Easier maintenance",
          ],
          bestFor: "Business apps, content apps, simple games",
        },
        native: {
          title: "Native Apps",
          pros: [
            "Best performance",
            "Full platform features",
            "Superior user experience",
            "Better for complex apps",
          ],
          bestFor: "Gaming, AR/VR, heavy graphics, complex animations",
        },
      },
    },
    {
      id: "desktop",
      title: "Desktop Applications",
      icon: "💻",
      description: "Cross-platform desktop software solutions that deliver powerful performance and seamless user experience across Windows, macOS, and Linux.",
      features: [
        "Cross-platform Compatibility",
        "Native Performance",
        "Offline Functionality",
        "System Integration",
        "Auto-update Mechanisms",
        "Custom Installers",
      ],
      technologies: [
        "Electron, Tauri",
        "C#, .NET",
        "Python, Qt",
        "Java, JavaFX",
        "Native APIs",
        "Auto-update Systems",
      ],
      process: [
        "Platform Requirements",
        "Architecture Design",
        "Development & Testing",
        "Distribution & Updates",
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Our Services</h1>
            <p className="page-hero-description">
              Comprehensive development solutions tailored to your business needs. 
              From web applications to mobile and desktop software, we deliver quality solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="services-detail">
        <div className="container">
          {services.map((service, index) => (
            <div key={service.id} className="service-detail-card">
              <div className="service-detail-header">
                <div className="service-detail-icon">{service.icon}</div>
                <div>
                  <h2 className="service-detail-title">{service.title}</h2>
                  <p className="service-detail-description">{service.description}</p>
                </div>
              </div>

              <div className="service-detail-content">
                {/* Process */}
                <div className="service-detail-section service-detail-section-process">
                  <h3 className="service-detail-section-title">Our Process</h3>
                  <div className="process-steps">
                    {service.process.map((step, idx) => (
                      <div key={idx} className="process-step">
                        <div className="process-step-number">{idx + 1}</div>
                        <div className="process-step-content">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="service-detail-grid">
                  {/* Features */}
                  <div className="service-detail-section">
                    <h3 className="service-detail-section-title">Key Features</h3>
                    <ul className="service-detail-list">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="service-detail-list-item">
                          <span className="list-bullet">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="service-detail-section">
                    <h3 className="service-detail-section-title">Technologies</h3>
                    <div className="tech-tags">
                      {service.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hybrid vs Native (only for mobile) */}
                {service.hybridVsNative && (
                  <div className="service-detail-section service-detail-section-full">
                    <h3 className="service-detail-section-title">Hybrid vs Native</h3>
                    <div className="comparison-grid">
                      <div className="comparison-card">
                        <h4 className="comparison-title">
                          {service.hybridVsNative.hybrid.title}
                        </h4>
                        <ul className="comparison-list">
                          {service.hybridVsNative.hybrid.pros.map((pro, idx) => (
                            <li key={idx} className="comparison-item">
                              <span className="list-bullet">+</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                        <p className="comparison-note">
                          <strong>Best for:</strong> {service.hybridVsNative.hybrid.bestFor}
                        </p>
                      </div>

                      <div className="comparison-card">
                        <h4 className="comparison-title">
                          {service.hybridVsNative.native.title}
                        </h4>
                        <ul className="comparison-list">
                          {service.hybridVsNative.native.pros.map((pro, idx) => (
                            <li key={idx} className="comparison-item">
                              <span className="list-bullet">+</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                        <p className="comparison-note">
                          <strong>Best for:</strong> {service.hybridVsNative.native.bestFor}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Project?</h2>
            <p className="cta-description">
              Let's discuss which service best fits your needs
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn btn-primary btn-large">
                Get in Touch
              </Link>
              <Link href="/portfolio" className="btn btn-secondary btn-large">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

