import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ChevronLeft } from 'lucide-react';
import { SandbitsIcon } from '../../components/ui/SandbitsIcon';
import { InterfaceLanguage } from '../../types';
import {
  DIAMOND_PACKS,
  AVATARS,
  BACKGROUNDS,
  SANDBITS_PER_DIAMOND,
  convertDiamondsToSandbits,
  purchaseCosmetic,
  buyDiamondPack,
  CosmeticItem,
} from '../../utils/currencyUtils';

interface ShopScreenProps {
  interfaceLanguage: InterfaceLanguage;
  onBack: () => void;
}

type Tab = 'store' | 'avatars' | 'backgrounds';

const font = "'Times New Roman', Georgia, serif";
const surface = 'rgba(6,3,1,0.82)';
const border = 'rgba(255,255,255,0.08)';
const text = '#f5ede0';
const muted = 'rgba(245,237,224,0.55)';
const red = '#b00020';

export function ShopScreen({ interfaceLanguage, onBack }: ShopScreenProps) {
  const { userData, setUserData, user } = useAuth();
  const isEn = interfaceLanguage === 'en';
  const [tab, setTab] = useState<Tab>('store');
  const [converting, setConverting] = useState(false);
  const [buying, setBuying] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const sandbits = userData?.sandbits ?? 0;
  const diamonds = userData?.diamonds ?? 0;
  const ownedAvatars: string[] = userData?.ownedAvatars ?? ['avatar_default'];
  const ownedBackgrounds: string[] = userData?.ownedBackgrounds ?? ['bg_default'];
  const equippedAvatar = userData?.equippedAvatar ?? 'avatar_default';
  const equippedBackground = userData?.equippedBackground ?? 'bg_default';

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const handleConvert = async () => {
    if (!user || !userData) return showToast(isEn ? 'Sign in first.' : 'Connectez-vous.');
    if (diamonds < 1) return showToast(isEn ? 'No diamonds to convert.' : 'Pas de diamants.');
    setConverting(true);
    try {
      const result = await convertDiamondsToSandbits(user.uid, userData, 1);
      if (result) {
        setUserData({ ...userData, ...result });
        showToast(isEn ? `💎 → ${SANDBITS_PER_DIAMOND} Sandbits added!` : `💎 → ${SANDBITS_PER_DIAMOND} Sablebits ajoutés!`);
      }
    } catch {
      showToast(isEn ? 'Failed. Try again.' : 'Échec. Réessayez.');
    } finally {
      setConverting(false);
    }
  };

  const handleBuyDiamonds = (pack: typeof DIAMOND_PACKS[number]) => {
    if (!user) return showToast(isEn ? 'Sign in to purchase.' : 'Connectez-vous pour acheter.');
    if (!pack.paymentLink) return showToast(isEn ? 'Coming soon!' : 'Bientôt disponible!');
    buyDiamondPack(pack, user.uid, user.email ?? '');
  };

  const handleBuyCosmetic = async (item: CosmeticItem, type: 'avatar' | 'background') => {
    if (!user || !userData) return showToast(isEn ? 'Sign in first.' : 'Connectez-vous.');
    const owned = type === 'avatar' ? ownedAvatars : ownedBackgrounds;

    if (owned.includes(item.id)) {
      setBuying(item.id);
      try {
        const result = await purchaseCosmetic(user.uid, userData, item, type);
        if (result) {
          setUserData({ ...userData, ...result });
          showToast(isEn ? `✓ ${item.name} equipped!` : `✓ ${item.name} équipé!`);
        }
      } catch {
        showToast(isEn ? 'Failed. Try again.' : 'Échec. Réessayez.');
      } finally {
        setBuying(null);
      }
      return;
    }

    if (sandbits < item.price) {
      return showToast(isEn
        ? `Need ${item.price} Sandbits (you have ${sandbits})`
        : `Il faut ${item.price} Sablebits (vous en avez ${sandbits})`);
    }

    setBuying(item.id);
    try {
      const result = await purchaseCosmetic(user.uid, userData, item, type);
      if (result) {
        setUserData({ ...userData, ...result });
        showToast(isEn ? `✓ ${item.name} unlocked!` : `✓ ${item.name} débloqué!`);
      }
    } catch {
      showToast(isEn ? 'Failed. Try again.' : 'Échec. Réessayez.');
    } finally {
      setBuying(null);
    }
  };

  return (
    <div style={{ minHeight: '100dvh', background: 'transparent', fontFamily: font, position: 'relative', zIndex: 5 }}>

      <style>{`
        @keyframes shimmer-diamond {
          0%,100% { filter: drop-shadow(0 0 4px #a8d8ff88); }
          50%      { filter: drop-shadow(0 0 16px #a8d8ffcc) drop-shadow(0 0 32px #60b0ff66); }
        }
        @keyframes sb-pulse {
          0%,100% { filter: drop-shadow(0 0 3px rgba(255,214,10,0.3)); }
          50%      { filter: drop-shadow(0 0 10px rgba(255,214,10,0.7)); }
        }
        .shop-diamond-card { transition: border-color 0.2s; }
        .shop-diamond-card:hover { border-color: rgba(168,216,255,0.6) !important; }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(6,3,1,0.95)', border: `1px solid rgba(176,0,32,0.5)`,
          color: text, padding: '10px 20px', borderRadius: 8,
          fontSize: '0.85rem', fontWeight: 'bold', zIndex: 9999,
          boxShadow: '0 4px 32px rgba(0,0,0,0.7)',
          maxWidth: 'calc(100vw - 2rem)', textAlign: 'center',
        }}>
          {toast}
        </div>
      )}

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '1.25rem 0.85rem 5rem', background: surface, borderRadius: 18 }}>

        {/* Back */}
        <button
          onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'transparent', border: 'none', color: muted, cursor: 'pointer', fontFamily: font, fontSize: '0.9rem', marginBottom: '1.25rem', padding: 0 }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = text; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = muted; }}
        >
          <ChevronLeft style={{ width: 18, height: 18 }} strokeWidth={2} />
          {isEn ? 'Back' : 'Retour'}
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>🛒</div>
          <h1 style={{ color: text, fontFamily: font, fontSize: 'clamp(1.4rem, 5vw, 2.2rem)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.2rem' }}>
            {isEn ? 'Shop' : 'Boutique'}
          </h1>
          <p style={{ color: muted, fontSize: '0.78rem', margin: 0 }}>
            {isEn ? 'Diamonds · Sandbits · Cosmetics' : 'Diamants · Sablebits · Cosmétiques'}
          </p>
        </div>

        {/* Balance bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(0,0,0,0.35)', border: `1px solid ${border}`, borderRadius: 12, padding: '0.75rem 1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {/* Sandbits */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: 90 }}>
            <SandbitsIcon size={24} style={{ animation: 'sb-pulse 2s ease-in-out infinite' }} />
            <div>
              <p style={{ color: muted, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>{isEn ? 'Sandbits' : 'Sablebits'}</p>
              <p style={{ color: text, fontSize: '1.1rem', fontWeight: 'bold', margin: 0, lineHeight: 1 }}>{sandbits.toLocaleString()}</p>
            </div>
          </div>

          <div style={{ width: 1, background: border, alignSelf: 'stretch', minHeight: 32 }} />

          {/* Diamonds */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: 90 }}>
            <span style={{ fontSize: 24, lineHeight: 1, animation: 'shimmer-diamond 2.5s ease-in-out infinite' }}>💎</span>
            <div>
              <p style={{ color: muted, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>{isEn ? 'Diamonds' : 'Diamants'}</p>
              <p style={{ color: '#a8d8ff', fontSize: '1.1rem', fontWeight: 'bold', margin: 0, lineHeight: 1 }}>{diamonds}</p>
            </div>
          </div>

          {/* Convert button */}
          <button
            onClick={handleConvert}
            disabled={converting || diamonds < 1}
            style={{
              background: diamonds >= 1 ? 'rgba(168,216,255,0.12)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${diamonds >= 1 ? 'rgba(168,216,255,0.35)' : border}`,
              borderRadius: 8, color: diamonds >= 1 ? '#a8d8ff' : muted,
              padding: '0.4rem 0.75rem', cursor: diamonds >= 1 ? 'pointer' : 'not-allowed',
              fontFamily: font, fontSize: '0.72rem', fontWeight: 'bold',
              whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            {converting ? '…' : `1 💎 → ${SANDBITS_PER_DIAMOND}`} <SandbitsIcon size={12} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 3 }}>
          {(['store', 'avatars', 'backgrounds'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, padding: '0.55rem 0.25rem', borderRadius: 7,
                background: tab === t ? red : 'transparent',
                border: 'none', color: tab === t ? '#fff' : muted,
                cursor: 'pointer', fontFamily: font, fontSize: 'clamp(0.65rem, 2.5vw, 0.82rem)',
                fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.04em',
              }}
            >
              {t === 'store' ? (isEn ? '💎 Store' : '💎 Boutique')
                : t === 'avatars' ? '🎭 Avatars'
                : (isEn ? '🖼️ BG' : '🖼️ Fond')}
            </button>
          ))}
        </div>

        {/* ── STORE TAB ── */}
        {tab === 'store' && (
          <div>
            <p style={{ color: muted, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              {isEn ? 'Buy Diamonds with real money' : 'Achetez des Diamants avec de l\'argent réel'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: '0.85rem', marginBottom: '1.75rem' }}>
              {DIAMOND_PACKS.map(pack => (
                <div
                  key={pack.id}
                  className="shop-diamond-card"
                  style={{
                    background: (pack as any).highlight ? 'rgba(168,216,255,0.07)' : 'rgba(0,0,0,0.3)',
                    border: `1px solid ${(pack as any).highlight ? 'rgba(168,216,255,0.35)' : border}`,
                    borderRadius: 14, padding: '1.2rem 0.85rem',
                    textAlign: 'center', position: 'relative',
                  }}
                >
                  {(pack as any).highlight && (
                    <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#a8d8ff', color: '#050305', fontSize: '0.6rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '2px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}>
                      Best Value
                    </div>
                  )}
                  <div style={{ fontSize: '2rem', marginBottom: '0.4rem', animation: 'shimmer-diamond 2.5s ease-in-out infinite' }}>
                    {'💎'.repeat(Math.min(pack.diamonds, 3))}{pack.diamonds > 3 ? '+' : ''}
                  </div>
                  <p style={{ color: text, fontFamily: font, fontWeight: 'bold', fontSize: '1rem', margin: '0 0 0.2rem' }}>{pack.label}</p>
                  <p style={{ color: '#a8d8ff', fontSize: '0.74rem', margin: '0 0 0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                    {pack.diamonds} × {isEn ? 'Diamond' : 'Diamant'}{pack.diamonds > 1 ? 's' : ''}
                    {' '}= {pack.diamonds * SANDBITS_PER_DIAMOND} <SandbitsIcon size={12} />
                  </p>
                  <button
                    onClick={() => handleBuyDiamonds(pack)}
                    style={{
                      background: '#a8d8ff', border: 'none', borderRadius: 8,
                      color: '#050305', padding: '0.55rem 1rem',
                      fontFamily: font, fontWeight: 'bold', fontSize: '0.88rem',
                      cursor: 'pointer', width: '100%',
                    }}
                  >
                    ${pack.price.toFixed(2)}
                  </button>
                </div>
              ))}
            </div>

            {/* AfroPlus upsell */}
            <div style={{ background: 'transparent', border: `1px solid rgba(176,0,32,0.25)`, borderRadius: 14, padding: '1.1rem 1.2rem' }}>
              <p style={{ color: text, fontFamily: font, fontWeight: 'bold', fontSize: '1rem', margin: '0 0 0.75rem' }}>
                AfroPlus
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  isEn ? '❤️ Unlimited hearts' : '❤️ Cœurs illimités',
                  isEn ? '⚡ 2× XP on all lessons' : '⚡ 2× XP sur toutes les leçons',
                  isEn ? '📖 Review page (flashcards)' : '📖 Page de révision (flashcards)',
                  isEn ? '🚫 No ads' : '🚫 Sans publicité',
                ].map(f => (
                  <p key={f} style={{ color: muted, fontSize: '0.82rem', margin: 0 }}>{f}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── AVATARS TAB ── */}
        {tab === 'avatars' && (
          <CosmeticGrid
            items={AVATARS}
            owned={ownedAvatars}
            equipped={equippedAvatar}
            type="avatar"
            buying={buying}
            sandbits={sandbits}
            isEn={isEn}
            onSelect={(item) => handleBuyCosmetic(item, 'avatar')}
          />
        )}

        {/* ── BACKGROUNDS TAB ── */}
        {tab === 'backgrounds' && (
          <CosmeticGrid
            items={BACKGROUNDS}
            owned={ownedBackgrounds}
            equipped={equippedBackground}
            type="background"
            buying={buying}
            sandbits={sandbits}
            isEn={isEn}
            onSelect={(item) => handleBuyCosmetic(item, 'background')}
          />
        )}

      </div>
    </div>
  );
}

// ── Cosmetic grid ─────────────────────────────────────────────────────────
interface CosmeticGridProps {
  items: CosmeticItem[];
  owned: string[];
  equipped: string;
  type: 'avatar' | 'background';
  buying: string | null;
  sandbits: number;
  isEn: boolean;
  onSelect: (item: CosmeticItem) => void;
}

function CosmeticGrid({ items, owned, equipped, type, buying, sandbits, isEn, onSelect }: CosmeticGridProps) {
  return (
    <div>
      <p style={{ color: muted, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
        {isEn
          ? `Purchase ${type === 'avatar' ? 'avatars' : 'backgrounds'} with Sandbits`
          : `Achetez des ${type === 'avatar' ? 'avatars' : 'arrière-plans'} avec des Sablebits`}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 130px), 1fr))', gap: '0.85rem' }}>
        {items.map(item => {
          const isOwned = owned.includes(item.id);
          const isEquipped = equipped === item.id;
          const canAfford = sandbits >= item.price;
          const isBuying = buying === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              disabled={isBuying}
              style={{
                background: isEquipped
                  ? 'rgba(176,0,32,0.18)'
                  : isOwned
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(0,0,0,0.3)',
                border: `2px solid ${isEquipped ? red : isOwned ? 'rgba(255,255,255,0.2)' : border}`,
                borderRadius: 14, padding: '1rem 0.6rem',
                cursor: isBuying ? 'wait' : 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                opacity: !isOwned && !canAfford ? 0.55 : 1,
                position: 'relative', width: '100%',
              }}
            >
              {isEquipped && (
                <div style={{ position: 'absolute', top: 5, right: 6, fontSize: '0.58rem', color: red, fontWeight: 'bold', fontFamily: font, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {isEn ? 'ON' : 'ACT'}
                </div>
              )}
              <span style={{ fontSize: 34, lineHeight: 1 }}>{item.emoji}</span>
              <p style={{ color: text, fontFamily: font, fontWeight: 'bold', fontSize: '0.78rem', margin: 0, textAlign: 'center', wordBreak: 'break-word' }}>{item.name}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {item.price === 0 ? (
                  <span style={{ color: '#4caf50', fontSize: '0.7rem', fontWeight: 'bold' }}>{isEn ? 'Free' : 'Gratuit'}</span>
                ) : isOwned ? (
                  <span style={{ color: muted, fontSize: '0.7rem' }}>{isEn ? 'Owned' : 'Possédé'}</span>
                ) : (
                  <>
                    <SandbitsIcon size={12} />
                    <span style={{ color: canAfford ? text : 'rgba(255,100,100,0.8)', fontSize: '0.75rem', fontWeight: 'bold' }}>{item.price}</span>
                  </>
                )}
              </div>
              {!isOwned && item.price > 0 && (
                <div style={{
                  background: canAfford ? red : 'rgba(60,60,60,0.6)',
                  borderRadius: 6, padding: '3px 10px',
                  color: canAfford ? '#fff' : muted,
                  fontSize: '0.7rem', fontWeight: 'bold', fontFamily: font,
                }}>
                  {isBuying ? '…' : isEn ? 'Buy' : 'Acheter'}
                </div>
              )}
              {isOwned && !isEquipped && (
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 6, padding: '3px 10px', color: muted, fontSize: '0.7rem', fontFamily: font }}>
                  {isEn ? 'Equip' : 'Équiper'}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
