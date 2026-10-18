import { Amiri } from 'next/font/google';

const amiri = Amiri({ subsets: ['arabic'], weight: '700', display: 'swap' });

const qatarPath = (() => {
  let d = 'M28 0 L7.8 0';
  for (let j = 1; j <= 18; j++) d += ` L${j % 2 ? 10.4 : 7.8} ${((j * 11) / 18).toFixed(3)}`;
  return `${d} L28 11Z`;
})();

const bahrainPath = (() => {
  let d = 'M5 0 L1.25 0';
  for (let j = 1; j <= 10; j++) d += ` L${j % 2 ? 2 : 1.25} ${(j * 0.3).toFixed(2)}`;
  return `${d} L5 3Z`;
})();

type FlagProps = { className?: string; slice?: boolean; title?: string };
const ar = (slice?: boolean) => (slice ? 'xMidYMid slice' : 'xMidYMid meet');

/** National flags of the six GCC markets, drawn as SVG. Check before launch. */
export const FLAGS: Record<string, (p: FlagProps) => JSX.Element> = {
  QA: ({ className, slice, title }) => (
    <svg viewBox="0 0 28 11" preserveAspectRatio={ar(slice)} className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <rect width="28" height="11" fill="#fff" />
      <path d={qatarPath} fill="#8A1538" />
    </svg>
  ),
  SA: ({ className, slice, title }) => (
    <svg viewBox="0 0 15 10" preserveAspectRatio={ar(slice)} className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <rect width="15" height="10" fill="#006C35" />
      <text x="7.5" y="4.7" textAnchor="middle" fontSize="1.12" fill="#fff" direction="rtl" style={{ fontFamily: amiri.style.fontFamily }}>لا إله إلا الله محمد رسول الله</text>
      <g fill="#fff">
        <path d="M3.6 6.95 L10.4 6.82 L10.4 7.12 L3.6 7.05Z" />
        <rect x="10.4" y="6.55" width=".22" height=".85" rx=".08" />
        <path d="M10.62 6.9 H11.6 Q11.9 6.9 11.95 7.25 L11.8 7.25 Q11.7 7.05 11.5 7.05 H10.62Z" />
      </g>
    </svg>
  ),
  AE: ({ className, slice, title }) => (
    <svg viewBox="0 0 12 6" preserveAspectRatio={ar(slice)} className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <rect width="12" height="2" fill="#009739" /><rect y="2" width="12" height="2" fill="#fff" /><rect y="4" width="12" height="2" fill="#000" />
      <rect width="3" height="6" fill="#EF3340" />
    </svg>
  ),
  KW: ({ className, slice, title }) => (
    <svg viewBox="0 0 12 6" preserveAspectRatio={ar(slice)} className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <rect width="12" height="2" fill="#007A3D" /><rect y="2" width="12" height="2" fill="#fff" /><rect y="4" width="12" height="2" fill="#CE1126" />
      <path d="M0 0 L3 2 L3 4 L0 6Z" fill="#000" />
    </svg>
  ),
  BH: ({ className, slice, title }) => (
    <svg viewBox="0 0 5 3" preserveAspectRatio={ar(slice)} className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <rect width="5" height="3" fill="#fff" />
      <path d={bahrainPath} fill="#CE1126" />
    </svg>
  ),
  OM: ({ className, slice, title }) => (
    <svg viewBox="0 0 12 6" preserveAspectRatio={ar(slice)} className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <rect width="12" height="2" fill="#fff" /><rect y="2" width="12" height="2" fill="#DB161B" /><rect y="4" width="12" height="2" fill="#008000" />
      <rect width="3" height="6" fill="#DB161B" />
      <g stroke="#fff" strokeWidth=".14" fill="none" strokeLinecap="round">
        <path d="M.75 .55 L2.25 1.85 M2.25 .55 L.75 1.85" />
        <path d="M1.5 .45 V1.45 Q1.5 1.95 1.15 2.05" />
        <path d="M1.05 .95 H1.95" />
      </g>
      <circle cx="1.5" cy=".42" r=".11" fill="#fff" />
    </svg>
  ),
};

/** Small flags for the university country tabs. */
const UK = ({ id }: { id: string }) => (
  <>
    <clipPath id={`uks-${id}`}><path d="M0 0v30h60V0z" /></clipPath>
    <clipPath id={`ukt-${id}`}><path d="M30 15h30v15zv15H0zH0V0zV0h30z" /></clipPath>
    <g clipPath={`url(#uks-${id})`}>
      <path d="M0 0v30h60V0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" clipPath={`url(#ukt-${id})`} stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </>
);

const S = 'xMidYMid slice';
export const COUNTRY_FLAGS: Record<string, JSX.Element> = {
  UK: <svg viewBox="0 0 60 30" preserveAspectRatio={S}><UK id="tab" /></svg>,
  USA: (
    <svg viewBox="0 0 38 20" preserveAspectRatio={S}>
      {Array.from({ length: 13 }, (_, i) => <rect key={i} y={(i * 20) / 13} width="38" height={20 / 13} fill={i % 2 ? '#fff' : '#B22234'} />)}
      <rect width="15.2" height="10.77" fill="#3C3B6E" />
      {Array.from({ length: 20 }, (_, i) => <circle key={i} cx={1.6 + (i % 5) * 3} cy={1.4 + Math.floor(i / 5) * 2.6} r=".55" fill="#fff" />)}
    </svg>
  ),
  Canada: (
    <svg viewBox="0 0 40 20" preserveAspectRatio={S}>
      <rect width="40" height="20" fill="#fff" /><rect width="10" height="20" fill="#D52B1E" /><rect x="30" width="10" height="20" fill="#D52B1E" />
      <path d="M20 3.2l1.3 2.6 1.5-.6-.5 3.6 2.2-2.3.5 1.2 2.3-.4-.8 2.5 1 .5-3.6 2.9.4 1.3-3.6-.4.1 3.4h-.8l.1-3.4-3.6.4.4-1.3-3.6-2.9 1-.5-.8-2.5 2.3.4.5-1.2 2.2 2.3-.5-3.6 1.5.6z" fill="#D52B1E" />
    </svg>
  ),
  Germany: <svg viewBox="0 0 5 3" preserveAspectRatio={S}><rect width="5" height="1" fill="#000" /><rect y="1" width="5" height="1" fill="#DD0000" /><rect y="2" width="5" height="1" fill="#FFCE00" /></svg>,
  Australia: (
    <svg viewBox="0 0 60 30" preserveAspectRatio={S}>
      <rect width="60" height="30" fill="#012169" />
      <g transform="scale(.5)"><UK id="au" /></g>
      <circle cx="15" cy="23" r="2.6" fill="#fff" /><circle cx="45" cy="25" r="1.4" fill="#fff" /><circle cx="40" cy="12" r="1.3" fill="#fff" /><circle cx="49" cy="9" r="1.3" fill="#fff" /><circle cx="45" cy="5" r="1.3" fill="#fff" /><circle cx="47" cy="15" r=".8" fill="#fff" />
    </svg>
  ),
  UAE: FLAGS.AE({ slice: true, className: 'block h-full w-full' }),
  France: <svg viewBox="0 0 3 2" preserveAspectRatio={S}><rect width="1" height="2" fill="#002654" /><rect x="1" width="1" height="2" fill="#fff" /><rect x="2" width="1" height="2" fill="#CE1126" /></svg>,
  Ireland: <svg viewBox="0 0 3 2" preserveAspectRatio={S}><rect width="1" height="2" fill="#169B62" /><rect x="1" width="1" height="2" fill="#fff" /><rect x="2" width="1" height="2" fill="#FF883E" /></svg>,
};
