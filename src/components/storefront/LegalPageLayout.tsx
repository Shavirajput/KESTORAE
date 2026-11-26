import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { StorefrontBreadcrumb } from "@/components/storefront/StorefrontBreadcrumb";
import { AssuranceStrip } from "@/components/storefront/StorefrontSections";

export type LegalSection = {
  id: string;
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

type LegalPageLayoutProps = {
  eyebrow: string;
  title: string;
  summary: string;
  lastUpdated: string;
  sections: readonly LegalSection[];
  extraContent?: ReactNode;
};

const POLICY_LINKS = [
  { to: "/shipping-policy" as const, label: "Shipping & Delivery" },
  { to: "/returns" as const, label: "Returns & Exchanges" },
  { to: "/privacy-policy" as const, label: "Privacy & Cookies" },
  { to: "/terms" as const, label: "Terms & Conditions" },
  { to: "/support" as const, label: "Customer Care" },
];

export function LegalPageLayout({
  eyebrow,
  title,
  summary,
  lastUpdated,
  sections,
  extraContent,
}: LegalPageLayoutProps) {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <StorefrontBreadcrumb items={[{ label: "Home", to: "/" }, { label: title }]} />

        <header className="max-w-3xl border-b border-border pb-8">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
            {eyebrow}
          </p>
          <h1 className="mt-2.5 font-display text-3xl font-medium leading-tight tracking-[-0.015em] text-brand-charcoal sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            {summary}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">Last updated: {lastUpdated}</p>
        </header>

        <div className="mt-10 grid gap-10 pb-14 lg:grid-cols-[16rem_1fr] lg:gap-14">
          <aside aria-label="Page contents" className="lg:sticky lg:top-24 lg:h-fit">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-charcoal">
              On This Page
            </p>
            <ul className="mt-3 space-y-2 border-l border-border pl-4 text-xs">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block py-0.5 text-muted-foreground transition-colors hover:text-brand-forest"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-border pt-6">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-charcoal">
                Related Policies
              </p>
              <ul className="mt-3 space-y-2 text-xs">
                {POLICY_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="max-w-3xl space-y-10">
            {extraContent}
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className="scroll-mt-24"
              >
                <h2
                  id={`${section.id}-heading`}
                  className="font-display text-xl font-medium text-brand-charcoal"
                >
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3.5 text-sm leading-7 text-muted-foreground">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets?.length ? (
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-[9px] size-1.5 shrink-0 rounded-full bg-brand-forest"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </div>

      <AssuranceStrip />
    </main>
  );
}
