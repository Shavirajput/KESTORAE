import { useState, type FormEvent } from "react";
import { Globe } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { BrandLogo } from "@/components/storefront/BrandLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { shopLinks } from "@/data/storefront";
import { isValidEmail } from "@/lib/storefront-logic";

export function StorefrontFooter() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState<{ kind: "error" | "success"; message: string } | null>(
    null,
  );

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setFeedback({
        kind: "error",
        message: "Please enter a valid email address to subscribe.",
      });
      return;
    }
    setEmail("");
    setFeedback({
      kind: "success",
      message:
        "Thank you for joining Considered Living. You're subscribed for seasonal releases and journal notes.",
    });
  };

  return (
    <footer className="mt-auto border-t border-border bg-brand-sand/55">
      <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.85fr_0.85fr_1.35fr] lg:gap-10">
          <section aria-labelledby="footer-brand">
            <h2 id="footer-brand" className="sr-only">
              Kestorae
            </h2>
            <Link to="/" aria-label="Kestorae home" className="-ml-4 inline-block">
              <BrandLogo className="h-12 w-auto object-contain brightness-[1.08] contrast-[1.1] mix-blend-multiply" />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
              Thoughtfully designed home essentials that make everyday living more comfortable,
              organised and calm.
            </p>
            <div className="mt-6">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-charcoal">
                Nordic Studio
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Copenhagen <span aria-hidden="true">•</span> Stockholm{" "}
                <span aria-hidden="true">•</span> London
              </p>
            </div>
          </section>

          <section aria-labelledby="footer-shop">
            <h2
              id="footer-shop"
              className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-charcoal"
            >
              Shop
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {shopLinks.map((item) => (
                <li key={item.slug}>
                  {item.kind === "room" ? (
                    <Link to="/rooms/$slug" params={{ slug: item.slug }} className="footer-link">
                      {item.label}
                    </Link>
                  ) : (
                    <Link
                      to="/collections/$slug"
                      params={{ slug: item.slug }}
                      className="footer-link"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="footer-about">
            <h2
              id="footer-about"
              className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-charcoal"
            >
              About
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/about" hash="philosophy" className="footer-link">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link to="/about" hash="responsible-choices" className="footer-link">
                  Responsible Choices
                </Link>
              </li>
              <li>
                <Link to="/about" hash="materials" className="footer-link">
                  Materials &amp; Craft
                </Link>
              </li>
              <li>
                <Link to="/journal" className="footer-link">
                  Journal
                </Link>
              </li>
              <li>
                <Link to="/about" hash="studio" className="footer-link">
                  Studio &amp; Careers
                </Link>
              </li>
            </ul>
          </section>

          <section aria-labelledby="footer-considered">
            <h2
              id="footer-considered"
              className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-charcoal"
            >
              Considered Living
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Join the Kestorae community for seasonal releases and quiet reflections on considered
              living.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              noValidate
              className="mt-4 flex flex-col gap-2 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Your email address
              </label>
              <Input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (feedback) setFeedback(null);
                }}
                placeholder="Your email address"
                aria-invalid={feedback?.kind === "error"}
                aria-describedby={feedback ? "newsletter-feedback" : undefined}
                className="h-10 min-w-0 flex-1 rounded-sm border-border bg-background text-sm"
              />
              <Button
                type="submit"
                className="h-10 shrink-0 rounded-sm bg-brand-forest px-5 font-display text-xs font-medium text-brand-ivory hover:bg-brand-forest/90"
              >
                Subscribe
              </Button>
            </form>
            {feedback ? (
              <p
                id="newsletter-feedback"
                role="status"
                className={`mt-2.5 text-xs leading-5 ${
                  feedback.kind === "error" ? "text-brand-terracotta" : "text-brand-forest"
                }`}
              >
                {feedback.message}
              </p>
            ) : null}

            <div className="mt-6">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Customer Care
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-muted-foreground">
                <Link to="/support" className="footer-link">
                  Help Centre
                </Link>
                <span aria-hidden="true">•</span>
                <Link to="/shipping-policy" className="footer-link">
                  Shipping
                </Link>
                <span aria-hidden="true">•</span>
                <Link to="/returns" className="footer-link">
                  Returns
                </Link>
                <span aria-hidden="true">•</span>
                <Link to="/support" hash="order-tracking" className="footer-link">
                  Order Tracking
                </Link>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/80 pt-6 text-xs text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1.5 font-medium text-brand-charcoal">
              <Globe aria-hidden="true" className="size-3.5 text-brand-forest" />
              United Kingdom (GBP £)
            </span>
            <span className="font-display text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
              Apple Pay · Visa · Mastercard · Klarna
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>© 2026 Kestorae Home &amp; Lifestyle. All rights reserved.</p>
            <nav aria-label="Legal links" className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Link to="/privacy-policy" className="footer-link">
                Privacy
              </Link>
              <Link to="/shipping-policy" className="footer-link">
                Shipping Policy
              </Link>
              <Link to="/returns" className="footer-link">
                Returns
              </Link>
              <Link to="/terms" className="footer-link">
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
