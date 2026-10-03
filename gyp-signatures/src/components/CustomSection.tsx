'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const customServices = [
  'Custom furniture',
  'Custom storage solutions',
  'Custom wardrobes',
  'Custom doors',
  'Custom wall treatments',
  'Custom decorative work',
  'Custom textile & curtain solutions',
  'Made-to-suit elements',
];

export default function CustomSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Process steps reveal
      gsap.from('.custom-step', {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.custom-steps',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Service items
      gsap.from('.custom-service', {
        x: -15,
        opacity: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.custom-services',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="custom" className="section-padding section-spacing-sm bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Content */}
          <div>
            <span className="text-overline text-bronze mb-4 block">Bespoke</span>
            <h2 className="heading-editorial text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">
              Made for<br />
              <span className="text-stone">your space</span>
            </h2>
            <p className="text-body-lg text-stone mb-12 max-w-lg">
              When standard solutions don&apos;t fit, we create. Every custom piece begins with your space, your needs, and the vision we develop together.
            </p>

            {/* Process */}
            <div className="custom-steps flex flex-wrap gap-3 mb-12">
              {['Idea', 'Design', 'Customize', 'Complete'].map((step, i) => (
                <div key={step} className="custom-step flex items-center gap-3">
                  <span className="text-xs tracking-[0.15em] uppercase text-charcoal font-light">
                    {step}
                  </span>
                  {i < 3 && (
                    <span className="w-8 h-[1px] bg-sand" />
                  )}
                </div>
              ))}
            </div>

            {/* Services */}
            <div className="custom-services space-y-3">
              {customServices.map((service) => (
                <div
                  key={service}
                  className="custom-service flex items-center gap-3 py-2 group cursor-pointer"
                >
                  <span className="w-4 h-[1px] bg-bronze group-hover:w-8 transition-all duration-300" />
                  <span className="text-sm font-light text-stone group-hover:text-charcoal transition-colors duration-300 tracking-wide">
                    {service}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <a href="#consultation" className="btn-secondary">
                Discuss a Custom Project
              </a>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div className="relative overflow-hidden aspect-[3/4]">
              <Image
                src="/images/interiors/bedroom.jpg"
                alt="Custom designed bedroom interior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Floating label */}
            <div className="absolute -bottom-4 -left-4 md:-left-8 bg-ivory px-6 py-4 shadow-sm">
              <span className="text-overline text-xs text-bronze">Custom Design</span>
              <p className="text-sm text-charcoal font-light mt-1">Tailored to your space</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
