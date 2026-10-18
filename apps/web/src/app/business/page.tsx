import type { Metadata } from 'next';
import Image from 'next/image';
import { BusinessBanner } from '@/components/business/BusinessBanner';
import { ProductSlider } from '@/components/business/ProductSlider';
import { StatBand } from '@/components/ui/StatBand';
import { SectionHead } from '@/components/ui/SectionHead';
import { Accordion } from '@/components/ui/Accordion';
import { PlainList } from '@/components/ui/PlainList';
import { FormSection } from '@/components/forms/FormSection';
import { BUSINESS_FORM } from '@/content/forms';
import { BIZ_CONSULTANCY, BIZ_WHY, CAMPUS_FEATURES, HIVE_FEATURES, SPARK_FEATURES } from '@/content/business';
import { ProductMark, PRODUCT_ACCENT, type ProductKey } from '@/components/shared/ProductMark';

export const metadata: Metadata = {
  title: 'Potentia Campus, Spark and Hive – School management, billing and inventory software',
  description: 'Web and mobile business software built with bank-grade security.',
  alternates: { canonical: '/business' },
};

function FeatureRow({ id, name, img, reverse, tag, title, lead, who, children }: { id: Exclude<ProductKey, 'consult'>; name: string; img: string; reverse?: boolean; tag: string; title: string; lead: string; who: string; children: React.ReactNode }) {
  return (
    <div id={id} className="grid items-start gap-[clamp(28px,5vw,72px)] lg:grid-cols-2">
      {/* Intro (logo, label, description) sits above the photo; headline and details sit opposite. */}
      <div className={`flex min-w-0 flex-col gap-4 ${reverse ? 'lg:order-2' : ''}`}>
        <ProductMark product={id} name={name} />
        <span className="tag">{tag}</span>
        <p className="lead">{lead}</p>
        <div className="relative mt-2 aspect-[4/3] overflow-hidden">
          <Image src={img} alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-[18px] lg:pt-[clamp(40px,5vw,72px)]">
        <h2 className="!text-[clamp(1.7rem,3vw,2.5rem)]">{title}</h2>
        {children}
        <p className="text-muted"><b className="text-fg">Who it&apos;s for:</b> {who}</p>
      </div>
    </div>
  );
}

const Chips = ({ items }: { items: string[] }) => <div className="flex flex-wrap gap-2">{items.map((t) => <span key={t} className="chip">{t}</span>)}</div>;

/** One band per product, separated by a line in the product's colour (matches Education & Wellbeing). */
function Band({ tone, tint = false, children }: { tone: ProductKey; tint?: boolean; children: React.ReactNode }) {
  return (
    <section className={`section relative ${tint ? 'section-tint' : ''}`}>
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: PRODUCT_ACCENT[tone].gradient }} />
      <div className="container">{children}</div>
    </section>
  );
}

export default function BusinessPage() {
  return (
    <>
      <BusinessBanner />
      <section className="section pb-0">
        <div className="container">
          <StatBand stats={[
            { value: '3', label: 'ready-to-use products that work together' },
            { value: '2', label: 'ways to use them: web and mobile' },
            { value: '17+', label: 'years building mission-critical banking systems' },
            { value: '1', label: 'partner for implementation, training and support' },
          ]} />
        </div>
      </section>

      <section id="products" className="section">
        <div className="container">
          <SectionHead layout="split" label="Products" title="Start with one product, add the others as you grow" lead="Potentia Campus, Spark and Hive share one secure base, so data flows between them." />
          <ProductSlider />
        </div>
      </section>

      <Band tone="campus" tint>
          <FeatureRow id="campus" name="Campus" img="/images/business/campus.jpg" tag="Integrated School Management Software" title="Your whole school, on one platform" lead="Academics, operations, finance and parent engagement in one place, on web and mobile, with the reports leaders need to meet GCC school requirements." who="private and international schools, school groups.">
            <Accordion items={CAMPUS_FEATURES} />
          </FeatureRow>
      </Band>
      <Band tone="spark">
          <FeatureRow id="spark" name="Spark" img="/images/business/spark.jpg" reverse tag="Billing and invoicing" title="Invoice in seconds, get paid faster" lead="Quotations, invoices, payments and reminders in one place, so your team spends less time chasing payments and more time selling." who="SMEs, trading companies, retailers, service companies and schools collecting fees.">
            <Chips items={SPARK_FEATURES} />
          </FeatureRow>
      </Band>
      <Band tone="hive" tint>
          <FeatureRow id="hive" name="Hive" img="/images/business/hive.jpg" tag="Inventory management" title="Every item, every shelf, every store" lead="Real-time stock across shops and warehouses, with barcodes, reorder alerts and purchase orders built in." who="trading companies, retailers, distributors, schools and organisations managing assets.">
            <Chips items={HIVE_FEATURES} />
          </FeatureRow>
      </Band>

      <section id="biz-consult" className="section section-dark on-dark">
        <div className="container">
          <SectionHead layout="split" label="Business and IT consultancy" title="Consultancy to get more from your systems" lead="Advice and hands-on help to digitise processes, choose the right software and make sure your people adopt it." aside={<a href="#demo" className="btn">Talk to a consultant</a>} />
          <Accordion items={BIZ_CONSULTANCY} dark />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead layout="split" label="Why Potentia Business Automation" title="Built by the team behind banking systems" lead="The same engineering discipline that runs payment platforms, applied to everyday business software." />
          <PlainList items={BIZ_WHY} />
        </div>
      </section>

      <FormSection id="demo" label="Request a demo" title="See it working for your organisation" lead="Pick a product and we'll walk you through it with your own scenarios." section="Business Automation" fields={BUSINESS_FORM} submitLabel="Request a demo" confirmation="Thank you. We'll contact you to arrange your demo." />
    </>
  );
}
