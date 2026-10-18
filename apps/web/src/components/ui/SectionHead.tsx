interface Props {
  label: string;
  title: string;
  lead?: string;
  as?: 'h1' | 'h2';
  aside?: React.ReactNode;
  /**
   * 'split' (practice pages): label + supporting line on the left, bold title on the right.
   * 'stacked' (home, about): label + title on the left, supporting line on the right.
   */
  layout?: 'split' | 'stacked';
}

export function SectionHead({ label, title, lead, as = 'h2', aside, layout = 'stacked' }: Props) {
  const Title = as;
  if (layout === 'split') {
    return (
      <div className="mb-8 grid items-center gap-x-[clamp(28px,6vw,96px)] gap-y-3 md:mb-11 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <div className="flex min-w-0 flex-col gap-2.5 max-md:contents">
          <span className="label max-md:order-1">{label}</span>
          {lead && <p className="lead max-w-[46ch] max-md:order-3">{lead}</p>}
          {aside && <div className="mt-2 max-md:order-4">{aside}</div>}
        </div>
        <Title className="min-w-0 max-md:order-2">{title}</Title>
      </div>
    );
  }
  return (
    <div className="mb-8 grid items-end gap-x-[clamp(28px,6vw,96px)] gap-y-3 md:mb-11 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="flex min-w-0 flex-col gap-3">
        <span className="label">{label}</span>
        <Title>{title}</Title>
      </div>
      {(lead || aside) && (
        <div className="flex min-w-0 flex-wrap items-end justify-between gap-4 md:pb-1.5">
          {lead && <p className="lead">{lead}</p>}
          {aside}
        </div>
      )}
    </div>
  );
}
