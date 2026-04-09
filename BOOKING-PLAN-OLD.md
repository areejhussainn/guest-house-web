# Ras Grand — Booking Management System Plan

## Overview

A full booking and staff management system for Ras Grand Guest House. Guests can check availability, book rooms, and manage their bookings via a magic-link session (no passwords). Staff can manage all bookings, room inventory, and availability through a protected portal.

---

## Property Inventory

| Room Type             | Count  | Rate/Night | Capacity | Bedrooms |
| --------------------- | ------ | ---------- | -------- | -------- |
| Deluxe Rooms          | 17     | $120       | 2 guests | 1        |
| Superior Deluxe Rooms | 4      | $140       | 2 guests | 1        |
| Mini Suites           | 3      | $220       | 4 guests | 2        |
| Apartment             | 1      | $250       | 4 guests | 2        |
| **Total**             | **25** |            |          |          |

---

## Tech Stack Additions

| Layer         | Technology                               | Why                                                                                  |
| ------------- | ---------------------------------------- | ------------------------------------------------------------------------------------ |
| Database      | **PostgreSQL** (via Supabase or Neon)    | Relational data fits bookings; free tier available                                   |
| ORM           | **Prisma**                               | Type-safe queries, migrations, works great with Next.js                              |
| Auth (Staff)  | **NextAuth.js v5** (Auth.js)             | Credential-based login for staff portal                                              |
| Auth (Guests) | **Magic Link via Email**                 | No passwords — guest enters email, gets a one-time link to view/manage their booking |
| Email         | **Nodemailer** (already installed)       | Booking confirmations, magic links, reminders                                        |
| Validation    | **Zod** (already installed)              | Schema validation for all forms and API inputs                                       |
| Payments      | **Stripe** (Phase 2)                     | Optional — collect deposits or full payment online                                   |
| Calendar UI   | **react-day-picker** (already installed) | Date range selection for check-in/check-out                                          |

---

## Database Schema

### Core Tables

```
┌─────────────────────┐     ┌─────────────────────┐
│ room_types          │     │ rooms               │
├─────────────────────┤     ├─────────────────────┤
│ id (PK)             │◄────│ room_type_id (FK)   │
│ name                │     │ id (PK)             │
│ slug                │     │ room_number         │
│ description         │     │ floor               │
│ price_per_night     │     │ status (available/   │
│ capacity_adults     │     │   maintenance/       │
│ capacity_children   │     │   out-of-service)   │
│ bedrooms            │     │ notes               │
│ size_sqft           │     └─────────────────────┘
│ amenities (json)    │
│ features (json)     │
│ images (json)       │
└─────────────────────┘

┌─────────────────────┐     ┌─────────────────────┐
│ bookings            │     │ guests              │
├─────────────────────┤     ├─────────────────────┤
│ id (PK)             │     │ id (PK)             │
│ booking_ref (unique)│     │ email (unique)      │
│ guest_id (FK)       │────►│ full_name           │
│ room_id (FK)        │     │ phone               │
│ room_type_id (FK)   │     │ country             │
│ check_in            │     │ created_at          │
│ check_out           │     └─────────────────────┘
│ adults              │
│ children            │     ┌─────────────────────┐
│ total_price         │     │ staff               │
│ status (pending/    │     ├─────────────────────┤
│  confirmed/         │     │ id (PK)             │
│  checked-in/        │     │ email               │
│  checked-out/       │     │ name                │
│  cancelled/         │     │ password_hash       │
│  no-show)           │     │ role (admin/staff)  │
│ special_requests    │     │ created_at          │
│ payment_status      │     └─────────────────────┘
│ payment_method      │
│ notes (staff-only)  │     ┌─────────────────────┐
│ created_at          │     │ magic_links         │
│ updated_at          │     ├─────────────────────┤
└─────────────────────┘     │ id (PK)             │
                            │ token (unique)      │
┌─────────────────────┐     │ email               │
│ blocked_dates       │     │ booking_id (FK)     │
├─────────────────────┤     │ expires_at          │
│ id (PK)             │     │ used (boolean)      │
│ room_type_id (FK)   │     └─────────────────────┘
│ room_id (FK, nullable)│
│ date                │
│ reason              │
│ created_by (FK)     │
└─────────────────────┘
```

### Prisma Schema Summary

- **RoomType** — the 4 room categories with pricing and details
- **Room** — individual physical rooms (25 total), each linked to a type
- **Guest** — anyone who books (identified by email, no password)
- **Booking** — the core booking record with dates, status, pricing
- **Staff** — admin/staff accounts with hashed passwords
- **MagicLink** — time-limited tokens for guest access to their bookings
- **BlockedDate** — staff can block dates per room or room type (maintenance, hold, etc.)

---

## Guest Booking Flow

```
┌───────────────────────────────────────────────────────────┐
│                    GUEST BOOKING FLOW                      │
└───────────────────────────────────────────────────────────┘

1. SELECT DATES & ROOM
   Guest picks check-in/check-out dates and room type
   ↓
   System checks availability (real-time against DB)
   ↓
   Shows available rooms with pricing breakdown

2. ENTER DETAILS
   Guest fills: name, email, phone, country, special requests
   ↓
   Guest count (adults + children) validated against room capacity

3. REVIEW & CONFIRM
   Shows: room details, dates, nights, price breakdown
   ↓
   Guest clicks "Confirm Booking"

4. MAGIC LINK VERIFICATION
   System sends email to guest with:
   - Booking confirmation (ref# RG-XXXXXX)
   - Magic link to view/manage booking (valid 30 days)
   - Check-in instructions
   ↓
   No account or password needed

5. BOOKING STATUS → "Pending"
   Staff gets email notification of new booking
   Staff confirms or contacts guest
   Status → "Confirmed"
```

### Why Magic Links Instead of OTP?

| Approach               | Pros                                                                                                  | Cons                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **OTP via email**      | Familiar pattern                                                                                      | Expires quickly, bad UX if email is slow, requires session management |
| **Magic Link** ✅      | One click to access, works across devices, link remains valid for days, doubles as confirmation email | Slightly less familiar for some users                                 |
| **Account + Password** | Full control                                                                                          | Overkill for 1–2 bookings, guests won't remember passwords            |

**Magic links win** because:

- Guest clicks one link in their email → instant access to their booking
- No codes to copy, no passwords to remember
- The confirmation email IS the access method
- Link is valid for 30 days, and guest can request a new one anytime
- Staff can also send a fresh link to guest if needed

---

## Staff Portal

### URL Structure

```
/staff/login              — Staff login (email + password)
/staff/dashboard          — Overview: today's arrivals, departures, occupancy
/staff/bookings           — All bookings list (filterable, searchable)
/staff/bookings/[id]      — Single booking detail + actions
/staff/bookings/new       — Create booking manually (walk-in, phone, etc.)
/staff/calendar           — Visual calendar view of all rooms
/staff/rooms              — Room inventory and status management
/staff/guests             — Guest directory
/staff/settings           — Rate management, blocked dates, staff accounts
```

### Dashboard Features

```
┌─────────────────────────────────────────────────────┐
│  STAFF DASHBOARD                                     │
├──────────────┬──────────────┬───────────────────────┤
│ Today        │ This Week    │ Occupancy             │
│ ─────────    │ ──────────   │ ──────────            │
│ 3 Arrivals   │ 12 Bookings  │ ████████░░ 80%       │
│ 2 Departures │ $4,200 Rev   │ 20/25 rooms          │
│ 1 Pending    │ 2 Pending    │                       │
├──────────────┴──────────────┴───────────────────────┤
│                                                      │
│  TODAY'S ACTIVITY                                    │
│  ┌──────────────────────────────────────────────┐   │
│  │ ✈ CHECK-IN   Room 201  John D.   14:00      │   │
│  │ ✈ CHECK-IN   Room 105  Sarah M.  14:00      │   │
│  │ ✈ CHECK-IN   Room 301  Ali R.    15:00      │   │
│  │ 🔑 CHECK-OUT Room 102  Emma W.   11:00      │   │
│  │ 🔑 CHECK-OUT Room 204  Yuki T.   11:00      │   │
│  │ ⏳ PENDING   Apt 1     Mark L.   Confirm?   │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  QUICK ACTIONS                                       │
│  [+ New Booking]  [Block Dates]  [Send Reminder]    │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Staff Actions on Bookings

- **Confirm** pending booking → sends confirmation email to guest
- **Check-in / Check-out** → updates status
- **Cancel** → with optional reason, notifies guest
- **Mark No-Show** → for guests who didn't arrive
- **Add Notes** → internal staff notes
- **Resend Magic Link** → if guest lost their email
- **Modify Dates/Room** → reassign if needed
- **Create Manual Booking** → for walk-ins or phone bookings

### Calendar View

- Visual grid: rooms on Y-axis, dates on X-axis
- Color-coded blocks: confirmed (green), pending (yellow), checked-in (blue), blocked (gray)
- Click-to-create bookings on empty slots
- Drag to extend stay duration
- Shows occupancy percentage per day

---

## Public Booking Pages

### URL Structure

```
/book                     — Room selection + date picker (main booking page)
/book/details             — Guest details form
/book/confirm             — Review & confirm
/book/success             — Confirmation page
/booking/[token]          — Guest views their booking via magic link
/booking/[token]/cancel   — Guest cancels their booking
/booking/lookup           — Guest enters email to get a new magic link
```

### Availability Checker

```
┌─────────────────────────────────────────────────────┐
│  BOOK YOUR STAY                                      │
│                                                      │
│  Check-in:  [  Apr 15, 2026  ]                      │
│  Check-out: [  Apr 20, 2026  ]                      │
│  Guests:    [  2 Adults  ▼]  [  0 Children  ▼]     │
│                                                      │
│  [  Check Availability  ]                            │
│                                                      │
│  ─────────────────────────────────────────────────   │
│                                                      │
│  AVAILABLE ROOMS                   5 nights          │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │ 🏠 Deluxe Room           $120/night         │    │
│  │ 15 available              Total: $600        │    │
│  │ [Select Room →]                              │    │
│  ├─────────────────────────────────────────────┤    │
│  │ ⭐ Superior Deluxe Room   $140/night         │    │
│  │ 3 available               Total: $700        │    │
│  │ [Select Room →]                              │    │
│  ├─────────────────────────────────────────────┤    │
│  │ 🛋 Mini Suites 2 Rooms    $220/night         │    │
│  │ 2 available               Total: $1,100      │    │
│  │ [Select Room →]                              │    │
│  ├─────────────────────────────────────────────┤    │
│  │ 🏆 Apartment 2 Room       $250/night         │    │
│  │ 1 available               Total: $1,250      │    │
│  │ [Select Room →]                              │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

---

## API Routes

### Public APIs

```
POST   /api/booking/check-availability    — Check room availability for dates
POST   /api/booking/create                — Create a new booking
GET    /api/booking/[token]               — Get booking by magic link token
POST   /api/booking/[token]/cancel        — Cancel a booking
POST   /api/booking/lookup                — Request new magic link by email
GET    /api/rooms                         — Get all room types with availability
```

### Staff APIs (protected)

```
GET    /api/staff/bookings                — List all bookings (with filters)
GET    /api/staff/bookings/[id]           — Get single booking
PATCH  /api/staff/bookings/[id]           — Update booking status/details
POST   /api/staff/bookings                — Create manual booking
DELETE /api/staff/bookings/[id]           — Cancel booking

GET    /api/staff/dashboard               — Dashboard stats
GET    /api/staff/calendar                — Calendar data for date range
GET    /api/staff/rooms                   — All rooms with current status
PATCH  /api/staff/rooms/[id]              — Update room status

POST   /api/staff/blocked-dates           — Block dates for room/type
DELETE /api/staff/blocked-dates/[id]      — Unblock dates

GET    /api/staff/guests                  — Guest directory
GET    /api/staff/guests/[id]             — Guest history

POST   /api/auth/staff/login              — Staff login
POST   /api/auth/staff/logout             — Staff logout
```

---

## Email Notifications

All sent via Nodemailer (already configured):

| Trigger                    | Recipient | Content                                     |
| -------------------------- | --------- | ------------------------------------------- |
| New booking created        | Guest     | Confirmation + magic link + booking details |
| New booking created        | Staff     | Notification with booking summary           |
| Booking confirmed by staff | Guest     | Confirmation update + check-in instructions |
| Booking cancelled          | Guest     | Cancellation confirmation                   |
| Magic link requested       | Guest     | Fresh access link to their booking          |
| 3 days before check-in     | Guest     | Reminder with arrival instructions          |
| Booking modified           | Guest     | Updated details notification                |

---

## Implementation Phases

### Phase 1 — Foundation (Week 1–2)

> Database, auth, and core booking engine

- [ ] Set up PostgreSQL (Supabase/Neon free tier)
- [ ] Set up Prisma with schema, seed script for 25 rooms
- [ ] Staff auth with NextAuth.js (credential login)
- [ ] Magic link generation and verification utils
- [ ] Core booking API: check availability, create, read
- [ ] Email templates (booking confirmation, magic link)
- [ ] Zod validation schemas for all inputs

### Phase 2 — Guest Booking UI (Week 2–3)

> Public-facing booking pages

- [ ] `/book` — Date picker, guest count, room type selection
- [ ] Availability checker component (real-time against DB)
- [ ] `/book/details` — Guest info form
- [ ] `/book/confirm` — Review & confirm page
- [ ] `/book/success` — Post-booking confirmation
- [ ] `/booking/[token]` — View booking via magic link
- [ ] `/booking/[token]/cancel` — Cancel flow
- [ ] `/booking/lookup` — Request new magic link
- [ ] Update home page & facilities with "Book Now" buttons linking to `/book`

### Phase 3 — Staff Portal (Week 3–5)

> Staff dashboard and booking management

- [ ] `/staff/login` — Login page
- [ ] `/staff/dashboard` — Stats, today's arrivals/departures
- [ ] `/staff/bookings` — Booking list with filters (status, date range, room type)
- [ ] `/staff/bookings/[id]` — Booking detail with actions (confirm, check-in, cancel, notes)
- [ ] `/staff/bookings/new` — Create manual booking
- [ ] `/staff/calendar` — Visual room/date calendar
- [ ] `/staff/rooms` — Room status management
- [ ] `/staff/settings` — Block dates, manage rates

### Phase 4 — Polish & Extras (Week 5–6)

> Enhancements and production readiness

- [ ] Automated email reminders (3 days before check-in)
- [ ] Booking search & export (CSV)
- [ ] Rate management (seasonal pricing, overrides per date)
- [ ] Mobile-optimized staff portal
- [ ] Loading states, error handling, edge cases
- [ ] Production deployment checklist

### Phase 5 — Payments (Optional, Future)

> Online payment collection

- [ ] Stripe integration for deposit collection (30% on booking)
- [ ] Payment status tracking in booking
- [ ] Refund handling for cancellations
- [ ] Payment receipts via email

---

## File Structure (New)

```
app/
  book/
    page.tsx                    — Main booking page (date/room selection)
    details/page.tsx            — Guest details form
    confirm/page.tsx            — Review & confirm
    success/page.tsx            — Post-booking confirmation
  booking/
    [token]/page.tsx            — Guest booking view (via magic link)
    [token]/cancel/page.tsx     — Cancel booking page
    lookup/page.tsx             — Request new magic link
  staff/
    login/page.tsx              — Staff login
    layout.tsx                  — Staff layout (sidebar, auth guard)
    dashboard/page.tsx          — Dashboard
    bookings/page.tsx           — Bookings list
    bookings/[id]/page.tsx      — Booking detail
    bookings/new/page.tsx       — Create booking
    calendar/page.tsx           — Calendar view
    rooms/page.tsx              — Room management
    settings/page.tsx           — Settings
  api/
    booking/
      check-availability/route.ts
      create/route.ts
      [token]/route.ts
      [token]/cancel/route.ts
      lookup/route.ts
    staff/
      bookings/route.ts
      bookings/[id]/route.ts
      dashboard/route.ts
      calendar/route.ts
      rooms/route.ts
      rooms/[id]/route.ts
      blocked-dates/route.ts
      blocked-dates/[id]/route.ts
      guests/route.ts
      guests/[id]/route.ts
    auth/
      [...nextauth]/route.ts
lib/
  db.ts                         — Prisma client singleton
  auth.ts                       — NextAuth config
  email/
    templates.ts                — HTML email templates
    send.ts                     — Send email utility
  booking/
    availability.ts             — Availability checking logic
    pricing.ts                  — Price calculation
    magic-link.ts               — Generate & verify magic links
  validations/
    booking.ts                  — Zod schemas for booking
    staff.ts                    — Zod schemas for staff actions
prisma/
  schema.prisma                 — Database schema
  seed.ts                       — Seed 25 rooms + room types
  migrations/                   — Database migrations
```

---

## Environment Variables (New)

```env
# Database
DATABASE_URL=postgres://...

# NextAuth
NEXTAUTH_SECRET=your-random-secret
NEXTAUTH_URL=http://localhost:3000

# Existing (already in .env.local)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
MAIL_TO=

# Magic Links
MAGIC_LINK_SECRET=your-random-secret
NEXT_PUBLIC_APP_URL=https://rasgrand.com

# Stripe (Phase 5, optional)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

---

## Security Considerations

- All staff routes behind NextAuth middleware (check session + role)
- Magic link tokens: cryptographically random, 64-char hex, expire in 30 days
- Rate limiting on booking creation and magic link requests (prevent spam)
- CSRF protection via Next.js built-in
- All user inputs validated with Zod before touching DB
- SQL injection prevented by Prisma (parameterized queries)
- Staff passwords hashed with bcrypt
- No sensitive data in URLs or client-side state
- Booking refs are non-sequential (e.g., RG-A7X9K2) to prevent enumeration

---

## Quick Start (When Ready to Implement)

```bash
# 1. Install new dependencies
pnpm add @prisma/client next-auth@beta bcryptjs crypto-js
pnpm add -D prisma @types/bcryptjs

# 2. Initialize Prisma
npx prisma init

# 3. Configure DATABASE_URL in .env.local

# 4. Run migrations
npx prisma migrate dev --name init

# 5. Seed rooms
npx prisma db seed
```
