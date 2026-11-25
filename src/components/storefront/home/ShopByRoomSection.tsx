import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { getProductsForRoom } from "@/data/catalogue";
import { rooms } from "@/data/storefront";

export function ShopByRoomSection() {
  return (
    <section
      id="rooms"
      aria-labelledby="shop-by-room-heading"
      className="mx-auto max-w-[1320px] scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
            Spaces of Refuge
          </p>
          <h2
            id="shop-by-room-heading"
            className="mt-2.5 font-display text-3xl font-medium tracking-[-0.015em] text-brand-charcoal sm:text-4xl"
          >
            Shop by Room
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Every corner of the home requires its own sensory cadence. Browse modular furniture,
            textiles and tactile pieces tailored to how you live.
          </p>
        </div>

        <Link
          to="/shop"
          className="group inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.08em] text-brand-forest transition-colors hover:text-brand-charcoal"
        >
          View All Categories
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        {rooms.map((room, index) => {
          const isFeaturedRow = index < 2;
          const pieceCount = getProductsForRoom(room.slug).length;

          return (
            <Link
              key={room.slug}
              to="/rooms/$slug"
              params={{ slug: room.slug }}
              className={`group relative block min-w-0 overflow-hidden rounded-lg bg-brand-sand/50 ${
                isFeaturedRow
                  ? "aspect-[4/3] sm:aspect-[16/11] lg:col-span-3 lg:aspect-[16/10]"
                  : "aspect-[4/3] lg:col-span-2"
              }`}
            >
              <img
                src={room.image}
                alt={room.alt}
                width="800"
                height="540"
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5 transition-opacity duration-300 group-hover:from-black/75"
              />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <div className="min-w-0">
                  {pieceCount > 0 ? (
                    <p className="font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-sand">
                      {pieceCount} {pieceCount === 1 ? "Curated Piece" : "Curated Pieces"}
                    </p>
                  ) : null}
                  <h3 className="mt-1 font-display text-xl font-medium text-brand-ivory sm:text-2xl">
                    {room.title}
                  </h3>
                  <p className="mt-1 max-w-[34ch] text-xs leading-5 text-brand-ivory/85 sm:text-sm">
                    {room.description}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-ivory/45 bg-brand-ivory/15 text-brand-ivory backdrop-blur-xs transition-colors duration-200 group-hover:border-brand-ivory group-hover:bg-brand-ivory group-hover:text-brand-forest"
                >
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
