import { createFileRoute } from "@tanstack/react-router";

import { StorefrontPreview } from "@/components/storefront/StorefrontPreview";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/order-confirmation")({
  component: OrderConfirmationPage,
  head: () =>
    storefrontHead({
      title: "Order confirmation preview",
      description: "An order confirmation page foundation for the Kestorae storefront.",
      path: "/order-confirmation",
    }),
});

function OrderConfirmationPage() {
  return (
    <StorefrontPreview
      eyebrow="Order update"
      title="Order confirmation preview"
      description="The order confirmation layout is ready for a future commerce connection."
      note="No order has been placed through this portfolio preview."
    />
  );
}