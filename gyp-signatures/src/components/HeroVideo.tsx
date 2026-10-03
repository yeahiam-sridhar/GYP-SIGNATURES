'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroOffer from './HeroOffer';

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

        {/* Signature Offer Announcement (Desktop lower-left, mobile above bottom action bar) */}
        <div className="absolute bottom-[64px] sm:bottom-10 lg:bottom-12 left-4 sm:left-8 lg:left-14 z-20 pointer-events-auto">
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
