import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ProductCard } from "@/components/storefront/ProductCard";
import { StorefrontBreadcrumb } from "@/components/storefront/StorefrontBreadcrumb";
import { EmptyState } from "@/components/storefront/StorefrontSections";
import { Button } from "@/components/ui/button";
import { formatJournalDate, getJournalEntry, getProduct, journalEntries } from "@/data/catalogue";
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
        <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8">
          <EmptyState
            title="Story not found"
            description={`“${slug}” is not part of the Kestorae journal yet.`}
          >
            <Button
              asChild
              className="rounded-sm bg-brand-forest text-brand-ivory hover:bg-brand-forest/90"
            >
              <Link to="/journal">Back to the journal</Link>
            </Button>
          </EmptyState>
        </div>
      </main>
    );
  }

  const relatedArticles = journalEntries.filter((item) => item.slug !== entry.slug).slice(0, 2);
  const mentionedProducts = (entry.relatedProductSlugs ?? [])
    .map((productSlug) => getProduct(productSlug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <StorefrontBreadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Journal", to: "/journal" },
            { label: entry.title },
          ]}
        />

        <article className="mx-auto max-w-3xl">
          <header>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-olive">
              {entry.category} · {entry.readingTime}
            </p>
            <h1 className="mt-3 font-display text-3xl font-medium leading-tight tracking-[-0.015em] text-brand-charcoal sm:text-4xl">
              {entry.title}
            </h1>
            <p className="mt-3 text-xs text-muted-foreground">
              Published {formatJournalDate(entry.date)} · Kestorae Editorial Studio
            </p>
          </header>

          <div className="mt-8 overflow-hidden rounded-lg border border-border/70 bg-brand-sand/40">
            <img
              src={entry.image}
              alt={entry.imageAlt}
              width="1152"
              height="600"
              fetchPriority="high"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>

          <div className="mt-8 space-y-6">
            <p className="font-display text-lg leading-8 text-brand-charcoal sm:text-xl">
              {entry.excerpt}
            </p>
            {entry.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-base leading-8 text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {mentionedProducts.length > 0 ? (
          <section
            aria-labelledby="mentioned-pieces-heading"
            className="mt-16 border-t border-border pt-12"
          >
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
                  Shop the Story
                </p>
                <h2
                  id="mentioned-pieces-heading"
                  className="mt-2 font-display text-2xl font-medium text-brand-charcoal"
                >
                  Pieces mentioned in this note
                </h2>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.08em] text-brand-forest hover:text-brand-charcoal"
              >
                Explore all pieces <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mentionedProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>
        ) : null}

        <section
          aria-labelledby="keep-reading-heading"
          className="mt-16 border-t border-border py-12"
        >
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
            Keep Reading
          </p>
          <h2
            id="keep-reading-heading"
            className="mt-2 font-display text-2xl font-medium text-brand-charcoal"
          >
            More from the Journal
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {relatedArticles.map((item) => (
              <Link
                key={item.slug}
                to="/journal/$slug"
                params={{ slug: item.slug }}
                className="group flex flex-col gap-4 rounded-md border border-border bg-background p-4 transition-shadow hover:shadow-md sm:flex-row sm:items-center"
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  width="180"
                  height="135"
                  loading="lazy"
                  className="aspect-[4/3] w-full shrink-0 rounded-sm object-cover sm:w-36"
                />
                <div className="min-w-0">
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-olive">
                    {item.category} · {item.readingTime}
                  </p>
                  <p className="mt-1.5 font-display text-base font-medium text-brand-charcoal transition-colors group-hover:text-brand-forest">
                    {item.title}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
