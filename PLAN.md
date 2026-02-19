# 🌴 Maldives Guest House Website - Project Plan

## 🏠 Overview

A stunning, boutique **guest house website** for a **small Maldives beachfront property** built with **Next.js 16** and **React 19**. This is an intimate, family-run guest house (not a large resort) with just **4 rooms**, offering personalized service and authentic Maldivian hospitality.

---

## 🏡 Property Details

- **Type**: Small boutique guest house (not a resort)
- **Rooms**: 4 unique rooms/suites
- **Location**: Local island in the Maldives
- **Vibe**: Intimate, authentic, personalized
- **Style**: Boutique luxury meets local charm

---

## 🌊 Location Theme: Maldives Paradise

- Crystal-clear turquoise waters
- Beachfront location on a local island
- White sand beaches & palm trees
- Coral reefs & marine life (house reef nearby)
- Breathtaking sunsets & starlit skies
- Authentic Maldivian hospitality

---

## 🎯 Target Audience

- Couples seeking romantic getaways
- Honeymooners on a budget-friendly luxury trip
- Solo travelers & backpackers wanting comfort
- Diving & snorkeling enthusiasts
- Travelers seeking authentic local experiences
- Digital nomads looking for island escape

---

## 📄 Pages Structure

### 1. **Home Page** (`/`)

- Full-screen image hero with parallax
- Animated headline
- Quick booking/inquiry widget
- Our 4 rooms showcase
- Experience highlights (diving, excursions, dining)
- Guest testimonials
- Location & island info
- Contact CTA

### 2. **Rooms** (`/rooms`)

- All 4 rooms displayed beautifully
- Room cards with photos, pricing, features
- Individual room pages (`/rooms/[slug]`)
  - Photo gallery with lightbox
  - Room features & amenities
  - Pricing info
  - Book/Inquiry button

### 🛏️ The 4 Rooms:

1. **Ocean View Room** - Standard room with sea views
2. **Beach Suite** - Larger suite, direct beach access
3. **Garden Room** - Budget-friendly, tropical garden views
4. **Deluxe Suite** - Best room, balcony, premium amenities

### 3. **Experiences** (`/experiences`)

- Private beach & lagoon access
- Infinity pool with ocean views
- World-class diving & snorkeling
- Overwater spa treatments
- Water sports center
- Gourmet dining experiences
- Sunset dolphin cruises
- Private island picnics
- Stargazing nights

### 4. **Gallery** (`/gallery`)

- Masonry grid with smooth animations
- Category filters (Villas, Ocean, Dining, Spa, Activities)
- Full-screen lightbox with swipe gestures
- Video gallery section

### 5. **About** (`/about`)

- Our story with parallax scrolling
- The island & its heritage
- Sustainability & eco-initiatives
- Meet the team
- Awards & recognition

### 6. **Contact** (`/contact`)

- Beautiful contact form with validation
- Interactive map with custom styling
- WhatsApp integration
- Live chat widget placeholder
- FAQ accordion with smooth animations
- Social media links

### 7. **Booking** (`/booking`)

- Multi-step booking wizard
- Real-time availability
- Guest details with validation
- Special requests & add-ons
- Price breakdown
- Secure payment placeholder
- Confirmation with animations

---

## 🧩 Modern Project Structure (No src/)

```
guest-house-website/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home
│   ├── loading.tsx             # Global loading UI
│   ├── error.tsx               # Error boundary
│   ├── not-found.tsx           # 404 page
│   ├── globals.css             # Global styles
│   │
│   ├── villas/
│   │   ├── page.tsx            # Villas listing
│   │   ├── loading.tsx         # Suspense fallback
│   │   └── [slug]/
│   │       ├── page.tsx        # Villa detail
│   │       └── loading.tsx
│   │
│   ├── experiences/
│   │   └── page.tsx
│   │
│   ├── gallery/
│   │   └── page.tsx
│   │
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── contact/
│   │   └── page.tsx
│   │
│   ├── booking/
│   │   └── page.tsx
│   │
│   └── actions/                 # Server Actions (React 19)
│       ├── contact.ts
│       └── booking.ts
│
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── nav.tsx
│   │   └── mobile-nav.tsx
│   │
│   ├── home/
│   │   ├── hero.tsx
│   │   ├── featured-villas.tsx
│   │   ├── experiences-preview.tsx
│   │   ├── testimonials.tsx
│   │   └── booking-widget.tsx
│   │
│   ├── villas/
│   │   ├── villa-card.tsx
│   │   ├── villa-gallery.tsx
│   │   ├── villa-amenities.tsx
│   │   └── availability-calendar.tsx
│   │
│   ├── booking/
│   │   ├── booking-form.tsx
│   │   ├── date-range-picker.tsx
│   │   ├── guest-selector.tsx
│   │   └── price-summary.tsx
│   │
│   └── ui/                      # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── modal.tsx
│       ├── carousel.tsx
│       ├── skeleton.tsx
│       └── animated-text.tsx
│
├── lib/
│   ├── utils.ts                 # Utility functions
│   ├── constants.ts             # App constants
│   └── fonts.ts                 # Font configurations
│
├── data/
│   ├── villas.ts                # Villa data
│   ├── experiences.ts           # Experiences data
│   └── testimonials.ts          # Reviews data
│
├── types/
│   └── index.ts                 # TypeScript types
│
├── public/
│   ├── images/
│   ├── videos/
│   └── icons/
│
├── .env.local                   # Environment variables
├── next.config.ts               # Next.js config
├── tailwind.config.ts           # Tailwind config
├── tsconfig.json
├── package.json
└── pnpm-lock.yaml
```

---

## 🎨 Design System - Luxury Tropical

### Color Palette

| Color      | Hex       | CSS Variable       | Usage                    |
| ---------- | --------- | ------------------ | ------------------------ |
| Ocean Deep | `#0A4D68` | `--ocean-deep`     | Primary buttons, headers |
| Ocean      | `#088395` | `--ocean`          | Links, accents           |
| Turquoise  | `#05BFDB` | `--turquoise`      | Highlights, hover states |
| Aqua Light | `#00FFCA` | `--aqua`           | Gradients, accents       |
| Sand       | `#FBF8F1` | `--sand`           | Backgrounds              |
| Coral      | `#FF6B6B` | `--coral`          | CTAs, special offers     |
| Sunset     | `#F4A261` | `--sunset`         | Warm accents             |
| Palm       | `#2D5A4A` | `--palm`           | Secondary elements       |
| Text Dark  | `#0F172A` | `--text-primary`   | Headings                 |
| Text Light | `#64748B` | `--text-secondary` | Body text                |

### Typography (Google Fonts)

- **Display**: `Playfair Display` - Elegant headlines
- **Headings**: `DM Serif Display` - Luxury feel
- **Body**: `Inter` - Clean readability
- **Accent**: `Cormorant Garamond` - Special quotes

### Design Principles

- **Immersive imagery** - Full-bleed photos, video backgrounds
- **Generous whitespace** - Luxury feel, breathable layouts
- **Subtle animations** - Smooth transitions, micro-interactions
- **Glass morphism** - Frosted glass cards over images
- **Organic shapes** - Wave dividers, rounded elements
- **Parallax effects** - Depth and movement
- **Dark mode support** - For nighttime browsing

---

## 🛠 Tech Stack (Latest 2024/2025)

| Category       | Technology                                |
| -------------- | ----------------------------------------- |
| Framework      | **Next.js 16** (App Router, Turbopack)    |
| React          | **React 19** (Server Components, Actions) |
| Language       | **TypeScript 5.x**                        |
| Styling        | **Tailwind CSS 4** + CSS Variables        |
| UI Components  | **shadcn/ui** (Radix + Tailwind)          |
| Animations     | **motion** (formerly Framer Motion)       |
| Fancy Effects  | **Aceternity UI** (hero, cards, grids)    |
| Text Animation | **Magic UI** (animated text, reveals)     |
| Smooth Scroll  | **Lenis** (buttery smooth scrolling)      |
| Icons          | **Lucide React**                          |
| Forms          | **React 19 useActionState + Zod**         |
| Date Picker    | **react-day-picker v9**                   |
| Carousel       | **Embla Carousel**                        |
| Lightbox       | **Yet Another React Lightbox**            |
| Maps           | **Mapbox GL** or **Google Maps**          |
| Fonts          | **Next.js Font Optimization**             |
| Images         | **Next.js Image** (auto optimization)     |

### React 19 Features We'll Use

- ✅ Server Components (default)
- ✅ Server Actions (form handling)
- ✅ `useActionState` hook
- ✅ `useFormStatus` hook
- ✅ `useOptimistic` hook
- ✅ `use()` hook for promises
- ✅ Document Metadata API
- ✅ Streaming & Suspense

### Next.js 15 Features We'll Use

- ✅ App Router
- ✅ Turbopack (dev server)
- ✅ Partial Prerendering
- ✅ Server Actions
- ✅ Parallel Routes
- ✅ Intercepting Routes (modals)
- ✅ Image optimization
- ✅ Font optimization
- ✅ Metadata API for SEO

---

## 📦 Dependencies

```bash
# Initialize project (already done)
pnpm create next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-pnpm

# Initialize shadcn/ui
pnpm dlx shadcn@latest init

# Core UI & Animations
pnpm add motion lucide-react clsx tailwind-merge
pnpm add lenis                    # Smooth scrolling

# Forms & Validation
pnpm add zod

# Date & Calendar
pnpm add react-day-picker date-fns

# Carousel & Gallery
pnpm add embla-carousel-react yet-another-react-lightbox

# Class utilities
pnpm add class-variance-authority

# Dev dependencies
pnpm add -D @types/node prettier prettier-plugin-tailwindcss
```

### Aceternity UI & Magic UI Components

These are copy-paste components (like shadcn). We'll manually add:

- **Aceternity**: Spotlight, Bento Grid, 3D Cards, Parallax Scroll, Sparkles
- **Magic UI**: Animated Shiny Text, Text Reveal, Blur Fade, Marquee

---

## ✨ UX Best Practices

### Performance

- [ ] Optimized images with Next.js Image
- [ ] Font subsetting & preloading
- [ ] Code splitting & lazy loading
- [ ] Skeleton loaders for async content
- [ ] Prefetching on link hover

### Accessibility

- [ ] Semantic HTML structure
- [ ] ARIA labels where needed
- [ ] Keyboard navigation support
- [ ] Focus indicators
- [ ] Color contrast compliance
- [ ] Screen reader friendly

### Mobile-First

- [ ] Touch-friendly tap targets (44px min)
- [ ] Swipe gestures for carousels
- [ ] Bottom navigation consideration
- [ ] Responsive images
- [ ] Fast loading on 3G

### Conversion Optimization

- [ ] Sticky booking CTA
- [ ] Trust signals (reviews, awards)
- [ ] Urgency indicators ("Only 2 left!")
- [ ] Easy contact options (WhatsApp, chat)
- [ ] Progress indicators in booking flow
- [ ] Social proof throughout

---

## 🚀 Development Phases

### Phase 1: Foundation

- [ ] Initialize Next.js 15 project with pnpm
- [ ] Configure Tailwind with custom theme
- [ ] Set up fonts (Playfair, Inter)
- [ ] Create layout components
- [ ] Build reusable UI components

### Phase 2: Core Pages

- [ ] Home page with all sections
- [ ] Villas listing page
- [ ] Individual villa pages
- [ ] About page
- [ ] Contact page with form

### Phase 3: Features

- [ ] Gallery with lightbox
- [ ] Experiences page
- [ ] Booking flow
- [ ] Server Actions for forms

### Phase 4: Polish

- [ ] Animations & transitions
- [ ] Loading states
- [ ] Error handling
- [ ] SEO optimization
- [ ] Performance audit
- [ ] Accessibility audit

---

## 📱 Breakpoints

| Name  | Width  | Target        |
| ----- | ------ | ------------- |
| `sm`  | 640px  | Large phones  |
| `md`  | 768px  | Tablets       |
| `lg`  | 1024px | Small laptops |
| `xl`  | 1280px | Desktops      |
| `2xl` | 1536px | Large screens |

---

## ✅ Ready to Build!

This plan follows:

- ✅ Next.js 15 latest conventions
- ✅ React 19 patterns (Server Components, Actions)
- ✅ No `src/` directory (app at root)
- ✅ Modern TypeScript practices
- ✅ Tailwind CSS 4 features
- ✅ Luxury UX/UI design principles
- ✅ Performance best practices
- ✅ Accessibility standards

**Let's create something beautiful! 🌴🌊**
