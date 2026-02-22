"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { getFeaturedTestimonials, getAverageRating } from "@/data/testimonials";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedHeading } from "@/components/ui/text-animations";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Testimonials() {
  const testimonials = getFeaturedTestimonials(6);
  const averageRating = getAverageRating();

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-ocean-deep text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <BlurFade>
            <span className="text-turquoise font-medium text-xs sm:text-sm uppercase tracking-wider">
              Testimonials
            </span>
          </BlurFade>
          <AnimatedHeading
            as="h2"
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 sm:mt-5 md:mt-6 mb-5 sm:mb-7 md:mb-8"
          >
            What Our Guests Say
          </AnimatedHeading>
          <BlurFade delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-sunset text-sunset" />
                ))}
              </div>
              <span className="text-white/80 text-sm sm:text-base md:text-lg">
                {averageRating} average from 500+ reviews
              </span>
            </div>
          </BlurFade>
        </div>

        {/* Testimonials Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <BlurFade delay={0.1 * index}>
                  <motion.div
                    whileHover={{
                      y: -8,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
                    }}
                    className="h-full p-6 sm:p-7 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all"
                  >
                    {/* Quote Icon */}
                    <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-turquoise/50 mb-5 sm:mb-6" />

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-5 sm:mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-sunset text-sunset"
                        />
                      ))}
                    </div>

                    {/* Title */}
                    <h4 className="font-serif text-base sm:text-lg md:text-xl font-semibold text-white mb-4 sm:mb-5">
                      &ldquo;{testimonial.title}&rdquo;
                    </h4>

                    {/* Content */}
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 sm:mb-7 md:mb-8 line-clamp-4">
                      {testimonial.content}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      {testimonial.avatar && (
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={44}
                          height={44}
                          className="rounded-full object-cover"
                          loading="lazy"
                        />
                      )}
                      <div>
                        <p className="font-medium text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-white/60 text-sm">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>

                    {/* Room Stayed */}
                    {testimonial.roomStayed && (
                      <p className="mt-4 pt-4 border-t border-white/10 text-turquoise text-sm">
                        Stayed in: {testimonial.roomStayed}
                      </p>
                    )}
                  </motion.div>
                </BlurFade>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-white/10 border-white/20 text-white hover:bg-white/20" />
          <CarouselNext className="hidden md:flex -right-12 bg-white/10 border-white/20 text-white hover:bg-white/20" />
        </Carousel>
      </div>
    </section>
  );
}
