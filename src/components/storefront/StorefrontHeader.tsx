import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

import { useCart } from "@/components/storefront/CartContext";
import { useWishlist } from "@/components/storefront/WishlistContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice, getProduct } from "@/data/catalogue";
import { rooms } from "@/data/storefront";
import kestoraeLogo from "@/assets/kestorae-logo.png.asset.json";

type SearchFormProps = {
  id: string;
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
};

function SearchForm({ id, query, onQueryChange, onSubmit, className }: SearchFormProps) {
  return (
    <form onSubmit={onSubmit} role="search" className={className}>
      <label htmlFor={id} className="sr-only">
        Search considered living
      </label>
      <Input
        id={id}
        name="q"
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search considered living..."
        className="h-9 rounded-none border-0 border-b border-brand-clay/70 bg-transparent px-1 text-sm shadow-none focus-visible:border-brand-forest focus-visible:ring-0"
      />
      <Button type="submit" variant="ghost" size="icon" aria-label="Search" className="size-9">
        <Search aria-hidden="true" className="size-4" />
      </Button>
    </form>
  );
}

export function StorefrontHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const wishlistRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { count: cartCount } = useCart();
  const { slugs: wishlistSlugs, count: wishlistCount, remove: removeWishlist } = useWishlist();

  useEffect(() => {
    const img = logoImgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setLogoFailed(true);
    }
  }, []);

  useEffect(() => {
    if (!wishlistOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (wishlistRef.current && !wishlistRef.current.contains(event.target as Node)) {
        setWishlistOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setWishlistOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [wishlistOpen]);

  const savedProducts = wishlistSlugs
    .map((slug) => getProduct(slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = query.trim();
    if (!term) {
      setNotice("Enter a search term to explore the catalogue.");
      return;
    }
    setNotice("");
    setMobileOpen(false);
    void navigate({ to: "/search", search: { q: term } });
  };

  const showPreviewMessage = (label: string) => {
    setWishlistOpen(false);
    setNotice(`${label} is not connected in this storefront preview.`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto grid max-w-[1320px] grid-cols-[2.75rem_1fr_auto] items-center gap-2 px-4 py-3.5 sm:px-6 lg:grid-cols-[11rem_1fr_auto] lg:px-8">
        <div className="lg:hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>

        <Link
          to="/"
          aria-label="Kestorae home"
          className="justify-self-center lg:justify-self-start"
          onClick={() => setMobileOpen(false)}
        >
          {logoFailed ? (
            <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
              <span className="font-display text-base font-semibold uppercase tracking-[0.16em] text-brand-charcoal sm:text-lg">
                Kestorae
              </span>
              <span className="hidden font-display text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:inline">
                Nordic Living
              </span>
            </span>
          ) : (
            <img
              ref={logoImgRef}
              src={kestoraeLogo.url}
              alt="Kestorae — Home & Lifestyle"
              width="2172"
              height="724"
              onError={() => setLogoFailed(true)}
              className="h-auto w-36 sm:w-40"
            />
          )}
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center justify-center gap-6 lg:flex"
        >
          <Link to="/" className="nav-link whitespace-nowrap">
            Home
          </Link>
          <Link to="/shop" className="nav-link whitespace-nowrap">
            Shop
          </Link>
          <details className="group relative">
            <summary className="nav-link flex cursor-pointer list-none items-center gap-1 whitespace-nowrap">
              Rooms{" "}
              <ChevronDown
                aria-hidden="true"
                className="size-3.5 transition-transform group-open:rotate-180"
              />
            </summary>
            <div className="absolute left-0 top-full z-50 mt-3 w-64 rounded-md border border-border bg-background p-2 shadow-lg">
              <ul className="space-y-0.5">
                {rooms.map((room) => (
                  <li key={room.slug}>
                    <Link
                      to="/rooms/$slug"
                      params={{ slug: room.slug }}
                      className="block rounded-sm px-3 py-2 text-sm text-brand-charcoal transition-colors hover:bg-brand-sand/60"
                    >
                      {room.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </details>
          <Link to="/journal" className="nav-link whitespace-nowrap">
            Journal
          </Link>
          <Link to="/about" className="nav-link whitespace-nowrap">
            About
          </Link>
        </nav>

        <div className="flex items-center justify-self-end gap-1">
          <SearchForm
            id="desktop-search"
            query={query}
            onQueryChange={setQuery}
            onSubmit={handleSearch}
            className="mr-1 hidden w-56 items-center xl:flex"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Account preview"
            onClick={() => showPreviewMessage("Account access")}
          >
            <UserRound aria-hidden="true" className="size-[18px]" />
          </Button>

          <div ref={wishlistRef} className="relative">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Saved wishlist (${wishlistCount} ${wishlistCount === 1 ? "item" : "items"})`}
              aria-expanded={wishlistOpen}
              aria-controls="header-wishlist-panel"
              onClick={() => {
                setNotice("");
                setWishlistOpen((open) => !open);
              }}
              className="relative"
            >
              <Heart
                aria-hidden="true"
                className={`size-[18px] transition-colors ${wishlistCount > 0 ? "fill-brand-forest text-brand-forest" : ""}`}
              />
              {wishlistCount > 0 ? (
                <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-brand-forest font-display text-[10px] font-semibold leading-none text-brand-ivory">
                  {wishlistCount}
                </span>
              ) : null}
            </Button>

            {wishlistOpen ? (
              <div
                id="header-wishlist-panel"
                role="region"
                aria-label="Saved pieces"
                className="absolute right-0 top-full z-50 mt-2.5 w-80 rounded-md border border-border bg-background p-4 shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-border pb-2.5">
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-charcoal">
                    Saved Pieces ({wishlistCount})
                  </p>
                  <button
                    type="button"
                    onClick={() => setWishlistOpen(false)}
                    aria-label="Close wishlist"
                    className="rounded-sm p-1 text-muted-foreground transition-colors hover:text-brand-charcoal"
                  >
                    <X aria-hidden="true" className="size-3.5" />
                  </button>
                </div>

                {savedProducts.length === 0 ? (
                  <div className="py-5 text-center">
                    <p className="text-xs leading-5 text-muted-foreground">
                      Tap the heart on any piece to keep a quiet shortlist while you browse.
                    </p>
                    <Button
                      asChild
                      variant="link"
                      size="sm"
                      className="mt-2 h-auto p-0 text-xs text-brand-forest"
                    >
                      <Link to="/shop" onClick={() => setWishlistOpen(false)}>
                        Explore the collection <ArrowRight aria-hidden="true" className="size-3" />
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <ul className="mt-3 max-h-72 divide-y divide-border overflow-y-auto">
                    {savedProducts.map((product) => (
                      <li key={product.slug} className="flex items-center gap-3 py-2.5">
                        <Link
                          to="/products/$slug"
                          params={{ slug: product.slug }}
                          onClick={() => setWishlistOpen(false)}
                          className="size-12 shrink-0 overflow-hidden rounded-sm bg-brand-sand/50"
                        >
                          <img
                            src={product.image}
                            alt={product.imageAlt}
                            className="size-full object-cover"
                          />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <Link
                            to="/products/$slug"
                            params={{ slug: product.slug }}
                            onClick={() => setWishlistOpen(false)}
                            className="block truncate font-display text-xs font-medium text-brand-charcoal hover:text-brand-forest"
                          >
                            {product.name}
                          </Link>
                          <p className="mt-0.5 text-xs tabular-nums text-muted-foreground">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeWishlist(product.slug)}
                          aria-label={`Remove ${product.name} from wishlist`}
                          className="rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-brand-sand/60 hover:text-brand-charcoal"
                        >
                          <Trash2 aria-hidden="true" className="size-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null}
          </div>

          <Button
            asChild
            variant="ghost"
            size="icon"
            aria-label={`Shopping bag (${cartCount} ${cartCount === 1 ? "item" : "items"})`}
            className="relative"
          >
            <Link to="/cart">
              <ShoppingBag aria-hidden="true" className="size-[18px]" />
              {cartCount > 0 ? (
                <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-brand-forest font-display text-[10px] font-semibold leading-none text-brand-ivory">
                  {cartCount}
                </span>
              ) : null}
            </Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-4 pb-3 sm:px-6 lg:px-8 xl:hidden">
        <SearchForm
          id="mobile-search"
          query={query}
          onQueryChange={setQuery}
          onSubmit={handleSearch}
          className="flex items-center"
        />
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        onKeyDown={(event) => {
          if (event.key === "Escape") setMobileOpen(false);
        }}
        className={`${mobileOpen ? "block" : "hidden"} border-t border-border bg-background px-4 py-3 lg:hidden`}
      >
        <ul className="mx-auto max-w-[1320px] divide-y divide-border">
          <li>
            <Link to="/" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
              Shop all
            </Link>
          </li>
          <li className="py-3">
            <p className="mb-2 font-display text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Shop by room
            </p>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
              {rooms.map((room) => (
                <li key={room.slug}>
                  <Link
                    to="/rooms/$slug"
                    params={{ slug: room.slug }}
                    className="block py-2 text-sm transition-colors hover:text-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    {room.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link to="/journal" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
              Journal
            </Link>
          </li>
          <li>
            <Link to="/about" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
              About
            </Link>
          </li>
        </ul>
      </nav>

      {notice ? (
        <div
          role="status"
          className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 border-t border-border/60 px-4 py-2 text-xs text-muted-foreground sm:px-6 lg:px-8"
        >
          <p>{notice}</p>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
            className="text-muted-foreground hover:text-brand-charcoal"
          >
            <X aria-hidden="true" className="size-3.5" />
          </button>
        </div>
      ) : null}
    </header>
  );
}
