import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, room, checkIn, checkOut, requests } = body;

    // Server-side validation
    if (!name || !email || !phone || !room || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure SMTP environment variables
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465');
    const smtpSecure = process.env.SMTP_SECURE === 'false' ? false : true; // default true for 465
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Destination email as requested
    const toEmail = 'mywayapt@gmail.com';

    // If SMTP credentials are not configured, simulate success and print to console (useful for development)
    if (!smtpUser || !smtpPass) {
      console.warn('--- Nodemailer Warning: SMTP credentials (SMTP_USER, SMTP_PASS) not configured! ---');
      console.log('--- Simulated Email Sent ---');
      console.log(`To: ${toEmail}`);
      console.log(`Subject: [Direct Booking Inquiry] - ${name} (${room})`);
      console.log('Body:', {
        name,
        email,
        phone,
        room,
        checkIn,
        checkOut,
        requests: requests || 'None'
      });
      console.log('----------------------------');

      return NextResponse.json({
        success: true,
        message: 'Direct booking request simulated successfully. Please configure your SMTP environment variables (SMTP_USER, SMTP_PASS) in production to receive live emails.',
        simulated: true
      });
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Clean dates formatting
    const checkInDate = new Date(checkIn).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const checkOutDate = new Date(checkOut).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // HTML Email Template
    const htmlContent = `
      <div style="font-family: 'Inter', -apple-system, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background-color: #1a1a1a; padding: 2rem; text-align: center; color: #fff;">
          <h2 style="margin: 0; font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; letter-spacing: 0.05em; font-weight: 500;">NEW DIRECT BOOKING REQUEST</h2>
          <p style="margin: 0.5rem 0 0 0; color: #d4af37; font-size: 0.875rem; text-transform: uppercase; font-weight: 600; letter-spacing: 0.1em;">10% Direct Booking Discount Applied</p>
        </div>
        
        <div style="padding: 2rem; background-color: #ffffff;">
          <h3 style="margin-top: 0; font-size: 1.125rem; border-bottom: 2px solid #f4eee8; padding-bottom: 0.5rem; color: #1a1a1a;">Guest Information</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
            <tr>
              <td style="padding: 0.5rem 0; font-weight: 600; width: 35%; color: #666;">Guest Name:</td>
              <td style="padding: 0.5rem 0; color: #1a1a1a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; font-weight: 600; color: #666;">Email Address:</td>
              <td style="padding: 0.5rem 0; color: #1a1a1a;"><a href="mailto:${email}" style="color: #003580; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; font-weight: 600; color: #666;">Phone Number:</td>
              <td style="padding: 0.5rem 0; color: #1a1a1a;"><a href="tel:${phone}" style="color: #003580; text-decoration: none;">${phone}</a></td>
            </tr>
          </table>

          <h3 style="margin-top: 0; font-size: 1.125rem; border-bottom: 2px solid #f4eee8; padding-bottom: 0.5rem; color: #1a1a1a;">Reservation Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
            <tr>
              <td style="padding: 0.5rem 0; font-weight: 600; width: 35%; color: #666;">Selected Room:</td>
              <td style="padding: 0.5rem 0; color: #1a1a1a; font-weight: 600;">${room}</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; font-weight: 600; color: #666;">Check-In Date:</td>
              <td style="padding: 0.5rem 0; color: #258635; font-weight: 500;">${checkInDate}</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; font-weight: 600; color: #666;">Check-Out Date:</td>
              <td style="padding: 0.5rem 0; color: #c0392b; font-weight: 500;">${checkOutDate}</td>
            </tr>
          </table>

          ${requests ? `
            <h3 style="margin-top: 0; font-size: 1.125rem; border-bottom: 2px solid #f4eee8; padding-bottom: 0.5rem; color: #1a1a1a;">Special Requests</h3>
            <div style="background-color: #f9f9f9; padding: 1rem; border-radius: 6px; border-left: 4px solid #d4af37; font-style: italic; line-height: 1.5; color: #555;">
              ${requests.replace(/\n/g, '<br/>')}
            </div>
          ` : ''}
        </div>
        
        <div style="background-color: #f4eee8; padding: 1.5rem; text-align: center; font-size: 0.75rem; color: #666; border-top: 1px solid #e0e0e0;">
          <p style="margin: 0;">This email was sent automatically from your website direct booking form.</p>
          <p style="margin: 0.25rem 0 0 0;">&copy; ${new Date().getFullYear()} My Stay & Apartment. All rights reserved.</p>
        </div>
      </div>
    `;

    // Plain text content fallback
    const textContent = `
      NEW DIRECT BOOKING REQUEST
      ===================================
      10% Direct Booking Discount Applied

      GUEST INFORMATION
      ----------------
      Guest Name: ${name}
      Email Address: ${email}
      Phone Number: ${phone}

      RESERVATION DETAILS
      -------------------
      Selected Room: ${room}
      Check-In Date: ${checkInDate}
      Check-Out Date: ${checkOutDate}

      ${requests ? `SPECIAL REQUESTS\n----------------\n${requests}` : ''}

      ===================================
      Sent automatically from your website direct booking form.
    `;

    // Send the email
    await transporter.sendMail({
      from: `"${name} (Booking Inquiry)" <${smtpUser}>`, // Sender email (SMTP auth user)
      replyTo: email, // Direct reply to the guest
      to: toEmail, // Recipient email
      subject: `[Direct Booking Request] - ${name} (${room})`,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      message: 'Booking request sent successfully!'
    });
  } catch (error: any) {
    console.error('Error sending direct booking request email:', error);
    return NextResponse.json(
      { error: 'Failed to process booking request. Please try again later.' },
      { status: 500 }
    );
  }
}
