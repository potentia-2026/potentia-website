'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { BIZ_PRODUCTS } from '@/content/business';
import { prefillForm } from '@/lib/events';
import { ProductMark, PRODUCT_ACCENT } from '@/components/shared/ProductMark';

const DURATION = 6000;

/**
 * Potentia Campus, Spark and Hive, one slide at a time, with three dots.
 * Auto-advances (the active dot fills as a timer), pauses on hover/focus,
 * supports arrows, keyboard arrows and swipe. Static for reduced-motion users.
 */
export function ProductSlider() {
  const [i, setI] = useState(0);
  const [cycle, setCycle] = useState(0);
  const dots = useRef<(HTMLButtonElement | null)[]>([]);
  const startX = useRef<number | null>(null);
  const n = BIZ_PRODUCTS.length;

  const go = useCallback((k: number, focus = false) => {
    const next = (k + n) % n;
    setI(next);
    setCycle((c) => c + 1);
    if (focus) dots.current[next]?.focus();
  }, [n]);

  return (
    <div className="group/slider relative" role="region" aria-roledescription="carousel" aria-label="Business Automation products">
      <div
        className="touch-pan-y overflow-hidden bg-ink"
        onPointerDown={(e) => { startX.current = e.clientX; }}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
        }}
      >
        <div className="flex transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]" style={{ transform: `translateX(-${i * 100}%)` }}>
          {BIZ_PRODUCTS.map((p, k) => {
            const active = k === i;
            const accent = PRODUCT_ACCENT[p.key];
            return (
              <article
                key={p.key}
                role="group"
                aria-roledescription="slide"
                aria-label={`${k + 1} of ${n}: Potentia ${p.name}`}
                aria-hidden={!active}
                className="grid flex-[0_0_100%] bg-ink text-white md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-[1400/1217]">
                  <Image src={p.slideImg} alt={p.slideAlt} fill priority={k === 0} sizes="(min-width:768px) 55vw, 100vw" className="select-none object-cover" draggable={false} />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,8,38,0)_70%,rgba(21,8,38,.85)_100%)] md:bg-[linear-gradient(90deg,rgba(21,8,38,0)_70%,rgba(21,8,38,.85)_100%)]" />
                </div>
                <div className="relative flex min-w-0 flex-col justify-center gap-3.5 overflow-hidden p-[clamp(24px,4vw,56px)]">
                  <span aria-hidden="true" className="pointer-events-none absolute -right-[30%] -top-[30%] h-[90%] w-[90%] opacity-55" style={{ background: `radial-gradient(circle, ${accent.glow} 0%, transparent 65%)` }} />
                  <div className="relative flex flex-col gap-3.5">
                    <ProductMark product={p.key} name={p.name} size="lg" dark />
                    <span className="text-[0.74rem] font-bold uppercase tracking-[0.14em] text-lavender">{p.kind}</span>
                    <h3 className="text-[clamp(1.5rem,2.8vw,2.3rem)] leading-[1.1]">{p.headline}</h3>
                    <p className="text-[#DCCBE2]">{p.text}</p>
                    <ul className="mb-1.5 mt-0.5 flex flex-col gap-2">
                      {p.points.map((pt) => (
                        <li key={pt} className="relative flex items-start gap-2.5 text-[0.95rem] text-[#EDE2F1]">
                          <span aria-hidden="true" className="relative mt-0.5 h-[18px] w-[18px] shrink-0 rounded-full after:absolute after:left-[5px] after:top-[5px] after:h-1 after:w-2 after:-rotate-45 after:border-b-2 after:border-l-2 after:border-white" style={{ background: accent.gradient }} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <div className="on-dark flex flex-wrap items-center gap-3.5">
                      <a href="#demo" tabIndex={active ? 0 : -1} onClick={() => prefillForm({ interest: p.formValue })} className="btn">Book a demo</a>
                      <a href={`#${p.key}`} tabIndex={active ? 0 : -1} className="tlink">Explore {p.name} <span className="ar">→</span></a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div
        className="flex justify-center border-b border-line py-[18px]"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1, true); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1, true); }
        }}
      >
        <div className="flex items-center gap-2.5 md:gap-4">
          <button type="button" aria-label="Previous product" onClick={() => go(i - 1)} className="h-[38px] w-[38px] border-[1.5px] border-fg hover:bg-fg hover:text-white md:h-11 md:w-11">←</button>
          <div role="tablist" aria-label="Choose a product" className="flex gap-2.5">
            {BIZ_PRODUCTS.map((p, k) => (
              <button
                key={p.key}
                ref={(el) => { dots.current[k] = el; }}
                type="button"
                role="tab"
                aria-selected={k === i}
                aria-label={`Potentia ${p.name}`}
                tabIndex={k === i ? 0 : -1}
                onClick={() => go(k)}
                className={`relative h-3 overflow-hidden rounded-full transition-all duration-300 ${k === i ? 'w-[54px] bg-[#E2D2E6]' : 'w-3 bg-line'}`}
              >
                {k === i && (
                  <i
                    key={cycle}
                    onAnimationEnd={() => go(i + 1)}
                    className="absolute inset-y-0 left-0 w-0 bg-brand group-focus-within/slider:[animation-play-state:paused] group-hover/slider:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none"
                    style={{ animation: `slprog ${DURATION}ms linear forwards` }}
                  />
                )}
              </button>
            ))}
          </div>
          <button type="button" aria-label="Next product" onClick={() => go(i + 1)} className="h-[38px] w-[38px] border-[1.5px] border-fg hover:bg-fg hover:text-white md:h-11 md:w-11">→</button>
        </div>
      </div>
    </div>
  );
}
