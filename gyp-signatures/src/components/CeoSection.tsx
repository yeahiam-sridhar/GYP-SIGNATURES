'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CeoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reveals = section.querySelectorAll<HTMLElement>('.ceo-reveal');
    if (reveals.length === 0) return;

    const isDirectHash = typeof window !== 'undefined' && window.location.hash === '#ceo';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const rect = section.getBoundingClientRect();
    const isAlreadyVisible = rect.top < window.innerHeight;

    if (isDirectHash || prefersReducedMotion || isAlreadyVisible) {
      gsap.set(reveals, { opacity: 1, y: 0, clearProps: 'all' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        reveals,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.set(reveals, { opacity: 1, y: 0, clearProps: 'all' });
            },
          },
        }
      );
    }, section);

    const failsafe = setTimeout(() => {
      gsap.set(reveals, { opacity: 1, y: 0, clearProps: 'all' });
    }, 500);

    const handleHash = () => {
      if (window.location.hash === '#ceo') {
        gsap.set(reveals, { opacity: 1, y: 0, clearProps: 'all' });
      }
    };
    window.addEventListener('hashchange', handleHash);

    return () => {
      clearTimeout(failsafe);
      window.removeEventListener('hashchange', handleHash);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ceo"
      className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24 bg-[#F9F7F2] border-b border-sand/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Eyebrow Label */}
        <div className="mb-10 sm:mb-14 lg:mb-16 ceo-reveal">
          <span className="text-[0.68rem] sm:text-xs tracking-[0.28em] uppercase text-bronze font-medium block">
            Leadership at GYP Signatures
          </span>
        </div>

        {/* Editorial Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column: Identity & Role */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-start min-w-0 order-2 lg:order-1">
            {/* Identity */}
            <div className="ceo-reveal">
              <h2 className="heading-editorial text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-charcoal leading-[1.08] font-normal tracking-wide">
                Praneetha P
              </h2>
              <div className="mt-2.5 sm:mt-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="text-xs sm:text-sm tracking-[0.18em] uppercase text-charcoal/85 font-medium">
                  Chief Executive Officer
                </span>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-bronze/60" />
                <span className="text-xs tracking-wider text-stone font-light">
                  GYP Signatures
                </span>
              </div>
            </div>

            {/* Accent Quote */}
            <div className="ceo-reveal my-8 sm:my-10 pl-5 sm:pl-7 border-l-2 border-bronze/70">
              <p className="font-[family-name:Georgia,serif] italic text-base sm:text-lg lg:text-[1.28rem] leading-[1.65] text-charcoal/90 font-normal">
                Guiding GYP Signatures with strategic vision, operational excellence,
                and an unwavering commitment to the studio&rsquo;s founding principles.
              </p>
            </div>

            {/* Role description */}
            <div className="ceo-reveal space-y-5 text-sm sm:text-base text-charcoal/85 font-light leading-[1.8] max-w-[620px]">
              <p className="tracking-wide">
                As Chief Executive Officer of GYP Signatures, Praneetha P leads the studio&rsquo;s
                strategic direction, client relationships, and day-to-day operations — ensuring
                that every project delivered reflects the standard of integrity and craftsmanship
                upon which the brand was founded.
              </p>
            </div>

            {/* Decorative footer rule */}
            <div className="ceo-reveal pt-8 sm:pt-10 mt-10 sm:mt-12 border-t border-sand/70 max-w-[560px] pb-12 sm:pb-0">
              <div className="flex items-center gap-4">
                <span className="w-8 h-[1px] bg-bronze" />
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-bronze font-medium">
                  Vision &middot; Leadership &middot; Craft
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Portrait */}
          <div className="lg:col-span-5 xl:col-span-5 ceo-reveal min-w-0 order-1 lg:order-2">
            <div className="relative aspect-[4/5] w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none overflow-hidden isolate rounded-[2px] bg-sand/20 shadow-[0_12px_32px_rgba(0,0,0,0.04)]">
              <Image
                src="/images/ceo.png"
                alt="Praneetha P, Chief Executive Officer of GYP Signatures"
                fill
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.02]"
              />
            </div>
            <figcaption className="mt-3.5 flex items-center justify-between text-[0.65rem] sm:text-[0.68rem] tracking-[0.2em] uppercase text-stone/80 font-light max-w-sm sm:max-w-md mx-auto lg:max-w-none">
              <span>Praneetha P</span>
              <span>CEO</span>
            </figcaption>
          </div>
        </div>
      </div>
    </section>
  );
}
