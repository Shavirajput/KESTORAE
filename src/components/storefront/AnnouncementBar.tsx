export function AnnouncementBar() {
  return (
    <div className="bg-brand-sand px-4 py-2 text-center text-xs leading-5 text-brand-charcoal">
      <p>
        <span className="font-semibold">Portfolio preview</span>
        <span aria-hidden="true"> · </span>
        Thoughtfully designed essentials for everyday living
        <span aria-hidden="true"> · </span>
        Complimentary delivery over £120
        <span aria-hidden="true"> · </span>
        30-day conscious returns <span className="text-muted-foreground">(illustrative)</span>
      </p>
    </div>
  );
}