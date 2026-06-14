import React, { useEffect, useState } from 'react';

interface PrivacyPageProps {
  onBack: () => void;
}

// Fixed droplet data — stable across renders (no random at call time)
const DROPLETS: { x: number; y: number; size: number; delay: number; dur: number }[] = [
  { x: 8,  y: 12, size: 180, delay: 0.85, dur: 0.9 },
  { x: 78, y: 7,  size: 100, delay: 1.05, dur: 0.7 },
  { x: 50, y: 22, size: 260, delay: 1.20, dur: 1.1 },
  { x: 92, y: 38, size: 80,  delay: 0.95, dur: 0.65 },
  { x: 20, y: 45, size: 140, delay: 1.35, dur: 0.8 },
  { x: 65, y: 55, size: 200, delay: 1.10, dur: 1.0 },
  { x: 38, y: 68, size: 120, delay: 1.50, dur: 0.75 },
  { x: 85, y: 72, size: 90,  delay: 1.25, dur: 0.7 },
  { x: 12, y: 80, size: 210, delay: 1.40, dur: 0.95 },
  { x: 55, y: 88, size: 160, delay: 1.60, dur: 0.85 },
  { x: 30, y: 95, size: 70,  delay: 1.70, dur: 0.6 },
  { x: 72, y: 92, size: 130, delay: 1.45, dur: 0.8 },
  { x: 4,  y: 60, size: 95,  delay: 1.15, dur: 0.72 },
  { x: 95, y: 18, size: 150, delay: 1.30, dur: 0.88 },
  { x: 44, y: 40, size: 220, delay: 1.55, dur: 1.0 },
];

// App's default dark gradient — matches getBackgroundStyle('bg_default')
const APP_BG = 'radial-gradient(1200px 600px at 25% 20%, rgba(176,0,32,0.35) 0%, rgba(0,0,0,0) 60%), linear-gradient(135deg,#000000 0%,#120007 55%,#000000 100%)';

const TRENCH = "'Trench Slab', sans-serif";

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  // phase: 'preview' → brief hold on dark zoomed-in bg
  //        'zoom-out' → scale back while white fades in
  //        'white'    → full white, droplets + content appear
  const [phase, setPhase] = useState<'preview' | 'zoom-out' | 'white'>('preview');
  const [contentIn, setContentIn] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('zoom-out'), 380);
    const t2 = setTimeout(() => setPhase('white'),    980);
    const t3 = setTimeout(() => setContentIn(true),  1080);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{
      position: 'relative',
      minHeight: '100dvh',
      overflow: 'hidden',
      background: phase === 'white' ? '#ffffff' : '#000',
      transition: 'background 0.55s ease',
      fontFamily: TRENCH,
    }}>

      {/* ── Injected keyframes ── */}
      <style>{`
        @keyframes dropIn {
          from { transform: translate(-50%,-50%) scale(0); opacity: 0; }
          60%  { opacity: 1; }
          to   { transform: translate(-50%,-50%) scale(1); opacity: 0.85; }
        }
        @keyframes ppSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ppBackBtn {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .pp-section-card {
          background: #0a0a0a;
          border-left: 3px solid #b00020;
          padding: clamp(1rem, 4vw, 1.5rem) clamp(1rem, 4vw, 1.75rem);
          margin-bottom: 1rem;
          animation: ppSlideUp 0.5s ease both;
        }
        .pp-section-title {
          font-family: 'Trench Slab', sans-serif;
          font-size: clamp(0.75rem, 2.5vw, 0.85rem);
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin: 0 0 0.6rem;
        }
        .pp-section-body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(0.82rem, 2.5vw, 0.9rem);
          color: rgba(255,255,255,0.82);
          line-height: 1.75;
          margin: 0;
        }
        .pp-section-body ul {
          padding-left: 1.25rem;
          margin: 0.4rem 0 0;
        }
        .pp-section-body li { margin-bottom: 0.25rem; }
        .pp-section-body strong { color: #ffffff; font-weight: 700; }
        .pp-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #0a0a0a;
          border: none;
          color: rgba(255,255,255,0.75);
          font-family: 'Trench Slab', sans-serif;
          font-size: clamp(0.78rem, 2.5vw, 0.88rem);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.65rem 1.25rem;
          cursor: pointer;
          min-height: 44px;
          transition: background 0.18s, color 0.18s;
          animation: ppBackBtn 0.45s ease 1.1s both;
        }
        .pp-back-btn:hover { background: #1a1a1a; color: #fff; }
        .pp-back-btn:active { background: #222; }
        @media (max-width: 400px) {
          .pp-section-card { margin-bottom: 0.75rem; }
        }
      `}</style>

      {/* ── Dark bg layer — zooms in then out while fading ── */}
      <div style={{
        position: 'fixed',
        inset: '-8%',
        background: APP_BG,
        transition: phase === 'zoom-out'
          ? 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.55s ease'
          : 'none',
        transform: phase === 'preview' ? 'scale(1.22)' : 'scale(1.0)',
        opacity: phase === 'white' ? 0 : 1,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* ── White droplets (only render after white phase starts) ── */}
      {phase === 'white' && DROPLETS.map((d, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,0,0,0.055) 0%, rgba(0,0,0,0.018) 60%, transparent 100%)',
            transform: 'translate(-50%,-50%)',
            animation: `dropIn ${d.dur}s cubic-bezier(0.34,1.56,0.64,1) ${d.delay}s both`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      ))}

      {/* ── Page content — slides up after white phase ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: 680,
        margin: '0 auto',
        padding: 'clamp(1.25rem, 5vw, 2rem) clamp(1rem, 4vw, 1.75rem) 4rem',
        transition: 'opacity 0.45s ease, transform 0.45s ease',
        opacity: contentIn ? 1 : 0,
        transform: contentIn ? 'translateY(0)' : 'translateY(14px)',
      }}>

        {/* Back button */}
        <button className="pp-back-btn" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>

        {/* Title block */}
        <div style={{
          margin: 'clamp(1.25rem, 4vw, 2rem) 0 clamp(1.5rem, 5vw, 2.5rem)',
          animationDelay: '1.15s',
          animation: 'ppSlideUp 0.5s ease 1.15s both',
        }}>
          {/* PRIVACY — Trench Slab white with black stroke, matching lp-brand */}
          <h1 style={{
            fontFamily: TRENCH,
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 10vw, 4.5rem)',
            lineHeight: 1,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            margin: 0,
            color: '#ffffff',
            WebkitTextStroke: '2px #000000',
            paintOrder: 'stroke fill',
            textShadow: '1px 1px 0 #000, 2px 2px 0 #111',
          }}>
            PRIVACY
          </h1>
          {/* POLICY — inverted, black with white stroke */}
          <h1 style={{
            fontFamily: TRENCH,
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 10vw, 4.5rem)',
            lineHeight: 1,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            margin: '0 0 clamp(0.5rem, 2vw, 0.75rem)',
            color: '#000000',
            WebkitTextStroke: '2px #ffffff',
            paintOrder: 'stroke fill',
          }}>
            {'& TERMS'}
          </h1>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(0.75rem, 2.5vw, 0.82rem)',
            color: 'rgba(0,0,0,0.45)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            Last updated June 2025 · com.afroslang.app
          </p>
        </div>

        {/* Section cards */}
        {SECTIONS.map((sec, i) => (
          <div
            key={sec.title}
            className="pp-section-card"
            style={{ animationDelay: `${1.2 + i * 0.07}s` }}
          >
            <p className="pp-section-title">{sec.title}</p>
            <div className="pp-section-body" dangerouslySetInnerHTML={{ __html: sec.html }} />
          </div>
        ))}

        {/* Footer */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(0,0,0,0.1)',
          animation: `ppSlideUp 0.5s ease ${1.2 + SECTIONS.length * 0.07 + 0.1}s both`,
        }}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(0.72rem, 2vw, 0.78rem)',
            color: 'rgba(0,0,0,0.35)',
            letterSpacing: '0.04em',
            margin: 0,
          }}>
            © 2025 Afroslang · Ahamefuna Team · support@afroslang.com
          </p>
        </div>

      </div>
    </div>
  );
};

// ── Section data ─────────────────────────────────────────────────────────────
const SECTIONS: { title: string; html: string }[] = [
  {
    title: '01 — Information We Collect',
    html: `<ul>
      <li><strong>Account data</strong> — email address, username</li>
      <li><strong>Learning data</strong> — lesson progress, XP, streaks, language preferences</li>
      <li><strong>Purchase data</strong> — subscription status, diamond balance, owned cosmetics (no raw card data stored on our servers)</li>
      <li><strong>Device data</strong> — platform type (iOS / Android / web)</li>
    </ul>`,
  },
  {
    title: '02 — How We Use It',
    html: `<ul>
      <li>Provide and improve the Afroslang learning service</li>
      <li>Sync your progress across devices when signed in</li>
      <li>Process payments and manage subscriptions</li>
      <li>Display leaderboard rankings (username and XP only)</li>
      <li>Send transactional emails (verification, password reset)</li>
    </ul>`,
  },
  {
    title: '03 — Data Storage & Security',
    html: `Your account and learning data is stored securely in <strong>Supabase</strong> (PostgreSQL). Web payments are processed by <strong>Stripe</strong>. In-app purchases on mobile go through <strong>Apple App Store</strong> or <strong>Google Play</strong>, managed via <strong>RevenueCat</strong>. We never store raw credit card numbers.`,
  },
  {
    title: '04 — Third-Party Services',
    html: `<ul>
      <li><strong>Supabase</strong> — database & authentication</li>
      <li><strong>Stripe</strong> — web payment processing</li>
      <li><strong>Apple App Store / Google Play</strong> — in-app purchase billing</li>
      <li><strong>RevenueCat</strong> — mobile subscription management</li>
      <li><strong>Firebase / Google</strong> — payment webhook processing</li>
    </ul>`,
  },
  {
    title: '05 — Local Storage & Cookies',
    html: `Afroslang uses browser <strong>localStorage</strong> to cache your language preferences and lesson progress on your device. We do not use third-party tracking cookies. On the web version, Google AdSense may serve contextual ads to free-tier users.`,
  },
  {
    title: '06 — Children\'s Privacy',
    html: `Afroslang is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us personal data, contact us and we will delete it promptly.`,
  },
  {
    title: '07 — Data Retention & Deletion',
    html: `We retain your data for as long as your account is active. To request deletion of your account and all associated data, email <strong>support@afroslang.com</strong>. We process deletion requests within 30 days.`,
  },
  {
    title: '08 — Your Rights',
    html: `<ul>
      <li>Access the personal data we hold about you</li>
      <li>Correct inaccurate data</li>
      <li>Request deletion ("right to be forgotten")</li>
      <li>Object to or restrict processing of your data</li>
      <li>Data portability</li>
    </ul>
    To exercise any right, email <strong>support@afroslang.com</strong>.`,
  },
  {
    title: '09 — Terms of Service',
    html: `<ul>
      <li>You must be at least 13 years old to create an account</li>
      <li>You are responsible for the security of your credentials</li>
      <li>Subscriptions auto-renew unless cancelled before the renewal date — cancel anytime via App Store, Google Play, or account settings</li>
      <li>All in-app purchases are final. Refunds are subject to Apple, Google, or Stripe policies</li>
      <li>We reserve the right to suspend accounts that violate these terms</li>
      <li>The app is provided "as is" with no warranty of uninterrupted or error-free service</li>
    </ul>`,
  },
  {
    title: '10 — Changes to This Policy',
    html: `We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the date above. Continued use after changes constitutes acceptance.`,
  },
  {
    title: '11 — Contact',
    html: `For privacy concerns, data requests, or general inquiries: <strong>support@afroslang.com</strong>`,
  },
];
