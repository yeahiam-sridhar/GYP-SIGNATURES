'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { materials } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function MaterialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image reveal
      gsap.from('.materials-img', {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.materials-img',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Material items
      gsap.from('.mat-item', {
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.mat-list',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="materials" className="section-spacing bg-deep-brown text-ivory overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="materials-img relative aspect-[4/3] overflow-hidden" style={{ clipPath: 'inset(0 0 0 0)' }}>
            <Image
              src="/images/materials/materials-overview.jpg"
              alt="Material samples — walnut wood, marble stone, linen fabric, leather, brass"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <span className="text-overline text-bronze-light mb-4 block">Materials & Craft</span>
            <h2 className="heading-editorial text-3xl md:text-4xl text-ivory mb-6">
              Chosen with intention
            </h2>
            <p className="text-body text-ivory/60 mb-12 max-w-lg">
              Every material is selected for its character, durability, and the way it feels under your hand. We work with natural materials that age beautifully and synthetic innovations that perform exceptionally.
            </p>

            {/* Material list */}
            <div className="mat-list space-y-4">
              {materials.map((mat) => (
                <div
                  key={mat.id}
                  className="mat-item group flex items-start gap-4 py-3 border-b border-ivory/10 cursor-pointer hover:border-bronze/30 transition-colors duration-300"
                >
                  <span className="text-bronze-light text-xs tracking-[0.1em] uppercase mt-0.5 min-w-[80px]">
                    {mat.name}
                  </span>
                  <p className="text-sm text-ivory/50 font-light group-hover:text-ivory/80 transition-colors duration-300">
                    {mat.description}
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
