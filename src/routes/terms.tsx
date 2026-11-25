import { createFileRoute } from "@tanstack/react-router";

import { StorefrontPreview } from "@/components/storefront/StorefrontPreview";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () =>
    storefrontHead({
      title: "Terms of use preview",
      description: "A terms of use page placeholder for the Kestorae portfolio storefront.",
      path: "/terms",
    }),
});

function TermsPage() {
  return (
    <StorefrontPreview
      eyebrow="Legal information"
      title="Terms of use preview"
      description="A clearly organised home for storefront terms and conditions."
      note="This is not a legal document; approved terms are required before launch."
    />
  );
}
