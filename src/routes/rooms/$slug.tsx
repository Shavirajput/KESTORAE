import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";

import { ProductCard } from "@/components/storefront/ProductCard";
import { EmptyState } from "@/components/storefront/StorefrontSections";
import { Button } from "@/components/ui/button";
import { getProductsForRoom, getRoom } from "@/data/catalogue";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/rooms/$slug")({
  component: RoomPage,
  head: ({ params }) => {
    const room = getRoom(params.slug);
    const title = room ? room.title : "Room";
    return storefrontHead({
      title: `${title} edit`,
      description: room ? `Room ideas and considered pieces for the ${room.title.toLowerCase()}.` : "Room edit.",
      path: `/rooms/${encodeURIComponent(params.slug)}`,
    });
  },
});

function RoomPage() {
  const { slug } = Route.useParams();
  const room = getRoom(slug);

  if (!room) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-screen-xl px-4 py-20 sm:px-6 lg:px-8">
          <EmptyState title="Room not found" description={`There is no Kestorae room edit called “${slug}”.`}>
            <Button asChild>
              <Link to="/shop">Browse the shop</Link>
            </Button>
          </EmptyState>
        </div>
      </main>
    );
  }

  const items = getProductsForRoom(slug);

  return (
    <main className="flex-1">
      <section className="border-b border-border bg-brand-sand/40">
        <div className="mx-auto grid max-w-screen-xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
              <ChevronRight aria-hidden="true" className="size-3" />
              <span aria-current="page" className="text-foreground">
                {room.title}
              </span>
            </nav>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-olive">
              Room edit
            </p>
            <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-brand-charcoal sm:text-4xl">
              {room.title}
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">{room.description}</p>
            <Button asChild variant="link" className="mt-4 px-0">
              <Link to="/shop">
                Shop all rooms <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <img
            src={room.image}
            alt={room.alt}
            width="760"
            height="500"
            className="aspect-[3/2] w-full rounded-md object-cover"
          />
        </div>
      </section>

      <section aria-label={`${room.title} pieces`} className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-display text-xl font-medium text-brand-charcoal">
          Considered pieces for the {room.title.toLowerCase()}
        </h2>
        {items.length ? (
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            No pieces are styled for this room yet — browse the full shop for the wider edit.
          </p>
        )}
      </section>
    </main>
  );
}
