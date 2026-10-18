import { SECURITY } from '@/content/banking';

const ICONS: Record<(typeof SECURITY)[number]['icon'], JSX.Element> = {
  doc: <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h7M9 17h5" /></>,
  eyes: <><circle cx="8" cy="8" r="3" /><circle cx="16" cy="8" r="3" /><path d="M3 20c0-3 2.5-5 5-5s5 2 5 5M11 20c0-3 2.5-5 5-5s5 2 5 5" /></>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  sign: <><path d="M3 18c3 0 4-8 7-8s1 6 4 6 3-3 4-3 2 1 3 1" /><path d="M3 21h18" /></>,
  list: <><path d="M8 6h12M8 12h12M8 18h12" /><circle cx="4" cy="6" r="1" /><circle cx="4" cy="12" r="1" /><circle cx="4" cy="18" r="1" /></>,
  pulse: <path d="M2 12h4l3-7 4 14 3-7h6" />,
};

export function SecurityTiles() {
  return (
    <div className="grid gap-px border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-3">
      {SECURITY.map((s) => (
        <div key={s.title} className="flex flex-col gap-2 bg-ink p-[30px]">
          <svg viewBox="0 0 24 24" className="mb-2 h-[30px] w-[30px] fill-none stroke-lavender [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.6]" aria-hidden="true">{ICONS[s.icon]}</svg>
          <h3>{s.title}</h3>
          <p className="text-[0.95rem] text-ink-muted">{s.text}</p>
        </div>
      ))}
    </div>
  );
}
