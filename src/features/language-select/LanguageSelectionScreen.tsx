import { Language, InterfaceLanguage } from '../../types';
import { languages } from '../../data/languages';
import { FlagIcon } from './FlagIcon';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
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
  onInterfaceLanguageChange,
}: LanguageSelectionScreenProps) {
  const isEnglish = interfaceLanguage === 'en';
  const [logoError, setLogoError] = useState(false);
  const [showSiteLanguageDropdown, setShowSiteLanguageDropdown] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectingName, setSelectingName] = useState<string>('');

  const brown = '#6B4F3A';

  const handleSiteLanguageChange = (lang: InterfaceLanguage) => {
    onInterfaceLanguageChange?.(lang);
    setShowSiteLanguageDropdown(false);
  };

  const handleSelectLanguage = (language: Language) => {
    if (isSelecting) return;

    const displayName = interfaceLanguage === 'en' ? language.name : language.nameFr;
    const shortName = displayName.split('(')[0].trim();

    const reduceMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      onSelectLanguage(language.id);
      return;
    }

    setSelectingName(shortName);
    setIsSelecting(true);
    window.setTimeout(() => onSelectLanguage(language.id), 950);
  };

  return (
    <div className="min-h-screen bg-white">
      <SelectMotionOverlay
        open={isSelecting}
        title={selectingName ? `Loading ${selectingName}…` : 'Loading…'}
        logoSrc="/afrolingologo.png"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">

        {/* Header: logo + site language */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            {logoError ? (
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full" style={{ backgroundColor: brown }} />
            ) : (
              <img
                src="/afroslang-logo.png"
                alt="Afroslang logo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-contain"
                onError={() => setLogoError(true)}
              />
            )}
            <span className="text-xl sm:text-2xl font-bold text-gray-900">afroslang</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSiteLanguageDropdown(!showSiteLanguageDropdown)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <span className="text-[11px] sm:text-sm font-medium tracking-wide">
                {isEnglish ? 'SITE LANGUAGE: ENGLISH' : 'LANGUE DU SITE: FRANÇAIS'}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showSiteLanguageDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowSiteLanguageDropdown(false)} />
                <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg border border-gray-200 py-2 z-20 min-w-[200px]">
                  <button
                    onClick={() => handleSiteLanguageChange('en')}
                    className={`w-full text-left px-4 py-2 text-black hover:bg-gray-100 transition-colors ${isEnglish ? 'bg-gray-50 font-semibold' : ''}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleSiteLanguageChange('fr')}
                    className={`w-full text-left px-4 py-2 text-black hover:bg-gray-100 transition-colors ${!isEnglish ? 'bg-gray-50 font-semibold' : ''}`}
                  >
                    Français
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 mb-2 text-center">
          {isEnglish ? 'Choose an African language to begin' : 'Choisissez une langue africaine pour commencer'}
        </h1>
        <p className="text-center text-sm text-gray-500 mb-8">
          {languages.length} {isEnglish ? 'languages available' : 'langues disponibles'}
        </p>

        {/* Language grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {languages.map((language) => (
            <LanguageCard
              key={language.id}
              language={language}
              interfaceLanguage={interfaceLanguage}
              onClick={() => handleSelectLanguage(language)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

interface LanguageCardProps {
  language: Language;
  interfaceLanguage: InterfaceLanguage;
  onClick: () => void;
}

function LanguageCard({ language, interfaceLanguage, onClick }: LanguageCardProps) {
  const displayName = interfaceLanguage === 'en' ? language.name : language.nameFr;
  const shortName = displayName.split('(')[0].trim();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Select ${shortName}`}
      className="group flex flex-col items-center gap-3 p-4 sm:p-5 rounded-2xl border border-gray-200 bg-white hover:border-gray-400 hover:shadow-md active:scale-95 transition-all duration-150 text-center"
    >
      <div className="flex justify-center gap-1.5 flex-wrap">
        {language.flags.map((flag, idx) => (
          <FlagIcon key={idx} country={flag} size="lg" />
        ))}
      </div>

      <div>
        <div className="font-black text-sm sm:text-base text-gray-900 uppercase tracking-wide leading-tight">
          {shortName}
        </div>
        <div className="text-xs text-gray-500 mt-0.5">{language.speakers}</div>
      </div>
    </button>
  );
}
