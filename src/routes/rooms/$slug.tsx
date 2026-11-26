import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { CatalogueFilterControls } from "@/components/storefront/CatalogueFilterControls";
import { ProductCard } from "@/components/storefront/ProductCard";
import { StorefrontBreadcrumb } from "@/components/storefront/StorefrontBreadcrumb";
import { AssuranceStrip, EmptyState } from "@/components/storefront/StorefrontSections";
import { Button } from "@/components/ui/button";
import { getProductsForRoom, getRoom } from "@/data/catalogue";
import { rooms } from "@/data/storefront";
import { filterAndSortProducts, type SortOption } from "@/lib/storefront-logic";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/rooms/$slug")({
  component: RoomPage,
  head: ({ params }) => {
    const room = getRoom(params.slug);
    const title = room ? room.title : "Room";
    return storefrontHead({
      title: `${title} edit`,
      description: room
        ? `Room ideas and considered pieces for the ${room.title.toLowerCase()}.`
        : "Room edit.",
      path: `/rooms/${encodeURIComponent(params.slug)}`,
    });
  },
});

function RoomPage() {
  const { slug } = Route.useParams();
  const room = getRoom(slug);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sort, setSort] = useState<SortOption>("featured");

  useEffect(() => {
    setSelectedCategories([]);
    setMaxPrice(null);
    setSort("featured");
  }, [slug]);

  const items = useMemo(() => getProductsForRoom(slug), [slug]);
  const visibleProducts = useMemo(
    () =>
      filterAndSortProducts(items, {
        categories: selectedCategories,
        maxPrice,
        sort,
      }),
    [items, selectedCategories, maxPrice, sort],
  );

  if (!room) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8">
          <EmptyState
            title="Room not found"
            description={`There is no Kestorae room edit called “${slug}”.`}
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
    setSelectedCategories([]);
    setMaxPrice(null);
    setSort("featured");
  };

  return (
    <main className="flex-1">
      <section className="border-b border-border bg-brand-sand/40">
        <div className="mx-auto grid max-w-[1320px] items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-14">
          <div className="min-w-0">
            <StorefrontBreadcrumb
              className="mb-6"
              items={[
                { label: "Home", to: "/" },
                { label: "Rooms", to: "/shop" },
                { label: room.title },
              ]}
            />
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
              Room Editorial · {items.length} {items.length === 1 ? "Piece" : "Pieces"}
            </p>
            <h1 className="mt-2.5 font-display text-3xl font-medium leading-tight tracking-[-0.015em] text-brand-charcoal sm:text-4xl">
              {room.title}
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-brand-charcoal/85">
              {room.description}
            </p>
            <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
              {room.editorialNote}
            </p>
            <p className="mt-5 font-display text-[11px] font-medium uppercase tracking-[0.1em] text-brand-forest">
              {room.materialsFocus}
            </p>
            <Button asChild variant="link" className="mt-4 px-0 text-brand-forest">
              <Link to="/shop">
                Shop all rooms <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-lg border border-border/70 bg-brand-sand/50">
            <img
              src={room.image}
              alt={room.alt}
              width="760"
              height="500"
              fetchPriority="high"
              className="aspect-[3/2] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section
        aria-label={`${room.title} pieces`}
        className="mx-auto max-w-[1320px] px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-medium text-brand-charcoal">
            Curated pieces for the {room.title.toLowerCase()}
          </h2>
          <nav aria-label="Switch room" className="flex flex-wrap gap-2">
            {rooms.map((entry) => {
              const active = entry.slug === room.slug;
              return (
                <Link
                  key={entry.slug}
                  to="/rooms/$slug"
                  params={{ slug: entry.slug }}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-sm border px-3 py-1.5 font-display text-xs font-medium transition-colors ${
                    active
                      ? "border-brand-forest bg-brand-forest text-brand-ivory"
                      : "border-border bg-background text-brand-charcoal hover:border-brand-forest hover:text-brand-forest"
                  }`}
                >
                  {entry.title}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-6">
          <CatalogueFilterControls
            allItems={items}
            filteredCount={visibleProducts.length}
            selectedRoom={null}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            maxPrice={maxPrice}
            onSelectMaxPrice={setMaxPrice}
            sort={sort}
            onSortChange={setSort}
            onClearAll={clearAll}
            hideRoomFilter
          />
        </div>

        {visibleProducts.length ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState
              title="No pieces match your refinement"
              description="Clear the filters to view all curated pieces for this room."
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

      <AssuranceStrip />
    </main>
  );
}
