'use client';

import { useEffect, useRef, useState } from 'react';
import { PRODUCTS } from '@/content/banking';
import { PRODUCT_EVENT } from '@/lib/events';
import { ActionLink } from '@/components/ui/ActionLink';
import { LiveScreen } from './LiveScreen';

export function ProductSwitcher() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const onSelect = (e: Event) => setActive((e as CustomEvent<number>).detail);
    window.addEventListener(PRODUCT_EVENT, onSelect);
    return () => window.removeEventListener(PRODUCT_EVENT, onSelect);
  }, []);

  const move = (i: number) => { setActive(i); tabs.current[i]?.focus(); };
  const p = PRODUCTS[active];

  return (
    <div className="grid gap-7">
      <div role="tablist" aria-label="Products" className="flex overflow-x-auto border-b border-line"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); move((active + 1) % PRODUCTS.length); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); move((active + PRODUCTS.length - 1) % PRODUCTS.length); }
        }}>
        {PRODUCTS.map((x, i) => (
          <button
            key={x.name}
            ref={(el) => { tabs.current[i] = el; }}
            role="tab"
            id={`ptab-${i}`}
            aria-selected={i === active}
            aria-controls="ppanel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`-mb-px flex-[1_0_auto] whitespace-nowrap border-b-[3px] px-[18px] pb-3.5 pt-4 text-left text-[1.05rem] font-bold ${i === active ? 'border-magenta text-fg' : 'border-transparent text-muted'}`}
          >
            {x.name}
            <small className={`mt-1 block font-mono text-[0.78rem] font-medium ${i === active ? 'text-magenta' : ''}`}>{x.brand}</small>
          </button>
        ))}
      </div>

      <div id="ppanel" role="tabpanel" aria-labelledby={`ptab-${active}`} className="grid items-center gap-x-[clamp(24px,4vw,56px)] gap-y-3.5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="self-start lg:row-span-6"><LiveScreen key={active} index={active} /></div>
        <span className="tag self-end">{p.brand}</span>
        <h3 className="text-[clamp(1.6rem,3vw,2.2rem)]">{p.name}</h3>
        <p className="max-w-[58ch] text-[1.08rem] text-muted">{p.desc}</p>
        <div className="flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
        <ActionLink href="#book" interest={p.name} className="tlink">Book a {p.name} demo <span className="ar">→</span></ActionLink>
      </div>
    </div>
  );
}
