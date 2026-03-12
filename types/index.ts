// Room Types
export interface Room {
  id: string;
  slug: string;
  name: string;
  category: "apartment" | "mini-suite" | "superior-deluxe" | "deluxe";
  tagline: string;
  description: string;
  shortDescription: string;
  images: string[];
  thumbnail: string;
  price: {
    perNight: number;
    currency: string;
  };
  capacity: {
    adults: number;
    children: number;
  };
  size: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  features: string[];
  highlights: string[];
  available: boolean;
}

// Experience Types
export interface Experience {
  id: string;
  slug: string;
  name: string;
  category:
    | "water-sports"
    | "diving"
    | "spa"
    | "dining"
    | "excursions"
    | "wellness";
  tagline: string;
  description: string;
  shortDescription: string;
  images: string[];
  thumbnail: string;
  duration: string;
  price: {
    amount: number;
    currency: string;
    per: "person" | "couple" | "group";
  };
  highlights: string[];
  includes: string[];
  schedule?: string;
  difficulty?: "easy" | "moderate" | "challenging";
  minAge?: number;
  maxParticipants?: number;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  roomStayed?: string;
  verified: boolean;
}

// Gallery Types
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "rooms" | "beach" | "dining" | "spa" | "activities" | "underwater";
  width: number;
  height: number;
  featured?: boolean;
}

// Booking Types
export interface BookingFormData {
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  roomId: string;
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    specialRequests?: string;
  };
  addOns?: string[];
}

export interface BookingCalculation {
  nights: number;
  basePrice: number;
  addOnsTotal: number;
  taxes: number;
  total: number;
  currency: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preferredContact: "email" | "phone" | "whatsapp";
}

// Newsletter Types
export interface NewsletterFormData {
  email: string;
  interests?: string[];
}

// Team Member Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials?: {
    linkedin?: string;
    instagram?: string;
  };
}

// FAQ Types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "general" | "booking" | "villas" | "activities" | "policies";
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Navigation Types
export interface NavLink {
  href: string;
  label: string;
  children?: NavLink[];
}
