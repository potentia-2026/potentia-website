export type ProductKey = 'campus' | 'spark' | 'hive' | 'consult' | 'pulse' | 'vibe' | 'link' | 'admissions';

/** Each product's accent, kept inside the brand palette. */
export const PRODUCT_ACCENT: Record<ProductKey, { gradient: string; glow: string }> = {
  campus: { gradient: 'linear-gradient(135deg,#5D2E8E,#8247B8)', glow: 'rgba(130,71,184,.55)' },
  spark: { gradient: 'linear-gradient(135deg,#9D4496,#D2569C)', glow: 'rgba(210,86,156,.5)' },
  hive: { gradient: 'linear-gradient(135deg,#6E3FA3,#C792C8)', glow: 'rgba(199,146,200,.5)' },
  consult: { gradient: 'linear-gradient(135deg,#3B2A6E,#5D2E8E)', glow: 'rgba(93,46,142,.5)' },
  pulse: { gradient: 'linear-gradient(135deg,#9D4496,#D2569C)', glow: 'rgba(210,86,156,.5)' },
  vibe: { gradient: 'linear-gradient(135deg,#6A2FA8,#A35BD6)', glow: 'rgba(163,91,214,.5)' },
  link: { gradient: 'linear-gradient(135deg,#3E2470,#5D2E8E)', glow: 'rgba(93,46,142,.5)' },
  admissions: { gradient: 'linear-gradient(135deg,#6E3FA3,#C792C8)', glow: 'rgba(199,146,200,.5)' },
};

const ICONS: Record<ProductKey, JSX.Element> = {
  campus: <><path d="M2.5 9.5 12 4.5l9.5 5-9.5 5z" /><path d="M6.5 11.6v4.6c3.2 2.3 7.8 2.3 11 0v-4.6" /><path d="M21.5 9.5v5.5" /></>,
  spark: <><path d="M11 3.5c.7 4.6 2.8 6.7 7.4 7.4-4.6.7-6.7 2.8-7.4 7.4-.7-4.6-2.8-6.7-7.4-7.4 4.6-.7 6.7-2.8 7.4-7.4z" /><path d="M19 3v3.4M17.3 4.7h3.4" /></>,
  hive: <><path d="M8.00 3.90 L11.72 6.05 L11.72 10.35 L8.00 12.50 L4.28 10.35 L4.28 6.05Z" /><path d="M15.50 3.90 L19.22 6.05 L19.22 10.35 L15.50 12.50 L11.78 10.35 L11.78 6.05Z" /><path d="M11.75 10.40 L15.47 12.55 L15.47 16.85 L11.75 19.00 L8.03 16.85 L8.03 12.55Z" /></>,
  consult: <><path d="M3.5 5h11v8H8l-4.5 3.5z" /><path d="M14.5 9h6v8.5L17 15h-5.5v-2" /></>,
  pulse: <path d="M2.5 12h4.2l2.1-5.2 4.3 10.4 2.2-5.2h6.2" />,
  vibe: <><circle cx="12" cy="12" r="8.5" /><path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1z" /></>,
  link: <><path d="M10 14a4 4 0 0 0 5.6 0l2.8-2.8a4 4 0 0 0-5.6-5.6l-1.2 1.2" /><path d="M14 10a4 4 0 0 0-5.6 0l-2.8 2.8a4 4 0 0 0 5.6 5.6l1.2-1.2" /></>,
  admissions: <><path d="M3 9.5 12 5l9 4.5" /><path d="M5.5 10.5v6.5M9.8 10.5v6.5M14.2 10.5v6.5M18.5 10.5v6.5" /><path d="M3 19.5h18" /></>,
};

interface Props { product: ProductKey; name: string; kicker?: string; size?: 'sm' | 'md' | 'lg'; dark?: boolean }

const SIZES = { sm: ['h-10 w-10 rounded-xl', 'h-[22px] w-[22px]', 'text-[1.12rem]'], md: ['h-11 w-11 rounded-xl', 'h-6 w-6', 'text-[1.3rem]'], lg: ['h-[52px] w-[52px] rounded-[14px]', 'h-7 w-7', 'text-2xl'] } as const;

/** Product identity: gradient icon tile + "Potentia" kicker + product name. */
export function ProductMark({ product, name, kicker = 'Potentia', size = 'md', dark = false }: Props) {
  const [tile, icon, text] = SIZES[size];
  const a = PRODUCT_ACCENT[product];
  return (
    <span className="inline-flex items-center gap-3">
      <span className={`grid shrink-0 place-items-center text-white ${tile}`} style={{ background: a.gradient, boxShadow: `0 10px 22px -12px ${a.glow}` }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={icon} aria-hidden="true">{ICONS[product]}</svg>
      </span>
      <span className="flex flex-col leading-[1.05]">
        <small className={`text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${dark ? 'text-ink-muted' : 'text-muted'}`}>{kicker}</small>
        <b className={`font-extrabold tracking-[-0.02em] ${text} ${dark ? 'text-white' : 'text-fg'}`}>{name}</b>
      </span>
    </span>
  );
}
