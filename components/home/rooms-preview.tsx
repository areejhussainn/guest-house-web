"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { Bed, Bath, Users, Check } from "lucide-react";

const rooms = [
  {
    name: "Delux Rooms",
    count: 18,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    description:
      "Comfortable room with all essential amenities for a relaxing stay.",
    capacity: 2,
    size: "22 sqm",
    features: ["Queen Bed", "AC", "Hot Water", "Free Wi-Fi"],
  },
  {
    name: "Superior Deluxe Rooms",
    count: 3,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80",
    description:
      "Spacious room with garden view, perfect for a comfortable retreat.",
    capacity: 2,
    size: "28 sqm",
    features: ["King Bed", "AC", "Balcony", "Mini Fridge"],
  },
  {
    name: "2 Rooms Mini Suites",
    count: 3,
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80",
    description:
      "Large room ideal for families, with extra space and amenities.",
    capacity: 4,
    size: "35 sqm",
    features: ["2 Beds", "AC", "Sitting Area", "Free Breakfast"],
  },
  {
    name: "2 Room Apartment",
    count: 1,
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
    description:
      "Our best room with stunning ocean views and premium amenities.",
    capacity: 4,
    size: "40 sqm",
    features: ["King Bed", "Ocean View", "Private Balcony", "Mini Bar"],
  },
];

export function RoomsPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-turquoise font-medium text-xs sm:text-sm uppercase tracking-widest"
          >
            Accommodations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 sm:mt-5 md:mt-6 mb-4 sm:mb-6 md:mb-8"
          >
            Our Cozy Rooms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg"
          >
            Choose from our comfortable rooms, each designed to give you a
            restful night&apos;s sleep and a home-away-from-home experience.
          </motion.p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {rooms.map((room, index) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-sand rounded-2xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative h-56 sm:h-64 md:h-auto md:w-2/5 overflow-hidden rounded-2xl md:rounded-none">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 md:p-6 lg:p-8 md:w-3/5">
                  <div className="flex justify-between items-start gap-3 mb-3 sm:mb-4">
                    <h3 className="font-serif text-lg sm:text-xl md:text-lg lg:text-xl font-semibold text-foreground">
                      {room.name}
                    </h3>
                    <span className="bg-turquoise text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                      {room.count} {room.count === 1 ? "room" : "rooms"}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Room Info */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground mb-5 sm:mb-6">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{room.capacity} guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{room.size}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {room.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full text-muted-foreground"
                      >
                        <Check className="w-3 h-3 text-ocean" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
