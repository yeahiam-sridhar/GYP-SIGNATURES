export interface BusinessContact {
  brandName: string;
  legalEntity: string;
  tagline: string;
  concept: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
  whatsappUrl: string;
  whatsappPrefillText: string;
  whatsappHeroUrl: string;
  instagram: string;
  instagramHandle: string;
  instagramDisplay: string;
  address: {
    city: string;
    district: string;
    state: string;
    country: string;
    full: string;
  };
  mapsUrl: string;
  openingHours: {
    weekdays: string;
    sunday: string;
    note: string;
  };
  founder: {
    name: string;
    role: string;
    title: string;
    image: string;
    statement: string;
    bio: string[];
  };
  inspiration: {
    title: string;
    subtitle: string;
    image: string;
    narrative: string[];
    permissionNote?: string;
  };
}

export const businessContact: BusinessContact = {
  brandName: 'GYP SIGNATURES',
  legalEntity: 'GYP Signatures',
  tagline: 'Design · Furnish · Complete',
  concept: 'DESIGN → FURNISH → COMPLETE',
  email: 'gypsignatures@gmail.com',
  // Official Business Contacts
  phone: '+91 9393972660',
  phoneDisplay: '+91 93939 72660',
  phoneTel: '+919393972660',
  whatsapp: '919393972660',
  whatsappUrl: 'https://wa.me/919393972660',
  whatsappPrefillText: 'Hello GYP SIGNATURES, I would like to discuss my space.',
  whatsappHeroUrl:
    'https://wa.me/919393972660?text=Hello%20GYP%20SIGNATURES%2C%20I%20would%20like%20to%20discuss%20my%20space.',
  instagram: 'https://www.instagram.com/gyp_signatures/',
  instagramHandle: '@gyp_signatures',
  instagramDisplay: 'Instagram → @gyp_signatures',
  address: {
    city: 'Srikalahasthi',
    district: 'Tirupati District',
    state: 'Andhra Pradesh',
    country: 'India',
    full: 'Srikalahasthi, Tirupati District, Andhra Pradesh, India',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Srikalahasthi+Tirupati+District+Andhra+Pradesh',
  openingHours: {
    weekdays: '10:00 AM – 7:30 PM (Mon – Sat)',
    sunday: 'By Private Appointment',
    note: 'Private architectural consultations available on advance booking',
  },
  founder: {
    name: 'P. Gayathri',
    role: 'Founder & CEO',
    title: 'Founder & Creative Director',
    image: '/images/founder2.0.jpeg',
    statement: 'A home is not an accumulation of disparate furniture pieces — it is a cohesive living sanctuary where architecture, bespoke craftsmanship, and everyday rituals align seamlessly.',
    bio: [
      'P. Gayathri founded GYP SIGNATURES with a singular conviction: that discerning homeowners deserve spaces designed as unified compositions rather than piecemeal arrangements.',
      'Recognizing the divide between generic furniture retailers and detached interior planning, she established an integrated design house in Andhra Pradesh that unites spatial architecture, artisanal woodworking, hand-selected materials, and bespoke home elements under one continuous signature.',
      'Under her leadership, GYP SIGNATURES serves as a complete collaborative partner — walking alongside clients from initial conceptual sketches to the final placed artifact.',
    ],
  },
  inspiration: {
    title: 'THE INSPIRATION',
    subtitle: 'Every signature begins with an enduring influence.',
    image: '/images/inspiration.jpg',
    narrative: [
      'Behind the ambition and architectural discipline of GYP SIGNATURES stands a guiding mentor whose unwavering vision, high standards, and persistent encouragement shaped the very foundation of this studio.',
      'He demonstrated that true luxury is never about ostentation; it is about uncompromised integrity of craft, devotion to detail, and the courage to build something of lasting permanence.',
      'His journey and perspective continue to inform the values of GYP SIGNATURES — treating every space as a legacy and every design decision as a mark of respect for the people who will live within it.',
    ],
    permissionNote: 'Photograph and tribute included in alignment with founder guidance. Archival reference.',
  },
};

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const businessFaqs: FaqItem[] = [
  {
    category: 'Services',
    question: 'What does GYP SIGNATURES offer?',
    answer: 'GYP SIGNATURES is a comprehensive luxury interior studio and bespoke furniture house. We bridge interior spatial planning, custom furniture manufacturing, architectural home elements (doors, paneling, built-ins), and curated styling into one complete, cohesive experience: Design → Furnish → Complete.',
  },
  {
    category: 'Services',
    question: 'Do you provide complete interior design from concept to completion?',
    answer: 'Yes. Our complete interior service covers space planning, 3D visualization, material selection, lighting layouts, custom carpentry, loose furniture curation, textiles, and on-site implementation.',
  },
  {
    category: 'Customization',
    question: 'Can furniture pieces be customized to our exact dimensions and finishes?',
    answer: 'Every piece in our signature collection can be customized. We tailor dimensions, timber selection (Walnut, Teak, White Oak), upholstery textiles (Bouclé, Linens, Velvet), Italian marble tops, and metal finishes (Brushed Brass, Antique Bronze) to suit your floor plan.',
  },
  {
    category: 'Home Elements',
    question: 'What are "Home Elements" at GYP SIGNATURES?',
    answer: 'Home Elements encompass the architectural details that tie a room together: bespoke entrance doors, fluted wall paneling, modular wardrobes, ceiling transitions, architectural lighting fixtures, curated artwork, and bespoke drapery.',
  },
  {
    category: 'Studio',
    question: 'Can I visit the GYP SIGNATURES studio in person?',
    answer: 'Yes. We welcome private visits to our experience studio in Srikalahasthi, Tirupati District, Andhra Pradesh. Here you can touch our material samples, examine furniture joinery firsthand, and discuss your blueprints with our design team. Private appointments are recommended for dedicated design time.',
  },
  {
    category: 'Consultation',
    question: 'How does a design consultation work?',
    answer: 'You can request a consultation via our website or by contacting our team. We review your floor plans, lifestyle requirements, aesthetic aspirations, and timeline. Our senior design team then prepares a bespoke spatial concept, material moodboard, and transparent project estimate.',
  },
  {
    category: 'Consultation',
    question: 'How can I request a quotation or project estimate?',
    answer: 'Simply click "Book a Consultation" on the navigation bar, choose your project type (Interior Design, Furniture, or Complete Home), and share your initial space details. You can also reach our team directly at gypsignatures@gmail.com.',
  },
  {
    category: 'Projects',
    question: 'Do you work on residential and commercial projects?',
    answer: 'Yes. While private villas, luxury apartments, and penthouses comprise our core residential work, we also design executive offices, boutique hospitality lounges, and private executive boardrooms requiring bespoke craftsmanship.',
  },
  {
    category: 'Geography',
    question: 'Which locations does GYP SIGNATURES serve?',
    answer: 'Based in Srikalahasthi (Tirupati District, Andhra Pradesh), our design consultancy and bespoke furniture deliveries cater across Andhra Pradesh, Telangana (Hyderabad), Karnataka (Bangalore), Tamil Nadu (Chennai), and pan-India upon project review.',
  },
  {
    category: 'Contact',
    question: 'How can I get in touch with GYP SIGNATURES right now?',
    answer: 'You can reach us directly by calling +91 93939 72660, chatting on WhatsApp at wa.me/919393972660, writing to gypsignatures@gmail.com, following our latest works on Instagram @gyp_signatures, or visiting our experience studio in Srikalahasthi.',
  },
];

import { clientStories, ClientStory } from './reviews';

export { clientStories, type ClientStory };

export interface Testimonial {
  id: string;
  quote: string;
  client: string;
  location: string;
  projectType: string;
  year: string;
}

export const clientTestimonials: Testimonial[] = clientStories.map((story) => ({
  id: story.id,
  quote: story.quote,
  client: story.customerNameVisible && story.customerName ? story.customerName : story.city,
  location: `${story.city}, ${story.state}`,
  projectType: story.projectType,
  year: story.projectYear,
}));

export const businessInfo = businessContact;


