interface Props { stats: { value: string; label: string }[] }

export function StatBand({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <div key={s.label} className={`flex min-w-0 flex-col gap-2.5 py-7 pr-6 ${i ? 'border-t border-line sm:border-t-0 lg:border-l lg:pl-6' : ''} ${i === 1 ? 'sm:border-l sm:pl-6' : ''} ${i === 3 ? 'sm:border-l sm:pl-6' : ''}`}>
          <b className="text-[clamp(2.6rem,6vw,4.4rem)] font-extrabold leading-[.95] tracking-[-0.04em] text-royal tabular-nums">{s.value}</b>
          <span className="max-w-[26ch] text-muted">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
