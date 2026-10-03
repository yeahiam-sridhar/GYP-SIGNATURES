'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      });

      gsap.from('.pillar-card', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pillars-grid',
          start: 'top 80%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding section-spacing bg-ivory">
      <div className="max-w-7xl mx-auto">
        {/* Section Overline & Headline */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-overline text-bronze mb-4 block about-reveal tracking-[0.25em]">
            About GYP Signatures
          </span>
          <h2 className="heading-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal leading-[1.1] mb-6 about-reveal">
            A space should feel like yours.
          </h2>
          <p className="font-sans text-stone text-sm md:text-base font-light leading-relaxed max-w-2xl about-reveal">
            GYP SIGNATURES brings together interior spatial design, custom furniture crafting,
            architectural home elements, and bespoke finishing under one continuous design language.
            We eliminate the friction between architectural planning and detached retail furniture.
          </p>
        </div>

        {/* Editorial Split: Philosophy + Spatial Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 md:mb-28">
          <div className="lg:col-span-6 relative aspect-[4/5] overflow-hidden rounded-sm bg-sand/30 shadow-sm about-reveal">
            <Image
              src="/images/interiors/artwork-feature.jpg"
              alt="GYP Signatures curated interior space"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-ivory/90 backdrop-blur-md border border-sand/40 max-w-sm">
              <span className="text-[0.65rem] tracking-[0.2em] uppercase text-bronze font-medium block mb-1">
                The Signature Philosophy
              </span>
              <p className="font-sans text-xs text-charcoal/80 font-light leading-snug">
                Every line, material choice, and piece of joinery works in quiet dialogue with the architectural volume.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8 about-reveal">
            <div>
              <span className="text-overline text-stone/80 text-xs block mb-2">What We Are</span>
              <h3 className="heading-section text-xl md:text-2xl text-charcoal mb-4">
                An Integrated Design House
              </h3>
              <p className="text-stone text-sm font-light leading-relaxed">
                Rather than acting solely as decorators or isolated furniture sellers, GYP SIGNATURES
                functions as a unified interior and furniture studio based in Andhra Pradesh. We design
                the space, build the furniture pieces to measure, craft the doors and paneling, and curate
                every textile.
              </p>
            </div>

            <div className="pt-6 border-t border-sand/60">
              <span className="text-overline text-stone/80 text-xs block mb-2">What We Believe</span>
              <h3 className="heading-section text-xl md:text-2xl text-charcoal mb-4">
                Permanence Over Transience
              </h3>
              <p className="text-stone text-sm font-light leading-relaxed">
                We believe in genuine materials — solid American Walnut, natural Indian marbles, tactile linens,
                and patinated brass. A truly luxury home does not follow fleeting decor trends; it cultivates an
                atmosphere of serene endurance and tactile warmth.
              </p>
            </div>

            <div className="pt-6 border-t border-sand/60">
              <span className="text-overline text-stone/80 text-xs block mb-2">What Makes Us Different</span>
              <h3 className="heading-section text-xl md:text-2xl text-charcoal mb-4">
                The Complete-Space Approach
              </h3>
              <p className="text-stone text-sm font-light leading-relaxed">
                When you collaborate with GYP SIGNATURES, there is no dissonance between what an interior designer
                visualizes on paper and what furniture craftsmen deliver to your home. One vision guides the entire journey.
              </p>
            </div>
          </div>
        </div>

        {/* The 3 Core Pillars: DESIGN → FURNISH → COMPLETE */}
        <div className="pillars-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-12 border-t border-sand/70">
          {/* 01 DESIGN */}
          <div className="pillar-card p-8 bg-cream/70 border border-sand/60 hover:border-bronze/40 transition-colors duration-300">
            <span className="heading-display text-bronze text-3xl font-light mb-4 block">01</span>
            <span className="text-overline text-stone block mb-2">Pillar One</span>
            <h4 className="heading-section text-xl text-charcoal mb-3">DESIGN</h4>
            <p className="font-sans text-xs md:text-sm text-stone font-light leading-relaxed mb-4">
              Spatial layouts, architectural flow, lighting choreography, and material selection tailored to your lifestyle.
            </p>
            <ul className="space-y-1.5 text-xs text-stone/80 font-light">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-bronze" /> Space planning & blueprints
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-bronze" /> Concept visualization
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-bronze" /> Material & finish coordination
              </li>
            </ul>
          </div>

          {/* 02 FURNISH */}
          <div className="pillar-card p-8 bg-cream/70 border border-sand/60 hover:border-bronze/40 transition-colors duration-300">
            <span className="heading-display text-bronze text-3xl font-light mb-4 block">02</span>
            <span className="text-overline text-stone block mb-2">Pillar Two</span>
            <h4 className="heading-section text-xl text-charcoal mb-3">FURNISH</h4>
            <p className="font-sans text-xs md:text-sm text-stone font-light leading-relaxed mb-4">
              Signature loose furniture crafted with uncompromising joinery, tailored dimensions, and curated upholstery.
            </p>
            <ul className="space-y-1.5 text-xs text-stone/80 font-light">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-bronze" /> Bespoke seating & lounges
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-bronze" /> Solid wood dining & credenzas
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-bronze" /> Sanctuary bed frames & tables
              </li>
            </ul>
          </div>

          {/* 03 COMPLETE */}
          <div className="pillar-card p-8 bg-cream/70 border border-sand/60 hover:border-bronze/40 transition-colors duration-300">
            <span className="heading-display text-bronze text-3xl font-light mb-4 block">03</span>
            <span className="text-overline text-stone block mb-2">Pillar Three</span>
            <h4 className="heading-section text-xl text-charcoal mb-3">COMPLETE</h4>
            <p className="font-sans text-xs md:text-sm text-stone font-light leading-relaxed mb-4">
              The architectural elements and finishing touches that transform built rooms into deeply personal sanctuaries.
            </p>
            <ul className="space-y-1.5 text-xs text-stone/80 font-light">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-bronze" /> Doors, windows & wardrobes
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-bronze" /> Fluted wall panels & paint
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-bronze" /> Drapery, art & styling
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
