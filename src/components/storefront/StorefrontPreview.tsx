import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

type StorefrontPreviewProps = {
  eyebrow: string;
  title: string;
  description: string;
  note?: string;
};

export function StorefrontPreview({ eyebrow, title, description, note }: StorefrontPreviewProps) {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-12 flex items-center gap-2 text-xs text-muted-foreground"
        >
          <Link to="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <ChevronRight aria-hidden="true" className="size-3" />
          <span aria-current="page" className="text-foreground">
            {title}
          </span>
        </nav>

        <section className="mx-auto max-w-3xl py-12 text-center sm:py-20">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-olive">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-display text-3xl font-medium leading-tight text-brand-charcoal sm:text-4xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            {description}
          </p>
          {note ? (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground">{note}</p>
          ) : null}
          <Button asChild className="mt-8">
            <Link to="/shop">
              Explore the shop <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </section>
      </div>
    </main>
  );
}
