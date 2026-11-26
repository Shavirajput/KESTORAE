import { useEffect, useMemo, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search, SearchX } from "lucide-react";

import { ProductCard } from "@/components/storefront/ProductCard";
import { StorefrontBreadcrumb } from "@/components/storefront/StorefrontBreadcrumb";
import { AssuranceStrip } from "@/components/storefront/StorefrontSections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchProducts } from "@/data/catalogue";
import { rooms } from "@/data/storefront";
import { filterAndSortProducts, type SortOption } from "@/lib/storefront-logic";
import { storefrontHead } from "@/lib/storefront-meta";

const SUGGESTED_TERMS = ["Linen", "Oak", "Stoneware", "Lamp", "Storage", "Candle"] as const;

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
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(q);
  const [sort, setSort] = useState<SortOption>("featured");

  useEffect(() => {
    setInputValue(q);
  }, [q]);

  const term = q.trim();
  const rawResults = useMemo(() => searchProducts(term), [term]);
  const results = useMemo(() => filterAndSortProducts(rawResults, { sort }), [rawResults, sort]);
  const hasQuery = term.length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void navigate({ to: "/search", search: { q: inputValue.trim() } });
  };

  const applySuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    void navigate({ to: "/search", search: { q: suggestion } });
  };

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <StorefrontBreadcrumb items={[{ label: "Home", to: "/" }, { label: "Search" }]} />

        <header className="max-w-2xl">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
            Search Catalogue
          </p>
          <h1 className="mt-2.5 font-display text-3xl font-medium leading-tight tracking-[-0.015em] text-brand-charcoal sm:text-4xl">
            {hasQuery ? `Results for “${term}”` : "Search Kestorae"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            Search by piece name, material, category, or room.
          </p>

          <form
            onSubmit={handleSubmit}
            role="search"
            aria-label="Search the Kestorae catalogue"
            className="mt-6 flex flex-col gap-2.5 sm:flex-row"
          >
            <label htmlFor="page-search-input" className="sr-only">
              Search Kestorae pieces
            </label>
            <div className="relative flex-1">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="page-search-input"
                type="search"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Try “linen”, “oak”, “stoneware”, or “lamp”..."
                className="h-11 rounded-sm border-border bg-background pl-9 text-sm"
              />
            </div>
            <Button
              type="submit"
              className="h-11 rounded-sm bg-brand-forest px-6 font-display text-xs font-medium text-brand-ivory hover:bg-brand-forest/90"
            >
              Search
            </Button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-muted-foreground">Popular:</span>
            {SUGGESTED_TERMS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => applySuggestion(suggestion)}
                className="rounded-sm border border-border bg-brand-sand/40 px-2.5 py-1 text-brand-charcoal transition-colors hover:border-brand-forest hover:text-brand-forest"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </header>

        {hasQuery ? (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border/80 py-3.5">
            <p className="text-xs text-muted-foreground tabular-nums" aria-live="polite">
              <span className="font-medium text-brand-charcoal">{results.length}</span>{" "}
              {results.length === 1 ? "piece" : "pieces"} found for “{term}”
            </p>
            {results.length > 1 ? (
              <div className="flex items-center gap-2">
                <label
                  htmlFor="search-sort"
                  className="font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground"
                >
                  Sort
                </label>
                <select
                  id="search-sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortOption)}
                  className="h-9 rounded-sm border border-border bg-background px-3 text-xs font-medium text-brand-charcoal focus:border-brand-forest focus:outline-none"
                >
                  <option value="featured">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A–Z</option>
                </select>
              </div>
            ) : null}
          </div>
        ) : null}

        {hasQuery && results.length === 0 ? (
          <section className="mx-auto my-12 max-w-md rounded-md border border-border bg-background px-6 py-12 text-center">
            <SearchX aria-hidden="true" className="mx-auto size-8 text-brand-olive" />
            <h2 className="mt-4 font-display text-lg font-medium text-brand-charcoal">
              No matching pieces
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Nothing in the collection matches “{term}”. Try a material like linen or oak, or
              explore the full collection.
            </p>
            <Button
              asChild
              className="mt-6 rounded-sm bg-brand-forest text-brand-ivory hover:bg-brand-forest/90"
            >
              <Link to="/shop">Browse the full shop</Link>
            </Button>
          </section>
        ) : null}

        {results.length ? (
          <section aria-label="Search results" className="mt-8 pb-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>
        ) : null}

        {!hasQuery ? (
          <section aria-label="Browse by room" className="mt-12 border-t border-border py-10">
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
                  className="h-9 rounded-sm bg-background font-display text-xs font-medium text-brand-charcoal hover:border-brand-forest hover:bg-brand-sand/50 hover:text-brand-forest"
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

      <AssuranceStrip />
    </main>
  );
}
