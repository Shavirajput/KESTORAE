import { createFileRoute } from "@tanstack/react-router";

import { StorefrontPreview } from "@/components/storefront/StorefrontPreview";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/support")({
  component: SupportPage,
  head: () =>
    storefrontHead({
      title: "Customer care",
      description:
        "Find customer care and order support information for the Kestorae storefront preview.",
      path: "/support",
    }),
});

function SupportPage() {
  return (
    <StorefrontPreview
      eyebrow="Customer care"
      title="How can we help?"
      description="A clear home for shipping, returns, product care, and order questions."
      note="Customer support is not connected in this portfolio preview."
    />
  );
}
