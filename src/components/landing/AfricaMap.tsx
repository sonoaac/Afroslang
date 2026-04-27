import { useEffect, useRef, useMemo } from 'react';

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

// Remap non-standard GeoJSON IDs to correct ISO 3166-1 alpha-3 codes.
// The holtzy world.geojson uses legacy IDs for some countries (e.g. South Sudan
// appears as "SDS" with no iso_a3 property instead of the standard "SSD").
const GEO_ISO_ALIAS: Record<string, string> = {
  SDS: 'SSD', // South Sudan
};

const COUNTRY_NAMES: Record<string, string> = {
  DZA:'Algeria', AGO:'Angola', BEN:'Benin', BWA:'Botswana', BFA:'Burkina Faso',
  BDI:'Burundi', CPV:'C.Verde', CMR:'Cameroon', CAF:'C.A.R.', TCD:'Chad',
  COM:'Comoros', COD:'DR Congo', COG:'Congo', DJI:'Djibouti', EGY:'Egypt',
  GNQ:'Eq.Guinea', ERI:'Eritrea', SWZ:'Eswatini', ETH:'Ethiopia', GAB:'Gabon',
  GMB:'Gambia', GHA:'Ghana', GIN:'Guinea', GNB:'G-Bissau', CIV:"Côte d'Ivoire",
  KEN:'Kenya', LSO:'Lesotho', LBR:'Liberia', LBY:'Libya', MDG:'Madagascar',
  MWI:'Malawi', MLI:'Mali', MRT:'Mauritania', MUS:'Mauritius', MAR:'Morocco',
  MOZ:'Mozambique', NAM:'Namibia', NER:'Niger', NGA:'Nigeria', RWA:'Rwanda',
  STP:'São Tomé', SEN:'Senegal', SYC:'Seychelles', SLE:'S.Leone',
  SOM:'Somalia', ZAF:'South Africa', SSD:'S.Sudan', SDN:'Sudan',
  TZA:'Tanzania', TGO:'Togo', TUN:'Tunisia', UGA:'Uganda', ESH:'W.Sahara',
  ZMB:'Zambia', ZWE:'Zimbabwe',
};

// All countries that exist on the map (still needed for membership check)
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

interface AfricaMapProps {
  onCountrySelect: (iso2: string) => void;
  highlightedCodes?: Set<string>; // ISO-2 codes to highlight from search
  unlockedCodes?: Set<string>;    // ISO-2 codes that show flag colours; rest are greyscale
}

export function AfricaMap({ onCountrySelect, highlightedCodes, unlockedCodes }: AfricaMapProps) {
  const containerRef     = useRef<HTMLDivElement>(null);
  const tooltipRef       = useRef<HTMLDivElement>(null);
  const onSelectRef      = useRef(onCountrySelect);
  const pathMapRef       = useRef<Map<string, any>>(new Map()); // iso2 → d3 path selection
  const unlockedCodesRef = useRef<Set<string>>(new Set());

  onSelectRef.current      = onCountrySelect;
  unlockedCodesRef.current = unlockedCodes ?? new Set();

  // Stable key so unlock effect only fires when the actual set of codes changes
  const unlockedKey = useMemo(
    () => [...(unlockedCodes ?? [])].sort().join(','),
    [unlockedCodes]
  );

  // ── Draw map once ─────────────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    const tooltip   = tooltipRef.current;
    if (!container || !tooltip) return;
    let cancelled = false;

    loadD3().then(async () => {
      if (cancelled) return;
      const d3 = (window as any).d3;

      const W = container.clientWidth  || 600;
      const H = container.clientHeight || Math.round(W * 9 / 7);

      const svg = d3.select(container)
        .append('svg')
        .attr('viewBox', `0 0 ${W} ${H}`)
        .style('width', '100%')
        .style('height', '100%')
        .style('display', 'block');

      // No filters — clean black map with no blur

      let geoData: any;
      try {
        const r = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
        geoData = await r.json();
      } catch { return; }
      if (cancelled) return;

      const isoSet = new Set(Object.keys(COUNTRY_COLORS));

      // Preprocess: attach _resolvedISO to every feature so the correct code
      // is available in both the filter and the render loop without re-deriving it.
      const features = geoData.features
        .map((f: any) => {
          const rawId = f.properties.iso_a3 || f.id;
          const iso3  = GEO_ISO_ALIAS[rawId] ?? rawId; // translate e.g. "SDS" → "SSD"
          return { ...f, _resolvedISO: iso3 };
        })
        .filter((f: any) => isoSet.has(f._resolvedISO));

      const proj = d3.geoMercator()
        .center([20, -1])
        .scale(Math.min(W, H) * 0.74)
        .translate([W / 2, H / 2]);

      const pathGen = d3.geoPath().projection(proj);
      const g = svg.append('g');

      let activeEl: any    = null;
      let activeISO3: string | null = null;

      features.forEach((feat: any) => {
        const iso3   = feat._resolvedISO;
        const colors = COUNTRY_COLORS[iso3];
        if (!colors) return;

        const iso2 = ISO3_TO_ISO2[iso3];

        // All countries: solid black fill, thin white border line, no blur
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

        p.on('mousemove', function(event: MouseEvent) {
            tooltip.style.opacity = '1';
            tooltip.style.left    = `${event.clientX + 14}px`;
            tooltip.style.top     = `${event.clientY - 44}px`;
            tooltip.textContent   = COUNTRY_NAMES[iso3] ?? iso3;
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
          .on('click', function(this: SVGPathElement) {
            if (activeEl) {
              activeEl
                .attr('fill', '#000000')
                .attr('stroke', 'rgba(255,255,255,0.22)')
                .attr('stroke-width', 0.5);
            }
            const sel = d3.select(this);
            (sel as any)._iso2 = iso2;
            sel
              .attr('fill', '#111111')
              .attr('stroke', 'rgba(255,255,255,0.9)')
              .attr('stroke-width', 1.6);
            activeEl   = sel;
            activeISO3 = iso3;
            tooltip.style.opacity = '0';
            onSelectRef.current(iso2);
          });

        // Country label
        const centroid = pathGen.centroid(feat);
        const bounds   = pathGen.bounds(feat);
        const area     = (bounds[1][0] - bounds[0][0]) * (bounds[1][1] - bounds[0][1]);
        const fs       = area > 5000 ? 10 : area > 2000 ? 8 : area > 800 ? 6.5 : 0;
        if (!isNaN(centroid[0]) && fs > 0) {
          svg.append('text')
            .attr('x', centroid[0])
            .attr('y', centroid[1])
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('pointer-events', 'none')
            .style('font-family', '-apple-system, Segoe UI, sans-serif')
            .style('font-weight', '500')
            .style('font-size', `${fs}px`)
            .style('fill', 'rgba(255,255,255,0.7)')
            .style('letter-spacing', '0.05px')
            .text(COUNTRY_NAMES[iso3] ?? '');
        }
      });
    });

    return () => {
      cancelled = true;
      pathMapRef.current.clear();
      const s = container.querySelector('svg');
      if (s) s.remove();
    };
  }, []); // draw once only

  // ── Unlock effect: highlight unlocked countries with a subtle tint ───────
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
        // No search — restore normal state
        p.attr('fill', isUnlocked ? '#1a1a1a' : '#000000')
         .attr('opacity', 1)
         .attr('stroke', isUnlocked ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.22)');
      } else if (highlightedCodes!.has(iso2)) {
        // Match — highlight slightly
        p.attr('fill', '#222222')
         .attr('opacity', 1)
         .attr('stroke', 'rgba(255,255,255,0.7)');
      } else {
        // No match — dim
        p.attr('fill', '#000000')
         .attr('opacity', 0.2)
         .attr('stroke', 'rgba(255,255,255,0.08)');
      }
    });
  }, [highlightedCodes]);

  return (
    <div className="lp-africa-map-wrap">
      <div ref={containerRef} className="lp-africa-map" />
      <div ref={tooltipRef} className="lp-africa-map-tooltip" />
    </div>
  );
}
