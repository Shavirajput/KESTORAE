import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Heart, Minus, PackageCheck, Plus, RotateCcw, Truck } from "lucide-react";

import { useCart } from "@/components/storefront/CartContext";
import { ProductCard } from "@/components/storefront/ProductCard";
import { ResponsivePicture } from "@/components/storefront/ResponsivePicture";
import { StorefrontBreadcrumb } from "@/components/storefront/StorefrontBreadcrumb";
import { AssuranceStrip, EmptyState } from "@/components/storefront/StorefrontSections";
import { useWishlist } from "@/components/storefront/WishlistContext";
import { Button } from "@/components/ui/button";
import {
  formatPrice,
  getProduct,
  getProductGallery,
  getProductVariants,
  getProductsForRoom,
  getVariantPrice,
} from "@/data/catalogue";
import { rooms } from "@/data/storefront";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/products/$slug")({
  component: ProductPage,
  head: ({ params }) => {
    const product = getProduct(params.slug);
    const title = product ? product.name : "Product details";
    return storefrontHead({
      title: `${title} — product details`,
      description: product
        ? product.shortDescription
        : "Product details for a Kestorae home and lifestyle item.",
      path: `/products/${encodeURIComponent(params.slug)}`,
      type: "product",
    });
  },
});

function ProductPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const { has, toggle } = useWishlist();

  const product = getProduct(slug);
  const variants = product ? getProductVariants(product) : [];
  const gallery = product ? getProductGallery(product) : [];

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string>(variants[0]?.label ?? "");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setQuantity(1);
    setActiveImageIndex(0);
    setSelectedVariant(product ? (getProductVariants(product)[0]?.label ?? "") : "");
  }, [slug, product]);

  if (!product) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8">
          <EmptyState
            title="We could not find that piece"
            description={`“${slug}” is not part of the current Kestorae edit.`}
          >
            <Button
              asChild
              className="rounded-sm bg-brand-forest text-brand-ivory hover:bg-brand-forest/90"
            >
              <Link to="/shop">Browse the shop</Link>
            </Button>
          </EmptyState>
        </div>
      </main>
    );
  }

  const activeVariantLabel = selectedVariant || variants[0]?.label || "Standard";
  const unitPrice = getVariantPrice(product, activeVariantLabel);
  const activeImage = gallery[activeImageIndex] ??
    gallery[0] ?? { src: product.image, alt: product.imageAlt };
  const isSaved = has(product.slug);

  const relatedRooms = rooms.filter((room) => product.rooms.includes(room.slug));
  const primaryRoom = product.rooms[0];
  const relatedProducts = primaryRoom
    ? getProductsForRoom(primaryRoom)
        .filter((item) => item.slug !== product.slug)
        .slice(0, 4)
    : [];

  const handleAdd = () => {
    add(product.slug, quantity, activeVariantLabel);
  };

  const handleBuyNow = () => {
    add(product.slug, quantity, activeVariantLabel);
    void navigate({ to: "/checkout" });
  };

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <StorefrontBreadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/shop" },
            { label: product.name },
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-14">
          <div className="min-w-0 lg:sticky lg:top-24">
            <figure className="relative overflow-hidden rounded-lg border border-border/70 bg-brand-sand/40">
              <ResponsivePicture
                src={activeImage.src}
                alt={activeImage.alt}
                sizes="(max-width: 1023px) calc(100vw - 2rem), 680px"
                width={960}
                height={768}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                className="aspect-[5/4] w-full object-cover"
              />
              {product.badge ? (
                <span className="pointer-events-none absolute left-4 top-4 rounded-sm bg-brand-ivory/95 px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-forest backdrop-blur-xs">
                  {product.badge}
                </span>
              ) : null}
            </figure>

            {gallery.length > 1 ? (
              <div
                role="group"
                aria-label="Product gallery thumbnails"
                className="mt-3 grid grid-cols-3 gap-3"
              >
                {gallery.map((item, index) => {
                  const selected = index === activeImageIndex;
                  return (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      aria-label={`View image ${index + 1} of ${gallery.length}: ${item.alt}`}
                      aria-pressed={selected}
                      className={`overflow-hidden rounded-md border bg-brand-sand/40 transition-all ${
                        selected
                          ? "border-brand-forest ring-2 ring-brand-forest/30"
                          : "border-border opacity-80 hover:opacity-100"
                      }`}
                    >
                      <ResponsivePicture
                        src={item.src}
                        alt=""
                        sizes="(max-width: 1023px) 30vw, 220px"
                        width={320}
                        height={240}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="min-w-0 max-w-xl">
            <div className="flex items-center justify-between gap-4">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
                {product.category}
              </p>
              <span className="text-xs font-medium text-brand-olive">In stock · Ready to ship</span>
            </div>

            <h1 className="mt-2.5 font-display text-3xl font-medium leading-tight tracking-[-0.015em] text-brand-charcoal sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 font-display text-2xl font-medium tabular-nums text-brand-charcoal">
              {formatPrice(unitPrice)}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{product.description}</p>

            {variants.length > 0 ? (
              <div className="mt-6">
                <p
                  id="finish-label"
                  className="font-display text-xs font-semibold uppercase tracking-[0.08em] text-brand-charcoal"
                >
                  Finish:{" "}
                  <span className="font-normal normal-case tracking-normal text-muted-foreground">
                    {activeVariantLabel}
                  </span>
                </p>
                <div
                  role="radiogroup"
                  aria-labelledby="finish-label"
                  className="mt-3 flex flex-wrap gap-2.5"
                >
                  {variants.map((variant) => {
                    const selected = activeVariantLabel === variant.label;
                    return (
                      <button
                        key={variant.label}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setSelectedVariant(variant.label)}
                        className={`inline-flex min-h-10 items-center gap-2 rounded-sm border px-3.5 py-2 text-xs font-medium transition-colors ${
                          selected
                            ? "border-brand-forest bg-brand-sand/55 text-brand-charcoal"
                            : "border-border bg-background text-muted-foreground hover:border-brand-clay hover:text-brand-charcoal"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          style={{ backgroundColor: variant.swatch }}
                          className="size-3.5 rounded-full border border-brand-charcoal/20"
                        />
                        <span>{variant.label}</span>
                        {variant.priceDelta ? (
                          <span className="text-[11px] tabular-nums text-brand-olive">
                            +{formatPrice(variant.priceDelta)}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <p
                id="quantity-label"
                className="font-display text-xs font-semibold uppercase tracking-[0.08em] text-brand-charcoal"
              >
                Quantity
              </p>
              <div
                role="group"
                aria-labelledby="quantity-label"
                className="flex items-center rounded-sm border border-border bg-background"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-10 rounded-none"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus aria-hidden="true" className="size-3.5" />
                </Button>
                <span
                  aria-live="polite"
                  className="w-10 text-center text-sm font-medium tabular-nums"
                >
                  {quantity}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-10 rounded-none"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                >
                  <Plus aria-hidden="true" className="size-3.5" />
                </Button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                type="button"
                size="lg"
                onClick={handleAdd}
                className="h-11 flex-1 rounded-sm bg-brand-forest px-6 font-display text-xs font-medium tracking-[0.04em] text-brand-ivory hover:bg-brand-forest/90 sm:flex-none"
              >
                Add to bag · {formatPrice(unitPrice * quantity)}
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={handleBuyNow}
                className="h-11 rounded-sm border-brand-forest/40 px-6 font-display text-xs font-medium text-brand-forest hover:border-brand-forest hover:bg-brand-forest/10 hover:text-brand-forest"
              >
                Buy now
              </Button>
              <Button
                type="button"
                variant={isSaved ? "default" : "outline"}
                size="icon"
                onClick={() => toggle(product.slug)}
                aria-label={
                  isSaved
                    ? `Remove ${product.name} from wishlist`
                    : `Save ${product.name} to wishlist`
                }
                aria-pressed={isSaved}
                className={`size-11 rounded-sm ${
                  isSaved
                    ? "bg-brand-forest text-brand-ivory hover:bg-brand-forest/90"
                    : "border-border bg-background text-brand-charcoal hover:border-brand-forest hover:bg-brand-sand/40 hover:text-brand-forest"
                }`}
              >
                <Heart aria-hidden="true" className={`size-4 ${isSaved ? "fill-current" : ""}`} />
              </Button>
            </div>

            <ul className="mt-8 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
              {product.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-[8px] size-1.5 shrink-0 rounded-full bg-brand-forest"
                  />
                  {detail}
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-3.5 border-t border-border pt-6 text-sm">
              <div>
                <dt className="font-display text-xs font-semibold uppercase tracking-[0.06em] text-brand-charcoal">
                  Materials
                </dt>
                <dd className="mt-1 text-muted-foreground">{product.materials}</dd>
              </div>
              <div>
                <dt className="font-display text-xs font-semibold uppercase tracking-[0.06em] text-brand-charcoal">
                  Dimensions
                </dt>
                <dd className="mt-1 text-muted-foreground">{product.dimensions}</dd>
              </div>
              <div>
                <dt className="font-display text-xs font-semibold uppercase tracking-[0.06em] text-brand-charcoal">
                  Care
                </dt>
                <dd className="mt-1 text-muted-foreground">{product.care}</dd>
              </div>
            </dl>

            <div className="mt-8 grid gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:grid-cols-3">
              <p className="flex items-center gap-2">
                <Truck aria-hidden="true" className="size-4 shrink-0 text-brand-forest" />
                Free delivery over £120
              </p>
              <p className="flex items-center gap-2">
                <RotateCcw aria-hidden="true" className="size-4 shrink-0 text-brand-forest" />
                30-day conscious returns
              </p>
              <p className="flex items-center gap-2">
                <PackageCheck aria-hidden="true" className="size-4 shrink-0 text-brand-forest" />
                Recycled protective packaging
              </p>
            </div>

            {relatedRooms.length ? (
              <p className="mt-6 text-xs text-muted-foreground">
                Styled for{" "}
                {relatedRooms.map((room, index) => (
                  <span key={room.slug}>
                    {index > 0 ? " · " : ""}
                    <Link
                      to="/rooms/$slug"
                      params={{ slug: room.slug }}
                      className="font-medium text-brand-charcoal underline-offset-4 transition-colors hover:text-brand-forest hover:underline"
                    >
                      {room.title}
                    </Link>
                  </span>
                ))}
              </p>
            ) : null}
          </div>
        </div>

        {relatedProducts.length ? (
          <section aria-label="You may also like" className="mt-16 border-t border-border py-12">
            <h2 className="font-display text-2xl font-medium text-brand-charcoal">
              You may also like
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <AssuranceStrip />
    </main>
  );
}
