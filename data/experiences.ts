import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "1",
    slug: "sunset-dolphin-cruise",
    name: "Sunset Dolphin Cruise",
    category: "excursions",
    tagline: "Dance with dolphins as the sun sets",
    description:
      "Embark on an unforgettable journey across the Indian Ocean as we search for pods of spinner dolphins in their natural habitat. As the sun begins its descent, watch these magnificent creatures leap and play against the backdrop of a stunning Maldivian sunset. Includes champagne, canapés, and the company of our expert marine guide.",
    shortDescription:
      "Watch dolphins play at sunset with champagne and canapés.",
    images: [
      "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=1200",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=600",
    duration: "2.5 hours",
    price: {
      amount: 180,
      currency: "USD",
      per: "person",
    },
    highlights: [
      "Wild dolphin encounters",
      "Stunning sunset views",
      "Champagne & canapés",
      "Expert marine guide",
    ],
    includes: [
      "Traditional dhoni boat",
      "Champagne & canapés",
      "Marine biologist guide",
      "Photography tips",
    ],
    schedule: "Daily at 5:00 PM",
    minAge: 5,
    maxParticipants: 12,
  },
  {
    id: "2",
    slug: "coral-reef-diving",
    name: "Coral Reef Diving",
    category: "diving",
    tagline: "Discover the underwater paradise",
    description:
      "Dive into the vibrant underwater world of the Maldives with our PADI-certified instructors. Explore pristine coral reefs teeming with tropical fish, sea turtles, and rays. Whether you're a beginner or experienced diver, we have the perfect reef for you. Equipment and underwater photography included.",
    shortDescription:
      "PADI-certified diving in pristine coral reefs with all equipment.",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200",
      "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600",
    duration: "3 hours",
    price: {
      amount: 150,
      currency: "USD",
      per: "person",
    },
    highlights: [
      "PADI-certified instructors",
      "Pristine coral reefs",
      "Marine life encounters",
      "Underwater photography",
    ],
    includes: [
      "Full diving equipment",
      "PADI-certified instructor",
      "Boat transfer",
      "Underwater camera rental",
      "Refreshments",
    ],
    schedule: "9:00 AM & 2:00 PM",
    difficulty: "moderate",
    minAge: 12,
    maxParticipants: 6,
  },
  {
    id: "3",
    slug: "overwater-spa-journey",
    name: "Overwater Spa Journey",
    category: "spa",
    tagline: "Healing above the ocean",
    description:
      "Surrender to tranquility in our overwater spa pavilion. This 3-hour journey begins with a traditional Maldivian sand scrub, followed by a warm coconut oil massage, and concludes with a flower bath overlooking the lagoon. Listen to the gentle waves beneath as you drift into complete relaxation.",
    shortDescription:
      "3-hour spa journey with traditional treatments in our overwater pavilion.",
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200",
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600",
    duration: "3 hours",
    price: {
      amount: 350,
      currency: "USD",
      per: "person",
    },
    highlights: [
      "Overwater spa pavilion",
      "Traditional treatments",
      "Ocean views",
      "Complete relaxation",
    ],
    includes: [
      "Sand body scrub",
      "Coconut oil massage",
      "Flower bath",
      "Herbal tea & fruit",
      "Spa robe & slippers",
    ],
    schedule: "By appointment",
    minAge: 16,
    maxParticipants: 2,
  },
  {
    id: "4",
    slug: "private-sandbank-picnic",
    name: "Private Sandbank Picnic",
    category: "dining",
    tagline: "Your own island for a day",
    description:
      "Be castaway for a day on your own private sandbank. Our team will set up a luxurious picnic with champagne, gourmet lunch, and all the amenities you need. Spend the day swimming, snorkeling, or simply soaking up the sun on pristine white sand surrounded by turquoise waters.",
    shortDescription:
      "Private sandbank experience with gourmet lunch and champagne.",
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600",
    duration: "6 hours",
    price: {
      amount: 600,
      currency: "USD",
      per: "couple",
    },
    highlights: [
      "Private sandbank",
      "Gourmet picnic lunch",
      "Champagne included",
      "Snorkeling equipment",
    ],
    includes: [
      "Speedboat transfer",
      "Luxury setup with shade",
      "Gourmet lunch & champagne",
      "Snorkeling gear",
      "Beach games",
      "Photography",
    ],
    schedule: "Daily departures at 10:00 AM",
    minAge: 0,
    maxParticipants: 4,
  },
  {
    id: "5",
    slug: "sunrise-yoga",
    name: "Sunrise Yoga Session",
    category: "wellness",
    tagline: "Greet the day in paradise",
    description:
      "Begin your day with a transformative yoga session on our overwater yoga deck. As the sun rises over the Indian Ocean, our certified instructor will guide you through a flowing practice suitable for all levels. Includes healthy breakfast and fresh juices after the session.",
    shortDescription: "Morning yoga on overwater deck with healthy breakfast.",
    images: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200",
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600",
    duration: "1.5 hours",
    price: {
      amount: 75,
      currency: "USD",
      per: "person",
    },
    highlights: [
      "Sunrise ocean views",
      "All levels welcome",
      "Certified instructor",
      "Healthy breakfast",
    ],
    includes: [
      "Yoga mat & props",
      "Certified instructor",
      "Healthy breakfast",
      "Fresh juices",
      "Meditation",
    ],
    schedule: "Daily at 6:30 AM",
    difficulty: "easy",
    minAge: 12,
    maxParticipants: 10,
  },
  {
    id: "6",
    slug: "jet-ski-adventure",
    name: "Jet Ski Adventure",
    category: "water-sports",
    tagline: "Ride the waves",
    description:
      "Feel the thrill of speeding across the crystal-clear lagoon on a guided jet ski adventure. Explore hidden sandbars, race alongside the island, and experience the Maldives from a whole new perspective. Our guides ensure safety while maximizing the fun.",
    shortDescription:
      "Guided jet ski tour around the island and hidden sandbars.",
    images: [
      "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=1200",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=600",
    duration: "1 hour",
    price: {
      amount: 120,
      currency: "USD",
      per: "person",
    },
    highlights: [
      "Guided adventure",
      "Latest jet skis",
      "Hidden sandbar visit",
      "Action photos",
    ],
    includes: [
      "Safety briefing",
      "Life jacket",
      "Guided tour",
      "Action photography",
      "Water & towel",
    ],
    schedule: "Multiple departures daily",
    difficulty: "moderate",
    minAge: 16,
    maxParticipants: 4,
  },
];

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((exp) => exp.slug === slug);
}

export function getExperiencesByCategory(
  category: Experience["category"]
): Experience[] {
  return experiences.filter((exp) => exp.category === category);
}

export function getFeaturedExperiences(count: number = 4): Experience[] {
  return experiences.slice(0, count);
}
