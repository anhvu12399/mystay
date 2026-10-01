"use client";
import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  videoUrl: string;
  title: string;
  onClose: () => void;
}

export default function VideoModal({ videoUrl, title, onClose }: VideoModalProps) {
  if (!videoUrl) return null;

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="video-modal-header">
          <div className="video-modal-title">
            <span className="live-dot" />
            <span>Video Tour: {title}</span>
          </div>
          <button className="video-modal-close" onClick={onClose} aria-label="Close video">
            <X size={20} />
          </button>
        </div>

        <div className="video-modal-player-wrap">
          <video
            controls
            autoPlay
            playsInline
            src={videoUrl}
            className="video-modal-video"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="video-modal-footer">
          <span style={{ fontSize: '0.85rem', color: '#888' }}>
            Spacious 12 m² private balcony tour
          </span>
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="video-external-btn"
          >
            Open in new tab <ExternalLink size={13} style={{ marginLeft: 4 }} />
          </a>
        </div>
      </div>
    </div>
  );
}
