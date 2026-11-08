import roomsJson from './rooms.json';
import { business, faqs, SITE_URL } from './business';
import type { AppData } from './roomsData';

const data = roomsJson as AppData;
const toNumber = (v: string) => Number(v.replace(/[^\d]/g, ''));

const HOTEL_ID = `${SITE_URL}/#hotel`;

function roomNodes() {
  return data.rooms.map((room) => {
    const node: Record<string, unknown> = {
      '@type': room.isContactPrice ? 'Accommodation' : room.title.includes('Apartment') ? 'Apartment' : 'HotelRoom',
      name: room.title,
      description: `${room.subtitle}. ${room.beds}.`,
      floorSize: room.size,
      occupancy: { '@type': 'QuantitativeValue', maxValue: room.maxPersons },
      amenityFeature: room.features.map((f) => ({ '@type': 'LocationFeatureSpecification', name: f, value: true })),
      containedInPlace: { '@id': HOTEL_ID },
    };
    if (!room.isContactPrice) {
      node.offers = {
        '@type': 'Offer',
        url: `${SITE_URL}/#book-direct`,
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: toNumber(room.price),
          priceCurrency: 'VND',
          unitText: 'night',
        },
        description: `From price per night, ${room.seasonPeriod ?? ''}`.trim(),
      };
    }
    return node;
  });
}

export function buildJsonLd() {
  const nightly = data.rooms.filter((r) => !r.isContactPrice).map((r) => toNumber(r.price));
  const min = Math.min(...nightly).toLocaleString('en-US');
  const max = Math.max(...nightly).toLocaleString('en-US');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: business.name,
        inLanguage: 'en',
        publisher: { '@id': HOTEL_ID },
      },
      {
        '@type': 'Hotel',
        '@id': HOTEL_ID,
        name: business.name,
        alternateName: business.alternateNames,
        description: business.shortDescription,
        url: SITE_URL,
        telephone: business.phoneE164,
        email: business.email,
        image: [`${SITE_URL}/images/apartment_balcony/img_1183.jpg`, `${SITE_URL}/images/two_bedrooms/two_bedroom_suite.jpg`],
        address: {
          '@type': 'PostalAddress',
          streetAddress: business.address.street,
          addressLocality: business.address.ward,
          addressRegion: business.address.city,
          postalCode: business.address.postalCode,
          addressCountry: business.address.country,
        },
        geo: { '@type': 'GeoCoordinates', ...business.geo },
        hasMap: business.mapsUrl,
        sameAs: business.sameAs,
        numberOfRooms: business.numberOfRooms,
        checkoutTime: business.policies.checkoutTime,
        currenciesAccepted: 'VND',
        priceRange: `${min} – ${max} VND per night`,
        amenityFeature: [
          'Free Wi-Fi',
          'Air conditioning',
          'Private kitchen or kitchenette in every room type',
          'Airport transfer on request (paid)',
          'Monthly stays available',
        ].map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
        containsPlace: roomNodes(),
        makesOffer: [
          {
            '@type': 'Offer',
            name: 'Airport transfer, 4-seat car',
            description: business.airportTransfer.note,
            priceSpecification: { '@type': 'PriceSpecification', price: toNumber(business.airportTransfer.car4), priceCurrency: 'VND' },
          },
          {
            '@type': 'Offer',
            name: 'Airport transfer, 7-seat car',
            description: business.airportTransfer.note,
            priceSpecification: { '@type': 'PriceSpecification', price: toNumber(business.airportTransfer.car7), priceCurrency: 'VND' },
          },
          {
            '@type': 'Offer',
            name: 'Monthly stay',
            description: business.monthly.note,
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              minPrice: toNumber(business.monthly.smallFrom),
              priceCurrency: 'VND',
              unitText: 'month',
            },
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}
