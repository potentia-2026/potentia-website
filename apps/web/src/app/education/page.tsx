import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { EducationBanner } from '@/components/education/EducationBanner';
import { ProductMark, PRODUCT_ACCENT, type ProductKey } from '@/components/shared/ProductMark';
import { StatBand } from '@/components/ui/StatBand';
import { SectionHead } from '@/components/ui/SectionHead';
import { GenArt } from '@/components/ui/GenArt';
import { Steps } from '@/components/ui/Steps';
import { Accordion } from '@/components/ui/Accordion';
import { PlainList } from '@/components/ui/PlainList';
import { UniversityFinder } from '@/components/education/UniversityFinder';
import { Testimonials } from '@/components/education/Testimonials';
import { FormSection } from '@/components/forms/FormSection';
import { ACADEMICS_FORM } from '@/content/forms';
import { ACAD_CHALLENGES, ACAD_CONSULTANCY, ACAD_WHY, ADMISSION_COUNTRIES, ADMISSIONS_STEPS, LINK_EDUCATORS, LINK_PARENTS, PULSE_STEPS, VIBE_STEPS } from '@/content/education';
import type { ArtKind } from '@/lib/genart';

export const metadata: Metadata = {
  title: 'Potentia – Education & Wellbeing programmes for schools and families in Qatar',
  description: 'Pulse, Vibe, Link and university admissions: psychology-led support for students, parents, teachers and professionals.',
  alternates: { canonical: '/education' },
};

function Programme({ id, product, name, kicker = 'Potentia', img, alt, reverse, tag, title, lead, children }: { id: string; product: ProductKey; name: string; kicker?: string; img: string; alt: string; reverse?: boolean; tag: string; title: string; lead: string; children?: React.ReactNode }) {
  return (
    <div id={id} className="grid items-center gap-[clamp(28px,5vw,72px)] lg:grid-cols-2">
      <div className={`relative aspect-[4/3] overflow-hidden ${reverse ? 'lg:order-2' : ''}`}>
        <Image src={img} alt={alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-col gap-[18px]">
        <ProductMark product={product} name={name} kicker={kicker} />
        <span className="tag">{tag}</span>
        <h2 className="!text-[clamp(1.7rem,3vw,2.5rem)]">{title}</h2>
        <p className="lead">{lead}</p>
        {children}
      </div>
    </div>
  );
}

function Band({ tone, tint = false, id, children }: { tone: ProductKey; tint?: boolean; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`section relative ${tint ? 'section-tint' : ''}`}>
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: PRODUCT_ACCENT[tone].gradient }} />
      <div className="container">{children}</div>
    </section>
  );
}

export default function EducationPage() {
  return (
    <>
      <EducationBanner />
      <section className="section pb-0">
        <div className="container">
          <StatBand stats={[
            { value: '~1,000', label: 'neurodevelopmental cases supported' },
            { value: '450+', label: 'hours of professional coaching' },
            { value: '46+', label: 'virtual career simulations in Potentia Vibe' },
            { value: '8', label: 'countries for university admissions support' },
          ]} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead layout="split" label="The challenges schools face" title="Schools are asked to support every learner, often without the tools to do it." lead="These are the gaps Pulse, Vibe, Link and our school software are built to close." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ACAD_CHALLENGES.map((c) => (
              <article key={c.title} className="group flex min-w-0 flex-col gap-3.5">
                <GenArt kind={c.art as ArtKind} seed={c.seed} className="aspect-[16/10]" />
                <h3>{c.title}</h3>
                <p className="flex-1 text-muted">{c.text}</p>
                {c.href.startsWith('/') ? <Link href={c.href} className="tlink">{c.link} <span className="ar">→</span></Link> : <a href={c.href} className="tlink">{c.link} <span className="ar">→</span></a>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Each programme is its own band, separated by a line in the programme's colour. */}
      <Band tone="pulse" tint id="programmes">
        <SectionHead layout="split" label="Programmes" title="Four ways we support learners, families and schools" lead="Potentia Pulse, Vibe and Link, plus university admissions consultation, designed by a clinical psychologist and certified coach." />
        <div className="flex flex-col gap-9">
          <Programme id="pulse" product="pulse" name="Pulse" img="/images/education/pulse.jpg" alt="Teacher giving one-to-one academic support to a young student with workbooks and a tablet" tag="Grades 1 to 8 · academic support" title="Timely, structured academic intervention" lead="Remedial-style academic support for students in Grades 1 to 8: early, tech-driven programmes for diverse learning needs, delivered in school, at home or online.">
            <div className="grid gap-px border border-line bg-line sm:grid-cols-3">
              {[['3 hrs', 'academic assessment per student, cognitive and academic skills'], ['~80 hrs', 'structured intervention with guided workbooks and digital modules'], ['5', 'parent coaching sessions for learning at home']].map(([v, l]) => (
                <div key={v} className="flex flex-col gap-1 bg-tint p-[18px]"><b className="text-2xl font-extrabold text-royal">{v}</b><span className="text-[0.88rem] text-muted">{l}</span></div>
              ))}
            </div>
            <p className="text-[0.9rem] text-muted">Sessions of 1 to 1.5 hours · batches of up to 6 students</p>
          </Programme>
          <Steps steps={PULSE_STEPS} />
        </div>
      </Band>

      <Band tone="vibe">
        <div className="flex flex-col gap-9">
          <Programme id="vibe" product="vibe" name="Vibe" img="/images/education/vibe.jpg" alt="Career counsellor guiding a student through a career dashboard, with a VR headset for virtual career simulations" reverse tag="Grades 8 to 12 · fully online" title="From discovery and virtual simulation to decision" lead="A fully online 360-degree career assessment and coaching programme. Students try 46+ virtual career simulations to experience real industries before they choose a path.">
            <div className="flex flex-wrap gap-2">{['46+ virtual career simulations', 'Psychometric assessment', 'Individual Career Plan', 'Subject-choice roadmap'].map((t) => <span key={t} className="chip">{t}</span>)}</div>
          </Programme>
          <Steps steps={VIBE_STEPS} />
        </div>
      </Band>

      <Band tone="link" tint>
        {/* Link: heading and photo on the left, the two audiences on the right */}
        <div id="link" className="grid items-start gap-[clamp(28px,5vw,72px)] lg:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-[18px]">
            <ProductMark product="link" name="Link" />
            <span className="tag">Parents, teachers and professionals</span>
            <h2 className="!text-[clamp(1.7rem,3vw,2.5rem)]">Bridging professional development and parenting</h2>
            <p className="lead">Parent coaching and professional development for teachers and other professionals, with expert guidance from a psychologist and certified coach.</p>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/images/education/link.jpg" alt="Teachers, parents and professionals in a coaching and professional development workshop" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-7 pt-1.5">
            {([['For teachers and professionals', LINK_EDUCATORS], ['For parents', LINK_PARENTS]] as const).map(([h, list]) => (
              <div key={h} className="relative flex flex-col gap-3 border border-line bg-white px-6 py-[22px]">
                <span aria-hidden="true" className="absolute -left-px -right-px -top-[3px] h-[3px]" style={{ background: PRODUCT_ACCENT.link.gradient }} />
                <h3>{h}</h3>
                <ul className="flex list-disc flex-col gap-2.5 pl-5 text-muted">
                  {list.map(([b, t]) => <li key={b}><b className="font-semibold text-fg">{b}</b> {t}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Band>

      <Band tone="admissions" id="admissions">
        <div className="flex flex-col gap-9">
          <Programme id="admissions-intro" product="admissions" name="University Admissions" kicker="Expert" img="/images/education/admissions.jpg" alt="Admissions consultant advising a student and parent with university brochures and an application checklist" reverse tag="Admissions consultation" title="University admissions and consultation" lead="Expert guidance, university selection and end-to-end application support for schools and families facing big decisions.">
            <div className="flex flex-wrap gap-2">{ADMISSION_COUNTRIES.map((c) => <span key={c} className="chip">{c}</span>)}</div>
          </Programme>
          <Steps steps={ADMISSIONS_STEPS} />
          <div id="universities" className="mt-[clamp(20px,3vw,40px)]">
            <SectionHead layout="split" label="Universities we work with" title="Admission support across eight countries" lead="Search the universities and pathway providers our students apply to." />
            <UniversityFinder />
          </div>
        </div>
      </Band>

      <section id="acad-consult" className="section section-dark on-dark">
        <div className="container">
          <SectionHead layout="split" label="Educational consultancy" title="Consultancy for schools and families" lead="Expert guidance from a clinical psychologist and certified coach, for schools building stronger support systems and families facing big decisions." aside={<a href="#enquire" className="btn">Book a consultation</a>} />
          <div className="grid items-start gap-[clamp(28px,5vw,64px)] lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/images/education/coaching.jpg" alt="Coach and consultant advising professionals and family members in a relaxed consultation room" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="min-w-0"><Accordion items={ACAD_CONSULTANCY} dark /></div>
          </div>
        </div>
      </section>

      <section id="acad-why" className="section">
        <div className="container flex flex-col gap-[clamp(40px,5vw,72px)]">
          <div>
            <SectionHead layout="split" label="Why Potentia" title="Practice-grounded support, delivered through technology" lead="Designed by a clinical psychologist and delivered with digital workflows that schools can evidence." />
            <PlainList items={ACAD_WHY} />
          </div>
          <Testimonials />
          <div className="flex flex-wrap items-center justify-between gap-5 bg-ink p-[clamp(24px,4vw,40px)] text-white">
            <div><b className="block text-[clamp(1.3rem,2.4vw,1.8rem)] font-extrabold tracking-[-0.02em]">Run your whole school on one platform</b><p className="text-ink-muted">Potentia Campus connects academics, operations, finance and parent engagement.</p></div>
            <div className="on-dark"><Link href="/business#campus" className="btn">See Potentia Campus</Link></div>
          </div>
        </div>
      </section>

      <FormSection id="enquire" label="Enquire" title="Let's unlock your school's full potential" lead="Tell us about your school or your child and the programme you're interested in." section="Education & Wellbeing" fields={ACADEMICS_FORM} submitLabel="Send enquiry" confirmation="Thank you. Our team will contact you within two working days." />
    </>
  );
}
