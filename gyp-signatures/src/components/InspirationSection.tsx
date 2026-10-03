'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { businessContact } from '@/data/business';

gsap.registerPlugin(ScrollTrigger);

export default function InspirationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { inspiration } = businessContact;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.inspiration-image-wrap', {
        scale: 0.96,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      });

      gsap.from('.inspiration-text-block', {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
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
    <section ref={sectionRef} id="inspiration" className="section-padding section-spacing bg-ivory">
      <div className="max-w-7xl mx-auto">
        {/* Subtle Decorative Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-overline text-bronze mb-3 block tracking-[0.25em] inspiration-text-block">
            {inspiration.title}
          </span>
          <h2 className="heading-editorial text-2xl sm:text-3xl md:text-4xl text-charcoal leading-tight inspiration-text-block">
            {inspiration.subtitle}
          </h2>
          <div className="w-12 h-[1px] bg-bronze/50 mx-auto mt-6 inspiration-text-block" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
          {/* Portrait Column */}
          <div className="lg:col-span-5">
            <div className="inspiration-image-wrap relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-sand/30 shadow-md">
                <Image
                  src={inspiration.image}
                  alt="The Guiding Influence behind GYP Signatures"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-5 left-5 right-5 p-3.5 bg-ivory/95 backdrop-blur-md border border-sand/50">
                  <span className="text-[0.6rem] tracking-[0.25em] uppercase text-bronze font-medium block">
                    Guiding Vision & Influence
                  </span>
                  <p className="font-sans text-xs text-charcoal/80 font-light mt-0.5">
                    The inspiration behind the creation of GYP SIGNATURES
                  </p>
                </div>
              </div>
              {inspiration.permissionNote && (
                <p className="text-[0.65rem] text-stone/60 font-light mt-3 text-center italic">
                  Note: Shared with respectful founder tribute.
                </p>
              )}
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inspiration-text-block">
              <h3 className="heading-section text-xl md:text-2xl text-charcoal mb-4">
                The Standards of Permanence
              </h3>
              <p className="font-sans text-stone text-sm sm:text-base font-light leading-relaxed">
                Every business that endures begins with someone who set the standard for how work should be approached.
                For GYP SIGNATURES, this business was built upon the example of discipline, architectural discernment,
                and dedication to authentic craftsmanship provided by this respected guiding influence.
              </p>
            </div>

            <div className="inspiration-text-block pt-2 space-y-4">
              {inspiration.narrative.map((text, idx) => (
                <p key={idx} className="font-sans text-stone text-sm sm:text-base font-light leading-relaxed">
                  {text}
                </p>
              ))}
            </div>

            <div className="inspiration-text-block pt-6 border-t border-sand/60">
              <div className="flex items-center gap-4">
                <span className="w-8 h-[1px] bg-bronze" />
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-bronze font-medium">
                  Integrity · Craft · Vision
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
