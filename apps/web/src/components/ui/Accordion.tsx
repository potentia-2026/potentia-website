interface Props { items: { title: string; text: string }[]; firstOpen?: boolean; dark?: boolean }

/** Native <details> accordion: accessible with no JavaScript. */
export function Accordion({ items, firstOpen = true, dark = false }: Props) {
  return (
    <div className={`acc border-t ${dark ? 'border-ink-line' : 'border-line'}`}>
      {items.map((it, i) => (
        <details key={it.title} open={firstOpen && i === 0}>
          <summary className="hover:text-magenta">
            {it.title}
            <span className="pm" aria-hidden="true" />
          </summary>
          <p className="body">{it.text}</p>
        </details>
      ))}
    </div>
  );
}
