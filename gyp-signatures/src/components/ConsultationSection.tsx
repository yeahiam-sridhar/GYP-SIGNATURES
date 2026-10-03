'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { businessContact } from '@/data/business';
import { openConsultationModal } from './ConsultationModal';

gsap.registerPlugin(ScrollTrigger);

export default function ConsultationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { phoneDisplay, phoneTel, whatsappUrl, instagram, instagramHandle, email, address, mapsUrl } = businessContact;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.consult-content', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.contact-channel-card', {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-channels-grid',
          start: 'top 80%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="consultation" className="relative min-h-[85vh] flex items-center overflow-hidden bg-charcoal text-ivory">
      {/* Cinematic Interior Backdrop */}
      <Image
        src="/images/interiors/living-room.jpg"
        alt="GYP Signatures Luxury Interior Consultation"
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/80 to-charcoal" />

      {/* Main Container */}
      <div className="consult-content relative z-10 section-padding w-full py-20 md:py-28 max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="text-overline text-bronze-light mb-4 block tracking-[0.25em]">
            Connect With Our Studio
          </span>
          <h2 className="heading-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory mb-4 leading-[1.1]">
            Let&apos;s create your space.
          </h2>
          <p className="font-sans text-ivory/70 text-base md:text-lg font-light leading-relaxed max-w-xl">
            Have a space in mind? Let&apos;s talk about it. From architectural blueprints to bespoke custom furniture and styling, our studio team is here to guide you.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={openConsultationModal}
              className="btn-secondary py-3.5 px-6 sm:px-8 text-xs tracking-[0.2em] uppercase text-center w-full sm:w-auto"
            >
              Book a Consultation
            </button>
            <a
              href={`tel:${phoneTel}`}
              className="btn-primary border-ivory/30 text-ivory hover:bg-ivory hover:text-charcoal py-3.5 px-6 sm:px-7 text-xs tracking-[0.18em] uppercase text-center w-full sm:w-auto"
            >
              Call {phoneDisplay}
            </a>
          </div>
        </div>

        {/* Contact Channels Grid */}
        <div className="contact-channels-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-10 border-t border-ivory/15">
          {/* Channel 1: Telephone */}
          <a
            href={`tel:${phoneTel}`}
            className="contact-channel-card p-6 bg-ivory/[0.04] hover:bg-ivory/[0.08] border border-ivory/10 hover:border-bronze/50 transition-all duration-300 rounded-sm group block"
          >
            <div className="flex items-center justify-between mb-3 text-bronze-light">
              <span className="text-[0.65rem] tracking-[0.2em] uppercase font-medium">Direct Telephone</span>
              <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <p className="heading-display text-sm text-ivory font-normal group-hover:text-bronze-light transition-colors">
              {phoneDisplay}
            </p>
            <span className="text-[0.7rem] text-ivory/50 font-light mt-1 block">
              Call our studio desk
            </span>
          </a>

          {/* Channel 2: WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-channel-card p-6 bg-ivory/[0.04] hover:bg-ivory/[0.08] border border-ivory/10 hover:border-bronze/50 transition-all duration-300 rounded-sm group block"
          >
            <div className="flex items-center justify-between mb-3 text-bronze-light">
              <span className="text-[0.65rem] tracking-[0.2em] uppercase font-medium">WhatsApp</span>
              <svg className="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.06-1.503-.306-.987-.417-1.748-1.178-2.316-1.928-.277-.367-.626-.957-.626-1.564 0-.616.321-.918.435-1.037.114-.12.249-.149.333-.149.083 0 .166.002.239.006.077.004.18.016.275.244.1.238.341.832.371.893.03.062.05.134.009.215-.04.08-.06.13-.12.2-.06.07-.126.155-.18.208-.06.06-.123.125-.053.245.07.119.312.514.67.832.46.409.849.536.969.596.119.06.189.05.259-.03.07-.08.3-.35.38-.47.08-.12.16-.1.27-.06.11.04.7.33.82.39.12.06.2.09.23.14.03.05.03.5-.114.905z" />
              </svg>
            </div>
            <p className="heading-display text-sm text-ivory font-normal group-hover:text-bronze-light transition-colors">
              Chat on WhatsApp →
            </p>
            <span className="text-[0.7rem] text-ivory/50 font-light mt-1 block">
              Start an instant dialogue
            </span>
          </a>

          {/* Channel 3: Instagram */}
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-channel-card p-6 bg-ivory/[0.04] hover:bg-ivory/[0.08] border border-ivory/10 hover:border-bronze/50 transition-all duration-300 rounded-sm group block"
          >
            <div className="flex items-center justify-between mb-3 text-bronze-light">
              <span className="text-[0.65rem] tracking-[0.2em] uppercase font-medium">Instagram</span>
              <svg className="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <p className="heading-display text-sm text-ivory font-normal group-hover:text-bronze-light transition-colors">
              {instagramHandle}
            </p>
            <span className="text-[0.7rem] text-ivory/50 font-light mt-1 block">
              Follow our spatial work
            </span>
          </a>

          {/* Channel 4: Email */}
          <a
            href={`mailto:${email}`}
            className="contact-channel-card p-6 bg-ivory/[0.04] hover:bg-ivory/[0.08] border border-ivory/10 hover:border-bronze/50 transition-all duration-300 rounded-sm group block"
          >
            <div className="flex items-center justify-between mb-3 text-bronze-light">
              <span className="text-[0.65rem] tracking-[0.2em] uppercase font-medium">Email Desk</span>
              <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <p className="heading-display text-sm text-ivory font-normal group-hover:text-bronze-light transition-colors truncate">
              {email}
            </p>
            <span className="text-[0.7rem] text-ivory/50 font-light mt-1 block">
              Send project plans
            </span>
          </a>

          {/* Channel 5: Studio Visit */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-channel-card p-6 bg-ivory/[0.04] hover:bg-ivory/[0.08] border border-ivory/10 hover:border-bronze/50 transition-all duration-300 rounded-sm group block sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center justify-between mb-3 text-bronze-light">
              <span className="text-[0.65rem] tracking-[0.2em] uppercase font-medium">Studio Visit</span>
              <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <p className="heading-display text-sm text-ivory font-normal group-hover:text-bronze-light transition-colors">
              {address.city}
            </p>
            <span className="text-[0.7rem] text-ivory/50 font-light mt-1 block truncate">
              {address.district}, {address.state}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
