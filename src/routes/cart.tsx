import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";

import { FREE_DELIVERY_THRESHOLD, useCart } from "@/components/storefront/CartContext";
import { EmptyState } from "@/components/storefront/StorefrontSections";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice, getProduct } from "@/data/catalogue";
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

function CartPage() {
  const { lines, subtotal, delivery, total, count, setQuantity, remove, clear } = useCart();
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal;

  if (lines.length === 0) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-screen-xl px-4 py-20 sm:px-6 lg:px-8">
          <EmptyState
            title="Your bag is empty"
            description="Pieces you add will be kept in your bag as you browse this preview storefront."
          >
            <Button asChild>
              <Link to="/shop">Explore the shop</Link>
            </Button>
          </EmptyState>
        </div>
      </main>
    );
  }

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
            Bag
          </span>
        </nav>

        <header className="flex flex-wrap items-end justify-between gap-3">
          <h1 className="font-display text-3xl font-medium text-brand-charcoal sm:text-4xl">
            Your bag
          </h1>
          <Button
            type="button"
            variant="link"
            className="px-0 text-muted-foreground"
            onClick={clear}
          >
            Empty the bag
          </Button>
        </header>
        <p className="mt-2 text-sm text-muted-foreground" aria-live="polite">
          {count} {count === 1 ? "item" : "items"}
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <section aria-label="Bag items">
            <ul className="divide-y divide-border border-y border-border">
              {lines.map((line) => {
                const product = getProduct(line.slug);
                if (!product) return null;
                return (
                  <li key={line.slug} className="flex gap-4 py-5">
                    <Link
                      to="/products/$slug"
                      params={{ slug: product.slug }}
                      className="w-24 shrink-0 overflow-hidden rounded-sm sm:w-32"
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
                          <p className="mt-1 text-xs text-muted-foreground">{product.category}</p>
                        </div>
                        <p className="shrink-0 text-sm font-medium text-brand-charcoal">
                          {formatPrice(product.price * line.quantity)}
                        </p>
                      </div>
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                        <div className="flex items-center border border-border">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-9 rounded-none"
                            aria-label={`Decrease quantity of ${product.name}`}
                            onClick={() => setQuantity(line.slug, line.quantity - 1)}
                          >
                            <Minus aria-hidden="true" />
                          </Button>
                          <span className="w-9 text-center text-sm font-medium" aria-live="polite">
                            {line.quantity}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-9 rounded-none"
                            aria-label={`Increase quantity of ${product.name}`}
                            onClick={() => setQuantity(line.slug, line.quantity + 1)}
                          >
                            <Plus aria-hidden="true" />
                          </Button>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="gap-1.5 px-2 text-muted-foreground hover:text-destructive"
                          onClick={() => remove(line.slug)}
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
            className="h-fit border border-border bg-brand-sand/30 p-6"
          >
            <h2 className="font-display text-lg font-medium text-brand-charcoal">Order summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium text-brand-charcoal">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="font-medium text-brand-charcoal">
                  {delivery === 0 ? "Free" : formatPrice(delivery)}
                </dd>
              </div>
            </dl>
            <Separator className="my-4" />
            <div className="flex justify-between text-base">
              <p className="font-display font-medium text-brand-charcoal">Total</p>
              <p className="font-display font-medium text-brand-charcoal">{formatPrice(total)}</p>
            </div>
            {remaining > 0 ? (
              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                Add {formatPrice(remaining)} more for free delivery.
              </p>
            ) : (
              <p className="mt-4 text-xs leading-5 text-brand-forest">Your delivery is free.</p>
            )}
            <Button asChild className="mt-6 w-full" size="lg">
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
    </main>
  );
}
