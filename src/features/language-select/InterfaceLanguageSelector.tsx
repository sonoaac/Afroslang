import { useMemo, useState } from 'react';
import { InterfaceLanguage } from '../../types';
import { BookOpen, Compass, Home, Newspaper, Search } from 'lucide-react';
import { languages } from '../../data/languages';
import { FlagIcon } from './FlagIcon';

import './InterfaceLanguageSelectorSocial.css';

interface InterfaceLanguageSelectorProps {
  onSelect: (language: InterfaceLanguage) => void;
}

export function InterfaceLanguageSelector({ onSelect }: InterfaceLanguageSelectorProps) {
  const [logoError, setLogoError] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'about' | 'languages'>('timeline');
  const [searchQuery, setSearchQuery] = useState('');

  const handleGetStarted = () => onSelect('en');
  const handleLogin = () => onSelect('en');

  const visibleLanguages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return languages;
    return languages.filter((l) => l.name.toLowerCase().includes(q) || l.nameFr.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <div className="afroSocialRoot">
      <aside className="afroSocialLeft">
        <div className="afroSideHeader">
          <div className="afroBrand">
            {logoError ? (
              <div className="afroBrandLogo" aria-hidden />
            ) : (
              <img
                src="/afroslang-logo.png"
                alt="Afroslang logo"
                className="afroBrandLogo"
                onError={() => setLogoError(true)}
              />
            )}
            <div>
              <div className="afroBrandName">Afroslang</div>
              <div className="afroBeta">Beta v1.0 • Parent: Sonoaac</div>
            </div>
          </div>
        </div>

        <div className="afroSideSection">
          <div className="afroSideTitle">MENU</div>
          <div className="afroMenu">
            <button type="button" className="afroMenuButton afroMenuButtonActive">
              <Home className="afroMenuIcon" />
              Home
            </button>
            <button type="button" className="afroMenuButton">
              <Newspaper className="afroMenuIcon" />
              Latest News
            </button>
            <button type="button" className="afroMenuButton">
              <Compass className="afroMenuIcon" />
              Explore
            </button>
            <button type="button" className="afroMenuButton">
              <BookOpen className="afroMenuIcon" />
              Learn
            </button>
          </div>
        </div>

        <div className="afroSideSection" style={{ marginTop: 'auto' }}>
          <div className="afroSideTitle">AFROSLANG</div>
          <div className="afroSmallText">
            The free, fun, and effective way to learn African languages.
          </div>
        </div>
      </aside>

      <main className="afroSocialMain">
        <div className="afroTopBar">
          <div className="afroSearch" role="search">
            <Search className="afroMenuIcon" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search languages"
              aria-label="Search languages"
            />
          </div>
          <button type="button" className="afroIconButton" onClick={handleGetStarted} aria-label="Get started">
            <BookOpen className="afroMenuIcon" />
          </button>
        </div>

        <div className="afroMainScroll">
          <section className="afroProfile">
            <div className="afroProfileCover" aria-hidden />
            <div className="afroProfileHeader">
              <div className="afroProfileAvatar">
                {logoError ? (
                  <div className="afroAvatarImg" aria-hidden />
                ) : (
                  <img
                    src="/afroslang-logo.png"
                    alt="Afroslang logo"
                    className="afroAvatarImg"
                    onError={() => setLogoError(true)}
                  />
                )}
                <div>
                  <div className="afroProfileName">Afroslang</div>
                  <div className="afroProfileTagline">African language learning • Social profile beta</div>
                </div>
              </div>
            </div>

            <div className="afroProfileMenu" role="tablist" aria-label="Profile navigation">
              <button
                type="button"
                className={`afroProfileTab ${activeTab === 'timeline' ? 'afroProfileTabActive' : ''}`}
                onClick={() => setActiveTab('timeline')}
                role="tab"
                aria-selected={activeTab === 'timeline'}
              >
                Timeline
              </button>
              <button
                type="button"
                className={`afroProfileTab ${activeTab === 'about' ? 'afroProfileTabActive' : ''}`}
                onClick={() => setActiveTab('about')}
                role="tab"
                aria-selected={activeTab === 'about'}
              >
                About
              </button>
              <button
                type="button"
                className={`afroProfileTab ${activeTab === 'languages' ? 'afroProfileTabActive' : ''}`}
                onClick={() => setActiveTab('languages')}
                role="tab"
                aria-selected={activeTab === 'languages'}
              >
                Languages
              </button>
            </div>
          </section>

          <section className="afroTimeline">
            <div>
              <div className="afroBox">
                <div className="afroBoxTitle">Introduction</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                  <span className="afroPill">Afroslang</span>
                  <span className="afroPill">Beta v1.0</span>
                  <span className="afroPill">Parent: Sonoaac</span>
                </div>
                <div style={{ display: 'grid', gap: 10 }}>
                  <div className="afroSmallText">
                    🌍 Africa is home to over <strong>2,000 languages</strong>, making it the most linguistically diverse continent on Earth.
                  </div>
                  <div className="afroSmallText">
                    Nigeria alone has over <strong>500 languages</strong>, with Hausa, Yoruba, and Igbo among the most widely spoken.
                  </div>
                  <div className="afroSmallText">
                    Swahili is spoken by over <strong>200 million</strong> people across East Africa and is one of the official languages of the African Union.
                  </div>
                </div>
              </div>

              <div className="afroBox" style={{ marginTop: 16 }}>
                <div className="afroBoxTitle">Featured Languages</div>
                <div className="afroLanguageGrid" aria-label="Featured languages">
                  {visibleLanguages.slice(0, 15).map((language) => {
                    const displayName = language.name.split('(')[0].trim();
                    return (
                      <div key={language.id} className="afroLangChip">
                        <FlagIcon country={language.flags[0]} size="sm" />
                        <span title={displayName}>{displayName.toUpperCase()}</span>
                      </div>
                    );
                  })}
                </div>
                {visibleLanguages.length > 15 && (
                  <div className="afroSmallText" style={{ marginTop: 10 }}>
                    Showing 15 of {visibleLanguages.length} • use search to filter
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="afroBox">
                <div className="afroBoxTitle">Get started</div>
                <div className="afroSmallText">
                  The free, fun, and effective way to learn African languages.
                </div>
                <div className="afroCtaRow">
                  <button type="button" className="afroPrimaryButton" onClick={handleGetStarted}>
                    GET STARTED
                  </button>
                  <button type="button" className="afroSecondaryButton" onClick={handleLogin}>
                    I ALREADY HAVE AN ACCOUNT
                  </button>
                </div>
              </div>

              <div className="afroBox" style={{ marginTop: 16 }}>
                <div className="afroBoxTitle">What you’ll do</div>
                <div style={{ display: 'grid', gap: 10 }}>
                  <div className="afroSmallText">Pick a language (Hausa, Yoruba, Igbo, Swahili…)</div>
                  <div className="afroSmallText">Follow a learning path with quick lessons</div>
                  <div className="afroSmallText">Build streaks, earn XP, and track progress</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <aside className="afroSocialRight">
        <div className="afroRightSection">
          <div className="afroAccountLine">
            <div>
              <div className="afroAccountName">Afroslang</div>
              <div className="afroSmallText">Landing • Interface select</div>
            </div>
            {logoError ? (
              <div className="afroBrandLogo" aria-hidden />
            ) : (
              <img
                src="/afroslang-logo.png"
                alt="Afroslang logo"
                className="afroBrandLogo"
                onError={() => setLogoError(true)}
              />
            )}
          </div>
        </div>
        <div className="afroRightSection">
          <div className="afroSideTitle">DID YOU KNOW?</div>
          <div className="afroSmallText" style={{ display: 'grid', gap: 10 }}>
            <div>🌍 Africa has over 2,000 languages.</div>
            <div>🇳🇬 Nigeria has over 500 languages.</div>
            <div>🇰🇪 Swahili is spoken by 200M+.</div>
          </div>
        </div>
        <div className="afroRightSection" style={{ borderBottom: 'none' }}>
          <div className="afroSideTitle">QUICK ACTION</div>
          <button type="button" className="afroPrimaryButton" onClick={handleGetStarted} style={{ width: '100%' }}>
            START NOW
          </button>
        </div>
      </aside>
    </div>
  );
}
