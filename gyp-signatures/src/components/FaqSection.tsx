'use client';

import { useState } from 'react';
import { businessFaqs } from '@/data/business';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="section-padding section-spacing bg-cream border-t border-sand/60">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-overline text-bronze mb-3 block tracking-[0.25em]">
            Clarity & Guidance
          </span>
          <h2 className="heading-editorial text-3xl sm:text-4xl md:text-5xl text-charcoal">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-stone text-sm max-w-md mx-auto font-light mt-4 leading-relaxed">
            Essential information regarding our interior services, custom furniture production, studio visits, and commissions.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {businessFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-ivory border border-sand/70 rounded-sm overflow-hidden transition-colors duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-bronze/40 group"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="heading-section text-base sm:text-lg text-charcoal group-hover:text-bronze transition-colors duration-300">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full border border-sand/80 flex items-center justify-center text-bronze transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-cream' : 'rotate-0'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-hidden={!isOpen}
                  className={`faq-body${isOpen ? ' faq-open' : ''}`}
                >
                  <div className="px-6 pb-6 pt-1 text-stone font-sans text-sm font-light leading-relaxed border-t border-sand/40">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Inquiries CTA */}
        <div className="mt-12 p-8 bg-ivory/60 border border-sand/60 text-center rounded-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-bronze font-medium mb-1">
            Have a Specific Question About Your Space?
          </p>
          <p className="text-xs text-stone font-light mb-4">
            Our architectural design team is available to review your blueprints and custom requirements.
          </p>
          <a
            href="#consultation"
            className="btn-primary text-xs py-2.5 px-6 inline-block"
          >
            Start a Conversation
          </a>
        </div>
      </div>
    </section>
  );
}
