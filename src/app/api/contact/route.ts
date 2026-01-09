import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Rate limiting - simple in-memory store (for production, consider Redis for distributed systems)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // Max 3 requests per minute per IP

// Hash IP for better privacy
function hashIP(ip: string): string {
  const salt = process.env.RATE_LIMIT_SALT || 'realproduct-default-salt';
  return crypto.createHash('sha256').update(ip + salt).digest('hex').substring(0, 16);
}

function isRateLimited(ip: string): boolean {
  const hashedIP = hashIP(ip);
  const now = Date.now();
  const record = rateLimitMap.get(hashedIP);

  if (!record) {
    rateLimitMap.set(hashedIP, { count: 1, timestamp: now });
    return false;
  }

  // Reset if window expired
  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(hashedIP, { count: 1, timestamp: now });
    return false;
  }

  // Check if limit exceeded
  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

// Validate form submission time (anti-bot measure)
// Real users need time to fill the form, bots submit instantly
function isValidSubmissionTime(timeSpent: number): boolean {
  const MIN_TIME = 2000; // Minimum 2 seconds (normal users need time)
  const MAX_TIME = 30 * 60 * 1000; // Maximum 30 minutes (reasonable limit)
  
  return timeSpent >= MIN_TIME && timeSpent <= MAX_TIME;
}

// Simple hash function for deterministic generation (same algorithm as client)
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Reconstruct math challenge from challengeId (deterministic)
function reconstructMathChallenge(challengeId: string): { answer: number } | null {
  try {
    // Use hash of challengeId for deterministic generation (same as client)
    const hash = simpleHash(challengeId);
    const seed1 = hash % 256;
    const seed2 = (hash >> 8) % 256;
    const operationSeed = (hash >> 16) % 256;
    
    const num1 = (seed1 % 10) + 1; // 1-10
    const num2 = (seed2 % 10) + 1; // 1-10
    const operation = (operationSeed % 2) === 0 ? "+" : "-";
    
    let answer: number;
    if (operation === "+") {
      answer = num1 + num2;
    } else {
      const larger = Math.max(num1, num2);
      const smaller = Math.min(num1, num2);
      answer = larger - smaller;
    }
    
    return { answer };
  } catch {
    return null;
  }
}

// Validate math challenge answer
function validateMathChallenge(challengeId: string, userAnswer: string): boolean {
  if (!challengeId || !userAnswer) {
    return false;
  }
  
  // Validate challengeId format (timestamp-random)
  const parts = challengeId.split("-");
  if (parts.length < 2) {
    return false;
  }
  
  const timestamp = parseInt(parts[0], 10);
  if (isNaN(timestamp) || timestamp < Date.now() - 3600000) {
    // Challenge must be less than 1 hour old
    return false;
  }
  
  const challenge = reconstructMathChallenge(challengeId);
  if (!challenge) {
    return false;
  }
  
  const answerNum = parseInt(userAnswer, 10);
  if (isNaN(answerNum)) {
    return false;
  }
  
  // Validate answer is in reasonable range (0-20 for simple math)
  if (answerNum < 0 || answerNum > 20) {
    return false;
  }
  
  // Must be exact match
  return answerNum === challenge.answer;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, website, timeSpent, mathAnswer, mathChallengeId } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Honeypot check - if "website" field is filled, it's a bot
    // Silently reject - don't let bots know they were caught
    if (website && website.trim() !== '') {
      return NextResponse.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200 }
      );
    }

    // Validate submission time (anti-bot measure)
    if (timeSpent !== undefined) {
      if (!isValidSubmissionTime(timeSpent)) {
        return NextResponse.json(
          { error: 'Invalid submission. Please try again.' },
          { status: 400 }
        );
      }
    }

    // Validate math challenge
    if (!mathChallengeId || !mathAnswer) {
      return NextResponse.json(
        { error: 'Math challenge verification failed. Please try again.' },
        { status: 400 }
      );
    }

    if (!validateMathChallenge(mathChallengeId, mathAnswer)) {
      return NextResponse.json(
        { error: 'Incorrect answer to the math question. Please try again.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Sanitize input to prevent XSS
    const sanitize = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const sanitizedName = sanitize(name);
    const sanitizedEmail = sanitize(email);
    const sanitizedSubject = sanitize(subject);
    const sanitizedMessage = sanitize(message).replace(/\n/g, '<br>');

    // Create transporter with proper TLS configuration
    const port = parseInt(process.env.SMTP_PORT || '587');
    // Port 465 uses SSL/TLS directly, other ports use STARTTLS
    const isSecure = port === 465 || process.env.SMTP_SECURE === 'true';
    
    const transporterConfig: any = {
      host: process.env.SMTP_HOST,
      port: port,
      secure: isSecure, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };

    // Add TLS configuration only for non-secure connections (STARTTLS)
    if (!isSecure) {
      transporterConfig.tls = {
        // Do not fail on invalid certificates (useful for self-signed certs in dev)
        rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
        // Use TLS 1.2 or higher
        minVersion: 'TLSv1.2',
      };
      // For non-secure connections, require STARTTLS
      transporterConfig.requireTLS = port !== 25;
    }
    
    const transporter = nodemailer.createTransport(transporterConfig);

    // Email content for company (info@realproduct.dev)
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'info@realproduct.dev',
      replyTo: email,
      subject: `Contact Form: ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0066FF;">New Contact Form Submission</h2>
          
          <div style="background: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${sanitizedEmail}</p>
            <p><strong>Subject:</strong> ${sanitizedSubject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #1A1A1A;">Message:</h3>
            <p style="line-height: 1.6;">${sanitizedMessage}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 30px 0;">
          
          <p style="color: #6B7280; font-size: 12px;">
            This email was sent from the contact form on realproduct.dev
          </p>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
    };

    // Confirmation email for the sender
    const confirmationMailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: `Thank you for contacting RealProduct - ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0066FF;">Thank You for Contacting Us!</h2>
          
          <p style="color: #1A1A1A; line-height: 1.6;">
            Hi ${sanitizedName},
          </p>
          
          <p style="color: #1A1A1A; line-height: 1.6;">
            Thank you for reaching out to RealProduct. We have received your message and will get back to you within 24 hours.
          </p>
          
          <div style="background: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0066FF;">
            <p style="margin: 0 0 10px 0;"><strong>Your Message:</strong></p>
            <p style="margin: 0; line-height: 1.6; color: #6B7280;">${sanitizedMessage}</p>
          </div>
          
          <p style="color: #1A1A1A; line-height: 1.6;">
            If you have any urgent questions, feel free to contact us directly at 
            <a href="mailto:info@realproduct.dev" style="color: #0066FF; text-decoration: none;">info@realproduct.dev</a>.
          </p>
          
          <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 30px 0;">
          
          <p style="color: #6B7280; font-size: 12px; margin: 0;">
            Best regards,<br>
            <strong>RealProduct Team</strong><br>
            <a href="https://realproduct.dev" style="color: #0066FF; text-decoration: none;">realproduct.dev</a>
          </p>
        </div>
      `,
      text: `
        Thank You for Contacting Us!
        
        Hi ${name},
        
        Thank you for reaching out to RealProduct. We have received your message and will get back to you within 24 hours.
        
        Your Message:
        ${message}
        
        If you have any urgent questions, feel free to contact us directly at info@realproduct.dev.
        
        Best regards,
        RealProduct Team
        realproduct.dev
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(confirmationMailOptions),
    ]);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email. Please try again later.';
    
    if (error.code === 'ESOCKET' || error.code === 'ECONNREFUSED') {
      errorMessage = 'Connection to email server failed. Please check your SMTP settings.';
    } else if (error.code === 'EAUTH') {
      errorMessage = 'Authentication failed. Please check your email and password.';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Connection timeout. Please check your SMTP host and port.';
    } else if (error.message?.includes('SSL') || error.message?.includes('TLS')) {
      errorMessage = 'SSL/TLS error. Try setting SMTP_PORT to 465 with SMTP_SECURE=true, or 587 with SMTP_SECURE=false.';
    }
    
    return NextResponse.json(
      { error: errorMessage, details: process.env.NODE_ENV === 'development' ? error.message : undefined },
      { status: 500 }
    );
  }
}

