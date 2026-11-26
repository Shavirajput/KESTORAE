import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { FREE_DELIVERY_THRESHOLD, useCart } from "@/components/storefront/CartContext";
import { ProductCard } from "@/components/storefront/ProductCard";
import { StorefrontBreadcrumb } from "@/components/storefront/StorefrontBreadcrumb";
import { AssuranceStrip } from "@/components/storefront/StorefrontSections";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice, getProduct, getVariantPrice, products } from "@/data/catalogue";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () =>
    storefrontHead({
      title: "Shopping bag",
      description: "Review the pieces in your Kestorae shopping bag.",
      path: "/cart",
    }),
});

const FOUNDATIONAL_SLUGS = [
  "linen-throw",
  "oak-side-table",
  "stoneware-dinner-set",
  "ceramic-vase",
] as const;

function CartPage() {
  const {
    lines,
    subtotal,
    delivery,
    total,
    count,
    remainingForFreeDelivery,
    setQuantity,
    remove,
    clear,
  } = useCart();

  const foundationalProducts = FOUNDATIONAL_SLUGS.map((slug) => getProduct(slug)).filter(
    (item): item is NonNullable<typeof item> => Boolean(item),
  );
  const starterItems = foundationalProducts.length ? foundationalProducts : products.slice(0, 4);

  if (lines.length === 0) {
    return (
      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <StorefrontBreadcrumb items={[{ label: "Home", to: "/" }, { label: "Shopping Bag" }]} />

          <section
            aria-labelledby="empty-bag-heading"
            className="rounded-lg border border-border/80 bg-brand-sand/30 px-6 py-16 text-center sm:px-10 sm:py-20"
          >
            <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-border bg-background text-brand-forest">
              <ShoppingBag aria-hidden="true" className="size-6 stroke-[1.6]" />
            </span>
            <p className="mt-6 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
              Your Bag Is Currently Empty
            </p>
            <h1
              id="empty-bag-heading"
              className="mt-2.5 font-display text-2xl font-medium text-brand-charcoal sm:text-3xl"
            >
              Every space begins with an empty room.
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
              Take your time exploring our considered pieces crafted from European oak, washed flax
              linen, and small-batch stoneware. When you are ready, your selections will be kept
              here.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-sm bg-brand-forest px-6 font-display text-xs font-medium text-brand-ivory hover:bg-brand-forest/90"
              >
                <Link to="/collections/$slug" params={{ slug: "new-arrivals" }}>
                  Explore New Arrivals
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-sm border-brand-forest/35 bg-background px-6 font-display text-xs font-medium text-brand-charcoal hover:border-brand-forest hover:bg-brand-sand/50 hover:text-brand-forest"
              >
                <Link to="/shop">Shop All Essentials</Link>
              </Button>
            </div>
          </section>

          <section aria-labelledby="foundational-heading" className="py-14">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
                  Foundational Objects
                </p>
                <h2
                  id="foundational-heading"
                  className="mt-2 font-display text-2xl font-medium text-brand-charcoal"
                >
                  Curated essentials to begin with
                </h2>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.08em] text-brand-forest transition-colors hover:text-brand-charcoal"
              >
                View full collection <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {starterItems.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>
        </div>

        <AssuranceStrip />
      </main>
    );
  }

  const freeDeliveryProgress = Math.min(
    100,
    Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100),
  );

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <StorefrontBreadcrumb items={[{ label: "Home", to: "/" }, { label: "Shopping Bag" }]} />

        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
              Shopping Bag
            </p>
            <h1 className="mt-2 font-display text-3xl font-medium text-brand-charcoal sm:text-4xl">
              Your bag
            </h1>
          </div>
          <Button
            type="button"
            variant="link"
            className="px-0 text-xs text-muted-foreground hover:text-brand-terracotta"
            onClick={clear}
          >
            Empty the bag
          </Button>
        </header>
        <p className="mt-2 text-sm text-muted-foreground tabular-nums" aria-live="polite">
          {count} {count === 1 ? "item" : "items"}
        </p>

        <div className="mt-8 grid gap-10 pb-14 lg:grid-cols-[1.55fr_1fr]">
          <section aria-label="Bag items">
            <ul className="divide-y divide-border border-y border-border">
              {lines.map((line) => {
                const product = getProduct(line.slug);
                if (!product) return null;
                const unitPrice = getVariantPrice(product, line.variant);
                return (
                  <li key={line.key} className="flex gap-4 py-5">
                    <Link
                      to="/products/$slug"
                      params={{ slug: product.slug }}
                      className="w-24 shrink-0 overflow-hidden rounded-sm bg-brand-sand/40 sm:w-32"
                      aria-label={product.name}
                    >
                      <img
                        src={product.image}
                        alt={product.imageAlt}
                        width="128"
                        height="128"
                        loading="lazy"
                        className="aspect-square w-full object-cover"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h2 className="font-display text-sm font-medium text-brand-charcoal">
                            <Link
                              to="/products/$slug"
                              params={{ slug: product.slug }}
                              className="transition-colors hover:text-brand-forest"
                            >
                              {product.name}
                            </Link>
                          </h2>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {product.category} · Finish: {line.variant}
                          </p>
                          <p className="mt-0.5 text-xs tabular-nums text-muted-foreground">
                            {formatPrice(unitPrice)} each
                          </p>
                        </div>
                        <p className="shrink-0 font-display text-sm font-semibold tabular-nums text-brand-charcoal">
                          {formatPrice(unitPrice * line.quantity)}
                        </p>
                      </div>
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                        <div className="flex items-center rounded-sm border border-border bg-background">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-9 rounded-none"
                            aria-label={`Decrease quantity of ${product.name} (${line.variant})`}
                            onClick={() => setQuantity(line.key, line.quantity - 1)}
                          >
                            <Minus aria-hidden="true" className="size-3.5" />
                          </Button>
                          <span
                            className="w-9 text-center text-sm font-medium tabular-nums"
                            aria-live="polite"
                          >
                            {line.quantity}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-9 rounded-none"
                            aria-label={`Increase quantity of ${product.name} (${line.variant})`}
                            onClick={() => setQuantity(line.key, line.quantity + 1)}
                          >
                            <Plus aria-hidden="true" className="size-3.5" />
                          </Button>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="gap-1.5 px-2 text-muted-foreground hover:bg-brand-sand/50 hover:text-brand-terracotta"
                          onClick={() => remove(line.key)}
                        >
                          <Trash2 aria-hidden="true" className="size-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <aside
            aria-label="Order summary"
            className="h-fit rounded-md border border-border bg-brand-sand/30 p-6"
          >
            <h2 className="font-display text-lg font-medium text-brand-charcoal">Order summary</h2>

            <div className="mt-4 rounded-sm border border-border/70 bg-background p-3.5">
              {remainingForFreeDelivery > 0 ? (
                <p className="text-xs leading-5 text-muted-foreground">
                  Add{" "}
                  <span className="font-semibold tabular-nums text-brand-charcoal">
                    {formatPrice(remainingForFreeDelivery)}
                  </span>{" "}
                  more for complimentary standard delivery.
                </p>
              ) : (
                <p className="text-xs font-medium leading-5 text-brand-forest">
                  You have unlocked complimentary standard UK delivery.
                </p>
              )}
              <div
                aria-hidden="true"
                className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-brand-sand"
              >
                <div
                  className="h-full bg-brand-forest transition-all duration-300"
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium tabular-nums text-brand-charcoal">
                  {formatPrice(subtotal)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Standard delivery</dt>
                <dd className="font-medium tabular-nums text-brand-charcoal">
                  {delivery === 0 ? "Free" : formatPrice(delivery)}
                </dd>
              </div>
            </dl>
            <Separator className="my-4" />
            <div className="flex justify-between text-base">
              <p className="font-display font-medium text-brand-charcoal">Estimated total</p>
              <p className="font-display font-semibold tabular-nums text-brand-charcoal">
                {formatPrice(total)}
              </p>
            </div>

            <Button
              asChild
              className="mt-6 h-11 w-full rounded-sm bg-brand-forest font-display text-xs font-medium text-brand-ivory hover:bg-brand-forest/90"
              size="lg"
            >
              <Link to="/checkout">Proceed to checkout</Link>
            </Button>
            <Button asChild variant="ghost" className="mt-2 w-full">
              <Link to="/shop">Continue shopping</Link>
            </Button>
            <p className="mt-4 text-center text-[11px] leading-4 text-muted-foreground">
              Illustrative storefront — no payment is taken.
            </p>
          </aside>
        </div>
      </div>

      <AssuranceStrip />
    </main>
  );
}
