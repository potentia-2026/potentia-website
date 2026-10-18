'use client';

import { useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------
   Live product screens with demo data. Every screen is labelled
   "Demo data"; replace with real product screenshots or recordings
   when available.
------------------------------------------------------------------- */

const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
const clock = () => new Date().toLocaleTimeString('en-GB', { hour12: false });
const money = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const int = (n: number) => n.toLocaleString('en-US');

function useTicker(cb: () => void, ms = 1500) {
  const saved = useRef(cb);
  saved.current = cb;
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => { if (document.visibilityState === 'visible') saved.current(); }, ms);
    return () => window.clearInterval(id);
  }, [ms]);
}

function useClock() {
  const [t, setT] = useState('');
  useEffect(() => {
    setT(clock());
    const id = window.setInterval(() => setT(clock()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return t;
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  const t = useClock();
  return (
    <div className="min-w-0 overflow-hidden border border-ink-line bg-[#12061F] text-[13px] text-[#EFE3F1] shadow-[0_30px_60px_-30px_rgba(21,8,38,.6)]">
      <div className="flex items-center gap-2.5 border-b border-ink-line bg-[linear-gradient(90deg,#22103A,#2E1446)] px-4 py-3">
        <span className="h-[9px] w-[9px] animate-ping2 rounded-full bg-[#4ADE80]" />
        <b className="text-[13.5px] font-bold">{title}</b>
        <span className="ml-auto font-mono text-xs tabular-nums text-ink-muted">{t}</span>
        <em className="border border-royal px-[7px] py-[3px] text-[10px] font-bold not-italic uppercase tracking-[0.12em] text-lavender">Demo data</em>
      </div>
      <div className="flex flex-col gap-3.5 p-4">{children}</div>
    </div>
  );
}

function Kpis({ items }: { items: [string, string][] }) {
  return (
    <div className={`grid gap-2.5 ${items.length === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2'}`}>
      {items.map(([k, v]) => (
        <div key={k} className="flex min-w-0 flex-col gap-0.5 border border-[#33204A] bg-[#1C0D30] px-3 py-2.5">
          <small className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#B9A5C2]">{k}</small>
          <b className="text-xl font-extrabold tabular-nums text-white">{v}</b>
        </div>
      ))}
    </div>
  );
}

type Tone = 'ok' | 'wait' | 'bad' | 'warn';
const TONE: Record<Tone, string> = {
  ok: 'bg-[rgba(74,222,128,.14)] text-[#6EE7A0]',
  wait: 'bg-[rgba(199,146,200,.16)] text-[#E2B8E3]',
  bad: 'bg-[rgba(248,113,113,.15)] text-[#FCA5A5]',
  warn: 'bg-[rgba(251,191,36,.15)] text-[#FCD34D]',
};
const Pill = ({ tone, children }: { tone: Tone; children: React.ReactNode }) => (
  <span className={`whitespace-nowrap rounded-full px-2 py-[3px] text-[10.5px] font-bold ${TONE[tone]}`}>{children}</span>
);

function Feed({ head, rows }: { head: string[]; rows: { id: number; cells: React.ReactNode[] }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[460px] border-collapse tabular-nums">
        <thead>
          <tr>{head.map((h) => <th key={h} className="border-b border-[#33204A] px-2 py-1.5 text-left text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#9C88A8]">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="animate-enter">
              {r.cells.map((c, i) => <td key={i} className={`whitespace-nowrap border-b border-[#24133A] p-2 ${i < 2 ? 'font-mono text-xs text-[#E3C9E6]' : ''}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

let uid = 0;

/* ---------------- Payment Rail ---------------- */
const RAILS: [string, string][] = [['RTGS', 'QAR'], ['ACH', 'QAR'], ['SWIFT', 'USD'], ['WPS', 'QAR'], ['FAWRAN', 'QAR'], ['AFAQ', 'SAR']];
function newPayment() {
  const [r, c] = pick(RAILS);
  const msg = r === 'SWIFT' ? pick(['pacs.008', 'pacs.009', 'camt.054']) : r === 'WPS' ? 'pain.001' : pick(['pacs.008', 'pacs.002', 'camt.056']);
  const amt = r === 'RTGS' || r === 'SWIFT' ? Math.random() * 4e6 + 5e4 : Math.random() * 25e3 + 150;
  return { id: ++uid, t: clock(), msg, r, c, amt, settled: false };
}
function PaymentsScreen() {
  const [rows, setRows] = useState(() => Array.from({ length: 6 }, () => ({ ...newPayment(), settled: true })));
  const [count, setCount] = useState(48215);
  useTicker(() => {
    setRows((p) => [newPayment(), ...p.map((x) => ({ ...x, settled: true }))].slice(0, 6));
    setCount((n) => n + 1 + Math.floor(Math.random() * 4));
  });
  return (
    <Shell title="Potentia Payment Rail · Live">
      <Kpis items={[['Messages today', int(count)], ['Straight-through', '99.2%'], ['Rails online', '6 / 6']]} />
      <Feed head={['Time', 'Message', 'Rail', 'Amount', 'Status']} rows={rows.map((x) => ({ id: x.id, cells: [x.t, x.msg, x.r, `${x.c} ${money(x.amt)}`, x.settled ? <Pill tone="ok">{x.r === 'ACH' || x.r === 'WPS' ? 'Cleared' : 'Settled'}</Pill> : <Pill tone="wait">Validated</Pill>] }))} />
    </Shell>
  );
}

/* ---------------- Omni Flow ---------------- */
const STEPS = ['Scan Qatar ID', 'Face match', 'AML/CFT screening', 'Choose account', 'Account ready'];
const CHANNELS = ['Mobile', 'Internet', 'Branch', 'Corporate H2H', 'APIs & SDK'];
function OmniScreen() {
  const [step, setStep] = useState(2);
  const [chan, setChan] = useState(0);
  const [retail, setRetail] = useState(312);
  useTicker(() => {
    setStep((s) => {
      const n = (s + 1) % (STEPS.length + 2);
      if (n === STEPS.length) setRetail((r) => r + 1);
      return n;
    });
    setChan(Math.floor(Math.random() * CHANNELS.length));
  });
  return (
    <Shell title="Potentia Omni Flow · Onboarding">
      <div className="grid items-center gap-[18px] sm:grid-cols-[200px_1fr]">
        <div className="relative mx-auto flex min-h-[330px] w-[200px] flex-col gap-2.5 rounded-[30px] border-8 border-[#2E1A45] bg-tint px-3 py-4 text-fg before:absolute before:left-1/2 before:top-1.5 before:h-1.5 before:w-[54px] before:-translate-x-1/2 before:rounded before:bg-[#2E1A45]">
          <h5 className="mt-2.5 text-sm font-extrabold">Open an account</h5>
          {STEPS.map((s, i) => {
            const done = i < step, act = i === step;
            return (
              <div key={s} className={`flex items-center gap-2 border bg-white p-2 text-xs transition-all ${act ? 'border-magenta shadow-[0_0_0_3px_rgba(157,68,150,.15)]' : 'border-line'}`}>
                <i className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border-2 text-[10px] not-italic text-white ${done ? 'border-royal bg-royal' : act ? 'animate-spin border-magenta border-t-transparent' : 'border-lavender'}`}>{done ? '✓' : ''}</i>
                {s}
              </div>
            );
          })}
          <div className="mt-auto bg-brand p-2.5 text-center text-xs font-bold text-white">Continue</div>
        </div>
        <div className="flex flex-col gap-3">
          <Kpis items={[['Retail today', String(retail)], ['Corporate today', '27']]} />
          <small className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#B9A5C2]">Channels on one layer</small>
          <div className="flex flex-wrap gap-2">
            {CHANNELS.map((c, i) => <span key={c} className={`border px-2.5 py-[7px] text-xs font-semibold transition-all ${i === chan ? 'border-transparent bg-brand text-white' : 'border-ink-line text-ink-muted'}`}>{c}</span>)}
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Smart Recon ---------------- */
const SOURCES = ['ATM', 'POS', 'Visa / Mastercard', 'Local switch', 'Nostro', 'Host file'];
function newBreak() {
  const resolved = Math.random() < 0.6;
  return { id: ++uid, t: clock(), what: pick(['Amount mismatch', 'Missing in host', 'Duplicate settlement', 'Late presentment']), src: pick(['ATM', 'POS', 'Scheme', 'Switch', 'Nostro']), amt: Math.random() * 4000 + 20, resolved };
}
function ReconScreen() {
  const [pct, setPct] = useState(() => SOURCES.map(() => 96));
  const [matched, setMatched] = useState(182406);
  const [open, setOpen] = useState(14);
  const [rows, setRows] = useState(() => Array.from({ length: 4 }, newBreak));
  useTicker(() => {
    setPct(SOURCES.map(() => +(95 + Math.random() * 5).toFixed(1)));
    setMatched((m) => m + 40 + Math.floor(Math.random() * 90));
    const b = newBreak();
    setRows((r) => [b, ...r].slice(0, 4));
    setOpen((o) => Math.max(6, o + (b.resolved ? -1 : 1)));
  });
  return (
    <Shell title="Potentia Smart Recon · Today">
      <Kpis items={[['Matched', int(matched)], ['Match rate', '99.6%'], ['Open breaks', String(open)]]} />
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {SOURCES.map((s, i) => (
          <div key={s} className="flex min-w-0 flex-col gap-1.5 border border-[#33204A] bg-[#1C0D30] p-2.5">
            <span className="flex justify-between text-xs font-semibold">{s}<em className="not-italic tabular-nums text-[#B9A5C2]">{pct[i]}%</em></span>
            <div className="h-1.5 overflow-hidden bg-[#2C1842]"><i className="block h-full bg-[linear-gradient(90deg,#5D2E8E,#C792C8)] transition-[width] duration-700" style={{ width: `${pct[i]}%` }} /></div>
          </div>
        ))}
      </div>
      <Feed head={['Time', 'Break', 'Source', 'Amount', 'Status']} rows={rows.map((x) => ({ id: x.id, cells: [x.t, x.what, x.src, `QAR ${money(x.amt)}`, <Pill key="s" tone={x.resolved ? 'ok' : 'warn'}>{x.resolved ? 'Auto-resolved' : 'For review'}</Pill>] }))} />
    </Shell>
  );
}

/* ---------------- Card Management ---------------- */
const LIFE: [string, string, string][] = [['Product set up', 'Platinum Debit', 'SET UP'], ['Card issued', 'Instant issuance', 'ISSUED'], ['PIN set', 'Via mobile app', 'PIN SET'], ['Tokenised', 'Mobile wallet', 'TOKENISED'], ['Active', 'In use', 'ACTIVE'], ['Renewal', 'Auto, 10/30', 'RENEWING']];
function CmsScreen() {
  const [stage, setStage] = useState(1);
  useTicker(() => setStage((s) => (s + 1) % LIFE.length));
  return (
    <Shell title="Potentia CMS · Card lifecycle">
      <div className="grid items-center gap-[18px] sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="relative flex aspect-[1.586] max-w-full flex-col justify-between overflow-hidden rounded-[14px] bg-[linear-gradient(135deg,#2A1047_0%,#5D2E8E_55%,#9D4496_100%)] p-[18px] text-white shadow-[0_24px_40px_-18px_rgba(0,0,0,.7)]">
          <div className="flex items-center justify-between"><b className="text-sm font-extrabold tracking-[0.06em]">POTENTIA BANK</b><small className="text-[9px] font-bold tracking-[0.16em] opacity-85">PLATINUM DEBIT</small></div>
          <div className="relative h-[30px] w-10 rounded-md bg-[linear-gradient(135deg,#F5D98B,#C9A24A)]" />
          <div className="font-mono text-[clamp(14px,2vw,18px)] tracking-[0.12em]">4000 •••• •••• 1239</div>
          <div className="flex items-end justify-between text-[10.5px] font-semibold tracking-[0.1em]"><span>A. CUSTOMER</span><span>VALID 10/30</span></div>
          <span className="absolute right-4 top-[44%] -rotate-[8deg] border-2 border-[#6EE7A0] px-2 py-1 text-[11px] font-extrabold tracking-[0.12em] text-[#6EE7A0]">{LIFE[stage][2]}</span>
        </div>
        <ul className="flex flex-col gap-1.5">
          {LIFE.map(([a, b], i) => (
            <li key={a} className={`flex items-center gap-2.5 border px-2.5 py-2 text-[12.5px] font-semibold transition-all ${i === stage ? 'border-magenta bg-[#2B1442]' : 'border-[#33204A] bg-[#1C0D30]'}`}>
              <i className={`h-2.5 w-2.5 shrink-0 rounded-full ${i === stage ? 'bg-[#4ADE80] shadow-[0_0_0_4px_rgba(74,222,128,.2)]' : i < stage ? 'bg-lavender' : 'bg-ink-line'}`} />
              {a}<small className="ml-auto font-mono text-[11px] font-medium text-[#9C88A8]">{b}</small>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}

/* ---------------- Card Switch ---------------- */
function newAuth() {
  const r = Math.random();
  const resp: [string, Tone] = r < 0.88 ? ['00 Approved', 'ok'] : r < 0.94 ? ['51 Insufficient funds', 'bad'] : r < 0.97 ? ['55 Incorrect PIN', 'bad'] : ['05 Do not honour', 'bad'];
  return { id: ++uid, t: clock(), ch: pick(['ATM', 'POS', 'E-commerce', 'POS', 'Contactless']), card: `${pick(['4000', '5100', '4847', '5432'])} ••${Math.floor(Math.random() * 9000 + 1000)}`, amt: Math.random() * 1800 + 5, route: pick(['Local switch', 'Scheme', 'On-us']), resp };
}
function SwitchScreen() {
  const [rows, setRows] = useState(() => Array.from({ length: 6 }, newAuth));
  const [tps, setTps] = useState(142);
  const [lat, setLat] = useState(87);
  useTicker(() => {
    setRows((p) => [newAuth(), ...p].slice(0, 6));
    setTps(120 + Math.floor(Math.random() * 60));
    setLat(70 + Math.floor(Math.random() * 35));
  });
  return (
    <Shell title="Potentia Card Switch · Authorisations">
      <Kpis items={[['Transactions / sec', String(tps)], ['Approval rate', '96.8%'], ['Avg. response', `${lat} ms`]]} />
      <Feed head={['Time', 'Card', 'Channel', 'Amount', 'Route', 'Response']} rows={rows.map((x) => ({ id: x.id, cells: [x.t, x.card, x.ch, `QAR ${money(x.amt)}`, x.route, <Pill key="r" tone={x.resp[1]}>{x.resp[0]}</Pill>] }))} />
    </Shell>
  );
}

const SCREENS = [PaymentsScreen, OmniScreen, ReconScreen, CmsScreen, SwitchScreen];

/** Rendered in the browser only: the screens use the live clock and random demo data. */
export function LiveScreen({ index }: { index: number }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <div className="min-h-[380px] border border-ink-line bg-[#12061F]" aria-hidden="true" />;
  const Screen = SCREENS[index] ?? PaymentsScreen;
  return <Screen />;
}
