import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      inquiryType,
      roomType,
      checkIn,
      checkOut,
      guests,
      subject,
      message,
    } = body;

    // Validate required fields
    if (!name || !email || !inquiryType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Build email subject
    const emailSubject =
      inquiryType === "booking"
        ? `🏨 New Booking Request — ${roomType || "Room"} | ${name}`
        : `📩 New ${inquiryType} Inquiry from ${name}${subject ? ` — ${subject}` : ""}`;

    // Build email body
    let emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #0c4a6e; color: white; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Ras Grand</h1>
          <p style="margin: 5px 0 0; opacity: 0.8; font-size: 14px;">New ${inquiryType === "booking" ? "Booking Request" : "Contact Form Submission"}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 24px; border: 1px solid #e9ecef; border-top: none;">
          <h2 style="color: #0c4a6e; margin-top: 0;">Contact Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;">Name:</td>
              <td style="padding: 8px 0; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0c4a6e;">${email}</a></td>
            </tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #666;">Phone:</td><td style="padding: 8px 0;">${phone}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #666;">Inquiry Type:</td>
              <td style="padding: 8px 0;">${inquiryType.charAt(0).toUpperCase() + inquiryType.slice(1)}</td>
            </tr>
          </table>
    `;

    if (inquiryType === "booking") {
      emailBody += `
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 16px 0;" />
          <h2 style="color: #0c4a6e;">Booking Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;">Room Type:</td>
              <td style="padding: 8px 0; font-weight: bold;">${roomType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Check-in:</td>
              <td style="padding: 8px 0;">${checkIn}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Check-out:</td>
              <td style="padding: 8px 0;">${checkOut}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Guests:</td>
              <td style="padding: 8px 0;">${guests}</td>
            </tr>
          </table>
      `;
    }

    if (message) {
      emailBody += `
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 16px 0;" />
          <h2 style="color: #0c4a6e;">${inquiryType === "booking" ? "Special Requests" : "Message"}</h2>
          <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #dee2e6;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
      `;
    }

    if (subject && inquiryType !== "booking") {
      emailBody += `
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 16px 0;" />
          <p style="color: #666;"><strong>Subject:</strong> ${subject}</p>
      `;
    }

    emailBody += `
        </div>
        <div style="background: #0c4a6e; color: white; padding: 16px; border-radius: 0 0 12px 12px; text-align: center; font-size: 12px;">
          <p style="margin: 0; opacity: 0.7;">This email was sent from the contact form at rasgrand.com</p>
        </div>
      </div>
    `;

    // Configure SMTP transporter
    // Set these environment variables in your .env.local file:
    // SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"Ras Grand Website" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || "areejhwahid@gmail.com",
      replyTo: email,
      subject: emailSubject,
      html: emailBody,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
