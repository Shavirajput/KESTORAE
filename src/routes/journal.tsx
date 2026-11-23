import { createFileRoute } from "@tanstack/react-router";

import { StorefrontPreview } from "@/components/storefront/StorefrontPreview";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/journal")({
  component: JournalPage,
  head: () =>
    storefrontHead({
      title: "Journal for considered living",
      description: "Ideas for thoughtful, practical, and calm everyday spaces from the Kestorae journal preview.",
      path: "/journal",
    }),
});

function JournalPage() {
  return (
    <StorefrontPreview
      eyebrow="The journal"
      title="Notes for considered living"
      description="A future home for practical ideas on creating calm, useful everyday spaces."
      note="Editorial stories are not part of this foundation step."
    />
  );
}