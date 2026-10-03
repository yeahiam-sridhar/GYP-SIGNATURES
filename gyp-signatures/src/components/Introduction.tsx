'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.intro-line', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.intro-connector', {
        scaleX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding section-spacing bg-ivory relative"
    >
      <span id="introduction" className="sr-only" />
      <div className="max-w-5xl mx-auto">
        {/* Overline */}
        <div className="intro-line text-overline mb-8 md:mb-12">The GYP Signatures Approach</div>

        {/* Main statement */}
        <h2 className="intro-line heading-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-charcoal leading-[1.15] mb-12 md:mb-16 max-w-4xl">
          We don&apos;t just furnish spaces.
          <br />
          <span className="text-stone">We create them.</span>
        </h2>

        {/* Four pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {[
            {
              title: 'Interior Design',
              desc: 'Complete spatial concepts that define how you live within your home.',
            },
            {
              title: 'Furniture',
              desc: 'Curated and custom pieces chosen for your specific interior vision.',
            },
            {
              title: 'Home Elements',
              desc: 'Doors, walls, curtains, artwork — the details that complete a space.',
            },
            {
              title: 'Custom Work',
              desc: 'Bespoke solutions designed and made specifically for your space.',
            },
          ].map((item, i) => (
            <div key={item.title} className="intro-line group">
              {/* Number */}
              <span className="text-overline text-bronze mb-3 block">0{i + 1}</span>
              {/* Connector line */}
              <div className="intro-connector h-[1px] bg-sand mb-6 origin-left" />
              {/* Title */}
              <h3 className="heading-section text-sm mb-3 text-charcoal">
                {item.title}
              </h3>
              {/* Description */}
              <p className="text-body text-stone text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
