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

    const isMobile = () => window.innerWidth < 640;
    const maxDrops = () => (isMobile()
      ? (intensity === 'heavy' ? 60 : 30)
      : (intensity === 'heavy' ? 140 : 70));

    interface Drop {
      x: number; y: number;
      vx: number; vy: number;
      len: number; alpha: number;
      alive: boolean;
    }

    interface Ripple {
      x: number; y: number;
      rx: number; ry: number;
      maxRx: number; alpha: number;
    }

    let drops: Drop[] = [];
    let ripples: Ripple[] = [];

    function makeDrop(): Drop {
      return {
        x:     Math.random() * (W + 100) - 50,
        y:     -30 - Math.random() * H * 0.4,
        vx:    -2 - Math.random() * 1.5,
        vy:    9  + Math.random() * 9,
        len:   12 + Math.random() * 22,
        alpha: 0.12 + Math.random() * 0.22,
        alive: true,
      };
    }

    function spawnRipple(x: number) {
      const maxRx = 10 + Math.random() * 18;
      ripples.push({ x, y: H - 4, rx: 0, ry: 0, maxRx, alpha: 0.45 });
    }

    const c = canvas as HTMLCanvasElement;
    function resize() {
      W = c.width  = window.innerWidth;
      H = c.height = window.innerHeight;
    }

    let frame = 0;
    function loop() {
      animId = requestAnimationFrame(loop);
      frame++;

      // Spawn drops
      if (drops.length < maxDrops() && frame % 2 === 0) {
        drops.push(makeDrop());
      }

      // Clear only — no sky fill, lets the sandy WebGL bg show through
      ctx.clearRect(0, 0, W, H);

      // Ripples — oval, clear white
      ripples = ripples.filter(r => r.alpha > 0.01);
      for (const r of ripples) {
        r.rx = Math.min(r.maxRx, r.rx + 0.9);
        r.ry = Math.min(r.maxRx * 0.25, r.ry + 0.22);
        r.alpha *= 0.93;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.rx, r.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,245,230,${r.alpha})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // Drops — clear sandy white streaks
      for (const d of drops) {
        d.x += d.vx;
        d.y += d.vy;

        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.vx * (d.len / d.vy), d.y - d.len);
        ctx.strokeStyle = `rgba(255,245,230,${d.alpha})`;
        ctx.lineWidth = 0.9;
        ctx.lineCap = 'round';
        ctx.stroke();

        if (d.y > H + 10) { spawnRipple(d.x); d.alive = false; }
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
        zIndex: 1,
        pointerEvents: 'none',
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
}
