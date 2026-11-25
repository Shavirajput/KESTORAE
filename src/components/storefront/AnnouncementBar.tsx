export function AnnouncementBar() {
  return (
    <div className="border-b border-border/60 bg-brand-sand px-4 py-2 text-center text-[11px] leading-5 tracking-[0.02em] text-brand-charcoal sm:text-xs">
      <p className="mx-auto max-w-[1320px]">
        Thoughtfully designed essentials for everyday living
        <span aria-hidden="true" className="mx-2 text-brand-clay">
          •
        </span>
        Complimentary delivery on orders over £120
        <span aria-hidden="true" className="mx-2 text-brand-clay">
          •
        </span>
        30-day conscious returns
      </p>
    </div>
  );
}
