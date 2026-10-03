'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ArtworkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Parallax on artwork images
      const imgs = section.querySelectorAll('.art-img');
      imgs.forEach((img) => {
        gsap.to(img, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Text reveal
      gsap.from('.art-text', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.art-text',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="artwork" className="section-spacing bg-cream overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        {/* Header */}
        <div className="art-text mb-16 md:mb-24">
          <span className="text-overline mb-4 block">Art & Interiors</span>
          <h2 className="heading-editorial text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4">
            Art as architecture
          </h2>
          <p className="text-body text-stone max-w-lg">
            Artwork is not decoration — it&apos;s an integral part of the spatial composition. We help select and place art that belongs to the interior.
          </p>
        </div>

        {/* Asymmetric art grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
          {/* Large image */}
          <div className="md:col-span-7 relative overflow-hidden aspect-[16/9] shadow-sm">
            <Image
              src="/images/interiors/artwork-feature.jpg"
              alt="Monumental contemporary abstract artwork in an architectural interior with walnut credenza"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="art-img object-cover scale-105"
            />
          </div>
          {/* Tall image */}
          <div className="md:col-span-5 relative overflow-hidden aspect-[3/4]">
            <Image
              src="/images/interiors/bedroom.jpg"
              alt="Artwork above bedroom headboard"
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="art-img object-cover scale-110"
            />
          </div>
        </div>

        {/* Quote */}
        <div className="mt-16 md:mt-24 max-w-3xl mx-auto text-center">
          <blockquote className="heading-editorial text-2xl md:text-3xl text-charcoal/80 italic leading-relaxed">
            &ldquo;Every space tells a story. Art gives it a voice.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
