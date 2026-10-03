# GYP SIGNATURES

Premium interior design and furniture website.

> **DESIGN → FURNISH → COMPLETE**  
> A bespoke digital showroom and web platform engineered for **GYP SIGNATURES**, an artisanal interior architecture studio and luxury furniture house.

---

## About

**GYP SIGNATURES** is a premium interior design firm and luxury furniture manufacturer dedicated to creating cohesive, high-end living spaces. The brand is built around a singular, integrated philosophy:

$$\text{DESIGN} \longrightarrow \text{FURNISH} \longrightarrow \text{COMPLETE}$$

Rather than treating interior planning and furniture procurement as separate, piecemeal tasks, GYP SIGNATURES unites spatial architecture, artisanal woodworking, hand-selected materials, and architectural home elements into one unified signature experience.

The website serves as the brand's digital showroom, presenting its design ethos, bespoke furniture collections, completed architectural spaces, and direct client consultation pipeline.

---

## Features

- **Premium Luxury UI:** Editorial, architectural aesthetic crafted with bespoke ivory, charcoal, bronze, and warm organic wood tones.
- **Cinematic Canvas Scroll:** High-performance HTML5 Canvas rendering a 192-frame sequence scrubbed seamlessly with GSAP ScrollTrigger.
- **Smooth Animations & Micro-Interactions:** Hardware-accelerated transitions, subtle hover translates, and smooth reveals that enhance engagement without visual clutter.
- **GSAP Animations:** Timeline-driven animations powering section reveals, interactive cards, and modal states.
- **Scroll-Triggered Interactions:** Progressive scroll triggers synchronized across text reveals, image zooms, and section headers.
- **Interior Design Showcase:** Detailed portfolio of complete spaces—from luxury villas to contemporary apartments and executive suites.
- **Curated Furniture Showcase:** Bespoke furniture catalog (sofas, beds, dining tables, lounge chairs, coffee tables) with detailed specifications.
- **Artisanal Materials Section:** In-depth presentation of natural teak, American walnut, Italian Statuario marble, hand-forged bronze, and bouclé fabrics.
- **7-Step Design Process:** Transparent visual walkthrough of the client journey from initial concept to white-glove site delivery.
- **Customer Reviews & Testimonials:** Real client stories and feedback from completed residential and commercial projects.
- **Interactive Consultation Modal:** Accessible, multi-step enquiry form capturing project scope, budget tier, timeline, and preferred contact mode.
- **WhatsApp Contact Integration:** Direct one-tap WhatsApp concierge (`+91 9393972660`) with pre-filled enquiry messaging integrated into the hero, navigation, and floating contact bar.
- **Responsive Mobile Navigation:** Refined hamburger drawer with smooth slide-in navigation and quick contact triggers.
- **Contextual Sticky Contact Bar:** Mobile-optimized bottom action bar providing instant access to Call, WhatsApp, and Consultation booking.
- **Fully Responsive Layouts:** Proportional scaling and typography optimized for mobile, tablet, laptop, and ultra-wide displays.

---

## Tech Stack

The project is built with modern, production-grade web technologies:

- **Next.js** (v16.3.7) — Core React framework with App Router, Turbopack, SSR, and static page pre-rendering
- **React** (v19.2.8) — Component architecture, state management, and modern hooks
- **TypeScript** (v5.0) — Strict type checking, type safety, and clean data modeling
- **Tailwind CSS** (v4.0) — Modern CSS utility framework and theme token configuration
- **GSAP & ScrollTrigger** (v3.15) — Industry-standard animation library for scroll-driven scrub and timeline orchestration
- **HTML5 Canvas 2D** — Hardware-accelerated image frame playback for the hero video sequence
- **CSS3 / Vanilla CSS** — Custom editorial typography, luxury scrollbars, and keyframe animations
- **HTML5** — Semantic, accessible document structure

---

## Installation

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yeahiam-sridhar/GYP-SIGNATURES.git
   cd GYP-SIGNATURES/gyp-signatures
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**  
   Navigate to [http://localhost:3000](http://localhost:3000) to view the live website.

---

## Build & Production

To create an optimized production build:

```bash
# Verify TypeScript
npx tsc --noEmit

# Compile production bundle
npm run build

# Start production server
npm start
```

---

## Project Structure

```text
gyp-signatures/
├── public/                 # Static assets (images, frames, video, icons)
│   ├── frames/             # 192 canvas animation frames
│   ├── images/             # Product, room, and brand photography
│   └── video/              # Hero video and poster
├── src/
│   ├── app/                # Next.js App Router (layout, page, globals.css)
│   ├── components/         # Modular UI & animation components
│   └── data/               # Centralized content, products, reviews, and business data
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.mjs      # Tailwind CSS PostCSS plugin
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

---

## Contact & Client Details

- **Client:** GYP SIGNATURES
- **Founder & CEO:** P. Gayathri
- **Location:** Srikalahasthi, Tirupati District, Andhra Pradesh, India
- **Email:** gypsignatures@gmail.com
- **Phone:** +91 93939 72660
- **WhatsApp:** [+91 93939 72660](https://wa.me/919393972660)
- **Instagram:** [@gyp_signatures](https://www.instagram.com/gyp_signatures/)
