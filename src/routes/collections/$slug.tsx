import { createFileRoute } from "@tanstack/react-router";

import { StorefrontPreview } from "@/components/storefront/StorefrontPreview";
import { humanizeSlug, storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/collections/$slug")({
  component: CollectionPage,
  head: ({ params }) => {
    const collection = humanizeSlug(params.slug);
    return storefrontHead({
      title: `${collection} collection`,
      description: `Explore the ${collection.toLowerCase()} collection preview from Kestorae.`,
      path: `/collections/${encodeURIComponent(params.slug)}`,
    });
  },
});

function CollectionPage() {
  const { slug } = Route.useParams();
  const collection = humanizeSlug(slug);

  return (
    <StorefrontPreview
      eyebrow="Collection preview"
      title={`${collection} collection`}
      description={`A considered edit of ${collection.toLowerCase()} essentials, organised around useful everyday living.`}
      note="Catalogue details and pricing are illustrative and are not connected to a live store."
    />
  );
}