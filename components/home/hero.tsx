"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";

export function Hero() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&q=80"
          alt="Crystal clear turquoise ocean waves Maldives"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center pt-24 pb-32 md:pt-20 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 sm:mb-6"
            >
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs sm:text-sm font-medium">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Rasdhoo Island, Maldives
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-4 sm:mb-6 drop-shadow-lg"
            >
              Welcome to
              <br />
              <span className="text-turquoise drop-shadow-lg">
                {siteConfig.name}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-white max-w-xl mb-8 sm:mb-10 leading-relaxed drop-shadow-md"
            >
              Your home away from home in the beautiful Maldives. Experience
              warm hospitality, comfortable rooms, and the stunning beaches of
              Rasdhoo Island.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-coral hover:bg-coral/90 text-white rounded-full px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg w-full sm:w-auto"
              >
                <Link href="/contact">
                  <span>Contact Us</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm w-full sm:w-auto"
              >
                <Link href="/facilities">
                  <span>View Facilities</span>
                </Link>
              </Button>
            </motion.div>

            {/* Simple Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 sm:mt-16 grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:items-center sm:gap-8 md:gap-12"
            >
              <div className="text-center sm:text-left">
                <span className="block text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">
                  4
                </span>
                <span className="text-white/60 text-xs sm:text-sm">Cozy Rooms</span>
              </div>
              <div className="w-px h-10 bg-white/20 hidden sm:block" />
              <div className="text-center sm:text-left">
                <span className="block text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">
                  24/7
                </span>
                <span className="text-white/60 text-xs sm:text-sm">Service</span>
              </div>
              <div className="w-px h-10 bg-white/20 hidden sm:block" />
              <div className="text-center sm:text-left">
                <span className="block text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">
                  5 min
                </span>
                <span className="text-white/60 text-xs sm:text-sm">To Beach</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={scrollToContent}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 sm:gap-2 text-white/70 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs sm:text-sm">Discover more</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
