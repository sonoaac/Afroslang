import { useState, useEffect } from 'react';
import { culturalFacts, getFactEmoji } from '../../data/culturalFacts';
import { getLanguageById } from '../../data/languages';

interface MascotFactCardProps {
  languageId: string;
  isEnglish: boolean;
}

export function MascotFactCard({ languageId, isEnglish }: MascotFactCardProps) {
  const [factIndex, setFactIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(() => 180 + Math.floor(Math.random() * 120));
  const [logoError, setLogoError] = useState(false);

  const facts = culturalFacts[languageId] ?? [];
  const fact = facts[factIndex];
  const lang = getLanguageById(languageId);
  const emoji = getFactEmoji(languageId);

  useEffect(() => {
    if (facts.length <= 1) return;
    const id = setInterval(() => {
      setFactIndex(i => (i + 1) % facts.length);
    }, 28000);
    return () => clearInterval(id);
  }, [facts.length]);

  if (!fact) return null;

  const flagStr = lang?.flags?.slice(0, 2).join(' ') ?? '🌍';
  const regionLabel = lang?.region
    ? { west: 'West Africa', east: 'East Africa', central: 'Central Africa', north: 'North Africa', southern: 'Southern Africa' }[lang.region] ?? ''
    : '';

  const handleLike = () => {
    setLiked(p => !p);
    setLikes(p => liked ? p - 1 : p + 1);
  };

  return (
    <div className="mascot-fact-card">
      {/* Header */}
      <div className="mascot-fact-header">
        <div className="mascot-fact-avatar">
          {logoError ? (
            <span style={{ fontSize: 22 }}>🐦</span>
          ) : (
            <img
              src="/Afroslang.png"
              alt="Afroslang mascot"
              onError={() => setLogoError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          )}
        </div>
        <div className="mascot-fact-meta">
          <span className="mascot-fact-name">Afroslang</span>
          <span className="mascot-fact-label">
            {isEnglish ? 'Cultural Insight' : 'Aperçu Culturel'} · {flagStr}
          </span>
        </div>
        <span className="mascot-fact-badge">{emoji}</span>
      </div>

      {/* Fact body */}
      <p className="mascot-fact-body">
        {isEnglish ? fact.text : fact.textFr}
      </p>

      {/* Language tag */}
      <div className="mascot-fact-tag">
        <span>{flagStr} {lang?.name ?? languageId} · {regionLabel}</span>
      </div>

      {/* Social row */}
      <div className="mascot-fact-social">
        <button
          className={`mascot-fact-btn ${liked ? 'mascot-fact-btn--liked' : ''}`}
          onClick={handleLike}
          aria-label="Like"
        >
          {liked ? '♥' : '♡'} {likes}
        </button>
        <button className="mascot-fact-btn" aria-label="Comments">
          💬 {12 + Math.floor(Math.random() * 8)}
        </button>
        <button className="mascot-fact-btn mascot-fact-btn--share" aria-label="Share">
          {isEnglish ? '↗ Share' : '↗ Partager'}
        </button>
        {facts.length > 1 && (
          <button
            className="mascot-fact-btn mascot-fact-btn--next"
            onClick={() => setFactIndex(i => (i + 1) % facts.length)}
            aria-label="Next fact"
          >
            {isEnglish ? 'Next ›' : 'Suivant ›'}
          </button>
        )}
      </div>
    </div>
  );
}
