// Single source of truth for the business facts used in the page, the JSON-LD
// schema and /llms.txt. Keep this identical to the Google Business Profile.
//
// Sources (checked 8 Nov 2026):
// - Name, address, phone, website, coordinates, rating: Google Business Profile
//   (kgmid /g/11js961ln_, Maps place 0x31752fb6fbead7bd:0xe32cc11c602f12aa).
// - Room count, check-in/out, monthly rates, airport transfer on request: owner.
// - Airport transfer price: set from market rates (Grab/taxi 150k–280k VND,
//   pre-booked private cars ~USD 12–22). Owner can change it here.

export const SITE_URL = 'https://mystay.mywaytravel.com';

export const business = {
  name: 'My Stay Hotel & Apartment',
  alternateNames: ['My Stay Apartment', 'My Stay & Apartment'],
  shortDescription:
    'Serviced rooms and apartments with private kitchens on a quiet alley off Nguyễn Cư Trinh Street, District 1 (now Cầu Ông Lãnh Ward), Ho Chi Minh City. 10 rooms, nightly or monthly stays.',
  numberOfRooms: 10,
  phone: '+84 988 600 388',
  phoneE164: '+84988600388',
  whatsappUrl: 'https://wa.me/84988600388',
  email: 'mywayapt@gmail.com',
  address: {
    street: '139/5 Nguyễn Cư Trinh',
    ward: 'Cầu Ông Lãnh Ward',
    formerDistrict: 'District 1',
    city: 'Ho Chi Minh City',
    postalCode: '70000',
    country: 'VN',
    display: '139/5 Nguyễn Cư Trinh, Cầu Ông Lãnh Ward (former District 1), Ho Chi Minh City 70000, Vietnam',
  },
  geo: { latitude: 10.763256, longitude: 106.6888372 },
  mapsUrl: 'https://maps.google.com/?cid=16369671073201853098',
  sameAs: [
    'https://maps.google.com/?cid=16369671073201853098',
    'https://www.booking.com/hotel/vn/my-way.html',
    'https://www.tripadvisor.com/Hotel_Review-g293925-d25231307-Reviews-My_Stay_Hotel_Apartment-Ho_Chi_Minh_City.html',
    'https://www.trip.com/hotels/ho-chi-minh-city-hotel-detail-114221303/my-stay-hotel-apartment/',
    'https://www.traveloka.com/en-ph/hotel/vietnam/my-stay-hotel--apartment-9000008222356',
  ],
  policies: {
    checkIn: 'Check-in is available any time until midnight (00:00). We cannot accept arrivals after midnight.',
    checkOut: 'Check-out is at 12:00 noon. A later check-out may be possible on request when the room is not booked by the next guest.',
    checkoutTime: '12:00',
  },
  airportTransfer: {
    note: 'Private car between Tan Son Nhat Airport (SGN) and the hotel, arranged on request. Please send your flight number in advance.',
    car4: '250,000',
    car7: '350,000',
    currency: 'VND',
  },
  monthly: {
    smallFrom: '13,000,000',
    largeFrom: '16,000,000',
    currency: 'VND',
    note: 'Monthly stays: smaller rooms from 13,000,000 VND per month, larger rooms and apartments from 16,000,000 VND per month. Contact us for availability and what is included.',
  },
  directDiscount: 'Book directly with us (website form or WhatsApp) for 10% off.',
  ratings: {
    asOf: 'November 2026',
    google: { value: '4.9', best: '5', count: 264 },
    booking: { value: '9.1', best: '10', count: 176 },
  },
} as const;

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: 'Where is My Stay Hotel & Apartment?',
    a: `At ${business.address.display}, on a quiet alley off Nguyễn Cư Trinh Street in the former District 1 of Ho Chi Minh City (Saigon).`,
  },
  {
    q: 'What time is check-in and check-out?',
    a: `${business.policies.checkIn} ${business.policies.checkOut}`,
  },
  {
    q: 'Do you offer airport pick-up?',
    a: `Yes, on request. ${business.airportTransfer.note} 4-seat car: ${business.airportTransfer.car4} VND per trip; 7-seat car: ${business.airportTransfer.car7} VND per trip.`,
  },
  {
    q: 'Can I rent a room or apartment by the month?',
    a: business.monthly.note,
  },
  {
    q: 'How many rooms are there and do they have kitchens?',
    a: `There are ${business.numberOfRooms} rooms and apartments, from 30 m² double rooms and studios to a 65 m² two-bedroom apartment. Every room type has its own kitchen or kitchenette, air conditioning and free Wi-Fi. The whole property can also be booked as a private house for groups.`,
  },
  {
    q: 'How do I get the direct booking discount?',
    a: `${business.directDiscount} Send the booking form on this page, WhatsApp ${business.phone} or email ${business.email}.`,
  },
];
