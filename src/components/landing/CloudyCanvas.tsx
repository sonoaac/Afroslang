import { useEffect, useRef } from 'react';

// Fixed at a partly-stormy level (0 = clear, 1 = full storm)
const T = 0.5;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const SAT = Math.round(lerp(100, 30, T));
const BRI = Math.round(lerp(100, 50, T));
const S2_OP = lerp(0, 0.4, T).toFixed(2);
const S3_OP = lerp(0.1, 0.4, T).toFixed(2);
const S4_OP = lerp(0.2, 0.6, T).toFixed(2);
const S5_OP = lerp(0.2, 0.7, T).toFixed(2);

// SVG filter string — kept as HTML so attribute names stay lowercase (no JSX camelCase)
const FILTER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" style="width:0;height:0;position:absolute">
  <filter id="cloudy-bg-filter" x="-50%" y="-50%" width="200%" height="200%" style="color-interpolation-filters:sRGB">
    <feTurbulence type="fractalNoise" seed="462" baseFrequency="0.011" numOctaves="5" result="noise1"/>
    <feTurbulence type="fractalNoise" seed="462" baseFrequency="0.011" numOctaves="2" result="noise2"/>
    <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur1"/>
    <feDisplacementMap in="blur1" scale="100" in2="noise1" result="cloud1"/>
    <feFlood flood-color="rgb(215,215,215)" flood-opacity="${S2_OP}" result="s2f"/>
    <feComposite operator="in" in="s2f" in2="SourceGraphic" result="s2c"/>
    <feOffset in="s2c" dx="-10" dy="-3" result="s2o"/>
    <feMorphology in="s2o" radius="20" result="s2m"/>
    <feGaussianBlur in="s2m" stdDeviation="20" result="s2b"/>
    <feDisplacementMap in="s2b" scale="100" in2="noise1" result="cloud2"/>
    <feFlood flood-color="rgb(66,105,146)" flood-opacity="${S3_OP}" result="s3f"/>
    <feComposite operator="in" in="s3f" in2="SourceGraphic" result="s3c"/>
    <feOffset in="s3c" dx="-10" dy="40" result="s3o"/>
    <feMorphology in="s3o" radius="0 40" result="s3m"/>
    <feGaussianBlur in="s3m" stdDeviation="20" result="s3b"/>
    <feDisplacementMap in="s3b" scale="80" in2="noise2" result="cloud3"/>
    <feFlood flood-color="rgb(0,0,0)" flood-opacity="${S4_OP}" result="s4f"/>
    <feComposite operator="in" in="s4f" in2="SourceGraphic" result="s4c"/>
    <feOffset in="s4c" dx="20" dy="60" result="s4o"/>
    <feMorphology in="s4o" radius="0 65" result="s4m"/>
    <feGaussianBlur in="s4m" stdDeviation="30" result="s4b"/>
    <feDisplacementMap in="s4b" scale="100" in2="noise2" result="cloud4"/>
    <feFlood flood-color="rgb(0,0,0)" flood-opacity="${S5_OP}" result="s5f"/>
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

interface CloudyCanvasProps {
  preview?: boolean;
}

export function CloudyCanvas({ preview = false }: CloudyCanvasProps) {
  const lightningRef = useRef<HTMLDivElement>(null);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function flash() {
      const el = lightningRef.current;
      if (!el) return;
      el.style.setProperty('--lx', `${(Math.random() - 0.5) * 260}px`);
      el.style.setProperty('--ly', `${Math.random() * 70}px`);
      el.classList.remove('cloudy-flash');
      void el.offsetWidth; // force reflow so animation restarts
      el.classList.add('cloudy-flash');
    }

    function schedule() {
      timerRef.current = setTimeout(() => { flash(); schedule(); }, 1800 + Math.random() * 4500);
    }

    schedule();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const outerStyle: React.CSSProperties = {
    position: preview ? 'absolute' : 'fixed',
    inset: 0,
    overflow: 'hidden',
    zIndex: preview ? undefined : 0,
    pointerEvents: 'none',
    width: preview ? '100%' : '100vw',
    height: preview ? '100%' : '100vh',
  };

  return (
    <div style={outerStyle}>
      <style>{`
        @keyframes cloudy-lg-anim { 0%{opacity:0.85} 15%,100%{opacity:0} }
        .cloudy-flash { animation: cloudy-lg-anim 0.8s ease-out forwards; }
      `}</style>

      {/* SVG filter definition */}
      <div dangerouslySetInnerHTML={{ __html: FILTER_SVG }} />

      {/* Sky gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(0deg, #62a0d8 0%, #2178d1 50%, #085cb3 100%)',
        filter: `saturate(${SAT}%) brightness(${BRI}%)`,
      }} />

      {/* Cloud shape (white ellipse → morphed by SVG filter into a cloud) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        filter: 'url(#cloudy-bg-filter)',
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
