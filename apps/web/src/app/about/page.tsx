import { Leadership } from '@/components/about/Leadership';
import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/ui/Hero';
import { SectionHead } from '@/components/ui/SectionHead';
import { Values } from '@/components/ui/Values';
import { SECTIONS } from '@/content/site';

export const metadata: Metadata = {
  title: 'About Potentia',
  description: 'A Doha-based technology and consultancy company combining human expertise with bank-grade engineering.',
  alternates: { canonical: '/about' },
};

const WHAT: Record<string, string> = {
  banking: 'Payment, reconciliation and card platforms for financial institutions.',
  business: 'Potentia Campus, Spark and Hive for school management, billing and inventory.',
  education: 'Pulse, Vibe, Link and university admissions for students, parents and teachers.',
};

export default function AboutPage() {
  return (
    <>
      <Hero label="About us" title="Tech Driven Growth for Every Generation" lead="Potentia Software & Consultancy Services W.L.L. is a Doha-based technology and consultancy company. We combine human expertise with bank-grade engineering to help schools, businesses and financial institutions grow." art="mesh" seed={71} />
      <section className="section">
        <div className="container">
          <div className="grid gap-[clamp(32px,5vw,72px)] md:grid-cols-2">
            <div className="flex flex-col gap-4"><span className="label">Vision</span><p className="text-[clamp(1.3rem,2.4vw,1.9rem)] font-bold leading-snug tracking-[-0.02em]">To be Qatar&apos;s, and eventually the world&apos;s, leading hub for educational excellence and digital innovation, empowering people and institutions to thrive in a knowledge-driven economy.</p></div>
            <div className="flex flex-col gap-4"><span className="label">Mission</span><p className="text-[clamp(1.3rem,2.4vw,1.9rem)] font-bold leading-snug tracking-[-0.02em]">To deliver personalised educational guidance and cutting-edge technology that help students, schools and businesses achieve sustainable growth.</p></div>
          </div>
          <div className="mt-[clamp(40px,5vw,64px)]"><span className="label mb-3.5 block">Our values (ICE³)</span><Values /></div>
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <SectionHead label="What we do" title="Three practices, one company" lead="Each practice has its own specialists and shares one standard of quality." />
          <div className="grid gap-6 md:grid-cols-3">
            {SECTIONS.map((s) => (
              <Link key={s.id} href={`/${s.id}`} className="group flex flex-col gap-3.5">
                <span className="relative block aspect-[16/10] overflow-hidden bg-ink"><Image src={s.image.card} alt={s.image.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /></span>
                <span className="tag">{s.full}</span>
                <h3>{WHAT[s.id]}</h3>
                <span className="tlink">{s.button} <span className="ar">→</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead label="Our leaders" title="The people behind Potentia" lead="Clinical expertise, senior banking technology and education specialists, working as one team." />
          <Leadership />
        </div>
      </section>
    </>
  );
}
