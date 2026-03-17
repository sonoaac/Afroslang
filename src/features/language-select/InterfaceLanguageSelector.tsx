import { useMemo, useState } from 'react';
import { InterfaceLanguage } from '../../types';
import { Search } from 'lucide-react';
import { languages } from '../../data/languages';
import { FlagIcon } from './FlagIcon';

import './InterfaceLanguageSelectorSocial.css';

interface InterfaceLanguageSelectorProps {
  onSelect: (language: InterfaceLanguage) => void;
  onSelectLanguage?: (languageId: string) => void;
  onSignIn?: () => void;
  onSignUp?: () => void;
}

const REGION_LABELS: Record<string, string> = {
  west: 'West Africa',
  east: 'East Africa',
  central: 'Central Africa',
  north: 'North Africa',
  southern: 'Southern Africa',
};

export function InterfaceLanguageSelector({ onSelect, onSelectLanguage, onSignIn, onSignUp }: InterfaceLanguageSelectorProps) {
  const [activeTab, setActiveTab] = useState<'languages' | 'timeline' | 'about'>('languages');
  const [searchQuery, setSearchQuery] = useState('');
  const [interfaceLang, setInterfaceLang] = useState<InterfaceLanguage>('en');
  const [logoError, setLogoError] = useState(false);

  const isEnglish = interfaceLang === 'en';

  const handlePickLanguage = (languageId: string) => {
    if (onSelectLanguage) {
      onSelectLanguage(languageId);
    } else {
      onSelect(interfaceLang);
    }
  };

  const handleGetStarted = () => onSelect(interfaceLang);

  const visibleLanguages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return languages;
    return languages.filter(
      (l) => l.name.toLowerCase().includes(q) || l.nameFr.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="afroRoot">

      {/* ── Header ── */}
      <header className="afroHeader">
        <div className="afroHeaderBrand">
          {logoError ? (
            <div style={{ width:32,height:32,borderRadius:'50%',background:'#b00020' }} />
          ) : (
            <img
              src="/Afroslang.png"
              alt="Afroslang"
              className="afroHeaderLogo"
              onError={() => setLogoError(true)}
            />
          )}
          <span className="afroHeaderName">Afroslang</span>
        </div>

        <div className="afroHeaderRight">
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
          <button type="button" className="afroSignInBtn" onClick={onSignIn ?? handleGetStarted}>
            {isEnglish ? 'Sign In' : 'Connexion'}
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="afroHero">
        <div className="afroHeroLeft">
          <div className="afroHeroEyebrow">
            <span className="afroHeroEyebrowText">
              {isEnglish ? 'African Language Learning' : 'Apprentissage des langues africaines'}
            </span>
          </div>

          <h1 className="afroHeroTitle">
            {isEnglish ? (
              <>Master an <em>African</em><br />Language.</>
            ) : (
              <>Maîtrisez une <em>langue</em><br />africaine.</>
            )}
          </h1>

          <p className="afroHeroSub">
            {isEnglish
              ? 'From Swahili to Igbo, Hausa to Amharic — learn the languages of 1.4 billion people through structured lessons, streaks, and culture.'
              : 'Du Swahili à l\'Igbo, du Haoussa à l\'Amharique — apprenez les langues de 1,4 milliard de personnes.'}
          </p>

          <div className="afroHeroActions">
            <button type="button" className="afroHeroCta" onClick={onSignUp ?? handleGetStarted}>
              {isEnglish ? 'Get Started →' : 'Commencer →'}
            </button>
            <button type="button" className="afroHeroGhost" onClick={onSignIn ?? handleGetStarted}>
              {isEnglish ? 'I have an account' : 'J\'ai un compte'}
            </button>
          </div>
        </div>

        <div className="afroHeroRight">
          <div className="afroMascotWrap">
            {logoError ? (
              <div className="afroMascotFallback">🐦</div>
            ) : (
              <img
                src="/Afroslang.png"
                alt="Afroslang mascot"
                className="afroMascotImg"
                onError={() => setLogoError(true)}
              />
            )}
            <div className="afroMascotGlow" />
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="afroDividerRow">
        <div className="afroDividerLine" />
        <span className="afroDividerLabel">
          {isEnglish ? 'Choose a language to begin' : 'Choisissez une langue pour commencer'}
        </span>
        <div className="afroDividerLine" />
      </div>

      {/* ── Tabs ── */}
      <div className="afroTabsRow">
        {(['languages', 'timeline', 'about'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            className={`afroTab${activeTab === tab ? ' afroTab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'languages'
              ? (isEnglish ? 'Languages' : 'Langues')
              : tab === 'timeline'
              ? (isEnglish ? 'Did You Know' : 'Le saviez-vous')
              : (isEnglish ? 'About' : 'À propos')}
          </button>
        ))}
      </div>

      {/* ── Languages tab ── */}
      {activeTab === 'languages' && (
        <>
          <div className="afroSearchWrap">
            <div className="afroSearchInner">
              <Search className="afroSearchIcon" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isEnglish ? 'Search languages…' : 'Rechercher…'}
                aria-label="Search languages"
              />
            </div>
          </div>

          <div className="afroGrid">
            {visibleLanguages.map((lang, idx) => {
              const name = (isEnglish ? lang.name : lang.nameFr).split('(')[0].trim();
              return (
                <button
                  key={lang.id}
                  type="button"
                  className="afroCard"
                  style={{ ['--card-i' as any]: idx }}
                  onClick={() => handlePickLanguage(lang.id)}
                  aria-label={`Learn ${name}`}
                >
                  <div className="afroCardFlag">
                    <FlagIcon country={lang.flags[0]} size="lg" />
                  </div>
                  <div className="afroCardName">{name}</div>
                  <div className="afroCardRegion">
                    {REGION_LABELS[lang.region] ?? lang.region}
                  </div>
                  <div className="afroCardSpeakers">{lang.speakers}</div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* ── Timeline / Facts tab ── */}
      {activeTab === 'timeline' && (
        <div className="afroTimeline">
          {[
            isEnglish
              ? { text: 'Africa is home to over <strong>2,000 languages</strong>, making it the most linguistically diverse continent on Earth.' }
              : { text: 'L\'Afrique abrite plus de <strong>2 000 langues</strong>, ce qui en fait le continent linguistiquement le plus diversifié.' },
            isEnglish
              ? { text: 'Nigeria alone has over <strong>500 languages</strong>, with Hausa, Yoruba, and Igbo among the most widely spoken.' }
              : { text: 'Le Nigeria seul compte plus de <strong>500 langues</strong>, dont le Haoussa, le Yoruba et l\'Igbo.' },
            isEnglish
              ? { text: 'Swahili is spoken by over <strong>200 million people</strong> across East Africa and is one of the official languages of the African Union.' }
              : { text: 'Le Swahili est parlé par plus de <strong>200 millions de personnes</strong> en Afrique de l\'Est.' },
            isEnglish
              ? { text: 'Amharic, the official language of Ethiopia, is written in the ancient <strong>Ge\'ez script</strong> and has over 60 million speakers.' }
              : { text: 'L\'amharique, langue officielle de l\'Éthiopie, s\'écrit en script <strong>Ge\'ez</strong> et compte plus de 60 millions de locuteurs.' },
            isEnglish
              ? { text: 'The Zulu language of South Africa is famous for its <strong>click consonants</strong> and rich oral storytelling tradition.' }
              : { text: 'Le Zoulou d\'Afrique du Sud est célèbre pour ses <strong>consonnes claquantes</strong> et sa riche tradition orale.' },
            isEnglish
              ? { text: 'Arabic, spoken across North Africa, is one of the world\'s <strong>oldest written languages</strong>, with records dating back over 1,500 years.' }
              : { text: 'L\'arabe, parlé en Afrique du Nord, est l\'une des <strong>plus anciennes langues écrites</strong> du monde.' },
          ].map((fact, i) => (
            <div key={i} className="afroTimelineItem">
              <div className="afroTimelineDot" />
              <div
                className="afroTimelineText"
                dangerouslySetInnerHTML={{ __html: fact.text }}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── About tab ── */}
      {activeTab === 'about' && (
        <div className="afroAbout">
          <div className="afroAboutCard">
            <div className="afroAboutCardTitle">{isEnglish ? 'What is Afroslang?' : 'Qu\'est-ce qu\'Afroslang ?'}</div>
            <div className="afroAboutCardText">
              {isEnglish
                ? <><strong>Afroslang</strong> is a free, gamified African language learning platform. Choose from 15 languages, follow structured 7-stage learning paths, and build real fluency through short daily lessons, XP streaks, and cultural facts.</>
                : <><strong>Afroslang</strong> est une plateforme gratuite d'apprentissage des langues africaines. Choisissez parmi 15 langues et progressez avec des leçons courtes et engageantes.</>}
            </div>
          </div>
          <div className="afroAboutCard">
            <div className="afroAboutCardTitle">{isEnglish ? 'How it works' : 'Comment ça marche'}</div>
            <div className="afroAboutCardText">
              {isEnglish
                ? <>Pick a language → follow the 7-stage curriculum → complete lessons → earn XP → climb the leaderboard. Each lesson takes <strong>3–5 minutes</strong>. Streaks and hearts keep you accountable.</>
                : <>Choisissez une langue → suivez les 7 étapes → complétez les leçons → gagnez des XP → montez dans le classement. Chaque leçon dure <strong>3 à 5 minutes</strong>.</>}
            </div>
          </div>
          <div className="afroAboutCard">
            <div className="afroAboutCardTitle">Beta v1.0 · Parent: Sonoaac</div>
            <div className="afroAboutCardText">
              {isEnglish
                ? 'Afroslang is currently in beta. Content is continuously reviewed and improved. If you spot an error, use the feedback option in the app.'
                : 'Afroslang est actuellement en beta. Le contenu est continuellement revu et amélioré.'}
            </div>
          </div>
          <div className="afroAboutCard">
            <div className="afroAboutCardTitle">{isEnglish ? 'Supported Languages' : 'Langues supportées'}</div>
            <div className="afroAboutCardText">
              {languages.map(l => (isEnglish ? l.name : l.nameFr).split('(')[0].trim()).join(' · ')}
            </div>
          </div>
        </div>
      )}

      {/* ── Guest bar ── */}
      <div className="afroGuestBar">
        <span className="afroGuestBarText">
          {isEnglish
            ? <><strong>Free to start.</strong> No account required to begin.</>
            : <><strong>Gratuit pour commencer.</strong> Aucun compte requis.</>}
        </span>
        <div className="afroGuestBarActions">
          <button type="button" className="afroHeroGhost" style={{ padding:'10px 20px', fontSize:'0.75rem' }} onClick={handleGetStarted}>
            {isEnglish ? 'Continue as Guest' : 'Continuer en invité'}
          </button>
          <button type="button" className="afroHeroCta" style={{ padding:'10px 20px', fontSize:'0.75rem' }} onClick={onSignUp ?? handleGetStarted}>
            {isEnglish ? 'Create Account' : 'Créer un compte'}
          </button>
        </div>
      </div>

    </div>
  );
}
