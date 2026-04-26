import { useEffect, useRef } from 'react';

const STAR_COUNT = 80;
const DRIFT_SPEED = 0.007;

// Full-storm cloud filter (T=1.0) — dark heavy shadows, same chain as CloudyCanvas night mode
const CLOUD_FILTER = `<svg xmlns="http://www.w3.org/2000/svg" style="width:0;height:0;position:absolute">
  <filter id="ns-cloud-filter" x="-50%" y="-50%" width="200%" height="200%" style="color-interpolation-filters:sRGB">
    <feTurbulence type="fractalNoise" seed="462" baseFrequency="0.011" numOctaves="5" result="noise1"/>
    <feTurbulence type="fractalNoise" seed="462" baseFrequency="0.011" numOctaves="2" result="noise2"/>
    <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur1"/>
    <feDisplacementMap in="blur1" scale="100" in2="noise1" result="cloud1"/>
    <feFlood flood-color="rgb(215,215,215)" flood-opacity="0.40" result="s2f"/>
    <feComposite operator="in" in="s2f" in2="SourceGraphic" result="s2c"/>
    <feOffset in="s2c" dx="-10" dy="-3" result="s2o"/>
    <feMorphology in="s2o" radius="20" result="s2m"/>
    <feGaussianBlur in="s2m" stdDeviation="20" result="s2b"/>
    <feDisplacementMap in="s2b" scale="100" in2="noise1" result="cloud2"/>
    <feFlood flood-color="rgb(66,105,146)" flood-opacity="0.40" result="s3f"/>
    <feComposite operator="in" in="s3f" in2="SourceGraphic" result="s3c"/>
    <feOffset in="s3c" dx="-10" dy="40" result="s3o"/>
    <feMorphology in="s3o" radius="0 40" result="s3m"/>
    <feGaussianBlur in="s3m" stdDeviation="20" result="s3b"/>
    <feDisplacementMap in="s3b" scale="80" in2="noise2" result="cloud3"/>
    <feFlood flood-color="rgb(0,0,0)" flood-opacity="0.60" result="s4f"/>
    <feComposite operator="in" in="s4f" in2="SourceGraphic" result="s4c"/>
    <feOffset in="s4c" dx="20" dy="60" result="s4o"/>
    <feMorphology in="s4o" radius="0 65" result="s4m"/>
    <feGaussianBlur in="s4m" stdDeviation="30" result="s4b"/>
    <feDisplacementMap in="s4b" scale="100" in2="noise2" result="cloud4"/>
    <feFlood flood-color="rgb(0,0,0)" flood-opacity="0.70" result="s5f"/>
    <feComposite operator="in" in="s5f" in2="SourceGraphic" result="s5c"/>
    <feOffset in="s5c" dx="20" dy="70" result="s5o"/>
    <feMorphology in="s5o" radius="0 200" result="s5m"/>
    <feGaussianBlur in="s5m" stdDeviation="30" result="s5b"/>
    <feDisplacementMap in="s5b" scale="100" in2="noise2" result="cloud5"/>
    <feMerge>
      <feMergeNode in="cloud1"/>
      <feMergeNode in="cloud2"/>
      <feMergeNode in="cloud3"/>
      <feMergeNode in="cloud4"/>
      <feMergeNode in="cloud5"/>
    </feMerge>
  </filter>
</svg>`;

interface NightSkyCanvasProps {
  preview?: boolean;
}

export function NightSkyCanvas({ preview = false }: NightSkyCanvasProps) {
  const starContainerRef = useRef<HTMLDivElement>(null);
  const lightningRef     = useRef<HTMLDivElement>(null);
  const rafRef           = useRef<number>(0);
  const timerRef         = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stars
  useEffect(() => {
    const container = starContainerRef.current;
    if (!container) return;

    const styleId = 'night-sky-kf';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes night-twinkle {
          0%,100% { opacity: 0.3; transform: scale(0.8); }
          50%      { opacity: 1;   transform: scale(1.2); }
        }
        @keyframes ns-lg-anim { 0%{opacity:0.9} 15%,100%{opacity:0} }
        .ns-flash { animation: ns-lg-anim 0.8s ease-out forwards; }
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
        position:absolute;background:white;border-radius:50%;opacity:0.8;
        left:${x}%;top:${y}%;width:${size}px;height:${size}px;
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

  // Lightning — rapid bursts (full storm mode)
  useEffect(() => {
    function flash() {
      const el = lightningRef.current;
      if (!el) return;
      el.style.setProperty('--lx', `${(Math.random() - 0.5) * 260}px`);
      el.style.setProperty('--ly', `${Math.random() * 70}px`);
      el.classList.remove('ns-flash');
      void el.offsetWidth;
      el.classList.add('ns-flash');
    }
    function schedule() {
      timerRef.current = setTimeout(() => { flash(); schedule(); }, 300 + Math.random() * 1200);
    }
    schedule();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
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
      {/* SVG cloud filter */}
      <div dangerouslySetInnerHTML={{ __html: CLOUD_FILTER }} />

      {/* Dark sky */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(1200px 800px at 80% 10%, rgba(124,58,237,0.25), transparent 60%),
          radial-gradient(1000px 700px at 10% 90%, rgba(6,182,212,0.22), transparent 55%),
          #0b0f14
        `,
      }} />

      {/* Stars behind cloud */}
      <div ref={starContainerRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

      {/* Dark storm cloud — centered, on top of stars */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        filter: 'url(#ns-cloud-filter)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width:        preview ? '62%' : 680,
          height:       preview ? '36%' : 280,
          background:   '#fff',
          borderRadius: '50%',
          flexShrink:   0,
        }} />
      </div>

      {/* Lightning glow */}
      <div
        ref={lightningRef}
        style={{
          position:     'absolute',
          zIndex:       3,
          top:          '50%',
          left:         '50%',
          transform:    'translate(calc(-50% + var(--lx,0px)), calc(-50% + var(--ly,0px)))',
          width:        '33%',
          height:       '33%',
          borderRadius: '50%',
          background:   'radial-gradient(closest-side, white, rgba(255,255,255,0))',
          opacity:      0,
          mixBlendMode: 'overlay' as const,
          filter:       'blur(50px)',
        }}
      />
    </div>
  );
}
