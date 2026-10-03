'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clientStories } from '@/data/reviews';
import { openConsultationModal } from './ConsultationModal';

gsap.registerPlugin(ScrollTrigger);

export default function ClientStoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const total = clientStories.length;
  const currentStory = clientStories[currentIndex];

  const goToSlide = useCallback(
    (index: number, dir?: 1 | -1) => {
      const nextIndex = (index + total) % total;
      if (nextIndex === currentIndex) return;

      const slideDir = dir !== undefined ? dir : nextIndex > currentIndex ? 1 : -1;
      setDirection(slideDir);
      setCurrentIndex(nextIndex);

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Animate text transition
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, x: slideDir * 24 },
          { opacity: 1, x: 0, duration: 0.55, ease: 'power2.out' }
        );
      }

      // Gentle image transition
      if (imageContainerRef.current) {
        gsap.fromTo(
          imageContainerRef.current,
          { opacity: 0.65, scale: 0.985 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
        );
      }
    },
    [currentIndex, total]
  );

  const handleNext = () => goToSlide(currentIndex + 1, 1);
  const handlePrev = () => goToSlide(currentIndex - 1, -1);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowRight') {
        goToSlide(currentIndex + 1, 1);
      } else if (e.key === 'ArrowLeft') {
        goToSlide(currentIndex - 1, -1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, goToSlide]);

  // Entrance animation with progressive enhancement
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reveals = section.querySelectorAll<HTMLElement>('.story-reveal');
    if (reveals.length === 0) return;

    const isDirectHash =
      typeof window !== 'undefined' &&
      (window.location.hash === '#stories' ||
        window.location.hash === '#testimonials' ||
        window.location.hash === '#client-stories');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rect = section.getBoundingClientRect();
    const isAlreadyVisible = rect.top < window.innerHeight;

    if (isDirectHash || prefersReducedMotion || isAlreadyVisible) {
      gsap.set(reveals, { opacity: 1, y: 0, clearProps: 'all' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        reveals,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.set(reveals, { opacity: 1, y: 0, clearProps: 'all' });
            },
          },
        }
      );
    }, section);

    const failsafe = setTimeout(() => {
      gsap.set(reveals, { opacity: 1, y: 0, clearProps: 'all' });
    }, 500);

    return () => {
      clearTimeout(failsafe);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stories"
      data-section="client-stories"
      className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24 bg-[#F9F7F2] border-t border-b border-sand/60 overflow-hidden"
      aria-label="Client Stories"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="story-reveal mb-12 sm:mb-16 lg:mb-20 pb-8 sm:pb-10 border-b border-sand/70 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[0.65rem] sm:text-xs tracking-[0.28em] uppercase text-bronze font-medium block mb-3">
              From the People Who Live With Our Work
            </span>
            <span className="text-overline text-stone/80 text-[0.68rem] tracking-[0.24em] mb-1.5 uppercase block">
              Client Stories
            </span>
            <h2 className="heading-editorial text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal leading-[1.12] max-w-2xl">
              Spaces that become part of your story.
            </h2>
          </div>

          {/* Desktop Navigation & Counter */}
          <div className="hidden md:flex items-center gap-6 self-start md:self-end">
            <span className="font-mono text-xs tracking-[0.2em] text-stone">
              <span className="text-charcoal font-medium">0{currentIndex + 1}</span>
              <span className="mx-2 text-sand">/</span>
              <span>0{total}</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-11 h-11 rounded-[1px] border border-charcoal/20 hover:border-bronze hover:text-bronze text-charcoal flex items-center justify-center transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-bronze/50 cursor-pointer"
                aria-label="Previous client story"
              >
                <span className="text-base leading-none">←</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-11 h-11 rounded-[1px] border border-charcoal/20 hover:border-bronze hover:text-bronze text-charcoal flex items-center justify-center transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-bronze/50 cursor-pointer"
                aria-label="Next client story"
              >
                <span className="text-base leading-none">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Asymmetric Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Left Column: Project Photograph */}
          <div className="story-reveal lg:col-span-5 xl:col-span-5">
            <div
              ref={imageContainerRef}
              className="group relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-sand/30 shadow-[0_12px_32px_rgba(0,0,0,0.04)]"
            >
              <Image
                src={currentStory.image}
                alt={currentStory.imageAlt}
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Architectural Caption */}
            <figcaption className="mt-3.5 flex items-center justify-between text-[0.65rem] sm:text-xs tracking-[0.2em] uppercase text-stone/85 font-light">
              <span className="font-medium text-charcoal/90">{currentStory.city}</span>
              <span>
                {currentStory.projectType} · {currentStory.projectYear}
              </span>
            </figcaption>
          </div>

          {/* Right Column: Editorial Quotation & Location Identifier */}
          <div className="story-reveal lg:col-span-7 xl:col-span-7 flex flex-col justify-between">
            <div ref={quoteRef} className="relative">
              {/* Oversized Subtle Editorial Quote Mark */}
              <span
                className="font-serif text-5xl sm:text-6xl lg:text-7xl text-bronze/30 block leading-none select-none -mb-3"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Authentic Customer Review Quote */}
              <blockquote className="font-serif italic text-xl sm:text-2xl lg:text-[1.8rem] xl:text-[2rem] leading-[1.6] sm:leading-[1.65] text-charcoal/90 font-light my-4 sm:my-6">
                &ldquo;{currentStory.quote}&rdquo;
              </blockquote>

              {/* Location as Primary Visible Client Identifier */}
              <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-sand/70 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  {currentStory.customerNameVisible && currentStory.customerName && (
                    <span className="text-xs uppercase tracking-[0.2em] text-charcoal font-medium block mb-1">
                      {currentStory.customerName}
                    </span>
                  )}
                  <h3 className="heading-display text-base sm:text-lg text-charcoal tracking-[0.22em] uppercase font-normal">
                    {currentStory.city}
                  </h3>
                  <span className="text-xs text-stone tracking-[0.18em] uppercase font-light block mt-0.5">
                    {currentStory.state}
                  </span>
                  <span className="text-[0.68rem] tracking-[0.2em] text-bronze font-light block mt-2 uppercase">
                    {currentStory.projectType}
                  </span>
                </div>

                {/* Direct Numbered Indicators */}
                <div className="flex items-center gap-3">
                  {clientStories.map((story, idx) => (
                    <button
                      key={story.id}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      className={`text-[0.68rem] font-mono tracking-widest px-2.5 py-1 transition-all duration-300 border-b cursor-pointer focus:outline-none focus:ring-1 focus:ring-bronze/40 ${
                        idx === currentIndex
                          ? 'border-bronze text-charcoal font-medium'
                          : 'border-transparent text-stone/50 hover:text-stone hover:border-sand'
                      }`}
                      aria-label={`View client story from ${story.city}`}
                      aria-current={idx === currentIndex ? 'true' : 'false'}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Controls (Rendered below content on screens < 768px) */}
            <div className="flex md:hidden items-center justify-between mt-8 pt-6 border-t border-sand/60">
              <span className="font-mono text-xs tracking-[0.2em] text-stone">
                <span className="text-charcoal font-medium">0{currentIndex + 1}</span>
                <span className="mx-2 text-sand">/</span>
                <span>0{total}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-[1px] border border-charcoal/20 hover:border-bronze hover:text-bronze text-charcoal flex items-center justify-center transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-bronze/50 cursor-pointer"
                  aria-label="Previous client story"
                >
                  <span className="text-sm leading-none">←</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-10 h-10 rounded-[1px] border border-charcoal/20 hover:border-bronze hover:text-bronze text-charcoal flex items-center justify-center transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-bronze/50 cursor-pointer"
                  aria-label="Next client story"
                >
                  <span className="text-sm leading-none">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section Bottom Consultation CTA */}
        <div className="story-reveal mt-16 sm:mt-24 pt-10 sm:pt-14 border-t border-sand/70 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="text-[0.62rem] sm:text-[0.65rem] tracking-[0.26em] uppercase text-bronze font-medium block mb-1.5">
              Ready to Create Your Space?
            </span>
            <p className="font-serif text-lg sm:text-xl text-charcoal font-light">
              Let our senior design team shape a home tailored to your life.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openConsultationModal()}
            className="group inline-flex items-center gap-4 px-8 py-3.5 sm:py-4 bg-charcoal hover:bg-bronze text-ivory text-xs tracking-[0.2em] uppercase font-light transition-colors duration-400 cursor-pointer shadow-sm focus:outline-none focus:ring-1 focus:ring-bronze/60"
            aria-label="Discuss your project with GYP Signatures studio"
          >
            <span>Discuss Your Project</span>
            <span className="text-sm transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
