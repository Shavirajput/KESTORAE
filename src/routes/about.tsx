import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, Heart, House, Ruler, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-living-room.png.asset.json";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () =>
    storefrontHead({
      title: "About Kestorae",
      description: "Discover the Kestorae philosophy: thoughtful utility, clarity, and calm everyday living.",
      path: "/about",
    }),
});

const principles = [
  {
    icon: House,
    title: "Useful first",
    text: "Every piece earns its place by being easy to live with — the everyday test comes before the catalogue photo.",
  },
  {
    icon: Ruler,
    title: "Honest materials",
    text: "Washed linen, solid oak, glazed stoneware. Materials chosen to age well and be repaired, not replaced.",
  },
  {
    icon: Heart,
    title: "Calm by design",
    text: "Quiet palettes and gentle forms, so a room lowers your pulse instead of raising your eyebrow.",
  },
  {
    icon: Sparkles,
    title: "Tested in real homes",
    text: "Each piece spends months in ordinary households before joining the collection — many do not make it.",
  },
];

function AboutPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-border bg-brand-sand/40">
        <div className="mx-auto grid max-w-screen-xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-olive">
              Our philosophy
            </p>
            <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-brand-charcoal sm:text-4xl">
              Useful things, thoughtfully chosen
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
              Kestorae began with a simple frustration: homes full of things that looked right in photographs but
              worked badly in life. We design the opposite — quiet, practical pieces for the rooms you return to
              every day.
            </p>
          </div>
          <img
            src={heroImage.url}
            alt="A softly lit living room with natural wood furniture"
            width="760"
            height="500"
            fetchPriority="high"
            className="aspect-[3/2] w-full rounded-md object-cover"
          />
        </div>
      </section>

      <section aria-label="Our principles" className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-medium text-brand-charcoal sm:text-3xl">What we hold to</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ icon: Icon, title, text }) => (
            <div key={title} className="border-t-2 border-brand-forest/60 pt-4">
              <Icon aria-hidden="true" className="size-5 text-brand-forest" />
              <h3 className="mt-3 font-display text-sm font-semibold uppercase text-brand-charcoal">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-brand-sand/40">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-medium text-brand-charcoal sm:text-2xl">
                How the collection is made
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Each piece starts as a problem observed in a real home: coats with nowhere to land, linen that pills
                after a season, lamps too bright for the last hour of the day. We prototype slowly, test in ordinary
                households for months, and only then consider production. It is a small collection by design — and it
                grows only as fast as things can be got genuinely right.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-medium text-brand-charcoal sm:text-2xl">
                A note on this storefront
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Kestorae is a design concept presented as a portfolio piece. The catalogue, prices, and checkout flow
                are illustrative, and no orders are fulfilled. The philosophy, however, is entirely sincere: choose
                fewer things, know why you chose them, and give every daily object a place to rest.
              </p>
              <Button asChild className="mt-6">
                <Link to="/shop">Explore the collection</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
