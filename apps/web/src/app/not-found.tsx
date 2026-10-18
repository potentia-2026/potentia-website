import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container max-w-3xl">
        <span className="label">Page not found</span>
        <h1 className="mt-3 !text-[clamp(2rem,4vw,3rem)]">We couldn&apos;t find that page</h1>
        <p className="lead mt-5">It may have moved. Choose where you&apos;d like to go next.</p>
        <div className="mt-8 flex flex-wrap gap-3.5"><Link href="/banking" className="btn">Banking &amp; Fintech</Link><Link href="/business" className="btn-line">Business Automation</Link><Link href="/education" className="btn-line">Education &amp; Wellbeing</Link></div>
      </div>
    </section>
  );
}
