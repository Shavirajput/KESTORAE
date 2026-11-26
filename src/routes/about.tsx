import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, House, Ruler, Sparkles } from "lucide-react";

import { ResponsivePicture } from "@/components/storefront/ResponsivePicture";
import { StorefrontBreadcrumb } from "@/components/storefront/StorefrontBreadcrumb";
import { AssuranceStrip } from "@/components/storefront/StorefrontSections";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/responsive-images";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () =>
    storefrontHead({
      title: "About Kestorae",
      description:
        "Discover the Kestorae philosophy: thoughtful utility, clarity, and calm everyday living.",
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
    text: "Washed flax linen, solid European oak, glazed stoneware. Materials chosen to age well and be repaired, not replaced.",
  },
  {
    icon: Heart,
    title: "Calm by design",
    text: "Quiet palettes and gentle forms, so a room lowers your pulse instead of competing for attention.",
  },
  {
    icon: Sparkles,
    title: "Tested in real homes",
    text: "Each piece spends months in ordinary households before joining the collection — many prototypes never make the cut.",
  },
];

const materialPillars = [
  {
    name: "Solid European Oak & Ash",
    detail:
      "Finished with breathable hard-wax oil so grain stays tactile, repairable, and warm to the touch over decades of daily use.",
  },
  {
    name: "Stonewashed Flax Linen",
    detail:
      "Woven from long-staple European flax and pre-washed for relaxed drape from day one, growing softer with every cycle.",
  },
  {
    name: "Small-Batch Glazed Stoneware",
    detail:
      "High-fired clay bodies finished in muted matte and reactive glazes that stack neatly and withstand everyday dining.",
  },
] as const;

function AboutPage() {
  return (
    <main className="flex-1">
      <section id="philosophy" className="scroll-mt-24 border-b border-border bg-brand-sand/40">
        <div className="mx-auto max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
          <StorefrontBreadcrumb
            className="mb-8"
            items={[{ label: "Home", to: "/" }, { label: "About" }]}
          />
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
                Our Philosophy
              </p>
              <h1 className="mt-3 font-display text-3xl font-medium leading-tight tracking-[-0.015em] text-brand-charcoal sm:text-4xl">
                Useful things, thoughtfully chosen
              </h1>
              <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
                Kestorae began with a simple frustration: homes full of things that looked right in
                photographs but worked poorly in daily life. We design the opposite — quiet,
                practical pieces for the rooms you return to every day.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="h-11 rounded-sm bg-brand-forest px-6 font-display text-xs font-medium text-brand-ivory hover:bg-brand-forest/90"
                >
                  <Link to="/shop">
                    Explore the collection <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-sm border-brand-forest/35 bg-background px-6 font-display text-xs font-medium text-brand-charcoal hover:border-brand-forest hover:text-brand-forest"
                >
                  <Link to="/journal">Read the journal</Link>
                </Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-border/70 bg-brand-sand/50">
              <ResponsivePicture
                asset={IMAGES.heroLivingRoom}
                alt="A softly lit living room with natural wood furniture"
                sizes="(max-width: 1023px) calc(100vw - 2rem), 620px"
                width={760}
                height={500}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                className="aspect-[3/2] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="responsible-choices"
        aria-labelledby="principles-heading"
        className="mx-auto max-w-[1320px] scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
          Responsible Choices
        </p>
        <h2
          id="principles-heading"
          className="mt-2.5 font-display text-2xl font-medium text-brand-charcoal sm:text-3xl"
        >
          What we hold to
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ icon: Icon, title, text }) => (
            <div key={title} className="border-t-2 border-brand-forest/60 pt-5">
              <Icon aria-hidden="true" className="size-5 text-brand-forest" />
              <h3 className="mt-3.5 font-display text-sm font-semibold uppercase tracking-[0.06em] text-brand-charcoal">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="materials"
        aria-labelledby="materials-heading"
        className="scroll-mt-24 border-y border-border bg-brand-sand/35"
      >
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-20">
          <div className="overflow-hidden rounded-lg border border-border/70 bg-background">
            <ResponsivePicture
              asset={IMAGES.studioMorningLight}
              alt="Sunlight across a solid oak studio table and stoneware vessels"
              sizes="(max-width: 1023px) calc(100vw - 2rem), 620px"
              width={760}
              height={500}
              loading="lazy"
              className="aspect-[3/2] w-full object-cover"
            />
          </div>
          <div>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
              Materials &amp; Craft
            </p>
            <h2
              id="materials-heading"
              className="mt-2.5 font-display text-2xl font-medium text-brand-charcoal sm:text-3xl"
            >
              Chosen for how they feel in year ten
            </h2>
            <dl className="mt-6 space-y-5">
              {materialPillars.map((pillar) => (
                <div key={pillar.name} className="border-t border-border/80 pt-4">
                  <dt className="font-display text-sm font-semibold text-brand-charcoal">
                    {pillar.name}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-6 text-muted-foreground">
                    {pillar.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section
        id="studio"
        aria-labelledby="studio-heading"
        className="mx-auto max-w-[1320px] scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
              Our Process
            </p>
            <h2
              id="studio-heading"
              className="mt-2.5 font-display text-xl font-medium text-brand-charcoal sm:text-2xl"
            >
              How the collection is made
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Each piece starts as a problem observed in a real home: coats with nowhere to land,
              linen that pills after a season, lamps too bright for the last hour of the day. We
              prototype slowly, test in ordinary households for months, and only then consider
              production. It is a small collection by design — and it grows only as fast as things
              can be got genuinely right.
            </p>
          </div>
          <div>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
              Nordic Studio · Careers
            </p>
            <h2 className="mt-2.5 font-display text-xl font-medium text-brand-charcoal sm:text-2xl">
              Copenhagen · Stockholm · London
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Our small team works across industrial design, textile sourcing, and customer care.
              While this storefront is presented as an illustrative portfolio concept, our design
              ethos is sincere: choose fewer things, understand how they are made, and give every
              daily object a quiet place to rest.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-6 h-10 rounded-sm border-brand-forest/35 font-display text-xs font-medium text-brand-forest hover:border-brand-forest hover:bg-brand-forest hover:text-brand-ivory"
            >
              <Link to="/support">Contact our studio</Link>
            </Button>
          </div>
        </div>
      </section>

      <AssuranceStrip />
    </main>
  );
}
