import Image from 'next/image';
import { FOUNDER, TEAM, type TeamIcon } from '@/content/team';

const ICONS: Record<TeamIcon, JSX.Element> = {
  bank: <path d="M3 10l9-6 9 6M5 10v8M10 10v8M14 10v8M19 10v8M3 21h18" />,
  code: <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12" />,
  screen: <><rect x="3.5" y="4.5" width="17" height="12" rx="2" /><path d="M8 20.5h8M12 16.5v4" /></>,
  cap: <><path d="M2.5 9.5 12 4.5l9.5 5-9.5 5z" /><path d="M6.5 11.6v4.6c3.2 2.3 7.8 2.3 11 0v-4.6" /></>,
};

export function Leadership() {
  return (
    <>
      <article id="founder" className="mb-[clamp(56px,7vw,96px)] grid items-start gap-[clamp(28px,5vw,72px)] lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
        <figure className="relative m-0 max-w-[420px] lg:max-w-none">
          <span aria-hidden="true" className="absolute inset-[18px_-18px_-18px_18px] bg-brand" />
          <Image src={FOUNDER.photo} alt="Mrs. Sajeda Ansari, Founder of Potentia" width={900} height={1125} className="relative block aspect-[4/5] h-auto w-full object-cover" />
          <figcaption className="absolute -left-3.5 bottom-7 z-[2] flex items-center gap-3 border border-line bg-white px-[18px] py-3.5 shadow-[0_18px_36px_-20px_rgba(22,9,31,.45)]">
            <b className="text-[2rem] font-extrabold leading-none text-royal">{FOUNDER.years}</b>
            <span className="max-w-[14ch] text-[0.85rem] leading-tight text-muted">years of international experience</span>
          </figcaption>
        </figure>
        <div className="flex min-w-0 flex-col gap-3.5">
          <span className="label">Founder Spotlight</span>
          <h2 className="!text-[clamp(2rem,3.6vw,2.8rem)]">{FOUNDER.name}</h2>
          <span className="text-[0.98rem] font-semibold text-magenta">{FOUNDER.role}</span>
          <p className="max-w-[62ch] text-[1.05rem] text-muted">{FOUNDER.bio}</p>
          <div className="mt-1.5 border-t border-line pt-[18px]">
            <h3 className="mb-3 !text-base">Credentials &amp; Professional Affiliations</h3>
            <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {FOUNDER.credentials.map((c) => (
                <li key={c} className="relative pl-[26px] text-[0.93rem] after:absolute after:left-[5px] after:top-[7px] after:h-[3px] after:w-1.5 after:-rotate-45 after:border-b-2 after:border-l-2 after:border-white before:absolute before:left-0 before:top-[3px] before:h-4 before:w-4 before:rounded-full before:bg-brand">{c}</li>
              ))}
            </ul>
          </div>
        </div>
        <blockquote className="border-l-4 border-magenta bg-tint px-[clamp(24px,4vw,48px)] py-[clamp(22px,3vw,34px)] lg:col-span-2">
          <p className="text-[clamp(1.1rem,1.9vw,1.4rem)] font-semibold leading-relaxed">“{FOUNDER.quote}”</p>
          <cite className="mt-2.5 block text-[0.82rem] font-semibold not-italic tracking-[0.04em] text-magenta">Sajeda Ansari, Founder</cite>
        </blockquote>
      </article>

      <div className="mb-[22px] flex flex-wrap items-end justify-between gap-5 border-t border-line pt-7">
        <h3 className="!text-2xl">Leadership team</h3>
        <p className="max-w-[56ch] text-muted">Senior specialists across our three practices. Detailed profiles are shared with clients during engagement.</p>
      </div>
      <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((t) => (
          <article key={t.role} className="relative flex min-w-0 flex-col gap-2.5 border border-line bg-white p-[22px] transition-all duration-300 hover:-translate-y-[3px] hover:border-lavender hover:shadow-[0_22px_44px_-28px_rgba(93,46,142,.55)]">
            <span aria-hidden="true" className="absolute -left-px -right-px -top-px h-1" style={{ background: t.gradient }} />
            <div className="mb-1.5 flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl text-white" style={{ background: t.gradient }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="h-[26px] w-[26px]" aria-hidden="true">{ICONS[t.icon]}</svg>
              </span>
              <span className="rounded-full bg-chip px-2.5 py-1.5 text-[0.82rem] font-extrabold text-royal">{t.years}</span>
            </div>
            <h3 className="!text-[1.1rem]">{t.role}</h3>
            <span className="tag">{t.area}</span>
            <p className="flex-1 text-[0.92rem] text-muted">{t.text}</p>
            <div className="flex flex-wrap gap-1.5">{t.tags.map((x) => <span key={x} className="border border-line px-2 py-1 text-[0.72rem] font-semibold text-muted">{x}</span>)}</div>
          </article>
        ))}
      </div>
    </>
  );
}
