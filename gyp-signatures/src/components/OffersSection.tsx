'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { signatureOffers, SignatureOffer } from '@/data/offers';

gsap.registerPlugin(ScrollTrigger);

// =============================================================================
// HYDRATION-SAFE ARCHITECTURE
//
// PROBLEM: Two sources of server/client mismatch in the original code:
//
// 1. activeList lazy initializer used `typeof window === 'undefined'` to guard
//    `Date.now()`. On the server this returned [], so the component returned
//    null. On the first client render it returned the filtered offers and
//    rendered the full section. Result: server HTML had no #editions section,
//    client tried to mount it → React reported a mismatch with #stories.
//
// 2. OfferCountdown used `useState(() => calculateRemaining(endDate))` —
//    calling `new Date()` during a lazy initializer. The server evaluated this
//    at one moment in time, the client at a slightly different moment, producing
//    different digit values in the countdown → second mismatch in the markup.
//
// FIX: Two-phase render.
//
// Phase 1 – SSR + first client render (identical on both):
//   • Show all offers where `offer.active === true` (static boolean, no Date)
//   • OfferCountdown renders a stable placeholder ("-- : -- : -- : --")
//
// Phase 2 – After useEffect (client only, post-hydration):
//   • Re-filter by actual Date.now() to hide genuinely expired offers
//   • OfferCountdown switches to live countdown
//
// Result: server and client produce identical Phase 1 HTML → hydration OK.
// =============================================================================

// Static, date-independent list used for Phase 1 (SSR + initial client render).
// Computed once at module load time — stable, deterministic, no Date.now().
const CONFIGURED_OFFERS: SignatureOffer[] = signatureOffers.filter((o) => o.active);

// =============================================================================
// OfferCountdown — hydration-safe version
// Phase 1: renders stable placeholder dashes (identical server + client)
// Phase 2: shows live countdown after mount
// =============================================================================
interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateRemaining(targetIso: string): TimeRemaining {
  const difference = new Date(targetIso).getTime() - Date.now();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
}

function OfferCountdown({ endDate }: { endDate: string }) {
  // Phase 1: stable placeholder — no Date.now() on first render.
  // Both server and client see this same initial state → no markup mismatch.
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    // Phase 2: immediately compute real value and start interval on client
    setMounted(true);
    setTime(calculateRemaining(endDate));

    const timer = setInterval(() => {
      setTime(calculateRemaining(endDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  // Phase 2: if expired after mount, show conclusion banner
  if (mounted && time.isExpired) {
    return (
      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-stone/80 font-light">
        Campaign Concluded
      </span>
    );
  }

  // Consistent display: '--' during SSR / initial hydration, live digits after mount.
  // Identical DOM hierarchy, tags, colons, and classes in both phases.
  const formatVal = (val: number) => (!mounted ? '--' : pad(val));

  return (
    <div className="flex items-center gap-3" aria-label="Edition countdown">
      <div className="text-center min-w-[2rem]">
        <span className="heading-display text-base sm:text-lg text-charcoal font-medium block">
          {formatVal(time.days)}
        </span>
        <span className="text-[0.55rem] tracking-[0.2em] uppercase text-stone block">DAYS</span>
      </div>
      <span className="text-bronze text-sm mb-3">:</span>
      <div className="text-center min-w-[2rem]">
        <span className="heading-display text-base sm:text-lg text-charcoal font-medium block">
          {formatVal(time.hours)}
        </span>
        <span className="text-[0.55rem] tracking-[0.2em] uppercase text-stone block">HRS</span>
      </div>
      <span className="text-bronze text-sm mb-3">:</span>
      <div className="text-center min-w-[2rem]">
        <span className="heading-display text-base sm:text-lg text-charcoal font-medium block">
          {formatVal(time.minutes)}
        </span>
        <span className="text-[0.55rem] tracking-[0.2em] uppercase text-stone block">MIN</span>
      </div>
      <span className="text-bronze text-sm mb-3">:</span>
      <div className="text-center min-w-[2rem]">
        <span className="heading-display text-base sm:text-lg text-charcoal font-medium block">
          {formatVal(time.seconds)}
        </span>
        <span className="text-[0.55rem] tracking-[0.2em] uppercase text-stone block">SEC</span>
      </div>
    </div>
  );
}

// =============================================================================
// OffersSection — main component
// =============================================================================
export default function OffersSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Phase 1: render CONFIGURED_OFFERS (static, active:true, no Date.now()).
  // Identical on server and client → hydration succeeds.
  //
  // Phase 2: after mount, filter by actual date to remove expired offers.
  const [displayList, setDisplayList] = useState<SignatureOffer[]>(CONFIGURED_OFFERS);

  useEffect(() => {
    // Post-hydration: apply real time-based filtering.
    // This runs only on the client, after the initial HTML has matched.
    const now = Date.now();
    const active = signatureOffers.filter(
      (o) => o.active && new Date(o.endDate).getTime() > now
    );
    setDisplayList(active);
  }, []);

  // GSAP animation — robust progressive enhancement that NEVER leaves cards stuck at opacity 0
  useEffect(() => {
    if (displayList.length === 0) return;
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>('.offer-card');
    if (cards.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDirectHash = typeof window !== 'undefined' && window.location.hash === '#editions';
    const rect = section.getBoundingClientRect();
    const isAlreadyVisible = rect.top < window.innerHeight;

    // If reduced motion, direct hash anchor, or already in/past viewport: ensure immediate visibility
    if (isDirectHash || prefersReducedMotion || isAlreadyVisible) {
      gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' });
            },
          },
          onComplete: () => {
            gsap.set(cards, { clearProps: 'all' });
          },
        }
      );
    }, section);

    // Guaranteed failsafe: if ScrollTrigger somehow didn't fire within 500ms, reveal cards
    const failsafe = setTimeout(() => {
      gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' });
    }, 500);

    return () => {
      clearTimeout(failsafe);
      ctx.revert();
      gsap.set(cards, { clearProps: 'all' });
    };
  }, [displayList]);

  // If CONFIGURED_OFFERS is empty (all campaigns manually deactivated),
  // this returns null consistently on both server and client — no mismatch.
  if (CONFIGURED_OFFERS.length === 0) {
    return null;
  }

  // After hydration: if all campaigns have expired, hide section cleanly.
  // Note: this branch is only reachable AFTER the useEffect fires (client only).
  // On initial render displayList === CONFIGURED_OFFERS which is non-empty,
  // so this path is never hit during SSR.
  if (displayList.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} id="editions" className="section-padding py-16 sm:py-20 lg:py-24 bg-ivory">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-overline text-bronze mb-3 block tracking-[0.25em]">
            Curated Special Campaigns
          </span>
          <h2 className="heading-editorial text-3xl sm:text-4xl md:text-5xl text-charcoal">
            Signature Editions
          </h2>
          <p className="font-sans text-stone text-sm max-w-lg mx-auto font-light mt-4 leading-relaxed">
            Limited seasonal releases and architectural suite privileges. Curated for clients planning
            comprehensive residential transformations.
          </p>
        </div>

        {/* Offers Grid — keyed by stable offer.id, never by index or random */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {displayList.map((offer) => (
            <div
              key={offer.id}
              className="offer-card group min-w-0 flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-cream/70 border border-sand/70 rounded-sm hover:border-bronze/40 transition-all duration-500 shadow-sm"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-sand/60 mb-6">
                  <span className="text-[0.65rem] tracking-[0.25em] uppercase text-bronze font-medium">
                    {offer.editionNumber}
                  </span>
                  {offer.highlightText && (
                    <span className="text-[0.6rem] tracking-[0.18em] uppercase text-stone/80 bg-sand/40 px-2.5 py-0.5">
                      {offer.highlightText}
                    </span>
                  )}
                </div>

                {/* Imagery Thumbnail */}
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm mb-6 bg-sand/30">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
                  {offer.discountPercentage && (
                    <div className="absolute top-4 right-4 bg-charcoal/90 backdrop-blur-md px-3 py-1.5 border border-ivory/15">
                      <span className="text-ivory font-serif text-sm">
                        Up to {offer.discountPercentage}% Privilege
                      </span>
                    </div>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="heading-section text-xl md:text-2xl text-charcoal mb-2">
                  {offer.title}
                </h3>
                <p className="text-xs text-bronze tracking-[0.1em] uppercase mb-4 font-light">
                  {offer.subtitle}
                </p>
                <p className="font-sans text-stone text-sm font-light leading-relaxed mb-6">
                  {offer.description}
                </p>

                {/* Applicable Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {offer.applicableCategories.map((cat) => (
                    <span
                      key={cat}
                      className="text-[0.65rem] uppercase tracking-wider text-charcoal/70 bg-ivory px-2.5 py-1 border border-sand/50"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom: Live Countdown + Action */}
              <div className="pt-6 border-t border-sand/60">
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-end lg:items-start xl:items-end justify-between gap-6">
                  <div>
                    <span className="text-[0.6rem] tracking-[0.2em] uppercase text-stone block mb-2 font-medium">
                      Time Remaining in Edition
                    </span>
                    <OfferCountdown endDate={offer.endDate} />
                  </div>
                  <a
                    href={offer.ctaHref}
                    className="btn-primary text-xs py-3 px-6 tracking-[0.15em] shrink-0 text-center w-full sm:w-auto lg:w-full xl:w-auto"
                  >
                    {offer.ctaText} →
                  </a>
                </div>
                <p className="text-[0.65rem] text-stone/60 font-light mt-4 italic">
                  *{offer.terms}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
