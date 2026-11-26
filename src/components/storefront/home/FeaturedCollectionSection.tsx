import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Plus } from "lucide-react";

import { useCart } from "@/components/storefront/CartContext";
import { ResponsivePicture } from "@/components/storefront/ResponsivePicture";
import { useWishlist } from "@/components/storefront/WishlistContext";
import { formatPrice, getProduct, type Product } from "@/data/catalogue";

type CollectionFilter = "All Pieces" | "Ceramics" | "Furniture" | "Textiles";

const FILTERS: readonly CollectionFilter[] = ["All Pieces", "Ceramics", "Furniture", "Textiles"];

type CuratedItem = {
  slug: string;
  filterGroup: Exclude<CollectionFilter, "All Pieces">;
  kicker: string;
};

const AUTUMN_CURATION: readonly CuratedItem[] = [
  { slug: "ceramic-vase", filterGroup: "Ceramics", kicker: "Ceramics" },
  { slug: "oak-side-table", filterGroup: "Furniture", kicker: "Furniture" },
  { slug: "linen-throw", filterGroup: "Textiles", kicker: "Textiles" },
  { slug: "stoneware-dinner-set", filterGroup: "Ceramics", kicker: "Tableware & Ceramics" },
];

type ResolvedFeaturedProduct = {
  product: Product;
  filterGroup: Exclude<CollectionFilter, "All Pieces">;
  kicker: string;
};

export function FeaturedCollectionSection() {
  const [activeFilter, setActiveFilter] = useState<CollectionFilter>("All Pieces");
  const { has, toggle } = useWishlist();
  const { add } = useCart();

  const resolvedItems: ResolvedFeaturedProduct[] = AUTUMN_CURATION.map((item) => {
    const product = getProduct(item.slug);
    return product ? { product, filterGroup: item.filterGroup, kicker: item.kicker } : null;
  }).filter((entry): entry is ResolvedFeaturedProduct => Boolean(entry));

  const visibleItems =
    activeFilter === "All Pieces"
      ? resolvedItems
      : resolvedItems.filter((item) => item.filterGroup === activeFilter);

  return (
    <section
      aria-labelledby="featured-collection-heading"
      className="border-y border-border/70 bg-card/55 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
              Seasonal Selection
            </p>
            <h2
              id="featured-collection-heading"
              className="mt-2.5 font-display text-3xl font-medium tracking-[-0.015em] text-brand-charcoal sm:text-4xl"
            >
              The Autumn Home Collection
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              Meticulously proportioned forms, tactile stoneware, and brushed timber furniture
              designed for intentional living.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 self-start font-display text-xs font-semibold uppercase tracking-[0.08em] text-brand-forest transition-colors hover:text-brand-charcoal lg:self-end"
          >
            View All Products
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </div>

        <div
          role="tablist"
          aria-label="Filter Autumn Home Collection"
          className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((filter) => {
              const selected = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-sm px-4 py-2 font-display text-xs font-medium tracking-[0.03em] transition-colors ${
                    selected
                      ? "bg-brand-forest text-brand-ivory"
                      : "bg-brand-sand/45 text-brand-charcoal hover:bg-brand-sand"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground" aria-live="polite">
            Showing {visibleItems.length} of {resolvedItems.length} featured pieces
            {activeFilter !== "All Pieces" ? (
              <button
                type="button"
                onClick={() => setActiveFilter("All Pieces")}
                className="ml-2 font-medium text-brand-forest underline underline-offset-4 hover:text-brand-charcoal"
              >
                Show all
              </button>
            ) : null}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleItems.map(({ product, kicker }) => {
            const isSaved = has(product.slug);

            return (
              <article
                key={product.slug}
                className="group flex min-w-0 flex-col rounded-md border border-border/70 bg-background p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none"
              >
                <div className="relative overflow-hidden rounded-sm bg-brand-sand/40">
                  <Link
                    to="/products/$slug"
                    params={{ slug: product.slug }}
                    aria-label={`View ${product.name}`}
                    className="block"
                  >
                    <ResponsivePicture
                      src={product.image}
                      alt={product.imageAlt}
                      sizes="(max-width: 639px) calc(100vw - 3.5rem), (max-width: 1023px) calc(50vw - 3rem), 300px"
                      width={640}
                      height={480}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={() => toggle(product.slug)}
                    aria-label={
                      isSaved
                        ? `Remove ${product.name} from wishlist`
                        : `Save ${product.name} to wishlist`
                    }
                    aria-pressed={isSaved}
                    className={`absolute right-2.5 top-2.5 flex size-9 items-center justify-center rounded-full border backdrop-blur-xs transition-colors ${
                      isSaved
                        ? "border-brand-forest bg-brand-forest text-brand-ivory"
                        : "border-border/80 bg-brand-ivory/90 text-brand-charcoal hover:border-brand-forest hover:text-brand-forest"
                    }`}
                  >
                    <Heart
                      aria-hidden="true"
                      className={`size-4 ${isSaved ? "fill-current" : ""}`}
                    />
                  </button>
                </div>

                <div className="flex flex-1 flex-col px-1 pt-4">
                  <p className="font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-olive">
                    {kicker}
                  </p>
                  <h3 className="mt-1.5 font-display text-[15px] font-medium leading-snug text-brand-charcoal">
                    <Link
                      to="/products/$slug"
                      params={{ slug: product.slug }}
                      className="transition-colors hover:text-brand-forest"
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-5 text-muted-foreground">
                    {product.shortDescription}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3">
                    <div>
                      <p className="font-display text-sm font-semibold tabular-nums text-brand-charcoal">
                        {formatPrice(product.price)}
                      </p>
                      <p className="mt-0.5 text-[11px] text-brand-olive">In stock</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => add(product.slug)}
                      className="inline-flex items-center gap-1 rounded-sm border border-border px-3 py-1.5 font-display text-[11px] font-medium text-brand-charcoal transition-colors hover:border-brand-forest hover:bg-brand-forest hover:text-brand-ivory"
                    >
                      <Plus aria-hidden="true" className="size-3.5" />
                      Add to bag
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
