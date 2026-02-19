import { Metadata } from "next";
import { FacilitiesPage } from "./facilities-content";

export const metadata: Metadata = {
  title: "Facilities | Ras Grand Guest House",
  description:
    "Explore the facilities and amenities at Ras Grand Guest House in Rasdhoo, Maldives. Comfortable rooms, restaurant, tours, and more.",
};

export default function Facilities() {
  return <FacilitiesPage />;
}
