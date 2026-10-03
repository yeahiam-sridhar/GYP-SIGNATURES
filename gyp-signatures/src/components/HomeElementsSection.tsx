'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { homeElements } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function HomeElementsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.he-item', {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.he-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      const img = section.querySelector('.he-image');
      if (img) {
        gsap.to(img, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home-elements" className="section-padding section-spacing bg-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Content */}
          <div>
            <span className="text-overline mb-4 block">Beyond Furniture</span>
            <h2 className="heading-editorial text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">
              Home Elements
            </h2>
            <p className="text-body-lg text-stone mb-12 max-w-lg">
              The details that complete a space. From doors and windows to wall treatments and artwork — every element considered as part of your interior composition.
            </p>

            {/* Elements grid */}
            <div className="he-grid grid grid-cols-2 gap-x-8 gap-y-6">
              {homeElements.map((el) => (
                <div key={el.id} className="he-item group cursor-pointer">
                  <h3 className="font-sans text-sm tracking-[0.05em] text-charcoal mb-1 group-hover:text-bronze transition-colors duration-300">
                    {el.name}
                  </h3>
                  <p className="text-xs text-stone font-light leading-relaxed">
                    {el.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <a href="#consultation" className="btn-primary">
                Discuss Your Space
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden aspect-[3/4] lg:aspect-[2/3]">
            <Image
              src="/images/interiors/kitchen.jpg"
              alt="Home elements — kitchen interior with custom cabinetry"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="he-image object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
