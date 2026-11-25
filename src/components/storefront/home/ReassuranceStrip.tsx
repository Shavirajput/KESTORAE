import { Compass, House, Layers, Sun } from "lucide-react";

const REASSURANCE_ITEMS = [
  {
    title: "Thoughtful Design",
    description: "Essentials made for everyday living.",
    icon: Compass,
  },
  {
    title: "Considered Materials",
    description: "A focus on tactile, practical materials.",
    icon: Layers,
  },
  {
    title: "Timeless Aesthetic",
    description: "Understated Scandinavian-inspired design.",
    icon: Sun,
  },
  {
    title: "Conscious Living",
    description: "Buy thoughtfully and choose items to keep.",
    icon: House,
  },
] as const;

export function ReassuranceStrip() {
  return (
    <section aria-label="Kestorae brand values" className="border-y border-border/80 bg-card/80">
      <div className="mx-auto grid max-w-[1320px] gap-6 px-4 py-7 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border/80 lg:px-8">
        {REASSURANCE_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`flex items-start gap-3.5 ${
                index === 0
                  ? "lg:pr-6"
                  : index === REASSURANCE_ITEMS.length - 1
                    ? "lg:pl-6"
                    : "lg:px-6"
              }`}
            >
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-sm border border-border/70 bg-brand-sand/45 text-brand-forest">
                <Icon aria-hidden="true" className="size-4 stroke-[1.75]" />
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-xs font-semibold uppercase tracking-[0.06em] text-brand-charcoal">
                  {item.title}
                </h2>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
