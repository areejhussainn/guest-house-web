import { Room } from "@/types";

export const rooms: Room[] = [
  {
    id: "1",
    slug: "apartment-2-room",
    name: "Apartment 2 Room",
    category: "apartment",
    tagline: "Spacious apartment-style living",
    description:
      "Our premium Apartment 2 Room offers the most spacious accommodation at Ras Grand, featuring two well-appointed bedrooms, a comfortable living area, and all the amenities you need for an extended stay. Perfect for families or groups seeking a home-away-from-home experience in the Maldives.",
    shortDescription:
      "Our most spacious option with two bedrooms and a living area.",
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
      adults: 4,
      children: 2,
    },
    size: "About 400 Square Feet",
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["wifi", "ac", "breakfast", "oceanView", "jacuzzi", "butler"],
    features: [
      "Two spacious bedrooms",
      "Separate living area",
      "Private balcony with views",
      "Premium king-size beds",
      "Full kitchenette",
      "Welcome fruit basket & refreshments",
      "Late checkout",
    ],
    highlights: [
      "Our most spacious option",
      "Perfect for families",
      "Premium amenities included",
    ],
    available: true,
  },
  {
    id: "2",
    slug: "mini-suites-2-rooms",
    name: "Mini Suites 2 Rooms",
    category: "mini-suite",
    tagline: "Comfort meets elegance",
    description:
      "Our Mini Suites offer two beautifully appointed rooms with a cozy yet elegant atmosphere. Ideal for couples or small families, these suites feature modern amenities, a separate sitting area, and easy access to the beach. Enjoy the perfect blend of comfort and island charm.",
    shortDescription:
      "Elegant two-room suite perfect for couples and small families.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
    price: {
      perNight: 220,
      currency: "USD",
    },
    capacity: {
      adults: 3,
      children: 1,
    },
    size: "About 320 Square Feet",
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["wifi", "ac", "breakfast", "beach", "oceanView"],
    features: [
      "Two connected rooms",
      "Separate sitting area",
      "King-size bed",
      "Private terrace with loungers",
      "Mini kitchenette",
      "Daily housekeeping",
    ],
    highlights: [
      "Great for small families",
      "Extra space for relaxation",
      "Beach access nearby",
    ],
    available: true,
  },
  {
    id: "3",
    slug: "superior-deluxe-room",
    name: "Superior Deluxe Room",
    category: "superior-deluxe",
    tagline: "Elevated comfort & style",
    description:
      "Step up to our Superior Deluxe Room for an enhanced island stay. These beautifully designed rooms offer premium bedding, a stylish bathroom, and a private balcony to enjoy the tropical surroundings. An excellent choice for travelers who want a touch of luxury without the premium suite price.",
    shortDescription:
      "Stylish room with premium amenities and a private balcony.",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600",
    price: {
      perNight: 140,
      currency: "USD",
    },
    capacity: {
      adults: 2,
      children: 1,
    },
    size: "About 230 Square Feet",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["wifi", "ac", "breakfast", "oceanView"],
    features: [
      "Private balcony",
      "Premium queen-size bed",
      "En-suite bathroom with rain shower",
      "Mini fridge & mini bar",
      "Ceiling fan & AC",
      "Daily housekeeping",
    ],
    highlights: [
      "Premium comfort",
      "Complimentary breakfast",
      "Walking distance to beach",
    ],
    available: true,
  },
  {
    id: "4",
    slug: "deluxe-room",
    name: "Deluxe Room",
    category: "deluxe",
    tagline: "Classic island comfort",
    description:
      "Our Deluxe Room offers a comfortable and well-appointed space for your Maldives getaway. Featuring modern amenities, cozy bedding, and a fresh interior design, this room is an excellent choice for couples or solo travelers looking for quality accommodations at a great value.",
    shortDescription: "Comfortable and well-appointed room at great value.",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600",
    price: {
      perNight: 120,
      currency: "USD",
    },
    capacity: {
      adults: 2,
      children: 0,
    },
    size: "About 195 Square Feet",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["wifi", "ac", "breakfast"],
    features: [
      "Queen-size bed",
      "En-suite bathroom",
      "Ceiling fan & AC",
      "Mini fridge",
      "Work desk",
      "Daily housekeeping",
    ],
    highlights: ["Great value", "Complimentary breakfast", "Close to beach"],
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
