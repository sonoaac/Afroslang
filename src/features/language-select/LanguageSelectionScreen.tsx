import { Language, InterfaceLanguage } from '../../types';
import { languages } from '../../data/languages';
import { FlagIcon } from './FlagIcon';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import './LanguageCarousel3D.css';
import { SelectMotionOverlay } from './SelectMotionOverlay';

interface LanguageSelectionScreenProps {
  interfaceLanguage: InterfaceLanguage;
  onSelectLanguage: (languageId: string) => void;
  onBack: () => void;
  onInterfaceLanguageChange?: (lang: InterfaceLanguage) => void;
}

export function LanguageSelectionScreen({ 
  interfaceLanguage, 
  onSelectLanguage,
  onBack: _onBack,
  onInterfaceLanguageChange,
}: LanguageSelectionScreenProps) {
  const isEnglish = interfaceLanguage === 'en';
  const [logoError, setLogoError] = useState(false);
  const [showSiteLanguageDropdown, setShowSiteLanguageDropdown] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectingName, setSelectingName] = useState<string>('');

  const brown = '#6B4F3A'; // dark brown

  const handleSiteLanguageChange = (lang: InterfaceLanguage) => {
    onInterfaceLanguageChange?.(lang);
    setShowSiteLanguageDropdown(false);
  };

  const handleSelectLanguage = (language: Language) => {
    if (isSelecting) return;

    const displayName = interfaceLanguage === 'en' ? language.name : language.nameFr;
    const shortName = displayName.split('(')[0].trim();

    const reduceMotion = typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      onSelectLanguage(language.id);
      return;
    }

    setSelectingName(shortName);
    setIsSelecting(true);

    window.setTimeout(() => {
      onSelectLanguage(language.id);
    }, 950);
  };

  return (
    <div className="min-h-screen bg-white">
      <SelectMotionOverlay
        open={isSelecting}
        title={selectingName ? `Loading ${selectingName}…` : 'Loading…'}
        logoSrc="/afrolingologo.png"
      />
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 sm:py-12">
        {/* Logo and Site Language Selector - moved from header */}
        <div className="flex items-center justify-between mb-8">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            {logoError ? (
              <div className="w-10 h-10 rounded-full" style={{ backgroundColor: brown }} />
            ) : (
              <img
                src="/afroslang-logo.png"
                alt="Afroslang logo"
                className="w-10 h-10 rounded-full object-contain"
                onError={() => setLogoError(true)}
              />
            )}
            <span className="text-2xl font-bold text-gray-900">
              afroslang
            </span>
          </div>

          {/* Right: Site Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowSiteLanguageDropdown(!showSiteLanguageDropdown)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <span className="text-sm font-medium">
                {isEnglish ? 'SITE LANGUAGE: ENGLISH' : 'LANGUE DU SITE: FRANÇAIS'}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {showSiteLanguageDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowSiteLanguageDropdown(false)}
                />
                <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg border border-gray-200 py-2 z-20 min-w-[200px]">
                  <button
                    onClick={() => handleSiteLanguageChange('en')}
                    className={`w-full text-left px-4 py-2 text-black hover:bg-gray-100 transition-colors ${
                      isEnglish ? 'bg-gray-50 font-semibold' : ''
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleSiteLanguageChange('fr')}
                    className={`w-full text-left px-4 py-2 text-black hover:bg-gray-100 transition-colors ${
                      !isEnglish ? 'bg-gray-50 font-semibold' : ''
                    }`}
                  >
                    Français
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900 mb-8 text-center">
          {isEnglish ? 'Choose an African language to begin' : 'Choisissez une langue africaine pour commencer'}
        </h1>

        {/* All Languages (3D sliding carousel) */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-600">
            {languages.length} {isEnglish ? 'languages' : 'langues'}
          </div>
        </div>

        <div className="afroScene py-10">
          <div className="afroA3d" style={{ ['--n' as any]: languages.length }}>
            {languages.map((language, index) => (
              <LanguageCarouselCard
                key={language.id}
                language={language}
                interfaceLanguage={interfaceLanguage}
                index={index}
                total={languages.length}
                onClick={() => handleSelectLanguage(language)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface LanguageCarouselCardProps {
  language: Language;
  interfaceLanguage: InterfaceLanguage;
  index: number;
  total: number;
  onClick: () => void;
}

function LanguageCarouselCard({ language, interfaceLanguage, index, total, onClick }: LanguageCarouselCardProps) {
  const displayName = interfaceLanguage === 'en' ? language.name : language.nameFr;
  const shortName = displayName.split('(')[0].trim();

  return (
    <button
      type="button"
      className="afroCard3d"
      onClick={onClick}
      style={{ ['--i' as any]: index, ['--n' as any]: total }}
      aria-label={`Select ${shortName}`}
    >
      <div className="afroCardInner">
        <div className="afroCardFlags">
          {language.flags.map((flag, idx) => (
            <div key={idx}>
              <FlagIcon country={flag} size="lg" />
            </div>
          ))}
        </div>

        <div>
          <div className="afroCardTitle">{shortName}</div>
          <div className="afroCardSubtitle">{language.speakers}</div>
        </div>
      </div>
    </button>
  );
}
