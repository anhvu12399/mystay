'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Language } from '../app/dictionaries';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange?: (lang: Language) => void;
}

const LANGUAGES = {
  en: { name: 'English', flag: '🇬🇧' },
  vi: { name: 'Tiếng Việt', flag: '🇻🇳' },
  ko: { name: '한국어', flag: '🇰🇷' },
  zh: { name: '中文', flag: '🇨🇳' },
};

export default function LanguageSwitcher({ currentLang, onLanguageChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener('click', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  const handleLanguageSelect = (lang: Language) => {
    // Update cookie
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`;

    // Call the callback if provided
    if (onLanguageChange) {
      onLanguageChange(lang);
    }

    // Reload the page to reflect language change
    window.location.reload();
  };

  return (
    <div className="language-switcher" style={{ position: 'relative' }}>
      <button
        className="language-switcher-btn"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'inherit',
        }}
      >
        <span style={{ fontSize: '1.25rem' }}>{LANGUAGES[currentLang].flag}</span>
        <span>{currentLang.toUpperCase()}</span>
        <ChevronDown
          size={14}
          style={{
            transition: 'transform 0.2s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {isOpen && (
        <div
          className="language-dropdown"
          role="menu"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            marginTop: '0.5rem',
            minWidth: '150px',
            zIndex: 1000,
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: '0.5rem 0',
            }}
          >
            {(Object.keys(LANGUAGES) as Language[]).map((lang) => (
              <li key={lang}>
                <button
                  onClick={() => {
                    handleLanguageSelect(lang);
                    setIsOpen(false);
                  }}
                  role="menuitem"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: currentLang === lang ? '#f0f0f0' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (currentLang !== lang) {
                      e.currentTarget.style.backgroundColor = '#f9f9f9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      currentLang === lang ? '#f0f0f0' : 'transparent';
                  }}
                >
                  <span style={{ fontSize: '1.125rem' }}>{LANGUAGES[lang].flag}</span>
                  <span>{LANGUAGES[lang].name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
