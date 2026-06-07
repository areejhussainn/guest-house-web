"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Heart, Home, Sunrise } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-turquoise font-medium text-xs sm:text-sm uppercase tracking-widest">
              About Us
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 sm:mt-5 md:mt-6 mb-4 sm:mb-6 md:mb-8">
              Your Island Home in Rasdhoo
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              Rasgrand is a family-run guest house nestled on the beautiful
              island of Rasdhoo in the Maldives. We believe in providing genuine
              Maldivian hospitality where every guest feels like family.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-10 sm:mb-12 md:mb-14 max-w-2xl mx-auto">
              Our cozy guest house offers the perfect blend of comfort and
              authentic island experience. From pristine beaches to vibrant
              marine life, Rasdhoo has it all - and we&apos;re here to help you
              discover every bit of it.
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 sm:gap-5 md:gap-6 mb-10 sm:mb-12 md:mb-16 max-w-md mx-auto">
              <div className="text-center p-4 sm:p-5 md:p-6 bg-sand rounded-2xl hover:shadow-md transition-shadow">
                <Home className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-ocean mx-auto mb-2 sm:mb-3" />
                <p className="text-xs sm:text-sm md:text-base font-semibold text-foreground">
                  Family Run
                </p>
              </div>
              <div className="text-center p-4 sm:p-5 md:p-6 bg-sand rounded-2xl hover:shadow-md transition-shadow">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-coral mx-auto mb-2 sm:mb-3" />
                <p className="text-xs sm:text-sm md:text-base font-semibold text-foreground">
                  Warm Service
                </p>
              </div>
              <div className="text-center p-4 sm:p-5 md:p-6 bg-sand rounded-2xl hover:shadow-md transition-shadow">
                <Sunrise className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-sunset mx-auto mb-2 sm:mb-3" />
                <p className="text-xs sm:text-sm md:text-base font-semibold text-foreground">
                  Island Life
                </p>
              </div>
            </div>

            <Button
              asChild
              className="bg-ocean-deep hover:bg-ocean text-white rounded-full px-6"
            >
              <Link href="/about" className="inline-flex items-center gap-2">
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
