import { Metadata } from "next";
import { AboutPage } from "./about-content";

export const metadata: Metadata = {
  title: "About Us | Ras Grand Guest House",
  description: "Learn about Ras Grand Guest House - your home away from home in Rasdhoo, Maldives. Family-run hospitality with authentic island experiences.",
};

export default function About() {
  return <AboutPage />;
}
