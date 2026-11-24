import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CircleCheck, House, Ruler } from "lucide-react";

import { Button } from "@/components/ui/button";
import { rooms } from "@/data/storefront";
import heroImage from "@/assets/hero-living-room.png.asset.json";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () =>
    storefrontHead({
      title: "Thoughtfully designed home essentials",
      description: "Discover room-led home and lifestyle ideas for calmer, more considered everyday spaces.",
      path: "/",
    }),
});

function HomePage() {
  return (
    <main className="flex-1">
      <section className="mx-auto grid max-w-screen-xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-8 lg:py-16">
        <div className="max-w-xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-olive">
            Kestorae · Home & Lifestyle
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-tight text-brand-charcoal sm:text-5xl">
            Make room for considered living.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
            Thoughtful essentials for everyday spaces—chosen to bring a little more calm, comfort, and clarity to home.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link to="/shop">
                Shop essentials <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href="#rooms">Explore by room</a>
            </Button>
          </div>
          <div className="mt-9 grid max-w-md grid-cols-3 gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
            <p>Room-led discovery</p>
            <p>Thoughtful function</p>
            <p>Everyday comfort</p>
          </div>
        </div>

        <figure className="relative min-w-0">
          <img
            src={heroImage.url}
            alt="A softly lit living room with natural wood furniture and considered home details"
            width="576"
            height="396"
            fetchPriority="high"
            className="aspect-[4/3] w-full rounded-md object-cover"
          />
          <figcaption className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] border border-border bg-background/95 px-4 py-3 shadow-sm sm:bottom-5 sm:left-5">
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-brand-olive">
              Room study
            </p>
            <p className="mt-1 font-display text-sm font-medium text-brand-charcoal">A living sanctuary</p>
          </figcaption>
        </figure>
      </section>

      <section aria-label="Kestorae principles" className="border-y border-border bg-background">
        <div className="mx-auto grid max-w-screen-xl gap-6 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <House aria-hidden="true" className="size-5 shrink-0 text-brand-forest" />
            <div>
              <h2 className="font-display text-xs font-semibold uppercase">Room-led discovery</h2>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">Find a thoughtful starting point for each space.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Ruler aria-hidden="true" className="size-5 shrink-0 text-brand-forest" />
            <div>
              <h2 className="font-display text-xs font-semibold uppercase">Useful by design</h2>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">Everyday function, considered alongside form.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CircleCheck aria-hidden="true" className="size-5 shrink-0 text-brand-forest" />
            <div>
              <h2 className="font-display text-xs font-semibold uppercase">Clarity comes first</h2>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">Practical information belongs within reach.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="rooms" className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-olive">
              Spaces of refuge
            </p>
            <h2 className="mt-2 font-display text-2xl font-medium text-brand-charcoal sm:text-3xl">
              Start with the room.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              A calm, practical edit of ideas for the spaces you return to every day.
            </p>
          </div>
          <Button asChild variant="link" className="px-0">
            <Link to="/shop">
              View the shop <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {rooms.map((room) => (
            <Link
              key={room.slug}
              to="/rooms/$slug"
              params={{ slug: room.slug }}
              className="group block min-w-0"
            >
              <img
                src={room.image}
                alt={room.alt}
                width="700"
                height="384"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-sm object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
              />
              <div className="flex items-start justify-between gap-2 pt-3">
                <div className="min-w-0">
                  <h3 className="font-display text-sm font-medium text-brand-charcoal">{room.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{room.description}</p>
                </div>
                <ArrowRight aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-forest transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-brand-sand/50">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-olive">
              The Kestorae principles
            </p>
            <h2 className="mt-3 font-display text-2xl font-medium leading-tight text-brand-charcoal sm:text-3xl">
              Designed with intention. Made for everyday life.
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              A good home is shaped by useful things, clear choices, and the details that make daily rituals feel easier.
            </p>
            <Button asChild variant="outline" className="mt-6 bg-background">
              <Link to="/about">
                Our philosophy <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
