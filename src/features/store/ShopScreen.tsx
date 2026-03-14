import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Gem, Heart, Zap } from 'lucide-react';
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

  // Get currency values (with defaults)
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
  const spText = '#ffffff';
  const spMuted = 'rgba(255,255,255,0.6)';

  const boostActive = isXpBoostActive(userData);
  const boostMs = xpBoostRemainingMs(userData);
  const boostMinutes = Math.ceil(boostMs / 60000);

  const shopItems = [
    {
      icon: <Heart style={{ width: 36, height: 36, color: spRed }} strokeWidth={1.5} />,
      title: isEnglish ? 'Refill Hearts' : 'Recharger les Cœurs',
      desc: isEnglish ? 'Restore all 5 hearts instantly' : 'Restaurez les 5 cœurs instantanément',
      price: COST_HEARTS_REFILL,
      currency: isEnglish ? 'Gems' : 'Gemmes',
      CurrencyIcon: <Gem style={{ width: 16, height: 16, color: spRed }} strokeWidth={2} />,
      canAfford: gems >= COST_HEARTS_REFILL,
    },
    {
      icon: <SandbitsIcon size={36} className="" />,
      title: isEnglish ? 'Sandbits Pack' : 'Pack de Sablebits',
      desc: isEnglish ? '+500 Sandbits (premium currency)' : '+500 Sablebits (devise premium)',
      price: COST_SANDBITS_PACK,
      currency: isEnglish ? 'Gems' : 'Gemmes',
      CurrencyIcon: <Gem style={{ width: 16, height: 16, color: spRed }} strokeWidth={2} />,
      canAfford: gems >= COST_SANDBITS_PACK,
    },
    {
      icon: <Zap style={{ width: 36, height: 36, color: boostActive ? '#ffd60a' : spRed }} strokeWidth={1.5} />,
      title: isEnglish ? 'XP Boost 2×' : 'Boost XP 2×',
      desc: boostActive
        ? (isEnglish ? `Active — ${boostMinutes}m remaining` : `Actif — ${boostMinutes}m restantes`)
        : (isEnglish ? '2× XP earned for 1 hour' : '2× XP gagné pendant 1 heure'),
      price: COST_XP_BOOST,
      currency: isEnglish ? 'Sandbits' : 'Sablebits',
      CurrencyIcon: <SandbitsIcon size={16} />,
      canAfford: sandbits >= COST_XP_BOOST,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: spBg, fontFamily: spFont }}>
      {/* Toast notification */}
      {toast && (
        <div style={{
          position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)',
          background: '#111', border: '1px solid rgba(176,0,32,0.5)',
          color: '#fff', padding: '12px 24px', borderRadius: 8,
          fontSize: '0.9rem', fontWeight: 'bold', zIndex: 9999,
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        }}>
          {toast}
        </div>
      )}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem 1rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: spMuted, cursor: 'pointer', fontFamily: spFont, fontSize: '0.9rem', marginBottom: '1.5rem', padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = spText; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = spMuted; }}
          >
            <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isEnglish ? 'Back' : 'Retour'}
          </button>
          <div style={{ height: '2px', background: spRed, marginBottom: '1.5rem', opacity: 0.7 }} />
          <h1 style={{ color: spText, fontFamily: spFont, fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
            {isEnglish ? 'Shop' : 'Boutique'}
          </h1>
        </div>

        {/* Currency Display */}
        <div style={{ background: spSurface, border: `1px solid ${spBorder}`, padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(176,0,32,0.12)', border: `1px solid rgba(176,0,32,0.3)`, padding: '0.5rem', display: 'flex' }}>
              <Gem style={{ width: 22, height: 22, color: spRed }} strokeWidth={1.5} />
            </div>
            <div>
              <p style={{ color: spMuted, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>{isEnglish ? 'Gems' : 'Gemmes'}</p>
              <p style={{ color: spText, fontSize: '1.3rem', fontWeight: 'bold', fontFamily: spFont, margin: 0 }}>{gems}</p>
            </div>
          </div>

          <div style={{ width: '1px', height: '40px', background: spBorder }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(176,0,32,0.12)', border: `1px solid rgba(176,0,32,0.3)`, padding: '0.5rem', display: 'flex' }}>
              <SandbitsIcon size={22} />
            </div>
            <div>
              <p style={{ color: spMuted, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>{isEnglish ? 'Sandbits' : 'Sablebits'}</p>
              <p style={{ color: spText, fontSize: '1.3rem', fontWeight: 'bold', fontFamily: spFont, margin: 0 }}>{sandbits}</p>
            </div>
          </div>
        </div>

        {/* Shop Items Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {shopItems.map((item, i) => (
            <div
              key={i}
              style={{ background: spSurface, border: `1px solid ${spBorder}`, padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'border-color 0.2s', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(176,0,32,0.5)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = spBorder; }}
            >
              <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(176,0,32,0.08)', border: `1px solid rgba(176,0,32,0.2)` }}>
                {item.icon}
              </div>
              <h3 style={{ color: spText, fontFamily: spFont, fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', marginTop: 0 }}>{item.title}</h3>
              <p style={{ color: spMuted, fontSize: '0.82rem', fontFamily: spFont, marginBottom: '1.25rem', lineHeight: 1.4, flex: 1 }}>{item.desc}</p>
              <button
                onClick={() => handlePurchase(i)}
                disabled={purchasing === i || (i === 2 && boostActive)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  background: item.canAfford && !(i === 2 && boostActive)
                    ? 'rgba(176,0,32,0.18)'
                    : 'rgba(80,80,80,0.18)',
                  border: `1px solid ${item.canAfford && !(i === 2 && boostActive) ? 'rgba(176,0,32,0.5)' : 'rgba(80,80,80,0.3)'}`,
                  padding: '0.5rem 1rem', borderRadius: 6, cursor: purchasing === i || (i === 2 && boostActive) ? 'not-allowed' : 'pointer',
                  fontFamily: spFont, color: spText, fontWeight: 'bold', fontSize: '1rem',
                  opacity: purchasing === i ? 0.6 : 1, transition: 'all 0.15s',
                }}
              >
                {purchasing === i ? '…' : (
                  <>
                    {item.CurrencyIcon}
                    <span>{i === 2 && boostActive ? (isEnglish ? 'Active' : 'Actif') : item.price}</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div style={{ background: spSurface, border: `1px solid ${spBorder}`, padding: '1.5rem' }}>
          <h2 style={{ color: spText, fontFamily: spFont, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', marginTop: 0 }}>
            {isEnglish ? 'About Currencies' : 'À Propos des Devises'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', borderLeft: `2px solid rgba(176,0,32,0.4)`, paddingLeft: '0.75rem' }}>
              <Gem style={{ width: 16, height: 16, color: spRed, flexShrink: 0, marginTop: 2 }} strokeWidth={1.5} />
              <p style={{ color: spMuted, fontSize: '0.85rem', fontFamily: spFont, margin: 0, lineHeight: 1.5 }}>
                <strong style={{ color: spText }}>{isEnglish ? 'Gems' : 'Gemmes'}:</strong>{' '}
                {isEnglish
                  ? 'Earn gems by completing lessons and achieving daily goals. Use gems to purchase hearts and special items.'
                  : 'Gagnez des gemmes en complétant des leçons et en atteignant des objectifs quotidiens. Utilisez des gemmes pour acheter des cœurs et des objets spéciaux.'}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', borderLeft: `2px solid rgba(176,0,32,0.4)`, paddingLeft: '0.75rem' }}>
              <SandbitsIcon size={16} />
              <p style={{ color: spMuted, fontSize: '0.85rem', fontFamily: spFont, margin: 0, lineHeight: 1.5 }}>
                <strong style={{ color: spText }}>{isEnglish ? 'Sandbits' : 'Sablebits'}:</strong>{' '}
                {isEnglish
                  ? 'Premium currency earned through special quests and achievements. Use Sandbits for exclusive items and bonuses.'
                  : 'Devise premium gagnée grâce à des quêtes spéciales et des réalisations. Utilisez les Sablebits pour des objets exclusifs et des bonus.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
