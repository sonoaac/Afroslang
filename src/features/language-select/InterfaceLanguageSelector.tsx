import { useMemo, useState } from 'react';
import { InterfaceLanguage } from '../../types';
import './InterfaceLanguageSelectorSocial.css';

interface InterfaceLanguageSelectorProps {
  onSelect: (language: InterfaceLanguage) => void;
  onSelectLanguage?: (languageId: string) => void;
  onSignIn?: () => void;
  onSignUp?: () => void;
}

// ── Country + language data ──────────────────────────────────────────────────

interface CountryData {
  code: string;
  name: string;
  nameFr: string;
  flag: string;
  fact: string;
  factFr: string;
  languages: string[];   // language IDs available in the app
  priority: number;
}

const LANGUAGE_NAMES: Record<string, { en: string; fr: string }> = {
  hausa:    { en: 'Hausa',              fr: 'Haoussa'              },
  yoruba:   { en: 'Yoruba',             fr: 'Yoruba'               },
  igbo:     { en: 'Igbo',               fr: 'Igbo'                 },
  amharic:  { en: 'Amharic',            fr: 'Amharique'            },
  somali:   { en: 'Somali',             fr: 'Somali'               },
  arabic:   { en: 'Arabic',             fr: 'Arabe'                },
  swahili:  { en: 'Swahili',            fr: 'Swahili'              },
  zulu:     { en: 'Zulu',               fr: 'Zoulou'               },
  twi:      { en: 'Twi (Akan)',         fr: 'Twi (Akan)'           },
  wolof:    { en: 'Wolof',              fr: 'Wolof'                },
  moore:    { en: 'Mòoré',              fr: 'Mòoré'                },
  lingala:  { en: 'Lingala',            fr: 'Lingala'              },
  shona:    { en: 'Shona',              fr: 'Shona'                },
  chichewa: { en: 'Chichewa',           fr: 'Chichewa'             },
  berber:   { en: 'Berber (Tamazight)', fr: 'Berbère (Tamazight)'  },
};

const AFRICAN_COUNTRIES: CountryData[] = [
  { code:'NG', name:'Nigeria',           nameFr:'Nigéria',              flag:'🇳🇬', fact:'Home to over 500 languages — more than any other country in Africa.',                                                priority:1, languages:['hausa','yoruba','igbo'],    factFr:'Abrite plus de 500 langues — plus que tout autre pays en Afrique.' },
  { code:'ET', name:'Ethiopia',          nameFr:'Éthiopie',             flag:'🇪🇹', fact:'One of Africa\'s oldest civilizations, with over 90 languages spoken.',                                               priority:1, languages:['amharic','somali'],         factFr:'L\'une des plus anciennes civilisations d\'Afrique, avec plus de 90 langues.' },
  { code:'EG', name:'Egypt',             nameFr:'Égypte',               flag:'🇪🇬', fact:'Home to the world\'s oldest writing system — hieroglyphics dating back 5,000 years.',                                priority:1, languages:['arabic'],                   factFr:'Berceau de l\'un des plus anciens systèmes d\'écriture du monde.' },
  { code:'TZ', name:'Tanzania',          nameFr:'Tanzanie',             flag:'🇹🇿', fact:'Birthplace of Swahili, now spoken by over 200 million people across Africa.',                                         priority:1, languages:['swahili'],                  factFr:'Berceau du Swahili, parlé par plus de 200 millions de personnes.' },
  { code:'KE', name:'Kenya',             nameFr:'Kenya',                flag:'🇰🇪', fact:'Africa\'s tech capital — Nairobi is known as "Silicon Savannah."',                                                    priority:1, languages:['swahili','somali'],         factFr:'Capitale technologique de l\'Afrique — Nairobi est la "Silicon Savannah".' },
  { code:'ZA', name:'South Africa',      nameFr:'Afrique du Sud',       flag:'🇿🇦', fact:'Has 11 official languages — the most of any single country in the world.',                                            priority:1, languages:['zulu'],                    factFr:'Compte 11 langues officielles — le plus grand nombre au monde.' },
  { code:'GH', name:'Ghana',             nameFr:'Ghana',                flag:'🇬🇭', fact:'First sub-Saharan African country to gain independence in 1957.',                                                    priority:1, languages:['twi','hausa'],             factFr:'Premier pays d\'Afrique subsaharienne à obtenir l\'indépendance en 1957.' },
  { code:'MA', name:'Morocco',           nameFr:'Maroc',                flag:'🇲🇦', fact:'Home to the world\'s oldest university — al-Qarawiyyin, founded in 859 AD.',                                          priority:1, languages:['arabic','berber'],         factFr:'Abrite la plus ancienne université du monde, fondée en 859 apr. J.-C.' },
  { code:'DZ', name:'Algeria',           nameFr:'Algérie',              flag:'🇩🇿', fact:'The largest country in Africa — bigger than all of Western Europe combined.',                                         priority:1, languages:['arabic','berber'],         factFr:'Le plus grand pays d\'Afrique, plus grand que toute l\'Europe de l\'Ouest.' },
  { code:'CD', name:'DR Congo',          nameFr:'RD Congo',             flag:'🇨🇩', fact:'Home to the second-largest rainforest and the world\'s deepest river.',                                               priority:1, languages:['lingala','swahili'],        factFr:'Abrite la deuxième plus grande forêt tropicale et le fleuve le plus profond.' },
  { code:'SN', name:'Senegal',           nameFr:'Sénégal',              flag:'🇸🇳', fact:'Nearly all Senegalese speak Wolof as a shared language, regardless of ethnicity.',                                    priority:1, languages:['wolof'],                   factFr:'Presque tous les Sénégalais parlent le Wolof comme langue commune.' },
  { code:'BF', name:'Burkina Faso',      nameFr:'Burkina Faso',         flag:'🇧🇫', fact:'"Land of Incorruptible Men" — Mòoré is spoken by nearly half the population.',                                       priority:1, languages:['moore'],                   factFr:'"Pays des Hommes Intègres" — le Mòoré est parlé par près de la moitié.' },
  { code:'ZW', name:'Zimbabwe',          nameFr:'Zimbabwe',             flag:'🇿🇼', fact:'Home to Victoria Falls, one of the Seven Natural Wonders of the World.',                                              priority:1, languages:['shona'],                   factFr:'Abrite les chutes Victoria, l\'une des sept merveilles naturelles du monde.' },
  { code:'SO', name:'Somalia',           nameFr:'Somalie',              flag:'🇸🇴', fact:'Somali is the most widely spoken Cushitic language in Africa.',                                                        priority:1, languages:['somali'],                  factFr:'Le Somali est la langue coushitique la plus parlée en Afrique.' },
  { code:'MW', name:'Malawi',            nameFr:'Malawi',               flag:'🇲🇼', fact:'Lake Malawi contains more fish species than any other lake on Earth.',                                                 priority:1, languages:['chichewa'],               factFr:'Le lac Malawi contient plus d\'espèces de poissons que tout autre lac.' },
  { code:'ZM', name:'Zambia',            nameFr:'Zambie',               flag:'🇿🇲', fact:'Home to 73 spoken languages and shares the spectacular Victoria Falls.',                                               priority:1, languages:['chichewa'],               factFr:'Abrite 73 langues parlées et les spectaculaires chutes Victoria.' },
  { code:'MZ', name:'Mozambique',        nameFr:'Mozambique',           flag:'🇲🇿', fact:'Has one of the longest coastlines in Africa — over 2,500 km.',                                                        priority:1, languages:['chichewa'],               factFr:'Possède l\'un des plus longs littoraux d\'Afrique — plus de 2 500 km.' },
  { code:'CG', name:'Rep. of Congo',     nameFr:'Rép. du Congo',        flag:'🇨🇬', fact:'Part of the Congo Basin — the second-largest tropical forest in the world.',                                          priority:1, languages:['lingala'],                factFr:'Fait partie du Bassin du Congo, la deuxième plus grande forêt tropicale.' },
  { code:'BJ', name:'Benin',             nameFr:'Bénin',                flag:'🇧🇯', fact:'Birthplace of Vodun (Voodoo) — a tradition that spread to the Americas.',                                             priority:1, languages:['yoruba'],                  factFr:'Berceau du Vodun (Vaudou), une tradition répandue jusqu\'aux Amériques.' },
  { code:'GM', name:'Gambia',            nameFr:'Gambie',               flag:'🇬🇲', fact:'The smallest country in mainland Africa, almost surrounded by Senegal.',                                               priority:1, languages:['wolof'],                   factFr:'Le plus petit pays d\'Afrique continentale, presque entouré par le Sénégal.' },
  { code:'UG', name:'Uganda',            nameFr:'Ouganda',              flag:'🇺🇬', fact:'Hosts over half of the world\'s remaining mountain gorillas.',                                                          priority:1, languages:['swahili'],                factFr:'Abrite plus de la moitié des gorilles de montagne restants dans le monde.' },
  // Priority 2 — coming soon or partial
  { code:'SD', name:'Sudan',             nameFr:'Soudan',               flag:'🇸🇩', fact:'Sudan has more ancient pyramids than Egypt — over 200 Nubian pyramids.',                                              priority:2, languages:['arabic'],                   factFr:'Le Soudan possède plus de pyramides anciennes que l\'Égypte.' },
  { code:'TN', name:'Tunisia',           nameFr:'Tunisie',              flag:'🇹🇳', fact:'The northernmost country in Africa and birthplace of the Arab Spring.',                                                priority:2, languages:['arabic'],                   factFr:'Le pays le plus septentrional d\'Afrique, berceau du Printemps arabe.' },
  { code:'LY', name:'Libya',             nameFr:'Libye',                flag:'🇱🇾', fact:'Libya holds the largest proven oil reserves in Africa.',                                                               priority:2, languages:['arabic'],                   factFr:'La Libye détient les plus grandes réserves pétrolières prouvées d\'Afrique.' },
  { code:'MR', name:'Mauritania',        nameFr:'Mauritanie',           flag:'🇲🇷', fact:'Ancient cities of Chinguetti and Ouadane are UNESCO World Heritage Sites.',                                            priority:2, languages:['arabic'],                   factFr:'Les villes anciennes de Chinguetti et Ouadane sont classées à l\'UNESCO.' },
  { code:'DJ', name:'Djibouti',          nameFr:'Djibouti',             flag:'🇩🇯', fact:'Home to Lake Assal — the lowest point in Africa.',                                                                      priority:2, languages:['somali'],                  factFr:'Abrite le lac Assal — le point le plus bas d\'Afrique.' },
  { code:'NE', name:'Niger',             nameFr:'Niger',                flag:'🇳🇪', fact:'The largest country in West Africa — 80% covered by the Sahara.',                                                      priority:2, languages:['hausa'],                   factFr:'Le plus grand pays d\'Afrique de l\'Ouest — couvert à 80% par le Sahara.' },
  { code:'MG', name:'Madagascar',        nameFr:'Madagascar',           flag:'🇲🇬', fact:'Over 90% of Madagascar\'s wildlife exists nowhere else on Earth.',                                                     priority:2, languages:[],                          factFr:'Plus de 90% des espèces sauvages de Madagascar n\'existent nulle part ailleurs.' },
  { code:'CM', name:'Cameroon',          nameFr:'Cameroun',             flag:'🇨🇲', fact:'"Africa in miniature" — rainforests, savannas, mountains, deserts, and beaches.',                                     priority:2, languages:[],                          factFr:'"L\'Afrique en miniature" — forêts tropicales, savanes, montagnes et plages.' },
  { code:'AO', name:'Angola',            nameFr:'Angola',               flag:'🇦🇴', fact:'Angola has the most Portuguese speakers outside Brazil and Portugal.',                                                  priority:2, languages:[],                          factFr:'L\'Angola compte le plus de locuteurs portugais hors du Brésil et du Portugal.' },
  { code:'ML', name:'Mali',              nameFr:'Mali',                 flag:'🇲🇱', fact:'Timbuktu was once the world\'s greatest center of Islamic scholarship.',                                               priority:2, languages:[],                          factFr:'Tombouctou était jadis le plus grand centre du savoir islamique au monde.' },
  { code:'TD', name:'Chad',              nameFr:'Tchad',                flag:'🇹🇩', fact:'Lake Chad has shrunk by 90% since the 1960s due to climate change.',                                                   priority:2, languages:[],                          factFr:'Le lac Tchad a diminué de 90% depuis les années 1960.' },
  { code:'CI', name:'Côte d\'Ivoire',    nameFr:'Côte d\'Ivoire',       flag:'🇨🇮', fact:'The world\'s largest producer of cocoa — 40% of the global supply.',                                                   priority:2, languages:[],                          factFr:'Le plus grand producteur mondial de cacao — 40% de l\'offre mondiale.' },
  { code:'GN', name:'Guinea',            nameFr:'Guinée',               flag:'🇬🇳', fact:'Guinea contains two-thirds of the world\'s bauxite reserves.',                                                         priority:2, languages:[],                          factFr:'La Guinée contient les deux tiers des réserves mondiales de bauxite.' },
  { code:'RW', name:'Rwanda',            nameFr:'Rwanda',               flag:'🇷🇼', fact:'Rwanda has the highest percentage of female parliament members in the world.',                                          priority:2, languages:[],                          factFr:'Le Rwanda a le plus fort pourcentage de femmes au parlement dans le monde.' },
  { code:'BI', name:'Burundi',           nameFr:'Burundi',              flag:'🇧🇮', fact:'Despite being one of Africa\'s smallest countries, Burundi has remarkable cultural diversity.',                        priority:2, languages:[],                          factFr:'Malgré sa petite taille, le Burundi possède une remarquable diversité culturelle.' },
  { code:'SS', name:'South Sudan',       nameFr:'Soudan du Sud',        flag:'🇸🇸', fact:'South Sudan is the world\'s newest country, gaining independence in 2011.',                                             priority:2, languages:[],                          factFr:'Le Soudan du Sud est le pays le plus récent du monde, indépendant depuis 2011.' },
  { code:'TG', name:'Togo',              nameFr:'Togo',                 flag:'🇹🇬', fact:'Togo\'s Vodoun Day draws thousands of visitors each January.',                                                          priority:2, languages:[],                          factFr:'La Fête du Vodoun au Togo attire des milliers de visiteurs chaque janvier.' },
  { code:'SL', name:'Sierra Leone',      nameFr:'Sierra Leone',         flag:'🇸🇱', fact:'"Lion Mountains" in Portuguese — named by early explorers.',                                                             priority:2, languages:[],                          factFr:'"Montagnes du Lion" en portugais — ainsi nommé par les premiers explorateurs.' },
  { code:'LR', name:'Liberia',           nameFr:'Liberia',              flag:'🇱🇷', fact:'Africa\'s oldest republic, founded in 1847 by freed American slaves.',                                                 priority:2, languages:[],                          factFr:'Plus ancienne république d\'Afrique, fondée en 1847 par des esclaves libérés.' },
  { code:'CF', name:'Cent. African R.',  nameFr:'Rép. Centrafricaine',  flag:'🇨🇫', fact:'Home to Dzanga-Sangha — one of the last refuges for forest elephants.',                                                priority:2, languages:[],                          factFr:'Abrite Dzanga-Sangha — l\'un des derniers refuges pour les éléphants de forêt.' },
  { code:'ER', name:'Eritrea',           nameFr:'Érythrée',             flag:'🇪🇷', fact:'Eritrea gained independence after a 30-year liberation struggle.',                                                      priority:2, languages:[],                          factFr:'L\'Érythrée a obtenu son indépendance après une lutte de libération de 30 ans.' },
  { code:'NA', name:'Namibia',           nameFr:'Namibie',              flag:'🇳🇦', fact:'The Namib Desert is the world\'s oldest desert, at over 55 million years.',                                             priority:2, languages:[],                          factFr:'Le désert du Namib est le plus ancien du monde, avec plus de 55 millions d\'ans.' },
  { code:'BW', name:'Botswana',          nameFr:'Botswana',             flag:'🇧🇼', fact:'Botswana transformed from one of Africa\'s poorest nations into one of its fastest-growing.',                          priority:2, languages:[],                          factFr:'Le Botswana s\'est transformé de l\'un des pays les plus pauvres en l\'un des plus dynamiques.' },
  { code:'LS', name:'Lesotho',           nameFr:'Lesotho',              flag:'🇱🇸', fact:'Lesotho is entirely surrounded by South Africa.',                                                                        priority:2, languages:[],                          factFr:'Le Lesotho est entièrement enclavé dans l\'Afrique du Sud.' },
  { code:'GW', name:'Guinea-Bissau',     nameFr:'Guinée-Bissau',        flag:'🇬🇼', fact:'The Bijagós Archipelago is a UNESCO Biosphere Reserve with oceanic hippos.',                                           priority:2, languages:[],                          factFr:'L\'archipel des Bijagós est une réserve de biosphère de l\'UNESCO.' },
  { code:'GA', name:'Gabon',             nameFr:'Gabon',                flag:'🇬🇦', fact:'Gabon has 88% forest cover — one of the most forested countries on Earth.',                                             priority:2, languages:[],                          factFr:'Le Gabon a 88% de couverture forestière — l\'un des pays les plus boisés.' },
  { code:'GQ', name:'Equatorial Guinea', nameFr:'Guinée équatoriale',   flag:'🇬🇶', fact:'The only mainland African country where Spanish is an official language.',                                              priority:2, languages:[],                          factFr:'Seul pays d\'Afrique continentale avec l\'espagnol comme langue officielle.' },
  { code:'SZ', name:'Eswatini',          nameFr:'Eswatini',             flag:'🇸🇿', fact:'One of Africa\'s last absolute monarchies.',                                                                             priority:2, languages:[],                          factFr:'L\'une des dernières monarchies absolues d\'Afrique.' },
  { code:'CV', name:'Cape Verde',        nameFr:'Cap-Vert',             flag:'🇨🇻', fact:'Cape Verde\'s Morna music is UNESCO Intangible Cultural Heritage.',                                                     priority:2, languages:[],                          factFr:'La Morna du Cap-Vert est un patrimoine culturel immatériel de l\'UNESCO.' },
  { code:'ST', name:'São Tomé & Príncipe',nameFr:'São Tomé-et-Príncipe',flag:'🇸🇹', fact:'Sits almost exactly on the equator in the Atlantic Ocean.',                                                             priority:2, languages:[],                          factFr:'Situé presque exactement sur l\'équateur dans l\'Atlantique.' },
  { code:'KM', name:'Comoros',           nameFr:'Comores',              flag:'🇰🇲', fact:'The world\'s largest producer of ylang-ylang, used in fine perfumes.',                                                  priority:2, languages:[],                          factFr:'Le plus grand producteur mondial d\'ylang-ylang, utilisé dans les parfums fins.' },
  { code:'MU', name:'Mauritius',         nameFr:'Maurice',              flag:'🇲🇺', fact:'The extinct dodo bird was native to Mauritius.',                                                                         priority:2, languages:[],                          factFr:'Le dodo éteint était originaire de l\'île Maurice.' },
  { code:'SC', name:'Seychelles',        nameFr:'Seychelles',           flag:'🇸🇨', fact:'Home to the Coco de Mer — the world\'s largest seed, up to 25 kg.',                                                    priority:2, languages:[],                          factFr:'Abrite le Coco de Mer — la plus grande graine du monde, jusqu\'à 25 kg.' },
];

const MOBILE_FIRST_COUNT = 27;

const DID_YOU_KNOW = {
  en: [
    { text: 'Africa is home to over <strong>2,000 languages</strong> — more than any other continent on Earth.' },
    { text: 'Nigeria alone has over <strong>500 languages</strong>, with Hausa, Yoruba, and Igbo among the most widely spoken.' },
    { text: 'Swahili is spoken by over <strong>200 million people</strong> across East Africa and is an official language of the African Union.' },
    { text: 'Amharic uses the ancient <strong>Ge\'ez script</strong> — one of the few indigenous African writing systems still in active use.' },
    { text: 'The Zulu language is famous for its <strong>click consonants</strong> and rich oral storytelling tradition.' },
    { text: 'Arabic has been written in Africa for over <strong>1,500 years</strong> — longer than in most of Europe.' },
  ],
  fr: [
    { text: 'L\'Afrique abrite plus de <strong>2 000 langues</strong> — plus que tout autre continent sur Terre.' },
    { text: 'Le Nigeria seul compte plus de <strong>500 langues</strong>, dont le Haoussa, le Yoruba et l\'Igbo.' },
    { text: 'Le Swahili est parlé par plus de <strong>200 millions de personnes</strong> en Afrique de l\'Est.' },
    { text: 'L\'amharique utilise le script <strong>Ge\'ez</strong> — l\'un des rares systèmes d\'écriture africains encore en usage.' },
    { text: 'Le Zoulou est célèbre pour ses <strong>consonnes claquantes</strong> et sa riche tradition orale.' },
    { text: 'L\'arabe est écrit en Afrique depuis plus de <strong>1 500 ans</strong> — plus longtemps que dans la plupart de l\'Europe.' },
  ],
};

// ── Component ────────────────────────────────────────────────────────────────

export function InterfaceLanguageSelector({
  onSelect,
  onSelectLanguage,
  onSignIn,
  onSignUp,
}: InterfaceLanguageSelectorProps) {
  const [interfaceLang, setInterfaceLang] = useState<InterfaceLanguage>('en');
  const [logoError, setLogoError] = useState(false);

  // Search
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Gallery
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const isEn = interfaceLang === 'en';

  const handleFlagClick = (country: CountryData) => {
    setSelectedCountry(country);
    setSelectedLanguage(country.languages[0] || '');
    setPanelOpen(true);
  };

  const handleStartLearning = () => {
    if (!selectedLanguage) return;
    if (onSelectLanguage) {
      onSelectLanguage(selectedLanguage);
    } else {
      onSelect(interfaceLang);
    }
  };

  const handleGetStarted = () => {
    onSignUp ? onSignUp() : onSelect(interfaceLang);
  };

  const handleSignIn = () => {
    onSignIn ? onSignIn() : onSelect(interfaceLang);
  };

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return AFRICAN_COUNTRIES;
    const q = searchQuery.toLowerCase();
    return AFRICAN_COUNTRIES.filter(c => {
      const nameMatch = (isEn ? c.name : c.nameFr).toLowerCase().includes(q);
      const langMatch = c.languages.some(l => LANGUAGE_NAMES[l]?.[isEn ? 'en' : 'fr'].toLowerCase().includes(q));
      return nameMatch || langMatch;
    });
  }, [searchQuery, isEn]);

  const firstHalf  = filteredCountries.slice(0, MOBILE_FIRST_COUNT);
  const secondHalf = filteredCountries.slice(MOBILE_FIRST_COUNT);

  const langName = (id: string) => LANGUAGE_NAMES[id]?.[isEn ? 'en' : 'fr'] ?? id;

  return (
    <div className="ils-root">

      {/* ── Header ── */}
      <header className="ils-header">
        <div className="ils-header-left">
          {logoError ? (
            <div className="ils-logo-fallback" />
          ) : (
            <img
              src="/Afroslang.png"
              alt="Afroslang"
              className="ils-logo"
              onError={() => setLogoError(true)}
            />
          )}
          <span className="ils-brand">Afroslang</span>
        </div>

        <div className="ils-header-right">
          {/* Search */}
          {searchOpen ? (
            <div className="ils-search-bar">
              <input
                autoFocus
                type="text"
                className="ils-search-input"
                placeholder={isEn ? 'Search country or language…' : 'Pays ou langue…'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button className="ils-search-close" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>✕</button>
            </div>
          ) : (
            <button className="ils-search-icon-btn" onClick={() => setSearchOpen(true)}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" />
              </svg>
            </button>
          )}

          {/* EN / FR toggle */}
          <div className="afroLangToggle">
            <button
              type="button"
              className={`afroLangToggleBtn${interfaceLang === 'en' ? ' afroLangToggleBtn--active' : ''}`}
              onClick={() => setInterfaceLang('en')}
            >EN</button>
            <button
              type="button"
              className={`afroLangToggleBtn${interfaceLang === 'fr' ? ' afroLangToggleBtn--active' : ''}`}
              onClick={() => setInterfaceLang('fr')}
            >FR</button>
          </div>

          <button type="button" className="afroSignInBtn" onClick={handleSignIn}>
            {isEn ? 'Sign In' : 'Connexion'}
          </button>
        </div>
      </header>

      {/* ── Hero bar ── */}
      <section className="ils-hero">
        <div className="ils-hero-inner">
          <div className="ils-hero-text">
            <span className="ils-hero-eyebrow">
              {isEn ? 'African Language Learning' : 'Apprentissage des langues africaines'}
            </span>
            <h1 className="ils-hero-title">
              {isEn ? <>Master an <em>African</em> Language.</> : <>Maîtrisez une <em>langue</em> africaine.</>}
            </h1>
            <p className="ils-hero-sub">
              {isEn
                ? 'From Swahili to Igbo, Hausa to Amharic — tap a country flag to start.'
                : 'Du Swahili à l\'Igbo, du Haoussa à l\'Amharique — touchez un drapeau pour commencer.'}
            </p>
            <div className="ils-hero-actions">
              <button className="afroHeroCta" onClick={handleGetStarted}>
                {isEn ? 'Get Started →' : 'Commencer →'}
              </button>
              <button className="afroHeroGhost" onClick={handleSignIn}>
                {isEn ? 'I have an account' : 'J\'ai un compte'}
              </button>
            </div>
          </div>
          <div className="ils-hero-mascot">
            <img
              src="/Afroslang.png"
              alt=""
              className="ils-mascot-img"
              onError={() => setLogoError(true)}
            />
            <div className="ils-mascot-glow" />
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="afroDividerRow">
        <div className="afroDividerLine" />
        <span className="afroDividerLabel">
          {isEn ? 'Choose a country to begin' : 'Choisissez un pays pour commencer'}
        </span>
        <div className="afroDividerLine" />
      </div>

      {/* ── Main: featured panel + flag grid ── */}
      <div className="ils-main">

        {/* Featured panel — desktop sidebar / mobile bottom-sheet */}
        <aside className={`ils-panel${panelOpen ? ' ils-panel--open' : ''}`}>
          <div className="ils-panel-handle" />

          {selectedCountry ? (
            <div key={selectedCountry.code} className="ils-panel-inner">
              <button className="ils-panel-close" onClick={() => setPanelOpen(false)}>✕</button>

              <img className="ils-panel-flag" src={`https://flagcdn.com/w80/${selectedCountry.code.toLowerCase()}.png`} alt={selectedCountry.flag} />
              <h2 className="ils-panel-name">{isEn ? selectedCountry.name : selectedCountry.nameFr}</h2>
              <p className="ils-panel-fact">{isEn ? selectedCountry.fact : selectedCountry.factFr}</p>

              {selectedCountry.languages.length > 0 ? (
                <div className="ils-panel-langs">
                  <label className="ils-lang-label">
                    {isEn ? 'Choose a language to learn' : 'Choisissez une langue à apprendre'}
                  </label>
                  <div className="ils-select-wrap">
                    <select
                      className="ils-lang-select"
                      value={selectedLanguage}
                      onChange={e => setSelectedLanguage(e.target.value)}
                    >
                      {selectedCountry.languages.map(lid => (
                        <option key={lid} value={lid}>{langName(lid)}</option>
                      ))}
                    </select>
                    <span className="ils-select-arrow">▾</span>
                  </div>
                  <button className="ils-btn-start" onClick={handleStartLearning}>
                    {isEn
                      ? `Start Learning ${selectedLanguage ? langName(selectedLanguage) : ''}`
                      : `Apprendre le ${selectedLanguage ? langName(selectedLanguage) : ''}`}
                  </button>
                </div>
              ) : (
                <div className="ils-coming-soon">
                  <span>🌍</span>
                  <p>{isEn
                    ? `Languages for ${selectedCountry.name} are coming soon!`
                    : `Les langues de ${selectedCountry.nameFr} arrivent bientôt !`}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="ils-panel-empty">
              <img src="/Afroslang.png" alt="" className="ils-panel-logo" onError={() => {}} />
              <p>{isEn ? 'Tap a flag to explore its languages' : 'Touchez un drapeau pour explorer ses langues'}</p>
            </div>
          )}
        </aside>

        {/* Flag grid */}
        <div className="ils-grid-wrap">
          <div className="ils-flag-grid">
            {firstHalf.map((country, idx) => (
              <button
                key={country.code}
                className={[
                  'ils-flag-btn ils-flag-btn--flow',
                  selectedCountry?.code === country.code ? 'ils-flag-btn--active' : '',
                  country.languages.length === 0 ? 'ils-flag-btn--dim' : '',
                ].join(' ')}
                style={{ animationDelay: `${idx * 28}ms` }}
                onClick={() => handleFlagClick(country)}
                title={isEn ? country.name : country.nameFr}
              >
                <img className="ils-flag-emoji" src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`} alt={country.flag} loading="lazy" />
                <span className="ils-flag-name">{isEn ? country.name : country.nameFr}</span>
              </button>
            ))}

            {!showAll && secondHalf.length > 0 && (
              <button className="ils-more-btn" onClick={() => setShowAll(true)} title={isEn ? 'See all countries' : 'Voir tous les pays'}>
                <span>›</span>
              </button>
            )}

            {showAll && secondHalf.map((country, idx) => (
              <button
                key={country.code}
                className={[
                  'ils-flag-btn ils-flag-btn--flow',
                  selectedCountry?.code === country.code ? 'ils-flag-btn--active' : '',
                  country.languages.length === 0 ? 'ils-flag-btn--dim' : '',
                ].join(' ')}
                style={{ animationDelay: `${idx * 28}ms` }}
                onClick={() => handleFlagClick(country)}
                title={isEn ? country.name : country.nameFr}
              >
                <img className="ils-flag-emoji" src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`} alt={country.flag} loading="lazy" />
                <span className="ils-flag-name">{isEn ? country.name : country.nameFr}</span>
              </button>
            ))}

            {showAll && (
              <button className="ils-less-btn" onClick={() => setShowAll(false)}>
                <span>‹</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Did You Know ── */}
      <section className="ils-info">
        <details className="ils-info-section" open>
          <summary className="ils-info-summary">
            {isEn ? 'Did You Know?' : 'Le saviez-vous ?'}
          </summary>
          <div className="ils-info-body">
            <div className="ils-facts-grid">
              {DID_YOU_KNOW[isEn ? 'en' : 'fr'].map((fact, i) => (
                <div
                  key={i}
                  className="ils-fact-card"
                  dangerouslySetInnerHTML={{ __html: fact.text }}
                />
              ))}
            </div>
          </div>
        </details>

        <details className="ils-info-section">
          <summary className="ils-info-summary">
            {isEn ? 'About Afroslang' : 'À propos d\'Afroslang'}
          </summary>
          <div className="ils-info-body ils-about-grid">
            <div className="ils-about-card">
              <div className="ils-about-title">{isEn ? 'What is Afroslang?' : 'Qu\'est-ce qu\'Afroslang ?'}</div>
              <p>{isEn
                ? 'A free, gamified African language learning platform. Choose from 15 languages, follow 7-stage learning paths, and build real fluency through short daily lessons, XP streaks, and cultural facts.'
                : 'Une plateforme gratuite d\'apprentissage des langues africaines. Choisissez parmi 15 langues et progressez avec des leçons courtes et engageantes.'}
              </p>
            </div>
            <div className="ils-about-card">
              <div className="ils-about-title">{isEn ? 'How it works' : 'Comment ça marche'}</div>
              <p>{isEn
                ? 'Pick a language → follow the 7-stage curriculum → complete lessons → earn XP → climb the leaderboard. Each lesson takes 3–5 minutes.'
                : 'Choisissez une langue → suivez les 7 étapes → complétez les leçons → gagnez des XP. Chaque leçon dure 3 à 5 minutes.'}
              </p>
            </div>
            <div className="ils-about-card">
              <div className="ils-about-title">Beta v1.0 · Sonoaac</div>
              <p>{isEn
                ? 'Afroslang is in beta. Content is continuously reviewed. Use the feedback option in-app to report errors.'
                : 'Afroslang est en beta. Le contenu est continuellement amélioré. Utilisez l\'option feedback dans l\'app.'}
              </p>
            </div>
          </div>
        </details>
      </section>

      {/* Mobile backdrop */}
      {panelOpen && <div className="ils-backdrop" onClick={() => setPanelOpen(false)} />}

      {/* ── Sticky guest bar ── */}
      <div className="afroGuestBar">
        <span className="afroGuestBarText">
          {isEn
            ? <><strong>Free to start.</strong> No account required to begin.</>
            : <><strong>Gratuit pour commencer.</strong> Aucun compte requis.</>}
        </span>
        <div className="afroGuestBarActions">
          <button type="button" className="afroHeroGhost" onClick={() => onSelect(interfaceLang)}>
            {isEn ? 'Continue as Guest' : 'Continuer en invité'}
          </button>
          <button type="button" className="afroHeroCta" onClick={handleGetStarted}>
            {isEn ? 'Create Account' : 'Créer un compte'}
          </button>
        </div>
      </div>

    </div>
  );
}
