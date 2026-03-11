import { useAuth } from '../../contexts/AuthContext';
import { Gem, Heart, Zap } from 'lucide-react';
import { SandbitsIcon } from '../../components/ui/SandbitsIcon';
import { InterfaceLanguage } from '../../types';

interface ShopScreenProps {
  interfaceLanguage: InterfaceLanguage;
  onBack: () => void;
}

export function ShopScreen({ interfaceLanguage, onBack }: ShopScreenProps) {
  const { userData } = useAuth();
  const isEnglish = interfaceLanguage === 'en';
  
  // Get currency values (with defaults)
  const gems = userData?.gems || 500;
  const sandbits = userData?.sandbits || 0;

  const spFont = "'Times New Roman', Georgia, serif";
  const spBg = '#080808';
  const spSurface = '#111111';
  const spBorder = 'rgba(255,255,255,0.08)';
  const spRed = '#b00020';
  const spText = '#ffffff';
  const spMuted = 'rgba(255,255,255,0.6)';

  const shopItems = [
    {
      icon: <Heart style={{ width: 36, height: 36, color: spRed }} strokeWidth={1.5} />,
      title: isEnglish ? 'Extra Hearts' : 'Cœurs Supplémentaires',
      desc: isEnglish ? 'Get 5 extra hearts' : 'Obtenez 5 cœurs supplémentaires',
      price: 100,
      currency: 'Gems',
      CurrencyIcon: <Gem style={{ width: 16, height: 16, color: spRed }} strokeWidth={2} />,
    },
    {
      icon: <SandbitsIcon size={36} className="" />,
      title: isEnglish ? 'Sandbits Pack' : 'Pack de Sablebits',
      desc: isEnglish ? 'Get 500 Sandbits' : 'Obtenez 500 Sablebits',
      price: 250,
      currency: 'Gems',
      CurrencyIcon: <Gem style={{ width: 16, height: 16, color: spRed }} strokeWidth={2} />,
    },
    {
      icon: <Zap style={{ width: 36, height: 36, color: spRed }} strokeWidth={1.5} />,
      title: isEnglish ? 'XP Boost' : 'Boost XP',
      desc: isEnglish ? '2× XP for 1 hour' : '2× XP pendant 1 heure',
      price: 150,
      currency: 'Sandbits',
      CurrencyIcon: <SandbitsIcon size={16} />,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: spBg, fontFamily: spFont }}>
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
              style={{ background: spSurface, border: `1px solid ${spBorder}`, padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'border-color 0.2s', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(176,0,32,0.5)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = spBorder; }}
            >
              <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(176,0,32,0.08)', border: `1px solid rgba(176,0,32,0.2)` }}>
                {item.icon}
              </div>
              <h3 style={{ color: spText, fontFamily: spFont, fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem', marginTop: 0 }}>{item.title}</h3>
              <p style={{ color: spMuted, fontSize: '0.82rem', fontFamily: spFont, marginBottom: '1.25rem', lineHeight: 1.4 }}>{item.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(176,0,32,0.12)', border: `1px solid rgba(176,0,32,0.3)`, padding: '0.4rem 0.85rem' }}>
                {item.CurrencyIcon}
                <span style={{ color: spText, fontFamily: spFont, fontSize: '1.1rem', fontWeight: 'bold' }}>{item.price}</span>
              </div>
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
