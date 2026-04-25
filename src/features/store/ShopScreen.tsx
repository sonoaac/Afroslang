import { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { SandbitsIcon } from '../../components/ui/SandbitsIcon';
import { SavannaCanvas } from '../../components/landing/SavannaCanvas';
import { InterfaceLanguage } from '../../types';
import {
  DIAMOND_PACKS,
  AVATARS,
  BACKGROUNDS,
  SANDBITS_PER_DIAMOND,
  purchaseCosmetic,
  buyDiamondPack,
  getBackgroundStyle,
  CosmeticItem,
} from '../../utils/currencyUtils';

// Card-scale preview gradients — more saturated/visible than the full-page versions
const BG_CARD_GRADIENT: Record<string, string> = {
  bg_default: 'radial-gradient(ellipse 120% 80% at 30% 20%, rgba(176,0,32,0.55) 0%, rgba(0,0,0,0) 60%), linear-gradient(135deg, #0a0000 0%, #1f000b 55%, #0a0000 100%)',
  bg_savanna: 'radial-gradient(ellipse 120% 80% at 50% 90%, rgba(244,163,0,0.55) 0%, rgba(0,0,0,0) 60%), linear-gradient(160deg, #100500 0%, #2a0e00 45%, #0e0300 100%)',
  bg_market:  'radial-gradient(ellipse 120% 80% at 35% 45%, rgba(220,60,0,0.55) 0%, rgba(0,0,0,0) 60%), linear-gradient(135deg, #100000 0%, #260600 50%, #0a0000 100%)',
  bg_night:   'radial-gradient(ellipse 120% 80% at 70% 10%, rgba(50,80,220,0.55) 0%, rgba(0,0,0,0) 65%), linear-gradient(160deg, #000010 0%, #00001a 55%, #000008 100%)',
  bg_forest:  'radial-gradient(ellipse 120% 80% at 20% 65%, rgba(0,160,60,0.55) 0%, rgba(0,0,0,0) 65%), linear-gradient(150deg, #000800 0%, #001800 50%, #000500 100%)',
  bg_ocean:   'radial-gradient(ellipse 120% 80% at 65% 25%, rgba(0,120,220,0.55) 0%, rgba(0,0,0,0) 65%), linear-gradient(145deg, #000810 0%, #001428 50%, #000508 100%)',
};

// Accent overlays visible on the card thumbnail
const BG_ACCENT: Record<string, string> = {
  bg_default: '🏜️',
  bg_savanna: '🌅',
  bg_market:  '🏮',
  bg_night:   '✨',
  bg_forest:  '🌿',
  bg_ocean:   '🌊',
};

interface ShopScreenProps {
  interfaceLanguage: InterfaceLanguage;
  onBack: () => void;
}

type ShopTab = 'store' | 'avatars' | 'backgrounds';

interface CartItem {
  id: string;
  name: string;
  price: number;
  currency: 'usd' | 'sandbits';
  type: 'diamond' | 'subscription' | 'avatar' | 'background';
  icon: string;
  quantity: number;
  sandbits: number;
  max: number;
  packRef?: typeof DIAMOND_PACKS[number];
  cosmeticRef?: CosmeticItem;
  cosmeticType?: 'avatar' | 'background';
}

const BADGE: Record<string, { cls: string; label: string }> = {
  diamond:      { cls: 'store-badge', label: 'STORE' },
  subscription: { cls: 'plus-badge',  label: 'AfroPlus' },
  avatar:       { cls: 'av-badge',    label: 'AVATAR' },
  background:   { cls: 'bg-badge',    label: 'BG' },
};

export function ShopScreen({ interfaceLanguage, onBack }: ShopScreenProps) {
  const { userData, setUserData, user } = useAuth();
  const isEn = interfaceLanguage === 'en';

  const [shopView, setShopView] = useState<'shop' | 'cart'>('shop');
  const [tab, setTab] = useState<ShopTab>('store');
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [previewBg, setPreviewBg] = useState<string | null>(null);
  const cartScrollRef = useRef<HTMLUListElement>(null);

  const sandbits = userData?.sandbits ?? 0;
  const diamonds = userData?.diamonds ?? 0;
  const ownedAvatars: string[] = userData?.ownedAvatars ?? ['avatar_default'];
  const ownedBackgrounds: string[] = userData?.ownedBackgrounds ?? ['bg_default'];
  const cartCount = Object.values(cart).reduce((s, i) => s + i.quantity, 0);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const ex = prev[item.id];
      if (ex) {
        if (ex.quantity >= item.max) return prev;
        return { ...prev, [item.id]: { ...ex, quantity: ex.quantity + 1 } };
      }
      return { ...prev, [item.id]: item };
    });
  };

  const changeQty = (id: string, delta: number) => {
    setCart(prev => {
      const item = prev[id];
      if (!item) return prev;
      const q = item.quantity + delta;
      if (q <= 0) { const n = { ...prev }; delete n[id]; return n; }
      if (q > item.max) return prev;
      return { ...prev, [id]: { ...item, quantity: q } };
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => { const n = { ...prev }; delete n[id]; return n; });
  };

  const usdTotal = Object.values(cart).filter(i => i.currency === 'usd').reduce((s, i) => s + i.price * i.quantity, 0);
  const sbTotal  = Object.values(cart).filter(i => i.currency === 'sandbits').reduce((s, i) => s + i.sandbits * i.quantity, 0);

  const handleCheckout = async () => {
    if (checkingOut) return;
    const items = Object.values(cart);
    if (items.length === 0) return;

    const usdItems = items.filter(i => i.currency === 'usd');
    const sbItems  = items.filter(i => i.currency === 'sandbits');

    // Handle USD items — redirect to Stripe for the first one
    if (usdItems.length > 0) {
      const first = usdItems[0];
      if (first.packRef) {
        buyDiamondPack(first.packRef, user?.uid ?? '', user?.email ?? '');
        return;
      }
      showToast(isEn ? 'Stripe checkout coming soon!' : 'Paiement Stripe bientôt!');
      return;
    }

    // Handle Sandbit items
    if (!user || !userData) {
      return showToast(isEn ? 'Sign in first.' : 'Connectez-vous.');
    }
    setCheckingOut(true);
    let updatedData = { ...userData };
    try {
      for (const item of sbItems) {
        if (!item.cosmeticRef || !item.cosmeticType) continue;
        const result = await purchaseCosmetic(user.uid, updatedData, item.cosmeticRef, item.cosmeticType);
        if (result) updatedData = { ...updatedData, ...result };
      }
      setUserData(updatedData);
      setCart({});
      showToast(isEn ? '✓ Purchase complete!' : '✓ Achat effectué!');
      setShopView('shop');
    } catch {
      showToast(isEn ? 'Checkout failed. Try again.' : 'Échec du paiement. Réessayez.');
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <div style={{ minHeight: '100dvh', background: '#0d0d0d', color: '#f0e6d3', fontFamily: "'Plus Jakarta Sans', sans-serif", position: 'relative', zIndex: 5 }}>
      <style>{`
        @keyframes cart-bump {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.6); }
          100% { transform: scale(1); }
        }
        @keyframes shop-fadein {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer-dia {
          0%,100% { filter: drop-shadow(0 0 4px rgba(106,180,255,0.4)); }
          50%     { filter: drop-shadow(0 0 14px rgba(106,180,255,0.9)); }
        }
        .shop-screen-view { animation: shop-fadein 0.28s ease; }
        .sh-card { background: #161616; border: 1px solid #222; border-radius: 12px; padding: 1.2em 1em 1em; position: relative; display: flex; flex-direction: column; align-items: center; gap: 0.4em; transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s; cursor: default; }
        .sh-card:hover { border-color: #c0392b; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(192,57,43,0.2); }
        .sh-card.featured { border-color: #6ab4ff; box-shadow: 0 0 16px rgba(100,180,255,0.12); }
        .sh-card.featured:hover { border-color: #6ab4ff; box-shadow: 0 8px 24px rgba(100,180,255,0.25); }
        .sh-card-icon { font-size: 2.8em; margin-top: 0.4em; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.7)); transition: transform 0.25s ease; user-select: none; }
        .sh-card:hover .sh-card-icon { transform: scale(1.12) translateY(-3px); }
        .sh-add-btn { margin-top: auto; background: #c0392b; color: #fff; border: none; font-family: inherit; font-size: 0.8em; font-weight: 700; padding: 0.55em 1em; border-radius: 6px; cursor: pointer; width: 100%; transition: background 0.15s, transform 0.1s; letter-spacing: 0.5px; }
        .sh-add-btn:hover { background: #e74c3c; }
        .sh-add-btn:active { transform: scale(0.96); background: #a93226; }
        .sh-add-btn.sb { background: #b87d00; }
        .sh-add-btn.sb:hover { background: #d4920a; }
        .sh-add-btn.added { background: #27ae60; }
        .sh-tab-btn { background: none; border: none; color: #555; font-family: inherit; font-size: 0.85em; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 1em 1.5em; cursor: pointer; border-bottom: 3px solid transparent; transition: color 0.2s, border-color 0.2s; }
        .sh-tab-btn:hover { color: #aaa; }
        .sh-tab-btn.active { color: #fff; border-bottom-color: #c0392b; }
        .cart-item-card { width: 190px; height: 280px; flex-shrink: 0; position: relative; border-right: 1px solid rgba(255,255,255,0.04); }
        .cart-item-card:nth-child(4n+1) .ci-preview { background: #14001e; }
        .cart-item-card:nth-child(4n+2) .ci-preview { background: #001525; }
        .cart-item-card:nth-child(4n+3) .ci-preview { background: #001a08; }
        .cart-item-card:nth-child(4n+0) .ci-preview { background: #1a0a00; }
        .ci-preview { height: 280px; padding: 0.8em; position: relative; }
        .ci-icon { width: 100%; height: 120px; display: flex; align-items: center; justify-content: center; font-size: 2.6em; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.7)); transition: transform 0.25s ease; margin-top: 0.5em; }
        .cart-item-card:hover .ci-icon { transform: scale(1.1) translateY(-3px); }
        .ci-interactions { position: absolute; bottom: 86px; left: 0; right: 0; height: 52px; display: flex; border-bottom: 1px solid rgba(192,57,43,0.2); transform-origin: 50% 100%; transform: perspective(600px) rotateX(90deg); opacity: 0; transition: 0.32s all cubic-bezier(0.34,1.56,0.64,1); }
        .cart-item-card:hover .ci-interactions { opacity: 1; transform: perspective(600px) rotateX(0deg); }
        .ci-btn { flex: 1; height: 52px; display: flex; align-items: center; justify-content: center; font-size: 1.8em; cursor: pointer; user-select: none; border-right: 1px solid rgba(255,255,255,0.05); transition: background 0.1s, font-size 0.1s; }
        .ci-btn:last-child { border-right: none; }
        .ci-btn.plus  { color: #2ecc71; background: rgba(46,204,113,0.08); }
        .ci-btn.minus { color: #f39c12; background: rgba(243,156,18,0.08); }
        .ci-btn.del   { background: rgba(192,57,43,0.1); color: #c0392b; font-size: 1.4em; font-weight: 900; }
        .ci-btn:hover  { background: rgba(255,255,255,0.1) !important; }
        .ci-btn:active { font-size: 2.3em; background: rgba(255,255,255,0.16) !important; }
        .store-badge { background: rgba(100,180,255,0.15); color: #6ab4ff; border: 1px solid rgba(100,180,255,0.3); }
        .best-badge  { background: rgba(100,180,255,0.25); color: #6ab4ff; border: 1px solid #6ab4ff; }
        .plus-badge  { background: rgba(192,57,43,0.3); color: #ff6b55; border: 1px solid rgba(192,57,43,0.5); }
        .av-badge    { background: rgba(180,130,0,0.2); color: #f0a800; border: 1px solid rgba(180,130,0,0.35); }
        .bg-badge    { background: rgba(0,160,100,0.15); color: #00d48a; border: 1px solid rgba(0,160,100,0.3); }
        .sh-cart-go-btn { background: #c0392b; color: #fff; border: none; font-family: inherit; font-size: 1em; font-weight: 700; letter-spacing: 1px; padding: 0.5em 1.2em; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 0.5em; transition: background 0.15s, transform 0.1s; box-shadow: 0 4px 16px rgba(192,57,43,0.4); }
        .sh-cart-go-btn:hover { background: #e74c3c; transform: translateY(-1px); }
        .sh-cart-go-btn:active { transform: translateY(1px); background: #a93226; }
        .afroplus-card-bg { background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.72)), url('/Afroplus.png'); background-size: cover; background-position: center; }
        .afroplus-card-bg:hover { box-shadow: 0 8px 32px rgba(192,57,43,0.35) !important; }
        .bg-preview-card { border-radius: 12px; overflow: hidden; position: relative; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
        .bg-preview-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.6); }
        .bg-preview-card:hover .bg-preview-hint { opacity: 1; }
        .bg-preview-hint { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.45); opacity: 0; transition: opacity 0.2s; font-size: 0.78em; font-weight: 700; letter-spacing: 1px; color: #fff; text-transform: uppercase; }
        @keyframes bg-preview-in { from { opacity: 0; } to { opacity: 1; } }
        .bg-fullscreen-preview { position: fixed; inset: 0; z-index: 9998; display: flex; flex-direction: column; animation: bg-preview-in 0.25s ease; }
        .bg-preview-stars { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .bg-preview-star { position: absolute; width: 2px; height: 2px; background: #fff; border-radius: 50%; animation: star-twinkle 3s ease-in-out infinite; }
        @keyframes star-twinkle { 0%,100% { opacity: 0.2; } 50% { opacity: 1; } }
        .checkout-btn { background: #c0392b; color: #fff; border: none; font-family: inherit; font-size: 1.4em; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; padding: 0.8em; cursor: pointer; transition: background 0.15s; box-shadow: 0 4px 18px rgba(192,57,43,0.4); width: 100%; }
        .checkout-btn:hover { background: #e74c3c; }
        .checkout-btn:disabled { background: #3a3a3a; cursor: not-allowed; box-shadow: none; }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', background: 'rgba(6,3,1,0.97)', border: '1px solid rgba(192,57,43,0.5)', color: '#f0e6d3', padding: '10px 20px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 'bold', zIndex: 9999, boxShadow: '0 4px 32px rgba(0,0,0,0.7)', maxWidth: 'calc(100vw - 2rem)', textAlign: 'center' }}>
          {toast}
        </div>
      )}

      {/* ── SHOP VIEW ── */}
      {shopView === 'shop' && (
        <div className="shop-screen-view">
          {/* Header */}
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75em', padding: '0.9em 1.25em', background: 'linear-gradient(160deg, #1a0a00 0%, #2a1000 60%, #180800 100%)', borderBottom: '3px solid #c0392b', position: 'sticky', top: 0, zIndex: 100 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#aaa', fontFamily: 'inherit', fontSize: '0.8em', fontWeight: 700, padding: '0.35em 0.75em', borderRadius: 6, cursor: 'pointer', transition: 'background 0.15s, color 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#aaa'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; }}>
                  ← {isEn ? 'Back' : 'Retour'}
                </button>
                <div style={{ fontSize: '1.5em', fontWeight: 900, letterSpacing: 2, color: '#fff', textShadow: '0 0 18px rgba(192,57,43,0.7)' }}>
                  🌍 <span style={{ color: '#ff6b55' }}>Afroslang</span>
                </div>
              </div>
              <div style={{ fontSize: '0.65em', color: '#555', letterSpacing: 2, textTransform: 'uppercase', marginTop: '0.15em' }}>
                {isEn ? 'Diamonds · Sandbits · Cosmetics' : 'Diamants · Sablebits · Cosmétiques'}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75em' }}>
              {/* Wallet */}
              <div style={{ display: 'flex', gap: '0.6em', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.4em 0.85em', borderRadius: 8, fontSize: '0.88em', fontWeight: 700 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3em' }}>
                  <SandbitsIcon size={16} /> {sandbits.toLocaleString()}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3em', color: '#6ab4ff' }}>
                  💎 {diamonds}
                </span>
              </div>
              {/* Cart button */}
              <button className="sh-cart-go-btn" onClick={() => setShopView('cart')}>
                🛒 {isEn ? 'Cart' : 'Panier'}
                <span style={{
                  background: '#fff', color: '#c0392b', borderRadius: '50%', width: '1.5em', height: '1.5em',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75em', fontWeight: 900,
                  animation: cartCount > 0 ? 'cart-bump 0.3s ease' : undefined,
                }}>
                  {cartCount}
                </span>
              </button>
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

          {/* Tab panels */}
          <div style={{ padding: '1.5em', paddingBottom: '5em' }}>

            {/* ── STORE ── */}
            {tab === 'store' && (
              <div>
                <SectionLabel>{isEn ? 'BUY DIAMONDS WITH REAL MONEY' : 'ACHETEZ DES DIAMANTS AVEC DE L\'ARGENT RÉEL'}</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1em', marginBottom: '2em' }}>
                  {DIAMOND_PACKS.map(pack => {
                    const inCart = cart[pack.id];
                    return (
                      <div key={pack.id} className={`sh-card${(pack as any).highlight ? ' featured' : ''}`}>
                        <CardBadge cls={(pack as any).highlight ? 'best-badge' : 'store-badge'}>{(pack as any).highlight ? 'BEST VALUE' : 'STORE'}</CardBadge>
                        <span className="sh-card-icon" style={{ animation: 'shimmer-dia 2.5s ease-in-out infinite' }}>
                          {'💎'.repeat(Math.min(pack.diamonds, 3))}{pack.diamonds > 3 ? '+' : ''}
                        </span>
                        <p style={{ color: '#fff', fontWeight: 700, fontSize: '1em', margin: 0, textAlign: 'center' }}>{pack.label}</p>
                        <p style={{ color: '#666', fontSize: '0.72em', margin: 0, textAlign: 'center' }}>= {pack.diamonds * SANDBITS_PER_DIAMOND} Sandbits</p>
                        <p style={{ color: '#6ab4ff', fontWeight: 800, fontSize: '1.15em', margin: '0.2em 0 0' }}>${pack.price.toFixed(2)}</p>
                        <button
                          className={`sh-add-btn${inCart ? ' added' : ''}`}
                          onClick={() => {
                            addToCart({ id: pack.id, name: pack.label, price: pack.price, currency: 'usd', type: 'diamond', icon: '💎', quantity: 1, sandbits: 0, max: 99, packRef: pack });
                            showToast(isEn ? `${pack.label} added to cart!` : `${pack.label} ajouté au panier!`);
                          }}
                        >
                          {inCart ? `✓ In Cart (${inCart.quantity})` : `+ ${isEn ? 'Add to Cart' : 'Ajouter'}`}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* AfroPlus */}
                <SectionLabel>{isEn ? 'AFROPLUS SUBSCRIPTION' : 'ABONNEMENT AFROPLUS'}</SectionLabel>
                <div className="sh-card afroplus-card-bg"
                  style={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start',
                    gap: '1em', padding: '1.5em', border: '1px solid rgba(192,57,43,0.4)',
                    cursor: 'default', borderRadius: 14,
                  }}>
                  <CardBadge cls="plus-badge">AfroPlus</CardBadge>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4em', paddingTop: '1.5em' }}>
                    <span style={{ fontSize: '2.5em', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.7))' }}>⚡</span>
                    <p style={{ color: '#fff', fontWeight: 800, fontSize: '1.35em', margin: 0 }}>AfroPlus</p>
                    <p style={{ color: '#666', fontSize: '0.72em', margin: 0 }}>{isEn ? '7-day free trial · cancel anytime' : 'Essai 7 jours · annulable'}</p>
                  </div>
                  <ul style={{ listStyle: 'none', fontSize: '0.82em', color: '#aaa', lineHeight: 1.9, flex: 1, minWidth: 150, paddingTop: '1.5em', margin: 0 }}>
                    <li>{isEn ? '❤️ Unlimited hearts' : '❤️ Cœurs illimités'}</li>
                    <li>{isEn ? '⚡ 2× XP on all lessons' : '⚡ 2× XP sur toutes les leçons'}</li>
                    <li>{isEn ? '📖 Review page (flashcards)' : '📖 Page de révision'}</li>
                    <li>{isEn ? '🚫 No ads' : '🚫 Sans publicité'}</li>
                  </ul>
                  <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75em' }}>
                    <p style={{ color: '#6ab4ff', fontWeight: 800, fontSize: '1.3em', margin: 0 }}>
                      $4.99<span style={{ fontSize: '0.55em', color: '#555', fontWeight: 600 }}>/mo</span>
                    </p>
                    <button
                      className={`sh-add-btn${cart['afroplus'] ? ' added' : ''}`}
                      style={{ width: 'auto', minWidth: 140 }}
                      onClick={() => {
                        addToCart({ id: 'afroplus', name: 'AfroPlus', price: 4.99, currency: 'usd', type: 'subscription', icon: '⚡', quantity: 1, sandbits: 0, max: 1 });
                        showToast(isEn ? 'AfroPlus added to cart!' : 'AfroPlus ajouté au panier!');
                      }}
                    >
                      {cart['afroplus'] ? '✓ In Cart' : `+ ${isEn ? 'Add to Cart' : 'Ajouter'}`}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── AVATARS ── */}
            {tab === 'avatars' && (
              <div>
                <SectionLabel>{isEn ? 'PURCHASE AVATARS WITH SANDBITS' : 'ACHETEZ DES AVATARS AVEC DES SABLEBITS'}</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1em' }}>
                  {AVATARS.map(item => {
                    const isOwned = ownedAvatars.includes(item.id);
                    const inCart = cart[item.id];
                    const canAfford = sandbits >= item.price;
                    return (
                      <div key={item.id} className="sh-card">
                        <CardBadge cls="av-badge">AVATAR</CardBadge>
                        <span className="sh-card-icon">{item.emoji}</span>
                        <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.95em', margin: 0, textAlign: 'center' }}>{item.name}</p>
                        {item.price === 0
                          ? <p style={{ color: '#27ae60', fontSize: '0.75em', fontWeight: 700, margin: 0 }}>{isEn ? 'Free' : 'Gratuit'}</p>
                          : <p style={{ color: '#f0a800', fontSize: '0.75em', fontWeight: 600, margin: 0 }}>🪙 {item.price}</p>
                        }
                        {isOwned ? (
                          <div style={{ background: 'rgba(39,174,96,0.12)', border: '1px solid rgba(39,174,96,0.3)', borderRadius: 6, padding: '3px 12px', color: '#27ae60', fontSize: '0.72em', fontWeight: 700 }}>
                            {isEn ? 'Owned' : 'Possédé'}
                          </div>
                        ) : (
                          <button
                            className={`sh-add-btn sb${inCart ? ' added' : ''}`}
                            disabled={!canAfford && !inCart}
                            style={{ opacity: !canAfford && !inCart ? 0.5 : 1 }}
                            onClick={() => {
                              if (!canAfford) return showToast(isEn ? `Need ${item.price} Sandbits` : `Il faut ${item.price} Sablebits`);
                              addToCart({ id: item.id, name: item.name, price: 0, currency: 'sandbits', type: 'avatar', icon: item.emoji, quantity: 1, sandbits: item.price, max: 1, cosmeticRef: item, cosmeticType: 'avatar' });
                              showToast(isEn ? `${item.name} added!` : `${item.name} ajouté!`);
                            }}
                          >
                            {inCart ? '✓ In Cart' : `+ ${isEn ? 'Add' : 'Ajouter'}`}
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
                  {isEn ? 'Hover or tap a card to preview · click again to dismiss' : 'Survolez ou appuyez pour prévisualiser'}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1em' }}>
                  {BACKGROUNDS.map(item => {
                    const isOwned = ownedBackgrounds.includes(item.id);
                    const inCart = cart[item.id];
                    const canAfford = sandbits >= item.price;
                    const cardGrad = BG_CARD_GRADIENT[item.id] || BG_CARD_GRADIENT['bg_default'];
                    return (
                      <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                        {/* Preview thumbnail — clicking opens fullscreen */}
                        <div
                          className="bg-preview-card"
                          style={{ height: 110, background: cardGrad, border: `2px solid ${previewBg === item.id ? '#c0392b' : 'rgba(255,255,255,0.08)'}` }}
                          onClick={() => setPreviewBg(previewBg === item.id ? null : item.id)}
                        >
                          {/* Decorative accent */}
                          <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center', fontSize: '1.8em', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))', userSelect: 'none' }}>
                            {BG_ACCENT[item.id]}
                          </div>
                          {/* Badge */}
                          <span className="bg-badge" style={{ position: 'absolute', top: '0.4em', left: '0.4em', fontSize: '0.52em', fontWeight: 800, padding: '0.2em 0.5em', borderRadius: 4, letterSpacing: 1, textTransform: 'uppercase' }}>BG</span>
                          {isOwned && (
                            <span style={{ position: 'absolute', top: '0.4em', right: '0.4em', fontSize: '0.52em', fontWeight: 800, padding: '0.2em 0.5em', borderRadius: 4, background: 'rgba(39,174,96,0.25)', color: '#27ae60', border: '1px solid rgba(39,174,96,0.4)' }}>
                              {isEn ? 'OWNED' : 'POSSÉDÉ'}
                            </span>
                          )}
                          <div className="bg-preview-hint">
                            {isEn ? '👁 Preview' : '👁 Aperçu'}
                          </div>
                        </div>

                        {/* Card info row */}
                        <div style={{ background: '#161616', border: '1px solid #222', borderRadius: 10, padding: '0.75em 0.85em', display: 'flex', flexDirection: 'column', gap: '0.4em' }}>
                          <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.9em', margin: 0 }}>{item.name}</p>
                          {item.price === 0
                            ? <p style={{ color: '#27ae60', fontSize: '0.72em', fontWeight: 700, margin: 0 }}>{isEn ? 'Free · Owned' : 'Gratuit · Possédé'}</p>
                            : <p style={{ color: '#f0a800', fontSize: '0.72em', fontWeight: 600, margin: 0 }}>🪙 {item.price}</p>
                          }
                          {isOwned ? (
                            <div style={{ background: 'rgba(39,174,96,0.12)', border: '1px solid rgba(39,174,96,0.3)', borderRadius: 5, padding: '2px 10px', color: '#27ae60', fontSize: '0.7em', fontWeight: 700, textAlign: 'center' }}>
                              {isEn ? 'Owned' : 'Possédé'}
                            </div>
                          ) : (
                            <button
                              className={`sh-add-btn sb${inCart ? ' added' : ''}`}
                              disabled={!canAfford && !inCart}
                              style={{ opacity: !canAfford && !inCart ? 0.5 : 1 }}
                              onClick={() => {
                                if (!canAfford) return showToast(isEn ? `Need ${item.price} Sandbits` : `Il faut ${item.price} Sablebits`);
                                addToCart({ id: item.id, name: item.name, price: 0, currency: 'sandbits', type: 'background', icon: item.emoji, quantity: 1, sandbits: item.price, max: 1, cosmeticRef: item, cosmeticType: 'background' });
                                showToast(isEn ? `${item.name} added!` : `${item.name} ajouté!`);
                              }}
                            >
                              {inCart ? '✓ In Cart' : `+ ${isEn ? 'Add' : 'Ajouter'}`}
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

          {/* ── FULLSCREEN BG PREVIEW OVERLAY ── */}
          {previewBg && (() => {
            const item = BACKGROUNDS.find(b => b.id === previewBg)!;
            const isOwned = ownedBackgrounds.includes(item.id);
            const inCart = cart[item.id];
            const canAfford = sandbits >= item.price;
            const isSavanna = item.id === 'bg_savanna';
            const stars = item.id === 'bg_night'
              ? Array.from({ length: 40 }, (_, i) => ({
                  left: `${(i * 37 + 7) % 100}%`,
                  top: `${(i * 53 + 13) % 100}%`,
                  delay: `${(i * 0.2) % 3}s`,
                  size: i % 3 === 0 ? 3 : 2,
                }))
              : [];
            return (
              <div className="bg-fullscreen-preview" style={{ background: isSavanna ? 'rgb(28,14,4)' : getBackgroundStyle(previewBg) }}>
                {/* Savanna live canvas */}
                {isSavanna && (
                  <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                    <SavannaCanvas preview />
                  </div>
                )}
                {/* Night sky stars */}
                {stars.length > 0 && (
                  <div className="bg-preview-stars">
                    {stars.map((s, i) => (
                      <div key={i} className="bg-preview-star" style={{ left: s.left, top: s.top, animationDelay: s.delay, width: s.size, height: s.size }} />
                    ))}
                  </div>
                )}

                {/* Top bar */}
                <div style={{ padding: '1em 1.25em', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <button
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontFamily: 'inherit', fontSize: '0.85em', fontWeight: 700, padding: '0.4em 0.9em', borderRadius: 6, cursor: 'pointer' }}
                    onClick={() => setPreviewBg(null)}
                  >
                    ✕ {isEn ? 'Close Preview' : 'Fermer'}
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                    <span style={{ fontSize: '1.4em' }}>{BG_ACCENT[item.id]}</span>
                    <span style={{ color: '#fff', fontWeight: 800, fontSize: '1em', letterSpacing: 1 }}>{item.name}</span>
                    <span className="bg-badge" style={{ fontSize: '0.6em', fontWeight: 800, padding: '0.2em 0.6em', borderRadius: 4, letterSpacing: 1 }}>BG</span>
                  </div>
                  <div style={{ fontSize: '0.75em', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>
                    {isEn ? 'Preview mode' : 'Aperçu'}
                  </div>
                </div>

                {/* Center content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5em', padding: '2em' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '5em', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.8))', marginBottom: '0.3em' }}>{BG_ACCENT[item.id]}</div>
                    <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(1.5rem, 6vw, 2.8rem)', letterSpacing: 3, textTransform: 'uppercase', margin: 0, textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
                      {item.name}
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8em', margin: '0.4em 0 0', letterSpacing: 2, textTransform: 'uppercase' }}>
                      {isEn ? 'This is how your app will look' : 'Votre application aura cet aspect'}
                    </p>
                  </div>

                  {/* Price / action */}
                  <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '1.25em 2em', textAlign: 'center', minWidth: 220 }}>
                    {item.price === 0 ? (
                      <p style={{ color: '#27ae60', fontWeight: 700, fontSize: '1em', margin: 0 }}>✓ {isEn ? 'Free · Already Owned' : 'Gratuit · Déjà possédé'}</p>
                    ) : isOwned ? (
                      <p style={{ color: '#27ae60', fontWeight: 700, fontSize: '1em', margin: 0 }}>✓ {isEn ? 'Owned' : 'Possédé'}</p>
                    ) : (
                      <>
                        <p style={{ color: '#f0a800', fontWeight: 800, fontSize: '1.3em', margin: '0 0 0.75em' }}>🪙 {item.price} Sandbits</p>
                        <button
                          className={`sh-add-btn sb${inCart ? ' added' : ''}`}
                          disabled={!canAfford && !inCart}
                          style={{ opacity: !canAfford && !inCart ? 0.5 : 1, fontSize: '0.9em', padding: '0.65em 1.5em' }}
                          onClick={() => {
                            if (!canAfford) return showToast(isEn ? `Need ${item.price} Sandbits` : `Il faut ${item.price} Sablebits`);
                            addToCart({ id: item.id, name: item.name, price: 0, currency: 'sandbits', type: 'background', icon: item.emoji, quantity: 1, sandbits: item.price, max: 1, cosmeticRef: item, cosmeticType: 'background' });
                            showToast(isEn ? `${item.name} added to cart!` : `${item.name} ajouté!`);
                          }}
                        >
                          {inCart ? `✓ ${isEn ? 'In Cart' : 'Dans le panier'}` : `+ ${isEn ? 'Add to Cart' : 'Ajouter au panier'}`}
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

                {/* Tap anywhere to close */}
                <div
                  style={{ position: 'absolute', inset: 0, zIndex: -1 }}
                  onClick={() => setPreviewBg(null)}
                />
              </div>
            );
          })()}
        </div>
      )}

      {/* ── CART VIEW ── */}
      {shopView === 'cart' && (
        <div className="shop-screen-view">
          {/* Cart header */}
          <div style={{ textAlign: 'center', padding: '2em 1em 1.5em', background: 'linear-gradient(160deg, #1a0a00 0%, #2a1000 50%, #180800 100%)', borderBottom: '3px solid #c0392b', position: 'relative' }}>
            <button
              style={{ position: 'absolute', top: '1em', left: '1em', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#aaa', fontFamily: 'inherit', fontSize: '0.85em', fontWeight: 700, padding: '0.4em 0.9em', borderRadius: 6, cursor: 'pointer' }}
              onClick={() => setShopView('shop')}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#aaa'; }}
            >
              ← {isEn ? 'Back to Shop' : 'Retour'}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3em' }}>
              <span style={{ fontSize: '2em', filter: 'drop-shadow(0 0 10px rgba(192,57,43,0.6))' }}>🛒</span>
              <h1 style={{ fontWeight: 900, fontSize: 'clamp(2rem, 8vw, 3.5em)', letterSpacing: 4, color: '#fff', textShadow: '0 0 24px rgba(192,57,43,0.6)', lineHeight: 1, margin: 0 }}>
                {isEn ? 'YOUR CART' : 'VOTRE PANIER'}
              </h1>
            </div>
            <p style={{ fontSize: '0.72em', color: '#666', letterSpacing: 3, textTransform: 'uppercase', margin: '0.3em 0 0' }}>
              DIAMONDS · SANDBITS · COSMETICS
            </p>
            <p style={{ color: '#c0392b', letterSpacing: 8, margin: '0.4em 0 0' }}>― ✦ ―</p>
          </div>

          {/* Cart item list */}
          <div style={{ width: '100%', height: 280, background: '#111', borderBottom: '1px solid #1e1e1e', position: 'relative', overflow: 'hidden' }}>
            {Object.keys(cart).length === 0 ? (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#444', gap: '0.5em' }}>
                <span style={{ fontSize: '2.5em' }}>🛍️</span>
                <p style={{ fontSize: '1.1em', margin: 0 }}>{isEn ? 'Your cart is empty' : 'Votre panier est vide'}</p>
                <button
                  style={{ marginTop: '0.5em', background: '#c0392b', color: '#fff', border: 'none', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.75em', padding: '0.5em 1.2em', borderRadius: 6, cursor: 'pointer' }}
                  onClick={() => setShopView('shop')}
                >
                  {isEn ? 'Browse Shop' : 'Voir la boutique'}
                </button>
              </div>
            ) : (
              <ul
                ref={cartScrollRef}
                style={{ listStyle: 'none', height: 280, display: 'flex', overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none', margin: 0, padding: 0 }}
                onScroll={() => {}}
              >
                {Object.entries(cart).map(([id, item], idx) => {
                  const b = BADGE[item.type] || { cls: 'store-badge', label: 'ITEM' };
                  const displayPrice = item.currency === 'sandbits'
                    ? `${item.sandbits * item.quantity} 🪙`
                    : `$${(item.price * item.quantity).toFixed(2)}${item.type === 'subscription' ? '/mo' : ''}`;
                  const priceColor = item.currency === 'sandbits' ? '#f0a800' : '#6ab4ff';
                  const bgColors = ['#14001e', '#001525', '#001a08', '#1a0a00'];
                  return (
                    <li key={id} className="cart-item-card">
                      <div className="ci-preview" style={{ background: bgColors[idx % 4] }}>
                        <span style={{ position: 'absolute', top: '0.5em', left: '0.5em', fontSize: '0.55em', fontWeight: 800, padding: '0.2em 0.5em', borderRadius: 4, letterSpacing: 1, textTransform: 'uppercase' }} className={b.cls}>{b.label}</span>
                        <div className="ci-icon">{item.icon}</div>
                        <div style={{ position: 'absolute', top: '0.4em', right: '0.4em', background: '#c0392b', color: '#fff', fontSize: '0.75em', fontWeight: 800, width: '2em', height: '2em', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotateZ(10deg)', boxShadow: '0 2px 6px rgba(192,57,43,0.5)' }}>
                          x{item.quantity}
                        </div>
                        <div className="ci-interactions">
                          <div className="ci-btn plus" onClick={() => changeQty(id, 1)}>+</div>
                          <div className="ci-btn minus" onClick={() => changeQty(id, -1)}>−</div>
                          <div className="ci-btn del" onClick={() => removeFromCart(id)}>✕</div>
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 86, background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(4px)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '0.6em 0.8em' }}>
                          <p style={{ fontSize: '0.9em', fontWeight: 700, color: '#fff', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>{item.name}</p>
                          <p style={{ fontSize: '0.85em', fontWeight: 700, color: priceColor, textAlign: 'center', margin: '0.15em 0 0' }}>{displayPrice}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Bill */}
          {Object.keys(cart).length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', background: '#141414', borderTop: '1px solid #222' }}>
              <div style={{ flex: 1, minWidth: 220, padding: '1em 2em' }}>
                <p style={{ fontSize: '0.8em', letterSpacing: 2, color: '#555', marginBottom: '0.5em', borderBottom: '1px solid #1e1e1e', paddingBottom: '0.3em', fontWeight: 800, textTransform: 'uppercase' }}>💵 {isEn ? 'Real Money' : 'Argent réel'}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25em 0', fontSize: '0.88em' }}>
                  <span style={{ color: '#555', textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: 1 }}>{isEn ? 'Diamonds & AfroPlus' : 'Diamants & AfroPlus'}</span>
                  <span style={{ fontWeight: 700, color: '#ccc' }}>${usdTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4em 0 0.25em', fontSize: '0.9em', borderTop: '1px solid #222', marginTop: '0.3em' }}>
                  <span style={{ color: '#c0392b', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: 1 }}>Total (USD)</span>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '1.1em' }}>${usdTotal.toFixed(2)}</span>
                </div>
              </div>
              <div style={{ width: 1, background: '#222', margin: '0.8em 0' }} />
              <div style={{ flex: 1, minWidth: 220, padding: '1em 2em' }}>
                <p style={{ fontSize: '0.8em', letterSpacing: 2, color: '#555', marginBottom: '0.5em', borderBottom: '1px solid #1e1e1e', paddingBottom: '0.3em', fontWeight: 800, textTransform: 'uppercase' }}>🪙 Sandbits</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25em 0', fontSize: '0.88em' }}>
                  <span style={{ color: '#555', textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: 1 }}>{isEn ? 'Cosmetics' : 'Cosmétiques'}</span>
                  <span style={{ fontWeight: 700, color: '#ccc' }}>{sbTotal} 🪙</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4em 0 0.25em', fontSize: '0.9em', borderTop: '1px solid #222', marginTop: '0.3em' }}>
                  <span style={{ color: '#c0392b', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8em', letterSpacing: 1 }}>Total (Sandbits)</span>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '1.1em' }}>{sbTotal} 🪙</span>
                </div>
              </div>
            </div>
          )}

          <CharityBar isEn={isEn} />

          {/* Checkout */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <button className="checkout-btn" disabled={checkingOut || Object.keys(cart).length === 0} onClick={handleCheckout}>
              {checkingOut ? (isEn ? 'Processing...' : 'En cours...') : `${isEn ? 'Checkout' : 'Commander'} 🛒`}
            </button>
            <button
              style={{ background: '#161616', color: '#666', border: 'none', borderTop: '1px solid #222', fontFamily: 'inherit', fontSize: '1em', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '0.8em', cursor: 'pointer', transition: 'background 0.15s, color 0.15s' }}
              onClick={() => setShopView('shop')}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1e1e1e'; (e.currentTarget as HTMLElement).style.color = '#bbb'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#161616'; (e.currentTarget as HTMLElement).style.color = '#666'; }}
            >
              ← {isEn ? 'Back to Shop' : 'Retour à la boutique'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────

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
