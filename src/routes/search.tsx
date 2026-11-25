import { createFileRoute, Link } from "@tanstack/react-router";
import { SearchX } from "lucide-react";

import { ProductCard } from "@/components/storefront/ProductCard";
import { Button } from "@/components/ui/button";
import { searchProducts } from "@/data/catalogue";
import { rooms } from "@/data/storefront";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
  }),
  component: SearchPage,
  head: () =>
    storefrontHead({
      title: "Search home and lifestyle",
      description: "Search the Kestorae home and lifestyle collection.",
      path: "/search",
    }),
});

function SearchPage() {
  const { q } = Route.useSearch();
  const term = q.trim();
  const results = searchProducts(term);
  const hasQuery = term.length > 0;

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
          <span aria-current="page" className="text-foreground">
            Search
          </span>
        </nav>

        <header className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-olive">
            Search
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-brand-charcoal sm:text-4xl">
            {hasQuery ? `Results for “${term}”` : "Search Kestorae"}
          </h1>
          {hasQuery ? (
            <p className="mt-4 text-sm leading-6 text-muted-foreground" aria-live="polite">
              {results.length} {results.length === 1 ? "piece" : "pieces"} found.
            </p>
          ) : (
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Look for a piece by name, or browse by room — try “linen”, “oak”, or “lighting”.
            </p>
          )}
        </header>

        {hasQuery && results.length === 0 ? (
          <section className="mt-12 max-w-md border border-border bg-background px-6 py-12 text-center">
            <SearchX aria-hidden="true" className="mx-auto size-8 text-brand-olive" />
            <h2 className="mt-4 font-display text-lg font-medium text-brand-charcoal">
              No matching pieces
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Nothing in the collection matches “{term}”. Try a material, a room, or a shorter word.
            </p>
            <Button asChild variant="outline" className="mt-6 bg-background">
              <Link to="/shop">Browse the full shop</Link>
            </Button>
          </section>
        ) : null}

        {results.length ? (
          <section aria-label="Search results" className="mt-10">
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>
        ) : null}

        {!hasQuery ? (
          <section aria-label="Browse by room" className="mt-12 border-t border-border pt-8">
            <h2 className="font-display text-lg font-medium text-brand-charcoal">
              Or start with a room
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {rooms.map((room) => (
                <Button
                  asChild
                  key={room.slug}
                  variant="outline"
                  size="sm"
                  className="bg-background"
                >
                  <Link to="/rooms/$slug" params={{ slug: room.slug }}>
                    {room.title}
                  </Link>
                </Button>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
