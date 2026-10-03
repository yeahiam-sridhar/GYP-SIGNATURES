export interface Project {
  id: string;
  name: string;
  location: string;
  spaceType: string;
  description: string;
  concept: string;
  designApproach: string;
  materials: string[];
  furniturePieces: string[];
  customElements: string[];
  image: string;
  images: string[];
}

export const projects: Project[] = [
  {
    id: 'coastal-villa',
    name: 'Coastal Villa Sanctuary',
    location: 'Tirupati District, Andhra Pradesh',
    spaceType: 'Private Luxury Villa',
    description: 'A complete interior transformation where warm American walnut, Roman travertine, and ivory textiles create a cohesive dialogue between indoor sanctuary and natural light.',
    concept: 'Seamless indoor living with organic materials. Each room connects through a continuous material palette while asserting its own spatial intimacy.',
    designApproach: 'Monolithic travertine centerpieces grounded by low-profile seating and floor-to-ceiling fluted timber paneling.',
    materials: ['American Walnut', 'Roman Travertine', 'Textured Bouclé', 'Brushed Brass', 'Raw Linen'],
    furniturePieces: ['Low-profile modular sofa', 'Monolithic travertine coffee table', 'Sculpted walnut dining suite', 'Bespoke floating nightstands'],
    customElements: ['Fluted walnut architectural divider', 'Integrated ambient cove lighting', 'Concealed storage wardrobes', 'Custom bronze entry hardware'],
    image: '/images/projects/villa.jpg',
    images: ['/images/projects/villa.jpg', '/images/interiors/living-room.jpg', '/images/interiors/dining.jpg'],
  },
  {
    id: 'modern-residence',
    name: 'Modern Executive Residence',
    location: 'Hyderabad, Telangana',
    spaceType: 'Urban Penthouse Residence',
    description: 'A thoughtfully unified residence where every element — from custom joinery to curated art lighting — was conceived as part of a single interior narrative.',
    concept: 'Contemporary warmth through layered textures and a restrained palette of dark walnut, honed marble, and artisanal brass accents.',
    designApproach: 'Open-concept spatial zoning using architectural ceiling drops and bespoke cabinetry rather than rigid walls.',
    materials: ['Smoked Oak', 'Indian Green Marble', 'Full-Grain Leather', 'Patinated Bronze', 'Wool Blend'],
    furniturePieces: ['Curved sectional sofa', 'Honed marble credenza', 'High-back ergonomic lounge chair', 'Minimalist bedframe'],
    customElements: ['Full-height fluted wall cladding', 'Built-in media library with brass inlays', 'Walk-in master wardrobe suite'],
    image: '/images/interiors/living-room.jpg',
    images: ['/images/interiors/living-room.jpg', '/images/interiors/bedroom.jpg', '/images/interiors/kitchen.jpg'],
  },
  {
    id: 'private-office',
    name: 'Private Executive Suite',
    location: 'Srikalahasthi, Andhra Pradesh',
    spaceType: 'Private Executive Workspace',
    description: 'An executive suite designed to inspire focused contemplation within an atmosphere of architectural dignity and tactile comfort.',
    concept: 'Productive elegance — balancing boardroom presence with residential warmth and acoustic softness.',
    designApproach: 'Custom solid walnut desk with integrated concealed power channels, framed by acoustic fabric walls and directional mood illumination.',
    materials: ['Solid Walnut', 'Saddle Leather', 'Antique Brass', 'Granite', 'Acoustic Linen'],
    furniturePieces: ['Handcrafted executive desk', 'Leather guest armchairs', 'Monolithic side credenza'],
    customElements: ['Floor-to-ceiling architectural bookshelf', 'Concealed acoustic wall treatment', 'Custom bronze door handles'],
    image: '/images/interiors/office.jpg',
    images: ['/images/interiors/office.jpg'],
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export interface Room {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const rooms: Room[] = [
  { id: 'living-room', name: 'Living Room', description: 'Where conversations happen and life unfolds', image: '/images/interiors/living-room.jpg' },
  { id: 'bedroom', name: 'Bedroom', description: 'A sanctuary designed for rest and renewal', image: '/images/interiors/bedroom.jpg' },
  { id: 'dining', name: 'Dining', description: 'Spaces crafted for gathering and celebration', image: '/images/interiors/dining.jpg' },
  { id: 'kitchen', name: 'Kitchen', description: 'The heart of the home, designed with purpose', image: '/images/interiors/kitchen.jpg' },
  { id: 'office', name: 'Office', description: 'Inspiring environments for focused work', image: '/images/interiors/office.jpg' },
];

export interface Service {
  id: string;
  name: string;
  description: string;
}

export const interiorServices: Service[] = [
  { id: 'space-planning', name: 'Space Planning', description: 'Thoughtful spatial organization that defines how you live within your home' },
  { id: 'interior-concepts', name: 'Interior Concepts', description: 'Complete design visions that unite materials, colors, and furnishings' },
  { id: 'furniture-selection', name: 'Furniture Selection', description: 'Curated furniture choices aligned with your interior narrative' },
  { id: 'materials', name: 'Materials & Finishes', description: 'Carefully selected materials that bring warmth and character to every surface' },
  { id: 'lighting', name: 'Lighting Design', description: 'Lighting considerations that shape atmosphere and highlight architecture' },
  { id: 'textiles', name: 'Curtains & Textiles', description: 'Fabric selections that soften spaces and add layers of comfort' },
  { id: 'wall-treatments', name: 'Wall Treatments', description: 'Painted finishes, panels, and treatments that define interior character' },
  { id: 'storage', name: 'Storage Solutions', description: 'Intelligent storage that maintains visual harmony while maximizing function' },
  { id: 'custom-elements', name: 'Custom Elements', description: 'Bespoke details designed specifically for your space' },
];

export interface HomeElement {
  id: string;
  name: string;
  description: string;
}

export const homeElements: HomeElement[] = [
  { id: 'doors', name: 'Doors', description: 'Crafted doors that define transitions between spaces' },
  { id: 'windows', name: 'Windows', description: 'Window solutions that frame views and invite light' },
  { id: 'cupboards', name: 'Cupboards', description: 'Built-in storage designed to complement your interiors' },
  { id: 'wardrobes', name: 'Wardrobes', description: 'Bespoke wardrobe systems tailored to your space' },
  { id: 'wall-painting', name: 'Wall Painting', description: 'Professional finishes that set the tone for every room' },
  { id: 'wall-panels', name: 'Wall Panels', description: 'Architectural paneling that adds depth and character' },
  { id: 'artwork', name: 'Artwork', description: 'Curated art selections that elevate interior compositions' },
  { id: 'curtains', name: 'Curtains', description: 'Textile solutions that soften and complete your spaces' },
  { id: 'decorative', name: 'Decorative Elements', description: 'Finishing touches that make a space uniquely yours' },
];

export interface MaterialInfo {
  id: string;
  name: string;
  description: string;
}

export const materials: MaterialInfo[] = [
  { id: 'wood', name: 'Wood', description: 'Selected hardwoods with distinctive grain and warmth' },
  { id: 'stone', name: 'Stone', description: 'Natural stone surfaces with unique character' },
  { id: 'fabric', name: 'Fabric', description: 'Luxury textiles chosen for texture and longevity' },
  { id: 'leather', name: 'Leather', description: 'Full-grain leather that ages with beauty' },
  { id: 'metal', name: 'Metal', description: 'Brushed brass, bronze, and steel accents' },
  { id: 'glass', name: 'Glass', description: 'Crystal-clear and tinted glass for light and transparency' },
];

export const designProcess = [
  { step: 1, name: 'Discover', description: 'We listen. Understanding your vision, lifestyle, and the spaces you inhabit.' },
  { step: 2, name: 'Consult', description: 'A conversation about possibilities — materials, styles, and the character of your space.' },
  { step: 3, name: 'Design', description: 'Creating the complete interior concept. Every element considered, every detail intentional.' },
  { step: 4, name: 'Select', description: 'Curating the furniture, materials, and elements that bring the design to life.' },
  { step: 5, name: 'Customize', description: 'Tailoring each piece to your exact specifications. Made for your space, not anyone else\'s.' },
  { step: 6, name: 'Execute', description: 'Expert implementation from concept to completion. Quality at every stage.' },
  { step: 7, name: 'Complete', description: 'Your signature space — designed, furnished, and completed.' },
];
