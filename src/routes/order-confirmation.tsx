import { createFileRoute, Link } from "@tanstack/react-router";
import { CircleCheck, Package, Truck } from "lucide-react";

import { AssuranceStrip } from "@/components/storefront/StorefrontSections";
import { Button } from "@/components/ui/button";
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
  const orderNumber = "KST-2026-0347";

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-forest/10">
            <CircleCheck aria-hidden="true" className="size-7 text-brand-forest" />
          </span>
          <p className="mt-6 font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-olive">
            Order placed
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-brand-charcoal sm:text-4xl">
            Thank you for your order.
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Your illustrative order has been received. In a live store, a confirmation email would
            follow shortly with your receipt and delivery updates.
          </p>
          <p className="mt-6 inline-block border border-border bg-brand-sand/30 px-4 py-2 text-sm text-muted-foreground">
            Order number <span className="font-medium text-brand-charcoal">{orderNumber}</span>
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2">
          <div className="border border-border bg-background p-5">
            <Package aria-hidden="true" className="size-5 text-brand-forest" />
            <h2 className="mt-3 font-display text-sm font-semibold uppercase text-brand-charcoal">
              What happens next
            </h2>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Your pieces are checked, wrapped in protective packaging, and passed to the courier
              within one working day.
            </p>
          </div>
          <div className="border border-border bg-background p-5">
            <Truck aria-hidden="true" className="size-5 text-brand-forest" />
            <h2 className="mt-3 font-display text-sm font-semibold uppercase text-brand-charcoal">
              Delivery
            </h2>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Standard delivery arrives in 2–4 working days. You would receive tracking details as
              soon as the parcel leaves the studio.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/shop">Continue shopping</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/support">Visit customer care</Link>
          </Button>
        </div>
      </div>

      <AssuranceStrip />
    </main>
  );
}
