import { useEffect, useRef, useState } from 'react';
import './AfroslangIntro.css';

interface AfroslangIntroProps {
  onComplete: () => void;
}

// ── Map constants ──────────────────────────────────────────────────────────────
const DEG = Math.PI / 180;

const AFRICA_COORDS: [number, number][] = [
  [37.9,12.7],[43.4,11.6],[43.1,4.6],[41.7,-1.0],[40.0,-3.5],
  [39.2,-4.7],[37.7,-11.0],[36.5,-14.2],[35.3,-16.1],[34.3,-20.1],
  [35.9,-24.1],[32.7,-26.8],[28.0,-32.6],[26.7,-33.9],[22.1,-34.4],
  [18.3,-34.0],[16.4,-29.6],[14.9,-22.1],[11.8,-17.1],[12.3,-6.1],
  [8.8,3.8],[2.7,5.4],[-1.6,5.0],[-3.8,5.2],[-5.3,5.0],
  [-7.5,4.5],[-11.5,6.9],[-15.1,10.9],[-17.5,14.7],[-17.2,20.7],
  [-13.2,23.2],[-5.5,23.5],[0.0,27.7],[2.1,28.9],[9.3,30.6],
  [11.6,33.1],[14.1,36.8],[15.8,37.3],[22.6,37.3],[25.2,37.5],
  [31.7,31.0],[32.5,30.9],[36.9,22.0],[38.4,15.7],[37.9,12.7],
];

const CONTINENTS_FALLBACK = [
  { coords: AFRICA_COORDS, col: '#5dc93f', str: '#3a9020' },
  { coords: [[-9.2,38.7],[30,36],[30,72],[-10,72],[-9.2,38.7]] as [number,number][], col: '#4aaa36', str: '#2e7020' },
  { coords: [[30,10],[150,10],[150,75],[30,75],[30,10]] as [number,number][], col: '#4aaa36', str: '#2e7020' },
  { coords: [[-170,15],[-50,15],[-50,75],[-170,75],[-170,15]] as [number,number][], col: '#4aaa36', str: '#2e7020' },
  { coords: [[-82,-56],[-34,-56],[-34,12],[-82,12],[-82,-56]] as [number,number][], col: '#4aaa36', str: '#2e7020' },
  { coords: [[113,-44],[154,-44],[154,-10],[113,-10],[113,-44]] as [number,number][], col: '#4aaa36', str: '#2e7020' },
  { coords: [[-180,-65],[180,-65],[180,-90],[-180,-90],[-180,-65]] as [number,number][], col: '#ddeeff', str: '#aaccee' },
];

function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInOut(t: number) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }
function angDiff(a: number, b: number) { return ((b - a) % 360 + 540) % 360 - 180; }

function project(lon: number, lat: number, rotLon: number, rotLat: number, R: number) {
  const lam = (lon - rotLon) * DEG, phi = lat * DEG, phi0 = rotLat * DEG;
  const cP = Math.cos(phi), sP = Math.sin(phi);
  const cR = Math.cos(phi0), sR = Math.sin(phi0);
  const cL = Math.cos(lam), sL = Math.sin(lam);
  return { x: R + R*0.935*cP*sL, y: R - R*0.935*(cR*sP - sR*cP*cL), z: sR*sP + cR*cP*cL };
}

// ── Component ──────────────────────────────────────────────────────────────────
export function AfroslangIntro({ onComplete }: AfroslangIntroProps) {
  const globeRef    = useRef<HTMLCanvasElement>(null);
  const africaRef   = useRef<HTMLCanvasElement>(null);
  const rafRef      = useRef<number>(0);
  const texOffRef   = useRef<HTMLCanvasElement | null>(null);
  const texReadyRef = useRef(false);
  const doneRef     = useRef(false);

  const [titleVisible, setTitleVisible]   = useState(false);
  const [africaVisible, setAfricaVisible] = useState(false);
  const [fadeOut, setFadeOut]             = useState(false);
  const [showSpinOverlay, setShowSpinOverlay] = useState(false);
  const spinShownRef  = useRef(false);
  const spinHiddenRef = useRef(false);

  const finishAndExit = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setFadeOut(true);
    setTimeout(onComplete, 700);
  };

  // ── Globe animation ──────────────────────────────────────────────────────────
  useEffect(() => {
    const globeCanvas  = globeRef.current!;
    const africaCanvas = africaRef.current!;
    const gc = globeCanvas.getContext('2d')!;
    const ac = africaCanvas.getContext('2d')!;

    const VW   = window.innerWidth;
    const VH   = window.innerHeight;
    const SIZE = Math.min(VW, VH) * 0.80;
    const R    = SIZE / 2;

    globeCanvas.width   = SIZE;
    globeCanvas.height  = SIZE;
    africaCanvas.width  = VW;
    africaCanvas.height = VH;

    // Texture
    const TEX_W = 1024, TEX_H = 512;
    const texOff = document.createElement('canvas');
    texOff.width = TEX_W; texOff.height = TEX_H;
    const tCtx = texOff.getContext('2d')!;
    texOffRef.current = texOff;

    const mapImg = new Image();
    mapImg.crossOrigin = 'anonymous';
    mapImg.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Equirectangular_projection_SW.jpg/1280px-Equirectangular_projection_SW.jpg';
    mapImg.onload = () => { tCtx.drawImage(mapImg, 0, 0, TEX_W, TEX_H); texReadyRef.current = true; };

    // Africa flat coords
    const minLon = -18, maxLon = 52, minLat = -36, maxLat = 38;
    const avail  = Math.min(VW*0.82, VH*0.85);
    const flatScale = avail / Math.max(maxLon-minLon, maxLat-minLat);
    const cx = VW/2 - ((minLon+maxLon)/2)*flatScale;
    const cy = VH/2 + ((minLat+maxLat)/2)*flatScale;
    const AFRICA_FLAT = AFRICA_COORDS.map(([lon,lat]) => [cx+lon*flatScale, cy-lat*flatScale] as [number,number]);
    const splitX = VW/2;

    // ── Draw helpers ─────────────────────────────────────────────────────────
    function drawPaintedGlobe(rotLon: number, rotLat: number) {
      for (const cont of CONTINENTS_FALLBACK) {
        const pts = cont.coords.map(([lon,lat]) => project(lon, lat, rotLon, rotLat, R));
        const vis = pts.filter(p => p.z > 0).length;
        if (vis < 2) continue;
        gc.beginPath();
        let pen = false;
        for (const p of pts) {
          if (p.z < -0.05) { pen = false; continue; }
          if (!pen) { gc.moveTo(p.x, p.y); pen = true; }
          else gc.lineTo(p.x, p.y);
        }
        gc.closePath();
        gc.fillStyle = cont.col; gc.fill();
        gc.strokeStyle = cont.str; gc.lineWidth = 0.8; gc.stroke();
      }
    }

    function drawGlobe(rotLon: number, rotLat: number) {
      gc.clearRect(0, 0, SIZE, SIZE);
      const sR   = R * 0.935;
      const cosR = Math.cos(rotLat * DEG);

      gc.save();
      gc.beginPath(); gc.arc(R, R, sR, 0, Math.PI*2); gc.clip();

      const og = gc.createRadialGradient(R*0.6, R*0.35, 0, R, R, sR);
      og.addColorStop(0,   '#3ab0e0');
      og.addColorStop(0.5, '#1070b8');
      og.addColorStop(1,   '#04305a');
      gc.fillStyle = og; gc.fillRect(0, 0, SIZE, SIZE);

      const texOff = texOffRef.current;
      if (texReadyRef.current && texOff) {
        const TW = texOff.width, TH = texOff.height;
        const ny_arr: number[] = [];
        for (let py = 0; py < SIZE; py++) {
          ny_arr.push((R - py) / sR);
        }
        for (let py = 0; py < SIZE; py++) {
          const ny = ny_arr[py];
          if (Math.abs(ny) > 1) continue;
          const sinPhi = Math.min(1, Math.max(-1,
            cosR*ny + Math.sin(rotLat*DEG)*Math.sqrt(Math.max(0, 1-ny*ny))
          ));
          const lat    = Math.asin(sinPhi) / DEG;
          const halfW  = sR * Math.sqrt(Math.max(0, 1-ny*ny));
          const ty     = Math.round((90-lat)/180*TH);
          if (ty < 0 || ty >= TH) continue;
          const txLeft  = ((rotLon - 90 + 180) % 360) / 360 * TW;
          const txRight = ((rotLon + 90 + 180) % 360) / 360 * TW;
          const dstX = R - halfW, dstW = halfW * 2;
          if (dstW < 1) continue;
          if (txLeft < txRight) {
            gc.drawImage(texOff, txLeft, ty, txRight-txLeft, 1, dstX, py, dstW, 1);
          } else {
            const p1W = TW - txLeft, p2W = txRight, tot = p1W + p2W;
            if (tot < 1) continue;
            gc.drawImage(texOff, txLeft, ty, p1W, 1, dstX, py, dstW*(p1W/tot), 1);
            gc.drawImage(texOff, 0, ty, p2W, 1, dstX+dstW*(p1W/tot), py, dstW*(p2W/tot), 1);
          }
        }
      } else {
        drawPaintedGlobe(rotLon, rotLat);
      }

      const limb = gc.createRadialGradient(R,R,sR*0.55,R,R,sR);
      limb.addColorStop(0, 'transparent'); limb.addColorStop(0.65, 'transparent');
      limb.addColorStop(1, 'rgba(0,10,30,0.65)');
      gc.fillStyle = limb; gc.fillRect(0, 0, SIZE, SIZE);
      gc.restore();

      const spec = gc.createRadialGradient(R*0.50,R*0.30,0,R*0.50,R*0.30,R*0.48);
      spec.addColorStop(0,   'rgba(255,255,255,0.22)');
      spec.addColorStop(0.6, 'rgba(255,255,255,0.04)');
      spec.addColorStop(1,   'transparent');
      gc.save();
      gc.beginPath(); gc.arc(R,R,sR,0,Math.PI*2); gc.clip();
      gc.fillStyle=spec; gc.fillRect(0,0,SIZE,SIZE);
      gc.restore();

      const atmo = gc.createRadialGradient(R,R,sR*0.65,R,R,sR*1.12);
      atmo.addColorStop(0, 'transparent'); atmo.addColorStop(0.80, 'transparent');
      atmo.addColorStop(1, 'rgba(60,150,255,0.25)');
      gc.beginPath(); gc.arc(R,R,sR*1.12,0,Math.PI*2);
      gc.fillStyle=atmo; gc.fill();
      gc.beginPath(); gc.arc(R,R,sR,0,Math.PI*2);
      gc.strokeStyle='rgba(80,160,255,0.28)'; gc.lineWidth=1.5; gc.stroke();
    }

    function drawAfricaReveal(t: number) {
      ac.clearRect(0,0,VW,VH);
      const shift = VW*0.55*t;
      for (const [side, dx] of [['left',-shift],['right',shift]] as [string,number][]) {
        ac.save();
        if (side==='left') { ac.beginPath(); ac.rect(0,0,splitX,VH); ac.clip(); }
        else               { ac.beginPath(); ac.rect(splitX,0,VW,VH); ac.clip(); }
        ac.translate(dx,0);
        ac.beginPath();
        AFRICA_FLAT.forEach(([x,y],i) => i===0 ? ac.moveTo(x,y) : ac.lineTo(x,y));
        ac.closePath();
        const alpha = Math.max(0, 0.5*(1-t*1.8));
        ac.fillStyle = `rgba(0,40,10,${alpha})`; ac.fill();
        const strokeAlpha = Math.max(0, 1-t*0.7);
        ac.strokeStyle = `rgba(0,80,22,${strokeAlpha})`; ac.lineWidth=2.5; ac.stroke();
        ac.restore();
      }
    }

    // ── Animation loop ────────────────────────────────────────────────────────
    let rotLon = 0, rotLat = -18, speed = 1.4;
    let phase = 'loading';
    let phaseStart: number | null = null;
    let globeScale = 1;
    const AFRICA_LON = 20, AFRICA_LAT = 3;
    const DUR_FAST=3000, DUR_SLOW=2500, DUR_ZOOM=1200, DUR_OPEN=1200;

    function tick(ts: number) {
      if (doneRef.current) return;
      if (!phaseStart) phaseStart = ts;
      const el = ts - phaseStart;

      if (phase === 'loading') {
        if (el > 300) { phase='fast'; phaseStart=ts; }

      } else if (phase === 'fast') {
        if (!spinShownRef.current) { spinShownRef.current = true; setShowSpinOverlay(true); }
        rotLon = (rotLon + speed) % 360;
        drawGlobe(rotLon, rotLat);
        globeCanvas.style.transform = `translate(-50%,-50%) scale(${globeScale})`;
        globeCanvas.style.opacity = '1';
        if (el > DUR_FAST) { phase='slowing'; phaseStart=ts; }

      } else if (phase === 'slowing') {
        const t = Math.min(el/DUR_SLOW, 1);
        const e = easeOut(t);
        rotLon += speed*(1-e) + angDiff(rotLon,AFRICA_LON)*e*0.06;
        rotLat += (AFRICA_LAT-rotLat)*e*0.05;
        drawGlobe(rotLon, rotLat);
        globeCanvas.style.transform = `translate(-50%,-50%) scale(${globeScale})`;
        if (t >= 1) { rotLon=AFRICA_LON; rotLat=AFRICA_LAT; phase='zooming'; phaseStart=ts; }

      } else if (phase === 'zooming') {
        const t = Math.min(el/DUR_ZOOM, 1);
        if (t > 0.15 && !spinHiddenRef.current) { spinHiddenRef.current = true; setShowSpinOverlay(false); }
        globeScale = 1 + easeInOut(t)*7;
        const fade = t < 0.4 ? 1 : 1 - easeOut((t-0.4)/0.6);
        globeCanvas.style.opacity = String(fade);
        globeCanvas.style.transform = `translate(-50%,-50%) scale(${globeScale})`;
        drawGlobe(AFRICA_LON, AFRICA_LAT);
        if (t > 0.5) setAfricaVisible(true);
        if (t >= 1) { globeCanvas.style.display='none'; phase='opening'; phaseStart=ts; }

      } else if (phase === 'opening') {
        const t = Math.min(el/DUR_OPEN, 1);
        drawAfricaReveal(easeInOut(t));
        if (t > 0.55) setTitleVisible(true);
        if (t >= 1) {
          // Hold on the title then auto-advance to LandingPage
          setTimeout(() => {
            if (!doneRef.current) finishAndExit();
          }, 1500);
          return;
        }
      } else {
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className={`afro-globe-intro${fadeOut ? ' afro-globe-intro--fadeout' : ''}`}>
      {/* Star field */}
      <div className="afro-globe-stars" aria-hidden="true" />

      {/* Globe canvas */}
      <canvas ref={globeRef} className="afro-globe-canvas" />

      {/* Spin overlay — title above globe + fact below during spinning */}
      <div className={`afro-spin-overlay${showSpinOverlay ? ' afro-spin-overlay--show' : ''}`}>
        <div className="afro-spin-title-top">
          <h1 className="afro-globe-title">
            <span style={{ color: '#ffffff' }}>AFRO</span><span style={{ color: '#b00020' }}>SLANG</span>
          </h1>
        </div>
        <div className="afro-spin-fact-bottom">
          <p className="afro-spin-fact">Africa is home to approximately one-third of the world's languages</p>
        </div>
      </div>

      {/* Africa reveal + title (post-zoom) */}
      <div className={`afro-africa-stage${africaVisible ? ' afro-africa-stage--visible' : ''}`}>
        <canvas ref={africaRef} className="afro-africa-canvas" />
        <div className={`afro-globe-title-block${titleVisible ? ' afro-globe-title-block--show' : ''}`}>
          <dotlottie-wc
            src="https://lottie.host/75a566a2-61ec-4b60-9c5b-6ec41aff8523/1aJFp2Ot5H.lottie"
            autoplay
            loop
            aria-hidden="true"
            style={{ display: 'block', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'clamp(180px, 40vw, 340px)', height: 'clamp(180px, 40vw, 340px)', opacity: 0.32, pointerEvents: 'none' }}
          />
          <h1 className="afro-globe-title">
            <span style={{ color: '#ffffff' }}>AFRO</span><span style={{ color: '#b00020' }}>SLANG</span>
          </h1>
          <p className="afro-globe-tagline">Start Your Journey Now · Learn Your Roots</p>
        </div>
      </div>

      {/* Skip — advances directly to LandingPage */}
      {!fadeOut && (
        <button className="afro-globe-skip" onClick={finishAndExit} aria-label="Skip intro">
          Skip
        </button>
      )}
    </div>
  );
}
