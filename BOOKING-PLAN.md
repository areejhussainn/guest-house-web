# Ras Grand — Full Backend, CMS & Booking System Plan

## Overview

A comprehensive backend system for Ras Grand Guest House that replaces all hardcoded content with a database-driven CMS, adds a full booking engine with guest magic-link sessions, and provides a staff portal for managing everything — content, rooms, bookings, and guests.

---

## The Problem: Everything Is Hardcoded

Right now the site has content scattered across 10+ files as static arrays. Any update (a new photo, a price change, a testimonial) requires a code edit and redeployment.

| Hardcoded Data           | Location                            | Items |
| ------------------------ | ----------------------------------- | ----- |
| Room types + pricing     | `data/rooms.ts`                     | 4     |
| Room types (duplicate)   | `facilities-content.tsx`            | 4     |
| Room types (duplicate)   | `rooms-preview.tsx`                 | 4     |
| Testimonials             | `data/testimonials.ts`              | 6     |
| Experiences/tours        | `data/experiences.ts`               | 6     |
| Gallery images           | `gallery-content.tsx`               | 21    |
| Amenities list           | `facilities-content.tsx`            | 8     |
| Service descriptions     | `facilities-content.tsx`            | 4     |
| FAQs                     | `contact-content.tsx`               | 5     |
| Service hours            | `contact-content.tsx`               | 5     |
| Facilities list          | `facilities-preview.tsx`            | 6     |
| Site config              | `lib/constants.ts`                  | 1     |
| About page content       | `about-content.tsx`                 | prose |

**Solution:** One database, one API layer, one staff portal to manage it all.

---

## Tech Stack

| Layer              | Technology                            | Why                                                               |
| ------------------ | ------------------------------------- | ----------------------------------------------------------------- |
| **Database**       | PostgreSQL (Neon / Supabase)          | Relational, perfect for bookings + content; generous free tier    |
| **ORM**            | Prisma                                | Type-safe, auto-generated types, migrations, seeding              |
| **Auth (Staff)**   | NextAuth.js v5 (Auth.js)              | Credential login for staff, session management, role-based access |
| **Auth (Guests)**  | Magic Links via Email                 | Zero-friction — no accounts, no passwords, just click email link  |
| **File Storage**   | Cloudinary or Uploadthing             | Image uploads from staff portal (gallery, rooms, etc.)            |
| **Email**          | Nodemailer (already installed)        | Booking confirmations, magic links, reminders                     |
| **Validation**     | Zod (already installed)               | All forms and API inputs validated before DB                      |
| **Rich Text**      | Tiptap or Plate (for about/page text) | WYSIWYG editing for staff on long-form content                    |
| **Payments**       | Stripe (future phase)                 | Optional deposit collection                                       |
| **Calendar UI**    | react-day-picker (already installed)  | Date range selection                                               |

---

## Database Schema

### Content Management Tables

```
┌────────────────────────┐
│ room_types             │  ← Replaces data/rooms.ts, rooms-preview, facilities roomTypes
├────────────────────────┤
│ id (PK)                │
│ name                   │  "Deluxe Room"
│ slug                   │  "deluxe-room"
│ tagline                │  "Classic island comfort"
│ description            │  Long text
│ short_description      │  One-liner
│ price_per_night        │  120
│ currency               │  "USD"
│ capacity_adults        │  2
│ capacity_children      │  0
│ size                   │  "About 195 Square Feet"
│ bedrooms               │  1
│ bathrooms              │  1
│ total_count            │  17 (how many physical rooms of this type)
│ amenities              │  JSON ["wifi","ac","breakfast"]
│ features               │  JSON ["Queen bed","AC","Hot Water"]
│ highlights             │  JSON ["Great value","Close to beach"]
│ images                 │  JSON [{url, alt}]
│ thumbnail              │  URL string
│ display_order          │  Int (sort order on site)
│ featured               │  Boolean
│ is_active              │  Boolean
│ created_at             │
│ updated_at             │
└────────────────────────┘

┌────────────────────────┐
│ rooms                  │  ← 25 individual physical rooms
├────────────────────────┤
│ id (PK)                │
│ room_type_id (FK)      │
│ room_number            │  "101", "201", "APT-1"
│ floor                  │  1, 2, 3
│ status                 │  "available" | "maintenance" | "out-of-service"
│ notes                  │  Staff notes
│ created_at             │
│ updated_at             │
└────────────────────────┘

┌────────────────────────┐
│ gallery_images         │  ← Replaces hardcoded images array in gallery-content
├────────────────────────┤
│ id (PK)                │
│ src                    │  URL (Cloudinary or /gallery/...)
│ alt                    │  Alt text
│ category               │  "pool" | "beach" | "rooms" | "dining"
│ display_order          │  Int
│ is_active              │  Boolean
│ uploaded_at            │
└────────────────────────┘

┌────────────────────────┐
│ testimonials           │  ← Replaces data/testimonials.ts
├────────────────────────┤
│ id (PK)                │
│ guest_name             │
│ avatar_url             │  Optional
│ location               │  "London, UK"
│ rating                 │  1-5
│ title                  │  Headline
│ content                │  Review text
│ room_stayed            │  Optional
│ date                   │  Date of stay
│ verified               │  Boolean
│ is_active              │  Boolean
│ created_at             │
└────────────────────────┘

┌────────────────────────┐
│ experiences            │  ← Replaces data/experiences.ts
├────────────────────────┤
│ id (PK)                │
│ name                   │
│ slug                   │
│ category               │  "water-sports" | "diving" | "excursions" | etc.
│ tagline                │
│ description            │
│ short_description      │
│ images                 │  JSON [{url, alt}]
│ thumbnail              │
│ duration               │  "2.5 hours"
│ price_amount           │  180
│ price_currency         │  "USD"
│ price_per              │  "person"
│ highlights             │  JSON
│ includes               │  JSON
│ schedule               │  "Daily at 5:00 PM"
│ min_age                │  Int
│ max_participants       │  Int
│ display_order          │
│ is_active              │  Boolean
│ created_at             │
│ updated_at             │
└────────────────────────┘

┌────────────────────────┐
│ faqs                   │  ← Replaces hardcoded FAQs in contact-content
├────────────────────────┤
│ id (PK)                │
│ question               │
│ answer                 │
│ display_order          │
│ is_active              │  Boolean
└────────────────────────┘

┌────────────────────────┐
│ facilities             │  ← Replaces hardcoded amenities + facilities in facilities-preview
├────────────────────────┤
│ id (PK)                │
│ name                   │
│ description            │
│ icon                   │  "wifi" | "wind" | "utensils" etc. (lucide icon name)
│ category               │  "amenity" | "service"
│ image                  │  Optional URL (for services section)
│ hours                  │  Optional (e.g. "7AM - 12AM")
│ display_order          │
│ is_active              │  Boolean
└────────────────────────┘

┌────────────────────────┐
│ pages                  │  ← CMS for about page, any future pages
├────────────────────────┤
│ id (PK)                │
│ slug                   │  "about"
│ title                  │
│ hero_image             │  URL
│ content                │  Rich text (HTML)
│ meta_title             │
│ meta_description       │
│ updated_at             │
│ updated_by (FK)        │
└────────────────────────┘

┌────────────────────────┐
│ site_settings          │  ← Replaces lib/constants.ts siteConfig
├────────────────────────┤
│ id (PK)                │
│ key                    │  "site_name" | "email" | "phone" | "instagram_url" | etc.
│ value                  │  String
│ updated_at             │
│ updated_by (FK)        │
└────────────────────────┘
```

### Booking & Auth Tables

```
┌────────────────────────┐     ┌────────────────────────┐
│ bookings               │     │ guests                 │
├────────────────────────┤     ├────────────────────────┤
│ id (PK)                │     │ id (PK)                │
│ booking_ref (unique)   │     │ email (unique)         │
│ guest_id (FK)       ───┼────►│ full_name              │
│ room_id (FK)           │     │ phone                  │
│ room_type_id (FK)      │     │ country                │
│ check_in               │     │ notes                  │
│ check_out              │     │ created_at             │
│ adults                 │     └────────────────────────┘
│ children               │
│ total_price            │     ┌────────────────────────┐
│ status                 │     │ staff                  │
│  pending / confirmed   │     ├────────────────────────┤
│  checked_in /          │     │ id (PK)                │
│  checked_out /         │     │ email (unique)         │
│  cancelled / no_show   │     │ name                   │
│ special_requests       │     │ password_hash          │
│ payment_status         │     │ role                   │
│  unpaid / deposit /    │     │  "admin" | "staff"     │
│  paid / refunded       │     │ is_active              │
│ payment_method         │     │ created_at             │
│ notes (staff-only)     │     └────────────────────────┘
│ created_at             │
│ updated_at             │     ┌────────────────────────┐
└────────────────────────┘     │ magic_links            │
                               ├────────────────────────┤
┌────────────────────────┐     │ id (PK)                │
│ blocked_dates          │     │ token (unique, 64-char) │
├────────────────────────┤     │ email                  │
│ id (PK)                │     │ booking_id (FK)        │
│ room_type_id (FK)      │     │ expires_at             │
│ room_id (FK, nullable) │     │ used (boolean)         │
│ date                   │     │ created_at             │
│ reason                 │     └────────────────────────┘
│ created_by (FK)        │
└────────────────────────┘

┌────────────────────────┐
│ activity_log           │  ← Audit trail
├────────────────────────┤
│ id (PK)                │
│ staff_id (FK)          │
│ action                 │  "created_booking" | "updated_room" | "uploaded_image" | etc.
│ entity_type            │  "booking" | "room_type" | "gallery_image" | etc.
│ entity_id              │
│ details                │  JSON (what changed)
│ created_at             │
└────────────────────────┘
```

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        FRONTEND                               │
│                                                               │
│  Public Site              Booking Flow           Staff Portal │
│  ──────────              ─────────────           ──────────── │
│  / (home)                /book               /staff/dashboard │
│  /about                  /book/details       /staff/bookings  │
│  /facilities             /book/confirm       /staff/calendar  │
│  /gallery                /book/success       /staff/rooms     │
│  /contact                /booking/[token]    /staff/content   │
│                          /booking/lookup     /staff/gallery   │
│                                              /staff/settings  │
└─────────────────────┬───────────┬──────────────┬─────────────┘
                      │           │              │
              ┌───────▼───────────▼──────────────▼────────┐
              │              API LAYER (Next.js)           │
              │                                            │
              │  /api/public/*      Read-only CMS data     │
              │  /api/booking/*     Booking engine          │
              │  /api/staff/*       Protected CRUD          │
              │  /api/upload/*      Image uploads           │
              │  /api/auth/*        NextAuth sessions       │
              └───────────────────┬────────────────────────┘
                                  │
              ┌───────────────────▼────────────────────────┐
              │          DATABASE (PostgreSQL)              │
              │                                            │
              │  Content tables    Booking tables           │
              │  ──────────────    ──────────────           │
              │  room_types        bookings                 │
              │  gallery_images    guests                   │
              │  testimonials      rooms                    │
              │  experiences       blocked_dates            │
              │  faqs              magic_links              │
              │  facilities        activity_log             │
              │  pages                                      │
              │  site_settings     staff                    │
              └────────────────────────────────────────────┘
                                  │
              ┌───────────────────▼────────────────────────┐
              │           EXTERNAL SERVICES                 │
              │                                            │
              │  Cloudinary/Uploadthing  — Image storage   │
              │  Nodemailer (Gmail SMTP) — Email           │
              │  Stripe (future)         — Payments        │
              └────────────────────────────────────────────┘
```

---

## Staff Portal — Content Management (CMS)

The staff portal has two sides: **Content Management** and **Booking Management**.

### CMS URL Structure

```
/staff/login                       — Login
/staff/dashboard                   — Overview (bookings + content at a glance)

# Content Management
/staff/content/rooms               — Manage room types (name, price, images, features)
/staff/content/rooms/[id]/edit     — Edit a room type
/staff/content/gallery             — Upload/manage/reorder gallery images
/staff/content/testimonials        — Add/edit/hide testimonials
/staff/content/experiences         — Manage tours & excursions
/staff/content/faqs                — Manage FAQ entries
/staff/content/facilities          — Manage amenity & service listings
/staff/content/pages/about         — Edit About page content (rich text)
/staff/content/settings            — Site name, phone, email, social links, service hours

# Booking Management
/staff/bookings                    — All bookings (filterable)
/staff/bookings/[id]               — Booking detail + actions
/staff/bookings/new                — Create manual booking
/staff/calendar                    — Visual room calendar
/staff/rooms                       — Physical room inventory (101, 102, etc.)
/staff/guests                      — Guest directory
/staff/settings/rates              — Seasonal pricing overrides
/staff/settings/blocked-dates      — Block dates
/staff/settings/staff-accounts     — Manage staff accounts (admin only)
```

### CMS Features

**Room Types Editor**
- Edit name, slug, description, pricing, capacity, features
- Upload/reorder room images (drag & drop)
- Toggle active/inactive (hide from site without deleting)
- Preview how it looks on the public site

**Gallery Manager**
- Upload multiple images at once
- Assign category (pool, beach, rooms, dining)
- Drag & drop reorder
- Bulk delete, edit alt text
- Images stored on Cloudinary with automatic optimization

**Testimonials Manager**
- Add/edit reviews with rating, guest name, location
- Toggle visibility (show/hide without deleting)
- Mark as verified

**Experiences Manager**
- Full CRUD for tours & excursions
- Manage pricing, schedule, capacity, images
- Toggle availability

**FAQ Manager**
- Add/edit/reorder questions
- Toggle visibility

**Site Settings**
- Edit site name, tagline, description
- Update phone numbers, email, WhatsApp
- Update social media links
- Edit service hours
- No code deployment needed for any of this

---

## API Routes

### Public APIs (no auth required)

```
# CMS Content — used by the public site pages
GET  /api/public/room-types            — All active room types with details
GET  /api/public/room-types/[slug]     — Single room type
GET  /api/public/gallery               — Gallery images (filterable by category)
GET  /api/public/testimonials          — Active testimonials
GET  /api/public/experiences           — Active experiences
GET  /api/public/faqs                  — Active FAQs
GET  /api/public/facilities            — Amenities + services
GET  /api/public/pages/[slug]          — Page content (about, etc.)
GET  /api/public/settings              — Public site settings (name, phone, social)

# Booking
POST /api/booking/check-availability   — Check rooms for date range
POST /api/booking/create               — Create booking (sends confirmation + magic link)
GET  /api/booking/[token]              — Guest views booking via magic link
POST /api/booking/[token]/cancel       — Guest cancels booking
POST /api/booking/lookup               — Request new magic link by email
```

### Staff APIs (NextAuth session required)

```
# Booking Management
GET    /api/staff/bookings              — List (filterable by status, date, room, search)
GET    /api/staff/bookings/[id]         — Single booking detail
POST   /api/staff/bookings              — Create manual booking
PATCH  /api/staff/bookings/[id]         — Update status, dates, room, notes
DELETE /api/staff/bookings/[id]         — Cancel booking

GET    /api/staff/dashboard             — Stats: occupancy, revenue, arrivals/departures
GET    /api/staff/calendar              — Calendar data for date range

# Room Management
GET    /api/staff/rooms                 — Physical rooms list
PATCH  /api/staff/rooms/[id]            — Update room status/notes
POST   /api/staff/blocked-dates         — Block dates
DELETE /api/staff/blocked-dates/[id]    — Unblock

# Content Management (CMS)
GET    /api/staff/room-types            — All room types (including inactive)
POST   /api/staff/room-types            — Create room type
PATCH  /api/staff/room-types/[id]       — Update room type
DELETE /api/staff/room-types/[id]       — Soft-delete (set inactive)

GET    /api/staff/gallery               — All images (including inactive)
POST   /api/staff/gallery               — Upload image(s)
PATCH  /api/staff/gallery/[id]          — Edit alt, category, order
PATCH  /api/staff/gallery/reorder       — Bulk reorder
DELETE /api/staff/gallery/[id]          — Delete image

GET    /api/staff/testimonials          — All testimonials
POST   /api/staff/testimonials          — Create
PATCH  /api/staff/testimonials/[id]     — Edit
DELETE /api/staff/testimonials/[id]     — Delete

GET    /api/staff/experiences           — All experiences
POST   /api/staff/experiences           — Create
PATCH  /api/staff/experiences/[id]      — Edit
DELETE /api/staff/experiences/[id]      — Delete

GET    /api/staff/faqs                  — All FAQs
POST   /api/staff/faqs                  — Create
PATCH  /api/staff/faqs/[id]             — Edit
PATCH  /api/staff/faqs/reorder          — Reorder
DELETE /api/staff/faqs/[id]             — Delete

GET    /api/staff/facilities            — All facilities
POST   /api/staff/facilities            — Create
PATCH  /api/staff/facilities/[id]       — Edit
DELETE /api/staff/facilities/[id]       — Delete

GET    /api/staff/pages/[slug]          — Get page content
PATCH  /api/staff/pages/[slug]          — Update page content

GET    /api/staff/settings              — All settings
PATCH  /api/staff/settings              — Update settings (bulk key-value)

# Image Uploads
POST   /api/upload                      — Upload image to Cloudinary/Uploadthing

# Staff & Auth
GET    /api/staff/users                 — List staff accounts (admin only)
POST   /api/staff/users                 — Create staff account (admin only)
PATCH  /api/staff/users/[id]            — Update staff (admin only)
GET    /api/staff/activity-log          — Recent activity

POST   /api/auth/staff/login
POST   /api/auth/staff/logout
```

---

## Guest Booking Flow

```
1. GUEST → /book
   Select check-in/check-out dates, guest count
   ↓
   API call: POST /api/booking/check-availability
   ↓
   Display available room types with pricing

2. GUEST selects a room type → /book/details
   Enter: name, email, phone, country, special requests
   ↓
   Zod validation on client + server

3. GUEST reviews → /book/confirm
   Shows: room, dates, nights, total price breakdown
   ↓
   Click "Confirm Booking"
   ↓
   API call: POST /api/booking/create

4. SERVER:
   - Creates guest record (or finds existing by email)
   - Finds an available physical room of that type
   - Creates booking (status: "pending", ref: RG-XXXXXX)
   - Generates magic link token (64 chars, expires 30 days)
   - Sends confirmation email to guest (with magic link)
   - Sends notification email to staff
   ↓
   Redirect to /book/success

5. GUEST → clicks magic link in email → /booking/[token]
   Can view booking details, download confirmation, cancel

6. STAFF → /staff/bookings
   Sees new booking → confirms, assigns room, adds notes
   ↓
   Status: "pending" → "confirmed" (triggers email to guest)
```

---

## How Public Pages Will Work After CMS

Instead of importing hardcoded arrays, each page fetches from the database:

```tsx
// Before (hardcoded):
import { rooms } from "@/data/rooms";

// After (CMS-driven, Server Component):
const roomTypes = await prisma.roomType.findMany({
  where: { isActive: true },
  orderBy: { displayOrder: "asc" },
});
```

| Page               | Current Source                    | New Source                         |
| ------------------ | -------------------------------- | ---------------------------------- |
| Home → Rooms       | `rooms-preview.tsx` (hardcoded)  | `room_types` table                 |
| Home → Facilities  | `facilities-preview.tsx` (hc)    | `facilities` table                 |
| Home → Testimonials| `data/testimonials.ts`           | `testimonials` table               |
| Facilities page    | `facilities-content.tsx` (hc)    | `room_types` + `facilities` tables |
| Gallery page       | `gallery-content.tsx` (hc)       | `gallery_images` table             |
| Contact → FAQs     | `contact-content.tsx` (hc)       | `faqs` table                       |
| About page         | `about-content.tsx` (hc)         | `pages` table (slug: "about")      |
| Footer/Header      | `lib/constants.ts`               | `site_settings` table              |

Public pages use Next.js Server Components to query Prisma directly — no API round-trip. The API routes exist for the staff portal and booking flow. Content updates trigger ISR revalidation so the public site reflects changes within seconds.

---

## Email Notifications

| Trigger                    | To    | Content                                       |
| -------------------------- | ----- | --------------------------------------------- |
| New booking created        | Guest | Confirmation + magic link + booking ref       |
| New booking created        | Staff | New booking alert with details                |
| Booking confirmed          | Guest | Confirmation + check-in instructions          |
| Booking cancelled          | Guest | Cancellation acknowledgment                   |
| Booking modified           | Guest | Updated dates/room details                    |
| Magic link requested       | Guest | Fresh link to view/manage booking             |
| 3 days before check-in     | Guest | Arrival reminder + island info                |
| Check-out day              | Guest | Thank you + review request                    |

---

## File Structure

```
app/
├── (public)/                        # Public site (existing pages, now DB-driven)
│   ├── page.tsx                     # Home
│   ├── about/
│   ├── facilities/
│   ├── gallery/
│   └── contact/
│
├── book/                            # Guest booking flow
│   ├── page.tsx                     # Date + room selection
│   ├── details/page.tsx             # Guest info form
│   ├── confirm/page.tsx             # Review & confirm
│   └── success/page.tsx             # Booking confirmed
│
├── booking/                         # Guest booking management (via magic link)
│   ├── [token]/page.tsx             # View booking
│   ├── [token]/cancel/page.tsx      # Cancel booking
│   └── lookup/page.tsx              # Request new magic link
│
├── staff/                           # Staff portal
│   ├── login/page.tsx
│   ├── layout.tsx                   # Auth guard + sidebar layout
│   ├── dashboard/page.tsx
│   ├── bookings/
│   │   ├── page.tsx                 # Bookings list
│   │   ├── [id]/page.tsx            # Booking detail
│   │   └── new/page.tsx             # Manual booking
│   ├── calendar/page.tsx
│   ├── rooms/page.tsx               # Physical room management
│   ├── guests/page.tsx
│   ├── content/                     # CMS pages
│   │   ├── rooms/
│   │   │   ├── page.tsx             # Room types list
│   │   │   └── [id]/edit/page.tsx   # Edit room type
│   │   ├── gallery/page.tsx         # Gallery manager
│   │   ├── testimonials/page.tsx
│   │   ├── experiences/page.tsx
│   │   ├── faqs/page.tsx
│   │   ├── facilities/page.tsx
│   │   ├── pages/
│   │   │   └── about/page.tsx       # About page editor
│   │   └── settings/page.tsx        # Site settings
│   └── settings/
│       ├── rates/page.tsx           # Seasonal pricing
│       ├── blocked-dates/page.tsx
│       └── staff-accounts/page.tsx
│
├── api/
│   ├── public/                      # Public read-only endpoints
│   │   ├── room-types/route.ts
│   │   ├── gallery/route.ts
│   │   ├── testimonials/route.ts
│   │   ├── experiences/route.ts
│   │   ├── faqs/route.ts
│   │   ├── facilities/route.ts
│   │   ├── pages/[slug]/route.ts
│   │   └── settings/route.ts
│   ├── booking/                     # Booking engine
│   │   ├── check-availability/route.ts
│   │   ├── create/route.ts
│   │   ├── [token]/route.ts
│   │   ├── [token]/cancel/route.ts
│   │   └── lookup/route.ts
│   ├── staff/                       # Protected staff APIs
│   │   ├── bookings/route.ts
│   │   ├── bookings/[id]/route.ts
│   │   ├── dashboard/route.ts
│   │   ├── calendar/route.ts
│   │   ├── rooms/route.ts
│   │   ├── rooms/[id]/route.ts
│   │   ├── room-types/route.ts
│   │   ├── room-types/[id]/route.ts
│   │   ├── gallery/route.ts
│   │   ├── gallery/[id]/route.ts
│   │   ├── gallery/reorder/route.ts
│   │   ├── testimonials/route.ts
│   │   ├── testimonials/[id]/route.ts
│   │   ├── experiences/route.ts
│   │   ├── experiences/[id]/route.ts
│   │   ├── faqs/route.ts
│   │   ├── faqs/[id]/route.ts
│   │   ├── facilities/route.ts
│   │   ├── facilities/[id]/route.ts
│   │   ├── pages/[slug]/route.ts
│   │   ├── settings/route.ts
│   │   ├── blocked-dates/route.ts
│   │   ├── blocked-dates/[id]/route.ts
│   │   ├── users/route.ts
│   │   ├── users/[id]/route.ts
│   │   └── activity-log/route.ts
│   ├── upload/route.ts              # Image upload endpoint
│   └── auth/
│       └── [...nextauth]/route.ts
│
lib/
├── db.ts                            # Prisma client singleton
├── auth.ts                          # NextAuth configuration
├── email/
│   ├── send.ts                      # Send email utility
│   └── templates/
│       ├── booking-confirmation.tsx  # React Email template
│       ├── magic-link.tsx
│       ├── booking-reminder.tsx
│       ├── booking-cancelled.tsx
│       └── staff-notification.tsx
├── booking/
│   ├── availability.ts              # Availability checking logic
│   ├── pricing.ts                   # Price calculation + seasonal overrides
│   └── magic-link.ts                # Generate & verify tokens
├── validations/
│   ├── booking.ts                   # Zod schemas
│   ├── content.ts                   # Zod schemas for CMS inputs
│   └── staff.ts
└── utils.ts                         # Existing utils

prisma/
├── schema.prisma                    # Full database schema
├── seed.ts                          # Seed rooms, room types, initial content, admin account
└── migrations/

components/
├── staff/                           # Staff portal UI components
│   ├── sidebar.tsx
│   ├── data-table.tsx               # Reusable sortable/filterable table
│   ├── booking-status-badge.tsx
│   ├── calendar-view.tsx
│   ├── image-uploader.tsx           # Drag & drop image upload
│   ├── rich-text-editor.tsx         # Tiptap editor wrapper
│   └── stats-card.tsx
└── booking/                         # Public booking UI components
    ├── availability-checker.tsx
    ├── room-selector.tsx
    ├── booking-summary.tsx
    ├── guest-details-form.tsx
    └── magic-link-lookup.tsx
```

---

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_SECRET=<random-64-char>
NEXTAUTH_URL=http://localhost:3000

# Image Upload (choose one)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
# OR
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# Magic Links
MAGIC_LINK_SECRET=<random-64-char>
NEXT_PUBLIC_APP_URL=https://rasgrand.com

# Email (already configured)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
MAIL_TO=

# Stripe (future)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

---

## Implementation Phases

### Phase 1 — Database & Foundation (Week 1-2)

> Set up the database, ORM, auth, and seed existing content

- [ ] Set up PostgreSQL (Neon free tier — serverless, no cold starts)
- [ ] Set up Prisma: full schema for ALL tables (content + booking + auth)
- [ ] Write seed script: migrate all hardcoded data into the database
  - 4 room types with current details/images/pricing
  - 25 physical rooms (17 deluxe, 4 superior, 3 mini suite, 1 apartment)
  - 21 gallery images
  - 6 testimonials
  - 6 experiences
  - 5 FAQs
  - 6+8+4 facilities/amenities/services
  - Site settings (name, phone, email, social links, hours)
  - 1 admin staff account
- [ ] Set up NextAuth with credential provider (staff login)
- [ ] Staff auth middleware (protect `/staff/*` and `/api/staff/*`)
- [ ] Magic link utility (generate, verify, expire)
- [ ] Zod validation schemas for all models
- [ ] Prisma client singleton (`lib/db.ts`)

### Phase 2 — CMS Backend + Staff Portal Shell (Week 2-3)

> Staff can log in and manage all website content

- [ ] Staff layout with sidebar navigation
- [ ] Staff dashboard (basic stats)
- [ ] **Room Types CRUD** — list, create, edit, toggle active
- [ ] **Gallery Manager** — upload, categorize, reorder, delete
- [ ] **Testimonials CRUD** — list, create, edit, toggle
- [ ] **Experiences CRUD**
- [ ] **FAQs CRUD** — with drag-and-drop reorder
- [ ] **Facilities CRUD**
- [ ] **Site Settings Editor** — key-value pairs for phone, email, social, etc.
- [ ] **About Page Editor** — rich text with Tiptap
- [ ] Image upload endpoint (Cloudinary or Uploadthing)
- [ ] Activity log (who changed what, when)

### Phase 3 — Migrate Public Pages to DB (Week 3-4)

> Replace all hardcoded data with database queries

- [ ] Refactor home page sections to fetch from DB (Server Components)
- [ ] Refactor facilities page to fetch room_types + facilities from DB
- [ ] Refactor gallery page to fetch gallery_images from DB
- [ ] Refactor contact page FAQs from DB
- [ ] Refactor about page content from DB
- [ ] Refactor header/footer to use site_settings from DB
- [ ] Remove old hardcoded data files (`data/rooms.ts`, `data/testimonials.ts`, etc.)
- [ ] Test all pages render correctly from DB data
- [ ] Add ISR / revalidation strategy (revalidate on staff content update)

### Phase 4 — Booking Engine (Week 4-5)

> Guests can check availability and book rooms

- [ ] Availability checking logic (query rooms − bookings − blocked dates)
- [ ] Pricing engine (base rate + seasonal overrides)
- [ ] **Public booking flow:**
  - `/book` — date picker + availability checker
  - `/book/details` — guest info form
  - `/book/confirm` — review & confirm
  - `/book/success` — confirmation page
- [ ] Booking creation API with validation
- [ ] Magic link email on booking creation
- [ ] **Guest booking view** — `/booking/[token]` (view details, cancel)
- [ ] **Magic link lookup** — `/booking/lookup` (enter email, get new link)
- [ ] Email templates: confirmation, magic link, cancellation
- [ ] Update existing contact form to offer booking link

### Phase 5 — Staff Booking Management (Week 5-7)

> Full booking operations for staff

- [ ] Staff dashboard with live stats (occupancy, revenue, arrivals today)
- [ ] Bookings list with filters (status, date range, room type, search)
- [ ] Booking detail page with actions:
  - Confirm / Check-in / Check-out / Cancel / No-Show
  - Reassign room, modify dates
  - Add staff notes
  - Resend magic link to guest
- [ ] Create manual booking (walk-ins, phone bookings)
- [ ] Visual calendar (rooms × dates grid, color-coded)
- [ ] Physical room management (status, maintenance flags)
- [ ] Block/unblock dates
- [ ] Guest directory with booking history
- [ ] Booking export (CSV)

### Phase 6 — Polish & Production (Week 7-8)

> Hardening, mobile optimization, deployment

- [ ] Automated email reminders (cron: 3 days before check-in)
- [ ] Mobile-optimized staff portal
- [ ] Loading states, skeleton screens, error boundaries
- [ ] Rate limiting on public APIs
- [ ] SEO meta from DB (page titles, descriptions)
- [ ] Production deployment: Vercel + Neon
- [ ] Monitoring & error tracking (Sentry)
- [ ] Database backup strategy

### Phase 7 — Online Payments (Future)

> Optional Stripe payment collection

- [ ] Stripe integration (30% deposit on booking)
- [ ] Payment status tracking throughout booking lifecycle
- [ ] Refund handling for cancellations
- [ ] Payment receipts via email
- [ ] Seasonal pricing management in staff portal

---

## Security

- All `/staff/*` routes and `/api/staff/*` behind NextAuth middleware
- Role-based access: `admin` can manage staff accounts, `staff` manages content/bookings
- Magic link tokens: 64-char crypto random hex, 30-day expiry, single-use for sensitive actions
- Rate limiting: booking creation (5/hour per IP), magic link requests (3/hour per email)
- All inputs validated with Zod at the API boundary
- CSRF protection via Next.js built-in mechanisms
- SQL injection prevented by Prisma parameterized queries
- Image uploads validated (file type whitelist, max size 5MB)
- Passwords hashed with bcrypt (12 rounds)
- Activity log for audit trail on all staff actions
- `is_active` soft deletes — nothing is permanently lost

---

## Data Migration Strategy

When transitioning from hardcoded to DB:

1. **Seed script** copies all existing hardcoded data into the database exactly as-is
2. **Feature flag** (`USE_CMS=true` in env) enables gradual page-by-page migration
3. Each page is refactored one at a time:
   - Create the direct DB query (Server Component) or API route
   - Update the page component to use DB data instead of imports
   - Test thoroughly — visual regression check
   - Remove old hardcoded import
4. Once all pages are migrated, delete old `data/` files and inline arrays
5. Staff portal becomes the **single source of truth** for all content
