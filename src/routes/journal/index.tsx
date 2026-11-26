import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ResponsivePicture } from "@/components/storefront/ResponsivePicture";
import { StorefrontBreadcrumb } from "@/components/storefront/StorefrontBreadcrumb";
import { formatJournalDate, journalEntries } from "@/data/catalogue";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/journal/")({
  component: JournalPage,
  head: () =>
    storefrontHead({
      title: "Journal for considered living",
      description:
        "Ideas for thoughtful, practical, and calm everyday spaces from the Kestorae journal.",
      path: "/journal",
    }),
});

function JournalPage() {
  const categories = ["All", ...Array.from(new Set(journalEntries.map((entry) => entry.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEntries =
    activeCategory === "All"
      ? journalEntries
      : journalEntries.filter((entry) => entry.category === activeCategory);

  const [featured, ...rest] = filteredEntries;

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <StorefrontBreadcrumb items={[{ label: "Home", to: "/" }, { label: "Journal" }]} />

        <header className="max-w-2xl">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
            The Journal
          </p>
          <h1 className="mt-2.5 font-display text-3xl font-medium leading-tight tracking-[-0.015em] text-brand-charcoal sm:text-4xl">
            Notes for considered living
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Practical ideas on creating calm, useful everyday spaces — written slowly, published
            occasionally.
          </p>
        </header>

        <div
          role="tablist"
          aria-label="Filter journal stories by category"
          className="mt-8 flex flex-wrap gap-2 border-b border-border/80 pb-4"
        >
          {categories.map((category) => {
            const selected = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveCategory(category)}
                className={`rounded-sm px-4 py-2 font-display text-xs font-medium transition-colors ${
                  selected
                    ? "bg-brand-forest text-brand-ivory"
                    : "bg-brand-sand/45 text-brand-charcoal hover:bg-brand-sand"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {featured ? (
          <Link
            to="/journal/$slug"
            params={{ slug: featured.slug }}
            className="group mt-10 grid gap-6 overflow-hidden rounded-lg border border-border bg-background p-4 transition-shadow hover:shadow-md sm:p-6 lg:grid-cols-2 lg:gap-10"
          >
            <div className="overflow-hidden rounded-sm bg-brand-sand/40">
              <ResponsivePicture
                src={featured.image}
                alt={featured.imageAlt}
                sizes="(max-width: 1023px) calc(100vw - 4rem), 600px"
                width={760}
                height={500}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-olive">
                {featured.category} · {featured.readingTime}
              </p>
              <h2 className="mt-3 font-display text-2xl font-medium leading-snug text-brand-charcoal transition-colors group-hover:text-brand-forest sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{featured.excerpt}</p>
              <p className="mt-4 text-xs text-muted-foreground">
                {formatJournalDate(featured.date)}
              </p>
              <p className="mt-5 inline-flex items-center gap-2 font-display text-xs font-semibold text-brand-forest">
                Read the story
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </p>
            </div>
          </Link>
        ) : null}

        {rest.length > 0 ? (
          <section
            aria-label="More journal stories"
            className="mt-12 grid gap-x-6 gap-y-10 pb-14 sm:grid-cols-2"
          >
            {rest.map((entry) => (
              <Link
                key={entry.slug}
                to="/journal/$slug"
                params={{ slug: entry.slug }}
                className="group block min-w-0"
              >
                <div className="overflow-hidden rounded-md bg-brand-sand/40">
                  <ResponsivePicture
                    src={entry.image}
                    alt={entry.imageAlt}
                    sizes="(max-width: 639px) calc(100vw - 2rem), 620px"
                    width={700}
                    height={384}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                  />
                </div>
                <p className="mt-4 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-olive">
                  {entry.category} · {entry.readingTime}
                </p>
                <h2 className="mt-2 font-display text-xl font-medium leading-snug text-brand-charcoal transition-colors group-hover:text-brand-forest">
                  {entry.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{entry.excerpt}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {formatJournalDate(entry.date)}
                </p>
              </Link>
            ))}
          </section>
        ) : (
          <div className="pb-14" />
        )}
      </div>
    </main>
  );
}
