"use client";

import { motion } from "motion/react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import Link from "next/link";
import { ArrowRight, Users, Maximize } from "lucide-react";
import { Room } from "@/types";
import { getFeaturedRooms } from "@/data/rooms";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedHeading } from "@/components/ui/text-animations";

function RoomCard({ room, index }: { room: Room; index: number }) {
  return (
    <BlurFade delay={0.1 * index}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group relative rounded-2xl overflow-hidden bg-white shadow-lg"
      >
        {/* Image */}
        <div className="relative h-72 overflow-hidden">
          <OptimizedImage
            src={room.thumbnail}
            alt={room.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category Badge */}
          <Badge className="absolute top-4 left-4 bg-white/90 text-ocean-deep capitalize">
            {room.category.replace("-", " ")}
          </Badge>

          {/* Price */}
          <div className="absolute bottom-4 left-4 text-white">
            <span className="text-3xl font-serif font-bold">
              ${room.price.perNight}
            </span>
            <span className="text-white/80 text-sm"> / night</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-ocean transition-colors">
            {room.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {room.shortDescription}
          </p>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>Up to {room.capacity.adults + room.capacity.children}</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="w-4 h-4" />
              <span>{room.size}</span>
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/rooms/${room.slug}`}
            className="inline-flex items-center gap-2 text-ocean font-medium hover:text-ocean-deep transition-colors group/link"
          >
            View Details
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </BlurFade>
  );
}

export function FeaturedRooms() {
  const rooms = getFeaturedRooms(4);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-sand">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <BlurFade>
            <span className="text-turquoise font-medium text-xs sm:text-sm uppercase tracking-widest">
              Accommodations
            </span>
          </BlurFade>
          <AnimatedHeading
            as="h2"
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 sm:mt-5 md:mt-6 mb-4 sm:mb-6 md:mb-8"
          >
            Our Comfortable Rooms
          </AnimatedHeading>
          <BlurFade delay={0.2}>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg md:text-xl">
              Choose from our collection of cozy rooms, each designed to offer
              comfort, relaxation, and beautiful island views.
            </p>
          </BlurFade>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {rooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <BlurFade delay={0.4} className="text-center mt-14 sm:mt-16 md:mt-20">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-ocean-deep text-ocean-deep hover:bg-ocean-deep hover:text-white"
          >
            <Link href="/rooms">
              <span>View All Rooms</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </BlurFade>
      </div>
    </section>
  );
}

// Keep backwards compatibility
export { FeaturedRooms as FeaturedVillas };
