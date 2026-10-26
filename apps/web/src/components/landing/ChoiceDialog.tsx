'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import { SECTIONS, COMPANY, type SectionId } from '@/content/site';

const KEY = 'potentia.choice';
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export function rememberChoice(id: SectionId) {
  try { localStorage.setItem(KEY, JSON.stringify({ s: id, t: Date.now() })); } catch { /* storage unavailable */ }
}

function recalledChoice(): SectionId | null {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null') as { s: SectionId; t: number } | null;
    if (v && SECTIONS.some((s) => s.id === v.s) && Date.now() - v.t < THIRTY_DAYS) return v.s;
  } catch { /* ignore */ }
  return null;
}

/**
 * Landing-page path chooser.
 * - First visit: opens straight away.
 * - Returning visitor (choice < 30 days old): redirected to their section.
 * - Logo link (/?choose=1): always opens again.
 */
export function ChoiceDialog() {
  const router = useRouter();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const force = params.get('choose') === '1';
    const prev = recalledChoice();
    if (prev && !force) { router.replace(`/${prev}`); return; }
    lastFocus.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, [params, router]);

  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!open) return;
    const node = dialogRef.current;
    const first = node?.querySelector<HTMLElement>('a,button');
    first?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && node) {
        const f = [...node.querySelectorAll<HTMLElement>('a,button')];
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, close]);

  if (!open) return null;

  // Portalled to <body> so no transformed ancestor (e.g. <main class="animate-enter">)
  // becomes the containing block of the fixed overlay. Top-aligned with auto scroll so
  // the dialog is never clipped on short screens.
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-[rgba(8,3,15,.7)] px-4 pb-4 pt-[clamp(16px,6vh,56px)] backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="choice-title" className="relative mx-auto w-full max-w-[1040px] shrink-0 animate-enter bg-white p-[clamp(24px,4vw,44px)] [@media(max-height:820px)]:md:px-8 [@media(max-height:820px)]:md:py-6 shadow-[0_40px_90px_rgba(8,3,15,.5)]">
        <button type="button" onClick={close} aria-label="Close" className="absolute right-3.5 top-3.5 h-[42px] w-[42px] border-[1.5px] border-line text-xl">×</button>
        <Image src="/brand/potentia-logo.png" alt={COMPANY.name} width={382} height={110} className="h-[58px] w-auto" />
        <h2 id="choice-title" className="mt-4">Welcome to Potentia</h2>
        <p className="lead mt-1.5">What are you looking for today?</p>
        <div className="mt-6 grid gap-[18px] md:grid-cols-3 [@media(max-height:820px)]:mt-4">
          {SECTIONS.map((s) => (
            <Link key={s.id} href={`/${s.id}`} onClick={() => rememberChoice(s.id)} className="group flex flex-col border-[1.5px] border-line bg-white text-left transition-colors hover:border-magenta">
              <span className="relative block aspect-[2/1] overflow-hidden bg-ink max-md:hidden [@media(max-height:820px)]:aspect-[16/5] [@media(max-height:620px)]:hidden"><Image src={s.image.wide} alt="" fill sizes="340px" className="object-cover transition-transform duration-700 group-hover:scale-105" /></span>
              <div className="flex flex-1 flex-col gap-2 p-[18px]">
                <h3>{s.card}</h3>
                <p className="flex-1 text-[0.93rem] text-muted">{s.desc}</p>
                <span className="tlink">{s.button} <span className="ar">→</span></span>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/about" className="mt-5 inline-block text-[0.92rem] text-magenta underline">Learn more about Potentia</Link>
      </div>
    </div>,
    document.body,
  );
}
