"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Bed, Bath, Users, Check, ChevronLeft, ChevronRight, DoorOpen } from "lucide-react";

const rooms = [
  {
    name: "Delux Rooms",
    count: 17,
    images: ["/gallery/delux.jpg"],
    description:
      "Comfortable room with all essential amenities for a relaxing stay.",
    capacity: 2,
    size: "About 195 Square Feet",
    rooms: "1 Room",
    features: ["Queen Bed", "AC", "Hot Water", "Free Wi-Fi"],
  },
  {
    name: "Superior Deluxe Rooms",
    count: 4,
    images: ["/gallery/supdelux.jpg"],
    description:
      "Spacious room with garden view, perfect for a comfortable retreat.",
    capacity: 2,
    size: "About 195 Square Feet",
    rooms: "1 Room",
    features: ["King Bed", "AC", "Balcony", "Mini Fridge"],
  },
  {
    name: "Mini Suites",
    count: 3,
    images: ["/gallery/mini-suite.jpg"],
    description:
      "Two-room suite ideal for families, with extra space and amenities.",
    capacity: 4,
    size: "About 195 Square Feet",
    rooms: "2 Rooms",
    features: ["2 Rooms", "AC", "Sitting Area", "Free Breakfast"],
  },
  {
    name: "Apartment",
    count: 1,
    images: ["/gallery/apart2.jpg", "/gallery/apart1.jpg"],
    description:
      "Our spacious two-room apartment with premium amenities.",
    capacity: 4,
    size: "About 195 Square Feet",
    rooms: "2 Rooms",
    features: ["2 Rooms", "Kitchen", "Private Balcony", "Mini Bar"],
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
              <div className="flex flex-col md:flex-row h-full">
                {/* Image */}
                <RoomImageCarousel images={room.images} name={room.name} />

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
                    <div className="flex items-center gap-1">
                      <DoorOpen className="w-4 h-4" />
                      <span>{room.rooms}</span>
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

function RoomImageCarousel({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  if (images.length === 1) {
    return (
      <div className="relative h-56 sm:h-64 md:h-auto md:min-h-full md:w-2/5 overflow-hidden rounded-2xl md:rounded-none">
        <OptimizedImage
          src={images[0]}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
    );
  }

  return (
    <div
      className="relative h-56 sm:h-64 md:h-auto md:w-2/5 overflow-hidden rounded-2xl md:rounded-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={src} className="relative min-w-full h-full">
            <OptimizedImage
              src={src}
              alt={`${name} ${i + 1}`}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        ))}
      </div>
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
