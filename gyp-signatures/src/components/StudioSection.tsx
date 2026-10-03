'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { businessContact } from '@/data/business';

gsap.registerPlugin(ScrollTrigger);

export default function StudioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { address, openingHours, mapsUrl } = businessContact;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.studio-reveal', {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="studio" className="section-padding section-spacing bg-cream border-t border-sand/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20">
          <div>
            <span className="text-overline text-bronze mb-3 block tracking-[0.25em] studio-reveal">
              Physical Experience & Studio
            </span>
            <h2 className="heading-editorial text-3xl sm:text-4xl md:text-5xl text-charcoal studio-reveal">
              Visit GYP Signatures
            </h2>
          </div>
          <p className="font-sans text-stone text-sm max-w-md mt-4 md:mt-0 font-light leading-relaxed studio-reveal">
            Immerse yourself in our spatial atmosphere. Touch timber grains, examine marble veining,
            test seating ergonomics, and review your floor plans with our interior design team.
          </p>
        </div>

        {/* Main Grid: Visuals + Verified Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Studio Imagery Showcase */}
          <div className="lg:col-span-7 studio-reveal min-w-0">
            <div className="relative w-full max-w-full aspect-[16/10] lg:h-full lg:min-h-[380px] overflow-hidden rounded-sm bg-sand/30 shadow-md">
              <Image
                src="/images/materials/materials-overview.jpg"
                alt="GYP Signatures Design Studio & Materials Gallery"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
              
              {/* Studio Highlights Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap gap-2 sm:gap-4 text-ivory max-w-full">
                <div className="bg-charcoal/80 backdrop-blur-md px-3 sm:px-4 py-2 border border-ivory/10">
                  <span className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-widest text-bronze-light block">Experience</span>
                  <span className="text-[0.7rem] sm:text-xs font-light">Tactile Materials & Timber Joinery</span>
                </div>
                <div className="bg-charcoal/80 backdrop-blur-md px-3 sm:px-4 py-2 border border-ivory/10">
                  <span className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-widest text-bronze-light block">Consultation</span>
                  <span className="text-[0.7rem] sm:text-xs font-light">Architectural Space Planning</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Access Information Card */}
          <div className="lg:col-span-5 studio-reveal min-w-0 flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-ivory border border-sand/70 rounded-sm shadow-sm">
            <div className="space-y-8">
              {/* Location */}
              <div>
                <span className="text-overline text-bronze text-xs block mb-2 tracking-[0.2em]">
                  Studio Location
                </span>
                <h3 className="heading-display text-xl text-charcoal mb-2">
                  {address.city}
                </h3>
                <p className="font-sans text-sm text-stone font-light leading-relaxed">
                  {address.district}, {address.state}<br />
                  {address.country}
                </p>
                <p className="font-sans text-xs text-stone/70 font-light mt-1">
                  Located in the historic temple city of Srikalahasthi, accessible from Tirupati, Chennai, and Bangalore.
                </p>
              </div>

              {/* Hours */}
              <div className="pt-6 border-t border-sand/60">
                <span className="text-overline text-bronze text-xs block mb-2 tracking-[0.2em]">
                  Studio Hours
                </span>
                <p className="font-sans text-sm text-charcoal font-medium">
                  {openingHours.weekdays}
                </p>
                <p className="font-sans text-xs text-stone font-light mt-1">
                  Sundays: {openingHours.sunday}
                </p>
                <p className="text-[0.65rem] text-stone/70 italic mt-1.5 font-light">
                  {openingHours.note}
                </p>
              </div>

              {/* Verified Contact */}
              <div className="pt-6 border-t border-sand/60">
                <span className="text-overline text-bronze text-xs block mb-2 tracking-[0.2em]">
                  Direct Inquiries
                </span>
                <a
                  href={`tel:${businessContact.phoneTel}`}
                  className="font-sans text-sm text-charcoal hover:text-bronze transition-colors duration-300 font-medium block"
                >
                  {businessContact.phoneDisplay}
                </a>
                <a
                  href={`mailto:${businessContact.email}`}
                  className="font-sans text-xs text-stone hover:text-bronze transition-colors duration-300 font-light block mt-1"
                >
                  {businessContact.email}
                </a>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-8 mt-6 border-t border-sand/60 flex flex-col sm:flex-row gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center text-xs py-3 tracking-[0.15em] flex-1"
              >
                View on Google Maps →
              </a>
              <a
                href="#consultation"
                className="btn-secondary text-center text-xs py-3 tracking-[0.15em] flex-1"
              >
                Book Studio Visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
