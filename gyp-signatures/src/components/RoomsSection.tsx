'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { rooms } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function RoomsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.room-card');
      cards.forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="rooms" className="section-padding section-spacing-sm bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-16">
          <span className="text-overline mb-4 block">Browse by Space</span>
          <h2 className="heading-editorial text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
            Curated Spaces
          </h2>
          <p className="text-body text-stone max-w-lg">
            Think in rooms, not just products. Each space connects interior design, furniture, and home elements into one cohesive experience.
          </p>
        </div>

        {/* Rooms grid — asymmetric editorial layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {rooms.map((room, i) => {
            // Asymmetric grid positions
            const spans = [
              'md:col-span-7 aspect-[16/10]',
              'md:col-span-5 aspect-[4/5]',
              'md:col-span-4 aspect-square',
              'md:col-span-4 aspect-square',
              'md:col-span-4 aspect-square',
            ];
            return (
              <div
                key={room.id}
                className={`room-card group relative overflow-hidden cursor-pointer ${spans[i] || 'md:col-span-4 aspect-square'}`}
              >
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                  <h3 className="heading-section text-base md:text-lg text-ivory mb-1">
                    {room.name}
                  </h3>
                  <p className="text-xs text-ivory/60 font-light tracking-wide">
                    {room.description}
                  </p>
                </div>

                {/* Hover border */}
                <div className="absolute inset-0 border border-ivory/0 group-hover:border-ivory/20 transition-colors duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
