import { createFileRoute } from "@tanstack/react-router";

import { StorefrontPreview } from "@/components/storefront/StorefrontPreview";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () =>
    storefrontHead({
      title: "Shopping bag preview",
      description: "A shopping bag page foundation for the Kestorae storefront.",
      path: "/cart",
    }),
});

function CartPage() {
  return (
    <StorefrontPreview
      eyebrow="Your bag"
      title="Your shopping bag"
      description="The shopping bag layout is prepared for a future commerce connection."
      note="This preview does not save items or calculate a live order total."
    />
  );
}