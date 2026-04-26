import { useEffect, useRef } from 'react';

// Savanna sunset palette
const FG  = '#0a0400';   // near-black dark brown — trees & ground
const BG1 = '#8B0000';   // deep crimson (top-left)
const BG2 = '#c0392b';   // burnt red
const BG3 = '#e67e22';   // amber orange (bottom-right)

const NS = 'http://www.w3.org/2000/svg';

function rand(a: number, b: number) {
  return Math.random() * (a - b) + b;
}

function jitter(n: number, pct = 0.2) {
  return n + n * rand(pct, -pct);
}

function makeDefs(svg: SVGSVGElement, W: number, H: number) {
  const defs = document.createElementNS(NS, 'defs');

  function makeFilter(id: string, scale: number) {
    const f = document.createElementNS(NS, 'filter');
    f.id = id;
    const turb = document.createElementNS(NS, 'feTurbulence');
    turb.setAttribute('result', 'T');
    turb.setAttribute('baseFrequency', '0.005');
    turb.setAttribute('numOctaves', '2');
    turb.setAttribute('seed', '0');
    const disp = document.createElementNS(NS, 'feDisplacementMap');
    disp.setAttribute('in', 'SourceGraphic');
    disp.setAttribute('in2', 'T');
    disp.setAttribute('scale', String(scale));
    f.appendChild(turb);
    f.appendChild(disp);
    return f;
  }

  defs.appendChild(makeFilter('sv-gnd', 25));
  defs.appendChild(makeFilter('sv-tree', 4));

  // Diagonal sunset gradient
  const grad = document.createElementNS(NS, 'linearGradient');
  grad.id = 'sv-grad';
  grad.setAttribute('x1', '0'); grad.setAttribute('y1', '0');
  grad.setAttribute('x2', '1'); grad.setAttribute('y2', '1');
  [[BG1,'0%'],[BG2,'50%'],[BG3,'100%']].forEach(([color, offset]) => {
    const s = document.createElementNS(NS, 'stop');
    s.setAttribute('offset', offset);
    s.setAttribute('stop-color', color);
    grad.appendChild(s);
  });
  defs.appendChild(grad);

  // Background rect filled with gradient
  svg.appendChild(defs);
  const bg = document.createElementNS(NS, 'rect');
  bg.setAttribute('width', String(W));
  bg.setAttribute('height', String(H));
  bg.setAttribute('fill', 'url(#sv-grad)');
  svg.appendChild(bg);
}

function addTree(parent: SVGGElement, pos: number, width: number, sceneH: number, branchWeight: number) {
  const w = jitter(width, 0.5);
  const h = sceneH;
  const hasBranch = Math.round(rand(0, branchWeight));
  let d: string;

  if (!hasBranch) {
    d = `M${pos},-10 L${pos+w},-10 L${pos+w},${h} L${pos},${h} Z`;
  } else {
    const side      = Math.round(Math.random());
    const bw        = w / 2;
    const bx        = rand(w, w * 1.5);
    const by        = rand(h / 6, h / 2);
    const angle     = Math.atan(bx / by);
    const reattach  = (bx + bw) / Math.tan(angle);
    if (side === 0) {
      d = `M${pos},-10 L${pos},${by} L${pos-bx},0 L${pos-bx-bw},-10 L${pos},${reattach} L${pos},${h} L${pos+w},${h} L${pos+w},-10 Z`;
    } else {
      d = `M${pos},-10 L${pos+w},-10 L${pos+w},${by} L${pos+w+bx},-10 L${pos+w+bx+bw},-10 L${pos+w},${reattach} L${pos+w},${h} L${pos},${h} Z`;
    }
  }

  const path = document.createElementNS(NS, 'path');
  path.setAttribute('d', d);
  path.setAttribute('fill', FG);
  path.setAttribute('filter', 'url(#sv-tree)');
  parent.appendChild(path);
}

function addLayer(svg: SVGSVGElement, W: number, H: number, opts: {
  screenPct:    number;
  treeFreq:     number;
  treeWidth:    number;
  branchWeight: number;
  opacity?:     number;
}) {
  const g = document.createElementNS(NS, 'g');
  if (opts.opacity !== undefined) g.style.opacity = String(opts.opacity);

  const groundH = opts.screenPct * H;
  const rect    = document.createElementNS(NS, 'rect');
  rect.setAttribute('fill', FG);
  rect.setAttribute('filter', 'url(#sv-gnd)');
  rect.setAttribute('height', String(groundH));
  rect.setAttribute('width',  String(W + 30));
  rect.setAttribute('x', '-15');
  rect.setAttribute('y', String(H - groundH + 15));
  g.appendChild(rect);

  const freq     = jitter(opts.treeFreq, 0.3);
  const numTrees = Math.max(2, Math.floor(W / freq));
  for (let i = 0; i < numTrees; i++) {
    addTree(g, rand(0, W), opts.treeWidth, H, opts.branchWeight);
  }

  svg.appendChild(g);
}

function addTopBar(svg: SVGSVGElement, W: number, H: number) {
  const g    = document.createElementNS(NS, 'g');
  const rect = document.createElementNS(NS, 'rect');
  rect.setAttribute('fill', FG);
  rect.setAttribute('filter', 'url(#sv-gnd)');
  rect.setAttribute('height', String(H * 0.15 + 25));
  rect.setAttribute('width', String(W + 30));
  rect.setAttribute('x', '-25');
  rect.setAttribute('y', '-25');
  g.appendChild(rect);
  svg.appendChild(g);
}

export interface SavannaCanvasProps {
  preview?: boolean;
}

export function SavannaCanvas({ preview = false }: SavannaCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef  = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg  = svgRef.current;
    if (!wrap || !svg) return;

    function build() {
      if (!wrap || !svg) return;
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      const W = wrap.clientWidth  || window.innerWidth;
      const H = wrap.clientHeight || window.innerHeight;

      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      svg.setAttribute('width',   String(W));
      svg.setAttribute('height',  String(H));

      makeDefs(svg, W, H);

      // Far background silhouettes — faint
      addLayer(svg, W, H, {
        screenPct: 0.01, treeFreq: 100, treeWidth: 20,
        branchWeight: 2, opacity: 0.3,
      });

      // Main foreground ground + trees
      addLayer(svg, W, H, {
        screenPct: 0.15, treeFreq: 300, treeWidth: 40,
        branchWeight: 0.95,
      });

      // Dark top bar
      addTopBar(svg, W, H);
    }

    build();

    const ro = new ResizeObserver(build);
    ro.observe(wrap);
    return () => ro.disconnect();
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
    <div ref={wrapRef} style={outerStyle}>
      <svg
        ref={svgRef}
        xmlns={NS}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}
