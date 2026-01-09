'use client';

import { useState, useEffect, useRef } from "react";

// Simple hash function for deterministic generation (same algorithm as server)
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Generate a simple math challenge (deterministic based on challengeId)
function generateMathChallenge(): { question: string; answer: number; challengeId: string } {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  const challengeId = `${timestamp}-${random}`;
  
  // Use hash of challengeId for deterministic generation (same as server)
  const hash = simpleHash(challengeId);
  const seed1 = hash % 256;
  const seed2 = (hash >> 8) % 256;
  const operationSeed = (hash >> 16) % 256;
  
  const num1 = (seed1 % 10) + 1; // 1-10
  const num2 = (seed2 % 10) + 1; // 1-10
  const operation = (operationSeed % 2) === 0 ? "+" : "-";
  
  let answer: number;
  let question: string;
  
  if (operation === "+") {
    answer = num1 + num2;
    question = `${num1} + ${num2}`;
  } else {
    // Ensure positive result for subtraction
    const larger = Math.max(num1, num2);
    const smaller = Math.min(num1, num2);
    answer = larger - smaller;
    question = `${larger} - ${smaller}`;
  }
  
  return { question, answer, challengeId };
}

export default function ContactPage() {
  const formStartTime = useRef<number>(Date.now());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // Honeypot field - hidden from users
    mathAnswer: '',
  });
  const [mathChallenge, setMathChallenge] = useState<{ question: string; answer: number; challengeId: string } | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Generate challenge only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    formStartTime.current = Date.now();
    setMathChallenge(generateMathChallenge());
  }, []);

  // Regenerate challenge if needed
  const regenerateChallenge = () => {
    setMathChallenge(generateMathChallenge());
    setFormData(prev => ({ ...prev, mathAnswer: '' }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Validate math challenge
      if (!mathChallenge) {
        throw new Error('Please refresh the page and try again.');
      }

      const userAnswer = formData.mathAnswer.trim();
      const expectedAnswer = mathChallenge.answer.toString();
      
      if (userAnswer !== expectedAnswer) {
        throw new Error('Incorrect answer to the math question. Please try again.');
      }

      // Calculate time spent on form (anti-bot measure)
      const timeSpent = Date.now() - formStartTime.current;

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          website: formData.website, // Honeypot - should be empty
          timeSpent: timeSpent,
          mathAnswer: userAnswer,
          mathChallengeId: mathChallenge.challengeId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', website: '', mathAnswer: '' });
      formStartTime.current = Date.now(); // Reset timer for next submission
      setMathChallenge(generateMathChallenge()); // Generate new challenge
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      if (error instanceof Error && error.message.includes('math question')) {
        regenerateChallenge(); // Generate new challenge on error
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Contact Us</h1>
            <p className="page-hero-description">
              Have a project in mind? Get in touch and let's discuss how we can help bring your ideas to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            {/* Contact Info */}
            <div className="contact-info">
              <h2 className="contact-info-title">Get in Touch</h2>
              <p className="contact-info-description">
                We're here to help! Reach out to us through any of the following channels.
              </p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">📧</div>
                  <div className="contact-detail-content">
                    <h3 className="contact-detail-label">Email</h3>
                    <a href="mailto:info@realproduct.dev" className="contact-detail-value">
                      info@realproduct.dev
                    </a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">⏰</div>
                  <div className="contact-detail-content">
                    <h3 className="contact-detail-label">Response Time</h3>
                    <p className="contact-detail-value">Within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="contact-note">
                <p>
                  <strong>Prefer email?</strong> Send us a message directly at{' '}
                  <a href="mailto:info@realproduct.dev" className="contact-link">
                    info@realproduct.dev
                  </a>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2 className="contact-form-title">Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="form-message form-message-success">
                  <span className="form-message-icon">✓</span>
                  <p>Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-message form-message-error">
                  <span className="form-message-icon">✕</span>
                  <p>Something went wrong. Please try again or email us directly at info@realproduct.dev</p>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name <span className="form-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email <span className="form-required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject <span className="form-required">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input form-select"
                  >
                    <option value="">Select a subject</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="desktop-development">Desktop Development</option>
                    <option value="general-inquiry">General Inquiry</option>
                    <option value="quote">Request a Quote</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message <span className="form-required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="form-input form-textarea"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Math Challenge */}
                {isMounted && mathChallenge ? (
                  <div className="form-group" style={{ background: '#f0f7ff', padding: '1rem', borderRadius: '8px', border: '1px solid #b3d9ff' }}>
                    <label htmlFor="mathAnswer" className="form-label">
                      Verification: What is <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold', color: '#0066FF' }}>{mathChallenge.question}</span>?
                      <button
                        type="button"
                        onClick={regenerateChallenge}
                        style={{ marginLeft: '0.5rem', color: '#0066FF', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                        title="Get a new question"
                      >
                        New question
                      </button>
                    </label>
                    <input
                      type="number"
                      id="mathAnswer"
                      name="mathAnswer"
                      value={formData.mathAnswer}
                      onChange={handleChange}
                      required
                      min="0"
                      max="100"
                      className="form-input"
                      placeholder="Enter your answer"
                    />
                  </div>
                ) : (
                  <div className="form-group" style={{ background: '#f0f7ff', padding: '1rem', borderRadius: '8px', border: '1px solid #b3d9ff' }}>
                    <div style={{ height: '60px', background: '#e0f0ff', borderRadius: '4px' }}></div>
                  </div>
                )}

                {/* Honeypot field - hidden from users, bots will fill it */}
                <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                  <label htmlFor="website">Website (leave blank)</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-large form-submit"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

