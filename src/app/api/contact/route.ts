import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
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

