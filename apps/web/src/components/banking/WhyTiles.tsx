import Image from 'next/image';
import { WHY_TILES } from '@/content/banking';

/** Image tiles whose details slide up on hover / keyboard focus (always shown on touch). */
export function WhyTiles() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {WHY_TILES.map((t) => (
        <a key={t.title} href={t.href} className="group relative block min-w-0 overflow-hidden bg-ink text-white">
          <Image src={t.img} alt={t.alt} width={1600} height={893} sizes="(min-width:768px) 50vw, 100vw" className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.06] group-focus-visible:scale-[1.06]" />
          <span aria-hidden="true" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border-[1.5px] border-white/70 bg-ink/70 text-[1.4rem] font-semibold backdrop-blur transition-all group-hover:rotate-90 group-hover:opacity-0 [@media(hover:none)]:hidden">+</span>
          <span className="absolute inset-0 flex translate-y-[18px] flex-col justify-end gap-2.5 bg-[linear-gradient(180deg,rgba(21,8,38,.6)_0%,rgba(21,8,38,.9)_45%,rgba(21,8,38,.97)_100%)] p-[clamp(20px,3vw,36px)] opacity-0 transition-all duration-500 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-brand group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:bg-[linear-gradient(180deg,rgba(21,8,38,0)_35%,rgba(21,8,38,.94)_100%)] [@media(hover:none)]:p-[18px] [@media(hover:none)]:opacity-100">
            <span className="tag !text-lavender">{t.tag}</span>
            <h3 className="text-[clamp(1.25rem,2.2vw,1.7rem)]">{t.title}</h3>
            <span className="max-w-[46ch] text-[#E2D3E6] [@media(hover:none)]:hidden">{t.text}</span>
            <span className="tlink mt-1 !text-white">{t.link} <span className="ar">→</span></span>
          </span>
        </a>
      ))}
    </div>
  );
}
