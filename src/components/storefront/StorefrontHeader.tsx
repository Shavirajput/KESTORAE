import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
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
import { collections, formatPrice, getProduct } from "@/data/catalogue";
import { rooms } from "@/data/storefront";

type SearchFormProps = {
  id: string;
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
  autoFocus?: boolean;
};

function SearchForm({ id, query, onQueryChange, onSubmit, className, autoFocus }: SearchFormProps) {
  return (
    <form onSubmit={onSubmit} role="search" className={className}>
      <label htmlFor={id} className="sr-only">
        Search considered living
      </label>
      <Input
        id={id}
        name="q"
        type="search"
        autoFocus={autoFocus}
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
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");

  const roomsRef = useRef<HTMLDivElement | null>(null);
  const wishlistRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { count: cartCount } = useCart();
  const { slugs: wishlistSlugs, count: wishlistCount, remove: removeWishlist } = useWishlist();

  useEffect(() => {
    setMobileOpen(false);
    setMobileSearchOpen(false);
    setRoomsOpen(false);
    setWishlistOpen(false);
    setNotice("");
  }, [pathname]);

  useEffect(() => {
    if (!roomsOpen && !wishlistOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (roomsOpen && roomsRef.current && !roomsRef.current.contains(target)) {
        setRoomsOpen(false);
      }
      if (wishlistOpen && wishlistRef.current && !wishlistRef.current.contains(target)) {
        setWishlistOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setRoomsOpen(false);
        setWishlistOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [roomsOpen, wishlistOpen]);

  const savedProducts = wishlistSlugs
    .map((slug) => getProduct(slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = query.trim();
    if (!term) {
      setNotice("Enter a keyword such as linen, oak, or lighting to search the catalogue.");
      return;
    }
    setNotice("");
    setMobileOpen(false);
    setMobileSearchOpen(false);
    void navigate({ to: "/search", search: { q: term } });
  };

  const isHomeActive = pathname === "/";
  const isShopActive = pathname === "/shop" || pathname.startsWith("/collections");
  const isRoomsActive = pathname.startsWith("/rooms");
  const isJournalActive = pathname.startsWith("/journal");
  const isAboutActive = pathname === "/about";
  const isAccountActive = pathname.startsWith("/account");

  const navLinkClass = (active: boolean) =>
    `nav-link relative whitespace-nowrap ${
      active
        ? "text-brand-forest font-semibold after:absolute after:inset-x-0 after:bottom-1 after:h-[1.5px] after:bg-brand-forest"
        : ""
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto grid max-w-[1320px] grid-cols-[2.75rem_1fr_auto] items-center gap-2 px-4 py-2 sm:px-6 lg:grid-cols-[13rem_1fr_auto] lg:px-8">
        <div className="lg:hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMobileSearchOpen(false);
              setWishlistOpen(false);
              setMobileOpen((open) => !open);
            }}
            className="size-10"
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
          <img
            src="/assets/aistudio/KESTORAE_f8485794.png"
            alt="Kestorae — Home & Lifestyle"
            width={2172}
            height={724}
            className="h-11 w-auto object-contain brightness-[1.08] contrast-[1.1] mix-blend-multiply sm:h-12 lg:h-14"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center justify-center gap-7 lg:flex"
        >
          <Link
            to="/"
            aria-current={isHomeActive ? "page" : undefined}
            className={navLinkClass(isHomeActive)}
          >
            Home
          </Link>
          <Link
            to="/shop"
            aria-current={isShopActive ? "page" : undefined}
            className={navLinkClass(isShopActive)}
          >
            Shop
          </Link>

          <div ref={roomsRef} className="relative">
            <button
              type="button"
              aria-expanded={roomsOpen}
              aria-controls="rooms-mega-menu"
              onClick={() => {
                setWishlistOpen(false);
                setRoomsOpen((open) => !open);
              }}
              className={`${navLinkClass(isRoomsActive)} cursor-pointer gap-1`}
            >
              Rooms
              <ChevronDown
                aria-hidden="true"
                className={`size-3.5 transition-transform duration-150 ${roomsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {roomsOpen ? (
              <div
                id="rooms-mega-menu"
                role="region"
                aria-label="Shop by room and collections"
                className="absolute left-1/2 top-full z-50 mt-3 w-[34rem] -translate-x-1/2 rounded-md border border-border bg-background p-5 shadow-xl"
              >
                <div className="grid grid-cols-[1.35fr_1fr] gap-6">
                  <div>
                    <p className="font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-olive">
                      Spaces of Refuge
                    </p>
                    <ul className="mt-3 space-y-1">
                      {rooms.map((room) => (
                        <li key={room.slug}>
                          <Link
                            to="/rooms/$slug"
                            params={{ slug: room.slug }}
                            onClick={() => setRoomsOpen(false)}
                            className="group block rounded-sm px-2.5 py-2 transition-colors hover:bg-brand-sand/55"
                          >
                            <span className="block font-display text-xs font-medium text-brand-charcoal group-hover:text-brand-forest">
                              {room.title}
                            </span>
                            <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">
                              {room.description}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-l border-border/80 pl-5">
                    <p className="font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-olive">
                      Curated Edits
                    </p>
                    <ul className="mt-3 space-y-1">
                      {collections.map((collection) => (
                        <li key={collection.slug}>
                          <Link
                            to="/collections/$slug"
                            params={{ slug: collection.slug }}
                            onClick={() => setRoomsOpen(false)}
                            className="block rounded-sm px-2.5 py-1.5 text-xs text-brand-charcoal transition-colors hover:bg-brand-sand/55 hover:text-brand-forest"
                          >
                            {collection.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/shop"
                      onClick={() => setRoomsOpen(false)}
                      className="mt-4 inline-flex items-center gap-1.5 px-2.5 font-display text-[11px] font-semibold text-brand-forest hover:text-brand-charcoal"
                    >
                      View full shop <ArrowRight aria-hidden="true" className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <Link
            to="/journal"
            aria-current={isJournalActive ? "page" : undefined}
            className={navLinkClass(isJournalActive)}
          >
            Journal
          </Link>
          <Link
            to="/about"
            aria-current={isAboutActive ? "page" : undefined}
            className={navLinkClass(isAboutActive)}
          >
            About
          </Link>
        </nav>

        <div className="flex items-center justify-self-end gap-0.5 sm:gap-1">
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
            aria-label={mobileSearchOpen ? "Close search" : "Open search"}
            aria-expanded={mobileSearchOpen}
            aria-controls="compact-search-panel"
            onClick={() => {
              setMobileOpen(false);
              setWishlistOpen(false);
              setNotice("");
              setMobileSearchOpen((open) => !open);
            }}
            className="size-10 xl:hidden"
          >
            {mobileSearchOpen ? (
              <X aria-hidden="true" className="size-[18px]" />
            ) : (
              <Search aria-hidden="true" className="size-[18px]" />
            )}
          </Button>

          <Button
            asChild
            variant="ghost"
            size="icon"
            aria-label="Create account"
            className={`size-10 ${isAccountActive ? "text-brand-forest" : ""}`}
          >
            <Link to="/account/register" aria-current={isAccountActive ? "page" : undefined}>
              <UserRound aria-hidden="true" className="size-[18px]" />
            </Link>
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
                setRoomsOpen(false);
                setMobileSearchOpen(false);
                setNotice("");
                setWishlistOpen((open) => !open);
              }}
              className="relative size-10"
            >
              <Heart
                aria-hidden="true"
                className={`size-[18px] transition-colors ${wishlistCount > 0 ? "fill-brand-forest text-brand-forest" : ""}`}
              />
              {wishlistCount > 0 ? (
                <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-brand-forest font-display text-[10px] font-semibold leading-none tabular-nums text-brand-ivory ring-2 ring-background">
                  {wishlistCount}
                </span>
              ) : null}
            </Button>

            {wishlistOpen ? (
              <div
                id="header-wishlist-panel"
                role="region"
                aria-label="Saved pieces"
                className="absolute right-0 top-full z-50 mt-2.5 w-[min(20rem,calc(100vw-2rem))] rounded-md border border-border bg-background p-4 shadow-xl"
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
            className="relative size-10"
          >
            <Link to="/cart">
              <ShoppingBag aria-hidden="true" className="size-[18px]" />
              {cartCount > 0 ? (
                <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-brand-forest font-display text-[10px] font-semibold leading-none tabular-nums text-brand-ivory ring-2 ring-background">
                  {cartCount}
                </span>
              ) : null}
            </Link>
          </Button>
        </div>
      </div>

      {mobileSearchOpen ? (
        <div
          id="compact-search-panel"
          className="border-t border-border/70 bg-background px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
        >
          <div className="mx-auto max-w-[1320px]">
            <SearchForm
              id="mobile-search"
              query={query}
              onQueryChange={setQuery}
              onSubmit={handleSearch}
              autoFocus
              className="flex items-center"
            />
          </div>
        </div>
      ) : null}

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        onKeyDown={(event) => {
          if (event.key === "Escape") setMobileOpen(false);
        }}
        className={`${mobileOpen ? "block" : "hidden"} max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-background px-4 py-3 lg:hidden`}
      >
        <div className="mx-auto max-w-[1320px]">
          <SearchForm
            id="mobile-menu-search"
            query={query}
            onQueryChange={setQuery}
            onSubmit={handleSearch}
            className="mb-3 flex items-center"
          />
          <ul className="divide-y divide-border">
            <li>
              <Link
                to="/"
                aria-current={isHomeActive ? "page" : undefined}
                className={`mobile-nav-link ${isHomeActive ? "font-semibold text-brand-forest" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                aria-current={isShopActive ? "page" : undefined}
                className={`mobile-nav-link ${isShopActive ? "font-semibold text-brand-forest" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Shop All
              </Link>
            </li>
            <li className="py-3">
              <p className="mb-2 font-display text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Shop by Room
              </p>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
                {rooms.map((room) => (
                  <li key={room.slug}>
                    <Link
                      to="/rooms/$slug"
                      params={{ slug: room.slug }}
                      className="block py-2 text-sm transition-colors hover:text-brand-forest"
                      onClick={() => setMobileOpen(false)}
                    >
                      {room.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link
                to="/journal"
                aria-current={isJournalActive ? "page" : undefined}
                className={`mobile-nav-link ${isJournalActive ? "font-semibold text-brand-forest" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Journal
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                aria-current={isAboutActive ? "page" : undefined}
                className={`mobile-nav-link ${isAboutActive ? "font-semibold text-brand-forest" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/account/register"
                aria-current={isAccountActive ? "page" : undefined}
                className={`mobile-nav-link ${isAccountActive ? "font-semibold text-brand-forest" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Create Account
              </Link>
            </li>
            <li>
              <Link to="/support" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                Customer Care
              </Link>
            </li>
          </ul>
        </div>
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
