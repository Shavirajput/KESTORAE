import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ResponsivePicture } from "@/components/storefront/ResponsivePicture";
import { formatJournalDate, getJournalEntry } from "@/data/catalogue";
import { IMAGES } from "@/lib/responsive-images";

const livingRoomImage = IMAGES.roomLivingSanctuary.src;
const nordicWallHooksImage = IMAGES.nordicWallHooks.src;
const productLinenThrowImage = IMAGES.productLinenThrow.src;

type HomepageArticleConfig = {
  slug: string;
  headline: string;
  image: string;
  imageAlt: string;
};

const HOMEPAGE_ARTICLES: readonly HomepageArticleConfig[] = [
  {
    slug: "slow-living",
    headline: "The Art of Slow Living at Home",
    image: livingRoomImage,
    imageAlt: "A softly lit Scandinavian living room with warm wood furniture and natural textures",
  },
  {
    slug: "caring-for-linen",
    headline: "Caring for Natural Wood and Linen",
    image: productLinenThrowImage,
    imageAlt: "Stonewashed European flax linen draped over a solid oak bench in natural daylight",
  },
  {
    slug: "the-entryway-reset",
    headline: "Organising with Quiet Purpose",
    image: nordicWallHooksImage,
    imageAlt: "Sculpted oak entryway hooks holding a woven tote bag and natural linen scarf",
  },
];

export function JournalSection() {
  return (
    <section
      aria-labelledby="journal-heading"
      className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
            Reflections on Space
          </p>
          <h2
            id="journal-heading"
            className="mt-2.5 font-display text-3xl font-medium tracking-[-0.015em] text-brand-charcoal sm:text-4xl"
          >
            Explore the Journal
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Essays on thoughtful living, material care, and Scandinavian interior craft.
          </p>
        </div>

        <Link
          to="/journal"
          className="group inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.08em] text-brand-forest transition-colors hover:text-brand-charcoal"
        >
          Read All Articles
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {HOMEPAGE_ARTICLES.map((item) => {
          const entry = getJournalEntry(item.slug);
          if (!entry) return null;

          return (
            <article key={entry.slug} className="group flex min-w-0 flex-col">
              <Link
                to="/journal/$slug"
                params={{ slug: entry.slug }}
                className="block overflow-hidden rounded-md bg-brand-sand/50"
              >
                <ResponsivePicture
                  src={item.image}
                  alt={item.imageAlt}
                  sizes="(max-width: 767px) calc(100vw - 2rem), 410px"
                  width={640}
                  height={400}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              </Link>

              <div className="mt-4 flex items-center gap-2 font-display text-[11px] font-medium uppercase tracking-[0.1em] text-brand-olive">
                <span>{entry.category}</span>
                <span aria-hidden="true" className="text-brand-clay">
                  ·
                </span>
                <span className="text-muted-foreground">{entry.readingTime}</span>
              </div>

              <h3 className="mt-2 font-display text-lg font-medium leading-snug text-brand-charcoal">
                <Link
                  to="/journal/$slug"
                  params={{ slug: entry.slug }}
                  className="transition-colors hover:text-brand-forest"
                >
                  {item.headline}
                </Link>
              </h3>

              <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-muted-foreground">
                {entry.excerpt}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3">
                <span className="text-xs text-muted-foreground">
                  {formatJournalDate(entry.date)}
                </span>
                <Link
                  to="/journal/$slug"
                  params={{ slug: entry.slug }}
                  className="inline-flex items-center gap-1.5 font-display text-xs font-semibold text-brand-forest transition-colors hover:text-brand-charcoal"
                >
                  Read Article
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
