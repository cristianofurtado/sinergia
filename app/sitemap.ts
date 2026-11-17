import type { MetadataRoute } from "next";
import { SITE_INFO } from "@/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_INFO.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_INFO.url}/sobre`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_INFO.url}/contato`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_INFO.url}/privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];
}
