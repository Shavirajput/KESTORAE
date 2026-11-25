import { Feather, Grid2x2, Sparkles } from "lucide-react";

const PRINCIPLES = [
  {
    number: "01",
    title: "Thoughtful Functionality",
    description:
      "We prioritise practical proportions, clean storage, and intuitive details designed to bring quiet organisation to daily rituals.",
    icon: Grid2x2,
  },
  {
    number: "02",
    title: "Tactile Natural Materials",
    description:
      "From oiled solid oak and glazed stoneware to stonewashed flax linen, every piece is chosen for honest textures that feel calm in everyday use.",
    icon: Feather,
  },
  {
    number: "03",
    title: "Quiet Aesthetics",
    description:
      "Understated Scandinavian silhouettes and a warm neutral palette allow objects to settle gracefully into your home season after season.",
    icon: Sparkles,
  },
] as const;

export function PrinciplesSection() {
  return (
    <section
      aria-labelledby="principles-heading"
      className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
          The Kestorae Principles
        </p>
        <h2
          id="principles-heading"
          className="mt-2.5 font-display text-3xl font-medium tracking-[-0.015em] text-brand-charcoal sm:text-4xl"
        >
          Designed with Intention, Crafted to Endure.
        </h2>
        <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          A considered home is shaped by useful objects, honest materials, and the quiet details
          that support everyday living.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {PRINCIPLES.map((principle) => {
          const Icon = principle.icon;
          return (
            <article
              key={principle.number}
              className="flex flex-col justify-between rounded-lg border border-border/70 bg-brand-sand/55 p-7 sm:p-8"
            >
              <div>
                <div className="flex size-11 items-center justify-center rounded-md border border-border/70 bg-brand-ivory text-brand-forest">
                  <Icon aria-hidden="true" className="size-5 stroke-[1.6]" />
                </div>
                <h3 className="mt-6 font-display text-lg font-medium text-brand-charcoal">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {principle.description}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-brand-clay/30 pt-4">
                <span className="font-display text-xs font-semibold tracking-[0.14em] text-brand-forest">
                  {principle.number}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-brand-clay/30" />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
