import { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Emma & James Wilson",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100",
    location: "London, United Kingdom",
    rating: 5,
    title: "The honeymoon of our dreams",
    content:
      "We couldn't have chosen a better place for our honeymoon. The Beach View Suite was absolutely perfect - waking up to that view every morning was surreal. The staff at Ras Grand made us feel like family. We'll definitely be back!",
    date: "2024-11-15",
    roomStayed: "Beach View Suite",
    verified: true,
  },
  {
    id: "2",
    name: "Ahmed Ali",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    location: "Singapore",
    rating: 5,
    title: "Perfect diving experience.",
    content:
      "As an avid diver, Rasdhoo is a must-visit!/ The hammerhead shark diving was incredible. Ras Grand arranged everything perfectly. The room was comfortable and clean, the food was outstanding, and the staff were so helpful. Can't wait to return!",
    date: "2024-10-28",
    roomStayed: "Deluxe Room",
    verified: true,
  },
  {
    id: "3",
    name: "Sophie & Pierre Dubois",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    location: "Paris, France",
    rating: 5,
    title: "Paradise found",
    content:
      "From the moment we arrived, everything was perfect. The warm welcome, the attention to detail - Ras Grand truly understands hospitality. The beach is pristine, and the island hopping trip was magical. This is what paradise looks like!",
    date: "2024-09-20",
    roomStayed: "Deluxe Room",
    verified: true,
  },
  {
    id: "4",
    name: "The Anderson Family",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    location: "Sydney, Australia",
    rating: 5,
    title: "Amazing family vacation",
    content:
      "We traveled with our two kids and Ras Grand was perfect! The Family Room had plenty of space, the kids loved the beach and snorkeling. The staff were so kind to our children. Great value for an authentic Maldives experience!",
    date: "2024-08-15",
    roomStayed: "Family Room",
    verified: true,
  },
  {
    id: "5",
    name: "Yuki Tanaka",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    location: "Tokyo, Japan",
    rating: 5,
    title: "Exceeded all expectations",
    content:
      "Ras Grand is a hidden gem in Rasdhoo. The combination of natural beauty, friendly service, and affordable pricing is unmatched. The seafood at the restaurant was the freshest I've ever had. A truly wonderful experience.",
    date: "2024-07-30",
    roomStayed: "Standard Room",
    verified: true,
  },
  {
    id: "6",
    name: "Robert & Sarah Martinez",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    location: "Miami, USA",
    rating: 5,
    title: "Worth every penny",
    content:
      "We celebrated our anniversary at Ras Grand and it was absolutely worth it. The Beach View Suite has stunning views and the service was impeccable. The dolphin cruise was magical. Already planning our next trip!",
    date: "2024-12-01",
    roomStayed: "Beach View Suite",
    verified: true,
  },
];

export function getFeaturedTestimonials(count: number = 3): Testimonial[] {
  return testimonials.filter((t) => t.rating === 5).slice(0, count);
}

export function getTestimonialsByRoom(roomName: string): Testimonial[] {
  return testimonials.filter((t) => t.roomStayed === roomName);
}

export function getAverageRating(): number {
  const total = testimonials.reduce((sum, t) => sum + t.rating, 0);
  return Math.round((total / testimonials.length) * 10) / 10;
}
