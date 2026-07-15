import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KORIX — Création de sites internet",
    short_name: "KORIX",
    description: "Sites internet sur mesure, rapides et conçus pour développer votre activité.",
    start_url: "/",
    display: "standalone",
    background_color: "#020306",
    theme_color: "#0057ff",
    lang: "fr",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
