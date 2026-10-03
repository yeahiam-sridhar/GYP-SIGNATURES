'use client';

import { useEffect, useRef } from 'react';

/**
 * ScrollProgress
 *
 * A single 1px bronze line fixed at the top of the viewport.
 * Grows from left to right as the user scrolls down the page.
 *
 * Design decisions:
 *  - Uses `scaleX` (GPU-composited) — zero layout thrashing, no width/height changes
 *  - transform-origin: left — grows from the left edge
 *  - Desktop-only: hidden on touch/mobile (performance + UX)
 *  - Respects prefers-reduced-motion
 *  - Passive scroll listener, no requestAnimationFrame polling
 *  - z-index 9999 — always above nav (z-50 = 50)
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Hide entirely on touch devices — scroll progress is less meaningful
    // and the extra DOM element can slightly reduce performance on weaker devices.
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) {
      bar.style.display = 'none';
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      bar.style.display = 'none';
      return;
    }

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      // scaleX is GPU-composited — no paint or layout cost
      const progress = Math.min(scrollTop / docHeight, 1);
      bar.style.transform = `scaleX(${progress})`;
    };

    // Set initial state (user may have scrolled before mount)
    update();

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      // Start fully collapsed (scaleX: 0) — transform-origin: left in CSS
      style={{ transform: 'scaleX(0)', width: '100%' }}
      aria-hidden="true"
    />
  );
}
