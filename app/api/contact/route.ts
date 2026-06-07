import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
const LOGO_URL = `${SITE_URL}/logo-email.png`;

// Escape user-supplied values before interpolating into HTML.
function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// A single label/value row used in the detail tables.
function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:9px 0;color:#64748b;font-size:14px;width:130px;vertical-align:top;">${label}</td>
      <td style="padding:9px 0;color:#0f172a;font-size:14px;font-weight:600;vertical-align:top;">${value}</td>
    </tr>`;
}

// Shared, mobile-friendly email shell with branded header + footer.
function layout(subtitle: string, inner: string): string {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#eef2f4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f4;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;box-shadow:0 6px 28px rgba(10,77,104,0.10);">
        <tr><td style="background:#0a4d68;background:linear-gradient(135deg,#0a4d68 0%,#088395 100%);padding:38px 40px;text-align:center;">
          <img src="${LOGO_URL}" width="190" alt="${esc(siteConfig.name)}" style="display:block;margin:0 auto;border:0;height:auto;max-width:190px;" />
          ${subtitle ? `<p style="margin:18px 0 0;color:#bfe6ee;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;">${subtitle}</p>` : ""}
        </td></tr>
        <tr><td style="padding:36px 40px;color:#0f172a;font-size:15px;line-height:1.65;">
          ${inner}
        </td></tr>
        <tr><td style="background:#0a4d68;padding:28px 40px;text-align:center;color:#cfe7ee;font-size:13px;line-height:1.7;">
          <p style="margin:0 0 4px;color:#ffffff;font-size:16px;font-weight:bold;letter-spacing:1px;">${esc(siteConfig.name)}</p>
          <p style="margin:0;color:#9fd4e0;">${esc(siteConfig.tagline)}</p>
          <p style="margin:12px 0 0;">
            <a href="tel:${esc(siteConfig.phone)}" style="color:#cfe7ee;text-decoration:none;">${esc(siteConfig.phone)}</a>
            &nbsp;&middot;&nbsp;
            <a href="mailto:${esc(siteConfig.email)}" style="color:#cfe7ee;text-decoration:none;">${esc(siteConfig.email)}</a>
          </p>
          <p style="margin:6px 0 0;color:#9fd4e0;">${esc(siteConfig.address.island)}, ${esc(siteConfig.address.atoll)}, ${esc(siteConfig.address.country)}</p>
          <p style="margin:14px 0 0;">
            <a href="${esc(siteConfig.social.instagram)}" style="color:#9fd4e0;text-decoration:none;">Instagram</a>
            &nbsp;&middot;&nbsp;
            <a href="${esc(siteConfig.social.facebook)}" style="color:#9fd4e0;text-decoration:none;">Facebook</a>
          </p>
          <p style="margin:16px 0 0;color:#6fa6b6;font-size:11px;">&copy; ${year} ${esc(siteConfig.name)}. All rights reserved.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

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

    const isBooking = inquiryType === "booking";
    const prettyType =
      String(inquiryType).charAt(0).toUpperCase() + String(inquiryType).slice(1);

    // Booking detail rows, reused in both the internal notice and the guest copy.
    const bookingRows = isBooking
      ? `${roomType ? row("Room Type", esc(roomType)) : ""}
         ${checkIn ? row("Check-in", esc(checkIn)) : ""}
         ${checkOut ? row("Check-out", esc(checkOut)) : ""}
         ${guests ? row("Guests", esc(guests)) : ""}`
      : "";

    const messageBlock = message
      ? `<h2 style="margin:26px 0 10px;color:#0a4d68;font-size:16px;font-family:Georgia,'Times New Roman',serif;">${isBooking ? "Special Requests" : "Message"}</h2>
         <div style="background:#fbf8f1;padding:16px 18px;border-radius:10px;border:1px solid #e8e4dd;">
           <p style="margin:0;white-space:pre-wrap;color:#334155;">${esc(message)}</p>
         </div>`
      : "";

    /* ------------------------------------------------------------------ *
     * 1. Internal notification → hello@rasgrand.com                       *
     * ------------------------------------------------------------------ */
    const internalSubject = isBooking
      ? `🏨 New Booking Request — ${roomType || "Room"} | ${name}`
      : `📩 New ${inquiryType} Inquiry from ${name}${subject ? ` — ${subject}` : ""}`;

    const internalInner = `
      <p style="margin:0 0 22px;">A new <strong>${esc(isBooking ? "booking request" : `${inquiryType} inquiry`)}</strong> has just come in through the website.</p>
      <h2 style="margin:0 0 8px;color:#0a4d68;font-size:16px;font-family:Georgia,'Times New Roman',serif;">Contact Details</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row("Name", esc(name))}
        ${row("Email", `<a href="mailto:${esc(email)}" style="color:#088395;text-decoration:none;">${esc(email)}</a>`)}
        ${phone ? row("Phone", esc(phone)) : ""}
        ${row("Inquiry Type", esc(prettyType))}
        ${subject && !isBooking ? row("Subject", esc(subject)) : ""}
      </table>
      ${
        isBooking
          ? `<h2 style="margin:26px 0 8px;color:#0a4d68;font-size:16px;font-family:Georgia,'Times New Roman',serif;">Booking Details</h2>
             <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${bookingRows}</table>`
          : ""
      }
      ${messageBlock}
      <div style="margin:28px 0 0;padding:14px 16px;background:#ecf7fa;border-left:4px solid #1fb3c7;border-radius:6px;">
        <p style="margin:0;color:#0a4d68;font-size:13px;">💬 Just hit <strong>Reply</strong> to respond directly to ${esc(name)}.</p>
      </div>`;

    const { error: internalError } = await resend.emails.send({
      from: process.env.MAIL_FROM || `${siteConfig.name} <${siteConfig.email}>`,
      to: process.env.MAIL_TO || siteConfig.email,
      replyTo: email,
      subject: internalSubject,
      html: layout(
        isBooking ? "New Booking Request" : "New Contact Inquiry",
        internalInner,
      ),
    });

    if (internalError) {
      console.error("Resend error (internal):", internalError);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 },
      );
    }

    /* ------------------------------------------------------------------ *
     * 2. Confirmation auto-reply → the guest                              *
     * Best-effort: a failure here must not fail the submission.           *
     * ------------------------------------------------------------------ */
    const summaryRows = `
      ${row("Inquiry Type", esc(prettyType))}
      ${subject && !isBooking ? row("Subject", esc(subject)) : ""}
      ${bookingRows}`;

    const confirmationInner = `
      <p style="margin:0 0 18px;font-size:18px;color:#0a4d68;font-family:Georgia,'Times New Roman',serif;">Dear ${esc(name)},</p>
      <p style="margin:0 0 16px;">Thank you for ${isBooking ? "your booking request" : "reaching out to us"}. We're delighted you're considering ${esc(siteConfig.name)} for your stay in the Maldives, and we've received your ${isBooking ? "request" : "message"}.</p>
      <p style="margin:0 0 26px;">Our team will personally review the details below and get back to you <strong>within 24 hours</strong>.</p>

      <h2 style="margin:0 0 8px;color:#0a4d68;font-size:16px;font-family:Georgia,'Times New Roman',serif;">${isBooking ? "Your Booking Request" : "Your Inquiry"}</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fbf8f1;border:1px solid #e8e4dd;border-radius:10px;padding:6px 18px;">
        ${summaryRows}
      </table>
      ${messageBlock}

      <p style="margin:28px 0 0;">In the meantime, if your matter is urgent, feel free to call or WhatsApp us at <a href="tel:${esc(siteConfig.phone)}" style="color:#088395;text-decoration:none;font-weight:600;">${esc(siteConfig.phone)}</a>.</p>
      <p style="margin:24px 0 0;">Warm regards,</p>
      <p style="margin:4px 0 0;font-weight:bold;color:#0a4d68;">The ${esc(siteConfig.name)} Team</p>`;

    const { error: confirmError } = await resend.emails.send({
      from: process.env.MAIL_FROM || `${siteConfig.name} <${siteConfig.email}>`,
      to: email,
      replyTo: process.env.MAIL_TO || siteConfig.email,
      subject: isBooking
        ? `We've received your booking request — ${siteConfig.name}`
        : `Thanks for contacting ${siteConfig.name} — we'll be in touch`,
      html: layout("Thank You", confirmationInner),
    });

    if (confirmError) {
      // Don't fail the request; the internal notice already went through.
      console.error("Resend error (confirmation):", confirmError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
