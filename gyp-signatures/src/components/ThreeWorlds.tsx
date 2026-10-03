'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const worlds = [
  {
    title: 'Interior Design',
    subtitle: 'Complete spatial visions',
    description: 'From concept to completion — space planning, material selection, lighting, and every considered detail that transforms a house into your home.',
    image: '/images/interiors/living-room.jpg',
    href: '#interior-design',
  },
  {
    title: 'Furniture',
    subtitle: 'Curated & custom pieces',
    description: 'A collection of refined furniture — sofas, tables, beds, seating — chosen for quality, craft, and the way they define a room.',
    image: '/images/interiors/dining.jpg',
    href: '#furniture',
  },
  {
    title: 'Home Elements',
    subtitle: 'The finishing details',
    description: 'Doors, windows, wall treatments, curtains, artwork — the elements that complete the space and make it unmistakably yours.',
    image: '/images/interiors/bedroom.jpg',
    href: '#home-elements',
  },
];

export default function ThreeWorlds() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.world-card');
      cards.forEach((card, i) => {
        const img = card.querySelector('.world-img');
        const content = card.querySelector('.world-content');

        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        // Parallax on image
        if (img) {
          gsap.to(img, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="worlds" className="section-padding section-spacing bg-cream">
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24">
        <span className="text-overline mb-4 block">Three Worlds, One Vision</span>
        <h2 className="heading-editorial text-3xl md:text-4xl lg:text-5xl text-charcoal max-w-3xl">
          Everything your space needs, <br className="hidden md:block" />
          <span className="text-stone">connected by design.</span>
        </h2>
      </div>

      {/* World cards */}
      <div className="max-w-7xl mx-auto space-y-20 md:space-y-32">
        {worlds.map((world, i) => (
          <a
            key={world.title}
            href={world.href}
            className="world-card group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center cursor-pointer"
          >
            {/* Image */}
            <div className={`relative overflow-hidden aspect-[4/3] ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <Image
                src={world.image}
                alt={world.title}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="world-img object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
            </div>

            {/* Content */}
            <div className={`world-content ${i % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}>
              <span className="text-overline text-bronze mb-3 block">0{i + 1}</span>
              <h3 className="heading-section text-xl md:text-2xl text-charcoal mb-4">
                {world.title}
              </h3>
              <p className="text-overline mb-6">{world.subtitle}</p>
              <p className="text-body text-stone max-w-md mb-8">
                {world.description}
              </p>
              <span className="text-xs tracking-[0.15em] uppercase font-light text-charcoal link-underline">
                Explore {world.title}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
