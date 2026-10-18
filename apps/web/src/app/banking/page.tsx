import type { Metadata } from 'next';
import { BankingBanner } from '@/components/banking/BankingBanner';
import { WhyTiles } from '@/components/banking/WhyTiles';
import { ChallengeCards } from '@/components/banking/ChallengeCards';
import { ProductSwitcher } from '@/components/banking/ProductSwitcher';
import { MarketsCascade } from '@/components/banking/MarketsCascade';
import { SecurityTiles } from '@/components/banking/SecurityTiles';
import { SectionHead } from '@/components/ui/SectionHead';
import { PlainList } from '@/components/ui/PlainList';
import { Steps } from '@/components/ui/Steps';
import { Accordion } from '@/components/ui/Accordion';
import { GenArt } from '@/components/ui/GenArt';
import { FormSection } from '@/components/forms/FormSection';
import { BANKING_FORM } from '@/content/forms';
import { BANK_CONSULTANCY, SERVICE_CARDS, SERVICE_STEPS, WHY_STATEMENTS } from '@/content/banking';
import type { ArtKind } from '@/lib/genart';

export const metadata: Metadata = {
  title: 'Potentia – Payments, reconciliation and card software for banks',
  description: 'ACH, RTGS, SWIFT CBPR+, WPS, reconciliation and card platforms for the GCC and beyond.',
  alternates: { canonical: '/banking' },
};

export default function BankingPage() {
  return (
    <>
      <BankingBanner />

      <section id="why" className="section">
        <div className="container">
          <SectionHead layout="split" label="Why Potentia" title="Payments specialists, end to end" lead="Products, integration, consultancy and 24/7 support from a team with 17+ years in core banking and payments." />
          <WhyTiles />
          <div className="mt-[clamp(48px,6vw,80px)]"><PlainList items={WHY_STATEMENTS} /></div>
        </div>
      </section>

      <section id="challenges" className="section pt-0">
        <div className="container">
          <SectionHead layout="split" label="The challenges we solve" title="How we help banks move faster on payments" lead="Six problems payments teams bring to us most often, and where Potentia fits." />
          <ChallengeCards />
        </div>
      </section>

      <section id="solutions" className="section section-tint">
        <div className="container">
          <SectionHead layout="split" label="Solutions" title="Five products that share one secure core" lead="Start with one, add the rest when you need them." />
          <ProductSwitcher />
        </div>
      </section>

      <section id="markets" className="section">
        <div className="container">
          <SectionHead layout="split" label="Markets" title="Connected to the rails of all six GCC countries" lead="Built to extend across Africa and beyond." />
          <MarketsCascade />
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHead layout="split" label="Built for security and compliance" title="Controls a central bank auditor expects to see" lead="Security and compliance are built into the core of every product." />
          <SecurityTiles />
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <SectionHead layout="split" label="Services" title="With you from the first design discussion to day-to-day operations" lead="One team takes you from roadmap to go-live and stays on for round-the-clock support." />
          <div className="mb-[clamp(48px,6vw,80px)]"><Steps steps={SERVICE_STEPS} /></div>
          <div className="grid gap-6 md:grid-cols-3">
            {SERVICE_CARDS.map((c) => (
              <article key={c.title} className="group flex min-w-0 flex-col gap-3.5">
                <GenArt kind={c.art as ArtKind} seed={c.seed} className="aspect-[16/10]" />
                <h3>{c.title}</h3>
                <p className="text-muted">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="bank-consult" className="section section-dark on-dark">
        <div className="container">
          <SectionHead
            label="Software consultancy"
            title="Banking and payments consultancy"
            lead="Senior payments expertise on demand, for banks, central banks and fintechs planning their next change."
            aside={<a href="#book" className="btn">Talk to a consultant</a>}
          />
          <Accordion items={BANK_CONSULTANCY} dark />
        </div>
      </section>

      <FormSection
        id="book"
        label="Book a demo"
        title="See Potentia in action"
        lead="Book a short demo with our payments team. Detailed presentations on Potentia Payment Rail, Omni Flow and Smart Recon are available on request."
        note="Pricing is shared in formal quotations."
        section="Banking & Fintech"
        fields={BANKING_FORM}
        submitLabel="Book a demo"
        confirmation="Thank you. Our payments team will contact you to schedule the demo."
      />
    </>
  );
}
