'use client';

import { useMemo, useState } from 'react';
import { UNIVERSITIES } from '@/content/universities';
import { COUNTRY_FLAGS } from '@/components/banking/Flags';

function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q);
  if (i < 0) return <>{text}</>;
  return <>{text.slice(0, i)}<mark className="bg-lavender-light text-fg">{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>;
}

export function UniversityFinder() {
  const keys = Object.keys(UNIVERSITIES);
  const [country, setCountry] = useState(keys[0]);
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const c = UNIVERSITIES[country];

  const { degree, groups, pathCount } = useMemo(() => {
    const f = (a: string[]) => a.filter((s) => !q || s.toLowerCase().includes(q));
    const gs = c.path.map(([via, list]) => [via, f(list)] as const).filter(([, l]) => l.length);
    return { degree: f(c.degree), groups: gs, pathCount: gs.reduce((n, [, l]) => n + l.length, 0) };
  }, [c, q]);

  return (
    <div className="flex flex-col gap-[18px] border border-line bg-white p-[clamp(18px,3vw,32px)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Country" className="flex max-w-full gap-1.5 overflow-x-auto">
          {keys.map((k) => (
            <button key={k} role="tab" aria-selected={k === country} onClick={() => setCountry(k)}
              className={`inline-flex items-center gap-2 whitespace-nowrap border-[1.5px] px-3.5 py-2.5 text-[0.88rem] font-semibold ${k === country ? 'border-fg bg-fg text-white' : 'border-line bg-white'}`}>
              {COUNTRY_FLAGS[k] && <span aria-hidden="true" className={`block h-[15px] w-[22px] shrink-0 overflow-hidden rounded-[2px] [&>svg]:block [&>svg]:h-full [&>svg]:w-full ${k === country ? 'shadow-[0_0_0_1.5px_rgba(255,255,255,.8)]' : 'shadow-[0_0_0_1px_rgba(22,9,31,.15)]'}`}>{COUNTRY_FLAGS[k]}</span>}
              {UNIVERSITIES[k].n}
            </button>
          ))}
        </div>
        <label className="flex min-w-0 max-w-[340px] flex-[1_1_220px] items-center gap-2 border-[1.5px] border-line px-3.5 py-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search universities" aria-label="Search universities" className="w-full min-w-0 bg-transparent outline-none" />
        </label>
      </div>
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div className="min-w-0">
          <h4 className="mb-2.5 text-[0.74rem] font-bold uppercase tracking-[0.12em] text-muted">Undergraduate and postgraduate · {degree.length}</h4>
          {degree.length ? (
            <ul className="columns-[220px_2] gap-7">{degree.map((s) => <li key={s} className="break-inside-avoid border-b border-line py-1.5 text-[0.92rem]"><Highlight text={s} q={q} /></li>)}</ul>
          ) : <p className="text-muted">No matches in this country.</p>}
        </div>
        <div className="min-w-0">
          <h4 className="mb-2.5 text-[0.74rem] font-bold uppercase tracking-[0.12em] text-muted">Pathway programmes · {pathCount}</h4>
          {!c.path.length ? <p className="text-muted">Direct entry to undergraduate and postgraduate programmes.</p>
            : !groups.length ? <p className="text-muted">No matches in this country.</p>
            : groups.map(([via, list]) => (
              <div key={via}>
                <p className="mb-1.5 mt-4 text-[0.84rem] font-bold text-magenta first:mt-0">{via}</p>
                <ul className="columns-[220px_2] gap-7">{list.map((s) => <li key={s} className="break-inside-avoid border-b border-line py-1.5 text-[0.92rem]"><Highlight text={s} q={q} /></li>)}</ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
