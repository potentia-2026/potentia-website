'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { SECTIONS, sectionById } from '@/content/site';

const LAST_SECTION_KEY = 'potentia.lastSection';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastSection, setLastSection] = useState<string | null>(null);
  const current = pathname.split('/')[1] ?? '';
  const section = sectionById(current);

  useEffect(() => {
    setOpen(false);
    if (section) {
      try { localStorage.setItem(LAST_SECTION_KEY, section.id); } catch { /* storage unavailable */ }
      setLastSection(section.id);
    } else {
      try { setLastSection(localStorage.getItem(LAST_SECTION_KEY)); } catch { /* storage unavailable */ }
    }
  }, [pathname, section]);

  const ctx = section ?? (lastSection ? sectionById(lastSection) : undefined);
  const cta = ctx ? { label: ctx.cta.label, href: `/${ctx.id}#${ctx.cta.anchor}` } : { label: 'Contact us', href: '/contact' };

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-[#EFE4F0] bg-white">
        <div className="container flex min-h-[78px] items-center gap-6">
          <Link href="/?choose=1" aria-label="Potentia home, choose a section" className="shrink-0">
            <Logo />
          </Link>
          <nav aria-label="Main" className="ml-3 hidden gap-1 lg:flex">
            {SECTIONS.map((s) => (
              <NavLink key={s.id} href={`/${s.id}`} active={ctx?.id === s.id}>{s.name}</NavLink>
            ))}
            <NavLink href="/about" active={current === 'about'}>About us</NavLink>
            <NavLink href="/contact" active={current === 'contact'}>Contact</NavLink>
          </nav>
          <Link href={cta.href} className="btn ml-auto !px-[18px] !py-[11px] text-[0.88rem] max-lg:hidden">{cta.label}</Link>
          <button
            type="button"
            className="ml-auto bg-chip px-4 py-2.5 font-semibold text-royal lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        <div className="h-[3px] bg-brand" />
      </div>

      {section && (
        <div className="hidden border-b border-line bg-white lg:block">
          <div className="container flex min-h-[52px] items-center gap-1 overflow-x-auto">
            <span className="mr-2 whitespace-nowrap border-r border-line pr-[18px] text-[0.95rem] font-extrabold">{section.full}</span>
            {section.menu.map((m) => (
              <a key={m.anchor} href={`#${m.anchor}`} className="whitespace-nowrap border-b-2 border-transparent px-3 py-[15px] text-[0.9rem] text-muted hover:border-magenta hover:text-fg">
                {m.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {open && (
        <div id="mobile-menu" className="max-h-[calc(100vh-80px)] overflow-auto border-t border-ink-line bg-ink text-white lg:hidden">
          <div className="container flex flex-col gap-5 py-5 pb-7">
            <MenuGroup title="Sections">
              {SECTIONS.map((s) => <MobileLink key={s.id} href={`/${s.id}`} active={ctx?.id === s.id}>{s.full}</MobileLink>)}
            </MenuGroup>
            {section && (
              <MenuGroup title="On this page">
                {section.menu.map((m) => <MobileLink key={m.anchor} href={`#${m.anchor}`} onClick={() => setOpen(false)}>{m.label}</MobileLink>)}
              </MenuGroup>
            )}
            <MenuGroup title="Company">
              <MobileLink href="/about">About us</MobileLink>
              <MobileLink href="/contact">Contact</MobileLink>
            </MenuGroup>
            <div className="on-dark"><Link href={cta.href} className="btn">{cta.label}</Link></div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`relative whitespace-nowrap px-[11px] py-[29px] text-[0.9rem] font-semibold hover:text-royal ${active ? 'text-royal after:absolute after:inset-x-[11px] after:bottom-0 after:h-[3px] after:bg-brand' : 'text-muted'}`}
    >
      {children}
    </Link>
  );
}

function MenuGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <span className="mb-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink-muted">{title}</span>
      {children}
    </div>
  );
}

function MobileLink({ href, active, onClick, children }: { href: string; active?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className={`border-b border-ink-line px-0.5 py-3 text-[1.05rem] font-semibold ${active ? 'text-lavender' : 'text-white'}`}>
      {children}
    </Link>
  );
}
