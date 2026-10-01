"use client";
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize, User, Check, Video, Image as ImageIcon, ExternalLink, Calendar } from 'lucide-react';

export default function RoomModal({ room, onClose, onBookNow }: { room: any; onClose: () => void; onBookNow: (title: string) => void }) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'video'>('photos');

  if (!room) return null;

  const images = room.images && room.images.length > 0 ? room.images : [room.image];
  const nextImage = () => setCurrentImageIdx((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div className="room-modal-overlay" onClick={onClose}>
      <div className="room-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="room-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div className="room-modal-body">
          {/* Left: Media Gallery / Video */}
          <div className="room-modal-gallery">
            {/* Tab switch if video exists */}
            {room.videoUrl && (
              <div className="modal-media-tabs">
                <button
                  type="button"
                  className={`modal-media-tab ${activeMediaTab === 'photos' ? 'active' : ''}`}
                  onClick={() => setActiveMediaTab('photos')}
                >
                  <ImageIcon size={14} /> Photos ({images.length})
                </button>
                <button
                  type="button"
                  className={`modal-media-tab ${activeMediaTab === 'video' ? 'active' : ''}`}
                  onClick={() => setActiveMediaTab('video')}
                >
                  <Video size={14} /> Video Tour
                </button>
              </div>
            )}

            {activeMediaTab === 'video' && room.videoUrl ? (
              <div className="room-modal-video-wrapper">
                <video
                  controls
                  autoPlay
                  playsInline
                  src={room.videoUrl}
                  className="room-modal-video-player"
                >
                  Your browser does not support the video tag.
                </video>
                <div className="video-fallback-action">
                  <a
                    href={room.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ fontSize: '0.75rem', padding: '0.4rem 1rem' }}
                  >
                    Open Video in New Tab <ExternalLink size={12} style={{ marginLeft: 4 }} />
                  </a>
                </div>
              </div>
            ) : (
              <>
                <div className="room-modal-main-image">
                  <button className="gallery-nav prev" onClick={prevImage} aria-label="Previous image"><ChevronLeft size={24}/></button>
                  <img src={images[currentImageIdx]} alt={room.title} />
                  <button className="gallery-nav next" onClick={nextImage} aria-label="Next image"><ChevronRight size={24}/></button>
                </div>
                <div className="room-modal-thumbnails">
                  {images.map((img: string, idx: number) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt={`${room.title} ${idx + 1}`} 
                      className={idx === currentImageIdx ? 'active' : ''}
                      onClick={() => setCurrentImageIdx(idx)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right: Details */}
          <div className="room-modal-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <h2 className="room-modal-title" style={{ margin: 0 }}>{room.title}</h2>
              {room.badge && <span className="room-badge" style={{ position: 'static' }}>{room.badge}</span>}
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '0.35rem', marginBottom: '0.75rem' }}>
              {room.subtitle}
            </p>

            <div className="room-modal-meta">
              <span><Maximize size={16} /> {room.size}</span>
              <span><User size={16} /> Max {room.maxPersons} {room.maxPersons > 1 ? 'Guests' : 'Guest'}</span>
              {room.beds && <span>🛏️ {room.beds}</span>}
            </div>

            {/* Seasonal rate info box */}
            <div className="modal-rates-box">
              <div className="modal-rates-header">
                <Calendar size={15} color="#d4af37" />
                <span>Rate & Seasonal Periods</span>
              </div>
              <div className="modal-rates-grid">
                <div className="modal-rate-item">
                  <span className="rate-period">1 Oct – 20 Dec</span>
                  <span className="rate-value">
                    {room.isContactPrice ? 'Contact Us' : `From VND ${room.price}/night`}
                  </span>
                </div>
                <div className="modal-rate-item highlight">
                  <span className="rate-period">21 Dec – 3 Jan (Festive)</span>
                  <span className="rate-value">Contact us for our best rate</span>
                </div>
              </div>
            </div>

            <div className="room-modal-amenities">
              {room.amenities?.kitchen && (
                <div className="amenity-group">
                  <h4>In your kitchen:</h4>
                  <ul>
                    {room.amenities.kitchen.map((item: string, i: number) => <li key={i}><Check size={14} color="#003580"/> {item}</li>)}
                  </ul>
                </div>
              )}
              {room.amenities?.bathroom && (
                <div className="amenity-group">
                  <h4>In your bathroom:</h4>
                  <ul>
                    {room.amenities.bathroom.map((item: string, i: number) => <li key={i}><Check size={14} color="#003580"/> {item}</li>)}
                  </ul>
                </div>
              )}
              {room.amenities?.facilities && (
                <div className="amenity-group">
                  <h4>Facilities:</h4>
                  <ul>
                    {room.amenities.facilities.map((item: string, i: number) => <li key={i}><Check size={14} color="#003580"/> {item}</li>)}
                  </ul>
                </div>
              )}
            </div>

            <div className="room-modal-footer">
              <div className="price">
                <span style={{fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-light)', display: 'block'}}>
                  {room.isContactPrice ? 'Direct Reservation' : 'Direct Booking Rate'}
                </span>
                {room.isContactPrice ? (
                  <span style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--primary)' }}>
                    Contact Us
                  </span>
                ) : (
                  <>
                    VND {room.price} 
                    {room.usdPrice && (
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 'normal', marginLeft: '0.5rem' }}>
                        (approx. ${room.usdPrice})
                      </span>
                    )}
                  </>
                )}
              </div>
              <button 
                className="btn btn-primary" 
                style={{ padding: '0.85rem 2rem' }}
                onClick={() => {
                  if (onBookNow) onBookNow(room.title);
                  onClose();
                }}
              >
                {room.isContactPrice ? 'Inquire Now' : 'Book Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
