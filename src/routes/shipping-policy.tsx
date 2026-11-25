import { createFileRoute } from "@tanstack/react-router";

import { StorefrontPreview } from "@/components/storefront/StorefrontPreview";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/shipping-policy")({
  component: ShippingPolicyPage,
  head: () =>
    storefrontHead({
      title: "Shipping information preview",
      description: "A shipping information page placeholder for the Kestorae storefront.",
      path: "/shipping-policy",
    }),
});

function ShippingPolicyPage() {
  return (
    <StorefrontPreview
      eyebrow="Delivery information"
      title="Shipping information preview"
      description="A clear home for delivery regions, timelines, and charges."
      note="Shipping details are illustrative and require approval before launch."
    />
  );
}
