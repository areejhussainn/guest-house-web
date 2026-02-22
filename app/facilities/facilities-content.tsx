"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import {
  Wifi,
  Wind,
  Utensils,
  Waves,
  Ship,
  TreePalm,
  Car,
  Coffee,
  ShowerHead,
  Tv,
  Refrigerator,
  Shirt,
  Users,
  Bed,
  Check,
  Star,
} from "lucide-react";
import { siteConfig } from "@/lib/constants";

const roomTypes = [
  {
    name: "Standard Room",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    description:
      "Comfortable room with all essential amenities for a relaxing stay. Perfect for solo travelers or couples looking for a cozy retreat.",
    price: "$60",
    capacity: "2 guests",
    size: "22 sqm",
    features: [
      "Queen-size bed",
      "Air conditioning",
      "Private bathroom with hot water",
      "Free Wi-Fi",
      "Daily housekeeping",
      "Ceiling fan",
    ],
  },
  {
    name: "Deluxe Room",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    description:
      "Spacious room with garden view and enhanced amenities. Enjoy extra comfort with a sitting area and mini refrigerator.",
    price: "$85",
    capacity: "2 guests",
    size: "28 sqm",
    features: [
      "King-size bed",
      "Air conditioning",
      "Private balcony",
      "Mini refrigerator",
      "Free Wi-Fi",
      "Sitting area",
      "Tea/coffee maker",
    ],
  },
  {
    name: "Family Room",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    description:
      "Large room ideal for families or groups. Features multiple beds and extra space for everyone to spread out comfortably.",
    price: "$120",
    capacity: "4 guests",
    size: "35 sqm",
    features: [
      "1 King + 2 Single beds",
      "Air conditioning",
      "Private bathroom",
      "Free Wi-Fi",
      "Sitting area",
      "Complimentary breakfast",
      "Extra towels",
    ],
  },
  {
    name: "Beach View Suite",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    description:
      "Our premium room with stunning views. Features a private balcony overlooking the ocean and top-tier amenities for a luxurious stay.",
    price: "$150",
    capacity: "2 guests",
    size: "40 sqm",
    features: [
      "King-size bed",
      "Ocean view balcony",
      "Air conditioning",
      "Mini bar",
      "Free Wi-Fi",
      "Rain shower",
      "Complimentary breakfast",
      "Room service",
    ],
    featured: true,
  },
];

const amenities = [
  {
    icon: Wifi,
    name: "Free Wi-Fi",
    description: "High-speed internet throughout the property",
  },
  {
    icon: Wind,
    name: "Air Conditioning",
    description: "Climate control in all rooms",
  },
  {
    icon: ShowerHead,
    name: "Hot Water",
    description: "24/7 hot water in all bathrooms",
  },
  { icon: Tv, name: "TV", description: "Flat-screen TV in rooms" },
  { icon: Refrigerator, name: "Mini Fridge", description: "In select rooms" },
  {
    icon: Coffee,
    name: "Tea/Coffee",
    description: "Complimentary in-room amenities",
  },
  { icon: Shirt, name: "Laundry", description: "Laundry service available" },
  {
    icon: Car,
    name: "Airport Transfer",
    description: "We arrange transfers from Malé",
  },
];

const services = [
  {
    icon: Utensils,
    title: "Restaurant",
    description:
      "Our in-house restaurant serves delicious Maldivian and international cuisine. Enjoy fresh seafood, local curries, and western favorites.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    hours: "7:00 AM - 10:00 PM",
  },
  {
    icon: Ship,
    title: "Tours & Excursions",
    description:
      "We organize diving trips, snorkeling excursions, dolphin watching, fishing trips, and island hopping adventures.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    hours: "8:00 AM - 6:00 PM",
  },
  {
    icon: Waves,
    title: "Beach Access",
    description:
      "The beautiful bikini beach is just a 5-minute walk from our guest house. We provide beach towels for your convenience.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    hours: "Open 24/7",
  },
  {
    icon: TreePalm,
    title: "Garden Area",
    description:
      "Relax in our peaceful tropical garden with comfortable seating. Perfect for reading or enjoying the island breeze.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
    hours: "Open 24/7",
  },
];

export function FacilitiesPage() {
  const heroRef = useRef(null);
  const roomsRef = useRef(null);
  const amenitiesRef = useRef(null);
  const servicesRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const roomsInView = useInView(roomsRef, { once: true, margin: "-100px" });
  const amenitiesInView = useInView(amenitiesRef, {
    once: true,
    margin: "-100px",
  });
  const servicesInView = useInView(servicesRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[50vh] min-h-[350px] flex items-center justify-center"
      >
        <div className="absolute inset-0">
          <Image
            src="/gallery/facilitiespool.jpg"
            alt="Ras Grand facilities"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Our Facilities
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Everything you need for a comfortable and memorable stay
          </p>
        </motion.div>
      </section>

      {/* Our Rooms */}
      <section ref={roomsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={roomsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <span className="text-turquoise font-medium text-sm uppercase tracking-wider">
              Accommodations
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              Our Rooms
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our comfortable rooms, each designed with your comfort
              in mind.
            </p>
          </motion.div>

          <div className="space-y-8">
            {roomTypes.map((room, index) => (
              <motion.div
                key={room.name}
                initial={{ opacity: 0, y: 20 }}
                animate={roomsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row gap-6 p-6 rounded-2xl ${
                  room.featured ? "bg-ocean-deep text-white" : "bg-sand"
                }`}
              >
                {/* Image */}
                <div className="lg:w-2/5 relative h-64 lg:h-auto rounded-xl overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  {room.featured && (
                    <div className="absolute top-4 left-4 bg-coral text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Best Seller
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="lg:w-3/5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h3 className="font-serif text-2xl font-semibold">
                      {room.name}
                    </h3>
                    <p className="text-2xl font-bold">
                      {room.price}
                      <span
                        className={`text-sm font-normal ${
                          room.featured ? "text-white/70" : (
                            "text-muted-foreground"
                          )
                        }`}
                      >
                        /night
                      </span>
                    </p>
                  </div>

                  <p
                    className={`mb-4 ${
                      room.featured ? "text-white/80" : "text-muted-foreground"
                    }`}
                  >
                    {room.description}
                  </p>

                  {/* Room Info */}
                  <div className="flex items-center gap-6 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Users
                        className={`w-4 h-4 ${
                          room.featured ? "text-turquoise" : "text-ocean"
                        }`}
                      />
                      <span>{room.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed
                        className={`w-4 h-4 ${
                          room.featured ? "text-turquoise" : "text-ocean"
                        }`}
                      />
                      <span>{room.size}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2">
                    {room.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Check
                          className={`w-4 h-4 shrink-0 ${
                            room.featured ? "text-turquoise" : "text-ocean"
                          }`}
                        />
                        <span
                          className={
                            room.featured ? "text-white/80" : (
                              "text-muted-foreground"
                            )
                          }
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section ref={amenitiesRef} className="py-20 bg-sand">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={amenitiesInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <span className="text-turquoise font-medium text-sm uppercase tracking-wider">
              What We Offer
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3">
              Amenities
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.name}
                initial={{ opacity: 0, y: 20 }}
                animate={amenitiesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white p-5 rounded-xl text-center"
              >
                <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center mx-auto mb-3">
                  <amenity.icon className="w-6 h-6 text-ocean" />
                </div>
                <h3 className="font-medium text-foreground text-sm mb-1">
                  {amenity.name}
                </h3>
                <p className="text-muted-foreground text-xs">
                  {amenity.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <span className="text-turquoise font-medium text-sm uppercase tracking-wider">
              Guest Services
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3">
              Our Services
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-sand rounded-2xl overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <service.icon className="w-5 h-5" />
                      <h3 className="font-serif text-xl font-semibold">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-sm text-white/80">{service.hours}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
