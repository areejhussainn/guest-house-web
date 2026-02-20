// Site Configuration
export const siteConfig = {
  name: "Ras Grand",
  tagline: "Rasdhoo Maldives Guest House",
  description:
    "Experience paradise at Ras Grand - a cozy beachfront guest house in Rasdhoo, Maldives featuring comfortable rooms, pristine beaches, and unforgettable island experiences.",
  url: "https://rasgrand.com",
  email: "reservations@rasgrand.com",
  phone: "+960 123 4567",
  whatsapp: "+960 123 4567",
  address: {
    island: "Rasdhoo Island",
    atoll: "Alif Alif Atoll",
    country: "Maldives",
  },
  social: {
    instagram: "https://instagram.com/rasgrand",
    facebook: "https://facebook.com/rasgrand",
    twitter: "https://twitter.com/rasgrand",
    youtube: "https://youtube.com/@rasgrand",
    tripadvisor: "https://tripadvisor.com/rasgrand",
  },
};

// Navigation Links
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/facilities", label: "Facilities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

// Room Categories
export const roomCategories = [
  "all",
  "ocean-view",
  "beach",
  "garden",
  "deluxe",
] as const;

// Experience Categories
export const experienceCategories = [
  "water-sports",
  "diving",
  "spa",
  "dining",
  "excursions",
  "wellness",
] as const;

// Gallery Categories
export const galleryCategories = [
  "all",
  "pool",
  "beach",
  "rooms",
  "dining",
] as const;

// Amenity Icons Mapping
export const amenityIcons = {
  wifi: "Wifi",
  ac: "Wind",
  pool: "Waves",
  breakfast: "Coffee",
  spa: "Sparkles",
  gym: "Dumbbell",
  restaurant: "UtensilsCrossed",
  bar: "Wine",
  beach: "Umbrella",
  diving: "Ship",
  kayak: "Sailboat",
  sunset: "Sunset",
  privacy: "Lock",
  butler: "ConciergeBell",
  jacuzzi: "Bath",
  oceanView: "Eye",
} as const;

// Booking Configuration
export const bookingConfig = {
  minNights: 2,
  maxNights: 30,
  maxGuests: 6,
  checkInTime: "14:00",
  checkOutTime: "11:00",
  cancellationDays: 7,
  depositPercentage: 30,
};

// Animation Variants (for motion)
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};
