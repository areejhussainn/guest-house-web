import { Metadata } from "next";
import { GalleryPage } from "./gallery-content";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Gallery | ${siteConfig.name}`,
  description: `Photo gallery for ${siteConfig.name} - moments from our guest house and island.`,
};

export default function Gallery() {
  return <GalleryPage />;
}
