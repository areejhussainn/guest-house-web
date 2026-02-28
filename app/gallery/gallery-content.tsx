"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import Image from "next/image";
import { siteConfig, galleryCategories } from "@/lib/constants";

const images = [
  {
    src: "/gallery/runner.jpg",
    alt: "Woman running on the beach",
    category: "beach",
  },
  {
    src: "/gallery/beach1.jpg",
    alt: "Beach view",
    category: "beach",
  },
  {
    src: "/gallery/pool.jpg",
    alt: "Pool view",
    category: "pool",
  },
  {
    src: "/gallery/pool2.jpg",
    alt: "Pool area",
    category: "pool",
  },
  {
    src: "/gallery/pool5.jpg",
    alt: "Pool and patio design",
    category: "pool",
  },
  {
    src: "/gallery/poolseating.jpg",
    alt: "Poolside seating with turquoise cushions",
    category: "dining",
  },
  {
    src: "/gallery/seatingarea.jpg",
    alt: "Interior seating lounge",
    category: "pool",
  },
  {
    src: "/gallery/seatingarea3.jpg",
    alt: "Interior seating area",
    category: "pool",
  },
  {
    src: "/gallery/seatingspace.jpg",
    alt: "Modern seating space",
    category: "pool",
  },
  {
    src: "/gallery/cielinginterior.jpg",
    alt: "Modern ceiling interior design",
    category: "dining",
  },
  {
    src: "/gallery/garden.jpg",
    alt: "Garden area",
    category: "pool",
  },
  {
    src: "/gallery/garden4.jpg",
    alt: "Garden landscape",
    category: "pool",
  },
  {
    src: "/gallery/entrance.jpg",
    alt: "Guest house entrance",
    category: "dining",
  },
  {
    src: "/gallery/poool1.jpg",
    alt: "Pool area view",
    category: "pool",
  },
  {
    src: "/gallery/poool2.jpg",
    alt: "Pool seating area",
    category: "pool",
  },
  {
    src: "/gallery/poool3.jpg",
    alt: "Pool relaxation zone",
    category: "pool",
  },
  {
    src: "/gallery/apart1.jpg",
    alt: "Apartment room",
    category: "rooms",
  },
  {
    src: "/gallery/apart2.jpg",
    alt: "Apartment room interior",
    category: "rooms",
  },
  {
    src: "/gallery/mini-suite.jpg",
    alt: "Mini Suite room",
    category: "rooms",
  },
  {
    src: "/gallery/delux.jpg",
    alt: "Delux room",
    category: "rooms",
  },
  {
    src: "/gallery/supdelux.jpg",
    alt: "Superior Delux room",
    category: "rooms",
  },
];

export function GalleryPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all" ? images : images.filter((i) => i.category === active);

  return (
    <main className="min-h-screen">
      <section
        ref={heroRef}
        className="relative h-[50vh] min-h-80 flex items-center justify-center"
      >
        <div className="absolute inset-0">
          <Image
            src="/gallery/runner.jpg"
            alt="Gallery hero"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Photo Gallery
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            A selection of moments and spaces from {siteConfig.name}
          </p>
        </motion.div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex rounded-full bg-sand p-1 overflow-auto">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-2 text-sm font-medium first:ml-0 last:mr-0 mr-2 rounded-full transition-colors whitespace-nowrap ${
                    active === cat ?
                      "bg-turquoise text-white"
                    : "bg-white text-foreground shadow-sm"
                  }`}
                >
                  {cat
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (match) => match.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((img) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl overflow-hidden bg-sand"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
