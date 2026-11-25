import { createFileRoute } from "@tanstack/react-router";

import { StorefrontPreview } from "@/components/storefront/StorefrontPreview";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
  head: () =>
    storefrontHead({
      title: "Privacy policy preview",
      description: "A privacy policy page placeholder for the Kestorae portfolio storefront.",
      path: "/privacy-policy",
    }),
});

function PrivacyPolicyPage() {
  return (
    <StorefrontPreview
      eyebrow="Legal information"
      title="Privacy policy preview"
      description="A privacy information page is part of the storefront foundation."
      note="This is not a legal policy; approved privacy terms are required before launch."
    />
  );
}
