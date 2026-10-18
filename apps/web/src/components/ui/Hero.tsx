import { GenArt } from './GenArt';
import type { ArtKind } from '@/lib/genart';

interface Props {
  label: string;
  title: string;
  lead: string;
  art: ArtKind;
  seed: number;
  actions?: React.ReactNode;
}

/** Full-bleed dark page opener with a drifting brand visual. */
export function Hero({ label, title, lead, art, seed, actions }: Props) {
  return (
    <section className="on-dark relative overflow-hidden bg-ink text-white">
      <GenArt kind={art} seed={seed} drift className="!absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,8,38,.95)_0%,rgba(21,8,38,.8)_38%,rgba(21,8,38,.1)_100%)] max-md:bg-[linear-gradient(180deg,rgba(21,8,38,.9),rgba(21,8,38,.7))]" />
      <div className="container relative py-[clamp(72px,10vw,140px)]">
        <div className="flex max-w-[680px] flex-col gap-6">
          <span className="label !text-lavender">{label}</span>
          <h1 className="max-w-[15ch]">{title}</h1>
          <p className="lead !text-ink-muted">{lead}</p>
          {actions && <div className="flex flex-wrap items-center gap-3.5">{actions}</div>}
        </div>
      </div>
    </section>
  );
}
