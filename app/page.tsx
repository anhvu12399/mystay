"use client";
import React, { useState, useEffect } from 'react';
import { User, Maximize, MapPin, Star, Menu, X, ArrowRight, Smile, Frown } from 'lucide-react';
import RoomModal from '../components/RoomModal';

const rooms = [
  {
    id: 1,
    title: 'Deluxe Double Room',
    subtitle: '1 adult + 1 child',
    beds: '1 extra-large double bed and 1 sofa bed',
    size: '30 m²',
    price: '1,000,000',
    originalPrice: '1,000,000',
    image: 'https://q-xx.bstatic.com/xdata/images/hotel/840x460/676916728.jpg?k=fd6882e0a2af07e107f5526cc798fae525cf39211205720d5ba3dee804519aef&o=&s=1024x',
    images: [
      'https://q-xx.bstatic.com/xdata/images/hotel/840x460/676916728.jpg?k=fd6882e0a2af07e107f5526cc798fae525cf39211205720d5ba3dee804519aef&o=&s=1024x',
      'https://q-xx.bstatic.com/xdata/images/hotel/840x460/733150354.jpg?k=a17f2a098a33db4c5c137268fa3f5d4a12e8d4f8f0e921f759eeccbfc4308fa6&o=&s=1024x',
      'https://q-xx.bstatic.com/xdata/images/hotel/840x460/676916722.jpg?k=2f3f8ec804263fc726b4c8a5cfc5eb9bdc626ff23cb668578d9d99dd974beff4&o=&s=1024x',
      'https://q-xx.bstatic.com/xdata/images/hotel/840x460/733150352.jpg?k=4db5b577bc5e63d9c21a1bc374bf29e1cb686d564dae74935ee135016c25bfe9&o=&s=1024x',
      'https://q-xx.bstatic.com/xdata/images/hotel/840x460/733150353.jpg?k=3123eaa06ba214741e76aa4d69e2e3e8e9ed3f7bd90b35ef137e81effe67cb40&o=&s=1024x',
      'https://q-xx.bstatic.com/xdata/images/hotel/840x460/676916717.jpg?k=9efc582a838238563392ce882027c0cdf10623a8eb4e7a8bdf29d7f695e8b1df&o=&s=1024x',
      'https://q-xx.bstatic.com/xdata/images/hotel/840x460/411164263.jpg?k=dd11ec0eb0b12d76f3c051ff5ec2592fbd8c24690e1ee6b929292d75432863d6&o=&s=1024x',
      'https://q-xx.bstatic.com/xdata/images/hotel/840x460/733150349.jpg?k=131f1416d941f89bcf08b50fea3f1f46888ae805c36a18430f33bbe6022e2b6f&o=&s=1024x'
    ],
    features: ['Private kitchen', 'Private bathroom', 'View', 'Air conditioning', 'Flat-screen TV', 'Free WiFi'],
    amenities: {
      kitchen: ['Refrigerator', 'Kitchenware', 'Outdoor furniture', 'Toaster', 'Microwave', 'Minibar', 'Oven', 'Dining table'],
      bathroom: ['Bath', 'Free toiletries', 'Shower', 'Sauna', 'Toilet', 'Slippers', 'Hairdryer', 'Additional toilet', 'Toilet paper'],
      view: ['City view', 'Balcony'],
      facilities: ['Air conditioning', 'Flat-screen TV', 'Free WiFi', 'Desk', 'Hardwood floors']
    },
    maxPersons: 2,
    badge: 'Popular',
  },
  {
    id: 2,
    title: 'Apartment with Balcony',
    subtitle: 'Bedroom 1: 1 extra-large double bed | Living room: 1 sofa bed',
    beds: 'Entire apartment',
    size: '45 m²',
    price: '2,300,000',
    originalPrice: '2,300,000',
    image: 'https://pix8.agoda.net/hotelImages/71131100/0/16c477e3dbd696bfa57fb9247b2efaf1.jpeg?ce=2&s=1024x768',
    images: [
      'https://pix8.agoda.net/hotelImages/71131100/0/16c477e3dbd696bfa57fb9247b2efaf1.jpeg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048001/1abd20010e503d4d000aa308fd0a1623.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048001/3d298b3c4dac4dbef4d107f71288c97d.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048001/096d6398b18e599c6e1e962d92d5dab3.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048001/6336496a034378dc06dba12f992550be.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048001/e225c3f0969f7bdfb9ab1a1eedb18b20.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048001/c79fe22335b8bce571d54f53679d7677.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048001/c3789b92b7bd97260ff735872c03d852.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048001/33918d9d48aaba8eda70776dc9268e7b.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048001/c50a3d0264f23fd646ae9b3e5cb6cefc.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048001/78ae73cae4d70b96300a9b22141662c2.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048000/1abd20010e503d4d000aa308fd0a1623.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048000/096d6398b18e599c6e1e962d92d5dab3.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048000/6336496a034378dc06dba12f992550be.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048000/9ee0971281692360a8bdc48e51357825.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048000/5f3a490d13f783b1fdff4df54816091c.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048000/e225c3f0969f7bdfb9ab1a1eedb18b20.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048000/0795f10b722f24d3eee21f960753e5d9.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048000/c3789b92b7bd97260ff735872c03d852.jpg?ce=2&s=1024x768',
      'https://pix8.agoda.net/hotelImages/71131100/1129048000/33918d9d48aaba8eda70776dc9268e7b.jpg?ce=2&s=1024x768'
    ],
    features: ['Private kitchen', 'Ensuite bathroom', 'Balcony', 'View', 'Air conditioning', 'Terrace', 'Free WiFi'],
    amenities: {
      kitchen: ['Refrigerator', 'Kitchenware', 'Outdoor furniture', 'Toaster', 'Microwave', 'Minibar', 'Oven', 'Dining table', 'Stovetop'],
      bathroom: ['Bath', 'Free toiletries', 'Shower', 'Toilet', 'Slippers', 'Hairdryer', 'Additional toilet', 'Toilet paper'],
      view: ['City view', 'Balcony', 'Terrace'],
      facilities: ['Air conditioning', 'Flat-screen TV', 'Free WiFi', 'Desk', 'Hardwood floors', 'Seating area']
    },
    maxPersons: 2,
    badge: 'Premium',
  },
  {
    id: 4,
    title: 'Studio with Balcony',
    subtitle: '1 extra-large double bed',
    beds: 'Entire studio',
    size: '30 m²',
    price: '2,300,000',
    originalPrice: '2,300,000',
    image: '/studio_balcony_1779102172037.png',
    images: [
      '/studio_balcony_1779102172037.png',
      '/apartment_balcony_1779102155333.png',
      '/deluxe_double_room_1779102139673.png',
      'https://pix8.agoda.net/hotelImages/71131100/0/16c477e3dbd696bfa57fb9247b2efaf1.jpeg?ce=2&s=1024x768'
    ],
    features: ['Private kitchen', 'Private bathroom', 'Balcony', 'View', 'Air conditioning', 'Free WiFi'],
    amenities: {
      kitchen: ['Refrigerator', 'Kitchenware', 'Outdoor furniture', 'Microwave', 'Minibar'],
      bathroom: ['Shower', 'Toilet', 'Slippers', 'Hairdryer', 'Toilet paper', 'Free toiletries'],
      view: ['City view', 'Balcony'],
      facilities: ['Air conditioning', 'Flat-screen TV', 'Free WiFi', 'Desk', 'Hardwood floors']
    },
    maxPersons: 2,
  }
];

const reviews = [
  {
    id: 1,
    author: 'Paolo',
    country: 'United States',
    rating: 10,
    date: '18 March 2026',
    title: 'Great stay, very kind host, centrally located',
    positive: 'Location is great and the owner is very friendly. Rooms look exactly the way they do from the photos.',
    negative: 'It was a great stay'
  },
  {
    id: 2,
    author: 'Luisa',
    country: 'Canada',
    rating: 10,
    date: '14 March 2026',
    title: 'Exceptional',
    positive: "We booked an apartment with a balcony last minute and Stephen the host, was very quick to respond and welcome us. The apartment is in a quiet street off a hectic main road with many restaurants, cafes, grocery stores, food stalls and shops. The bed was super comfortable, the shower pressure ideal and our nights were restful. Having a fridge and cooktop was handy. Many sights are walkable. Hailing a Grab to get around was easy. Public bus routes near the apartment were also easily accessible and rides were inexpensive, clean and air conditioned. Our 7-Day stay at Stephen's accomodation in HCMC was great!",
    negative: ''
  },
  {
    id: 3,
    author: 'Rebecca',
    country: 'United Kingdom',
    rating: 9.0,
    date: '19 November 2024',
    title: 'Excellent apartment in excellent. Owner really helpful. Would recommend.',
    positive: 'Stephen was really helpful. The flat is like an apartment. It feels safe and is airy. Stephen helped with tours and laundry etc. the location was brilliant.',
    negative: 'Nothing really although just a suggestion that with 4-5 night stay do suggest maybe servicing with fresh towels and empty bins but stay was brilliant. Thanks'
  },
  {
    id: 4,
    author: 'Vasilis',
    country: 'Greece',
    rating: 10.0,
    date: '4 April 2026',
    title: 'Great location and quite , Stephan great guy very helpful',
    positive: 'Really good room, very big, super clean. Right in the Central life area, but in a little alley so really quiet. The owner is very kind and very helpful. he sorted me out with the taxi trying to reap me off when I arrived from the airport. Highly recommended for any trip to Saigon.',
    negative: ''
  },
  {
    id: 5,
    author: 'Achim',
    country: 'Germany',
    rating: 10.0,
    date: '24 March 2026',
    title: 'Exceptional',
    positive: 'The staff was incredibly friendly. The rooms are well-kept, especially for this price range. What really makes this place stand out is the location. It’s perfect for exploring, you can get to almost all the popular spots and sights by foot in about 20+ minutes. I would definitely stay here again',
    negative: "Since it's an older hotel you can see some scratches on the furniture etc, but nothing worth to complain about in this price range tbh"
  },
  {
    id: 6,
    author: 'Elena',
    country: 'Germany',
    rating: 9.0,
    date: '8 March 2026',
    title: 'Superb',
    positive: 'The location was good, still in District 1. It was quite and the bed was big and comfortable. It was very clean and the host was helpful.',
    negative: 'I had the experience with a cockroach, becaus I opened the window for some fresh air. It was not a good idea.'
  },
  {
    id: 7,
    author: 'Faizal',
    country: 'Indonesia',
    rating: 10.0,
    date: '20 February 2026',
    title: 'Everything was good and it was worth it',
    positive: 'The property was big and very spacious, you also got all the amenities that you need. The host was also very helpful and speak english very well.',
    negative: 'The location is about 1 kilometer to benh thanh market so it was good. You can order grab bike with an affordable price'
  },
  {
    id: 8,
    author: 'Carmen',
    country: 'Germany',
    rating: 10.0,
    date: '12 February 2026',
    title: 'Wonderful stay',
    positive: 'I loved everything about the apartment - the interior design, very clean and comfortable, also a big fridge and a sink to wash the dishes. The owner was very kind and supportive, I could also park my bicycle inside and store it on my day of departure until the evening. The location was also perfect and despite the noisiness outside, it was super quiet inside.',
    negative: ''
  }
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="navbar-brand">My Stay & Apartment</a>
        
        <div className="navbar-links">
          <a href="#about" className="navbar-link">About</a>
          <a href="#rooms" className="navbar-link">Rooms</a>
          <a href="#reviews" className="navbar-link">Reviews</a>
          <a href="#contact" className="navbar-link">Contact</a>
        </div>
        
        <button 
          className="mobile-menu-btn" 
          style={{ display: 'none' }} // Assuming handled by media query in a real setup, but keeping simple here
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X color={scrolled ? '#1a1a1a' : '#fff'} /> : <Menu color={scrolled ? '#1a1a1a' : '#fff'} />}
        </button>
      </nav>

      <header className="hero">
        <img 
          src="/apartment_balcony_1779102155333.png" 
          alt="Luxury Hotel" 
          className="hero-bg"
        />
        <div className="hero-content">
          <span className="hero-subtitle">Boutique Luxury</span>
          <h1 className="hero-title">Experience Unparalleled Comfort</h1>
          <p className="hero-text">An exclusive collection of 10 meticulously designed rooms and apartments tailored for the modern traveler.</p>
          <a href="#rooms" className="btn btn-primary">Discover Our Rooms</a>
        </div>
      </header>

      <section id="rooms" className="container py-16">
        <div className="section-header">
          <span className="section-subtitle">Our Accommodations</span>
          <h2 className="section-title">Stay With Us</h2>
        </div>

        <div className="rooms-grid">
          {rooms.map((room) => (
            <div key={room.id} className="room-card" onClick={() => setSelectedRoom(room)} style={{ cursor: 'pointer' }}>
              <div className="room-image-wrap">
                <img src={room.image} alt={room.title} className="room-image" />
                {room.badge && <span className="room-badge">{room.badge}</span>}
              </div>
              
              <div className="room-content">
                <h3 className="room-title">{room.title}</h3>
                <p className="mb-4" style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                  {room.subtitle} <br/> {room.beds}
                </p>
                
                <div className="room-meta">
                  <span><Maximize size={16} /> {room.size}</span>
                  <span><User size={16} /> Max {room.maxPersons}</span>
                </div>
                
                <div className="room-features">
                  <ul className="room-features-list">
                    {room.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                    {room.features.length > 4 && <li>+{room.features.length - 4} more</li>}
                  </ul>
                </div>
                
                <div className="room-footer">
                  <div className="room-price-wrap">
                    <span className="room-price-label">From</span>
                    <span className="room-price">VND {room.price}</span>
                  </div>
                  <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.75rem' }}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" className="reviews-section py-16">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Guest Experiences</span>
            <h2 className="section-title">What They Say</h2>
          </div>
          
          <div className="reviews-slider">
            {reviews.map((review) => (
              <div key={review.id} className="review-card" style={{ minWidth: '400px', display: 'flex', flexDirection: 'column' }}>
                <div className="review-header" style={{ marginBottom: '0.75rem' }}>
                  <div>
                    <h4 className="review-author">{review.author}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{review.country} • {review.date}</span>
                  </div>
                  <div className="review-rating" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: '#003580', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold' }}>
                      {review.rating.toFixed(1)}
                    </div>
                  </div>
                </div>
                <h5 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1rem', marginBottom: '1rem', color: '#1a1a1a' }}>
                  "{review.title}"
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1 }}>
                  {review.positive && (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <Smile size={18} color="#258635" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: '1.4' }}>{review.positive}</p>
                    </div>
                  )}
                  {review.negative && (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <Frown size={18} color="#333" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: '1.4' }}>{review.negative}</p>
                    </div>
                  )}
                </div>
                <div className="review-platform" style={{ marginTop: '1.5rem', marginBottom: 0 }}>
                  <span style={{ fontWeight: 600, color: '#003580' }}>Booking.com</span> 
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="https://www.booking.com/hotel/vn/my-way.en-gb.html?aid=356980&label=gog235jc-10CAso9AFCBm15LXdheUgzWANo9AGIAQGYATO4AQfIAQ3YAQPoAQH4AQGIAgGoAgG4AtDiq9AGwAIB0gIkNmNjYmMwZWMtNjM2Yi00OTFiLTg1MjEtZWYxMjRlMzVjNzUy2AIB4AIB&sid=3493809436101eb78759c1da9f70d4ae&all_sr_blocks=914487502_363026539_2_0_0&checkin=2026-05-19&checkout=2026-05-20&dest_id=-3730078&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=914487502_363026539_2_0_0&hpos=1&matching_block_id=914487502_363026539_2_0_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=914487502_363026539_2_0_0__100000000&srepoch=1779102037&srpvid=1a214d68b1ea0de7&type=total&ucfs=1&#tab-reviews" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', padding: '1rem 3rem', borderColor: '#003580', color: '#003580', fontWeight: 600 }}>
              View All Reviews on Booking.com
            </a>
          </div>
        </div>
      </section>

      <a href="https://wa.me/84988600388" target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>
      </a>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>My Stay & Apartment</h3>
            <p>A luxury boutique hotel experience offering 10 premium rooms and apartments for international guests.</p>
          </div>
          
          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#rooms">Rooms & Suites</a></li>
              <li><a href="#reviews">Guest Reviews</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Contact</h4>
            <ul>
              <li><MapPin size={16} style={{ display: 'inline', marginRight: '8px' }}/>123 Boutique Street, City</li>
              <li>hello@mystayapartment.com</li>
              <li>+84 123 456 789</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} My Stay & Apartment. All rights reserved.</p>
        </div>
      </footer>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <RoomModal 
          room={selectedRoom} 
          onClose={() => setSelectedRoom(null)} 
        />
      )}
    </>
  );
}

export default App;
