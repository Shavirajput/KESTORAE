import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { ProductCard } from "@/components/storefront/ProductCard";
import { AssuranceStrip } from "@/components/storefront/StorefrontSections";
import { Button } from "@/components/ui/button";
import { collections, products } from "@/data/catalogue";
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
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <ChevronRight aria-hidden="true" className="size-3" />
          <span aria-current="page" className="text-foreground">
            Shop
          </span>
        </nav>

        <header className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-olive">
            The collection
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-brand-charcoal sm:text-4xl">
            Shop Kestorae
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            A room-led directory of thoughtfully considered home and lifestyle essentials — each piece chosen for how
            it works on an ordinary day.
          </p>
        </header>

        <section aria-label="Shop by collection" className="mt-10">
          <div className="flex flex-wrap gap-2">
            {collections.map((collection) => (
              <Button asChild key={collection.slug} variant="outline" size="sm" className="bg-background">
                <Link to="/collections/$slug" params={{ slug: collection.slug }}>
                  {collection.title}
                </Link>
              </Button>
            ))}
          </div>
        </section>

        <section aria-label="All products" className="mt-10">
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      </div>

      <AssuranceStrip />
    </main>
  );
}
