import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Gem, Heart, Zap, ChevronLeft } from 'lucide-react';
import { SandbitsIcon } from '../../components/ui/SandbitsIcon';
import { InterfaceLanguage } from '../../types';
import {
  purchaseHeartsRefill,
  purchaseSandbitsPack,
  purchaseXpBoost,
  isXpBoostActive,
  xpBoostRemainingMs,
  COST_HEARTS_REFILL,
  COST_SANDBITS_PACK,
  COST_XP_BOOST,
} from '../../utils/currencyUtils';

interface ShopScreenProps {
  interfaceLanguage: InterfaceLanguage;
  onBack: () => void;
}

export function ShopScreen({ interfaceLanguage, onBack }: ShopScreenProps) {
  const { userData, setUserData, user } = useAuth();
  const isEnglish = interfaceLanguage === 'en';
  const [purchasing, setPurchasing] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const gems     = userData?.gems     ?? 0;
  const sandbits = userData?.sandbits ?? 0;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const handlePurchase = async (index: number) => {
    if (!user || !userData) {
      showToast(isEnglish ? 'Sign in to purchase items.' : 'Connectez-vous pour acheter.');
      return;
    }
    setPurchasing(index);
    try {
      let result: Partial<typeof userData> | null = null;
      if (index === 0) {
        if (gems < COST_HEARTS_REFILL) {
          showToast(isEnglish ? `Need ${COST_HEARTS_REFILL} Gems (you have ${gems})` : `Il faut ${COST_HEARTS_REFILL} Gemmes (vous en avez ${gems})`);
          return;
        }
        result = await purchaseHeartsRefill(user.uid, userData);
        if (result) showToast(isEnglish ? '❤️ Hearts refilled to 5!' : '❤️ Cœurs rechargés à 5!');
      } else if (index === 1) {
        if (gems < COST_SANDBITS_PACK) {
          showToast(isEnglish ? `Need ${COST_SANDBITS_PACK} Gems (you have ${gems})` : `Il faut ${COST_SANDBITS_PACK} Gemmes (vous en avez ${gems})`);
          return;
        }
        result = await purchaseSandbitsPack(user.uid, userData);
        if (result) showToast(isEnglish ? '✨ +500 Sandbits added!' : '✨ +500 Sablebits ajoutés!');
      } else if (index === 2) {
        if (isXpBoostActive(userData)) {
          showToast(isEnglish ? '⚡ XP Boost already active!' : '⚡ Boost XP déjà actif!');
          return;
        }
        if (sandbits < COST_XP_BOOST) {
          showToast(isEnglish ? `Need ${COST_XP_BOOST} Sandbits (you have ${sandbits})` : `Il faut ${COST_XP_BOOST} Sablebits (vous en avez ${sandbits})`);
          return;
        }
        result = await purchaseXpBoost(user.uid, userData);
        if (result) showToast(isEnglish ? '⚡ 2× XP Boost active for 1 hour!' : '⚡ Boost 2× XP actif pendant 1 heure!');
      }
      if (result) {
        setUserData({ ...userData, ...result });
      }
    } catch {
      showToast(isEnglish ? 'Purchase failed. Try again.' : 'Achat échoué. Réessayez.');
    } finally {
      setPurchasing(null);
    }
  };

  const spFont = "'Times New Roman', Georgia, serif";
  const spBg = '#080808';
  const spSurface = '#111111';
  const spBorder = 'rgba(255,255,255,0.08)';
  const spRed = '#b00020';
  const spRedBright = '#e53935';
  const spText = '#ffffff';
  const spMuted = 'rgba(255,255,255,0.55)';

  const boostActive = isXpBoostActive(userData);
  const boostMs = xpBoostRemainingMs(userData);
  const boostMinutes = Math.ceil(boostMs / 60000);

  const shopItems = [
    {
      icon: <Heart style={{ width: 52, height: 52, color: spRedBright }} strokeWidth={1.5} />,
      emoji: '❤️',
      title: isEnglish ? 'Refill Hearts' : 'Recharger les Cœurs',
      desc: isEnglish
        ? 'Lost all your hearts? Get back in the game immediately. Restore all 5 lives in one tap.'
        : 'Plus de cœurs? Revenez immédiatement dans le jeu. Restaurez 5 vies en un seul tap.',
      price: COST_HEARTS_REFILL,
      currency: isEnglish ? 'Gems' : 'Gemmes',
      CurrencyIcon: <Gem style={{ width: 18, height: 18, color: spRedBright }} strokeWidth={2} />,
      canAfford: gems >= COST_HEARTS_REFILL,
      accentColor: '#e53935',
      tag: null,
    },
    {
      icon: <SandbitsIcon size={52} className="" />,
      emoji: '✨',
      title: isEnglish ? 'Sandbits Pack' : 'Pack de Sablebits',
      desc: isEnglish
        ? 'Stock up on premium currency. Use Sandbits to unlock exclusive boosts and power-ups.'
        : 'Faites le plein de devise premium. Utilisez des Sablebits pour débloquer des boosts exclusifs.',
      price: COST_SANDBITS_PACK,
      currency: isEnglish ? 'Gems' : 'Gemmes',
      CurrencyIcon: <Gem style={{ width: 18, height: 18, color: spRedBright }} strokeWidth={2} />,
      canAfford: gems >= COST_SANDBITS_PACK,
      accentColor: '#c0850a',
      tag: '+500',
    },
    {
      icon: <Zap style={{ width: 52, height: 52, color: boostActive ? '#ffd60a' : spRedBright }} strokeWidth={1.5} />,
      emoji: '⚡',
      title: isEnglish ? 'XP Boost 2×' : 'Boost XP 2×',
      desc: boostActive
        ? (isEnglish ? `Your boost is active — ${boostMinutes} minutes remaining. Keep learning!` : `Votre boost est actif — ${boostMinutes} minutes restantes. Continuez!`)
        : (isEnglish ? 'Double your XP for an entire hour. Perfect for powering through lessons.' : 'Doublez vos XP pendant une heure. Idéal pour avancer rapidement dans les leçons.'),
      price: COST_XP_BOOST,
      currency: isEnglish ? 'Sandbits' : 'Sablebits',
      CurrencyIcon: <SandbitsIcon size={18} />,
      canAfford: sandbits >= COST_XP_BOOST,
      accentColor: boostActive ? '#ffd60a' : spRedBright,
      tag: boostActive ? (isEnglish ? 'ACTIVE' : 'ACTIF') : '1HR',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: spBg, fontFamily: spFont }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)',
          background: '#111', border: '1px solid rgba(176,0,32,0.5)',
          color: '#fff', padding: '12px 28px', borderRadius: 8,
          fontSize: '0.95rem', fontWeight: 'bold', zIndex: 9999,
          boxShadow: '0 4px 32px rgba(0,0,0,0.6)', whiteSpace: 'nowrap',
        }}>
          {toast}
        </div>
      )}

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '1.5rem 1rem 4rem' }}>

        {/* Back */}
        <button
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: 'transparent', border: 'none',
            color: spMuted, cursor: 'pointer',
            fontFamily: spFont, fontSize: '0.9rem',
            marginBottom: '1.25rem', padding: 0, transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = spText; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = spMuted; }}
        >
          <ChevronLeft style={{ width: 18, height: 18 }} strokeWidth={2} />
          {isEnglish ? 'Back' : 'Retour'}
        </button>

        {/* Title */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ height: '2px', background: spRed, opacity: 0.7, marginBottom: '1.25rem' }} />
          <h1 style={{
            color: spText, fontFamily: spFont,
            fontSize: 'clamp(2rem, 6vw, 3.2rem)',
            fontWeight: 'bold', textTransform: 'uppercase',
            letterSpacing: '0.08em', margin: 0,
          }}>
            {isEnglish ? 'Shop' : 'Boutique'}
          </h1>
          <p style={{ color: spMuted, fontSize: '0.9rem', marginTop: '0.4rem' }}>
            {isEnglish ? 'Spend your hard-earned currency on power-ups and bonuses.' : 'Dépensez vos devises gagnées pour des power-ups et bonus.'}
          </p>
        </div>

        {/* Currency Balance */}
        <div style={{
          background: spSurface, border: `1px solid ${spBorder}`,
          padding: '1rem 1.5rem', marginBottom: '2.5rem',
          display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(176,0,32,0.15)', border: '1px solid rgba(176,0,32,0.3)', padding: '0.5rem', display: 'flex', borderRadius: 4 }}>
              <Gem style={{ width: 22, height: 22, color: spRedBright }} strokeWidth={1.5} />
            </div>
            <div>
              <p style={{ color: spMuted, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>{isEnglish ? 'Gems' : 'Gemmes'}</p>
              <p style={{ color: spText, fontSize: '1.4rem', fontWeight: 'bold', fontFamily: spFont, margin: 0 }}>{gems}</p>
            </div>
          </div>

          <div style={{ width: 1, height: 44, background: spBorder }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(176,0,32,0.15)', border: '1px solid rgba(176,0,32,0.3)', padding: '0.5rem', display: 'flex', borderRadius: 4 }}>
              <SandbitsIcon size={22} />
            </div>
            <div>
              <p style={{ color: spMuted, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>{isEnglish ? 'Sandbits' : 'Sablebits'}</p>
              <p style={{ color: spText, fontSize: '1.4rem', fontWeight: 'bold', fontFamily: spFont, margin: 0 }}>{sandbits}</p>
            </div>
          </div>
        </div>

        {/* Shop Items — vertical scroll cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
          {shopItems.map((item, i) => {
            const isDisabled = purchasing === i || (i === 2 && boostActive);
            return (
              <div
                key={i}
                style={{
                  background: spSurface,
                  border: `1px solid ${spBorder}`,
                  borderTop: `3px solid ${item.accentColor}`,
                  padding: 'clamp(1.25rem, 4vw, 2rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 1px ${item.accentColor}40, 0 8px 32px rgba(0,0,0,0.4)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                {/* Top row: icon + title area */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  {/* Icon */}
                  <div style={{
                    background: `rgba(176,0,32,0.1)`,
                    border: `1px solid rgba(176,0,32,0.25)`,
                    padding: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>

                  {/* Title + tag */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                      {/* 3D red bold title */}
                      <h2 style={{
                        margin: 0,
                        fontFamily: spFont,
                        fontWeight: 'bold',
                        fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                        color: spRedBright,
                        textShadow: `0 1px 0 #8b0000, 0 2px 0 #7a0000, 0 3px 0 #6a0000, 0 4px 8px rgba(0,0,0,0.55)`,
                        letterSpacing: '0.01em',
                        lineHeight: 1.1,
                      }}>
                        {item.title}
                      </h2>
                      {item.tag && (
                        <span style={{
                          background: `${item.accentColor}22`,
                          border: `1px solid ${item.accentColor}55`,
                          color: item.accentColor,
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                          letterSpacing: '0.1em',
                          padding: '2px 8px',
                          borderRadius: 20,
                          flexShrink: 0,
                        }}>
                          {item.tag}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p style={{
                      color: spText,
                      fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                      fontFamily: spFont,
                      margin: 0,
                      lineHeight: 1.55,
                      opacity: 0.9,
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: spBorder }} />

                {/* Bottom row: price + button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {item.CurrencyIcon}
                    <span style={{ color: spText, fontFamily: spFont, fontWeight: 'bold', fontSize: '1.1rem' }}>{item.price}</span>
                    <span style={{ color: spMuted, fontSize: '0.82rem' }}>{item.currency}</span>
                  </div>

                  <button
                    onClick={() => handlePurchase(i)}
                    disabled={isDisabled}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      background: isDisabled
                        ? 'rgba(60,60,60,0.4)'
                        : item.canAfford
                          ? `${item.accentColor}`
                          : 'rgba(60,60,60,0.4)',
                      border: 'none',
                      color: isDisabled ? 'rgba(255,255,255,0.4)' : '#ffffff',
                      padding: '0.65rem 1.6rem',
                      borderRadius: 6,
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      fontFamily: spFont,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      letterSpacing: '0.04em',
                      opacity: purchasing === i ? 0.6 : 1,
                      transition: 'all 0.15s',
                      minWidth: 110,
                      justifyContent: 'center',
                      boxShadow: (!isDisabled && item.canAfford) ? `0 4px 16px ${item.accentColor}44` : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!isDisabled && item.canAfford) {
                        (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.15)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.filter = 'none';
                    }}
                  >
                    {purchasing === i ? '…' : (
                      i === 2 && boostActive
                        ? (isEnglish ? 'Active' : 'Actif')
                        : !item.canAfford
                          ? (isEnglish ? 'Not enough' : 'Insuffisant')
                          : (isEnglish ? 'Purchase' : 'Acheter')
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* About currencies */}
        <div style={{ background: spSurface, border: `1px solid ${spBorder}`, padding: '1.5rem 1.75rem' }}>
          <h3 style={{
            color: spText, fontFamily: spFont,
            fontSize: '0.85rem', textTransform: 'uppercase',
            letterSpacing: '0.12em', marginBottom: '1.25rem', marginTop: 0,
          }}>
            {isEnglish ? 'About Currencies' : 'À Propos des Devises'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', borderLeft: `2px solid rgba(176,0,32,0.4)`, paddingLeft: '0.85rem' }}>
              <Gem style={{ width: 16, height: 16, color: spRedBright, flexShrink: 0, marginTop: 3 }} strokeWidth={1.5} />
              <p style={{ color: spMuted, fontSize: '0.85rem', fontFamily: spFont, margin: 0, lineHeight: 1.55 }}>
                <strong style={{ color: spText }}>{isEnglish ? 'Gems' : 'Gemmes'}:</strong>{' '}
                {isEnglish
                  ? 'Earned by completing lessons and hitting daily goals. Spend on hearts and items.'
                  : 'Gagnées en complétant des leçons et des objectifs quotidiens. Dépensez pour des cœurs et objets.'}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', borderLeft: `2px solid rgba(176,0,32,0.4)`, paddingLeft: '0.85rem' }}>
              <SandbitsIcon size={16} />
              <p style={{ color: spMuted, fontSize: '0.85rem', fontFamily: spFont, margin: 0, lineHeight: 1.55 }}>
                <strong style={{ color: spText }}>{isEnglish ? 'Sandbits' : 'Sablebits'}:</strong>{' '}
                {isEnglish
                  ? 'Premium currency from special quests and achievements. Use for exclusive power-ups like XP Boost.'
                  : 'Devise premium gagnée via des quêtes et réalisations. Utilisez pour des power-ups exclusifs.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
