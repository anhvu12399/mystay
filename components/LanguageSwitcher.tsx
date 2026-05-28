"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { Locale } from '../app/translations';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

export default function LanguageSwitcher() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('en');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Read current locale cookie on mount
  useEffect(() => {
    const getCookie = (name: string): string => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || 'en';
      return 'en';
    };

    const cookieLocale = getCookie('NEXT_LOCALE') as Locale;
    if (cookieLocale && ['en', 'vi', 'ko', 'zh'].includes(cookieLocale)) {
      setCurrentLocale(cookieLocale);
    }
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (code: string) => {
    // 1. Set cookie locally for immediate backup
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    
    // 2. Refresh page using search parameters which will trigger middleware to handle the rewrite cleanly
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('lang', code);
    window.location.href = currentUrl.toString();
    setIsOpen(false);
  };

  const activeLang = languages.find(l => l.code === currentLocale) || languages[0];

  return (
    <div className="lang-switcher-container" ref={dropdownRef}>
      <button 
        type="button"
        className="lang-switcher-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="lang-globe-icon"><Globe size={16} /></span>
        <span className="lang-flag">{activeLang.flag}</span>
        <span className="lang-text">{activeLang.name}</span>
        <ChevronDown size={14} className={`lang-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <ul className="lang-switcher-dropdown" role="menu">
          {languages.map((lang) => (
            <li key={lang.code} role="none">
              <button
                type="button"
                className={`lang-option-btn ${lang.code === currentLocale ? 'active' : ''}`}
                onClick={() => handleLanguageChange(lang.code)}
                role="menuitem"
              >
                <span className="option-flag">{lang.flag}</span>
                <span className="option-name">{lang.name}</span>
                {lang.code === currentLocale && <span className="option-indicator" />}
              </button>
            </li>
          ))}
        </ul>
      )}

      <style jsx global>{`
        .lang-switcher-container {
          position: relative;
          display: inline-block;
          font-family: var(--font-sans), system-ui, -apple-system, sans-serif;
          z-index: 1000;
        }

        .lang-switcher-trigger {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 8px 14px;
          border-radius: 9999px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        /* Scrolled state adaptation (will inherit colors dynamically) */
        .navbar.scrolled .lang-switcher-trigger {
          background: rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: #1a1a1a;
        }

        .lang-switcher-trigger:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
        }

        .navbar.scrolled .lang-switcher-trigger:hover {
          background: rgba(0, 0, 0, 0.08);
          border-color: rgba(0, 0, 0, 0.15);
        }

        .lang-globe-icon {
          display: flex;
          align-items: center;
          opacity: 0.8;
        }

        .lang-flag {
          font-size: 1.1rem;
          line-height: 1;
        }

        .lang-text {
          font-size: 0.85rem;
        }

        .lang-chevron {
          transition: transform 0.25s ease;
          opacity: 0.7;
        }

        .lang-chevron.open {
          transform: rotate(180deg);
        }

        .lang-switcher-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 160px;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          padding: 8px;
          list-style: none;
          margin: 0;
          animation: langDropdownFade 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        /* Dark overlay styling if theme is dark */
        .navbar:not(.scrolled) .lang-switcher-dropdown {
          background: rgba(30, 30, 30, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        @keyframes langDropdownFade {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .lang-option-btn {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 10px;
          background: none;
          border: none;
          padding: 10px 12px;
          border-radius: 10px;
          cursor: pointer;
          color: #333333;
          font-size: 0.875rem;
          font-weight: 500;
          text-align: left;
          transition: all 0.2s ease;
          position: relative;
        }

        .navbar:not(.scrolled) .lang-option-btn {
          color: #e0e0e0;
        }

        .lang-option-btn:hover {
          background: rgba(0, 0, 0, 0.04);
          color: #003580;
        }

        .navbar:not(.scrolled) .lang-option-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
        }

        .lang-option-btn.active {
          font-weight: 600;
          color: #003580;
          background: rgba(0, 53, 128, 0.05);
        }

        .navbar:not(.scrolled) .lang-option-btn.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.12);
        }

        .option-flag {
          font-size: 1.15rem;
        }

        .option-name {
          flex-grow: 1;
        }

        .option-indicator {
          width: 6px;
          height: 6px;
          background-color: currentColor;
          border-radius: 50%;
        }

        /* Mobile specific enhancements */
        @media (max-width: 768px) {
          .lang-text {
            display: none; /* Icon and flag only on smaller screens for menu space */
          }
          .lang-switcher-trigger {
            padding: 8px 10px;
            gap: 6px;
          }
          .lang-switcher-dropdown {
            right: 0;
            width: 150px;
          }
        }
      `}</style>
    </div>
  );
}
