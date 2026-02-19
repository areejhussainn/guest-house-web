import { Room } from "@/types";

export const rooms: Room[] = [
  {
    id: "1",
    slug: "ocean-view-room",
    name: "Ocean View Room",
    category: "ocean-view",
    tagline: "Wake up to the sound of waves",
    description:
      "Our cozy Ocean View Room offers stunning views of the turquoise lagoon from your private balcony. Perfect for couples or solo travelers seeking a comfortable retreat with all essential amenities. Watch the sunrise over the Indian Ocean each morning from the comfort of your room.",
    shortDescription:
      "Comfortable room with private balcony and stunning ocean views.",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600",
    price: {
      perNight: 120,
      currency: "USD",
    },
    capacity: {
      adults: 2,
      children: 0,
    },
    size: 28,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["wifi", "ac", "breakfast", "oceanView"],
    features: [
      "Private balcony with ocean view",
      "Queen-size bed",
      "En-suite bathroom with rain shower",
      "Mini fridge",
      "Ceiling fan & AC",
      "Daily housekeeping",
    ],
    highlights: [
      "Best ocean views",
      "Complimentary breakfast",
      "Walking distance to beach",
    ],
    available: true,
  },
  {
    id: "2",
    slug: "beach-suite",
    name: "Beach Suite",
    category: "beach",
    tagline: "Steps from the sand",
    description:
      "Our spacious Beach Suite is just steps from the pristine white sand beach. This suite features a separate living area, making it perfect for longer stays or those who want extra space. Enjoy direct beach access and fall asleep to the gentle sound of waves.",
    shortDescription:
      "Spacious suite with living area and direct beach access.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
    price: {
      perNight: 180,
      currency: "USD",
    },
    capacity: {
      adults: 2,
      children: 1,
    },
    size: 45,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["wifi", "ac", "breakfast", "beach", "oceanView"],
    features: [
      "Direct beach access",
      "Separate living area",
      "King-size bed",
      "Private terrace with loungers",
      "Outdoor shower",
      "Mini kitchenette",
    ],
    highlights: [
      "Beachfront location",
      "Extra space for relaxation",
      "Perfect for honeymooners",
    ],
    available: true,
  },
  {
    id: "3",
    slug: "garden-room",
    name: "Garden Room",
    category: "garden",
    tagline: "Tropical tranquility",
    description:
      "Nestled within our lush tropical garden, this budget-friendly room offers a peaceful retreat surrounded by coconut palms and tropical flowers. A perfect choice for travelers seeking comfort at a great value, with the beach just a short walk away.",
    shortDescription: "Budget-friendly room surrounded by tropical gardens.",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600",
    price: {
      perNight: 85,
      currency: "USD",
    },
    capacity: {
      adults: 2,
      children: 0,
    },
    size: 22,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["wifi", "ac", "breakfast"],
    features: [
      "Garden view terrace",
      "Double bed",
      "En-suite bathroom",
      "Ceiling fan & AC",
      "Hammock",
      "2-minute walk to beach",
    ],
    highlights: [
      "Best value option",
      "Peaceful garden setting",
      "Ideal for budget travelers",
    ],
    available: true,
  },
  {
    id: "4",
    slug: "deluxe-suite",
    name: "Deluxe Suite",
    category: "deluxe",
    tagline: "Our finest accommodation",
    description:
      "Experience the best our guest house has to offer in our Deluxe Suite. This premium room features a spacious layout with a private balcony offering panoramic ocean views, premium king-size bed, luxurious bathroom with soaking tub, and exclusive amenities for a truly special stay.",
    shortDescription:
      "Our premium suite with panoramic views and luxury amenities.",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600",
    price: {
      perNight: 250,
      currency: "USD",
    },
    capacity: {
      adults: 2,
      children: 1,
    },
    size: 55,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["wifi", "ac", "breakfast", "oceanView", "jacuzzi", "butler"],
    features: [
      "Panoramic ocean views",
      "Private large balcony",
      "Premium king-size bed",
      "Luxury bathroom with tub",
      "Mini bar included",
      "Welcome fruit basket & wine",
      "Late checkout",
    ],
    highlights: [
      "Our best room",
      "Romantic getaway perfect",
      "Premium amenities included",
    ],
    available: true,
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((room) => room.slug === slug);
}

export function getRoomsByCategory(category: Room["category"]): Room[] {
  return rooms.filter((room) => room.category === category);
}

export function getFeaturedRooms(count: number = 4): Room[] {
  return rooms.slice(0, count);
}

// Backwards compatibility - alias as villas
export const villas = rooms;
export const getVillaBySlug = getRoomBySlug;
export const getFeaturedVillas = getFeaturedRooms;
