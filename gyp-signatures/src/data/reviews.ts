export interface ClientStory {
  id: string;
  quote: string;
  city: string;
  state: string;
  customerName?: string;
  customerNameVisible: boolean;
  projectType: string;
  projectYear: string;
  image: string;
  imageAlt: string;
}

export const clientStories: ClientStory[] = [
  {
    id: 'coastal-villa',
    quote:
      'GYP SIGNATURES gave our home a quiet majesty that retail furniture stores simply could not achieve. The dialogue between the fluted walnut walls and the bespoke low-slung seating makes every evening feel like an architectural retreat.',
    city: 'Tirupati District',
    state: 'Andhra Pradesh',
    customerNameVisible: false,
    projectType: 'Complete Villa Interior',
    projectYear: '2026',
    image: '/images/projects/villa.jpg',
    imageAlt: 'Coastal Villa Sanctuary Interior in Tirupati District by GYP Signatures',
  },
  {
    id: 'modern-apartment',
    quote:
      'From the initial space planning to the hand-finished travertine coffee table, P. Gayathri and her team handled our residence with immaculate care. Everything was designed as one harmonious symphony.',
    city: 'Hyderabad',
    state: 'Telangana',
    customerNameVisible: false,
    projectType: 'Residential Curation',
    projectYear: '2026',
    image: '/images/interiors/living-room.jpg',
    imageAlt: 'Modern Executive Residence Living Suite in Hyderabad by GYP Signatures',
  },
  {
    id: 'private-office',
    quote:
      'The executive suite needed to command respect while fostering quiet contemplation. The custom walnut desk and brass detailing executed by GYP SIGNATURES exceeded every expectation.',
    city: 'Srikalahasthi',
    state: 'Andhra Pradesh',
    customerNameVisible: false,
    projectType: 'Executive Suite',
    projectYear: '2026',
    image: '/images/interiors/office.jpg',
    imageAlt: 'Executive Suite Desk & Architectural Bookshelf in Srikalahasthi by GYP Signatures',
  },
];
