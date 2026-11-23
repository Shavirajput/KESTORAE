import { createFileRoute } from "@tanstack/react-router";

import { StorefrontPreview } from "@/components/storefront/StorefrontPreview";
import { humanizeSlug, storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/products/$slug")({
  component: ProductPage,
  head: ({ params }) => {
    const product = humanizeSlug(params.slug);
    return storefrontHead({
      title: `${product} product details`,
      description: `Product detail preview for ${product}, an illustrative Kestorae home and lifestyle item.`,
      path: `/products/${encodeURIComponent(params.slug)}`,
      type: "product",
    });
  },
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = humanizeSlug(slug);

  return (
    <StorefrontPreview
      eyebrow="Product preview"
      title={product}
      description="Product information for this illustrative portfolio item will be added after the catalogue is approved."
      note="No live price, stock status, material claim, or purchase action is shown in this foundation."
    />
  );
}