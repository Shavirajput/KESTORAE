import { createFileRoute } from "@tanstack/react-router";

import { StorefrontPreview } from "@/components/storefront/StorefrontPreview";
import { humanizeSlug, storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/rooms/$slug")({
  component: RoomPage,
  head: ({ params }) => {
    const room = humanizeSlug(params.slug);
    return storefrontHead({
      title: `${room} edit`,
      description: `Room inspiration and product discovery preview for ${room.toLowerCase()}.`,
      path: `/rooms/${encodeURIComponent(params.slug)}`,
    });
  },
});

function RoomPage() {
  const { slug } = Route.useParams();
  const room = humanizeSlug(slug);

  return (
    <StorefrontPreview
      eyebrow="Room edit preview"
      title={`${room} living`}
      description={`A room-led preview for ${room.toLowerCase()}, with useful ideas and considered product groupings.`}
      note="This portfolio concept does not yet have an approved live catalogue."
    />
  );
}