import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date();

  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/facilities", priority: 0.8 },
    { path: "/gallery", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
