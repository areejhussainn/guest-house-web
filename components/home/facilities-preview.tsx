"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Wifi,
  Wind,
  Utensils,
  Waves,
  Ship,
  TreePalm,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const facilities = [
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    description:
      "Stay connected with high-speed internet throughout the property",
  },
  {
    icon: Wind,
    title: "Air Conditioning",
    description: "All rooms equipped with AC for your comfort",
  },
  {
    icon: Utensils,
    title: "Restaurant",
    description: "Delicious local and international cuisine",
  },
  {
    icon: Waves,
    title: "Beach Access",
    description: "Just a 5-minute walk to the beautiful bikini beach",
  },
  {
    icon: Ship,
    title: "Tours & Excursions",
    description: "We arrange diving, snorkeling, and island hopping trips",
  },
  {
    icon: TreePalm,
    title: "Garden Area",
    description: "Relax in our peaceful tropical garden",
  },
];

export function FacilitiesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-sand">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-turquoise font-medium text-xs sm:text-sm uppercase tracking-widest"
          >
            Our Facilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 sm:mt-5 md:mt-6 mb-4 sm:mb-6 md:mb-8"
          >
            Everything You Need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg"
          >
            We provide all the comforts and amenities to make your stay
            enjoyable and memorable.
          </motion.p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-10 sm:mb-14 md:mb-16">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 sm:p-7 md:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center mb-4">
                <facility.icon className="w-6 h-6 text-ocean" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {facility.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {facility.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button
            asChild
            variant="outline"
            className="rounded-full px-6 border-ocean-deep text-ocean-deep hover:bg-ocean-deep hover:text-white"
          >
            <Link href="/facilities" className="inline-flex items-center gap-2">
              View All Facilities
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
