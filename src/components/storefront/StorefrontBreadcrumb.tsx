import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  to?: "/" | "/shop" | "/journal" | "/cart" | "/support" | "/about";
};

export function StorefrontBreadcrumb({
  items,
  className = "mb-8",
}: {
  items: readonly BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 ? (
                <li aria-hidden="true" className="flex items-center">
                  <ChevronRight className="size-3 text-brand-clay" />
                </li>
              ) : null}
              <li className="min-w-0">
                {item.to && !isLast ? (
                  <Link to={item.to} className="transition-colors hover:text-brand-forest">
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className="block max-w-[16rem] truncate text-brand-charcoal sm:max-w-none"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
