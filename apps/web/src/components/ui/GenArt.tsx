'use client';

import { useEffect, useRef } from 'react';
import { paintArt, type ArtKind } from '@/lib/genart';

interface Props {
  kind: ArtKind;
  seed: number;
  className?: string;
  /** Slow drift for hero backgrounds. */
  drift?: boolean;
  children?: React.ReactNode;
}

/** A brand visual slot. Swap for next/image when a real photo is supplied. */
export function GenArt({ kind, seed, className = '', drift = false, children }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let last = '';
    const draw = () => {
      const key = `${canvas.clientWidth}x${canvas.clientHeight}`;
      if (key === last) return;
      last = key;
      paintArt(canvas, kind, seed);
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [kind, seed]);

  return (
    <div className={`relative overflow-hidden bg-[#12062A] ${className}`} aria-hidden="true">
      <canvas ref={ref} className={`absolute inset-0 h-full w-full ${drift ? 'origin-[65%_50%] animate-drift' : 'transition-transform duration-700 group-hover:scale-105'}`} />
      {children}
    </div>
  );
}
