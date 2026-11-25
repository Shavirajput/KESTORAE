import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { useCart } from "@/components/storefront/CartContext";
import { formatPrice, type Product } from "@/data/catalogue";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="group flex min-w-0 flex-col">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="relative block overflow-hidden rounded-sm"
        aria-label={product.name}
      >
        <img
          src={product.image}
          alt={product.imageAlt}
          width="700"
          height="384"
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
        />
        {product.badge ? (
          <span className="absolute left-3 top-3 border border-border bg-background/95 px-2 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-brand-olive">
            {product.badge}
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col pt-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-sm font-medium leading-snug text-brand-charcoal">
            <Link
              to="/products/$slug"
              params={{ slug: product.slug }}
              className="transition-colors hover:text-brand-forest"
            >
              {product.name}
            </Link>
          </h3>
          <p className="shrink-0 text-sm font-medium text-brand-charcoal">{formatPrice(product.price)}</p>
        </div>
        <p className="mt-1 flex-1 text-xs leading-5 text-muted-foreground">{product.shortDescription}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3 w-full bg-background"
          onClick={() => add(product.slug)}
        >
          Add to bag
        </Button>
      </div>
    </article>
  );
}
