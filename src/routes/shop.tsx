import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { CatalogueFilterControls } from "@/components/storefront/CatalogueFilterControls";
import { ProductCard } from "@/components/storefront/ProductCard";
import { StorefrontBreadcrumb } from "@/components/storefront/StorefrontBreadcrumb";
import { AssuranceStrip, EmptyState } from "@/components/storefront/StorefrontSections";
import { Button } from "@/components/ui/button";
import { collections, products } from "@/data/catalogue";
import { filterAndSortProducts, type SortOption } from "@/lib/storefront-logic";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
  head: () =>
    storefrontHead({
      title: "Shop home and lifestyle",
      description: "Browse the Kestorae home and lifestyle collection by room and everyday need.",
      path: "/shop",
    }),
});

function ShopPage() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sort, setSort] = useState<SortOption>("featured");

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

  const visibleProducts = useMemo(
    () =>
      filterAndSortProducts(products, {
        room: selectedRoom,
        categories: selectedCategories,
        maxPrice,
        sort,
      }),
    [selectedRoom, selectedCategories, maxPrice, sort],
  );

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <StorefrontBreadcrumb items={[{ label: "Home", to: "/" }, { label: "Shop" }]} />

        <header className="max-w-2xl">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
            The Collection
          </p>
          <h1 className="mt-2.5 font-display text-3xl font-medium leading-tight tracking-[-0.015em] text-brand-charcoal sm:text-4xl">
            Shop Kestorae
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            A room-led directory of thoughtfully considered home and lifestyle essentials — each
            piece chosen for how it works on an ordinary day.
          </p>
        </header>

        <section aria-label="Curated collections" className="mt-8">
          <div className="flex flex-wrap gap-2">
            {collections.map((collection) => (
              <Button
                asChild
                key={collection.slug}
                variant="outline"
                size="sm"
                className="h-9 rounded-sm border-border bg-background font-display text-xs font-medium text-brand-charcoal hover:border-brand-forest hover:bg-brand-sand/50 hover:text-brand-forest"
              >
                <Link to="/collections/$slug" params={{ slug: collection.slug }}>
                  {collection.title}
                </Link>
              </Button>
            ))}
          </div>
        </section>

        <section aria-label="Filter and sort products" className="mt-8">
          <CatalogueFilterControls
            allItems={products}
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

        <section aria-label="All products" className="mt-8 pb-12">
          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-8">
              <EmptyState
                title="No pieces match those filters"
                description="Try removing one of your active refinements to view more of the Kestorae edit."
              >
                <Button
                  type="button"
                  onClick={clearAll}
                  className="rounded-sm bg-brand-forest text-brand-ivory hover:bg-brand-forest/90"
                >
                  Reset all filters
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
