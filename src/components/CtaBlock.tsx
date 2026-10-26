import Link from 'next/link';
import { site } from '@/config/site';

// Closing call to action: free quote and WhatsApp.
export default function CtaBlock({ title = 'Ready to plan your safari?', text = 'Tell us your dates and what you would love to see. A consultant in Arusha will reply with ideas and a free, no-obligation quote.' }: { title?: string; text?: string }) {
  return (
    <section className="wrap mt-24" aria-labelledby="cta-heading">
      <div className="flex flex-col items-center rounded-2xl bg-navy px-6 py-16 text-center text-[#f4f5f0] sm:px-12">
        <h2 id="cta-heading" className="max-w-[22ch] text-step-4">{title}</h2>
        <p className="mt-4 max-w-[52ch] text-[#d3dae0]">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact#enquire" className="btn btn-primary">Get Free Quote</Link>
          <a href={`https://wa.me/${site.whatsapp}`} className="btn btn-outline-light">WhatsApp us</a>
        </div>
      </div>
    </section>
  );
}
