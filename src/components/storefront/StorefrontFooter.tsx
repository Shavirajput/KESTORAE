import { useState, type FormEvent } from "react";
import { ArrowRight, Instagram } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { shopLinks } from "@/data/storefront";

export function StorefrontFooter() {
  const [newsletterNotice, setNewsletterNotice] = useState("");

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterNotice("This preview does not store email addresses or send newsletters yet.");
  };

  return (
    <footer className="mt-auto border-t border-border bg-brand-sand/50">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <section aria-labelledby="footer-brand">
            <h2 id="footer-brand" className="font-display text-sm font-semibold uppercase text-brand-forest">
              Kestorae
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              Thoughtfully considered home and lifestyle essentials for calmer, more useful everyday spaces.
            </p>
            <p className="mt-4 text-xs font-medium text-brand-charcoal">Nordic Studio · Copenhagen × Stockholm × London</p>
            <p className="mt-2 text-xs text-muted-foreground">A fictional portfolio concept.</p>
          </section>

          <section aria-labelledby="footer-shop">
            <h2 id="footer-shop" className="font-display text-xs font-semibold uppercase tracking-[0.08em]">
              Shop
            </h2>
            <ul className="mt-4 space-y-2">
              {shopLinks.map((item) => (
                <li key={item.slug}>
                  <Link
                    to="/collections/$slug"
                    params={{ slug: item.slug }}
                    className="footer-link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="footer-about">
            <h2 id="footer-about" className="font-display text-xs font-semibold uppercase tracking-[0.08em]">
              About
            </h2>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="footer-link">Our philosophy</Link></li>
              <li><Link to="/about" className="footer-link">Responsible choices</Link></li>
              <li><Link to="/about" className="footer-link">Materials & craft</Link></li>
              <li><Link to="/journal" className="footer-link">Journal</Link></li>
            </ul>
          </section>

          <section aria-labelledby="footer-considered">
            <h2 id="footer-considered" className="font-display text-xs font-semibold uppercase tracking-[0.08em]">
              Considered living
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Join the Kestorae community for notes on useful, thoughtful spaces.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mt-4 flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
              <Input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Your email address"
                className="h-10 min-w-0 rounded-sm bg-background text-sm"
              />
              <Button type="submit" variant="default" size="icon" aria-label="Subscribe to the newsletter preview">
                <ArrowRight aria-hidden="true" />
              </Button>
            </form>
            {newsletterNotice ? (
              <p role="status" className="mt-2 text-xs leading-5 text-muted-foreground">
                {newsletterNotice}
              </p>
            ) : null}

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
              <Link to="/support" className="footer-link">Customer care</Link>
              <Link to="/shipping-policy" className="footer-link">Shipping</Link>
              <Link to="/returns" className="footer-link">Returns</Link>
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Instagram aria-hidden="true" className="size-4" /> Instagram · link to be added
            </p>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Region · United Kingdom / GBP (£) <span className="text-brand-clay">(example)</span></p>
          <p>Payment methods · preview only</p>
          <p>© 2026 Kestorae. All rights reserved.</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <Link to="/privacy-policy" className="footer-link">Privacy</Link>
          <Link to="/shipping-policy" className="footer-link">Shipping policy</Link>
          <Link to="/returns" className="footer-link">Returns</Link>
          <Link to="/terms" className="footer-link">Terms</Link>
        </div>
        <p className="mt-5 max-w-4xl text-xs leading-5 text-muted-foreground">
          Kestorae is a fictional portfolio brand. Product details, prices, delivery and returns terms, and other commercial
          information shown here are illustrative and are not verified offers or policies.
        </p>
      </div>
    </footer>
  );
}