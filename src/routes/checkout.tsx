import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { useState, type FormEvent } from "react";

import { useCart } from "@/components/storefront/CartContext";
import { EmptyState } from "@/components/storefront/StorefrontSections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { formatPrice, getProduct } from "@/data/catalogue";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () =>
    storefrontHead({
      title: "Checkout",
      description: "Complete your illustrative Kestorae order.",
      path: "/checkout",
    }),
});

const deliveryOptions = [
  { id: "standard", label: "Standard delivery", detail: "2–4 working days", price: 0 },
  { id: "express", label: "Express delivery", detail: "Next working day", price: 9.95 },
] as const;

function CheckoutPage() {
  const { lines, subtotal, delivery, total, clear } = useCart();
  const navigate = useNavigate();
  const [shippingMethod, setShippingMethod] = useState<string>("standard");
  const [submitting, setSubmitting] = useState(false);

  if (lines.length === 0) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-screen-xl px-4 py-20 sm:px-6 lg:px-8">
          <EmptyState
            title="Nothing to check out"
            description="Your bag is empty. Add a piece to the bag to walk through the illustrative checkout."
          >
            <Button asChild>
              <Link to="/shop">Explore the shop</Link>
            </Button>
          </EmptyState>
        </div>
      </main>
    );
  }

  const expressFee = shippingMethod === "express" ? 9.95 : 0;
  const orderTotal = subtotal + delivery + expressFee;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    window.setTimeout(() => {
      clear();
      void navigate({ to: "/order-confirmation" });
    }, 900);
  };

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/cart" className="transition-colors hover:text-foreground">
            Bag
          </Link>
          <span aria-current="page" className="text-foreground">
            Checkout
          </span>
        </nav>

        <header className="max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-olive">
            Secure checkout
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium text-brand-charcoal sm:text-4xl">Checkout</h1>
          <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Lock aria-hidden="true" className="size-3.5 text-brand-forest" />
            Illustrative storefront — no payment is taken and no details are stored.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            <section aria-label="Contact details">
              <h2 className="font-display text-lg font-medium text-brand-charcoal">Contact</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required placeholder="you@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+44" />
                </div>
              </div>
            </section>

            <section aria-label="Delivery address">
              <h2 className="font-display text-lg font-medium text-brand-charcoal">Delivery address</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" name="firstName" required autoComplete="given-name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" name="lastName" required autoComplete="family-name" />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" required autoComplete="street-address" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" required autoComplete="address-level2" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input id="postcode" name="postcode" required autoComplete="postal-code" />
                </div>
              </div>
            </section>

            <section aria-label="Delivery method">
              <h2 className="font-display text-lg font-medium text-brand-charcoal">Delivery method</h2>
              <RadioGroup
                value={shippingMethod}
                onValueChange={setShippingMethod}
                className="mt-4 gap-3"
              >
                {deliveryOptions.map((option) => (
                  <Label
                    key={option.id}
                    htmlFor={`delivery-${option.id}`}
                    className="flex cursor-pointer items-center justify-between border border-border bg-background p-4 font-normal transition-colors has-[button[data-state=checked]]:border-brand-forest"
                  >
                    <span className="flex items-center gap-3">
                      <RadioGroupItem id={`delivery-${option.id}`} value={option.id} />
                      <span>
                        <span className="block text-sm font-medium text-brand-charcoal">{option.label}</span>
                        <span className="block text-xs text-muted-foreground">{option.detail}</span>
                      </span>
                    </span>
                    <span className="text-sm font-medium text-brand-charcoal">
                      {option.price === 0 ? (subtotal >= 120 ? "Free" : "£4.95") : formatPrice(option.price)}
                    </span>
                  </Label>
                ))}
              </RadioGroup>
            </section>

            <section aria-label="Payment">
              <h2 className="font-display text-lg font-medium text-brand-charcoal">Payment</h2>
              <p className="mt-2 rounded-sm border border-dashed border-border bg-brand-sand/30 px-4 py-3 text-xs leading-5 text-muted-foreground">
                This portfolio storefront does not process payments. In a live store, card details would be collected
                here by a secure payment provider — never by the storefront itself.
              </p>
            </section>
          </div>

          <aside aria-label="Order summary" className="h-fit border border-border bg-brand-sand/30 p-6">
            <h2 className="font-display text-lg font-medium text-brand-charcoal">Your order</h2>
            <ul className="mt-4 space-y-4">
              {lines.map((line) => {
                const product = getProduct(line.slug);
                if (!product) return null;
                return (
                  <li key={line.slug} className="flex items-center gap-3">
                    <span className="relative w-14 shrink-0">
                      <img
                        src={product.image}
                        alt=""
                        width="56"
                        height="56"
                        loading="lazy"
                        className="aspect-square w-full rounded-sm object-cover"
                      />
                      <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-brand-forest text-[10px] font-medium text-background">
                        {line.quantity}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm text-brand-charcoal">{product.name}</span>
                    <span className="text-sm font-medium text-brand-charcoal">
                      {formatPrice(product.price * line.quantity)}
                    </span>
                  </li>
                );
              })}
            </ul>
            <Separator className="my-4" />
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium text-brand-charcoal">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="font-medium text-brand-charcoal">
                  {delivery + expressFee === 0 ? "Free" : formatPrice(delivery + expressFee)}
                </dd>
              </div>
            </dl>
            <Separator className="my-4" />
            <div className="flex justify-between text-base">
              <p className="font-display font-medium text-brand-charcoal">Total</p>
              <p className="font-display font-medium text-brand-charcoal">{formatPrice(orderTotal)}</p>
            </div>
            <Button type="submit" className="mt-6 w-full" size="lg" disabled={submitting}>
              {submitting ? "Placing order…" : "Place order"}
            </Button>
            <Button asChild variant="ghost" className="mt-2 w-full">
              <Link to="/cart">Back to bag</Link>
            </Button>
          </aside>
        </form>
      </div>
    </main>
  );
}
