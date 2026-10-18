'use client';

import { useEffect, useRef } from 'react';

/** Live node network behind the landing hero (pauses for reduced-motion users). */
export function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    const x = c?.getContext('2d');
    if (!c || !x) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, raf = 0;
    let pts: { x: number; y: number; vx: number; vy: number }[] = [];
    const d = Math.min(2, window.devicePixelRatio || 1);
    const size = () => {
      W = c.width = c.offsetWidth * d;
      H = c.height = c.offsetHeight * d;
      pts = Array.from({ length: Math.round((W * H) / 22000) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 }));
    };
    const draw = () => {
      const bg = x.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#12061F'); bg.addColorStop(0.6, '#2A1047'); bg.addColorStop(1, '#5D2E8E');
      x.fillStyle = bg; x.fillRect(0, 0, W, H);
      x.globalCompositeOperation = 'lighter';
      const D = 150 * d;
      for (const p of pts) { if (!reduce) { p.x += p.vx; p.y += p.vy; } if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], dd = Math.hypot(a.x - b.x, a.y - b.y);
        if (dd < D) { x.strokeStyle = `rgba(199,146,200,${(1 - dd / D) * 0.42})`; x.lineWidth = d; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke(); }
      }
      x.fillStyle = 'rgba(235,216,235,.85)';
      for (const p of pts) { x.beginPath(); x.arc(p.x, p.y, 1.8 * d, 0, Math.PI * 2); x.fill(); }
      x.globalCompositeOperation = 'source-over';
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    size(); draw();
    const onResize = () => { size(); if (reduce) draw(); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
