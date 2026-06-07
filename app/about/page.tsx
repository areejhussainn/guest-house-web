import { Metadata } from "next";
import { AboutPage } from "./about-content";

export const metadata: Metadata = {
  title: "About Us | Rasgrand Guest House",
  description: "Learn about Rasgrand Guest House - your home away from home in Rasdhoo, Maldives. Family-run hospitality with authentic island experiences.",
};

export default function About() {
  return <AboutPage />;
}
