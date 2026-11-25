import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

import heroLivingRoomImage from "@/assets/images/hero_scandinavian_living_1795588634148.jpg";
import { Button } from "@/components/ui/button";
import { formatPrice, getProduct } from "@/data/catalogue";

const HERO_HIGHLIGHTS = [
  "Thoughtful Materials",
  "Functional Design",
  "Considered Quality",
] as const;

export function HeroSection() {
  const featuredPiece = getProduct("oak-side-table");

  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto grid max-w-[1320px] items-center gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-8 lg:py-20"
    >
      <div className="min-w-0 max-w-xl">
        <p className="inline-flex items-center gap-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-forest">
          <span aria-hidden="true" className="h-px w-6 bg-brand-forest" />
          New Autumn Capsule
        </p>
        <h1
          id="hero-heading"
          className="mt-4 font-display text-[2.15rem] font-medium leading-[1.12] tracking-[-0.02em] text-brand-charcoal sm:text-5xl lg:text-[3.35rem]"
        >
          Make Room for Considered Living.
        </h1>
        <p className="mt-5 max-w-[46ch] text-[15px] leading-7 text-muted-foreground sm:mt-6 sm:text-base">
          Discover functional, beautifully considered home essentials designed to bring a little
          more calm, organisation and clarity to everyday spaces.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
          <Button
            asChild
            size="lg"
            className="h-11 w-full justify-center rounded-sm bg-brand-forest px-6 font-display text-xs font-medium tracking-[0.04em] text-brand-ivory shadow-xs transition-colors hover:bg-brand-forest/90 sm:w-auto"
          >
            <Link to="/shop">
              Shop Essentials <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-11 w-full justify-center rounded-sm border-brand-forest/40 bg-transparent px-6 font-display text-xs font-medium tracking-[0.04em] text-brand-forest transition-colors hover:border-brand-forest hover:bg-brand-forest/10 hover:text-brand-forest sm:w-auto"
          >
            <a href="#rooms">
              Explore by Room <ArrowDown aria-hidden="true" className="size-4" />
            </a>
          </Button>
        </div>

        <ul
          aria-label="Brand highlights"
          className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5 border-t border-border/80 pt-5 sm:mt-10 sm:grid sm:max-w-lg sm:grid-cols-3 sm:gap-4"
        >
          {HERO_HIGHLIGHTS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-xs font-medium text-brand-charcoal/85"
            >
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-brand-forest" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <figure className="relative min-w-0">
        <div className="overflow-hidden rounded-lg bg-brand-sand/50 shadow-sm ring-1 ring-border/50">
          <img
            src={heroLivingRoomImage}
            alt="A sunlit Scandinavian living room with a low oatmeal bouclé sofa, solid pale oak tables, matte stoneware vase, and warm limewash walls"
            width="1200"
            height="900"
            fetchPriority="high"
            className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
          />
        </div>

        {featuredPiece ? (
          <figcaption className="mt-3 sm:absolute sm:bottom-5 sm:left-5 sm:mt-0 sm:max-w-[18.5rem]">
            <Link
              to="/products/$slug"
              params={{ slug: featuredPiece.slug }}
              className="group flex items-center gap-3.5 rounded-md border border-border/80 bg-brand-ivory/95 p-3 shadow-md backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none"
            >
              <div className="size-14 shrink-0 overflow-hidden rounded-sm bg-brand-sand/50">
                <img
                  src={featuredPiece.image}
                  alt={featuredPiece.imageAlt}
                  width="112"
                  height="112"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-olive">
                  Featured Piece
                </p>
                <p className="mt-0.5 truncate font-display text-xs font-medium text-brand-charcoal">
                  {featuredPiece.name}
                </p>
                <p className="mt-1 text-xs font-semibold tabular-nums text-brand-forest">
                  {formatPrice(featuredPiece.price)}
                </p>
              </div>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-brand-forest/25 text-brand-forest transition-colors group-hover:border-brand-forest group-hover:bg-brand-forest group-hover:text-brand-ivory">
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </span>
            </Link>
          </figcaption>
        ) : null}
      </figure>
    </section>
  );
}
