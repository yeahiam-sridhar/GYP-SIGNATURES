'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { businessContact } from '@/data/business';

gsap.registerPlugin(ScrollTrigger);

export default function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { founder } = businessContact;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reveals = section.querySelectorAll<HTMLElement>('.founder-reveal');
    if (reveals.length === 0) return;

    // Progressive enhancement: Content is ALWAYS visible by default.
    // If user arrived via direct anchor (#founder) or prefers reduced motion,
    // do NOT hide or animate from zero; keep it immediately visible.
    const isDirectHash = typeof window !== 'undefined' && window.location.hash === '#founder';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check if the section is already within or past the viewport on initial mount
    const rect = section.getBoundingClientRect();
    const isAlreadyVisible = rect.top < window.innerHeight;

    if (isDirectHash || prefersReducedMotion || isAlreadyVisible) {
      // Ensure all elements are immediately visible and clear any lingering transform/opacity
      gsap.set(reveals, { opacity: 1, y: 0, clearProps: 'all' });
      return;
    }

    // Only if section is well below the viewport, run a gentle progressive reveal
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

    // Failsafe timer: after 500ms, ensure elements NEVER stay hidden under any circumstance
    const failsafe = setTimeout(() => {
      gsap.set(reveals, { opacity: 1, y: 0, clearProps: 'all' });
    }, 500);

    // Listen for hash changes to #founder
    const handleHash = () => {
      if (window.location.hash === '#founder') {
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
      id="founder"
      className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24 bg-[#F9F7F2] border-t border-b border-sand/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Eyebrow Label */}
        <div className="mb-10 sm:mb-14 lg:mb-16 founder-reveal">
          <span className="text-[0.68rem] sm:text-xs tracking-[0.28em] uppercase text-bronze font-medium block">
            The Person Behind GYP Signatures
          </span>
        </div>

        {/* Editorial Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 xl:col-span-5 founder-reveal min-w-0">
            <div className="relative aspect-[4/5] w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none overflow-hidden isolate rounded-[2px] bg-sand/20 shadow-[0_12px_32px_rgba(0,0,0,0.04)]">
              <Image
                src={founder.image}
                alt={`${founder.name}, ${founder.title} of ${businessContact.brandName}`}
                fill
                sizes="(max-width: 1024px) 90vw, 42vw"
                priority
                className="object-cover scale-[1.32] origin-[50%_40%] transition-transform duration-700 ease-out hover:scale-[1.35]"
              />
            </div>
            <figcaption className="mt-3.5 flex items-center justify-between text-[0.65rem] sm:text-[0.68rem] tracking-[0.2em] uppercase text-stone/80 font-light max-w-sm sm:max-w-md mx-auto lg:max-w-none">
              <span>{founder.name}</span>
              <span>{founder.title}</span>
            </figcaption>
          </div>

          {/* Right Column: Identity, Belief Quote, Narrative & Studio */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-start min-w-0">
            {/* Identity */}
            <div className="founder-reveal">
              <h2 className="heading-editorial text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-charcoal leading-[1.08] font-normal tracking-wide">
                {founder.name}
              </h2>
              <div className="mt-2.5 sm:mt-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="text-xs sm:text-sm tracking-[0.18em] uppercase text-charcoal/85 font-medium">
                  {founder.title}
                </span>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-bronze/60" />
                <span className="text-xs tracking-wider text-stone font-light">
                  {businessContact.address.district}, {businessContact.address.state}
                </span>
              </div>
            </div>

            {/* Belief Quote */}
            <div className="founder-reveal my-8 sm:my-10 pl-5 sm:pl-7 border-l-2 border-bronze/70">
              <blockquote className="font-[family-name:Georgia,serif] italic text-base sm:text-lg lg:text-[1.28rem] leading-[1.65] text-charcoal/90 font-normal">
                &ldquo;{founder.statement}&rdquo;
              </blockquote>
            </div>

            {/* Narrative Paragraphs */}
            <div className="founder-reveal space-y-5 text-sm sm:text-base text-charcoal/85 font-light leading-[1.8] max-w-[620px]">
              {founder.bio.map((paragraph, index) => (
                <p key={index} className="tracking-wide">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Studio Metadata & CTA */}
            <div className="founder-reveal pt-8 sm:pt-10 mt-10 sm:mt-12 border-t border-sand/70 max-w-[560px] pb-12 sm:pb-0">
              <div className="mb-6">
                <span className="text-[0.65rem] tracking-[0.25em] uppercase text-bronze font-medium block mb-1">
                  Studio
                </span>
                <p className="font-serif text-base text-charcoal font-medium">
                  {businessContact.address.city}
                </p>
                <p className="text-xs text-stone font-light tracking-wide mt-0.5">
                  {businessContact.address.district}, {businessContact.address.state}, India
                </p>
              </div>

              <div>
                <a
                  href="#consultation"
                  className="inline-flex items-center gap-3 px-7 py-3.5 border border-charcoal/40 hover:border-bronze hover:text-bronze text-charcoal text-xs tracking-[0.2em] uppercase font-light transition-all duration-300 group"
                  aria-label="Discuss your space with GYP Signatures studio"
                >
                  <span>Discuss Your Space</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
