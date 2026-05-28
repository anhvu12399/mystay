"use client";
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize, User, Check } from 'lucide-react';

export default function RoomModal({ room, onClose, onBookNow, dict, language }) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  if (!room) return null;

  const nextImage = () => setCurrentImageIdx((prev) => (prev + 1) % room.images.length);
  const prevImage = () => setCurrentImageIdx((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));

  return (
    <div className="room-modal-overlay" onClick={onClose}>
      <div className="room-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="room-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="room-modal-body">
          {/* Left: Gallery */}
          <div className="room-modal-gallery">
            <div className="room-modal-main-image">
              <button className="gallery-nav prev" onClick={prevImage}><ChevronLeft size={24}/></button>
              <img src={room.images[currentImageIdx]} alt={room.title} />
              <button className="gallery-nav next" onClick={nextImage}><ChevronRight size={24}/></button>
            </div>
            <div className="room-modal-thumbnails">
              {room.images.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt={`${room.title} ${idx}`} 
                  className={idx === currentImageIdx ? 'active' : ''}
                  onClick={() => setCurrentImageIdx(idx)}
                />
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="room-modal-info">
            <h2 className="room-modal-title">{room.displayTitle || room.title}</h2>
            <div className="room-modal-meta">
              <span><Maximize size={16} /> {room.size}</span>
              <span><User size={16} /> {dict.rooms.maxPersons} {room.maxPersons}</span>
              {room.displayBeds && <span>🛏️ {room.displayBeds}</span>}
            </div>

            <p className="room-modal-desc">
              <strong>{dict.roomModal.excellent}</strong> – {dict.roomModal.basedOnReviews}. <br/><br/>
              {dict.roomModal.description}
            </p>

            <div className="room-modal-amenities">
              {room.amenities?.kitchen && (
                <div className="amenity-group">
                  <h4>{dict.roomModal.inYourPrivateKitchen}</h4>
                  <ul>
                    {room.amenities.kitchen.map((item, i) => <li key={i}><Check size={14} color="#003580"/> {item}</li>)}
                  </ul>
                </div>
              )}
              {room.amenities?.bathroom && (
                <div className="amenity-group">
                  <h4>{dict.roomModal.inYourPrivateBathroom}</h4>
                  <ul>
                    {room.amenities.bathroom.map((item, i) => <li key={i}><Check size={14} color="#003580"/> {item}</li>)}
                  </ul>
                </div>
              )}
              {room.amenities?.facilities && (
                <div className="amenity-group">
                  <h4>{dict.roomModal.facilities}</h4>
                  <ul>
                    {room.amenities.facilities.map((item, i) => <li key={i}><Check size={14} color="#003580"/> {item}</li>)}
                  </ul>
                </div>
              )}
            </div>

            <div className="room-modal-footer">
              <div className="price">
                <span style={{fontSize: '0.875rem', fontWeight: 400, color: 'var(--text-light)', display: 'block'}}>{dict.roomModal.pricePerNight}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>
                    {language === 'vi' && `VND ${room.price}`}
                    {language === 'ko' && `${dict.currency.symbol}${room.krwPrice}`}
                    {language === 'zh' && `${dict.currency.symbol}${room.cnyPrice}`}
                    {language === 'en' && `${dict.currency.symbol}${room.usdPrice}`}
                  </span>
                  {language !== 'en' && (
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 'normal' }}>({dict.rooms.approx} ${room.usdPrice})</span>
                  )}
                </div>
              </div>
              <button 
                className="btn btn-primary" 
                style={{ padding: '1rem 2.5rem' }}
                onClick={() => {
                  if (onBookNow) onBookNow(room.title);
                  onClose();
                }}
              >
                {dict.roomModal.bookNow}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
