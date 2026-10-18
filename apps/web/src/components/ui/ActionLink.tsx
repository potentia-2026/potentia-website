'use client';

import { prefillForm, selectProduct } from '@/lib/events';

interface Props {
  href: string;
  product?: number;
  country?: string;
  interest?: string;
  className?: string;
  children: React.ReactNode;
  'aria-label'?: string;
}

/** An in-page link that can also pick a product tab or prefill the demo form. */
export function ActionLink({ href, product, country, interest, className, children, ...rest }: Props) {
  return (
    <a
      href={href}
      className={className}
      aria-label={rest['aria-label']}
      onClick={() => {
        if (product !== undefined) selectProduct(product);
        if (country || interest) prefillForm({ country, interest });
      }}
    >
      {children}
    </a>
  );
}
