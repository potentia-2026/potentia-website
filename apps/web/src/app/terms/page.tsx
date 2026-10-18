import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of use – Potentia', robots: { index: false } };

/** Placeholder: Potentia will supply the final text before launch. */
export default function Page() {
  return (
    <section className="section">
      <div className="container max-w-3xl">
        <span className="label">Legal</span>
        <h1 className="mt-3 !text-[clamp(2rem,4vw,3rem)]">Terms of use</h1>
        <p className="lead mt-5">The full terms of use will be published here before launch. For questions in the meantime, email info@my-potentia.com.</p>
      </div>
    </section>
  );
}
