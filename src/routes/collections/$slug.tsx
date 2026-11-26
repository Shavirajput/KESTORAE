import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { CatalogueFilterControls } from "@/components/storefront/CatalogueFilterControls";
import { ProductCard } from "@/components/storefront/ProductCard";
import { StorefrontBreadcrumb } from "@/components/storefront/StorefrontBreadcrumb";
import { AssuranceStrip, EmptyState } from "@/components/storefront/StorefrontSections";
import { Button } from "@/components/ui/button";
import { collections, getCollection, getProductsForCollection } from "@/data/catalogue";
import { filterAndSortProducts, type SortOption } from "@/lib/storefront-logic";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/collections/$slug")({
  component: CollectionPage,
  head: ({ params }) => {
    const collection = getCollection(params.slug);
    const title = collection ? collection.title : "Collection";
    return storefrontHead({
      title: `${title} collection`,
      description: collection ? collection.description : "Explore a Kestorae collection.",
      path: `/collections/${encodeURIComponent(params.slug)}`,
    });
  },
});

function CollectionPage() {
  const { slug } = Route.useParams();
  const collection = getCollection(slug);

  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sort, setSort] = useState<SortOption>("featured");

  useEffect(() => {
    setSelectedRoom(null);
    setSelectedCategories([]);
    setMaxPrice(null);
    setSort("featured");
  }, [slug]);

  const items = useMemo(() => getProductsForCollection(slug), [slug]);
  const visibleProducts = useMemo(
    () =>
      filterAndSortProducts(items, {
        room: selectedRoom,
        categories: selectedCategories,
        maxPrice,
        sort,
      }),
    [items, selectedRoom, selectedCategories, maxPrice, sort],
  );

  if (!collection) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8">
          <EmptyState
            title="Collection not found"
            description={`There is no Kestorae collection called “${slug}”.`}
          >
            <Button
              asChild
              className="rounded-sm bg-brand-forest text-brand-ivory hover:bg-brand-forest/90"
            >
              <Link to="/shop">Browse the shop</Link>
            </Button>
          </EmptyState>
        </div>
      </main>
    );
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  const clearAll = () => {
    setSelectedRoom(null);
    setSelectedCategories([]);
    setMaxPrice(null);
    setSort("featured");
  };

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <StorefrontBreadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/shop" },
            { label: collection.title },
          ]}
        />

        <header className="max-w-2xl">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
            Curated Collection · {items.length} {items.length === 1 ? "Piece" : "Pieces"}
          </p>
          <h1 className="mt-2.5 font-display text-3xl font-medium leading-tight tracking-[-0.015em] text-brand-charcoal sm:text-4xl">
            {collection.title}
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            {collection.description}
          </p>
          <p className="mt-2.5 text-xs leading-5 text-muted-foreground">{collection.note}</p>
        </header>

        <nav aria-label="Other collections" className="mt-7 flex flex-wrap gap-2">
          {collections.map((item) => {
            const active = item.slug === collection.slug;
            return (
              <Link
                key={item.slug}
                to="/collections/$slug"
                params={{ slug: item.slug }}
                aria-current={active ? "page" : undefined}
                className={`rounded-sm border px-3 py-1.5 font-display text-xs font-medium transition-colors ${
                  active
                    ? "border-brand-forest bg-brand-forest text-brand-ivory"
                    : "border-border bg-background text-brand-charcoal hover:border-brand-forest hover:text-brand-forest"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <section aria-label={`Filter ${collection.title}`} className="mt-8">
          <CatalogueFilterControls
            allItems={items}
            filteredCount={visibleProducts.length}
            selectedRoom={selectedRoom}
            onSelectRoom={setSelectedRoom}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            maxPrice={maxPrice}
            onSelectMaxPrice={setMaxPrice}
            sort={sort}
            onSortChange={setSort}
            onClearAll={clearAll}
          />
        </section>

        <section aria-label={`${collection.title} products`} className="mt-8 pb-12">
          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-8">
              <EmptyState
                title="No pieces match your current filters"
                description={`Reset your filters to view all ${items.length} pieces in ${collection.title}.`}
              >
                <Button
                  type="button"
                  onClick={clearAll}
                  className="rounded-sm bg-brand-forest text-brand-ivory hover:bg-brand-forest/90"
                >
                  Reset filters
                </Button>
              </EmptyState>
            </div>
          )}
        </section>
      </div>

      <AssuranceStrip />
    </main>
  );
}
