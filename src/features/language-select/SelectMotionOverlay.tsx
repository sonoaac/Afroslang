import { useEffect, useMemo, useState } from 'react';

import './SelectMotionOverlay.css';

const PALETTE = [
  // 3 reds
  '#7A0C0C',
  '#B11226',
  '#E11D48',
  // 3 blacks
  '#050308',
  '#0B0710',
  '#12050A',
  // 2 greens
  '#10B981',
  '#22C55E',
] as const;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

type SelectMotionOverlayProps = {
  open: boolean;
  title?: string;
  logoSrc?: string;
};

export function SelectMotionOverlay({ open, title = 'Loading…', logoSrc = '/afrolingologo.png' }: SelectMotionOverlayProps) {
  const [showLogo, setShowLogo] = useState(false);
  const [logoFallback, setLogoFallback] = useState(false);

  const dots = useMemo(() => {
    const radius = 92;
    const count = PALETTE.length;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const dx = Math.cos(angle) * radius;
      const dy = Math.sin(angle) * radius;
      return { dx, dy, color: PALETTE[i] };
    });
  }, []);

  const waves = useMemo(() => {
    const qxs = [36, 42, 48, 52, 58, 63, 45, 55];
    const qys = [160, 145, 175, 150, 170, 155, 165, 148];
    return PALETTE.map((color, i) => ({
      color,
      qx: qxs[i] ?? 50,
      qy: qys[i] ?? 160,
      delayMs: i * 70,
    }));
  }, []);

  useEffect(() => {
    if (!open) {
      setShowLogo(false);
      setLogoFallback(false);
      return;
    }

    if (prefersReducedMotion()) {
      setShowLogo(true);
      return;
    }

    const t = window.setTimeout(() => setShowLogo(true), 700);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!open) return null;

  return (
    <div className="afroSelectOverlay" role="status" aria-live="polite" aria-label={title}>
      <div className="afroSelectBackdrop" />

      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="afroSelectWaves" aria-hidden="true">
        {waves.map((w, i) => (
          <path
            key={i}
            className="afroSelectWave"
            style={{
              ['--wave-fill' as any]: w.color,
              ['--wave-delay' as any]: `${w.delayMs}ms`,
            }}
            d={`M0 0 H100 V100 Q${w.qx} ${w.qy} 0 100 L0 0`}
          />
        ))}
      </svg>

      <div className="afroSelectCenterWrap">
        <div
          className="afroSelectCenter"
          style={{
            ['--mix' as any]: `conic-gradient(${PALETTE.join(', ')})`,
          }}
        >
          <div className="afroSelectCenterInner" data-logo={showLogo ? '1' : '0'}>
            {showLogo && (
              <img
                className="afroSelectLogo"
                src={logoFallback ? '/afroslang-logo.png' : logoSrc}
                alt="Afroslang"
                onError={() => setLogoFallback(true)}
              />
            )}
          </div>
        </div>

        <div className="afroSelectDots" aria-hidden="true">
          {dots.map((d, i) => (
            <span
              key={i}
              className="afroSelectDot"
              style={{
                ['--dx' as any]: `${d.dx}px`,
                ['--dy' as any]: `${d.dy}px`,
                ['--dot' as any]: d.color,
                ['--dot-delay' as any]: `${i * 55}ms`,
              }}
            />
          ))}
        </div>

        <div className="afroSelectLabel">{title}</div>
      </div>
    </div>
  );
}
