import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { formatJournalDate, getJournalEntry, journalEntries } from "@/data/catalogue";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/journal/$slug")({
  component: JournalEntryPage,
  head: ({ params }) => {
    const entry = getJournalEntry(params.slug);
    const title = entry ? entry.title : "Journal story";
    return storefrontHead({
      title,
      description: entry ? entry.excerpt : "A story from the Kestorae journal.",
      path: `/journal/${encodeURIComponent(params.slug)}`,
      type: "article",
    });
  },
});

function JournalEntryPage() {
  const { slug } = Route.useParams();
  const entry = getJournalEntry(slug);

  if (!entry) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-screen-xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md border border-border bg-background px-6 py-12 text-center">
            <h1 className="font-display text-xl font-medium text-brand-charcoal">
              Story not found
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              “{slug}” is not part of the journal yet.
            </p>
            <Link
              to="/journal"
              className="mt-6 inline-block text-sm font-medium text-brand-forest hover:underline"
            >
              Back to the journal
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const related = journalEntries.filter((item) => item.slug !== entry.slug).slice(0, 2);

  return (
    <main className="flex-1">
      <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-xs text-muted-foreground"
        >
          <Link to="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <ChevronRight aria-hidden="true" className="size-3" />
          <Link to="/journal" className="transition-colors hover:text-foreground">
            Journal
          </Link>
          <ChevronRight aria-hidden="true" className="size-3" />
          <span
            aria-current="page"
            className="max-w-[12rem] truncate text-foreground sm:max-w-none"
          >
            {entry.title}
          </span>
        </nav>

        <header>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-olive">
            {entry.category} · {entry.readingTime}
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-brand-charcoal sm:text-4xl">
            {entry.title}
          </h1>
          <p className="mt-3 text-xs text-muted-foreground">{formatJournalDate(entry.date)}</p>
        </header>

        <img
          src={entry.image}
          alt={entry.imageAlt}
          width="1152"
          height="600"
          fetchPriority="high"
          className="mt-8 aspect-[2/1] w-full rounded-md object-cover"
        />

        <div className="mt-8 space-y-5">
          <p className="font-display text-lg leading-8 text-brand-charcoal">{entry.excerpt}</p>
          {entry.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-base leading-8 text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        <footer className="mt-12 border-t border-border pt-8">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-olive">
            Keep reading
          </p>
          <ul className="mt-4 space-y-4">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  to="/journal/$slug"
                  params={{ slug: item.slug }}
                  className="group block border border-border bg-background p-4 transition-shadow hover:shadow-md"
                >
                  <p className="font-display text-sm font-medium text-brand-charcoal transition-colors group-hover:text-brand-forest">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      </article>
    </main>
  );
}
