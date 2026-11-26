import { Link } from "@tanstack/react-router";
import { Heart, Plus } from "lucide-react";

import { useCart } from "@/components/storefront/CartContext";
import { useWishlist } from "@/components/storefront/WishlistContext";
import { formatPrice, type Product } from "@/data/catalogue";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const isSaved = has(product.slug);

  return (
    <article className="group flex min-w-0 flex-col rounded-md border border-border/70 bg-background p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none">
      <div className="relative overflow-hidden rounded-sm bg-brand-sand/40">
        <Link
          to="/products/$slug"
          params={{ slug: product.slug }}
          className="block"
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.imageAlt}
            width="640"
            height="480"
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </Link>

        {product.badge ? (
          <span className="pointer-events-none absolute left-2.5 top-2.5 rounded-sm bg-brand-ivory/95 px-2 py-0.5 font-display text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-forest backdrop-blur-xs">
            {product.badge}
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => toggle(product.slug)}
          aria-label={
            isSaved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`
          }
          aria-pressed={isSaved}
          className={`absolute right-2.5 top-2.5 flex size-9 items-center justify-center rounded-full border backdrop-blur-xs transition-colors ${
            isSaved
              ? "border-brand-forest bg-brand-forest text-brand-ivory"
              : "border-border/80 bg-brand-ivory/90 text-brand-charcoal hover:border-brand-forest hover:text-brand-forest"
          }`}
        >
          <Heart aria-hidden="true" className={`size-4 ${isSaved ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-3.5">
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-olive">
          {product.category}
        </p>
        <h3 className="mt-1.5 font-display text-[15px] font-medium leading-snug text-brand-charcoal">
          <Link
            to="/products/$slug"
            params={{ slug: product.slug }}
            className="transition-colors hover:text-brand-forest"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-5 text-muted-foreground">
          {product.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-3">
          <div>
            <p className="font-display text-sm font-semibold tabular-nums text-brand-charcoal">
              {formatPrice(product.price)}
            </p>
            <p className="mt-0.5 text-[11px] text-brand-olive">In stock</p>
          </div>

          <button
            type="button"
            onClick={() => add(product.slug)}
            aria-label={`Add ${product.name} to bag`}
            className="inline-flex min-h-9 items-center gap-1 rounded-sm border border-border px-3 py-1.5 font-display text-[11px] font-medium whitespace-nowrap text-brand-charcoal transition-colors hover:border-brand-forest hover:bg-brand-forest hover:text-brand-ivory"
          >
            <Plus aria-hidden="true" className="size-3.5" />
            Add to bag
          </button>
        </div>
      </div>
    </article>
  );
}
