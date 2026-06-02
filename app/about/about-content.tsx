"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Heart, Users, Compass, Award, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/lib/constants";

const values = [
  {
    icon: Heart,
    title: "Warm Hospitality",
    description:
      "We treat every guest like family. Our warm welcome and genuine care make your stay memorable.",
  },
  {
    icon: Users,
    title: "Family Run",
    description:
      "As a family-owned guest house, we bring personal attention and love to everything we do.",
  },
  {
    icon: Compass,
    title: "Local Experience",
    description:
      "We help you discover the real Maldives - local culture, hidden spots, and authentic experiences.",
  },
  {
    icon: Award,
    title: "Quality Service",
    description:
      "Simple but excellent. We focus on what matters - clean rooms, great food, and helpful service.",
  },
];

export function AboutPage() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const islandRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const islandInView = useInView(islandRef, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[60vh] min-h-[400px] flex items-center justify-center"
      >
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80"
            alt="Rasdhoo Island"
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
            About {siteConfig.name}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Your island home in Rasdhoo, Maldives
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section ref={storyRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-turquoise font-medium text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                From Our Family to Yours
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Ras Grand started as a dream to share the magic of Rasdhoo
                  with travelers from around the world. What began as a small
                  family home has grown into a welcoming guest house, but our
                  values remain the same.
                </p>
                <p>
                  We believe that the best travel experiences come from genuine
                  connections. When you stay with us, you&apos;re not just a
                  guest - you&apos;re part of our extended family. We&apos;ll
                  share our favorite spots, introduce you to local traditions,
                  and make sure you leave with memories that last a lifetime.
                </p>
                <p>
                  Our island of Rasdhoo is a hidden gem in the Maldives. With
                  pristine beaches, incredible marine life, and a friendly local
                  community, it offers an authentic Maldivian experience that
                  larger resort islands simply can&apos;t match.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px] rounded-2xl overflow-hidden"
            >
              <OptimizedImage
                src="/gallery/islandview.jpg"
                alt="Ras Grand Guest House"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section ref={valuesRef} className="py-20 bg-sand">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <span className="text-turquoise font-medium text-sm uppercase tracking-wider">
              What We Stand For
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-3">
              Our Values
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl text-center"
              >
                <div className="w-14 h-14 rounded-full bg-ocean/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-ocean" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Rasdhoo */}
      <section ref={islandRef} className="py-20 bg-ocean-deep text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={islandInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-turquoise font-medium text-sm uppercase tracking-wider">
              Our Island
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-3">
              Discover Rasdhoo
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={islandInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid md:grid-cols-2 gap-8 mb-12"
            >
              <p className="text-white/80 leading-relaxed">
                Rasdhoo is a small island located in Alifu Alifu Atoll, known
                for its stunning natural beauty and friendly local community.
                Unlike the resort islands, Rasdhoo offers an authentic Maldivian
                experience where you can mingle with locals and experience
                island life firsthand.
              </p>
              <p className="text-white/80 leading-relaxed">
                The island is famous for its incredible diving and snorkeling
                spots, including the renowned Rasdhoo Madivaru where you can
                swim with hammerhead sharks. The bikini beach offers
                crystal-clear waters perfect for swimming and relaxation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={islandInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-turquoise" />
                <div>
                  <p className="text-white font-medium">Location</p>
                  <p className="text-white/60 text-sm">Alifu Alifu Atoll</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-turquoise" />
                <div>
                  <p className="text-white font-medium">From Malé</p>
                  <p className="text-white/60 text-sm">25 min by speedboat</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
