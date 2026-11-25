import { createFileRoute } from "@tanstack/react-router";

import { StorefrontPreview } from "@/components/storefront/StorefrontPreview";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/returns")({
  component: ReturnsPage,
  head: () =>
    storefrontHead({
      title: "Returns information preview",
      description: "A returns information page placeholder for the Kestorae storefront.",
      path: "/returns",
    }),
});

function ReturnsPage() {
  return (
    <StorefrontPreview
      eyebrow="Returns information"
      title="Returns preview"
      description="A clear home for return steps, eligibility, and timing."
      note="Return terms are illustrative and require approval before launch."
    />
  );
}
