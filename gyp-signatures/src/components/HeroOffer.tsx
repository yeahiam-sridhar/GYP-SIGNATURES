'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { heroSignatureOffer } from '@/data/offers';
import { openConsultationModal } from './ConsultationModal';

// =============================================================================
// CONFIGURABLE OFFER DURATION
// Change this value in one place to adjust the countdown cycle length.
// Examples:
//   2 * 3600 (2 hours -> 01 : 59 : 59 down to 00 : 00 : 00, then repeats)
//   1 * 3600 + 18 * 60 + 42 (1h 18m 42s -> 01 : 18 : 42 down to 00 : 00 : 00)
// =============================================================================
export const OFFER_DURATION_SECONDS = 2 * 3600; // 2 hours

const STORAGE_KEY = 'gyp_signature_offer_cycle_target_ts';
const CYCLE_MS = OFFER_DURATION_SECONDS * 1000;

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function formatSeconds(totalSeconds: number): string {
  const safeSecs = Math.max(0, totalSeconds);
  const hours = Math.floor(safeSecs / 3600);
  const minutes = Math.floor((safeSecs % 3600) / 60);
  const seconds = safeSecs % 60;
  return `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
}

/**
 * Returns a guaranteed valid future target timestamp.
 * If the stored timestamp has passed (or is missing/stale),
 * it automatically advances by integer cycles to the active future cycle.
 * Never allows the target to be in the past.
 */
function getOrAdvanceTargetTimestamp(): number {
  const now = Date.now();

  if (typeof window === 'undefined') {
    return now + CYCLE_MS;
  }

  // Developer testing override: support ?offer_seconds=N to test rollover quickly
  const urlParams = new URLSearchParams(window.location.search);
  const testSecs = urlParams.get('offer_seconds');
  if (testSecs) {
    const s = parseInt(testSecs, 10);
    if (!isNaN(s) && s > 0) {
      return now + s * 1000;
    }
  }

  let storedTarget = 0;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      storedTarget = parseInt(raw, 10);
    }
  } catch {
    // LocalStorage fallback for private or restricted environments
  }

  // If no target stored, initialize a fresh cycle from now
  if (!storedTarget || isNaN(storedTarget)) {
    const newTarget = now + CYCLE_MS;
    try {
      localStorage.setItem(STORAGE_KEY, newTarget.toString());
    } catch {
      // Ignore
    }
    return newTarget;
  }

  // If stored target is strictly in the past (overdue), roll forward to current cycle
  if (now > storedTarget) {
    const overdueMs = now - storedTarget;
    const cyclesToAdvance = Math.floor(overdueMs / CYCLE_MS) + 1;
    const advancedTarget = storedTarget + cyclesToAdvance * CYCLE_MS;
    try {
      localStorage.setItem(STORAGE_KEY, advancedTarget.toString());
    } catch {
      // Ignore
    }
    return advancedTarget;
  }

  return storedTarget;
}

export default function HeroOffer() {
  const cardRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<number>(0);

  // Initial SSR-safe formatted time
  const [timeFormatted, setTimeFormatted] = useState<string>(() =>
    formatSeconds(OFFER_DURATION_SECONDS - 1)
  );

  // Core ticker calculation function (memoized to avoid re-creations)
  const tick = useCallback((): void => {
    const now = Date.now();
    let target = targetRef.current;

    // Check if target needs initialization or has passed
    if (!target || now > target) {
      target = getOrAdvanceTargetTimestamp();
      targetRef.current = target;
    }

    const diffMs = target - now;
    // When diffMs is between 0 and 999ms, seconds will be 0 (showing 00 : 00 : 00)
    let totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

    // Cap at cycle max - 1 so for 2h it starts at 01 : 59 : 59
    if (totalSeconds >= OFFER_DURATION_SECONDS) {
      totalSeconds = OFFER_DURATION_SECONDS - 1;
    }

    setTimeFormatted(formatSeconds(totalSeconds));
  }, []);

  // Timer Lifecycle & Tab Visibility Handling
  useEffect(() => {
    // 1. Initialize target and tick immediately
    targetRef.current = getOrAdvanceTargetTimestamp();
    tick();

    // 2. High-precision 1-second interval
    const intervalId = setInterval(tick, 1000);

    // 3. Handle browser tab visibility changes seamlessly (e.g. backgrounded tab, waking laptop)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Tab became visible again; immediately refresh target and time
        targetRef.current = getOrAdvanceTargetTimestamp();
        tick();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 4. Subtle entrance animation
    const card = cardRef.current;
    if (card) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.35,
            ease: 'power2.out',
          }
        );
      }
    }

    // 5. Clean teardown to prevent memory leaks
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [tick]);

  const handleOpen = () => {
    openConsultationModal({
      mode: 'offer',
      offer: {
        badge: heroSignatureOffer.badge,
        discount: heroSignatureOffer.discount,
        title: heroSignatureOffer.title,
        subtitle: heroSignatureOffer.subtitle,
        description: heroSignatureOffer.description,
        privilege: heroSignatureOffer.privilege,
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Explore GYP Signature Offer — ${heroSignatureOffer.discount}. Ends in ${timeFormatted}`}
      className="group relative w-full max-w-[270px] sm:max-w-[285px] bg-charcoal/85 backdrop-blur-md border border-ivory/15 hover:border-bronze/50 hover:bg-charcoal/90 p-4 sm:p-5 rounded-[2px] shadow-[0_12px_36px_rgba(0,0,0,0.5)] hover:shadow-[0_18px_44px_rgba(0,0,0,0.65)] hover:-translate-y-1 transition-all duration-300 pointer-events-auto text-left cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-bronze/70 select-none"
    >
      {/* Subtle top architectural bronze line that gently expands on hover */}
      <div className="absolute top-0 left-0 h-[1.5px] w-8 bg-bronze/70 group-hover:w-16 transition-all duration-500" />

      {/* Micro Bronze Badge Header */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="w-1.5 h-1.5 rounded-full bg-bronze gyp-breathe shadow-sm"
          aria-hidden="true"
        />
        <span className="text-[0.62rem] sm:text-[0.65rem] tracking-[0.24em] uppercase text-bronze-light font-medium font-sans">
          {heroSignatureOffer.badge}
        </span>
      </div>

      {/* Discount Headline: 50% OFF */}
      <div className="font-serif heading-display text-2xl sm:text-3xl text-ivory tracking-wide leading-none my-2 font-normal">
        {heroSignatureOffer.discount}
      </div>

      {/* Real Live Continuous Countdown */}
      <div
        className="text-[0.68rem] tracking-[0.16em] uppercase text-ivory/75 font-light flex items-center gap-2 font-sans mt-2.5"
        aria-live="polite"
        aria-label={`Offer ends in ${timeFormatted}`}
      >
        <span className="text-ivory/55">Ends in</span>
        <span
          suppressHydrationWarning
          className="font-mono text-ivory font-medium tracking-wider text-xs sm:text-[0.82rem] bg-charcoal/60 px-2 py-0.5 rounded-[1px] border border-ivory/10 shadow-inner"
        >
          {timeFormatted}
        </span>
      </div>

      {/* Luxury Editorial CTA Link */}
      <div className="mt-3.5 inline-flex items-center gap-2 text-[0.65rem] sm:text-[0.68rem] tracking-[0.22em] uppercase text-ivory/95 group-hover:text-bronze-light font-medium transition-colors">
        <span className="border-b border-ivory/30 group-hover:border-bronze-light pb-0.5 transition-colors">
          EXPLORE GYP SIGNATURES
        </span>
        <span className="text-xs transition-transform duration-300 group-hover:translate-x-1.5">
          →
        </span>
      </div>
    </div>
  );
}
