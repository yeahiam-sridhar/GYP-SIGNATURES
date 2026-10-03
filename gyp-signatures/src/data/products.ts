export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  room: string;
  description: string;
  material: string;
  finish: string;
  dimensions?: string;
  price?: string;
  enquiry: boolean;
  customizable: boolean;
  image: string;
  imageAlt?: string;
  style: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  subcategories: string[];
  image: string;
}

export const categories: Category[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    description: 'Curated pieces for refined living spaces',
    subcategories: ['Sofas', 'Lounge Chairs', 'Accent Chairs', 'Coffee Tables', 'Side Tables', 'Console Tables', 'Benches', 'Storage', 'Bookshelves'],
    image: '/images/interiors/living-room.jpg',
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    description: 'Elegant elements for restful sanctuaries',
    subcategories: ['Beds', 'Bedside Tables', 'Storage', 'Wardrobes', 'Benches'],
    image: '/images/interiors/bedroom.jpg',
  },
  {
    id: 'dining',
    name: 'Dining',
    description: 'Refined settings for memorable gatherings',
    subcategories: ['Dining Tables', 'Dining Chairs', 'Dining Benches', 'Dining Banquettes', 'Crockery Units', 'Bar Units'],
    image: '/images/interiors/dining.jpg',
  },
  {
    id: 'seating',
    name: 'Seating',
    description: 'Sculptural comfort for every space',
    subcategories: ['Sofas', 'Chairs', 'Lounge Seating', 'Office Chairs', 'Accent Seating'],
    image: '/images/interiors/living-room.jpg',
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Essential pieces to complete your vision',
    subcategories: ['Tables', 'Storage', 'Cabinets', 'Consoles', 'Custom Furniture'],
    image: '/images/interiors/office.jpg',
  },
];

export const products: Product[] = [
  {
    id: 'aura-sectional',
    name: 'Aura Sectional',
    category: 'living-room',
    subcategory: 'Sofas',
    room: 'Living Room',
    description: 'A generous modular sectional in ivory bouclé with solid walnut base. Designed for expansive living spaces where comfort meets sculptural form.',
    material: 'Bouclé fabric, solid walnut',
    finish: 'Natural walnut, ivory bouclé',
    dimensions: 'W 320 × D 180 × H 72 cm',
    enquiry: true,
    customizable: true,
    image: '/images/products/sofa.jpg',
    style: 'Contemporary',
  },
  {
    id: 'elara-dining-chair',
    name: 'Elara Dining Chair',
    category: 'dining',
    subcategory: 'Dining Chairs',
    room: 'Dining',
    description: 'An elegant dining chair combining cream leather with sculpted walnut. The curved backrest provides ergonomic support with visual lightness.',
    material: 'Full-grain leather, solid walnut',
    finish: 'Oiled walnut, cream leather',
    dimensions: 'W 52 × D 56 × H 82 cm',
    enquiry: true,
    customizable: true,
    image: '/images/products/dining-chair.jpg',
    style: 'Contemporary',
  },
  {
    id: 'terra-coffee-table',
    name: 'Terra Coffee Table',
    category: 'living-room',
    subcategory: 'Coffee Tables',
    room: 'Living Room',
    description: 'Natural travertine stone top resting on a sculpted walnut base. Each stone surface carries unique veining, making every piece one of a kind.',
    material: 'Travertine stone, solid walnut',
    finish: 'Honed travertine, oiled walnut',
    dimensions: 'W 100 × D 100 × H 35 cm',
    enquiry: true,
    customizable: true,
    image: '/images/products/coffee-table.jpg',
    style: 'Organic Modern',
  },
  {
    id: 'haven-platform-bed',
    name: 'Haven Platform Bed',
    category: 'bedroom',
    subcategory: 'Beds',
    room: 'Bedroom',
    description: 'A walnut platform bed with gently curved headboard. Clean lines and warm wood grain create a restful centrepiece for the bedroom.',
    material: 'Solid walnut',
    finish: 'Natural oiled walnut',
    dimensions: 'W 180 × D 220 × H 95 cm (King)',
    enquiry: true,
    customizable: true,
    image: '/images/products/bed.jpg',
    style: 'Contemporary',
  },
  {
    id: 'noma-lounge-chair',
    name: 'Noma Lounge Chair',
    category: 'living-room',
    subcategory: 'Lounge Chairs',
    room: 'Living Room',
    description: 'A sculptural lounge chair wrapped in taupe bouclé with an exposed walnut frame. Designed for quiet moments and considered spaces.',
    material: 'Bouclé fabric, solid walnut',
    finish: 'Oiled walnut, taupe bouclé',
    dimensions: 'W 76 × D 82 × H 92 cm',
    enquiry: true,
    customizable: true,
    image: '/images/products/lounge-chair.jpg',
    style: 'Mid-Century Modern',
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.category === categoryId);
}

export function getProductsByRoom(room: string): Product[] {
  return products.filter(p => p.room.toLowerCase() === room.toLowerCase());
}
