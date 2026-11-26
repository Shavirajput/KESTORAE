import { CircleCheck, Truck, RotateCcw, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "Complimentary delivery over £120",
    text: "Tracked standard courier delivery across the UK in 2–4 working days.",
  },
  {
    icon: RotateCcw,
    title: "30-day conscious returns",
    text: "Take time living with your pieces at home. Unused items return cleanly within 30 days.",
  },
  {
    icon: ShieldCheck,
    title: "Built to endure",
    text: "Solid timber, European flax, and small-batch ceramics chosen for everyday longevity.",
  },
];

export function AssuranceStrip() {
  return (
    <section aria-label="Shopping assurances" className="border-t border-border bg-brand-sand/40">
      <div className="mx-auto grid max-w-[1320px] gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3.5">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-sm border border-border/70 bg-background text-brand-forest">
              <Icon aria-hidden="true" className="size-4 stroke-[1.75]" />
            </span>
            <div className="min-w-0">
              <h2 className="font-display text-xs font-semibold uppercase tracking-[0.06em] text-brand-charcoal">
                {title}
              </h2>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function EmptyState({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-lg rounded-md border border-border bg-background px-6 py-12 text-center sm:px-10">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-sand/60">
        <CircleCheck aria-hidden="true" className="size-6 text-brand-forest" />
      </span>
      <h2 className="mt-5 font-display text-xl font-medium text-brand-charcoal sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2.5 text-sm leading-6 text-muted-foreground">{description}</p>
      {children ? <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div> : null}
    </div>
  );
}
