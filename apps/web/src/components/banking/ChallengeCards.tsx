import Image from 'next/image';
import { CHALLENGES } from '@/content/banking';
import { ActionLink } from '@/components/ui/ActionLink';

export function ChallengeCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {CHALLENGES.map((c) => (
        <ActionLink
          key={c.title}
          href={c.href}
          product={'product' in c ? c.product : undefined}
          className="group relative grid min-w-0 grid-cols-[112px_minmax(0,1fr)] overflow-hidden border border-line bg-white transition-all duration-300 before:absolute before:inset-y-0 before:left-0 before:z-[2] before:w-1 before:origin-top before:scale-y-0 before:bg-brand before:transition-transform hover:-translate-y-[3px] hover:border-lavender hover:shadow-[0_22px_44px_-26px_rgba(93,46,142,.55)] hover:before:scale-y-100 sm:grid-cols-[clamp(130px,15vw,200px)_minmax(0,1fr)]"
        >
          <span className="relative overflow-hidden">
            <Image src={c.img} alt={c.alt} fill sizes="200px" className="object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
            <span className="absolute inset-0 bg-[linear-gradient(160deg,rgba(93,46,142,.16),rgba(21,8,38,0)_55%,rgba(21,8,38,.22))] transition-opacity duration-500 group-hover:opacity-55" />
          </span>
          <span className="flex flex-col gap-2 p-[clamp(18px,2.2vw,26px)]">
            <span className="tag">{c.tag}</span>
            <h3 className="text-[1.2rem]">{c.title}</h3>
            <span className="flex-1 text-[0.95rem] text-muted">{c.text}</span>
            <span className="tlink mt-1">Learn more <span className="ar">→</span></span>
          </span>
        </ActionLink>
      ))}
    </div>
  );
}
