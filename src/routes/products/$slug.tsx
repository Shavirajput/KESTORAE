import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, PackageCheck, RotateCcw, Truck } from "lucide-react";
import { useState } from "react";

import { AddedToBagToast } from "@/components/storefront/AddedToBagToast";
import { ProductCard } from "@/components/storefront/ProductCard";
import { useCart } from "@/components/storefront/CartContext";
import { Button } from "@/components/ui/button";
import { getProduct, getProductsForRoom, formatPrice } from "@/data/catalogue";
import { rooms } from "@/data/storefront";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/products/$slug")({
  component: ProductPage,
  head: ({ params }) => {
    const product = getProduct(params.slug);
    const title = product ? product.name : "Product details";
    return storefrontHead({
      title: `${title} — product details`,
      description: product
        ? product.shortDescription
        : "Product details for a Kestorae home and lifestyle item.",
      path: `/products/${encodeURIComponent(params.slug)}`,
      type: "product",
    });
  },
});

function ProductPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const product = getProduct(slug);
  const notFound = !product;
  const requested = slug;

  if (notFound) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-screen-xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md border border-border bg-background px-6 py-12 text-center">
            <h1 className="font-display text-xl font-medium text-brand-charcoal">
              We could not find that piece
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              “{requested}” is not part of the current Kestorae edit.
            </p>
            <Button asChild className="mt-6">
              <Link to="/shop">Browse the shop</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const relatedRooms = rooms.filter((room) => product.rooms.includes(room.slug));
  const primaryRoom = product.rooms[0];
  const relatedProducts = primaryRoom
    ? getProductsForRoom(primaryRoom)
        .filter((item) => item.slug !== product.slug)
        .slice(0, 4)
    : [];

  const handleAdd = () => {
    add(product.slug, quantity);
  };

  const handleBuyNow = () => {
    add(product.slug, quantity);
    void navigate({ to: "/checkout" });
  };

  return (
    <main className="flex-1">
      <AddedToBagToast />
      <div className="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
        >
          <Link to="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <ChevronRight aria-hidden="true" className="size-3" />
          <Link to="/shop" className="transition-colors hover:text-foreground">
            Shop
          </Link>
          <ChevronRight aria-hidden="true" className="size-3" />
          <span aria-current="page" className="text-foreground">
            {product.name}
          </span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <figure className="relative min-w-0">
            <img
              src={product.image}
              alt={product.imageAlt}
              width="900"
              height="700"
              fetchPriority="high"
              className="aspect-[5/4] w-full rounded-md object-cover"
            />
            {product.badge ? (
              <span className="absolute left-4 top-4 border border-border bg-background/95 px-3 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-brand-olive">
                {product.badge}
              </span>
            ) : null}
          </figure>

          <div className="max-w-xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-olive">
              {product.category}
            </p>
            <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-brand-charcoal sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-2xl font-medium text-brand-charcoal">
              {formatPrice(product.price)}
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{product.description}</p>

            <div className="mt-6 flex items-center gap-3">
              <label htmlFor="quantity" className="text-sm text-muted-foreground">
                Quantity
              </label>
              <div className="flex items-center border border-border">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-10 rounded-none"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  −
                </Button>
                <span
                  id="quantity"
                  aria-live="polite"
                  className="w-10 text-center text-sm font-medium"
                >
                  {quantity}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-10 rounded-none"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="button" size="lg" onClick={handleAdd}>
                Add to bag
              </Button>
              <Button type="button" size="lg" variant="outline" onClick={handleBuyNow}>
                Buy now
              </Button>
            </div>

            <ul className="mt-8 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
              {product.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] size-1 shrink-0 rounded-full bg-brand-olive"
                  />
                  {detail}
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
              <div>
                <dt className="font-display text-xs font-semibold uppercase text-brand-charcoal">
                  Materials
                </dt>
                <dd className="mt-1 text-muted-foreground">{product.materials}</dd>
              </div>
              <div>
                <dt className="font-display text-xs font-semibold uppercase text-brand-charcoal">
                  Dimensions
                </dt>
                <dd className="mt-1 text-muted-foreground">{product.dimensions}</dd>
              </div>
              <div>
                <dt className="font-display text-xs font-semibold uppercase text-brand-charcoal">
                  Care
                </dt>
                <dd className="mt-1 text-muted-foreground">{product.care}</dd>
              </div>
            </dl>

            <div className="mt-8 grid gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:grid-cols-3">
              <p className="flex items-center gap-2">
                <Truck aria-hidden="true" className="size-4 text-brand-forest" /> Free delivery over
                £120
              </p>
              <p className="flex items-center gap-2">
                <RotateCcw aria-hidden="true" className="size-4 text-brand-forest" /> 30-day returns
              </p>
              <p className="flex items-center gap-2">
                <PackageCheck aria-hidden="true" className="size-4 text-brand-forest" /> Illustrated
                catalogue piece
              </p>
            </div>

            {relatedRooms.length ? (
              <p className="mt-6 text-xs text-muted-foreground">
                Styled for{" "}
                {relatedRooms.map((room, index) => (
                  <span key={room.slug}>
                    {index > 0 ? " · " : ""}
                    <Link
                      to="/rooms/$slug"
                      params={{ slug: room.slug }}
                      className="underline-offset-2 transition-colors hover:text-brand-forest hover:underline"
                    >
                      {room.title}
                    </Link>
                  </span>
                ))}
              </p>
            ) : null}
          </div>
        </div>

        {relatedProducts.length ? (
          <section aria-label="You may also like" className="mt-16 border-t border-border pt-10">
            <h2 className="font-display text-xl font-medium text-brand-charcoal">
              You may also like
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
