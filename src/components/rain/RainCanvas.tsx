import { useEffect, useRef } from 'react';

interface RainCanvasProps {
  intensity?: 'light' | 'heavy';
}

export function RainCanvas({ intensity = 'heavy' }: RainCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    let W = 0, H = 0;
    let animId = 0;
    let frame = 0;
    let lightningAlpha = 0;
    let lightningDecay = 0;
    let nextLightning = 250 + Math.random() * 350;

    const isMobile = () => window.innerWidth < 640;
    const maxDrops = () => (isMobile() ? (intensity === 'heavy' ? 60 : 30) : (intensity === 'heavy' ? 140 : 70));

    // ── Drop ──────────────────────────────────────────────
    interface Drop {
      x: number; y: number;
      vx: number; vy: number;
      len: number; alpha: number;
      color: string; alive: boolean;
    }

    interface Ripple {
      x: number; y: number;
      rx: number; ry: number;
      maxRx: number; alpha: number;
    }

    const COLORS = [
      'rgba(34,197,94,',   // green-500
      'rgba(74,222,128,',  // green-400
      'rgba(134,239,172,', // green-300
      'rgba(200,255,220,', // near-white green
      'rgba(255,255,255,', // white
    ];

    let drops: Drop[] = [];
    let ripples: Ripple[] = [];

    function makeDrop(): Drop {
      const col = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x: Math.random() * (W + 100) - 50,
        y: -30 - Math.random() * H * 0.4,
        vx: -2 - Math.random() * 1.5,
        vy: 9 + Math.random() * 9,
        len: 12 + Math.random() * 22,
        alpha: 0.18 + Math.random() * 0.38,
        color: col,
        alive: true,
      };
    }

    function spawnRipple(x: number) {
      const maxRx = 10 + Math.random() * 18;
      ripples.push({ x, y: H - 4, rx: 0, ry: 0, maxRx, alpha: 0.55 });
    }

    // ── Resize ────────────────────────────────────────────
    const c = canvas as HTMLCanvasElement;
    function resize() {
      W = c.width = window.innerWidth;
      H = c.height = window.innerHeight;
    }

    // ── Lightning ─────────────────────────────────────────
    function triggerLightning() {
      lightningAlpha = 0.22 + Math.random() * 0.18;
      lightningDecay = 0.008 + Math.random() * 0.012;
      nextLightning = 300 + Math.random() * 400;
    }

    // ── Main loop ─────────────────────────────────────────
    function loop() {
      animId = requestAnimationFrame(loop);
      frame++;

      // Spawn drops
      if (drops.length < maxDrops() && frame % 2 === 0) {
        drops.push(makeDrop());
      }

      // Clear
      ctx.clearRect(0, 0, W, H);

      // Sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#020b04');
      sky.addColorStop(0.45, '#041208');
      sky.addColorStop(1, '#061a0a');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Lightning flash
      if (lightningAlpha > 0) {
        ctx.fillStyle = `rgba(180,255,200,${lightningAlpha})`;
        ctx.fillRect(0, 0, W, H);
        lightningAlpha = Math.max(0, lightningAlpha - lightningDecay);
      }

      // Lightning timer
      if (frame >= nextLightning) {
        frame = 0;
        triggerLightning();
      }

      // Draw ripples
      ripples = ripples.filter(r => r.alpha > 0.01);
      for (const r of ripples) {
        r.rx = Math.min(r.maxRx, r.rx + 0.9);
        r.ry = Math.min(r.maxRx * 0.25, r.ry + 0.22);
        r.alpha *= 0.94;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.rx, r.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(74,222,128,${r.alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Draw drops
      for (const d of drops) {
        d.x += d.vx;
        d.y += d.vy;

        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.vx * (d.len / d.vy), d.y - d.len);
        ctx.strokeStyle = d.color + d.alpha + ')';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        ctx.stroke();

        if (d.y > H + 10) {
          spawnRipple(d.x);
          d.alive = false;
        }
        if (d.x < -60 || d.x > W + 60) d.alive = false;
      }

      drops = drops.filter(d => d.alive);
    }

    resize();
    window.addEventListener('resize', resize);
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
}
