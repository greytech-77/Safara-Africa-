type Props = { slug: string; title: string; days: number; price?: { label: string; groupSize: number; isPlaceholder: boolean } };

// Bottom bar on phones and tablets (the site-wide Call/Enquire bar hides on trip pages): the price and a
// "Book this journey" button that scrolls to the booking form (#book, after the day by day).
export default function EnquiryPanel({ price }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-deep-teal/10 bg-off-white/95 px-4 py-3 backdrop-blur-sm lg:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        <div className="min-w-0 flex-1">
          {price ? (
            <p className="truncate font-medium text-deep-teal">
              From {price.label} <span className="font-normal text-slate">pp{price.isPlaceholder ? ' · TBC' : ''}</span>
            </p>
          ) : (
            <p className="font-medium text-deep-teal">Price on request</p>
          )}
        </div>
        <a href="#book" className="btn btn-primary">
          Book this journey
        </a>
      </div>
    </div>
  );
}
