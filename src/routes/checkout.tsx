import { createFileRoute } from "@tanstack/react-router";

import { StorefrontPreview } from "@/components/storefront/StorefrontPreview";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () =>
    storefrontHead({
      title: "Checkout preview",
      description: "A checkout handoff placeholder for the Kestorae storefront foundation.",
      path: "/checkout",
    }),
});

function CheckoutPage() {
  return (
    <StorefrontPreview
      eyebrow="Secure checkout"
      title="Checkout is not active yet"
      description="This page is a visual placeholder for a future secure commerce checkout."
      note="No payment details are collected by this portfolio preview."
    />
  );
}