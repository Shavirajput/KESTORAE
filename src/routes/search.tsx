import { createFileRoute } from "@tanstack/react-router";

import { StorefrontPreview } from "@/components/storefront/StorefrontPreview";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: SearchPage,
  head: () =>
    storefrontHead({
      title: "Search home and lifestyle",
      description: "Search the Kestorae home and lifestyle storefront preview.",
      path: "/search",
    }),
});

function SearchPage() {
  const { q } = Route.useSearch();
  const title = q ? `Search results for “${q}”` : "Search Kestorae";

  return (
    <StorefrontPreview
      eyebrow="Search preview"
      title={title}
      description="Search is prepared for the storefront foundation."
      note="A live catalogue is not connected, so product results are not available yet."
    />
  );
}