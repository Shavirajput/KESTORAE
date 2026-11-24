import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        className="h-10 rounded-none border-0 border-b border-brand-clay bg-transparent px-1 text-sm shadow-none focus-visible:ring-0"
      />
      <Button type="submit" variant="ghost" size="icon" aria-label="Search">
        <Search aria-hidden="true" />
      </Button>
    </form>
  );
}

export function StorefrontHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = query.trim();
    if (!term) {
      setNotice("Enter a search term to open the search preview.");
      return;
    }
    setNotice("");
    setMobileOpen(false);
    void navigate({ to: "/search", search: { q: term } });
  };

  const showPreviewMessage = (label: string) => {
    setNotice(`${label} is not connected in this storefront preview.`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto grid max-w-screen-xl grid-cols-[2.75rem_1fr_auto] items-center gap-2 px-4 py-3 sm:px-6 lg:grid-cols-[10rem_1fr_auto] lg:px-8">
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
          <img
            src={kestoraeLogo.url}
            alt="Kestorae — Home & Lifestyle"
            width="2172"
            height="724"
            className="w-36 sm:w-40"
          />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center justify-center gap-4 lg:flex">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/shop" className="nav-link">
            Shop
          </Link>
          <details className="group relative">
            <summary className="nav-link flex cursor-pointer list-none items-center gap-1">
              Rooms <ChevronDown aria-hidden="true" className="size-3 transition-transform group-open:rotate-180" />
            </summary>
            <div className="absolute left-0 top-full z-50 mt-3 w-60 border border-border bg-background p-3 shadow-md">
              <ul className="space-y-1">
                {rooms.map((room) => (
                  <li key={room.slug}>
                    <Link
                      to="/rooms/$slug"
                      params={{ slug: room.slug }}
                      className="block px-3 py-2 text-sm transition-colors hover:bg-secondary"
                    >
                      {room.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </details>
          <Link to="/journal" className="nav-link">
            Journal
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </nav>

        <div className="flex items-center justify-self-end gap-1">
          <SearchForm
            id="desktop-search"
            query={query}
            onQueryChange={setQuery}
            onSubmit={handleSearch}
            className="hidden w-60 items-center xl:flex"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Account preview"
            onClick={() => showPreviewMessage("Account access")}
          >
            <UserRound aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Wishlist preview"
            onClick={() => showPreviewMessage("Wishlist")}
          >
            <Heart aria-hidden="true" />
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Shopping bag">
            <Link to="/cart">
              <ShoppingBag aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 pb-3 sm:px-6 lg:px-8 xl:hidden">
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
        <ul className="mx-auto max-w-screen-xl divide-y divide-border">
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
            <p className="mb-2 font-display text-xs font-semibold uppercase text-muted-foreground">Shop by room</p>
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
        <p role="status" className="mx-auto max-w-screen-xl px-4 py-2 text-xs text-muted-foreground sm:px-6 lg:px-8">
          {notice}
        </p>
      ) : null}
    </header>
  );
}