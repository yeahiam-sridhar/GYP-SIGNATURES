import type { Metadata } from "next";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import { businessContact } from "@/data/business";

export const metadata: Metadata = {
  metadataBase: new URL("https://gypsignatures.com"),
  title: "GYP SIGNATURES | Interior Design & Furniture",
  description:
    "GYP SIGNATURES is a luxury interior design studio and bespoke furniture house offering complete spatial design, custom furniture, and refined home elements.",
  keywords: [
    "GYP SIGNATURES",
    "interior design studio",
    "luxury furniture",
    "bespoke furniture",
    "custom interiors",
    "home elements",
    "Srikalahasthi interior design",
    "Andhra Pradesh luxury interiors",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GYP SIGNATURES | Interior Design & Furniture",
    description:
      "GYP SIGNATURES is a luxury interior design studio and bespoke furniture house offering complete spatial design, custom furniture, and refined home elements.",
    url: "https://gypsignatures.com/",
    siteName: "GYP SIGNATURES",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/projects/villa.jpg",
        width: 1200,
        height: 630,
        alt: "GYP SIGNATURES — Luxury Interior Design and Bespoke Furniture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GYP SIGNATURES | Interior Design & Furniture",
    description:
      "GYP SIGNATURES is a luxury interior design studio and bespoke furniture house offering complete spatial design, custom furniture, and refined home elements.",
    images: ["/images/projects/villa.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://gypsignatures.com/#website",
      url: "https://gypsignatures.com/",
      name: "GYP SIGNATURES",
      description: "Luxury Interior Design & Bespoke Furniture Studio",
      publisher: {
        "@id": "https://gypsignatures.com/#organization",
      },
    },
    {
      "@type": ["Organization", "LocalBusiness", "FurnitureStore", "ProfessionalService"],
      "@id": "https://gypsignatures.com/#organization",
      name: "GYP SIGNATURES",
      legalName: businessContact.legalEntity,
      url: "https://gypsignatures.com/",
      logo: "https://gypsignatures.com/logo.png",
      image: "https://gypsignatures.com/images/projects/villa.jpg",
      description:
        "An integrated luxury interior studio and bespoke furniture house in Andhra Pradesh, uniting spatial architecture, artisanal woodworking, hand-selected materials, and bespoke home elements.",
      telephone: businessContact.phoneTel,
      email: businessContact.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: businessContact.address.city,
        addressRegion: businessContact.address.state,
        addressCountry: "IN",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "10:00",
          closes: "19:30",
        },
      ],
      founder: {
        "@type": "Person",
        name: businessContact.founder.name,
        jobTitle: businessContact.founder.title,
      },
      sameAs: [businessContact.instagram],
      priceRange: "$$$$",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Josefin+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ivory text-charcoal antialiased">
        {/* Thin bronze scroll progress line — 1px at top of viewport, desktop only */}
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}

