import type { Metadata } from "next";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "GYP SIGNATURES — Design · Furnish · Complete",
  description:
    "A complete approach to interiors, furniture and the elements that make a space yours. GYP SIGNATURES connects interior design, furniture, home elements and custom work into one signature experience.",
  keywords: [
    "interior design",
    "luxury furniture",
    "home elements",
    "custom furniture",
    "bespoke interiors",
  ],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
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
      </head>
      <body className="bg-ivory text-charcoal antialiased">
        {/* Thin bronze scroll progress line — 1px at top of viewport, desktop only */}
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}

