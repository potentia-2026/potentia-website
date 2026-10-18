import Link from 'next/link';
import Image from 'next/image';
import { COMPANY, SECTIONS } from '@/content/site';
import { CopyValue } from './CopyValue';

export function Footer() {
  return (
    <footer className="bg-ink pb-8 pt-[72px] text-ink-muted">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="min-w-0">
            <span className="inline-flex rounded-xl bg-white px-5 py-3.5 shadow-[0_14px_30px_-18px_rgba(0,0,0,.6)]">
              <Image src="/brand/potentia-logo.png" alt={COMPANY.name} width={382} height={110} className="h-[58px] w-auto" />
            </span>
            <p className="mt-6 max-w-[16ch] text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold leading-tight tracking-[-0.02em] text-white">{COMPANY.strapline}</p>
            <p className="mt-4 text-[0.92rem]">{COMPANY.name}<br />{COMPANY.address}</p>
          </div>
          <div>
            <h4 className="mb-3.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white">Explore</h4>
            <ul className="space-y-1.5">
              {SECTIONS.map((s) => <li key={s.id}><Link href={`/${s.id}`} className="hover:text-white">{s.full}</Link></li>)}
              <li><Link href="/about" className="hover:text-white">About us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white">Get in touch</h4>
            <dl className="space-y-4">
              <CopyValue label="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} dark />
              <CopyValue label="Phone" value={COMPANY.phone} href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} dark />
              <CopyValue label="Web" value={COMPANY.web} dark />
            </dl>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-ink-line pt-5 text-[0.86rem]">
          <span>© {new Date().getFullYear()} {COMPANY.name}</span>
          <span className="flex gap-5"><Link href="/privacy" className="hover:text-white">Privacy policy</Link><Link href="/terms" className="hover:text-white">Terms of use</Link></span>
        </div>
      </div>
    </footer>
  );
}
