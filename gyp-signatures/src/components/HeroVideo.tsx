'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroOffer from './HeroOffer';
import { businessContact } from '@/data/business';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 192;
const getFrameSrc = (index: number) =>
  `/frames/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;

export default function HeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    // Fast opaque 2D rendering context
    const ctx2d = canvas.getContext('2d', { alpha: false });
    if (!ctx2d) return;

    // Enable high-quality bicubic interpolation for scaled frames
    ctx2d.imageSmoothingEnabled = true;
    ctx2d.imageSmoothingQuality = 'high';

    // Cache preloaded images
    const images: HTMLImageElement[] = [];
    let lastRenderedIndex = 0;

    const renderImage = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      const iw = img.naturalWidth || 1920;
      const ih = img.naturalHeight || 1080;

      // Object-fit: cover calculation
      const scale = Math.max(cw / iw, ch / ih);
      const w = iw * scale;
      const h = ih * scale;
      const x = (cw - w) / 2;
      const y = (ch - h) / 2;

      ctx2d.drawImage(img, x, y, w, h);
    };

    const renderFrame = (index: number) => {
      const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, index));
      const targetImg = images[clamped];
      if (targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
        lastRenderedIndex = clamped;
        renderImage(targetImg);
      } else if (images[lastRenderedIndex] && images[lastRenderedIndex].complete) {
        renderImage(images[lastRenderedIndex]);
      }
    };

    // Update canvas internal buffer size according to viewport and DPR
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const newWidth = Math.round(rect.width * dpr);
      const newHeight = Math.round(rect.height * dpr);

      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth;
        canvas.height = newHeight;
      }

      // Re-apply high quality smoothing settings after canvas dimension updates
      ctx2d.imageSmoothingEnabled = true;
      ctx2d.imageSmoothingQuality = 'high';
    };

    updateCanvasSize();

    // Immediately load and render the first frame (poster)
    const initialImg = new Image();
    initialImg.src = getFrameSrc(0);
    initialImg.onload = () => {
      images[0] = initialImg;
      renderImage(initialImg);
    };
    if (initialImg.complete && initialImg.naturalWidth > 0) {
      images[0] = initialImg;
      renderImage(initialImg);
    }

    // Preload remaining frames in background with async decode
    for (let i = 0; i < FRAME_COUNT; i++) {
      if (i === 0 && images[0]) continue;
      const img = new Image();
      img.src = getFrameSrc(i);
      if (img.decode) {
        img.decode().catch(() => { });
      }
      images[i] = img;
    }

    const handleResize = () => {
      updateCanvasSize();
      renderFrame(lastRenderedIndex);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    // Scope GSAP animations strictly to this section
    const ctx = gsap.context(() => {
      // Timeline scrubbed by scroll
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300%',
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const frameIndex = Math.round(self.progress * (FRAME_COUNT - 1));
            renderFrame(frameIndex);
          },
        },
      });

      // Fade overlay text out as user scrolls
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          y: -40,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=50%',
            scrub: true,
          },
        });
      }
    }, section);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-charcoal">
      {/* Fallback poster image underneath canvas for instant zero-latency paint */}
      <img
        src="/video/hero-poster.jpg"
        alt="GYP Signatures"
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
      />

      {/* Hardware-accelerated canvas for 60/120fps frame scrub */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}
      />

      {/* Multi-layered gradient overlays for text readability over bright/dark angel artwork */}
      <div className="absolute inset-0 bg-charcoal/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-charcoal/65 via-charcoal/25 to-transparent pointer-events-none" />

      {/* Hero content */}
      <div ref={overlayRef} className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6">
        {/* Brand name */}
        <h1 className="heading-display text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-8 md:mb-12 drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)] [text-shadow:_0_2px_14px_rgba(0,0,0,0.7)]">
          GYP Signatures
        </h1>

        {/* Tagline words */}
        <div className="flex items-center gap-4 md:gap-8 mb-4 sm:mb-8 md:mb-12 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          <span className="text-overline text-ivory text-[0.65rem] md:text-xs">Design</span>
          <span className="w-8 h-[1px] bg-bronze-light shadow-sm" />
          <span className="text-overline text-ivory text-[0.65rem] md:text-xs">Furnish</span>
          <span className="w-8 h-[1px] bg-bronze-light shadow-sm" />
          <span className="text-overline text-ivory text-[0.65rem] md:text-xs">Complete</span>
        </div>

        {/* Supporting text */}
        <p className="text-ivory/90 font-light text-xs sm:text-base max-w-xl leading-relaxed tracking-wide mb-6 sm:mb-10 md:mb-14 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          A complete approach to interiors, furniture and the elements that make a space yours.
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3.5 sm:gap-4.5">
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4">
            <a href="#consultation" className="btn-secondary shadow-md text-xs sm:text-sm py-2.5 sm:py-3.5 px-6 sm:px-8">
              Book a Consultation
            </a>
            <a
              href="#introduction"
              className="btn-primary border-ivory/60 text-ivory bg-charcoal/30 backdrop-blur-sm hover:bg-ivory hover:text-charcoal shadow-md text-xs sm:text-sm py-2.5 sm:py-3.5 px-6 sm:px-8"
            >
              Explore Our World
            </a>
          </div>

          {/* Tertiary Refined WhatsApp Action */}
          <a
            href={businessContact.whatsappHeroUrl || businessContact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with GYP SIGNATURES on WhatsApp"
            className="group inline-flex items-center gap-2.5 text-ivory/80 hover:text-ivory py-1.5 px-3 text-[0.68rem] sm:text-xs tracking-[0.22em] uppercase font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze-light"
          >
            {/* Restrained bronze WhatsApp glyph */}
            <svg
              className="w-3.5 h-3.5 text-bronze-light transition-transform duration-300 group-hover:scale-110 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.06-1.503-.306-.987-.417-1.748-1.178-2.316-1.928-.277-.367-.626-.957-.626-1.564 0-.616.321-.918.435-1.037.114-.12.249-.149.333-.149.083 0 .166.002.239.006.077.004.18.016.275.244.1.238.341.832.371.893.03.062.05.134.009.215-.04.08-.06.13-.12.2-.06.07-.126.155-.18.208-.06.06-.123.125-.053.245.07.119.312.514.67.832.46.409.849.536.969.596.119.06.189.05.259-.03.07-.08.3-.35.38-.47.08-.12.16-.1.27-.06.11.04.7.33.82.39.12.06.2.09.23.14.03.05.03.5-.114.905z" />
            </svg>
            <span className="relative">
              WhatsApp Us
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-bronze-light transition-all duration-300 ease-out group-hover:w-full" />
            </span>
            <span
              className="text-bronze-light transition-transform duration-300 ease-out group-hover:translate-x-1.5"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </div>

        {/* Signature Offer Announcement (Desktop lower-left, mobile above bottom action bar) */}
        <div className="absolute bottom-[64px] sm:bottom-10 lg:bottom-12 left-4 sm:left-8 lg:left-14 right-4 sm:right-auto max-w-[285px] z-20 pointer-events-auto">
          <HeroOffer />
        </div>

        {/* Scroll indicator */}
        <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-75 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] pointer-events-none">
          <span className="text-ivory/70 text-[0.6rem] tracking-[0.2em] uppercase font-light">
            Scroll to explore
          </span>
          <div className="w-[1px] h-8 bg-ivory/40 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
