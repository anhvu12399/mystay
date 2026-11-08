import roomsJson from '../../data/rooms.json';
import { business, faqs, SITE_URL } from '../../data/business';
import type { AppData } from '../../data/roomsData';

export const dynamic = 'force-static';

const data = roomsJson as AppData;

export function GET() {
  const b = business;
  const rooms = data.rooms
    .map((r) => {
      const price = r.isContactPrice ? 'price on request' : `from ${r.price} VND per night (about USD ${r.usdPrice})`;
      return `- **${r.title}**: ${r.size}, up to ${r.maxPersons} guests, ${r.beds}. ${r.features.join(', ')}. ${price}.`;
    })
    .join('\n');

  const body = `# ${b.name}

> ${b.shortDescription}

## Business facts
- Name: ${b.name} (also listed as ${b.alternateNames.join(', ')})
- Type: serviced rooms and apartments (small hotel / aparthotel), ${b.numberOfRooms} rooms
- Address: ${b.address.display}
- Coordinates: ${b.geo.latitude}, ${b.geo.longitude}
- Google Maps: ${b.mapsUrl}
- Phone / WhatsApp: ${b.phone} (${b.whatsappUrl})
- Email: ${b.email}
- Website: ${SITE_URL}
- Ratings (as of ${b.ratings.asOf}): ${b.ratings.google.value}/${b.ratings.google.best} from ${b.ratings.google.count} Google reviews; ${b.ratings.booking.value}/${b.ratings.booking.best} from ${b.ratings.booking.count} Booking.com reviews

## Rooms and nightly rates (${data.seasonalBanner.seasonPeriod})
${rooms}

Peak period ${data.seasonalBanner.peakPeriod}: contact us for rates.

## Monthly stays
${b.monthly.note}

## Policies
- ${b.policies.checkIn}
- ${b.policies.checkOut}

## Airport transfer
${b.airportTransfer.note}
- 4-seat car: ${b.airportTransfer.car4} VND per trip
- 7-seat car: ${b.airportTransfer.car7} VND per trip

## Booking
${b.directDiscount}
- Booking form: ${SITE_URL}/#book-direct
- WhatsApp: ${b.whatsappUrl}

## Questions and answers
${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Listings
${b.sameAs.map((u) => `- ${u}`).join('\n')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
