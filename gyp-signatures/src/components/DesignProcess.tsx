'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { designProcess } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function DesignProcess() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Timeline line grows as user scrolls
      gsap.to('.process-line-fill', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.process-timeline',
          start: 'top 60%',
          end: 'bottom 60%',
          scrub: true,
        },
      });

      // Each step reveals
      const steps = section.querySelectorAll('.process-step');
      steps.forEach((step) => {
        gsap.from(step, {
          x: -30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="section-padding section-spacing-sm bg-cream">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-overline mb-4 block">How We Work</span>
          <h2 className="heading-editorial text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
            The Design Process
          </h2>
          <p className="text-body text-stone max-w-lg mx-auto">
            From the first conversation to the completed space — a considered journey through every stage.
          </p>
        </div>

        {/* Timeline */}
        <div className="process-timeline relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-sand">
            <div className="process-line-fill absolute top-0 left-0 w-full h-full bg-bronze origin-top scale-y-0" />
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {designProcess.map((item, i) => (
              <div
                key={item.step}
                className="process-step relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12"
              >
                {/* Dot */}
                <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-1 w-[9px] h-[9px] rounded-full bg-ivory border-2 border-bronze z-10" />

                {/* Content */}
                <div className={`pl-10 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                  <span className="text-overline text-bronze text-[0.65rem] mb-2 block">
                    Step {item.step}
                  </span>
                  <h3 className="heading-section text-base md:text-lg text-charcoal mb-2">
                    {item.name}
                  </h3>
                  <p className="text-body text-stone text-sm max-w-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
