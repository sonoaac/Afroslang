import { useEffect, useRef, useMemo, useState } from 'react';

const ISO3_TO_ISO2: Record<string, string> = {
  DZA:'DZ', AGO:'AO', BEN:'BJ', BWA:'BW', BFA:'BF', BDI:'BI', CPV:'CV',
  CMR:'CM', CAF:'CF', TCD:'TD', COM:'KM', COD:'CD', COG:'CG', DJI:'DJ',
  EGY:'EG', GNQ:'GQ', ERI:'ER', SWZ:'SZ', ETH:'ET', GAB:'GA', GMB:'GM',
  GHA:'GH', GIN:'GN', GNB:'GW', CIV:'CI', KEN:'KE', LSO:'LS', LBR:'LR',
  LBY:'LY', MDG:'MG', MWI:'MW', MLI:'ML', MRT:'MR', MUS:'MU', MAR:'MA',
  MOZ:'MZ', NAM:'NA', NER:'NE', NGA:'NG', RWA:'RW', STP:'ST', SEN:'SN',
  SYC:'SC', SLE:'SL', SOM:'SO', ZAF:'ZA', SSD:'SS', SDS:'SS', SDN:'SD', TZA:'TZ',
  TGO:'TG', TUN:'TN', UGA:'UG', ESH:'EH', ZMB:'ZM', ZWE:'ZW',
};

const GEO_ISO_ALIAS: Record<string, string> = {
  SDS: 'SSD',
};

const COUNTRY_NAMES: Record<string, string> = {
  DZA:'Algeria', AGO:'Angola', BEN:'Benin', BWA:'Botswana', BFA:'Burkina Faso',
  BDI:'Burundi', CPV:'Cape Verde', CMR:'Cameroon', CAF:'Cent. African Rep.', TCD:'Chad',
  COM:'Comoros', COD:'DR Congo', COG:'Rep. of Congo', DJI:'Djibouti', EGY:'Egypt',
  GNQ:'Eq. Guinea', ERI:'Eritrea', SWZ:'Eswatini', ETH:'Ethiopia', GAB:'Gabon',
  GMB:'Gambia', GHA:'Ghana', GIN:'Guinea', GNB:'Guinea-Bissau', CIV:"Côte d'Ivoire",
  KEN:'Kenya', LSO:'Lesotho', LBR:'Liberia', LBY:'Libya', MDG:'Madagascar',
  MWI:'Malawi', MLI:'Mali', MRT:'Mauritania', MUS:'Mauritius', MAR:'Morocco',
  MOZ:'Mozambique', NAM:'Namibia', NER:'Niger', NGA:'Nigeria', RWA:'Rwanda',
  STP:'São Tomé', SEN:'Senegal', SYC:'Seychelles', SLE:'Sierra Leone',
  SOM:'Somalia', ZAF:'South Africa', SSD:'South Sudan', SDN:'Sudan',
  TZA:'Tanzania', TGO:'Togo', TUN:'Tunisia', UGA:'Uganda', ESH:'W. Sahara',
  ZMB:'Zambia', ZWE:'Zimbabwe',
};

// Primary flag colors per country (ISO3 → [color1, color2, color3?])
const FLAG_COLORS: Record<string, string[]> = {
  DZA: ['#006233', '#FFFFFF'],
  AGO: ['#CC0000', '#000000', '#FFCC00'],
  BEN: ['#008751', '#FCD116', '#E8112D'],
  BWA: ['#75AADB', '#FFFFFF', '#000000'],
  BFA: ['#EF2B2D', '#009A00'],
  BDI: ['#CE1126', '#FFFFFF', '#1EB53A'],
  CPV: ['#003893', '#CF2027', '#F7D116'],
  CMR: ['#007A5E', '#CE1126', '#FCD116'],
  CAF: ['#003082', '#BC0026', '#289728', '#FFD100'],
  TCD: ['#002664', '#FECB00', '#C60C30'],
  COM: ['#3A75C4', '#009A44', '#FFFFFF'],
  COD: ['#007FFF', '#CE1126', '#F7D618'],
  COG: ['#009543', '#FBDE4A', '#DC241F'],
  DJI: ['#6AB2E7', '#12AD2B', '#D7141A'],
  EGY: ['#CE1126', '#FFFFFF', '#000000'],
  GNQ: ['#3E9A00', '#FFFFFF', '#E32118'],
  ERI: ['#4189DD', '#D52B1E', '#4CAF50'],
  SWZ: ['#3E5EB9', '#FCD116', '#CE1126'],
  ETH: ['#078930', '#FCDD09', '#DA121A'],
  GAB: ['#009E60', '#FCD116', '#003189'],
  GMB: ['#E75216', '#0C1C8C', '#3A7728'],
  GHA: ['#CE1126', '#FCD116', '#006B3F'],
  GIN: ['#CE1126', '#FCD116', '#009460'],
  GNB: ['#CE1126', '#FCD116', '#009460'],
  CIV: ['#F77F00', '#FFFFFF', '#009A44'],
  KEN: ['#000000', '#BB0000', '#006600'],
  LSO: ['#009543', '#FFFFFF', '#1B4F72'],
  LBR: ['#BF0A30', '#FFFFFF', '#003478'],
  LBY: ['#000000', '#239E46', '#D21034'],
  MDG: ['#FFFFFF', '#FC3D32', '#007E3A'],
  MWI: ['#000000', '#CE1126', '#339E35'],
  MLI: ['#14B53A', '#FCD116', '#CE1126'],
  MRT: ['#006233', '#FFD700', '#D21034'],
  MUS: ['#EA2839', '#1A206D', '#EAC102', '#00A551'],
  MAR: ['#C1272D', '#006233'],
  MOZ: ['#009A44', '#000000', '#FCE100'],
  NAM: ['#003580', '#D21034', '#009A44'],
  NER: ['#E05206', '#FFFFFF', '#189B48'],
  NGA: ['#008751', '#FFFFFF'],
  RWA: ['#20603D', '#FAD201', '#1F8ECD'],
  STP: ['#12AD2B', '#FFCD00', '#D21034'],
  SEN: ['#00853F', '#FDEF42', '#E31B23'],
  SYC: ['#003F87', '#FCD856', '#D62828', '#007A5C'],
  SLE: ['#1EB53A', '#FFFFFF', '#0072C6'],
  SOM: ['#4189DD', '#FFFFFF'],
  ZAF: ['#007A4D', '#000000', '#FFB612'],
  SSD: ['#078930', '#CE1126', '#0F47AF', '#FCD116'],
  SDN: ['#D21034', '#FFFFFF', '#000000', '#007229'],
  TZA: ['#1EB53A', '#000000', '#00A3DD', '#FCD116'],
  TGO: ['#006A4E', '#FFCE00', '#D21034'],
  TUN: ['#E70013', '#FFFFFF'],
  UGA: ['#000000', '#FCDC04', '#D90000'],
  ESH: ['#000000', '#FFFFFF', '#007A3D'],
  ZMB: ['#198A00', '#DE2010', '#EF7D00'],
  ZWE: ['#006400', '#FFD200', '#D40000'],
};

// Languages available on Afroslang per ISO2 country code
const COUNTRY_LANGUAGES: Record<string, string[]> = {
  NG: ['Hausa', 'Yoruba', 'Igbo'],
  ET: ['Amharic'],
  SO: ['Somali'],
  DJ: ['Somali'],
  EG: ['Arabic'],
  DZ: ['Arabic', 'Berber'],
  MA: ['Arabic', 'Berber'],
  TN: ['Arabic'],
  LY: ['Arabic'],
  SD: ['Arabic'],
  MR: ['Arabic'],
  TZ: ['Swahili'],
  KE: ['Swahili'],
  UG: ['Swahili'],
  RW: ['Swahili'],
  BI: ['Swahili'],
  CD: ['Swahili', 'Lingala'],
  ZA: ['Zulu'],
  GH: ['Twi'],
  BJ: ['Yoruba'],
  TG: ['Hausa'],
  NE: ['Hausa'],
  SN: ['Wolof'],
  GM: ['Wolof'],
  BF: ['Mòoré'],
  CG: ['Lingala'],
  ZW: ['Shona'],
  MW: ['Chichewa'],
  ZM: ['Chichewa'],
  SS: ['Arabic'],
};

// Country-level fun facts (ISO2)
const COUNTRY_FACTS: Record<string, string> = {
  NG: 'Home to over 500 languages — more than any other country in Africa.',
  ET: 'One of Africa\'s oldest civilizations with over 90 languages spoken.',
  EG: 'Home to the world\'s oldest writing system — hieroglyphics dating back 5,000 years.',
  TZ: 'Birthplace of Swahili, now spoken by over 200 million people.',
  KE: 'Africa\'s tech capital — Nairobi is known as the "Silicon Savannah."',
  ZA: 'Has 11 official languages, the most of any single country in the world.',
  GH: 'First sub-Saharan African country to gain independence, in 1957.',
  MA: 'Home to the world\'s oldest university, al-Qarawiyyin, founded in 859 AD.',
  DZ: 'The largest country in Africa — bigger than all of Western Europe combined.',
  CD: 'Home to the second-largest rainforest and the world\'s deepest river.',
  SN: 'Nearly all Senegalese speak Wolof as a shared language regardless of ethnicity.',
  BF: '"Land of Incorruptible Men" — Mòoré is spoken by nearly half the population.',
  ZW: 'Home to Victoria Falls, one of the Seven Natural Wonders of the World.',
  SO: 'Somali is the most widely spoken Cushitic language in Africa.',
  MW: 'Lake Malawi contains more fish species than any other lake on Earth.',
  ZM: 'Shares the spectacular Victoria Falls and has 73 spoken languages.',
  CG: 'Part of the Congo Basin, the world\'s second-largest tropical forest.',
  BJ: 'Birthplace of Vodun (Voodoo), a tradition that spread to the Americas.',
  GM: 'The smallest country in mainland Africa — almost surrounded by Senegal.',
  UG: 'Hosts over half of the world\'s remaining mountain gorillas.',
  SD: 'Sudan has more ancient pyramids than Egypt — over 200 Nubian pyramids.',
  TN: 'The northernmost country in Africa and birthplace of the Arab Spring.',
  LY: 'Libya holds the largest proven oil reserves in Africa.',
  RW: 'Rwanda has the highest percentage of female parliament members in the world.',
};

const COUNTRY_COLORS: Record<string, string[]> = {
  DZA:['#000'], AGO:['#000'], BEN:['#000'], BWA:['#000'], BFA:['#000'],
  BDI:['#000'], CPV:['#000'], CMR:['#000'], CAF:['#000'], TCD:['#000'],
  COM:['#000'], COD:['#000'], COG:['#000'], DJI:['#000'], EGY:['#000'],
  GNQ:['#000'], ERI:['#000'], SWZ:['#000'], ETH:['#000'], GAB:['#000'],
  GMB:['#000'], GHA:['#000'], GIN:['#000'], GNB:['#000'], CIV:['#000'],
  KEN:['#000'], LSO:['#000'], LBR:['#000'], LBY:['#000'], MDG:['#000'],
  MWI:['#000'], MLI:['#000'], MRT:['#000'], MUS:['#000'], MAR:['#000'],
  MOZ:['#000'], NAM:['#000'], NER:['#000'], NGA:['#000'], RWA:['#000'],
  STP:['#000'], SEN:['#000'], SYC:['#000'], SLE:['#000'], SOM:['#000'],
  ZAF:['#000'], SSD:['#000'], SDN:['#000'], TZA:['#000'], TGO:['#000'],
  TUN:['#000'], UGA:['#000'], ESH:['#000'], ZMB:['#000'], ZWE:['#000'],
};

function loadD3(): Promise<void> {
  const w = window as any;
  if (w.d3) return Promise.resolve();
  const existing = document.querySelector('script[src*="d3.v7"]');
  if (existing) {
    return new Promise(res => {
      const id = setInterval(() => { if (w.d3) { clearInterval(id); res(); } }, 40);
    });
  }
  return new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = 'https://d3js.org/d3.v7.min.js';
    s.onload = () => res();
    s.onerror = rej;
    document.head.appendChild(s);
  });
}

interface PopupData {
  iso2: string;
  iso3: string;
  name: string;
  colors: string[];
  languages: string[];
  fact: string;
}

interface AfricaMapProps {
  onCountrySelect: (iso2: string) => void;
  highlightedCodes?: Set<string>;
  unlockedCodes?: Set<string>;
}

export function AfricaMap({ onCountrySelect, highlightedCodes, unlockedCodes }: AfricaMapProps) {
  const containerRef     = useRef<HTMLDivElement>(null);
  const tooltipRef       = useRef<HTMLDivElement>(null);
  const wrapRef          = useRef<HTMLDivElement>(null);
  const onSelectRef      = useRef(onCountrySelect);
  const pathMapRef       = useRef<Map<string, any>>(new Map());
  const unlockedCodesRef = useRef<Set<string>>(new Set());

  const [popup, setPopup]       = useState<PopupData | null>(null);
  const [mapIn, setMapIn]       = useState(false);
  const popupRef                = useRef(setPopup);
  popupRef.current              = setPopup;
  onSelectRef.current           = onCountrySelect;
  unlockedCodesRef.current      = unlockedCodes ?? new Set();

  const unlockedKey = useMemo(
    () => [...(unlockedCodes ?? [])].sort().join(','),
    [unlockedCodes]
  );

  // ── Scroll-in animation ───────────────────────────────────────────────────
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setMapIn(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── Draw map (runs once) ──────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    const tooltip   = tooltipRef.current;
    if (!container || !tooltip) return;
    let cancelled = false;

    loadD3().then(async () => {
      if (cancelled) return;
      const d3 = (window as any).d3;
      const W  = container.clientWidth  || 600;
      const H  = container.clientHeight || Math.round(W * 9 / 7);

      const svg = d3.select(container)
        .append('svg')
        .attr('viewBox', `0 0 ${W} ${H}`)
        .style('width', '100%')
        .style('height', '100%')
        .style('display', 'block');

      let geoData: any;
      try {
        const r = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
        geoData = await r.json();
      } catch { return; }
      if (cancelled) return;

      const isoSet   = new Set(Object.keys(COUNTRY_COLORS));
      const features = geoData.features
        .map((f: any) => {
          const rawId = f.properties.iso_a3 || f.id;
          const iso3  = GEO_ISO_ALIAS[rawId] ?? rawId;
          return { ...f, _resolvedISO: iso3 };
        })
        .filter((f: any) => isoSet.has(f._resolvedISO));

      const proj = d3.geoMercator()
        .center([20, -1])
        .scale(Math.min(W, H) * 0.74)
        .translate([W / 2, H / 2]);

      const pathGen  = d3.geoPath().projection(proj);
      const g        = svg.append('g');
      let activeEl:     any    = null;
      let activeISO3: string | null = null;

      features.forEach((feat: any) => {
        const iso3   = feat._resolvedISO;
        const colors = COUNTRY_COLORS[iso3];
        if (!colors) return;
        const iso2 = ISO3_TO_ISO2[iso3];

        const p = g.append('path')
          .datum(feat)
          .attr('d', pathGen)
          .attr('fill', '#000000')
          .attr('stroke', 'rgba(255,255,255,0.22)')
          .attr('stroke-width', 0.5)
          .attr('opacity', 1)
          .style('cursor', iso2 ? 'pointer' : 'default');

        if (!iso2) {
          p.attr('opacity', 0.35).style('pointer-events', 'none');
          return;
        }

        pathMapRef.current.set(iso2, p);

        // ── Hover (desktop) — tooltip with full name ──
        p.on('mousemove', function(event: MouseEvent) {
            const name = COUNTRY_NAMES[iso3] ?? iso3;
            const langs = COUNTRY_LANGUAGES[iso2];
            tooltip.style.opacity  = '1';
            tooltip.style.left     = `${event.clientX + 14}px`;
            tooltip.style.top      = `${event.clientY - 52}px`;
            tooltip.innerHTML      = `
              <span style="font-weight:800;font-size:0.85rem;letter-spacing:0.05em">${name}</span>
              ${langs ? `<br/><span style="font-size:0.72rem;color:rgba(255,255,255,0.6);letter-spacing:0.04em">${langs.join(' · ')}</span>` : ''}
            `;
          })
          .on('mouseleave', function(this: SVGPathElement) {
            tooltip.style.opacity = '0';
            if (activeISO3 !== iso3) {
              d3.select(this)
                .attr('fill', '#000000')
                .attr('stroke', 'rgba(255,255,255,0.22)')
                .attr('stroke-width', 0.5);
            }
          })
          .on('mouseover', function(this: SVGPathElement) {
            if (activeISO3 === iso3) return;
            d3.select(this)
              .attr('fill', '#1a1a1a')
              .attr('stroke', 'rgba(255,255,255,0.6)')
              .attr('stroke-width', 1.2);
          })
          .on('click', function(this: SVGPathElement, event: MouseEvent) {
            // Reset previous active
            if (activeEl) {
              activeEl
                .attr('fill', '#000000')
                .attr('stroke', 'rgba(255,255,255,0.22)')
                .attr('stroke-width', 0.5);
            }
            const sel = d3.select(this);
            sel.attr('fill', '#111111')
               .attr('stroke', 'rgba(255,255,255,0.9)')
               .attr('stroke-width', 1.6);
            activeEl   = sel;
            activeISO3 = iso3;
            tooltip.style.opacity = '0';

            const isTouchOrMobile =
              ('ontouchstart' in window) ||
              (event as any).sourceCapabilities?.firesTouchEvents ||
              window.innerWidth < 768;

            if (isTouchOrMobile) {
              // Mobile: show sticky note popup
              popupRef.current({
                iso2,
                iso3,
                name: COUNTRY_NAMES[iso3] ?? iso3,
                colors: FLAG_COLORS[iso3] ?? ['#333333', '#666666'],
                languages: COUNTRY_LANGUAGES[iso2] ?? [],
                fact: COUNTRY_FACTS[iso2] ?? '',
              });
            } else {
              // Desktop: open explore panel
              onSelectRef.current(iso2);
            }
          });

        // ── Country abbreviation label (ISO2, e.g. "NG", "KE") ──
        const centroid = pathGen.centroid(feat);
        const bounds   = pathGen.bounds(feat);
        const area     = (bounds[1][0] - bounds[0][0]) * (bounds[1][1] - bounds[0][1]);
        // Only show label for countries big enough to fit text
        const showLabel = area > 900 && !isNaN(centroid[0]);

        if (showLabel) {
          const fs = area > 8000 ? 10.5 : area > 3000 ? 9 : area > 1500 ? 7.5 : 6.5;
          svg.append('text')
            .attr('x', centroid[0])
            .attr('y', centroid[1])
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('pointer-events', 'none')
            .style('font-family', "'Kalam', 'Trench Slab', sans-serif")
            .style('font-weight', '700')
            .style('font-size', `${fs}px`)
            .style('fill', 'rgba(255,255,255,0.88)')
            .style('letter-spacing', '0.08em')
            .text(iso2);
        }
      });
    });

    return () => {
      cancelled = true;
      pathMapRef.current.clear();
      const s = container.querySelector('svg');
      if (s) s.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Unlock highlight ──────────────────────────────────────────────────────
  useEffect(() => {
    const pathMap  = pathMapRef.current;
    if (!pathMap.size) return;
    const unlocked = unlockedCodesRef.current;
    pathMap.forEach((p, iso2) => {
      const isUnlocked = unlocked.has(iso2);
      p.attr('fill', isUnlocked ? '#1a1a1a' : '#000000')
       .attr('stroke', isUnlocked ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.22)');
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlockedKey]);

  // ── Search highlight ──────────────────────────────────────────────────────
  useEffect(() => {
    const pathMap  = pathMapRef.current;
    if (!pathMap.size) return;
    const unlocked = unlockedCodesRef.current;
    const hasQuery = highlightedCodes != null;
    pathMap.forEach((p, iso2) => {
      const isUnlocked = unlocked.has(iso2);
      if (!hasQuery) {
        p.attr('fill', isUnlocked ? '#1a1a1a' : '#000000')
         .attr('opacity', 1)
         .attr('stroke', isUnlocked ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.22)');
      } else if (highlightedCodes!.has(iso2)) {
        p.attr('fill', '#222222').attr('opacity', 1).attr('stroke', 'rgba(255,255,255,0.7)');
      } else {
        p.attr('fill', '#000000').attr('opacity', 0.2).attr('stroke', 'rgba(255,255,255,0.08)');
      }
    });
  }, [highlightedCodes]);

  // ── Flag color gradient for popup ─────────────────────────────────────────
  function buildFlagGradient(colors: string[]): string {
    if (colors.length === 1) return `${colors[0]}80`;
    const stops = colors.map((c, i) => {
      const pct = Math.round((i / (colors.length - 1)) * 100);
      return `${c}90 ${pct}%`;
    }).join(', ');
    return `linear-gradient(135deg, ${stops})`;
  }

  // Pick a readable text color based on first flag color luminance
  function flagTextColor(colors: string[]): string {
    const hex = colors[0].replace('#', '');
    const r   = parseInt(hex.slice(0, 2), 16);
    const g   = parseInt(hex.slice(2, 4), 16);
    const b   = parseInt(hex.slice(4, 6), 16);
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.55 ? '#0a0a0a' : '#ffffff';
  }

  return (
    <>
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes mapSlideIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes popupRise {
          from { opacity: 0; transform: translateX(-50%) translateY(24px) scale(0.95); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .am-tag {
          display: inline-flex; align-items: center;
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap;
        }
      `}</style>

      {/* ── Map wrapper — scroll-in animation ── */}
      <div
        ref={wrapRef}
        className="lp-africa-map-wrap"
        style={{
          animation: mapIn ? 'mapSlideIn 0.75s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
          opacity: mapIn ? undefined : 0,
        }}
      >
        <div ref={containerRef} className="lp-africa-map" />

        {/* Desktop hover tooltip */}
        <div
          ref={tooltipRef}
          className="lp-africa-map-tooltip"
          style={{ lineHeight: 1.4, pointerEvents: 'none' }}
        />
      </div>

      {/* ── Mobile sticky-note popup ── */}
      {popup && (
        <>
          {/* Page blur backdrop */}
          <div
            onClick={() => setPopup(null)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.48)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              zIndex: 9000,
              animation: 'backdropIn 0.25s ease',
            }}
          />

          {/* Sticky note card */}
          <div
            style={{
              position: 'fixed',
              bottom: '6%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(92vw, 360px)',
              background: buildFlagGradient(popup.colors),
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.28)',
              borderRadius: 20,
              boxShadow: '0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.22)',
              zIndex: 9001,
              animation: 'popupRise 0.38s cubic-bezier(0.34,1.56,0.64,1)',
              overflow: 'hidden',
            }}
          >
            {/* Color strip at top from flag colors */}
            <div style={{ display: 'flex', height: 5 }}>
              {popup.colors.map((c, i) => (
                <div key={i} style={{ flex: 1, background: c }} />
              ))}
            </div>

            <div style={{ padding: 'clamp(1rem, 5vw, 1.5rem)' }}>
              {/* ISO2 badge + close */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span
                  className="am-tag"
                  style={{
                    background: 'rgba(0,0,0,0.25)',
                    color: '#ffffff',
                    border: '1px solid rgba(255,255,255,0.22)',
                  }}
                >
                  {popup.iso2}
                </span>
                <button
                  onClick={() => setPopup(null)}
                  style={{
                    background: 'rgba(0,0,0,0.22)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    borderRadius: '50%',
                    width: 32, height: 32,
                    cursor: 'pointer',
                    fontSize: '1rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Country name */}
              <h2 style={{
                fontFamily: "'Kalam', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.5rem, 7vw, 2rem)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: flagTextColor(popup.colors),
                WebkitTextStroke: flagTextColor(popup.colors) === '#ffffff'
                  ? '0.5px rgba(0,0,0,0.3)'
                  : '0.5px rgba(255,255,255,0.15)',
                margin: '0 0 0.75rem',
                lineHeight: 1.05,
                textShadow: '0 2px 12px rgba(0,0,0,0.25)',
              }}>
                {popup.name}
              </h2>

              {/* Languages */}
              {popup.languages.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.85rem' }}>
                  {popup.languages.map(lang => (
                    <span
                      key={lang}
                      className="am-tag"
                      style={{
                        background: 'rgba(255,255,255,0.22)',
                        color: '#ffffff',
                        border: '1px solid rgba(255,255,255,0.3)',
                        textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                      }}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              )}

              {/* Fun fact */}
              {popup.fact && (
                <p style={{
                  fontFamily: "'Kalam', sans-serif",
                  fontSize: 'clamp(0.78rem, 3vw, 0.85rem)',
                  color: flagTextColor(popup.colors) === '#ffffff'
                    ? 'rgba(255,255,255,0.82)'
                    : 'rgba(0,0,0,0.7)',
                  lineHeight: 1.55,
                  margin: '0 0 1rem',
                }}>
                  {popup.fact}
                </p>
              )}

              {/* CTA row */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {popup.languages.length > 0 && (
                  <button
                    onClick={() => { setPopup(null); onSelectRef.current(popup.iso2); }}
                    style={{
                      flex: 1,
                      background: 'rgba(0,0,0,0.55)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.25)',
                      color: '#ffffff',
                      fontFamily: "'Kalam', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '0.7rem 1rem',
                      borderRadius: 10,
                      cursor: 'pointer',
                      minHeight: 44,
                      transition: 'background 0.15s',
                    }}
                  >
                    Explore →
                  </button>
                )}
                <button
                  onClick={() => setPopup(null)}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    fontFamily: "'Trench Slab', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '0.7rem 1rem',
                    borderRadius: 10,
                    cursor: 'pointer',
                    minHeight: 44,
                    flex: popup.languages.length > 0 ? '0 0 auto' : 1,
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
