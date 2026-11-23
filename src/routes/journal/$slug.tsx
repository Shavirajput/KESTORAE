import { createFileRoute } from "@tanstack/react-router";

import { StorefrontPreview } from "@/components/storefront/StorefrontPreview";
import { humanizeSlug, storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/journal/$slug")({
  component: JournalArticlePage,
  head: ({ params }) => {
    const article = humanizeSlug(params.slug);
    return storefrontHead({
      title: article,
      description: `${article}: an editorial story preview from the Kestorae journal.`,
      path: `/journal/${encodeURIComponent(params.slug)}`,
      type: "article",
    });
  },
});

function JournalArticlePage() {
  const { slug } = Route.useParams();
  const article = humanizeSlug(slug);

  return (
    <StorefrontPreview
      eyebrow="Journal story preview"
      title={article}
      description="An editorial page foundation for useful ideas, considered materials, and everyday living."
      note="Article content and product references will be added in a later step."
    />
  );
}