import { useState, useRef } from 'react';
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
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const tooltipTimeouts = useRef<(ReturnType<typeof setTimeout> | null)[]>([null, null, null]);

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
  const spBg = 'transparent';
  const spSurface = 'rgba(6,3,1,0.82)';
  const spBorder = 'rgba(255,255,255,0.08)';
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
    <div style={{ minHeight: '100vh', background: spBg, fontFamily: spFont, position: 'relative', zIndex: 5 }}>

      {/* Lightning + glow keyframes */}
      <style>{`
        @keyframes sp-lightning-flicker {
          0%   { box-shadow: 0 0 8px 2px #ffd60a44, 0 0 32px 8px #ffd60a22, inset 0 0 12px #ffd60a11; opacity: 1; }
          8%   { box-shadow: 0 0 24px 6px #ffd60acc, 0 0 64px 20px #ffd60a66, inset 0 0 24px #ffd60a44; opacity: 0.85; }
          10%  { box-shadow: 0 0 8px 2px #ffd60a44, 0 0 32px 8px #ffd60a22, inset 0 0 12px #ffd60a11; opacity: 1; }
          42%  { box-shadow: 0 0 8px 2px #ffd60a44, 0 0 32px 8px #ffd60a22, inset 0 0 12px #ffd60a11; opacity: 1; }
          44%  { box-shadow: 0 0 40px 12px #ffd60aaa, 0 0 80px 28px #ffd60a55, inset 0 0 32px #ffd60a55; opacity: 0.7; }
          46%  { box-shadow: 0 0 8px 2px #ffd60a44, 0 0 32px 8px #ffd60a22, inset 0 0 12px #ffd60a11; opacity: 1; }
          100% { box-shadow: 0 0 8px 2px #ffd60a44, 0 0 32px 8px #ffd60a22, inset 0 0 12px #ffd60a11; opacity: 1; }
        }
        @keyframes sp-zap-spin {
          0%   { transform: scale(1) rotate(-8deg); filter: drop-shadow(0 0 6px #ffd60a); }
          10%  { transform: scale(1.25) rotate(6deg); filter: drop-shadow(0 0 18px #ffd60a) drop-shadow(0 0 36px #ffb300); }
          20%  { transform: scale(0.95) rotate(-4deg); filter: drop-shadow(0 0 4px #ffd60a); }
          45%  { transform: scale(1.18) rotate(10deg); filter: drop-shadow(0 0 22px #ffd60a) drop-shadow(0 0 40px #ffb300); }
          55%  { transform: scale(1) rotate(-2deg); filter: drop-shadow(0 0 6px #ffd60a); }
          100% { transform: scale(1) rotate(-8deg); filter: drop-shadow(0 0 6px #ffd60a); }
        }
        @keyframes sp-bolt-drift {
          0%   { opacity: 0.18; transform: translateY(0) scaleX(1); }
          50%  { opacity: 0.08; transform: translateY(-6px) scaleX(0.85); }
          100% { opacity: 0.18; transform: translateY(0) scaleX(1); }
        }
        @keyframes sp-hero-glow {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 0.85; }
        }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(6,3,1,0.92)', border: '1px solid rgba(176,0,32,0.5)',
          color: '#fff', padding: '12px 28px', borderRadius: 8,
          fontSize: '0.95rem', fontWeight: 'bold', zIndex: 9999,
          boxShadow: '0 4px 32px rgba(0,0,0,0.6)', whiteSpace: 'nowrap',
        }}>
          {toast}
        </div>
      )}

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '1.5rem 1rem 4rem', background: 'rgba(6,3,1,0.82)', borderRadius: 18 }}>

        {/* Back */}
        <button
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: 'transparent', border: 'none',
            color: spMuted, cursor: 'pointer',
            fontFamily: spFont, fontSize: '0.9rem',
            marginBottom: '1.5rem', padding: 0, transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = spText; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = spMuted; }}
        >
          <ChevronLeft style={{ width: 18, height: 18 }} strokeWidth={2} />
          {isEnglish ? 'Back' : 'Retour'}
        </button>

        {/* Hero welcome banner */}
        <div style={{
          background: 'rgba(6,3,1,0.78)',
          border: '1px solid rgba(255,220,100,0.15)',
          borderRadius: 20,
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}>
          {/* subtle gold glow blob */}
          <div style={{
            position: 'absolute', top: '-40%', left: '50%',
            transform: 'translateX(-50%)',
            width: '80%', height: '180%',
            background: 'radial-gradient(ellipse, rgba(255,214,10,0.09) 0%, transparent 65%)',
            animation: 'sp-hero-glow 3s ease-in-out infinite',
            pointerEvents: 'none',
          }} />
          <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem', lineHeight: 1 }}>🛒</div>
          <h1 style={{
            color: '#f5ede0', fontFamily: spFont,
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            fontWeight: 'bold', textTransform: 'uppercase',
            letterSpacing: '0.1em', margin: '0 0 0.4rem',
            textShadow: '0 2px 0 rgba(0,0,0,0.6)',
          }}>
            {isEnglish ? 'Power-Up Shop' : 'Boutique de Boosts'}
          </h1>
          <p style={{ color: 'rgba(245,237,224,0.6)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
            {isEnglish
              ? 'Fuel your learning with hearts, Sandbits, and XP multipliers.'
              : 'Boostez votre apprentissage avec des cœurs, Sablebits et multiplicateurs XP.'}
          </p>
        </div>

        {/* Currency Balance */}
        <div style={{
          background: spSurface, border: `1px solid ${spBorder}`,
          borderRadius: 14,
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

        {/* Icon-only shop items */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 8vw, 5rem)', padding: '2rem 0 4rem' }}>
          {shopItems.map((item, i) => {
            const isXpCard = i === 2;
            const isHovered = hoveredItem === i;
            const isDisabled = purchasing === i || (i === 2 && boostActive);
            return (
              <div
                key={i}
                style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onMouseEnter={() => {
                  if (tooltipTimeouts.current[i]) clearTimeout(tooltipTimeouts.current[i]!);
                  setHoveredItem(i);
                }}
                onMouseLeave={() => {
                  tooltipTimeouts.current[i] = setTimeout(() => setHoveredItem(null), 120);
                }}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 12px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    minWidth: 160,
                    maxWidth: 220,
                    zIndex: 50,
                    pointerEvents: 'none',
                    textAlign: 'center',
                  }}>
                    <p style={{ margin: '0 0 3px', fontFamily: spFont, fontWeight: 'bold', fontSize: '1rem', color: item.accentColor === '#c0850a' ? '#f5c542' : item.accentColor, textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
                      {item.title}{item.tag && <span style={{ marginLeft: 5, fontSize: '0.7rem', opacity: 0.75 }}>{item.tag}</span>}
                    </p>
                    <p style={{ margin: '0 0 6px', fontFamily: spFont, fontSize: '0.75rem', color: '#f5ede0', lineHeight: 1.4, textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
                      {item.price} {item.currency}
                    </p>
                    <button
                      onClick={() => handlePurchase(i)}
                      disabled={isDisabled}
                      style={{
                        background: isDisabled ? 'rgba(60,60,60,0.6)' : item.canAfford ? item.accentColor : 'rgba(60,60,60,0.6)',
                        border: 'none', borderRadius: 6,
                        color: isDisabled ? 'rgba(255,255,255,0.35)' : '#fff',
                        padding: '5px 14px', cursor: isDisabled ? 'not-allowed' : 'pointer',
                        fontFamily: spFont, fontWeight: 'bold', fontSize: '0.78rem',
                        letterSpacing: '0.05em', pointerEvents: 'auto',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.7)',
                      }}
                    >
                      {purchasing === i ? '…' : i === 2 && boostActive ? (isEnglish ? 'Active' : 'Actif') : !item.canAfford ? (isEnglish ? 'Need more' : 'Insuffisant') : (isEnglish ? 'Buy' : 'Acheter')}
                    </button>
                  </div>
                )}

                {/* Icon button */}
                <button
                  onClick={() => handlePurchase(i)}
                  disabled={isDisabled}
                  style={{
                    background: 'none', border: 'none', padding: 0,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    transition: 'transform 0.2s',
                    animation: isXpCard ? 'sp-zap-spin 3.2s ease-in-out infinite' : 'none',
                    filter: isHovered
                      ? `drop-shadow(0 0 12px ${item.accentColor}) drop-shadow(0 0 24px ${item.accentColor}88)`
                      : `drop-shadow(0 2px 6px rgba(0,0,0,0.5))`,
                    transform: isHovered ? 'scale(1.18) translateY(-4px)' : 'scale(1)',
                    opacity: isDisabled && !isHovered ? 0.5 : 1,
                  }}
                >
                  {item.icon}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
