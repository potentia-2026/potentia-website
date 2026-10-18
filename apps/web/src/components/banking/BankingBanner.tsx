import Image from 'next/image';

/** Campaign banner + headline strip that opens the Banking & Fintech page. */
export function BankingBanner() {
  return (
    <>
      <figure className="relative m-0 bg-[#0F0A24] leading-[0]">
        <Image
          src="/images/banking-banner.jpg"
          alt="Empowering future-ready banking: innovative software and consultancy for the GCC and MENA financial sector. Payment Hub, Omni-Channel Solutions, Smart Recon Solutions and Card Management System."
          width={2400}
          height={757}
          priority
          sizes="100vw"
          className="h-auto w-full"
        />
        {/* The banner's printed "Transform Your Banking" button */}
        <a href="#book" aria-label="Transform your banking: book a demo" className="absolute left-[79.4%] top-[28.6%] h-[10%] w-[17.8%] rounded-md hover:shadow-[0_0_0_2px_rgba(199,146,200,.9),0_0_24px_rgba(157,68,150,.6)]" />
      </figure>
      <section className="on-dark border-b border-ink-line bg-[linear-gradient(180deg,#0F0A24_0%,#150826_100%)] text-white">
        <div className="container grid items-end gap-[clamp(20px,4vw,64px)] py-[clamp(32px,4.5vw,56px)] md:grid-cols-[1.1fr_1fr]">
          <div className="min-w-0">
            <span className="label !text-lavender">Banking &amp; Fintech</span>
            <h1 className="mt-2.5 max-w-[16ch] !text-[clamp(2rem,4.2vw,3.4rem)]">One platform for every payment rail</h1>
          </div>
          <div className="min-w-0">
            <p className="lead mb-5 !text-ink-muted">Payments, reconciliation and card software for banks and fintechs across the GCC, Africa and beyond.</p>
            <div className="flex flex-wrap gap-3.5">
              <a href="#book" className="btn">Book a demo</a>
              <a href="#solutions" className="btn-line">Explore solutions</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
