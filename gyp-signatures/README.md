# GYP SIGNATURES — Luxury Interiors & Bespoke Furniture

> **Design · Furnish · Complete**  
> A bespoke digital showroom and web platform engineered for **GYP SIGNATURES**, an artisanal interior architecture studio and luxury furniture house.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.7-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=flat-square&logo=greensock)](https://greensock.com/gsap/)
[![Turbopack](https://img.shields.io/badge/Bundler-Turbopack-orange?style=flat-square)](https://turbo.build/pack)

---

## 📌 About the Project

This is a real-world commercial client website custom designed and developed for **GYP SIGNATURES**, a premium interior design firm and luxury furniture manufacturer based in Srikalahasthi (Tirupati District, Andhra Pradesh, India).

Founded by **P. Gayathri (Founder & CEO)**, GYP SIGNATURES bridges the gap between disconnected interior planning and generic retail furniture. The studio delivers end-to-end living environments where spatial architecture, custom woodworking, hand-selected materials, and architectural home elements align under a singular design signature: **"Design → Furnish → Complete."**

The website serves as the brand's primary digital flagship, presenting its design philosophy, comprehensive furniture collections, completed projects, and customer consultation booking pipeline.

---

## 🎯 Project Goals

- **Elevated Digital Presence:** Establish an editorial, high-fashion digital identity matching the studio's ultra-premium physical craftsmanship.
- **Interactive Digital Showroom:** Allow homeowners, architects, and interior clients to experience furniture pieces, materials, and finished rooms in high fidelity.
- **Unified Services Presentation:** Clearly articulate the brand's three pillars: Full Interior Design, Bespoke Furniture Manufacturing, and Architectural Home Elements.
- **Frictionless Lead Conversion:** Drive qualified client inquiries through a multi-step consultation modal, direct studio telephone, and one-tap WhatsApp concierge integration.
- **Artisanal Storytelling:** Showcase the philosophy, materials, seven-stage design process, and founder narrative that distinguish the firm from standard contractors.

---

## ✨ Key Features

### 🎬 Cinematic Canvas Hero Scrub
- **Frame-by-Frame Scroll Scrubbing:** A high-performance canvas engine rendering a 192-frame sequence synchronized with GSAP ScrollTrigger for 60/120fps motion.
- **Zero-Latency Fallback:** Hardware-accelerated canvas with high-quality bicubic interpolation and an instant-paint fallback poster image.
- **Balanced Visual Hierarchy:** Two primary actions (**"Book a Consultation"** and **"Explore Our World"**) paired with an editorial, restrained **"WhatsApp Us →"** direct action pre-configured with client inquiry text.

### 🏛️ The "Three Worlds" Experience
- Interactive showcase framing the core methodology: **Interior Design**, **Furniture Creation**, and **Home Elements**.
- Cohesive visual cards featuring subtle hover parallax and editorial typography.

### 🛋️ Luxury Furniture Catalog
- Curated collection featuring bespoke sofas, sanctuary beds, dining tables, lounge chairs, and coffee tables.
- Category filtering with dimension specs, timber varieties, and upholstery details.

### 🏡 Curated Spaces & Rooms Gallery
- Room-by-room architectural walkthroughs: Living Rooms, Bedrooms, Dining Spaces, Chef Kitchens, and Executive Offices.
- High-resolution imagery highlighting ambient lighting, spatial planning, and material transitions.

### 🪵 Materials & Artisanal Craft Section
- Tactile material overview highlighting kiln-dried Burmese Teak, American Walnut, hand-forged bronze hardware, Italian Statuario marble, and textured bouclé textiles.

### 📐 7-Stage Architectural Design Process
- Step-by-step visual narrative guiding clients from initial blueprint review, 3D spatial visualization, and custom joinery to white-glove site delivery.

### ⏱️ Signature Editions & Dynamic Countdown
- Dynamic campaign showcase for limited seasonal commissions with a live countdown timer.

### 📝 Bespoke Consultation Modal Flow
- Multi-step client inquiry modal capturing project scope (Full Home, Single Room, Custom Furniture), budget tier, timeline, and preferred contact mode (WhatsApp, Phone, Email).
- Built with accessible focus trapping, keyboard navigation (`Escape` to close), and graceful GSAP entrance/exit animations.

### 💬 Direct WhatsApp Concierge
- Integrated WhatsApp communication link with pre-filled enquiry messaging (`+91 9393972660`) directly accessible in the hero, sticky navigation, and footer.

### 📍 Studio Experience Center
- Physical studio visiting details, appointment scheduling information, opening hours, and direct Google Maps navigation to the Srikalahasthi design studio.

### ❓ Interactive FAQ Accordion
- Categorized FAQ system covering services, custom sizing, delivery geography (Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, and pan-India), and studio visits.

### 📱 Contextual Mobile Action Bar
- Subtle sticky bottom bar tailored for mobile viewports providing instant Call, WhatsApp, and Consultation access without visual clutter.

---

## 🎨 Design & UX Architecture

- **Aesthetic Direction:** Editorial luxury inspired by high-end architectural monographs and European design journals. Clean, spacious, and deliberate.
- **Curated Color Palette:**
  - **Ivory (`#FAF8F5`)** & **Cream (`#F5F0EB`)**: Soft, warm architectural backgrounds.
  - **Charcoal (`#2A2A2A`)**: Deep contrast for typography and structure.
  - **Bronze (`#A0845C`)** & **Bronze Light (`#C4A97D`)**: Warm metallic accents representing hardware and craft.
  - **Walnut (`#6B4C3B`)** & **Sand (`#E8DFD5`)**: Grounded organic wood and textile tones.
- **Typography:**
  - **Headings:** `Cinzel` (Google Fonts) — Classical Roman proportions, letterspaced for understated architectural elegance.
  - **Body & Captions:** `Josefin Sans` (Google Fonts) — Clean humanist geometry offering legibility and modern luxury cadence.
- **Micro-interactions:** Restrained hover underlines, subtle scale transitions, and smooth accordion reveals engineered with performance in mind.
- **Accessibility:** Full respect for `prefers-reduced-motion` media queries, high-contrast text overlays, and ARIA labels on all interactive touchpoints.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16.3.7** | Core App Router framework, SSR, and static site generation |
| **React 19.2.8** | Component architecture, state management, and modern hooks |
| **TypeScript 5.0** | Strict type safety, clean interfaces, and data modeling |
| **Tailwind CSS v4** | CSS design tokens (`@theme`), responsive grid utilities, and zero-runtime CSS |
| **GSAP 3.15 + ScrollTrigger** | High-performance timeline animations and scroll-synchronized canvas scrubbing |
| **HTML5 Canvas 2D** | Hardware-accelerated image frame playback for the hero experience |
| **Turbopack** | Next-generation bundler for instantaneous local compilation and fast builds |

---

## 👨‍💻 Development & Engineering Role

As the developer responsible for designing and developing this website for **GYP SIGNATURES**, my contributions included:

1. **End-to-End Design & Visual Translation:** Translating the client's physical brand standards, luxury positioning, and showroom identity into an interactive web experience.
2. **High-Performance Canvas Engineering:** Developing the frame-by-frame canvas scroll system in `HeroVideo.tsx` to handle 192 high-res frames smoothly without memory leaks or frame drops.
3. **Component Architecture:** Structuring reusable, modular React components across 20+ specialized sections with clean data separation in `src/data/`.
4. **Responsive Implementation:** Ensuring consistent typographic hierarchy and proportional spacing across mobile, tablet, and ultra-wide viewports.
5. **Inquiry & Conversion Funnel:** Building accessible modal workflows and direct messaging endpoints (WhatsApp, Tel, Email) to maximize qualified client consultations.

---

## ✅ Project Validation

The codebase is verified and production-ready:

- **TypeScript Compilation:** Passed with zero errors (`npx tsc --noEmit` exit code `0`).
- **Production Build:** Successfully compiled and pre-rendered with Turbopack (`npm run build` exit code `0`).
- **Clean Architecture:** Zero unused dependencies; `.gitignore` configured to prevent committing environment secrets, cache files, and build outputs.

```bash
# Verify TypeScript
npx tsc --noEmit

# Run production build
npm run build
```

---

## 📸 Project Screenshots

<!-- Add project screenshots here -->

---

## 🌐 Live Website

- **Status:** `Live Website: Coming Soon`

---

## 🔗 GitHub Repository

- **Repository:** [https://github.com/yeahiam-sridhar/GYP-SIGNATURES](https://github.com/yeahiam-sridhar/GYP-SIGNATURES)

---

## 👤 Developer

- **Developer:** **Sridhar**  
- **Role:** Website Designer & Full-Stack Frontend Developer

---

## 📜 Client Project Note

> **Client Engagement Note:**  
> This project was commissioned, designed, and developed specifically for **GYP SIGNATURES** as a production customer website. All brand marks, product designs, and studio narratives belong to GYP SIGNATURES.
