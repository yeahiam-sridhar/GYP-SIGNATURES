import Link from 'next/link';
import Image from 'next/image';
import { businessContact } from '@/data/business';

export default function Footer() {
  const { address, openingHours, email, mapsUrl, phoneDisplay, phoneTel, whatsappUrl, instagram, instagramHandle } = businessContact;

  return (
    <footer className="bg-charcoal text-ivory section-padding border-t border-ivory/10 pb-24 md:pb-0">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-6 lg:gap-6 xl:gap-8">
          {/* Brand Column (Span 2 on large screens) */}
          <div className="lg:col-span-2 space-y-4 min-w-0">
            <Link
              href="/"
              className="inline-block mb-2 group focus:outline-none focus:ring-1 focus:ring-bronze/40 rounded-sm"
              aria-label="GYP Signatures home"
            >
              <Image
                src="/images/logo-light.png"
                alt="GYP Signatures Logo"
                width={263}
                height={87}
                className="w-[155px] md:w-[175px] h-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
            </Link>
            <p className="text-xs text-bronze-light font-light tracking-[0.15em] uppercase">
              Interior Design · Furniture · Home Elements · Custom Work
            </p>
            <p className="text-xs text-ivory/50 font-light leading-relaxed max-w-sm">
              An integrated luxury interior studio and bespoke furniture house. We bridge spatial architecture,
              artisanal woodwork, and refined home elements into one continuous signature.
            </p>
            <div className="pt-2">
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-ivory/70 hover:text-bronze-light transition-colors group/ig"
                aria-label={`Follow GYP SIGNATURES on Instagram ${instagramHandle}`}
              >
                <svg className="w-3.5 h-3.5 text-bronze-light shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="tracking-wide">FOLLOW GYP SIGNATURES {instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="min-w-0">
            <h3 className="text-overline text-ivory/50 mb-5 tracking-[0.2em]">Explore</h3>
            <ul className="space-y-2.5">
              {[
                { name: 'About', href: '#about' },
                { name: 'Projects', href: '#projects' },
                { name: 'Furniture', href: '#furniture' },
                { name: 'Home Elements', href: '#home-elements' },
                { name: 'Client Stories', href: '#stories' },
                { name: 'Consultation', href: '#consultation' },
                { name: 'Studio Visit', href: '#studio' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-xs text-ivory/60 font-light hover:text-ivory transition-colors duration-300 tracking-wide"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Studio */}
          <div className="min-w-0">
            <h3 className="text-overline text-ivory/50 mb-5 tracking-[0.2em]">Visit Studio</h3>
            <div className="space-y-3 text-xs text-ivory/60 font-light">
              <div>
                <span className="text-ivory/80 font-normal block mb-0.5">Experience Center</span>
                <p className="leading-relaxed">
                  {address.city}<br />
                  {address.district}, {address.state}<br />
                  {address.country}
                </p>
              </div>
              <div className="pt-2 border-t border-ivory/10">
                <span className="text-ivory/80 font-normal block mb-0.5">Hours</span>
                <p>{openingHours.weekdays}</p>
                <p className="text-ivory/40 text-[0.7rem]">{openingHours.sunday}</p>
              </div>
              <div className="pt-1">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bronze-light hover:underline inline-flex items-center gap-1 text-[0.7rem] uppercase tracking-wider"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Connect */}
          <div className="min-w-0">
            <h3 className="text-overline text-ivory/50 mb-5 tracking-[0.2em]">Connect</h3>
            <div className="space-y-3 text-xs text-ivory/60 font-light">
              <div>
                <span className="text-ivory/80 font-normal block mb-0.5">Telephone</span>
                <a href={`tel:${phoneTel}`} className="text-ivory hover:text-bronze-light font-medium tracking-wide">
                  {phoneDisplay}
                </a>
              </div>
              <div>
                <span className="text-ivory/80 font-normal block mb-0.5">WhatsApp</span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory hover:text-bronze-light tracking-wide inline-flex items-center gap-1"
                >
                  Chat on WhatsApp →
                </a>
              </div>
              <div>
                <span className="text-ivory/80 font-normal block mb-0.5">Instagram</span>
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory hover:text-bronze-light tracking-wide"
                >
                  {instagramHandle}
                </a>
              </div>
              <div>
                <span className="text-ivory/80 font-normal block mb-0.5">Email</span>
                <a
                  href={`mailto:${email}`}
                  className="text-ivory hover:text-bronze-light transition-colors duration-300 break-all"
                >
                  {email}
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-ivory/10">
              <a
                href="#consultation"
                className="w-full max-w-full text-center font-sans font-light text-[0.62rem] tracking-[0.14em] uppercase py-2.5 px-2 border border-ivory/25 text-ivory/90 hover:bg-ivory hover:text-charcoal transition-colors duration-300 block"
              >
                Book Consultation →
              </a>
            </div>
          </div>
        </div>
      </div>


      {/* Bottom bar */}
      <div className="border-t border-ivory/10">
        <div className="max-w-7xl mx-auto py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ivory/40 font-light tracking-wide">
            © {new Date().getFullYear()} {businessContact.brandName}. All rights reserved. Srikalahasthi, Andhra Pradesh.
          </p>
          <div className="flex gap-6">
            <a
              href="#consultation"
              className="text-xs text-ivory/40 font-light tracking-wide hover:text-ivory/70 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#consultation"
              className="text-xs text-ivory/40 font-light tracking-wide hover:text-ivory/70 transition-colors duration-300"
            >
              Bespoke Commission Terms
            </a>
            <a
              href="#faq"
              className="text-xs text-ivory/40 font-light tracking-wide hover:text-ivory/70 transition-colors duration-300"
            >
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
