import { createFileRoute } from "@tanstack/react-router";

import { StorefrontPreview } from "@/components/storefront/StorefrontPreview";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
  head: () =>
    storefrontHead({
      title: "Shop home and lifestyle",
      description: "Browse Kestorae’s illustrative home and lifestyle collection by room and everyday need.",
      path: "/shop",
    }),
});

function ShopPage() {
  return (
    <StorefrontPreview
      eyebrow="The collection"
      title="Shop Kestorae"
      description="A room-led directory of thoughtfully considered home and lifestyle essentials."
      note="This fictional portfolio storefront does not yet include live products or prices."
    />
  );
}