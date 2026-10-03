'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.project-card');
      cards.forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
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
    <section ref={sectionRef} id="projects" className="section-padding section-spacing bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24">
          <div>
            <span className="text-overline mb-4 block">Projects</span>
            <h2 className="heading-editorial text-3xl md:text-4xl lg:text-5xl text-charcoal">
              Complete Spaces
            </h2>
          </div>
          <p className="text-body text-stone max-w-md mt-4 md:mt-0">
            Each project is a complete design narrative — from initial concept through furniture selection to the final details that bring a space to life.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`project-card group cursor-pointer ${
                i === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  i === 0 ? 'aspect-[21/9]' : 'aspect-[16/10]'
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes={i === 0 ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Hover content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-ivory/80 text-sm font-light max-w-lg">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 md:mt-6 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <h3 className="heading-section text-base md:text-lg text-charcoal">
                      {project.name}
                    </h3>
                    <span className="text-[0.65rem] tracking-[0.15em] uppercase text-bronze font-medium">
                      {project.spaceType}
                    </span>
                  </div>
                  <span className="text-xs text-stone/70 font-light">
                    {project.location}
                  </span>
                </div>

                <p className="font-sans text-xs text-stone font-light leading-relaxed">
                  <span className="text-charcoal font-medium">Design Approach:</span> {project.designApproach}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-sand/60">
                  <div className="flex gap-2 flex-wrap">
                    {project.materials.map((mat) => (
                      <span
                        key={mat}
                        className="text-[0.6rem] tracking-[0.1em] uppercase text-stone/90 bg-ivory px-2 py-0.5 border border-sand/40"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#consultation"
                    className="text-xs text-bronze hover:underline tracking-wider uppercase text-[0.65rem]"
                  >
                    Commission Space →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
