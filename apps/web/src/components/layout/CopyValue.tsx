'use client';

import { useState } from 'react';

interface Props { label: string; value: string; href?: string; dark?: boolean }

export function CopyValue({ label, value, href, dark = false }: Props) {
  const [state, setState] = useState<'idle' | 'copied'>('idle');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState('copied');
      setTimeout(() => setState('idle'), 1500);
    } catch {
      /* clipboard unavailable: the value stays selectable */
    }
  };
  return (
    <div className="flex flex-col gap-0.5">
      <dt className={`text-[0.7rem] font-bold uppercase tracking-[0.14em] ${dark ? 'text-ink-muted' : 'text-muted'}`}>{label}</dt>
      <dd className="flex flex-wrap items-center gap-2.5">
        {href ? <a href={href} className={dark ? 'text-white hover:text-lavender' : 'hover:text-magenta'}>{value}</a> : <span className={dark ? 'text-white' : ''}>{value}</span>}
        {label !== 'Web' && (
          <button type="button" onClick={copy} className={`border px-2.5 py-1 text-[0.74rem] font-semibold ${dark ? 'border-ink-line text-lavender-light' : 'border-line text-magenta'}`}>
            {state === 'copied' ? 'Copied' : 'Copy'}
          </button>
        )}
      </dd>
    </div>
  );
}
