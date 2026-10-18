/**
 * Generative brand visuals (glowing purple line work with the logo's circuit-node motif).
 * Each "kind" draws a different concept; a seed makes every slot unique but stable.
 * Replace any GenArt slot with a <Image> once real photography is available.
 */
type Ctx = CanvasRenderingContext2D;
type Rand = () => number;
type Stroke = (rgb: string, alpha: number, width?: number) => void;

export type ArtKind =
  | 'flow' | 'waves' | 'grid' | 'cards' | 'rays' | 'mesh' | 'rise'
  | 'orbit' | 'branch' | 'bridge' | 'blocks' | 'dots' | 'rings';

const LV = '235,216,235';
const OR = '199,146,200';
const AM = '255,200,120';

export function rng(seed: number): Rand {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function glow(x: Ctx, cx: number, cy: number, r: number) {
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0, 'rgba(255,255,255,.55)');
  g.addColorStop(0.25, 'rgba(199,146,200,.4)');
  g.addColorStop(1, 'rgba(157,68,150,0)');
  x.fillStyle = g;
  x.fillRect(cx - r, cy - r, r * 2, r * 2);
}

function rr(x: Ctx, a: number, b: number, w: number, h: number, r: number) {
  x.beginPath();
  x.moveTo(a + r, b);
  x.arcTo(a + w, b, a + w, b + h, r);
  x.arcTo(a + w, b + h, a, b + h, r);
  x.arcTo(a, b + h, a, b, r);
  x.arcTo(a, b, a + w, b, r);
  x.closePath();
}

function dot(x: Ctx, px: number, py: number, r: number, fill: string) {
  x.fillStyle = fill;
  x.beginPath();
  x.arc(px, py, r, 0, Math.PI * 2);
  x.fill();
}

const KINDS: Record<ArtKind, (x: Ctx, w: number, h: number, R: Rand, S: Stroke) => void> = {
  flow(x, w, h, R, S) {
    const fx = w * 0.62, fy = h * 0.5;
    for (let i = 0; i < 80; i++) {
      const y0 = R() * h * 1.2 - h * 0.1;
      S(i % 6 ? OR : LV, 0.12 + R() * 0.22, i % 9 ? 1 : 1.6);
      x.beginPath();
      x.moveTo(-10, y0);
      x.bezierCurveTo(w * 0.3, y0, w * 0.42, fy + (R() - 0.5) * h * 0.1, fx, fy);
      const y1 = fy + (R() - 0.5) * h * 1.4;
      x.bezierCurveTo(w * 0.8, fy, w * 0.85, y1, w + 10, y1);
      x.stroke();
    }
    glow(x, fx, fy, Math.min(w, h) * 0.22);
  },
  waves(x, w, h, R, S) {
    const n = 50, ph = R() * 6;
    for (let i = 0; i < n; i++) {
      S(i % 5 ? OR : LV, 0.08 + (i / n) * 0.38);
      x.beginPath();
      for (let xx = -10; xx <= w + 10; xx += 6) {
        const y = h * 0.55 + Math.sin(xx * 0.011 + i * 0.16 + ph) * h * 0.16 * (1 - i / (n * 1.4)) + Math.sin(xx * 0.004 + ph) * h * 0.08 + (i - n / 2) * h * 0.006;
        if (xx < 0) x.moveTo(xx, y); else x.lineTo(xx, y);
      }
      x.stroke();
    }
  },
  grid(x, w, h, R, S) {
    const g = Math.max(22, Math.min(w, h) / 9), cols = Math.ceil(w / g) + 1, rows = Math.ceil(h / g) + 1;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const px = c * g + g / 2, py = r * g + g / 2, v = R();
      if (v < 0.45 && c < cols - 1) { S(LV, 0.55, 2); x.beginPath(); x.moveTo(px, py); x.lineTo(px + g, py); x.stroke(); }
      dot(x, px, py, v > 0.96 ? 4.5 : 2, v > 0.96 ? `rgba(${AM},.95)` : `rgba(${LV},${0.25 + R() * 0.4})`);
      if (v > 0.96) { S(AM, 0.6, 1.5); x.beginPath(); x.arc(px, py, 10, 0, Math.PI * 2); x.stroke(); }
    }
  },
  cards(x, w, h, _R, S) {
    const cw = Math.min(w * 0.5, h * 0.9), ch = cw * 0.63;
    ([[-14, -0.12, 0.5], [-4, 0, 0.8], [8, 0.12, 1]] as const).forEach(([rot, dx, a], i) => {
      x.save();
      x.translate(w * (0.52 + dx), h * (0.5 + dx * 0.4));
      x.rotate((rot * Math.PI) / 180);
      x.shadowColor = 'rgba(157,68,150,.9)';
      x.shadowBlur = 24;
      S(i === 2 ? LV : OR, a, 1.6);
      rr(x, -cw / 2, -ch / 2, cw, ch, cw * 0.06);
      x.stroke();
      x.restore();
    });
  },
  rays(x, w, h, R, S) {
    const cx = w * 0.55, cy = h * 0.5, m = Math.min(w, h);
    for (let i = 0; i < 110; i++) {
      const a = (i / 110) * Math.PI * 2 + R() * 0.03, l = m * (0.12 + R() * 0.5);
      S(i % 7 ? OR : LV, 0.15 + R() * 0.35, 1);
      x.beginPath();
      x.moveTo(cx + Math.cos(a) * m * 0.08, cy + Math.sin(a) * m * 0.08);
      x.lineTo(cx + Math.cos(a) * l, cy + Math.sin(a) * l);
      x.stroke();
      dot(x, cx + Math.cos(a) * l, cy + Math.sin(a) * l, 1.6, `rgba(${LV},.8)`);
    }
    glow(x, cx, cy, m * 0.18);
  },
  mesh(x, w, h, R, S) {
    const n = Math.round((w * h) / 9000) + 24, p: [number, number][] = [];
    for (let i = 0; i < n; i++) p.push([R() * w, R() * h]);
    const D = Math.min(w, h) * 0.3;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      const d = Math.hypot(p[i][0] - p[j][0], p[i][1] - p[j][1]);
      if (d < D) { S(OR, (1 - d / D) * 0.45, 1); x.beginPath(); x.moveTo(p[i][0], p[i][1]); x.lineTo(p[j][0], p[j][1]); x.stroke(); }
    }
    p.forEach((q) => dot(x, q[0], q[1], R() * 2 + 1.2, `rgba(${LV},.85)`));
  },
  rise(x, w, h, R, S) {
    const n = Math.round(w / 9), pts: [number, number][] = [];
    for (let i = 0; i < n; i++) {
      const t = i / n, xx = t * w, top = h - h * (0.12 + 0.72 * Math.pow(t, 1.7)) * (0.9 + R() * 0.2);
      S(i % 4 ? OR : LV, 0.2 + t * 0.5, 1.2);
      x.beginPath(); x.moveTo(xx, h); x.lineTo(xx, top); x.stroke();
      pts.push([xx, top]);
    }
    S(LV, 0.9, 2);
    x.beginPath();
    pts.forEach((q, i) => (i ? x.lineTo(q[0], q[1]) : x.moveTo(q[0], q[1])));
    x.stroke();
    const e = pts[pts.length - 1];
    if (e) glow(x, e[0], e[1], Math.min(w, h) * 0.2);
  },
  orbit(x, w, h, R, S) {
    const cx = w * 0.6, cy = h * 0.5, r = Math.min(w, h) * 0.34;
    for (let i = 0; i < 14; i++) { S(OR, 0.35, 1); x.beginPath(); x.ellipse(cx, cy, r * Math.abs(Math.cos((i / 14) * Math.PI)), r, 0, 0, Math.PI * 2); x.stroke(); }
    for (let i = 1; i < 8; i++) { const yy = -r + (i * r) / 4; S(OR, 0.3, 1); x.beginPath(); x.ellipse(cx, cy + yy, Math.sqrt(Math.max(0, r * r - yy * yy)), r * 0.08, 0, 0, Math.PI * 2); x.stroke(); }
    ([[1.6, 0.35, -0.3], [1.9, 0.28, 0.4], [1.35, 0.5, 0.9]] as const).forEach(([k, s, rot]) => {
      S(LV, 0.6, 1.4); x.beginPath(); x.ellipse(cx, cy, r * k, r * s, rot, 0, Math.PI * 2); x.stroke();
      const a = R() * 7;
      dot(x, cx + Math.cos(a) * r * k * Math.cos(rot) - Math.sin(a) * r * s * Math.sin(rot), cy + Math.cos(a) * r * k * Math.sin(rot) + Math.sin(a) * r * s * Math.cos(rot), 3, '#fff');
    });
    glow(x, cx, cy, r * 0.6);
  },
  branch(x, w, h, R, S) {
    const go = (x0: number, y0: number, a: number, l: number, d: number) => {
      const x1 = x0 + Math.cos(a) * l, y1 = y0 + Math.sin(a) * l;
      S(d < 3 ? LV : OR, 0.75 - d * 0.08, Math.max(0.8, 3 - d * 0.4));
      x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.stroke();
      if (d < 7) { go(x1, y1, a - 0.28 - R() * 0.22, l * 0.76, d + 1); go(x1, y1, a + 0.28 + R() * 0.22, l * 0.76, d + 1); }
      else dot(x, x1, y1, 1.8, `rgba(${LV},.9)`);
    };
    go(w * 0.06, h * 0.5, 0, w * 0.2, 0);
    glow(x, w * 0.06, h * 0.5, Math.min(w, h) * 0.15);
  },
  bridge(x, w, h, R, S) {
    const A: [number, number][] = [], B: [number, number][] = [];
    for (let i = 0; i < 34; i++) { A.push([w * 0.2 + (R() - 0.5) * w * 0.22, h * 0.5 + (R() - 0.5) * h * 0.6]); B.push([w * 0.8 + (R() - 0.5) * w * 0.22, h * 0.5 + (R() - 0.5) * h * 0.6]); }
    for (let i = 0; i < 40; i++) {
      const a = A[(R() * A.length) | 0], b = B[(R() * B.length) | 0];
      S(i % 4 ? OR : LV, 0.18 + R() * 0.3, 1);
      x.beginPath(); x.moveTo(a[0], a[1]); x.quadraticCurveTo(w / 2, Math.min(a[1], b[1]) - h * 0.35, b[0], b[1]); x.stroke();
    }
    [...A, ...B].forEach((q) => dot(x, q[0], q[1], 2, `rgba(${LV},.85)`));
    glow(x, w * 0.2, h * 0.5, w * 0.12);
    glow(x, w * 0.8, h * 0.5, w * 0.12);
  },
  blocks(x, w, h, R, S) {
    const c = Math.max(5, Math.round(w / 70)), s = w / c, rows = Math.ceil(h / s);
    for (let r = 0; r < rows; r++) for (let k = 0; k < c; k++) {
      const v = R(), px = k * s + s * 0.12, py = r * s + s * 0.12, z = s * 0.76;
      if (v > 0.72) { x.fillStyle = `rgba(${OR},${0.18 + R() * 0.3})`; rr(x, px, py, z, z, 6); x.fill(); }
      S(v > 0.9 ? LV : OR, v > 0.9 ? 0.9 : 0.28, v > 0.9 ? 2 : 1);
      rr(x, px, py, z, z, 6); x.stroke();
    }
  },
  dots(x, w, h, R) {
    const g = 14, ph = R() * 6;
    for (let yy = g / 2; yy < h; yy += g) for (let xx = g / 2; xx < w; xx += g) {
      const v = (Math.sin(xx * 0.018 + ph) + Math.sin(yy * 0.022 - ph) + Math.sin((xx + yy) * 0.01)) / 3;
      const r = Math.max(0, v) * 5.2;
      if (r < 0.3) continue;
      dot(x, xx, yy, r, `rgba(${v > 0.6 ? LV : OR},${0.35 + v * 0.5})`);
    }
  },
  rings(x, w, h, R, S) {
    const cx = w * (0.3 + R() * 0.4), cy = h * (0.4 + R() * 0.2);
    for (let i = 1; i < 38; i++) {
      S(i % 6 ? OR : LV, 0.1 + (i % 6 ? 0 : 0.4) + R() * 0.12, i % 6 ? 1 : 1.8);
      x.beginPath(); x.arc(cx, cy, (i * Math.max(w, h)) / 34, R() * 0.5, Math.PI * 2 - R() * 0.8); x.stroke();
    }
    glow(x, cx, cy, Math.min(w, h) * 0.16);
  },
};

/** The logo's circuit traces ending in ring nodes. */
function nodes(x: Ctx, w: number, h: number, R: Rand) {
  const n = 3 + ((R() * 3) | 0);
  for (let i = 0; i < n; i++) {
    const ex = R() < 0.5 ? R() * w * 0.35 : w * 0.65 + R() * w * 0.35, ey = R() * h, len = 30 + R() * 70;
    const dir = R() < 0.5 ? 1 : -1, dx = ex + dir * len, dy = ey + (R() < 0.5 ? -1 : 1) * len * 0.5;
    x.strokeStyle = 'rgba(199,146,200,.55)'; x.lineWidth = 2;
    x.beginPath(); x.moveTo(ex, ey); x.lineTo(ex + dir * len * 0.5, ey); x.lineTo(dx, dy); x.stroke();
    dot(x, dx, dy, 6.5, 'rgba(18,6,31,.9)');
    x.strokeStyle = 'rgba(235,216,235,.95)'; x.lineWidth = 2.4;
    x.beginPath(); x.arc(dx, dy, 6.5, 0, Math.PI * 2); x.stroke();
  }
}

export function paintArt(canvas: HTMLCanvasElement, kind: ArtKind, seed: number) {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (!w || !h) return;
  const d = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = w * d;
  canvas.height = h * d;
  const x = canvas.getContext('2d');
  if (!x) return;
  x.setTransform(d, 0, 0, d, 0, 0);
  const R = rng(seed);
  const bg = x.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#12061F'); bg.addColorStop(0.55, '#2A1047'); bg.addColorStop(1, '#5D2E8E');
  x.fillStyle = bg; x.fillRect(0, 0, w, h);
  const gl = x.createRadialGradient(w * 0.75, h * 0.3, 0, w * 0.75, h * 0.3, Math.max(w, h) * 0.75);
  gl.addColorStop(0, 'rgba(157,68,150,.42)'); gl.addColorStop(1, 'rgba(157,68,150,0)');
  x.fillStyle = gl; x.fillRect(0, 0, w, h);
  x.globalCompositeOperation = 'lighter';
  x.lineCap = 'round';
  const S: Stroke = (c, a, lw = 1) => { x.strokeStyle = `rgba(${c},${a})`; x.lineWidth = lw; };
  KINDS[kind](x, w, h, R, S);
  nodes(x, w, h, R);
  x.globalCompositeOperation = 'source-over';
}
