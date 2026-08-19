import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@/app/globals.css";
import { ConsentManager } from "@/components/ConsentManager";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "KORIX — Création de sites internet sur mesure",
    template: "%s — KORIX",
  },
  description: siteConfig.description,
  applicationName: "KORIX",
  category: "business",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "KORIX",
    title: "KORIX — Des sites internet conçus pour développer votre activité",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "KORIX — Création de sites internet sur mesure",
    description: siteConfig.description,
  },
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020306",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <a className="skip-link" href="#main-content">Aller au contenu</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ConsentManager />
      </body>
    </html>
  );
}
