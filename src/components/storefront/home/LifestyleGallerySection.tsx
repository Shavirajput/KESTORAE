import { Link } from "@tanstack/react-router";

import { ResponsivePicture } from "@/components/storefront/ResponsivePicture";
import { IMAGES } from "@/lib/responsive-images";

const bedroomImage = IMAGES.roomSereneBedroom.src;
const livingRoomImage = IMAGES.roomLivingSanctuary.src;
const ceramicShelfDetailImage = IMAGES.ceramicShelfDetail.src;
const nordicWallHooksImage = IMAGES.nordicWallHooks.src;
const productCeramicVaseImage = IMAGES.productCeramicVase.src;
const productStonewareSetImage = IMAGES.productStonewareSet.src;

type GalleryTile =
  | {
      id: string;
      label: string;
      image: string;
      alt: string;
      kind: "room";
      slug: string;
    }
  | {
      id: string;
      label: string;
      image: string;
      alt: string;
      kind: "product";
      slug: string;
    };

const GALLERY_TILES: readonly GalleryTile[] = [
  {
    id: "living-room-styling",
    label: "Living Room Styling",
    image: livingRoomImage,
    alt: "Calm Scandinavian living room styled with natural oak furniture and linen upholstery",
    kind: "room",
    slug: "living-room",
  },
  {
    id: "ceramic-objects",
    label: "Ceramic Objects",
    image: ceramicShelfDetailImage,
    alt: "Floating ash shelf arranged with matte stoneware vessels, beeswax candle, and linen notebook",
    kind: "product",
    slug: "wall-shelf",
  },
  {
    id: "bedroom-textiles",
    label: "Bedroom Textiles",
    image: bedroomImage,
    alt: "Softly layered neutral linen bedding and warm oak accents in a quiet bedroom",
    kind: "room",
    slug: "bedroom",
  },
  {
    id: "dining-table-styling",
    label: "Dining Table Styling",
    image: productStonewareSetImage,
    alt: "Speckled sand stoneware plates and bowls stacked on natural oatmeal linen",
    kind: "product",
    slug: "stoneware-dinner-set",
  },
  {
    id: "wall-accessories",
    label: "Wall Accessories",
    image: nordicWallHooksImage,
    alt: "Curved solid oak wall hooks holding a woven canvas tote and stonewashed scarf",
    kind: "product",
    slug: "coat-hook",
  },
  {
    id: "natural-home-details",
    label: "Natural Home Details",
    image: productCeramicVaseImage,
    alt: "Hand-thrown matte ceramic vase holding a single dried branch in morning light",
    kind: "product",
    slug: "ceramic-vase",
  },
];

export function LifestyleGallerySection() {
  return (
    <section
      aria-labelledby="lifestyle-gallery-heading"
      className="border-t border-border/70 bg-card/45 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
              Kestorae Living
            </p>
            <h2
              id="lifestyle-gallery-heading"
              className="mt-2 font-display text-2xl font-medium tracking-[-0.015em] text-brand-charcoal sm:text-3xl"
            >
              In Everyday Spaces
            </h2>
          </div>

          <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
            Tag your home with <span className="font-medium text-brand-forest">@kestorae</span> to
            be featured.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {GALLERY_TILES.map((tile) => {
            const tileContent = (
              <>
                <ResponsivePicture
                  src={tile.image}
                  alt={tile.alt}
                  sizes="(max-width: 639px) calc(50vw - 1.5rem), (max-width: 1023px) calc(33vw - 2rem), 210px"
                  width={420}
                  height={420}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="absolute inset-x-2.5 bottom-2.5 translate-y-1 font-display text-[10px] font-medium uppercase tracking-[0.1em] text-brand-ivory opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none">
                  {tile.label}
                </span>
              </>
            );

            return tile.kind === "room" ? (
              <Link
                key={tile.id}
                to="/rooms/$slug"
                params={{ slug: tile.slug }}
                aria-label={tile.label}
                className="group relative block overflow-hidden rounded-md bg-brand-sand/50"
              >
                {tileContent}
              </Link>
            ) : (
              <Link
                key={tile.id}
                to="/products/$slug"
                params={{ slug: tile.slug }}
                aria-label={tile.label}
                className="group relative block overflow-hidden rounded-md bg-brand-sand/50"
              >
                {tileContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
