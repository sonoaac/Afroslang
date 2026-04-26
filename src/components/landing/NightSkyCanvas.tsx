import { useEffect, useRef } from 'react';

const STAR_COUNT = 80;
const DRIFT_SPEED = 0.007; // % per frame — slow upward drift

interface NightSkyCanvasProps {
  preview?: boolean;
}

export function NightSkyCanvas({ preview = false }: NightSkyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Inject twinkle keyframes once
    const styleId = 'night-sky-kf';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes night-twinkle {
          0%,100% { opacity: 0.3; transform: scale(0.8); }
          50%      { opacity: 1;   transform: scale(1.2); }
        }
      `;
      document.head.appendChild(style);
    }

    const stars: Array<{ el: HTMLDivElement; posY: number; speed: number }> = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      const s        = document.createElement('div');
      const x        = Math.random() * 100;
      const y        = Math.random() * 100;
      const isStatic = Math.random() < 0.3;
      const speed    = isStatic ? 0 : 0.2 + Math.random() * 0.6;
      const size     = isStatic ? 1 + Math.random() : 1 + Math.random() * 2;
      const duration = (2 + Math.random() * 4).toFixed(1);
      const delay    = (Math.random() * 5).toFixed(1);

      s.style.cssText = `
        position:absolute;
        background:white;
        border-radius:50%;
        opacity:0.8;
        left:${x}%;
        top:${y}%;
        width:${size}px;
        height:${size}px;
        animation:night-twinkle ${duration}s ${delay}s infinite ease-in-out;
        will-change:transform,opacity;
      `;

      container.appendChild(s);
      stars.push({ el: s, posY: y, speed });
    }

    function tick() {
      stars.forEach(star => {
        if (star.speed === 0) return;
        star.posY = (star.posY - DRIFT_SPEED * star.speed) % 100;
        if (star.posY < 0) star.posY += 100;
        star.el.style.top = star.posY + '%';
      });
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.innerHTML = '';
    };
  }, []);

  const outerStyle: React.CSSProperties = {
    position:      preview ? 'absolute' : 'fixed',
    inset:         0,
    overflow:      'hidden',
    zIndex:        preview ? undefined : 0,
    pointerEvents: 'none',
    width:         preview ? '100%' : '100vw',
    height:        preview ? '100%' : '100vh',
  };

  return (
    <div style={outerStyle}>
      {/* Dark sky with purple + cyan radial glows */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(1200px 800px at 80% 10%, rgba(124,58,237,0.25), transparent 60%),
          radial-gradient(1000px 700px at 10% 90%, rgba(6,182,212,0.22), transparent 55%),
          #0b0f14
        `,
      }} />

      {/* Star field */}
      <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />
    </div>
  );
}
