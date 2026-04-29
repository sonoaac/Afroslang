import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { SandbitsIcon } from '../../components/ui/SandbitsIcon';
import { SavannaCanvas } from '../../components/landing/SavannaCanvas';
import { CloudyCanvas } from '../../components/landing/CloudyCanvas';
import { NightSkyCanvas } from '../../components/landing/NightSkyCanvas';
import { DeepForestCanvas } from '../../components/landing/DeepForestCanvas';
import { OceanCanvas } from '../../components/landing/OceanCanvas';
import { InterfaceLanguage } from '../../types';
import {
  DIAMOND_PACKS,
  AVATARS,
  BACKGROUNDS,
  SANDBITS_PER_DIAMOND,
  purchaseCosmetic,
  equipCosmetic,
  buyDiamondPack,
  getBackgroundStyle,
  CosmeticItem,
} from '../../utils/currencyUtils';
import { SUBSCRIPTION_PLANS } from '../../utils/stripeConfig';
import { isNativePlatform } from '../../utils/platformUtils';
import { purchaseDiamondPack as rcBuyDiamonds, purchaseAfroPlus as rcSubscribe, restoreRCPurchases } from '../../utils/revenueCatUtils';

const BG_CARD_GRADIENT: Record<string, string> = {
  bg_default: 'radial-gradient(ellipse 120% 80% at 30% 20%, rgba(176,0,32,0.55) 0%, rgba(0,0,0,0) 60%), linear-gradient(135deg, #0a0000 0%, #1f000b 55%, #0a0000 100%)',
  bg_savanna: 'linear-gradient(45deg, #8B0000 0%, #c0392b 50%, #e67e22 100%)',
  bg_market:  'radial-gradient(ellipse 120% 80% at 35% 45%, rgba(220,60,0,0.55) 0%, rgba(0,0,0,0) 60%), linear-gradient(135deg, #100000 0%, #260600 50%, #0a0000 100%)',
  bg_night:   'radial-gradient(ellipse 120% 80% at 80% 15%, rgba(124,58,237,0.45) 0%, rgba(0,0,0,0) 60%), radial-gradient(ellipse 80% 80% at 10% 90%, rgba(6,182,212,0.35) 0%, rgba(0,0,0,0) 55%), linear-gradient(180deg, #05070d 0%, #0b0f14 100%)',
  bg_forest:  'linear-gradient(180deg, hsl(200,40%,12%) 0%, hsl(200,40%,18%) 50%, hsl(140,35%,12%) 100%)',
  bg_ocean:   'linear-gradient(180deg, #1a8aaa 0%, #0d4a6a 50%, #0a1e2a 100%)',
  bg_cloudy:  'radial-gradient(ellipse 120% 80% at 50% 30%, rgba(180,210,255,0.45) 0%, rgba(0,0,0,0) 65%), linear-gradient(180deg, #062b6e 0%, #0d3d8a 50%, #1a5099 100%)',
};

const BG_ACCENT: Record<string, string> = {
  bg_default: '🏜️',
  bg_savanna: '🌅',
  bg_market:  '🏮',
  bg_night:   '🌌',
  bg_forest:  '🌿',
  bg_ocean:   '🌊',
  bg_cloudy:  '⛈️',
};

// Only allow redirects to known Stripe origins
const STRIPE_ORIGINS = new Set(['https://buy.stripe.com', 'https://checkout.stripe.com']);

interface ShopScreenProps {
  interfaceLanguage: InterfaceLanguage;
  onBack: () => void;
}

type ShopTab = 'store' | 'avatars' | 'backgrounds';

export function ShopScreen({ interfaceLanguage, onBack }: ShopScreenProps) {
  const { userData, setUserData, user, isGuest } = useAuth();
  const isEn = interfaceLanguage === 'en';

  const [tab, setTab] = useState<ShopTab>('store');
  const [toast, setToast] = useState<string | null>(null);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [previewBg, setPreviewBg] = useState<string | null>(null);
  const [planChoice, setPlanChoice] = useState<'monthly' | 'yearly'>('yearly');

  const sandbits = userData?.sandbits ?? 0;
  const diamonds = userData?.diamonds ?? 0;
  const isPremium = userData?.subscription?.active ?? false;
  const ownedAvatars: string[] = userData?.ownedAvatars ?? ['avatar_default'];
  const ownedBackgrounds: string[] = userData?.ownedBackgrounds ?? ['bg_default'];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const handleBuyDiamonds = async (pack: typeof DIAMOND_PACKS[number]) => {
    if (!user || isGuest) {
      return showToast(isEn ? 'Sign in to purchase diamonds.' : 'Connectez-vous pour acheter des diamants.');
    }
    if (isNativePlatform()) {
      setPurchasing(pack.id);
      const result = await rcBuyDiamonds(pack.id);
      setPurchasing(null);
      if (result.status === 'success') {
        showToast(isEn ? '✓ Diamonds purchased! Balance updates in a moment.' : '✓ Diamants achetés! Solde mis à jour bientôt.');
      } else if (result.status === 'error') {
        showToast(isEn ? `Purchase failed: ${result.message}` : `Achat échoué: ${result.message}`);
      }
      // 'cancelled' — user dismissed the store sheet, do nothing
    } else {
      buyDiamondPack(pack, user.uid, user.email ?? '');
    }
  };

  const handleSubscribe = async (planType: 'monthly' | 'yearly') => {
    if (!user || isGuest) {
      return showToast(isEn ? 'Sign in to subscribe.' : 'Connectez-vous pour vous abonner.');
    }
    if (isNativePlatform()) {
      setPurchasing(`subscribe_${planType}`);
      const result = await rcSubscribe(planType);
      setPurchasing(null);
      if (result.status === 'success') {
        showToast(isEn ? '✓ Welcome to AfroPlus! Benefits activate shortly.' : '✓ Bienvenue dans AfroPlus! Avantages activés bientôt.');
      } else if (result.status === 'error') {
        showToast(isEn ? `Subscription failed: ${result.message}` : `Abonnement échoué: ${result.message}`);
      }
    } else {
      const plan = SUBSCRIPTION_PLANS[planType];
      try {
        const dest = new URL(plan.paymentLink);
        if (!STRIPE_ORIGINS.has(dest.origin)) return;
      } catch { return; }
      const returnUrl = `${window.location.origin}?payment_success=1`;
      const url = `${plan.paymentLink}?client_reference_id=${encodeURIComponent(user.uid)}&prefilled_email=${encodeURIComponent(user.email ?? '')}&redirect_url=${encodeURIComponent(returnUrl)}`;
      window.location.href = url;
    }
  };

  const handleRestorePurchases = async () => {
    if (!isNativePlatform()) return;
    showToast(isEn ? 'Restoring purchases...' : 'Restauration en cours...');
    const result = await restoreRCPurchases();
    if (result.status === 'success') {
      showToast(isEn ? '✓ Purchases restored!' : '✓ Achats restaurés!');
    } else if (result.status === 'error') {
      showToast(isEn ? `Restore failed: ${result.message}` : `Restauration échouée: ${result.message}`);
    }
  };

  const handleBuyCosmetic = async (item: CosmeticItem, type: 'avatar' | 'background') => {
    if (!user || !userData) return showToast(isEn ? 'Sign in first.' : 'Connectez-vous.');
    if (purchasing === item.id) return;
    setPurchasing(item.id);
    try {
      const result = await purchaseCosmetic(user.uid, userData, item, type);
      if (result) {
        setUserData({ ...userData, ...result });
        showToast(isEn ? `✓ ${item.name} purchased!` : `✓ ${item.name} acheté!`);
      } else {
        showToast(isEn ? `Need ${item.price} Sandbits` : `Il faut ${item.price} Sablebits`);
      }
    } catch {
      showToast(isEn ? 'Purchase failed. Try again.' : 'Achat échoué. Réessayez.');
    } finally {
      setPurchasing(null);
    }
  };

  const handleEquip = async (item: CosmeticItem, type: 'avatar' | 'background') => {
    if (!user) return;
    if (purchasing === item.id) return;
    setPurchasing(item.id);
    try {
      const result = await equipCosmetic(user.uid, item.id, type);
      if (userData) setUserData({ ...userData, ...result });
      showToast(isEn ? `✓ ${item.name} equipped!` : `✓ ${item.name} équipé!`);
    } catch {
      showToast(isEn ? 'Failed to equip.' : 'Équipement échoué.');
    } finally {
      setPurchasing(null);
    }
  };

  return (
    <div style={{ minHeight: '100dvh', background: '#0d0d0d', color: '#f0e6d3', fontFamily: "'Plus Jakarta Sans', sans-serif", position: 'relative', zIndex: 5 }}>
      <style>{`
        @keyframes shop-fadein {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer-dia {
          0%,100% { filter: drop-shadow(0 0 4px rgba(106,180,255,0.4)); }
          50%      { filter: drop-shadow(0 0 14px rgba(106,180,255,0.9)); }
        }
        .shop-view { animation: shop-fadein 0.28s ease; }
        .sh-card { background: #161616; border: 1px solid #222; border-radius: 12px; padding: 1.2em 1em 1em; position: relative; display: flex; flex-direction: column; align-items: center; gap: 0.4em; transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s; }
        .sh-card:hover { border-color: #c0392b; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(192,57,43,0.2); }
        .sh-card.featured { border-color: #6ab4ff; box-shadow: 0 0 16px rgba(100,180,255,0.12); }
        .sh-card.featured:hover { border-color: #6ab4ff; box-shadow: 0 8px 24px rgba(100,180,255,0.25); }
        .sh-card-icon { font-size: 2.8em; margin-top: 0.4em; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.7)); transition: transform 0.25s ease; user-select: none; }
        .sh-card:hover .sh-card-icon { transform: scale(1.12) translateY(-3px); }
        .sh-btn { margin-top: auto; border: none; font-family: inherit; font-size: 0.8em; font-weight: 700; padding: 0.6em 1em; border-radius: 6px; cursor: pointer; width: 100%; transition: background 0.15s, transform 0.1s; letter-spacing: 0.5px; color: #fff; }
        .sh-btn:active { transform: scale(0.96); }
        .sh-btn:disabled { cursor: not-allowed; opacity: 0.45; }
        .sh-btn.red   { background: #c0392b; }
        .sh-btn.red:hover:not(:disabled)   { background: #e74c3c; }
        .sh-btn.gold  { background: #b87d00; }
        .sh-btn.gold:hover:not(:disabled)  { background: #d4920a; }
        .sh-btn.green { background: #27ae60; }
        .sh-btn.green:hover:not(:disabled) { background: #2ecc71; }
        .sh-tab-btn { background: none; border: none; color: #555; font-family: inherit; font-size: 0.85em; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 1em 1.5em; cursor: pointer; border-bottom: 3px solid transparent; transition: color 0.2s, border-color 0.2s; }
        .sh-tab-btn:hover { color: #aaa; }
        .sh-tab-btn.active { color: #fff; border-bottom-color: #c0392b; }
        .store-badge { background: rgba(100,180,255,0.15); color: #6ab4ff; border: 1px solid rgba(100,180,255,0.3); }
        .best-badge  { background: rgba(100,180,255,0.25); color: #6ab4ff; border: 1px solid #6ab4ff; }
        .plus-badge  { background: rgba(192,57,43,0.3); color: #ff6b55; border: 1px solid rgba(192,57,43,0.5); }
        .av-badge    { background: rgba(180,130,0,0.2); color: #f0a800; border: 1px solid rgba(180,130,0,0.35); }
        .bg-badge    { background: rgba(0,160,100,0.15); color: #00d48a; border: 1px solid rgba(0,160,100,0.3); }
        .plan-toggle { display: flex; background: #111; border: 1px solid #2a2a2a; border-radius: 8px; padding: 3px; gap: 3px; }
        .plan-btn { flex: 1; background: none; border: none; font-family: inherit; font-size: 0.76em; font-weight: 700; letter-spacing: 0.3px; padding: 0.55em 0.5em; border-radius: 6px; cursor: pointer; color: #555; transition: background 0.15s, color 0.15s; }
        .plan-btn.active { background: #c0392b; color: #fff; }
        .afroplus-card-bg { background-image: linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.74)), url('/Afroplus.png'); background-size: cover; background-position: center; }
        .afroplus-card-bg:hover { box-shadow: 0 8px 32px rgba(192,57,43,0.35) !important; }
        .bg-preview-card { border-radius: 12px; overflow: hidden; position: relative; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
        .bg-preview-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.6); }
        .bg-preview-card:active { transform: scale(0.97); }
        .bg-preview-hint { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.45); opacity: 0; transition: opacity 0.2s; font-size: 0.78em; font-weight: 700; letter-spacing: 1px; color: #fff; text-transform: uppercase; }
        .bg-preview-card:hover .bg-preview-hint { opacity: 1; }
        @media (hover: none) { .bg-preview-hint { opacity: 0.6; } }
        @keyframes bg-preview-in { from { opacity: 0; } to { opacity: 1; } }
        .bg-fullscreen { position: fixed; inset: 0; z-index: 9998; display: flex; flex-direction: column; animation: bg-preview-in 0.25s ease; overflow: hidden; }
        .bg-topbar { padding: 0.9em 1.25em; display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(255,255,255,0.08); gap: 0.5em; flex-shrink: 0; min-height: 56px; box-sizing: border-box; }
        .bg-close-btn { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); color: #fff; font-family: inherit; font-size: 0.85em; font-weight: 700; padding: 0.5em 0.9em; border-radius: 6px; cursor: pointer; min-height: 44px; min-width: 44px; white-space: nowrap; flex-shrink: 0; }
        .bg-topbar-mid { display: flex; align-items: center; gap: 0.5em; flex: 1; justify-content: center; min-width: 0; overflow: hidden; }
        .bg-topbar-mid span:nth-child(2) { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .bg-topbar-mode { font-size: 0.75em; color: rgba(255,255,255,0.45); font-style: italic; white-space: nowrap; flex-shrink: 0; }
        .bg-center { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.5em; padding: 2em; overflow-y: auto; min-height: 0; }
        .bg-preview-emoji { font-size: clamp(2.8em, 14vw, 5em); filter: drop-shadow(0 8px 24px rgba(0,0,0,0.8)); margin-bottom: 0.25em; }
        .bg-action-card { background: rgba(0,0,0,0.6); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 1.25em 2em; text-align: center; width: min(300px, 100%); box-sizing: border-box; }
        @media (max-width: 600px) {
          .bg-topbar { padding: 0.6em 0.85em; min-height: 52px; }
          .bg-topbar-mode { display: none; }
          .bg-center { padding: 1.25em 1em; gap: 0.9em; }
          .bg-action-card { padding: 1em 1.25em; }
          .sh-tab-btn { padding: 0.9em 0.9em; font-size: 0.78em; }
        }
        @media (max-width: 400px) {
          .sh-tab-btn { padding: 0.85em 0.6em; font-size: 0.72em; letter-spacing: 0; }
        }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', background: 'rgba(6,3,1,0.97)', border: '1px solid rgba(192,57,43,0.5)', color: '#f0e6d3', padding: '10px 20px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 'bold', zIndex: 9999, boxShadow: '0 4px 32px rgba(0,0,0,0.7)', maxWidth: 'calc(100vw - 2rem)', textAlign: 'center' }}>
          {toast}
        </div>
      )}

      <div className="shop-view">
        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75em', padding: '0.9em 1.25em', background: 'linear-gradient(160deg, #1a0a00 0%, #2a1000 60%, #180800 100%)', borderBottom: '3px solid #c0392b', position: 'sticky', top: 0, zIndex: 100 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
              <button onClick={onBack}
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#aaa', fontFamily: 'inherit', fontSize: '0.8em', fontWeight: 700, padding: '0.4em 0.8em', borderRadius: 6, cursor: 'pointer', minHeight: 36, transition: 'all 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#aaa'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; }}>
                ← {isEn ? 'Back' : 'Retour'}
              </button>
              <div style={{ fontSize: '1.4em', fontWeight: 900, letterSpacing: 2, color: '#fff', textShadow: '0 0 18px rgba(192,57,43,0.7)' }}>
                <img src="/Afroslang.png" alt="" style={{ width: 24, height: 24, objectFit: 'contain', verticalAlign: 'middle' }} /> <span style={{ color: '#ff6b55' }}>Afroslang</span>
              </div>
            </div>
            <div style={{ fontSize: '0.62em', color: '#555', letterSpacing: 2, textTransform: 'uppercase', marginTop: '0.15em' }}>
              {isEn ? 'Diamonds · Sandbits · Cosmetics' : 'Diamants · Sablebits · Cosmétiques'}
            </div>
          </div>
          {/* Wallet */}
          <div style={{ display: 'flex', gap: '0.6em', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.5em 1em', borderRadius: 8, fontSize: '0.9em', fontWeight: 700 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3em' }}>
              <SandbitsIcon size={16} /> {sandbits.toLocaleString()}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3em', color: '#6ab4ff' }}>
              💎 {diamonds}
            </span>
          </div>
        </header>

        {/* Tab nav */}
        <nav style={{ display: 'flex', background: '#111', borderBottom: '1px solid #1e1e1e', padding: '0 1.25em' }}>
          {(['store', 'avatars', 'backgrounds'] as ShopTab[]).map(t => (
            <button key={t} className={`sh-tab-btn${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
              {t === 'store' ? '💎 Store' : t === 'avatars' ? '🎭 Avatars' : `🖼️ ${isEn ? 'Backgrounds' : 'Fonds'}`}
            </button>
          ))}
        </nav>

        <div style={{ padding: '1.5em', paddingBottom: '5em' }}>

          {/* ── STORE ── */}
          {tab === 'store' && (
            <div>
              <SectionLabel>{isEn ? 'BUY DIAMONDS WITH REAL MONEY' : 'ACHETEZ DES DIAMANTS AVEC DE L\'ARGENT RÉEL'}</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1em', marginBottom: '2.5em' }}>
                {DIAMOND_PACKS.map(pack => (
                  <div key={pack.id} className={`sh-card${(pack as any).highlight ? ' featured' : ''}`}>
                    <CardBadge cls={(pack as any).highlight ? 'best-badge' : 'store-badge'}>
                      {(pack as any).highlight ? 'BEST VALUE' : 'STORE'}
                    </CardBadge>
                    <span className="sh-card-icon" style={{ animation: 'shimmer-dia 2.5s ease-in-out infinite' }}>
                      {'💎'.repeat(Math.min(pack.diamonds, 3))}{pack.diamonds > 3 ? '+' : ''}
                    </span>
                    <p style={{ color: '#fff', fontWeight: 700, fontSize: '1em', margin: 0, textAlign: 'center' }}>{pack.label}</p>
                    <p style={{ color: '#666', fontSize: '0.72em', margin: 0, textAlign: 'center' }}>= {pack.diamonds * SANDBITS_PER_DIAMOND} Sandbits</p>
                    <p style={{ color: '#6ab4ff', fontWeight: 800, fontSize: '1.15em', margin: '0.2em 0 0' }}>${pack.price.toFixed(2)}</p>
                    <button
                      className="sh-btn red"
                      disabled={purchasing === pack.id}
                      onClick={() => handleBuyDiamonds(pack)}
                    >
                      {purchasing === pack.id
                        ? (isEn ? 'Processing...' : 'En cours...')
                        : isEn ? `Buy $${pack.price.toFixed(2)}` : `Acheter $${pack.price.toFixed(2)}`}
                    </button>
                  </div>
                ))}
              </div>

              {/* AfroPlus */}
              <SectionLabel>{isEn ? 'AFROPLUS SUBSCRIPTION' : 'ABONNEMENT AFROPLUS'}</SectionLabel>
              <div className="sh-card afroplus-card-bg"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1em', padding: '1.5em 1.5em 1.25em', border: '1px solid rgba(192,57,43,0.4)', borderRadius: 14 }}>
                <CardBadge cls="plus-badge">AfroPlus</CardBadge>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5em', width: '100%', paddingTop: '1em' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4em' }}>
                    <span style={{ fontSize: '2.5em', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.7))' }}>⚡</span>
                    <p style={{ color: '#fff', fontWeight: 800, fontSize: '1.35em', margin: 0 }}>AfroPlus</p>
                    <p style={{ color: '#666', fontSize: '0.72em', margin: 0 }}>{isEn ? '7-day free trial · cancel anytime' : 'Essai 7 jours · annulable'}</p>
                  </div>
                  <ul style={{ listStyle: 'none', fontSize: '0.82em', color: '#aaa', lineHeight: 1.9, flex: 1, minWidth: 150, margin: 0, padding: 0 }}>
                    <li>❤️ {isEn ? 'Unlimited hearts' : 'Cœurs illimités'}</li>
                    <li>⚡ {isEn ? '2× XP on all lessons' : '2× XP sur toutes les leçons'}</li>
                    <li>📖 {isEn ? 'Review page (flashcards)' : 'Page de révision'}</li>
                    <li>🚫 {isEn ? 'No ads' : 'Sans publicité'}</li>
                  </ul>
                </div>
                {isPremium ? (
                  <div style={{ width: '100%', background: 'rgba(39,174,96,0.12)', border: '1px solid rgba(39,174,96,0.35)', borderRadius: 8, padding: '0.75em 1em', color: '#27ae60', fontWeight: 700, fontSize: '0.9em', textAlign: 'center' }}>
                    ✓ {isEn ? 'Active — you\'re a Plus member!' : 'Actif — vous êtes membre Plus!'}
                  </div>
                ) : (
                  <div style={{ width: '100%' }}>
                    <div className="plan-toggle" style={{ marginBottom: '0.85em' }}>
                      <button className={`plan-btn${planChoice === 'monthly' ? ' active' : ''}`} onClick={() => setPlanChoice('monthly')}>
                        {isEn ? 'Monthly $5.99/mo' : 'Mensuel 5,99$/mois'}
                      </button>
                      <button className={`plan-btn${planChoice === 'yearly' ? ' active' : ''}`} onClick={() => setPlanChoice('yearly')}>
                        {isEn ? 'Yearly $39.99 · Save 44%' : 'Annuel 39,99$ · −44%'}
                      </button>
                    </div>
                    <button
                      className="sh-btn red"
                      style={{ fontSize: '0.9em', padding: '0.75em' }}
                      disabled={purchasing === `subscribe_${planChoice}`}
                      onClick={() => handleSubscribe(planChoice)}
                    >
                      {purchasing === `subscribe_${planChoice}`
                        ? (isEn ? 'Processing...' : 'En cours...')
                        : isEn
                          ? `Subscribe${planChoice === 'yearly' ? ' · Best Value' : ''}`
                          : `S'abonner${planChoice === 'yearly' ? ' · Meilleur prix' : ''}`}
                    </button>
                    {isNativePlatform() && (
                      <button
                        style={{ background: 'none', border: 'none', color: '#555', fontFamily: 'inherit', fontSize: '0.72em', cursor: 'pointer', marginTop: '0.5em', textDecoration: 'underline' }}
                        onClick={handleRestorePurchases}
                      >
                        {isEn ? 'Restore purchases' : 'Restaurer les achats'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── AVATARS ── */}
          {tab === 'avatars' && (
            <div>
              <SectionLabel>{isEn ? 'PURCHASE AVATARS WITH SANDBITS' : 'ACHETEZ DES AVATARS AVEC DES SABLEBITS'}</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1em' }}>
                {AVATARS.map(item => {
                  const isOwned = ownedAvatars.includes(item.id) || (item.plusOnly && isPremium);
                  const canAfford = sandbits >= item.price;
                  const isLoading = purchasing === item.id;
                  return (
                    <div key={item.id} className="sh-card">
                      <CardBadge cls="av-badge">AVATAR</CardBadge>
                      {item.image
                        ? <img src={item.image} alt={item.name} style={{ width: 56, height: 56, objectFit: 'contain', borderRadius: 8, marginTop: '0.4em', marginBottom: 2 }} />
                        : <span className="sh-card-icon">{item.emoji}</span>
                      }
                      <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.95em', margin: 0, textAlign: 'center' }}>{item.name}</p>
                      {item.plusOnly
                        ? <p style={{ color: '#b00020', fontSize: '0.72em', fontWeight: 700, margin: 0 }}>AfroPlus</p>
                        : item.price === 0
                          ? <p style={{ color: '#27ae60', fontSize: '0.75em', fontWeight: 700, margin: 0 }}>{isEn ? 'Free' : 'Gratuit'}</p>
                          : <p style={{ color: '#f0a800', fontSize: '0.75em', fontWeight: 600, margin: 0 }}>🪙 {item.price}</p>
                      }
                      {item.price === 0 && !item.plusOnly ? (
                        <div style={{ background: 'rgba(39,174,96,0.12)', border: '1px solid rgba(39,174,96,0.3)', borderRadius: 6, padding: '4px 12px', color: '#27ae60', fontSize: '0.72em', fontWeight: 700 }}>
                          {isEn ? 'Owned' : 'Possédé'}
                        </div>
                      ) : item.plusOnly && !isPremium ? (
                        <div style={{ background: 'rgba(176,0,32,0.12)', border: '1px solid rgba(176,0,32,0.3)', borderRadius: 6, padding: '4px 12px', color: '#b00020', fontSize: '0.72em', fontWeight: 700, textAlign: 'center' }}>
                          {isEn ? 'Plus Only' : 'Plus Seulement'}
                        </div>
                      ) : isOwned ? (
                        <button className={`sh-btn green`} disabled={isLoading} onClick={() => handleEquip(item, 'avatar')}>
                          {isLoading ? '...' : (isEn ? 'Equip' : 'Équiper')}
                        </button>
                      ) : (
                        <button
                          className="sh-btn gold"
                          disabled={!canAfford || isLoading}
                          style={{ opacity: !canAfford && !isLoading ? 0.5 : 1 }}
                          onClick={() => handleBuyCosmetic(item, 'avatar')}
                        >
                          {isLoading ? '...' : !canAfford
                            ? (isEn ? `Need ${item.price} 🪙` : `${item.price} 🪙 requis`)
                            : (isEn ? `Get · ${item.price} 🪙` : `Acheter · ${item.price} 🪙`)}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── BACKGROUNDS ── */}
          {tab === 'backgrounds' && (
            <div>
              <SectionLabel>{isEn ? 'PURCHASE BACKGROUNDS WITH SANDBITS' : 'ACHETEZ DES FONDS AVEC DES SABLEBITS'}</SectionLabel>
              <p style={{ color: '#555', fontSize: '0.72em', marginBottom: '1.25em', letterSpacing: 0.5 }}>
                {isEn ? 'Tap a card to preview · tap again to dismiss' : 'Appuyez pour prévisualiser'}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1em' }}>
                {BACKGROUNDS.map(item => {
                  const isOwned = ownedBackgrounds.includes(item.id);
                  const canAfford = sandbits >= item.price;
                  const isLoading = purchasing === item.id;
                  const cardGrad = BG_CARD_GRADIENT[item.id] || BG_CARD_GRADIENT['bg_default'];
                  return (
                    <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                      <div
                        className="bg-preview-card"
                        style={{ height: 110, background: cardGrad, border: `2px solid ${previewBg === item.id ? '#c0392b' : 'rgba(255,255,255,0.08)'}` }}
                        onClick={() => setPreviewBg(previewBg === item.id ? null : item.id)}
                      >
                        <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center', fontSize: '1.8em', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))', userSelect: 'none' }}>
                          {BG_ACCENT[item.id]}
                        </div>
                        <span className="bg-badge" style={{ position: 'absolute', top: '0.4em', left: '0.4em', fontSize: '0.52em', fontWeight: 800, padding: '0.2em 0.5em', borderRadius: 4, letterSpacing: 1, textTransform: 'uppercase' }}>BG</span>
                        {isOwned && (
                          <span style={{ position: 'absolute', top: '0.4em', right: '0.4em', fontSize: '0.52em', fontWeight: 800, padding: '0.2em 0.5em', borderRadius: 4, background: 'rgba(39,174,96,0.25)', color: '#27ae60', border: '1px solid rgba(39,174,96,0.4)' }}>
                            {isEn ? 'OWNED' : 'POSSÉDÉ'}
                          </span>
                        )}
                        <div className="bg-preview-hint">👁 {isEn ? 'Preview' : 'Aperçu'}</div>
                      </div>

                      <div style={{ background: '#161616', border: '1px solid #222', borderRadius: 10, padding: '0.75em 0.85em', display: 'flex', flexDirection: 'column', gap: '0.4em' }}>
                        <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.9em', margin: 0 }}>{item.name}</p>
                        {item.price === 0
                          ? <p style={{ color: '#27ae60', fontSize: '0.72em', fontWeight: 700, margin: 0 }}>{isEn ? 'Free · Owned' : 'Gratuit · Possédé'}</p>
                          : <p style={{ color: '#f0a800', fontSize: '0.72em', fontWeight: 600, margin: 0 }}>🪙 {item.price}</p>
                        }
                        {item.price === 0 ? (
                          <div style={{ background: 'rgba(39,174,96,0.12)', border: '1px solid rgba(39,174,96,0.3)', borderRadius: 5, padding: '3px 10px', color: '#27ae60', fontSize: '0.7em', fontWeight: 700, textAlign: 'center' }}>
                            {isEn ? 'Owned' : 'Possédé'}
                          </div>
                        ) : isOwned ? (
                          <button className="sh-btn green" style={{ fontSize: '0.78em' }} disabled={isLoading} onClick={() => handleEquip(item, 'background')}>
                            {isLoading ? '...' : (isEn ? 'Equip' : 'Équiper')}
                          </button>
                        ) : (
                          <button
                            className="sh-btn gold"
                            style={{ fontSize: '0.78em', opacity: !canAfford && !isLoading ? 0.5 : 1 }}
                            disabled={!canAfford || isLoading}
                            onClick={() => handleBuyCosmetic(item, 'background')}
                          >
                            {isLoading ? '...' : !canAfford
                              ? (isEn ? `Need ${item.price} 🪙` : `${item.price} 🪙 requis`)
                              : (isEn ? `Get · ${item.price} 🪙` : `Acheter · ${item.price} 🪙`)}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <CharityBar isEn={isEn} />
      </div>

      {/* ── FULLSCREEN BG PREVIEW ── */}
      {previewBg && (() => {
        const item = BACKGROUNDS.find(b => b.id === previewBg)!;
        const isOwned = ownedBackgrounds.includes(item.id);
        const canAfford = sandbits >= item.price;
        const isLoading = purchasing === item.id;
        const isSavanna = item.id === 'bg_savanna';
        const isCloudy  = item.id === 'bg_cloudy';
        const isNight   = item.id === 'bg_night';
        const isForest  = item.id === 'bg_forest';
        const isOcean   = item.id === 'bg_ocean';
        return (
          <div className="bg-fullscreen" style={{ background: isSavanna ? 'rgb(28,14,4)' : isCloudy ? 'rgb(5,55,128)' : isNight ? '#0b0f14' : isForest ? 'hsl(200,40%,18%)' : isOcean ? '#0d1e2a' : getBackgroundStyle(previewBg) }}>
            {isSavanna && <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}><SavannaCanvas preview /></div>}
            {isCloudy  && <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}><CloudyCanvas preview /></div>}
            {isForest  && <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}><DeepForestCanvas preview /></div>}
            {isOcean   && <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}><OceanCanvas preview /></div>}
            {isNight   && <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}><NightSkyCanvas preview /></div>}

            <div className="bg-topbar">
              <button className="bg-close-btn" onClick={() => setPreviewBg(null)}>✕ {isEn ? 'Close' : 'Fermer'}</button>
              <div className="bg-topbar-mid">
                <span style={{ fontSize: '1.4em', flexShrink: 0 }}>{BG_ACCENT[item.id]}</span>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: '1em', letterSpacing: 1 }}>{item.name}</span>
                <span className="bg-badge" style={{ fontSize: '0.6em', fontWeight: 800, padding: '0.2em 0.6em', borderRadius: 4, letterSpacing: 1, flexShrink: 0 }}>BG</span>
              </div>
              <div className="bg-topbar-mode">{isEn ? 'Preview' : 'Aperçu'}</div>
            </div>

            <div className="bg-center">
              <div style={{ textAlign: 'center' }}>
                <div className="bg-preview-emoji">{BG_ACCENT[item.id]}</div>
                <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(1.2rem, 5vw, 2.8rem)', letterSpacing: 3, textTransform: 'uppercase', margin: 0, textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
                  {item.name}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8em', margin: '0.4em 0 0', letterSpacing: 2, textTransform: 'uppercase' }}>
                  {isEn ? 'This is how your app will look' : 'Votre application aura cet aspect'}
                </p>
              </div>

              <div className="bg-action-card">
                {item.price === 0 ? (
                  <p style={{ color: '#27ae60', fontWeight: 700, fontSize: '1em', margin: 0 }}>✓ {isEn ? 'Free · Already Owned' : 'Gratuit · Déjà possédé'}</p>
                ) : isOwned ? (
                  <button className="sh-btn green" style={{ fontSize: '0.9em' }} disabled={isLoading}
                    onClick={() => { handleEquip(item, 'background'); setPreviewBg(null); }}>
                    {isLoading ? '...' : (isEn ? 'Equip' : 'Équiper')}
                  </button>
                ) : (
                  <>
                    <p style={{ color: '#f0a800', fontWeight: 800, fontSize: '1.3em', margin: '0 0 0.75em' }}>🪙 {item.price} Sandbits</p>
                    <button
                      className="sh-btn gold"
                      disabled={!canAfford || isLoading}
                      style={{ fontSize: '0.9em', padding: '0.65em 1.5em', opacity: !canAfford ? 0.5 : 1 }}
                      onClick={() => handleBuyCosmetic(item, 'background')}
                    >
                      {isLoading ? '...' : !canAfford
                        ? (isEn ? `Need ${item.price} Sandbits` : `Il faut ${item.price} Sablebits`)
                        : (isEn ? `Get for ${item.price} 🪙` : `Acheter ${item.price} 🪙`)}
                    </button>
                    {!canAfford && (
                      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7em', margin: '0.6em 0 0' }}>
                        {isEn ? `You have ${sandbits} Sandbits` : `Vous avez ${sandbits} Sablebits`}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            <div style={{ position: 'absolute', inset: 0, zIndex: -1 }} onClick={() => setPreviewBg(null)} />
          </div>
        );
      })()}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '0.7em', fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#555', marginBottom: '1em', paddingBottom: '0.5em', borderBottom: '1px solid #1e1e1e' }}>
      {children}
    </p>
  );
}

function CardBadge({ cls, children }: { cls: string; children: React.ReactNode }) {
  return (
    <span className={cls} style={{ position: 'absolute', top: '0.6em', left: '0.6em', fontSize: '0.58em', fontWeight: 800, padding: '0.2em 0.6em', borderRadius: 4, letterSpacing: 1, textTransform: 'uppercase' }}>
      {children}
    </span>
  );
}

function CharityBar({ isEn }: { isEn: boolean }) {
  return (
    <div style={{ background: 'rgba(192,57,43,0.07)', borderTop: '1px solid rgba(192,57,43,0.18)', textAlign: 'center', fontSize: '0.75em', color: '#c0392b', padding: '0.7em', letterSpacing: '0.5px' }}>
      ❤️ {isEn ? '50% of all payments go directly to African charities' : '50% de tous les paiements vont directement à des associations africaines'}
    </div>
  );
}
