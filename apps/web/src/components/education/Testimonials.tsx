'use client';

import { useCallback, useRef, useState } from 'react';
import { TESTIMONIALS } from '@/content/education';

const GRADIENTS = [
  'linear-gradient(135deg,#5D2E8E,#9D4496)',
  'linear-gradient(135deg,#9D4496,#D2569C)',
  'linear-gradient(135deg,#3E2470,#6A2FA8)',
  'linear-gradient(135deg,#6E3FA3,#C792C8)',
];

/**
 * Testimonials as horizontally cascading cards (same pattern as the markets cascade).
 * The open card fills a progress bar, then hands over to the next; hovering or focusing pauses it.
 */
export function Testimonials() {
  const [active, setActive] = useState(0);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const n = TESTIMONIALS.length;

  const go = useCallback((i: number, focus = false) => {
    const k = (i + n) % n;
    setActive(k);
    if (focus) cards.current[k]?.focus();
  }, [n]);

  return (
    <div id="testimonials">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <span className="label">Testimonials</span>
          <h2>What families, students and schools say</h2>
        </div>
        <div className="flex gap-2.5">
          <button type="button" aria-label="Previous testimonial" onClick={() => go(active - 1)} className="h-12 w-12 border-[1.5px] border-fg text-xl hover:bg-fg hover:text-white">←</button>
          <button type="button" aria-label="Next testimonial" onClick={() => go(active + 1)} className="h-12 w-12 border-[1.5px] border-fg text-xl hover:bg-fg hover:text-white">→</button>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Testimonials"
        className="group/casc flex flex-col md:h-[470px] md:flex-row md:pl-0.5"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(active + 1, true); }
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(active - 1, true); }
        }}
      >
        {TESTIMONIALS.map((t, i) => {
          const on = i === active;
          const g = GRADIENTS[i % GRADIENTS.length];
          return (
            <article
              key={t.name + i}
              ref={(el) => { cards.current[i] = el; }}
              role="tab"
              aria-selected={on}
              aria-label={`Testimonial from ${t.name}`}
              tabIndex={on ? 0 : -1}
              onClick={() => { if (!on) go(i); }}
              onFocus={() => { if (!on) go(i); }}
              onMouseEnter={() => { if (!on && window.matchMedia('(hover:hover)').matches) go(i); }}
              className={[
                'relative min-w-0 cursor-pointer overflow-hidden rounded-2xl text-white outline-none',
                'bg-[linear-gradient(165deg,#2E1250_0%,#1A0A2E_55%,#12061F_100%)]',
                'shadow-[0_-14px_26px_-14px_rgba(10,3,20,.7),inset_0_1px_0_rgba(199,146,200,.22)] md:shadow-[-20px_0_34px_-16px_rgba(10,3,20,.75),inset_1px_0_0_rgba(199,146,200,.22)]',
                'transition-[flex-grow,height,transform] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] focus-visible:shadow-[inset_0_0_0_3px_#C792C8]',
                i ? '-mt-3 md:-ml-4 md:mt-0' : '',
                on ? 'min-h-[420px] pb-[22px] md:h-auto md:min-h-0 md:flex-[6.2_1_0%] md:pb-0' : 'h-[84px] md:h-auto md:flex-[1_1_0%] md:hover:-translate-y-2',
              ].join(' ')}
            >
              {/* gradient band with a quotation mark */}
              <div aria-hidden="true" className={`absolute left-0 top-0 transition-all duration-700 ${on ? 'h-[140px] w-full md:h-[34%]' : 'h-full w-[118px] md:h-[150px] md:w-full'}`} style={{ background: g }}>
                <span className={`absolute font-extrabold leading-none text-white/30 transition-all duration-500 ${on ? 'left-[34px] top-1/2 -translate-y-[40%] text-[9rem]' : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-[46%] text-[4rem] md:text-[7rem]'}`}>“</span>
                <span className={`absolute inset-0 ${on ? 'bg-[linear-gradient(180deg,rgba(26,10,46,.05)_0%,rgba(26,10,46,.5)_60%,#1A0A2E_100%)]' : 'bg-[linear-gradient(90deg,rgba(26,10,46,0)_40%,#1D0B33_100%)] md:bg-[linear-gradient(180deg,rgba(26,10,46,0)_35%,#1D0B33_100%)]'}`} />
              </div>

              {/* initials: label when closed, outlined watermark when open */}
              <span aria-hidden="true" className={`absolute whitespace-nowrap font-extrabold transition-all duration-500 ${on ? 'right-[22px] top-3.5 text-[clamp(4rem,9vw,8rem)] tracking-[-0.03em] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,.55)]' : 'right-[18px] top-7 text-[1.3rem] md:left-1/2 md:right-auto md:top-[166px] md:-translate-x-1/2 md:text-2xl'}`}>
                {t.initials}
              </span>

              {/* name: vertical when closed on desktop */}
              <span aria-hidden="true" className={`absolute left-[134px] top-[31px] max-w-[calc(100%-200px)] truncate whitespace-nowrap text-[1.02rem] font-bold tracking-[0.06em] text-[#E9DDEE] transition-opacity md:bottom-[30px] md:left-1/2 md:top-auto md:max-w-none md:-translate-x-1/2 md:rotate-180 md:writing-vertical ${on ? 'opacity-0' : ''}`}>
                {t.name}
              </span>

              {/* quote */}
              <figure className={`m-0 flex flex-col gap-3 ${on ? 'relative mx-5 mt-[150px] opacity-100 transition-all delay-300 duration-500 md:absolute md:bottom-7 md:left-[30px] md:m-0 md:w-[600px] md:max-w-[calc(100%-60px)]' : 'pointer-events-none absolute translate-y-4 opacity-0 transition-all duration-200'}`}>
                <span className="tag !text-lavender">{t.role}</span>
                <blockquote className="m-0 text-[clamp(1.05rem,1.7vw,1.3rem)] font-semibold leading-normal">“{t.quote}”</blockquote>
                <figcaption className="mt-1 flex items-center gap-3">
                  <i aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[0.95rem] font-extrabold not-italic shadow-[0_0_0_2px_rgba(255,255,255,.25)]" style={{ background: g }}>{t.initials}</i>
                  <span><b className="block font-bold">{t.name}</b><span className="text-[0.86rem] text-ink-muted">{t.role}</span></span>
                </figcaption>
              </figure>

              {on && (
                <i aria-hidden="true" onAnimationEnd={() => go(i + 1)} className="absolute bottom-0 left-0 h-[3px] w-0 animate-ccprog bg-brand group-focus-within/casc:[animation-play-state:paused] group-hover/casc:[animation-play-state:paused] motion-reduce:hidden" />
              )}
            </article>
          );
        })}
      </div>
      <p className="mt-3.5 text-[0.86rem] text-muted">Hover or tap a card to read it. Cards move on by themselves; hovering pauses them.</p>
    </div>
  );
}
