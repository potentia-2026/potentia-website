import Image from 'next/image';
import { ProductMark, type ProductKey } from './ProductMark';

export interface StripItem { key: ProductKey; name: string; kicker: string; text: string; href: string }

interface Props {
  image: { src: string; alt: string; width: number; height: number };
  /** Link placed over the banner's printed button (percent box). */
  hotspot: { href: string; label: string; box: React.CSSProperties };
  strip: StripItem[];
  stripLabel: string;
  label: string;
  title: string;
  lead: string;
  actions: React.ReactNode;
}

/** Campaign banner + clickable product strip + dark headline strip (used by Business and Education pages). */
export function CampaignBanner({ image, hotspot, strip, stripLabel, label, title, lead, actions }: Props) {
  return (
    <>
      <figure className="relative m-0 bg-[#F4F1F7] leading-[0]">
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} priority sizes="100vw" className="h-auto w-full" />
        <a href={hotspot.href} aria-label={hotspot.label} style={hotspot.box} className="absolute rounded-md hover:shadow-[0_0_0_2px_rgba(199,146,200,.9),0_0_24px_rgba(157,68,150,.6)]" />
      </figure>

      <nav aria-label={stripLabel} className="border-b-[3px] border-transparent bg-[#F4F1F7] [border-image:linear-gradient(90deg,#5D2E8E,#9D4496)_1]">
        <div className="container grid sm:grid-cols-2 lg:grid-cols-4">
          {strip.map((it, i) => (
            <a
              key={it.key}
              href={it.href}
              className={`flex flex-col gap-2.5 py-5 transition-colors hover:bg-white sm:px-4 lg:px-[22px] ${i ? 'border-t border-[#E3D8EA] sm:border-t-0 lg:border-l' : ''} ${i % 2 ? 'sm:border-l' : 'sm:pl-0'} ${i >= 2 ? 'sm:border-t lg:border-t-0' : ''} ${i === 0 ? 'lg:pl-0' : ''}`}
            >
              <ProductMark product={it.key} name={it.name} kicker={it.kicker} size="sm" />
              <span className="text-[0.92rem] text-muted">{it.text}</span>
            </a>
          ))}
        </div>
      </nav>

      <section className="on-dark border-b border-ink-line bg-[linear-gradient(180deg,#0F0A24_0%,#150826_100%)] text-white">
        <div className="container grid items-end gap-[clamp(20px,4vw,64px)] py-[clamp(32px,4.5vw,56px)] md:grid-cols-[1.1fr_1fr]">
          <div className="min-w-0">
            <span className="label !text-lavender">{label}</span>
            <h1 className="mt-2.5 max-w-[16ch] !text-[clamp(2rem,4.2vw,3.4rem)]">{title}</h1>
          </div>
          <div className="min-w-0">
            <p className="lead mb-5 !text-ink-muted">{lead}</p>
            <div className="flex flex-wrap gap-3.5">{actions}</div>
          </div>
        </div>
      </section>
    </>
  );
}
