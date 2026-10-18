'use client';

import { useCallback, useRef, useState } from 'react';
import { MARKETS } from '@/content/banking';
import { FLAGS } from './Flags';
import { GenArt } from '@/components/ui/GenArt';
import { ActionLink } from '@/components/ui/ActionLink';

const KIND_LABEL = { gcc: 'GCC market', expansion: 'Expansion', beyond: 'Beyond the region' } as const;

/**
 * Horizontally cascading market cards. The open card fills a progress bar,
 * then hands over to the next market; hovering or focusing pauses it.
 */
export function MarketsCascade() {
  const [active, setActive] = useState(0);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const n = MARKETS.length;

  const go = useCallback((i: number, focus = false) => {
    const k = (i + n) % n;
    setActive(k);
    if (focus) cards.current[k]?.focus();
  }, [n]);

  return (
    <div>
      <div className="mb-5 flex justify-end gap-2.5">
        <button type="button" aria-label="Previous market" onClick={() => go(active - 1)} className="h-12 w-12 border-[1.5px] border-fg text-xl hover:bg-fg hover:text-white">←</button>
        <button type="button" aria-label="Next market" onClick={() => go(active + 1)} className="h-12 w-12 border-[1.5px] border-fg text-xl hover:bg-fg hover:text-white">→</button>
      </div>

      <div
        role="tablist"
        aria-label="Markets"
        className="group/casc flex flex-col md:h-[460px] md:flex-row md:pl-0.5"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(active + 1, true); }
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(active - 1, true); }
        }}
      >
        {MARKETS.map((m, i) => {
          const on = i === active;
          const Flag = FLAGS[m.code];
          return (
            <article
              key={m.code}
              ref={(el) => { cards.current[i] = el; }}
              role="tab"
              aria-selected={on}
              aria-label={m.name}
              tabIndex={on ? 0 : -1}
              onClick={() => go(i)}
              onFocus={() => go(i)}
              onMouseEnter={() => { if (window.matchMedia('(hover:hover)').matches) go(i); }}
              className={[
                'relative min-w-0 cursor-pointer overflow-hidden rounded-2xl text-white outline-none',
                'bg-[linear-gradient(165deg,#2E1250_0%,#1A0A2E_55%,#12061F_100%)]',
                'shadow-[0_-14px_26px_-14px_rgba(10,3,20,.7),inset_0_1px_0_rgba(199,146,200,.22)] md:shadow-[-20px_0_34px_-16px_rgba(10,3,20,.75),inset_1px_0_0_rgba(199,146,200,.22)]',
                'transition-[flex-grow,height,transform] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] focus-visible:shadow-[inset_0_0_0_3px_#C792C8]',
                i ? '-mt-3 md:-ml-4 md:mt-0' : '',
                on ? 'h-[470px] md:h-auto md:flex-[6.2_1_0%]' : 'h-[84px] md:h-auto md:flex-[1_1_0%] md:hover:-translate-y-2',
              ].join(' ')}
            >
              {/* flag strip */}
              <div className={`absolute left-0 top-0 transition-all duration-700 ${on ? 'h-[40%] w-full md:h-[46%]' : 'h-full w-[118px] md:h-[150px] md:w-full'}`}>
                {Flag ? <Flag slice className="block h-full w-full" /> : <GenArt kind="orbit" seed={300 + i * 7} className="h-full w-full" />}
                <div className={`absolute inset-0 ${on ? 'bg-[linear-gradient(180deg,rgba(26,10,46,.15)_0%,rgba(26,10,46,.45)_55%,#1A0A2E_100%)]' : 'bg-[linear-gradient(90deg,rgba(26,10,46,0)_40%,#1D0B33_100%)] md:bg-[linear-gradient(180deg,rgba(26,10,46,0)_35%,#1D0B33_100%)]'}`} />
              </div>

              {/* code: small label when closed, outlined watermark when open */}
              <span
                aria-hidden="true"
                className={`absolute whitespace-nowrap font-extrabold transition-all duration-500 ${on ? 'right-[22px] top-3.5 text-[clamp(4rem,9vw,8rem)] tracking-[-0.03em] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,.55)]' : 'right-[18px] top-7 text-[1.3rem] md:left-1/2 md:right-auto md:top-[166px] md:-translate-x-1/2 md:text-2xl'}`}
              >
                {m.code}
              </span>

              {/* name: vertical when closed on desktop */}
              <span aria-hidden="true" className={`absolute whitespace-nowrap text-[1.02rem] font-bold tracking-[0.06em] text-[#E9DDEE] transition-opacity ${on ? 'opacity-0' : ''} left-[134px] top-[31px] md:bottom-[30px] md:left-1/2 md:top-auto md:-translate-x-1/2 md:rotate-180 md:writing-vertical`}>
                {m.name}
              </span>

              {/* details */}
              <div className={`absolute bottom-[22px] left-5 flex max-w-[calc(100%-40px)] flex-col gap-3 md:bottom-7 md:left-[30px] md:w-[520px] md:max-w-[calc(100%-60px)] ${on ? 'pointer-events-auto opacity-100 transition-all delay-300 duration-500' : 'pointer-events-none translate-y-4 opacity-0 transition-all duration-200'}`}>
                <div className="flex items-center gap-3.5">
                  {Flag && <Flag className="block h-auto w-16 rounded-[3px] shadow-[0_8px_18px_rgba(0,0,0,.45)]" title={`Flag of ${m.name}`} />}
                  <div>
                    <span className="tag !text-lavender">{KIND_LABEL[m.kind]}</span>
                    <h3 className="text-[clamp(1.5rem,2.6vw,2.1rem)]">{m.name}</h3>
                  </div>
                </div>
                <p className="text-[#DCCBE2]">{m.line}</p>
                <div className="flex flex-wrap gap-2">
                  {m.rails.map((r, k) => (
                    <span key={r} style={{ transitionDelay: on ? `${450 + k * 90}ms` : '0ms' }} className={`inline-flex items-center gap-[7px] border border-lavender/45 bg-royal/30 px-[11px] py-[7px] text-[0.8rem] font-semibold transition-all duration-500 ${on ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0'}`}>
                      <i className="h-[7px] w-[7px] animate-ping2 rounded-full bg-[#4ADE80]" />{r}
                    </span>
                  ))}
                </div>
                <ActionLink href="#book" country={m.name} className="tlink !text-white">Talk to us about {m.name} <span className="ar">→</span></ActionLink>
              </div>

              {/* auto-advance progress (pauses on hover/focus) */}
              {on && (
                <i
                  aria-hidden="true"
                  onAnimationEnd={() => go(i + 1)}
                  className="absolute bottom-0 left-0 h-[3px] w-0 bg-brand animate-ccprog group-focus-within/casc:[animation-play-state:paused] group-hover/casc:[animation-play-state:paused] motion-reduce:hidden"
                />
              )}
            </article>
          );
        })}
      </div>
      <p className="mt-3.5 text-[0.86rem] text-muted">Hover or tap a market to open it. Cards move on by themselves; hovering pauses them.</p>
    </div>
  );
}
