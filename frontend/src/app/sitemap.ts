import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/mentions-legales", "/politique-confidentialite"];
  return [
    ...pages.map((path) => ({ url: `${siteConfig.url}${path}`, changeFrequency: "monthly" as const, priority: path ? 0.4 : 1 })),
    ...projects.map((project) => ({
      url: `${siteConfig.url}/realisations/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
