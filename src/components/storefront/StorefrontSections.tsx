import { CircleCheck, Truck, RotateCcw, Lock } from "lucide-react";

const items = [
  { icon: Truck, title: "Free delivery over £120", text: "Standard delivery in 2–4 working days." },
  { icon: RotateCcw, title: "30-day returns", text: "Change of mind? Send pieces back unused." },
  { icon: Lock, title: "Considered checkout", text: "Illustrative flow — no payment is taken." },
];

export function AssuranceStrip() {
  return (
    <section aria-label="Shopping assurances" className="border-t border-border bg-brand-sand/40">
      <div className="mx-auto grid max-w-screen-xl gap-4 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:px-8">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3">
            <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-forest" />
            <div>
              <h2 className="font-display text-xs font-semibold uppercase text-brand-charcoal">{title}</h2>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function EmptyState({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-md border border-border bg-background px-6 py-12 text-center">
      <CircleCheck aria-hidden="true" className="mx-auto size-8 text-brand-olive" />
      <h2 className="mt-4 font-display text-xl font-medium text-brand-charcoal">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}
