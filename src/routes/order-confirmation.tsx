import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleCheck, Package, Truck } from "lucide-react";

import { useCart } from "@/components/storefront/CartContext";
import { StorefrontBreadcrumb } from "@/components/storefront/StorefrontBreadcrumb";
import { AssuranceStrip } from "@/components/storefront/StorefrontSections";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/data/catalogue";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/order-confirmation")({
  component: OrderConfirmationPage,
  head: () =>
    storefrontHead({
      title: "Order confirmation",
      description: "Thank you for your illustrative Kestorae order.",
      path: "/order-confirmation",
    }),
});

function OrderConfirmationPage() {
  const { lastOrder } = useCart();
  const orderNumber = lastOrder?.orderNumber ?? "KST-2026-0347";
  const deliveryLabel =
    lastOrder?.shippingMethod === "express"
      ? "Express next-working-day delivery"
      : "Standard tracked delivery (2–4 working days)";

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <StorefrontBreadcrumb
          items={[{ label: "Home", to: "/" }, { label: "Order Confirmation" }]}
        />

        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-forest/10">
            <CircleCheck aria-hidden="true" className="size-7 text-brand-forest" />
          </span>
          <p className="mt-6 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
            Order Confirmed
          </p>
          <h1 className="mt-2.5 font-display text-3xl font-medium leading-tight text-brand-charcoal sm:text-4xl">
            {lastOrder
              ? `Thank you, ${lastOrder.customerName.split(" ")[0]}.`
              : "Thank you for your order."}
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            {lastOrder
              ? `Your illustrative order has been received. A studio receipt for ${lastOrder.email} is summarised below.`
              : "Your illustrative order has been received. In a live store, a confirmation email would follow shortly with your receipt and delivery updates."}
          </p>
          <p className="mt-6 inline-block rounded-sm border border-border bg-brand-sand/35 px-4 py-2 text-sm text-muted-foreground">
            Order reference{" "}
            <span className="font-display font-semibold tabular-nums text-brand-charcoal">
              {orderNumber}
            </span>
          </p>
        </div>

        {lastOrder ? (
          <section
            aria-label="Order receipt"
            className="mx-auto mt-10 max-w-2xl rounded-md border border-border bg-background p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
              <h2 className="font-display text-base font-medium text-brand-charcoal">
                Order Summary
              </h2>
              <p className="text-xs text-muted-foreground">{lastOrder.placedAt}</p>
            </div>

            <ul className="divide-y divide-border">
              {lastOrder.items.map((item) => (
                <li key={item.key} className="flex items-center gap-4 py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="56"
                    height="56"
                    className="size-14 shrink-0 rounded-sm object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-medium text-brand-charcoal">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.variant} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium tabular-nums text-brand-charcoal">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <Separator className="my-4" />
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery address</dt>
                <dd className="max-w-xs text-right text-brand-charcoal">
                  {lastOrder.addressSummary}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium tabular-nums text-brand-charcoal">
                  {formatPrice(lastOrder.subtotal)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="font-medium tabular-nums text-brand-charcoal">
                  {lastOrder.delivery === 0 ? "Free" : formatPrice(lastOrder.delivery)}
                </dd>
              </div>
            </dl>
            <Separator className="my-4" />
            <div className="flex justify-between text-base">
              <p className="font-display font-medium text-brand-charcoal">Total</p>
              <p className="font-display font-semibold tabular-nums text-brand-charcoal">
                {formatPrice(lastOrder.total)}
              </p>
            </div>
          </section>
        ) : null}

        <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-border bg-background p-5">
            <Package aria-hidden="true" className="size-5 text-brand-forest" />
            <h2 className="mt-3 font-display text-xs font-semibold uppercase tracking-[0.08em] text-brand-charcoal">
              What happens next
            </h2>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Your pieces are checked, wrapped in recycled protective packaging, and handed to the
              courier within one working day.
            </p>
          </div>
          <div className="rounded-md border border-border bg-background p-5">
            <Truck aria-hidden="true" className="size-5 text-brand-forest" />
            <h2 className="mt-3 font-display text-xs font-semibold uppercase tracking-[0.08em] text-brand-charcoal">
              Delivery
            </h2>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {deliveryLabel}. Tracking details are dispatched as soon as the parcel leaves our
              studio.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 pb-8">
          <Button
            asChild
            className="h-11 rounded-sm bg-brand-forest px-6 font-display text-xs font-medium text-brand-ivory hover:bg-brand-forest/90"
          >
            <Link to="/shop">Continue shopping</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-sm border-brand-forest/35 px-6 font-display text-xs font-medium text-brand-charcoal hover:border-brand-forest hover:bg-brand-sand/40 hover:text-brand-forest"
          >
            <Link to="/support">Visit customer care</Link>
          </Button>
        </div>
      </div>

      <AssuranceStrip />
    </main>
  );
}
