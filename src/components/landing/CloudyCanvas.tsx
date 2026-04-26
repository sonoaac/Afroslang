import { useEffect, useRef } from 'react';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function buildFilter(id: string, t: number) {
  const s2 = lerp(0,   0.4, t).toFixed(2);
  const s3 = lerp(0.1, 0.4, t).toFixed(2);
  const s4 = lerp(0.2, 0.6, t).toFixed(2);
  const s5 = lerp(0.2, 0.7, t).toFixed(2);
  return `<svg xmlns="http://www.w3.org/2000/svg" style="width:0;height:0;position:absolute">
  <filter id="${id}" x="-50%" y="-50%" width="200%" height="200%" style="color-interpolation-filters:sRGB">
    <feTurbulence type="fractalNoise" seed="462" baseFrequency="0.011" numOctaves="5" result="noise1"/>
    <feTurbulence type="fractalNoise" seed="462" baseFrequency="0.011" numOctaves="2" result="noise2"/>
    <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur1"/>
    <feDisplacementMap in="blur1" scale="100" in2="noise1" result="cloud1"/>
    <feFlood flood-color="rgb(215,215,215)" flood-opacity="${s2}" result="s2f"/>
    <feComposite operator="in" in="s2f" in2="SourceGraphic" result="s2c"/>
    <feOffset in="s2c" dx="-10" dy="-3" result="s2o"/>
    <feMorphology in="s2o" radius="20" result="s2m"/>
    <feGaussianBlur in="s2m" stdDeviation="20" result="s2b"/>
    <feDisplacementMap in="s2b" scale="100" in2="noise1" result="cloud2"/>
    <feFlood flood-color="rgb(66,105,146)" flood-opacity="${s3}" result="s3f"/>
    <feComposite operator="in" in="s3f" in2="SourceGraphic" result="s3c"/>
    <feOffset in="s3c" dx="-10" dy="40" result="s3o"/>
    <feMorphology in="s3o" radius="0 40" result="s3m"/>
    <feGaussianBlur in="s3m" stdDeviation="20" result="s3b"/>
    <feDisplacementMap in="s3b" scale="80" in2="noise2" result="cloud3"/>
    <feFlood flood-color="rgb(0,0,0)" flood-opacity="${s4}" result="s4f"/>
    <feComposite operator="in" in="s4f" in2="SourceGraphic" result="s4c"/>
    <feOffset in="s4c" dx="20" dy="60" result="s4o"/>
    <feMorphology in="s4o" radius="0 65" result="s4m"/>
    <feGaussianBlur in="s4m" stdDeviation="30" result="s4b"/>
    <feDisplacementMap in="s4b" scale="100" in2="noise2" result="cloud4"/>
    <feFlood flood-color="rgb(0,0,0)" flood-opacity="${s5}" result="s5f"/>
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
}

// day  → T=0.5, blue sky, lightning every ~4 s
// night → T=1.0, near-black sky, rapid lightning every ~1.5 s
const VARIANTS = {
  day: {
    filterId:  'cloudy-bg-filter-day',
    filterSvg: buildFilter('cloudy-bg-filter-day', 0.5),
    sat:       Math.round(lerp(100, 30, 0.5)),
    bri:       Math.round(lerp(100, 50, 0.5)),
    sky:       'linear-gradient(0deg, #62a0d8 0%, #2178d1 50%, #085cb3 100%)',
    minDelay:  1800,
    extraDelay: 4500,
  },
  night: {
    filterId:  'cloudy-bg-filter-night',
    filterSvg: buildFilter('cloudy-bg-filter-night', 1.0),
    sat:       Math.round(lerp(100, 30, 1.0)),
    bri:       Math.round(lerp(100, 50, 1.0)),
    sky:       'linear-gradient(0deg, #000000 0%, #03060f 50%, #060c18 100%)',
    minDelay:  300,
    extraDelay: 1200,
  },
} as const;

export interface CloudyCanvasProps {
  preview?: boolean;
  variant?: 'day' | 'night';
}

export function CloudyCanvas({ preview = false, variant = 'day' }: CloudyCanvasProps) {
  const cfg = VARIANTS[variant];
  const lightningRef = useRef<HTMLDivElement>(null);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function flash() {
      const el = lightningRef.current;
      if (!el) return;
      el.style.setProperty('--lx', `${(Math.random() - 0.5) * 260}px`);
      el.style.setProperty('--ly', `${Math.random() * 70}px`);
      el.classList.remove('cloudy-flash');
      void el.offsetWidth;
      el.classList.add('cloudy-flash');
    }

    function schedule() {
      timerRef.current = setTimeout(
        () => { flash(); schedule(); },
        cfg.minDelay + Math.random() * cfg.extraDelay,
      );
    }

    schedule();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [cfg.minDelay, cfg.extraDelay]);

  const outerStyle: React.CSSProperties = {
    position:     preview ? 'absolute' : 'fixed',
    inset:        0,
    overflow:     'hidden',
    zIndex:       preview ? undefined : 0,
    pointerEvents: 'none',
    width:        preview ? '100%' : '100vw',
    height:       preview ? '100%' : '100vh',
  };

  return (
    <div style={outerStyle}>
      <style>{`
        @keyframes cloudy-lg-anim { 0%{opacity:0.9} 15%,100%{opacity:0} }
        .cloudy-flash { animation: cloudy-lg-anim 0.8s ease-out forwards; }
      `}</style>

      <div dangerouslySetInnerHTML={{ __html: cfg.filterSvg }} />

      {/* Sky */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: cfg.sky,
        filter: `saturate(${cfg.sat}%) brightness(${cfg.bri}%)`,
      }} />

      {/* Cloud shape morphed by SVG filter */}
      <div style={{
        position: 'absolute',
        inset: 0,
        filter: `url(#${cfg.filterId})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
