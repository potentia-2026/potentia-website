import { VALUES } from '@/content/site';

export function Values({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`flex flex-wrap border ${dark ? 'border-ink-line' : 'border-line'}`} aria-label="Our values, ICE cubed">
      {VALUES.map((v) => (
        <span key={v} className={`flex flex-1 basis-[150px] flex-col gap-1 border-r p-5 text-lg font-extrabold last:border-r-0 ${dark ? 'border-ink-line' : 'border-line'}`}>
          <em className={`text-[0.72rem] font-bold not-italic tracking-[0.1em] ${dark ? 'text-lavender' : 'text-magenta'}`}>{v[0]}</em>
          {v}
        </span>
      ))}
    </div>
  );
}
