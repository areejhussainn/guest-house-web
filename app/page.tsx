import { Hero } from "@/components/home/hero";
import { AboutPreview } from "@/components/home/about-preview";
import { RoomsPreview } from "@/components/home/rooms-preview";
import { Testimonials } from "@/components/home/testimonials";
import { FacilitiesPreview } from "@/components/home/facilities-preview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <RoomsPreview />
      <FacilitiesPreview />
      <Testimonials />
    </>
  );
}
