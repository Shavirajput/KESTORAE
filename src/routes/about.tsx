import { createFileRoute } from "@tanstack/react-router";

import { StorefrontPreview } from "@/components/storefront/StorefrontPreview";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () =>
    storefrontHead({
      title: "About Kestorae",
      description: "Discover the Kestorae philosophy: thoughtful utility, clarity, and calm everyday living.",
      path: "/about",
    }),
});

function AboutPage() {
  return (
    <StorefrontPreview
      eyebrow="Our philosophy"
      title="Useful things, thoughtfully chosen"
      description="Kestorae is a fictional portfolio concept shaped around practical design and calmer everyday spaces."
      note="Any sourcing, origin, or sustainability information will be included only when verified."
    />
  );
}