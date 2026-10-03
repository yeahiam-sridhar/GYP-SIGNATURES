'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { businessContact } from '@/data/business';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Interior Design', href: '#interior-design' },
  { name: 'Furniture', href: '#furniture' },
  { name: 'Projects', href: '#projects' },
  { name: 'Studio', href: '#studio' },
  { name: 'Editions', href: '#editions' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 80);
      if (currentY > lastScrollY.current && currentY > 400) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-sm border-b border-sand/50'
            : 'bg-transparent'
        } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="section-padding flex items-center justify-between h-20 md:h-24">
          {/* Official Brand Logo */}
          <Link
            href="/"
            className="relative z-[60] flex items-center group focus:outline-none focus:ring-1 focus:ring-bronze/40 rounded-sm"
            aria-label="GYP Signatures home"
          >
            <div className="relative w-[130px] sm:w-[145px] md:w-[165px] lg:w-[175px] aspect-[263/87] transition-opacity duration-300 ease-out group-hover:opacity-90">
              {/* Light logo (Ivory/Bronze over dark hero or mobile menu) */}
              <Image
                src="/images/logo-light.png"
                alt="GYP Signatures"
                width={263}
                height={87}
                priority
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-out ${
                  scrolled && !mobileOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              />
              {/* Dark logo (Charcoal/Bronze over scrolled light navigation) */}
              <Image
                src="/images/logo-dark.png"
                alt="GYP Signatures"
                width={263}
                height={87}
                priority
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-out ${
                  scrolled && !mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs font-light tracking-[0.15em] uppercase link-underline transition-colors duration-300 ${
                  scrolled ? 'text-charcoal' : 'text-ivory'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-8 shrink-0">
            <a
              href="#consultation"
              className={`text-xs font-light tracking-[0.15em] uppercase transition-colors duration-300 ${
                scrolled ? 'text-bronze' : 'text-bronze-light'
              }`}
            >
              Consultation
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden relative z-[60] w-8 h-8 flex flex-col justify-center items-center transition-colors duration-300 ${
              mobileOpen ? 'text-ivory' : scrolled ? 'text-charcoal' : 'text-ivory'
            }`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block w-6 h-[1px] bg-current transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-[1px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1px] bg-current mt-1.5 transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-[0.5px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-[55] bg-charcoal transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="h-full flex flex-col justify-center px-8">
          <div className="space-y-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block text-3xl heading-editorial text-ivory/90 hover:text-ivory transition-all duration-500 ${
                  mobileOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: mobileOpen ? `${i * 80 + 200}ms` : '0ms' }}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-12 pt-6 border-t border-ivory/10 flex flex-col gap-5">
            <a
              href="#consultation"
              onClick={() => setMobileOpen(false)}
              className="btn-secondary inline-block text-center"
            >
              Book a Consultation
            </a>

            <div className="flex items-center justify-between text-xs tracking-widest text-ivory/60 pt-2">
              <a
                href={businessContact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-bronze transition-colors flex items-center gap-2"
                aria-label="Follow GYP SIGNATURES on Instagram"
              >
                <svg className="w-3.5 h-3.5 text-bronze" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram {businessContact.instagramHandle}</span>
              </a>
              <a
                href={`tel:${businessContact.phoneTel}`}
                className="hover:text-bronze transition-colors text-[0.65rem] tracking-wider"
              >
                {businessContact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
