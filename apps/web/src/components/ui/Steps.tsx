interface Props { steps: { title: string; text: string }[]; dark?: boolean }

/** A numbered process strip — only for content that really is a sequence. */
export function Steps({ steps, dark = false }: Props) {
  return (
    <ol
      className={`grid border-t ${dark ? 'border-ink-line' : 'border-line'} md:grid-cols-[repeat(var(--n),minmax(0,1fr))]`}
      style={{ ['--n' as string]: steps.length }}
    >
      {steps.map((s, i) => (
        <li key={s.title} className={`relative min-w-0 py-5 md:pr-5 ${i ? `border-t md:border-t-0 ${dark ? 'border-ink-line' : 'border-line'}` : ''}`}>
          <span className={`absolute -top-[2px] left-0 h-[3px] w-10 ${dark ? 'bg-lavender' : 'bg-magenta'}`} />
          <span className={`mb-2.5 block font-mono text-[0.78rem] tracking-[0.1em] ${dark ? 'text-lavender' : 'text-magenta'}`}>{String(i + 1).padStart(2, '0')}</span>
          <h4 className="mb-1.5 text-[1.05rem] font-bold">{s.title}</h4>
          <p className={`text-[0.93rem] ${dark ? 'text-ink-muted' : 'text-muted'}`}>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
