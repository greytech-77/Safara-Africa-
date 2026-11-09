import Link from 'next/link';
import { whatsappLink, whatsappMessage } from '@/lib/whatsapp';

// Closing call to action: free quote and WhatsApp. `topic` pre-fills the WhatsApp message.
export default function CtaBlock({
  title = 'Ready to plan your safari?',
  text = 'Tell us your dates and what you would love to see. A consultant in Arusha will reply with ideas and a free, no-obligation quote.',
  topic,
}: {
  title?: string;
  text?: string;
  topic?: string;
}) {
  return (
    <section className="band" aria-labelledby="cta-heading">
      <div className="wrap metallic-silver flex flex-col items-center rounded-2xl px-6 py-16 text-center text-deep-teal sm:px-12">
        <h2 id="cta-heading" className="max-w-[22ch] text-step-4">
          {title}
        </h2>
        <p className="mt-3 max-w-[52ch] text-[#26393d]">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact#enquire" className="btn btn-primary">
            Get Free Quote
          </Link>
          <a
            href={whatsappLink(whatsappMessage(topic))}
            className="btn btn-outline hover:border-deep-teal hover:bg-deep-teal hover:text-white"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
