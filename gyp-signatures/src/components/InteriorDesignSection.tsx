'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { interiorServices } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

const spaces = [
  'Homes', 'Apartments', 'Villas', 'Bedrooms',
  'Living Rooms', 'Dining', 'Kitchens', 'Offices',
];

export default function InteriorDesignSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Hero image parallax
      gsap.to('.id-hero-img', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.id-hero',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Services grid stagger
      gsap.from('.id-service', {
        y: 20,
        opacity: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.id-services',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Space tags
      gsap.from('.id-space', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.04,
        duration: 0.4,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.id-spaces',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="interior-design" className="bg-ivory overflow-hidden">
      {/* Hero banner */}
      <div className="id-hero relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/images/projects/villa.jpg"
          alt="Complete interior design — villa living and dining space"
          fill
          priority
          sizes="100vw"
          className="id-hero-img object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 section-padding pb-12 md:pb-16">
          <span className="text-overline mb-3 block">Complete Interior Solutions</span>
          <h2 className="heading-editorial text-3xl md:text-4xl lg:text-5xl text-charcoal">
            Interior Design
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="section-padding py-16 md:py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Main text */}
          <div className="lg:col-span-2">
            <p className="text-body-lg text-charcoal mb-6 leading-relaxed">
              GYP Signatures approaches interior design as a complete discipline — connecting space planning, material selection, and furniture curation into one cohesive vision.
            </p>
            <p className="text-body text-stone mb-10">
              Every project begins with understanding how you live within your space and ends with a home that feels unmistakably yours.
            </p>

            {/* Spaces we design */}
            <div className="id-spaces flex flex-wrap gap-2 mb-10">
              {spaces.map((space) => (
                <span
                  key={space}
                  className="id-space text-[0.65rem] tracking-[0.1em] uppercase text-stone border border-sand px-3 py-1.5 font-light"
                >
                  {space}
                </span>
              ))}
            </div>

            <a href="#consultation" className="btn-primary">
              Start a Project
            </a>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-overline mb-8">What We Do</h3>
            <div className="id-services grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {interiorServices.map((service) => (
                <div
                  key={service.id}
                  className="id-service group py-3 border-b border-sand/60 cursor-pointer hover:border-bronze/40 transition-colors duration-300"
                >
                  <h4 className="text-sm font-normal tracking-[0.03em] text-charcoal mb-1 group-hover:text-bronze transition-colors duration-300">
                    {service.name}
                  </h4>
                  <p className="text-xs text-stone font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
