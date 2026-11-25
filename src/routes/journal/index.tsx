import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";

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
  const [featured, ...rest] = journalEntries;

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex items-center gap-2 text-xs text-muted-foreground"
        >
          <Link to="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <ChevronRight aria-hidden="true" className="size-3" />
          <span aria-current="page" className="text-foreground">
            Journal
          </span>
        </nav>

        <header className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-olive">
            The journal
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-brand-charcoal sm:text-4xl">
            Notes for considered living
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Practical ideas on creating calm, useful everyday spaces — written slowly, published
            occasionally.
          </p>
        </header>

        {featured ? (
          <Link
            to="/journal/$slug"
            params={{ slug: featured.slug }}
            className="group mt-10 grid gap-6 border border-border bg-background p-4 transition-shadow hover:shadow-md sm:p-6 lg:grid-cols-2 lg:gap-10"
          >
            <img
              src={featured.image}
              alt={featured.imageAlt}
              width="760"
              height="500"
              loading="lazy"
              className="aspect-[3/2] w-full rounded-sm object-cover"
            />
            <div className="flex flex-col justify-center">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-olive">
                {featured.category} · {featured.readingTime}
              </p>
              <h2 className="mt-3 font-display text-2xl font-medium leading-snug text-brand-charcoal transition-colors group-hover:text-brand-forest sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{featured.excerpt}</p>
              <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-forest">
                Read the story
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </p>
            </div>
          </Link>
        ) : null}

        <section
          aria-label="More journal stories"
          className="mt-12 grid gap-x-4 gap-y-10 sm:grid-cols-2"
        >
          {rest.map((entry) => (
            <Link
              key={entry.slug}
              to="/journal/$slug"
              params={{ slug: entry.slug }}
              className="group block min-w-0"
            >
              <img
                src={entry.image}
                alt={entry.imageAlt}
                width="700"
                height="384"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-sm object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
              />
              <p className="mt-4 font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-olive">
                {entry.category} · {entry.readingTime}
              </p>
              <h2 className="mt-2 font-display text-lg font-medium leading-snug text-brand-charcoal transition-colors group-hover:text-brand-forest">
                {entry.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{entry.excerpt}</p>
              <p className="mt-3 text-xs text-muted-foreground">{formatJournalDate(entry.date)}</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
