'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products, categories } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export default function FurnitureCollection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.furniture-header', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="furniture" className="section-padding section-spacing bg-ivory">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="furniture-header mb-12 md:mb-20">
          <span className="text-overline mb-4 block">Collection</span>
          <h2 className="heading-editorial text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">
            Furniture
          </h2>
          <p className="text-body text-stone max-w-xl">
            Each piece is selected for its material quality, considered proportions, and the way it defines a room.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 md:gap-6 mb-12 md:mb-16">
          <button
            onClick={() => setActiveCategory('all')}
            className={`text-xs tracking-[0.15em] uppercase font-light transition-colors duration-300 pb-1 border-b ${
              activeCategory === 'all'
                ? 'text-charcoal border-charcoal'
                : 'text-stone border-transparent hover:text-charcoal'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs tracking-[0.15em] uppercase font-light transition-colors duration-300 pb-1 border-b ${
                activeCategory === cat.id
                  ? 'text-charcoal border-charcoal'
                  : 'text-stone border-transparent hover:text-charcoal'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4] bg-sand/20 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />
                {/* Quick actions on hover */}
                <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <span className="bg-ivory/95 text-charcoal text-xs tracking-[0.15em] uppercase font-light px-6 py-2.5 backdrop-blur-sm">
                    View Details
                  </span>
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="font-sans text-sm font-normal tracking-[0.05em] text-charcoal mb-1 group-hover:text-bronze transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-overline text-[0.6rem] mb-2">{product.subcategory}</p>
                <p className="text-xs text-stone font-light">{product.material}</p>
                {product.customizable && (
                  <p className="text-[0.6rem] text-bronze tracking-[0.1em] uppercase mt-2 font-light">
                    Customizable
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-16 md:mt-20">
          <a href="#consultation" className="btn-primary">
            Enquire About Our Collection
          </a>
        </div>
      </div>
    </section>
  );
}
