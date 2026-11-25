import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { ProductCard } from "@/components/storefront/ProductCard";
import { EmptyState } from "@/components/storefront/StorefrontSections";
import { Button } from "@/components/ui/button";
import { getCollection, getProductsForCollection } from "@/data/catalogue";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/collections/$slug")({
  component: CollectionPage,
  head: ({ params }) => {
    const collection = getCollection(params.slug);
    const title = collection ? collection.title : "Collection";
    return storefrontHead({
      title: `${title} collection`,
      description: collection ? collection.description : `Explore a Kestorae collection.`,
      path: `/collections/${encodeURIComponent(params.slug)}`,
    });
  },
});

function CollectionPage() {
  const { slug } = Route.useParams();
  const collection = getCollection(slug);

  if (!collection) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-screen-xl px-4 py-20 sm:px-6 lg:px-8">
          <EmptyState
            title="Collection not found"
            description={`There is no Kestorae collection called “${slug}”.`}
          >
            <Button asChild>
              <Link to="/shop">Browse the shop</Link>
            </Button>
          </EmptyState>
        </div>
      </main>
    );
  }

  const items = getProductsForCollection(slug);

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <ChevronRight aria-hidden="true" className="size-3" />
          <Link to="/shop" className="transition-colors hover:text-foreground">
            Shop
          </Link>
          <ChevronRight aria-hidden="true" className="size-3" />
          <span aria-current="page" className="text-foreground">
            {collection.title}
          </span>
        </nav>

        <header className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-olive">
            Collection
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-brand-charcoal sm:text-4xl">
            {collection.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{collection.description}</p>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">{collection.note}</p>
        </header>

        <section aria-label={`${collection.title} products`} className="mt-10">
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
