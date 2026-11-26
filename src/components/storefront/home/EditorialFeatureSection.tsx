import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ResponsivePicture } from "@/components/storefront/ResponsivePicture";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/responsive-images";

export function EditorialFeatureSection() {
  return (
    <section
      aria-labelledby="editorial-feature-heading"
      className="mx-auto max-w-[1320px] px-4 py-4 sm:px-6 lg:px-8"
    >
      <div className="overflow-hidden rounded-xl border border-border/80 bg-brand-sand/45 lg:grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-w-0 bg-brand-sand/60">
          <ResponsivePicture
            asset={IMAGES.studioMorningLight}
            alt="A sunlit Scandinavian oak dining and studio table with morning window shadows across limewash walls"
            sizes="(max-width: 1023px) calc(100vw - 2rem), 720px"
            width={1200}
            height={800}
            loading="lazy"
            pictureClassName="block lg:h-full"
            className="aspect-[16/10] w-full object-cover lg:aspect-auto lg:h-full"
          />
          <span className="absolute left-4 top-4 rounded-sm bg-brand-ivory/90 px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-charcoal backdrop-blur-xs sm:left-6 sm:top-6">
            Studio Feature
          </span>
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
            Editorial • Volume 08
          </p>
          <h2
            id="editorial-feature-heading"
            className="mt-3.5 font-display text-2xl font-medium leading-[1.2] tracking-[-0.015em] text-brand-charcoal sm:text-3xl"
          >
            In Conversation with Light: Curating Morning Rituals
          </h2>
          <blockquote className="mt-5 border-l-2 border-brand-clay pl-4 text-sm italic leading-6 text-brand-charcoal/85">
            “When daylight moves across bare oak and matte stoneware, the room itself sets a quieter
            tempo for the morning.”
          </blockquote>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            An editorial reflection on uncluttered surfaces, natural morning light, and the small
            everyday pieces that ground the first hour of the day.
          </p>
          <div className="mt-7">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-sm bg-brand-forest px-6 font-display text-xs font-medium tracking-[0.04em] text-brand-ivory hover:bg-brand-forest/90"
            >
              <Link to="/journal/$slug" params={{ slug: "slow-living" }}>
                Read the Story <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
