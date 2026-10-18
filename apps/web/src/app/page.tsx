import Link from 'next/link';
import { Suspense } from 'react';
import { SECTIONS } from '@/content/site';
import { NetworkCanvas } from '@/components/landing/NetworkCanvas';
import { ChoiceDialog } from '@/components/landing/ChoiceDialog';
import Image from 'next/image';
import { StatBand } from '@/components/ui/StatBand';
import { SectionHead } from '@/components/ui/SectionHead';

export default function Home() {
  return (
    <>
      <Suspense fallback={null}><ChoiceDialog /></Suspense>
      <section className="on-dark relative overflow-hidden bg-ink text-white">
        <NetworkCanvas />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,8,38,.95)_0%,rgba(21,8,38,.75)_45%,rgba(21,8,38,.1)_100%)]" />
        <div className="container relative py-[clamp(72px,11vw,150px)]">
          <div className="flex max-w-[680px] flex-col gap-6">
            <span className="label !text-lavender">Potentia Software &amp; Consultancy Services W.L.L. · Doha</span>
            <h1 className="max-w-[15ch]">Tech-driven growth for every generation.</h1>
            <p className="lead !text-ink-muted">Software, consultancy and programmes for schools, businesses and banks.</p>
            <div className="flex flex-wrap items-center gap-3.5">
              <Link href="/?choose=1" className="btn">Find your path</Link>
              <Link href="/about" className="tlink">About Potentia <span className="ar">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mb-[clamp(56px,7vw,96px)]">
            <StatBand stats={[
              { value: '3', label: 'practices: banking, business software, and education and wellbeing' },
              { value: '6', label: 'GCC markets our payment platforms connect to' },
              { value: '17+', label: 'years of core banking and payments engineering' },
              { value: '~1,000', label: 'neurodevelopmental cases supported by our founder' },
            ]} />
          </div>
          <SectionHead label="What are you looking for today?" title="One company, three ways we help you grow" lead="Payment platforms for banks, software for organisations and programmes for learners, all from one Doha team." />
          <div className="grid gap-6 md:grid-cols-3">
            {SECTIONS.map((s) => (
              <Link key={s.id} href={`/${s.id}`} className="group flex flex-col border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-lavender hover:shadow-[0_26px_50px_-30px_rgba(93,46,142,.6)]">
                <span className="relative block aspect-[16/11] overflow-hidden bg-ink">
                  <Image src={s.image.card} alt={s.image.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute bottom-3.5 left-4 bg-ink/70 px-2.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white backdrop-blur">{s.full}</span>
                </span>
                <span className="flex flex-1 flex-col gap-3 p-[22px] pb-6">
                  <h3 className="text-2xl">{s.card}</h3>
                  <span className="flex-1 text-muted">{s.desc}</span>
                  <span className="flex flex-wrap gap-1.5">{s.items.map((x) => <span key={x} className="bg-chip px-2.5 py-1.5 text-[0.76rem] font-semibold text-chip-fg">{x}</span>)}</span>
                  <span className="tlink">{s.button} <span className="ar">→</span></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
