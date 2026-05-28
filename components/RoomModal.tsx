"use client";
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize, User, Check } from 'lucide-react';
import { getTranslation, Locale } from '../app/translations';

interface RoomModalProps {
  room: any;
  locale: Locale;
  onClose: () => void;
  onBookNow: (title: string) => void;
}

export default function RoomModal({ room, locale, onClose, onBookNow }: RoomModalProps) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  if (!room) return null;

  const nextImage = () => setCurrentImageIdx((prev) => (prev + 1) % room.images.length);
  const prevImage = () => setCurrentImageIdx((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));

  return (
    <div className="room-modal-overlay" onClick={onClose}>
      <div className="room-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="room-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div className="room-modal-body">
          {/* Left: Gallery */}
          <div className="room-modal-gallery">
            <div className="room-modal-main-image">
              <button className="gallery-nav prev" onClick={prevImage} aria-label="Previous image"><ChevronLeft size={24}/></button>
              <img src={room.images[currentImageIdx]} alt={getTranslation(room.title, locale)} />
              <button className="gallery-nav next" onClick={nextImage} aria-label="Next image"><ChevronRight size={24}/></button>
            </div>
            <div className="room-modal-thumbnails">
              {room.images.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt={`${getTranslation(room.title, locale)} ${idx}`} 
                  className={idx === currentImageIdx ? 'active' : ''}
                  onClick={() => setCurrentImageIdx(idx)}
                />
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="room-modal-info">
            <h2 className="room-modal-title">{getTranslation(room.title, locale)}</h2>
            <div className="room-modal-meta">
              <span><Maximize size={16} /> {room.size}</span>
              <span><User size={16} /> {getTranslation('max', locale)} {room.maxPersons}</span>
              {room.beds && <span>🛏️ {getTranslation(room.beds, locale)}</span>}
            </div>

            <p className="room-modal-desc">
              <strong>Excellent 8.9</strong> – Based on 49 reviews. <br/><br/>
              {getTranslation('roomModalDesc', locale)}
            </p>

            <div className="room-modal-amenities">
              {room.amenities?.kitchen && (
                <div className="amenity-group">
                  <h4>{getTranslation('privateKitchen', locale)}</h4>
                  <ul>
                    {room.amenities.kitchen.map((item, i) => (
                      <li key={i}><Check size={14} color="#003580"/> {getTranslation(item, locale)}</li>
                    ))}
                  </ul>
                </div>
              )}
              {room.amenities?.bathroom && (
                <div className="amenity-group">
                  <h4>{getTranslation('privateBathroom', locale)}</h4>
                  <ul>
                    {room.amenities.bathroom.map((item, i) => (
                      <li key={i}><Check size={14} color="#003580"/> {getTranslation(item, locale)}</li>
                    ))}
                  </ul>
                </div>
              )}
              {room.amenities?.facilities && (
                <div className="amenity-group">
                  <h4>{getTranslation('facilities', locale)}</h4>
                  <ul>
                    {room.amenities.facilities.map((item, i) => (
                      <li key={i}><Check size={14} color="#003580"/> {getTranslation(item, locale)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="room-modal-footer">
              <div className="price">
                <span style={{fontSize: '0.875rem', fontWeight: 400, color: 'var(--text-light)', display: 'block'}}>{getTranslation('pricePerNight', locale)}</span>
                VND {room.price} <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 'normal', marginLeft: '0.5rem' }}>({getTranslation('approx', locale)} ${room.usdPrice})</span>
              </div>
              <button 
                className="btn btn-primary" 
                style={{ padding: '1rem 2.5rem' }}
                onClick={() => {
                  if (onBookNow) onBookNow(room.title);
                  onClose();
                }}
              >
                {getTranslation('bookNow', locale)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
