import { useEffect, useRef, useMemo } from 'react';

const ISO3_TO_ISO2: Record<string, string> = {
  DZA:'DZ', AGO:'AO', BEN:'BJ', BWA:'BW', BFA:'BF', BDI:'BI', CPV:'CV',
  CMR:'CM', CAF:'CF', TCD:'TD', COM:'KM', COD:'CD', COG:'CG', DJI:'DJ',
  EGY:'EG', GNQ:'GQ', ERI:'ER', SWZ:'SZ', ETH:'ET', GAB:'GA', GMB:'GM',
  GHA:'GH', GIN:'GN', GNB:'GW', CIV:'CI', KEN:'KE', LSO:'LS', LBR:'LR',
  LBY:'LY', MDG:'MG', MWI:'MW', MLI:'ML', MRT:'MR', MUS:'MU', MAR:'MA',
  MOZ:'MZ', NAM:'NA', NER:'NE', NGA:'NG', RWA:'RW', STP:'ST', SEN:'SN',
  SYC:'SC', SLE:'SL', SOM:'SO', ZAF:'ZA', SSD:'SS', SDN:'SD', TZA:'TZ',
  TGO:'TG', TUN:'TN', UGA:'UG', ESH:'EH', ZMB:'ZM', ZWE:'ZW',
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

const COUNTRY_COLORS: Record<string, string[]> = {
  DZA:['#006233','#FFFFFF'], AGO:['#CC0000','#000000'],
  BEN:['#008751','#FCD116','#E8112D'], BWA:['#75AADB','#FFFFFF','#000000'],
  BFA:['#EF2B2D','#009A00','#FCD116'], BDI:['#CE1126','#FFFFFF','#1EB53A'],
  CPV:['#003893','#CF2027','#FFFFFF'], CMR:['#007A5E','#CE1126','#FCD116'],
  CAF:['#003082','#FFFFFF','#289728','#FECB00','#CE1126'],
  TCD:['#002664','#FECB00','#C60C30'], COM:['#3A75C4','#009A44','#FFFFFF'],
  COD:['#007FFF','#F7D618','#CE1021'], COG:['#009A44','#FBDE4A','#DC241F'],
  DJI:['#6AB2E7','#12AD2B','#FFFFFF'], EGY:['#CE1126','#FFFFFF','#000000'],
  GNQ:['#3E9A00','#FFFFFF','#E32118'], ERI:['#4189DD','#4DAA4B','#D02B27'],
  SWZ:['#3E5EB9','#FFD900','#B10C0C'], ETH:['#078930','#FCDD09','#DA121A'],
  GAB:['#009E60','#FCD116','#003189'], GMB:['#CE1126','#3A7728','#0C0CE8'],
  GHA:['#006B3F','#FCD116','#CE1126'], GIN:['#CE1126','#FCD116','#009460'],
  GNB:['#CE1126','#009E49','#000000'], CIV:['#F77F00','#FFFFFF','#009A44'],
  KEN:['#006600','#CC0000','#000000','#FFFFFF'],
  LSO:['#009543','#FFFFFF','#00209F'], LBR:['#BF0A30','#FFFFFF','#003087'],
  LBY:['#000000','#239E46','#E70013'], MDG:['#FFFFFF','#FC3D32','#007E3A'],
  MWI:['#000000','#CE1126','#339E35'], MLI:['#14B53A','#FCD116','#CE1126'],
  MRT:['#006233','#FFD700'], MUS:['#EA2839','#1A206D','#FFD500'],
  MAR:['#C1272D','#006233'], MOZ:['#009A44','#FFFFFF','#000000'],
  NAM:['#003580','#CF0028','#009543'], NER:['#E05206','#FFFFFF','#0DB02B'],
  NGA:['#008751','#FFFFFF','#008751'], RWA:['#20603D','#FAD201','#1F86CC'],
  STP:['#12AD2B','#FFCD00','#D21034'], SEN:['#00853F','#FDEF42','#E31B23'],
  SYC:['#003F87','#FCD856','#D62828'], SLE:['#1EB53A','#FFFFFF','#0072C6'],
  SOM:['#4189DD','#FFFFFF'], ZAF:['#007A4D','#000000','#FFB612','#FFFFFF','#DE3831'],
  SSD:['#078930','#FCDD09','#DA121A'], SDN:['#D21034','#FFFFFF','#000000'],
  TZA:['#1EB53A','#FCD116','#000000'], TGO:['#006A4E','#FFCE00','#D21034'],
  TUN:['#E70013','#FFFFFF'], UGA:['#000000','#FCDC04','#9E3039'],
  ESH:['#007A3D','#FFFFFF','#000000'], ZMB:['#198A00','#EF7D00','#DE2010'],
  ZWE:['#006400','#FFD200','#D40000'],
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

      const defs = svg.append('defs');
      const filt = defs.append('filter').attr('id', 'afmap-shadow')
        .attr('x','-4%').attr('y','-4%').attr('width','108%').attr('height','108%');
      filt.append('feDropShadow').attr('dx', 0).attr('dy', 2)
        .attr('stdDeviation', 3).attr('flood-color', 'rgba(0,0,0,0.12)');

      function mkGradient(id: string, colors: string[]): string {
        if (colors.length === 1) return colors[0];
        const g = defs.append('linearGradient')
          .attr('id', id).attr('x1','0%').attr('y1','0%').attr('x2','100%').attr('y2','0%');
        colors.forEach((c, i) => {
          g.append('stop')
           .attr('offset', `${i / (colors.length - 1) * 100}%`)
           .attr('stop-color', c);
        });
        return `url(#${id})`;
      }

      let geoData: any;
      try {
        const r = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
        geoData = await r.json();
      } catch { return; }
      if (cancelled) return;

      const isoSet   = new Set(Object.keys(COUNTRY_COLORS));
      const features = geoData.features.filter((f: any) =>
        isoSet.has(f.properties.iso_a3 || f.id)
      );

      const proj = d3.geoMercator()
        .center([20, -1])
        .scale(Math.min(W, H) * 0.74)
        .translate([W / 2, H / 2]);

      const pathGen = d3.geoPath().projection(proj);
      const g = svg.append('g');

      let activeEl: any    = null;
      let activeISO3: string | null = null;

      features.forEach((feat: any) => {
        const iso3   = feat.properties.iso_a3 || feat.id;
        const colors = COUNTRY_COLORS[iso3];
        if (!colors) return;

        const iso2 = ISO3_TO_ISO2[iso3];
        const fill = mkGradient(`afg-${iso3}`, colors);

        // All countries start locked (greyscale via CSS class)
        const p = g.append('path')
          .datum(feat)
          .attr('d', pathGen)
          .attr('fill', fill)
          .attr('class', 'af-country af-locked')
          .attr('stroke', 'rgba(255,255,255,0.5)')
          .attr('stroke-width', 0.6)
          .style('cursor', iso2 ? 'pointer' : 'default');

        if (!iso2) {
          p.classed('af-no-interact', true);
          return;
        }

        pathMapRef.current.set(iso2, p);

        p.on('mousemove', function(event: MouseEvent) {
            tooltip.style.opacity = '1';
            tooltip.style.left    = `${event.clientX + 14}px`;
            tooltip.style.top     = `${event.clientY - 44}px`;
            tooltip.innerHTML     = `<strong>${COUNTRY_NAMES[iso3] ?? iso3}</strong>`;
          })
          .on('mouseleave', function() {
            tooltip.style.opacity = '0';
            if (activeISO3 !== iso3) {
              d3.select(this)
                .attr('stroke', 'rgba(255,255,255,0.5)')
                .attr('stroke-width', 0.6)
                .classed('af-hover', false);
            }
          })
          .on('mouseover', function() {
            if (activeISO3 === iso3) return;
            d3.select(this)
              .attr('stroke', '#ffffff')
              .attr('stroke-width', 1.4)
              .classed('af-hover', true);
          })
          .on('click', function() {
            if (activeEl) {
              activeEl
                .attr('stroke', 'rgba(255,255,255,0.5)')
                .attr('stroke-width', 0.6)
                .classed('af-active af-hover', false);
            }
            d3.select(this)
              .attr('stroke-width', 1.8)
              .classed('af-active', true)
              .classed('af-hover', false);
            activeEl   = d3.select(this);
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
            .style('font-weight', '600')
            .style('font-size', `${fs}px`)
            .style('fill', 'rgba(255,255,255,0.95)')
            .style('paint-order', 'stroke')
            .style('stroke', 'rgba(0,0,0,0.45)')
            .style('stroke-width', '2px')
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

  // ── Apply unlock classes when unlockedCodes changes ──────────────────────
  useEffect(() => {
    const pathMap  = pathMapRef.current;
    if (!pathMap.size) return;
    const unlocked = unlockedCodesRef.current;

    pathMap.forEach((p, iso2) => {
      const isUnlocked = unlocked.has(iso2);
      p.classed('af-locked',   !isUnlocked)
       .classed('af-unlocked',  isUnlocked);
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
      // Remove search state classes first
      p.classed('af-search-match af-search-dim', false);

      if (!hasQuery) {
        // No search — restore base state (handled by af-locked / af-unlocked CSS)
      } else if (highlightedCodes!.has(iso2)) {
        p.classed('af-search-match', true);
      } else {
        p.classed('af-search-dim', true);
      }

      // Keep locked/unlocked class accurate during search
      p.classed('af-locked',  !isUnlocked)
       .classed('af-unlocked', isUnlocked);
    });
  }, [highlightedCodes]);

  return (
    <div className="lp-africa-map-wrap">
      <div ref={containerRef} className="lp-africa-map" />
      <div ref={tooltipRef} className="lp-africa-map-tooltip" />
    </div>
  );
}
