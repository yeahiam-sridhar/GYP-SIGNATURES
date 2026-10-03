export interface SignatureOffer {
  id: string;
  editionNumber: string;
  title: string;
  subtitle: string;
  description: string;
  privilege: string;
  discountPercentage?: number;
  highlightText?: string;
  startDate: string; // ISO
  endDate: string; // ISO
  image: string;
  applicableCategories: string[];
  terms: string;
  ctaText: string;
  ctaHref: string;
  active: boolean;
}

export interface HeroSignatureOffer {
  id: string;
  badge: string;
  discount: string;
  title: string;
  subtitle: string;
  description: string;
  privilege: string;
  endDate: string; // ISO format
  ctaText: string;
  expiredTitle: string;
  expiredCtaText: string;
  terms: string;
}

export const heroSignatureOffer: HeroSignatureOffer = {
  id: 'signature-hero-offer',
  badge: 'SIGNATURE OFFER',
  discount: '50% OFF',
  title: 'The GYP Signature Privilege',
  subtitle: 'Limited Curation · Bespoke Spatial Commissions',
  description: 'An exclusive 50% studio privilege on architectural spatial design and custom furniture curation for inaugural residential commissions.',
  privilege: '50% studio privilege applied to comprehensive spatial architecture, bespoke spatial blueprint, and curated interior furnishings.',
  endDate: '2026-10-02T22:30:00Z',
  ctaText: 'Explore Offer',
  expiredTitle: 'Offer ended',
  expiredCtaText: 'Explore GYP SIGNATURES',
  terms: 'Limited inaugural private studio allocations. Applicable to complete residential commissions during the reservation window.',
};

export const signatureOffers: SignatureOffer[] = [
  {
    id: 'inaugural-signature-suite',
    editionNumber: 'EDITION № 01',
    title: 'The Inaugural Architectural Suite',
    subtitle: 'Limited Curation · Selected Living & Dining Elements',
    description: 'In celebration of our new Srikalahasthi design studio, GYP SIGNATURES presents an exclusive architectural curation. Commission a full living or dining space and receive integrated architectural wall paneling and bespoke textile curation as a signature studio privilege.',
    privilege: 'Comprehensive Spatial Blueprint & Curated Textile Curation with Signature Suite Commissions',
    discountPercentage: 20,
    highlightText: 'STUDIO INAUGURAL PRIVILEGE',
    // Set for 14 days from October 1st, 2026 to ensure the live countdown is active and real-time
    startDate: '2026-10-01T00:00:00Z',
    endDate: '2026-10-15T23:59:59Z',
    image: '/images/interiors/living-room.jpg',
    applicableCategories: ['Living Suites', 'Dining Suites', 'Architectural Paneling'],
    terms: 'Applicable to full residential and executive commissions placed during the inaugural window. Subject to production scheduling.',
    ctaText: 'Inquire on This Edition',
    ctaHref: '#consultation',
    active: true,
  },
  {
    id: 'bespoke-walnut-capsule',
    editionNumber: 'EDITION № 02',
    title: 'The Walnut & Travertine Capsule',
    subtitle: 'Artisanal Joinery · Limited Timber Allocations',
    description: 'A private reserve of sustainably harvested American Walnut paired with Roman Travertine. Handcrafted by our master artisans into monolithic coffee tables, dining tables, and low-slung credenzas with hand-beveled brass inlays.',
    privilege: 'Bespoke Custom Dimension Tailoring at Standard Catalog Value',
    discountPercentage: 15,
    highlightText: 'RESERVE TIMBER RELEASE',
    startDate: '2026-10-01T00:00:00Z',
    endDate: '2026-10-20T23:59:59Z',
    image: '/images/products/coffee-table.jpg',
    applicableCategories: ['Custom Coffee Tables', 'Dining Tables', 'Bespoke Credenzas'],
    terms: 'Limited to 8 private residential suites. Verified upon spatial dimension confirmation.',
    ctaText: 'Reserve From Capsule',
    ctaHref: '#consultation',
    active: true,
  },
];

export function getActiveOffers(): SignatureOffer[] {
  const now = new Date().getTime();
  return signatureOffers.filter(offer => {
    if (!offer.active) return false;
    const end = new Date(offer.endDate).getTime();
    return end > now;
  });
}

