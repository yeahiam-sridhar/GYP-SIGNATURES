'use client';

import { businessContact } from '@/data/business';
import { openConsultationModal } from './ConsultationModal';

export default function FloatingContact() {
  const { phoneDisplay, phoneTel, whatsappUrl } = businessContact;

  return (
    <>
      {/* Desktop Minimal Affordance (Bottom-Right Floating Pill) */}
      <div className="fixed bottom-8 right-8 z-40 hidden md:flex items-center gap-3 bg-charcoal/95 text-ivory pl-5 pr-2 py-2 rounded-full backdrop-blur-md border border-ivory/15 shadow-2xl transition-all duration-300">
        <a
          href={`tel:${phoneTel}`}
          className="text-xs tracking-[0.18em] text-ivory/80 hover:text-bronze-light transition-colors uppercase font-light mr-2 flex items-center gap-2.5"
          aria-label={`Call GYP Signatures at ${phoneDisplay}`}
        >
          <span className="w-2 h-2 rounded-full bg-bronze animate-pulse" />
          <span>CALL US {phoneDisplay}</span>
        </a>

        <span className="h-4 w-[1px] bg-ivory/20" />

        <button
          onClick={openConsultationModal}
          className="group flex items-center gap-2 bg-bronze hover:bg-bronze-light text-charcoal px-4 py-2 rounded-full text-xs tracking-[0.18em] uppercase font-medium transition-colors cursor-pointer"
          aria-label="Book a private design consultation"
        >
          <span>Consultation</span>
          <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>

      {/* Mobile Refined Contextual Action Bar: CALL · WHATSAPP · CONSULT */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-ivory/95 backdrop-blur-md border-t border-sand/80 px-6 py-2.5 flex items-center justify-between shadow-2xl safe-area-bottom">
        {/* Call Button */}
        <a
          href={`tel:${phoneTel}`}
          className="flex items-center gap-2 p-1.5 text-charcoal hover:text-bronze transition-colors focus:outline-none"
          aria-label={`Call GYP Signatures at ${phoneDisplay}`}
        >
          <svg className="w-4 h-4 text-bronze shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          <span className="text-[0.65rem] tracking-[0.18em] uppercase font-medium">CALL</span>
        </a>

        <span className="h-5 w-[1px] bg-sand" />

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-1.5 text-charcoal hover:text-bronze transition-colors focus:outline-none"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-4 h-4 text-bronze shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.06-1.503-.306-.987-.417-1.748-1.178-2.316-1.928-.277-.367-.626-.957-.626-1.564 0-.616.321-.918.435-1.037.114-.12.249-.149.333-.149.083 0 .166.002.239.006.077.004.18.016.275.244.1.238.341.832.371.893.03.062.05.134.009.215-.04.08-.06.13-.12.2-.06.07-.126.155-.18.208-.06.06-.123.125-.053.245.07.119.312.514.67.832.46.409.849.536.969.596.119.06.189.05.259-.03.07-.08.3-.35.38-.47.08-.12.16-.1.27-.06.11.04.7.33.82.39.12.06.2.09.23.14.03.05.03.5-.114.905z" />
          </svg>
          <span className="text-[0.65rem] tracking-[0.18em] uppercase font-medium">WHATSAPP</span>
        </a>

        <span className="h-5 w-[1px] bg-sand" />

        {/* Consult Button */}
        <button
          onClick={openConsultationModal}
          className="flex items-center gap-2 bg-charcoal text-ivory px-4 py-2 rounded-sm shadow-md hover:bg-bronze transition-colors focus:outline-none cursor-pointer"
          aria-label="Book Consultation"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-bronze-light animate-pulse" />
          <span className="text-[0.65rem] tracking-[0.18em] uppercase font-medium">
            CONSULT
          </span>
        </button>
      </div>
    </>
  );
}
