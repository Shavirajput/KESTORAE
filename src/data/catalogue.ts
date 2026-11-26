import { IMAGES } from "@/lib/responsive-images";

const diningImage = IMAGES.roomNordicDining.src;
const livingRoomImage = IMAGES.roomLivingSanctuary.src;
const bedroomImage = IMAGES.roomSereneBedroom.src;
const workspaceImage = IMAGES.roomQuietWorkspace.src;
const storageEntrywayImage = IMAGES.roomOakEntryway.src;
const productCeramicVaseImage = IMAGES.productCeramicVase.src;
const productOakTableImage = IMAGES.productOakTable.src;
const productLinenThrowImage = IMAGES.productLinenThrow.src;
const productStonewareSetImage = IMAGES.productStonewareSet.src;
const ceramicShelfDetailImage = IMAGES.ceramicShelfDetail.src;
const nordicWallHooksImage = IMAGES.nordicWallHooks.src;
const studioMorningLightImage = IMAGES.studioMorningLight.src;

import { rooms } from "@/data/storefront";
import { matchProductsByQuery } from "@/lib/storefront-logic";

export type ProductVariant = {
  label: string;
  swatch: string;
  priceDelta?: number;
};

export type ProductGalleryItem = {
  src: string;
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  /** GBP, illustrative */
  category:
    "Soft furnishings" | "Tableware" | "Furniture" | "Storage" | "Lighting" | "Home fragrance";
  rooms: readonly string[];
  collections: readonly string[];
  badge?: "New" | "Bestseller";
  shortDescription: string;
  description: string;
  details: readonly string[];
  materials: string;
  dimensions: string;
  care: string;
  image: string;
  imageAlt: string;
  gallery?: readonly ProductGalleryItem[];
  variants?: readonly ProductVariant[];
};

export type Collection = {
  slug: string;
  title: string;
  description: string;
  note: string;
};

export type JournalEntry = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  image: string;
  imageAlt: string;
  body: readonly string[];
  relatedProductSlugs?: readonly string[];
};

const IMAGE = {
  livingRoom: livingRoomImage,
  bedroom: bedroomImage,
  dining: diningImage,
  workspace: workspaceImage,
  storage: storageEntrywayImage,
  studio: studioMorningLightImage,
};

export const products: readonly Product[] = [
  {
    slug: "linen-throw",
    name: "Aran Linen Throw",
    price: 68,
    category: "Soft furnishings",
    rooms: ["living-room", "bedroom"],
    collections: ["new-arrivals", "bestsellers", "soft-furnishings"],
    badge: "Bestseller",
    shortDescription: "A stonewashed linen throw in warm oat, soft from the first evening.",
    description:
      "Woven from European flax and stonewashed for a lived-in softness, the Aran throw drapes easily over a sofa arm or the foot of a bed. Its open weave keeps it breathable in summer and quietly warm on cooler nights.",
    details: [
      "Stonewashed European flax linen",
      "Open weave with hand-knotted fringe",
      "Pre-washed; softens further with every wash",
    ],
    materials: "100% stonewashed European flax linen",
    dimensions: "130 × 180 cm",
    care: "Machine wash cool, line dry, warm iron if desired",
    image: productLinenThrowImage,
    imageAlt: "A stonewashed flax linen throw draped gently over a pale solid oak bench",
  },
  {
    slug: "oak-side-table",
    name: "Herra Oak Side Table",
    price: 145,
    category: "Furniture",
    rooms: ["living-room", "bedroom"],
    collections: ["bestsellers", "new-arrivals"],
    badge: "Bestseller",
    shortDescription: "A compact solid-oak side table with a quiet, rounded profile.",
    description:
      "Cut from solid oak with a soft-rounded edge and a low, stable stance, the Herra side table sits comfortably beside a sofa or bed. A single drawer keeps remotes and reading glasses within reach but out of sight.",
    details: [
      "Solid oak with hard-wax oil finish",
      "Soft-close drawer with oak front",
      "Felt-padded base protects floors",
    ],
    materials: "Solid European oak, hard-wax oil finish",
    dimensions: "W 45 × D 40 × H 52 cm",
    care: "Wipe with a dry cloth; re-oil once a year",
    image: productOakTableImage,
    imageAlt: "A solid European oak side table with softly rounded edges in a calm sunlit room",
  },
  {
    slug: "stoneware-dinner-set",
    name: "Bren Stoneware Dinner Set",
    price: 96,
    category: "Tableware",
    rooms: ["dining"],
    collections: ["bestsellers", "soft-furnishings", "tableware"],
    badge: "Bestseller",
    shortDescription: "Sixteen pieces of glazed stoneware for slow, everyday meals.",
    description:
      "The Bren set covers everyday dining for four: dinner plates, side plates, and bowls in a warm speckled glaze. Each piece is finished with a satin rim that resists chipping and stacks neatly in close quarters.",
    details: [
      "Service for four, 16 pieces",
      "Reactive speckled glaze, satin rim",
      "Dishwasher and microwave safe",
    ],
    materials: "Glazed stoneware",
    dimensions: "Dinner plate 27 cm · side plate 21 cm · bowl 15 cm",
    care: "Dishwasher safe; avoid thermal shock",
    image: productStonewareSetImage,
    imageAlt: "Stacked speckled warm sand stoneware plates and bowls on raw oatmeal linen",
  },
  {
    slug: "linen-cushion",
    name: "Mova Linen Cushion",
    price: 42,
    category: "Soft furnishings",
    rooms: ["living-room", "bedroom"],
    collections: ["new-arrivals", "soft-furnishings"],
    badge: "New",
    shortDescription: "A feather-filled cushion in washed clay linen with a piped edge.",
    description:
      "The Mova cushion pairs a washed clay-linen cover with a plump feather inner. The piped edge gives sofas and beds a finished line, and the hidden zip keeps the cover easy to refresh.",
    details: [
      "Washed linen cover with piped edge",
      "Feather and down inner included",
      "Hidden zip closure",
    ],
    materials: "Washed linen cover; feather and down inner",
    dimensions: "50 × 50 cm",
    care: "Cover machine wash cool; inner air only",
    image: IMAGE.bedroom,
    imageAlt: "A washed linen cushion resting on a softly layered bed",
  },
  {
    slug: "desk-lamp",
    name: "Lumi Task Lamp",
    price: 88,
    category: "Lighting",
    rooms: ["workspace"],
    collections: ["new-arrivals", "lighting"],
    badge: "New",
    shortDescription: "A weighted task lamp with a warm, focused pool of light.",
    description:
      "Designed for long evenings at the desk, the Lumi lamp gives a warm, focused light with a single dimmable step. The weighted base and soft-touch arm hold position without wobble.",
    details: ["Dimmable warm-white LED", "Weighted steel base", "Braided two-metre cord"],
    materials: "Powder-coated steel, brass detail",
    dimensions: "W 16 × D 34 × H 45 cm",
    care: "Wipe with a dry cloth",
    image: IMAGE.workspace,
    imageAlt: "A steel task lamp on a light-filled wooden desk",
  },
  {
    slug: "wool-rug",
    name: "Terra Wool Rug",
    price: 220,
    category: "Soft furnishings",
    rooms: ["living-room", "bedroom"],
    collections: ["soft-furnishings"],
    shortDescription: "A flat-woven wool rug in heathered sand and clay tones.",
    description:
      "Flat-woven from undyed and gently overdyed wool, the Terra rug lays flat from day one and brings quiet warmth underfoot. Its heathered sand-and-clay palette anchors a room without asking for attention.",
    details: [
      "Flat-woven wool, 8 mm pile",
      "Undyed and low-impact dyes",
      "Reusable cotton storage bag included",
    ],
    materials: "100% wool",
    dimensions: "170 × 240 cm",
    care: "Vacuum without beater bar; professional clean",
    image: IMAGE.livingRoom,
    imageAlt: "A flat-woven wool rug grounding a calm living room",
  },
  {
    slug: "ceramic-vase",
    name: "Pella Ceramic Vase",
    price: 38,
    category: "Tableware",
    rooms: ["living-room", "dining"],
    collections: ["new-arrivals", "tableware"],
    badge: "New",
    shortDescription: "A hand-glazed vase with a soft matte exterior and sealed interior.",
    description:
      "Thrown in small batches, the Pella vase carries a soft matte glaze outside and a sealed interior that holds water for fresh stems. Its narrow neck makes an easy silhouette of a few stems or branches.",
    details: [
      "Hand-thrown in small batches",
      "Matte exterior glaze, sealed interior",
      "Watertight for fresh flowers",
    ],
    materials: "Glazed ceramic",
    dimensions: "H 24 × Ø 12 cm",
    care: "Rinse by hand; not dishwasher safe",
    image: productCeramicVaseImage,
    imageAlt: "A hand-thrown matte sand stoneware vase holding a dried branch on pale oak",
  },
  {
    slug: "storage-bench",
    name: "Koln Storage Bench",
    price: 185,
    category: "Storage",
    rooms: ["storage-entryway", "bedroom"],
    collections: ["storage"],
    shortDescription: "An entryway bench with a lift-up seat and shoe shelf below.",
    description:
      "The Koln bench tidies the threshold of the home: a lift-up seat for scarves and bags, an open shelf for the shoes in daily rotation, and a solid top that doubles as a spot to sit while lacing up.",
    details: [
      "Lift-up seat with safety stay",
      "Open lower shelf for daily shoes",
      "Assembles in under 20 minutes",
    ],
    materials: "Solid oak and oak veneer",
    dimensions: "W 90 × D 35 × H 48 cm",
    care: "Wipe with a dry cloth",
    image: IMAGE.storage,
    imageAlt: "An entryway bench with practical storage and warm wood",
  },
  {
    slug: "wall-shelf",
    name: "Sten Wall Shelf",
    price: 54,
    category: "Storage",
    rooms: ["storage-entryway", "workspace"],
    collections: ["storage"],
    shortDescription: "A slim solid-ash wall shelf with hidden fixings.",
    description:
      "The Sten shelf keeps everyday essentials in reach without claiming floor space. Hidden keyhole fixings let it hang flush, and the slim ash profile suits hallways, desks, and above the bed alike.",
    details: [
      "Hidden keyhole fixings included",
      "Solid ash with clear matte lacquer",
      "Holds up to 8 kg when fixed well",
    ],
    materials: "Solid ash, matte lacquer",
    dimensions: "W 60 × D 12 × H 4 cm",
    care: "Wipe with a dry cloth",
    image: ceramicShelfDetailImage,
    imageAlt: "A slim wooden wall shelf holding small everyday objects",
  },
  {
    slug: "candle",
    name: "Ember Soy Candle",
    price: 26,
    category: "Home fragrance",
    rooms: ["living-room", "bedroom"],
    collections: ["bestsellers", "new-arrivals"],
    shortDescription: "A slow-burning soy candle with cedar, fig leaf, and warm amber.",
    description:
      "Hand-poured in small batches, the Ember candle burns slowly and evenly for around forty hours. Cedar and fig leaf open it; a base of warm amber keeps rooms feeling settled rather than perfumed.",
    details: ["Approx. 40-hour burn time", "Cotton wick, soy wax blend", "Reusable glass vessel"],
    materials: "Soy wax blend, cotton wick",
    dimensions: "Ø 8 × H 10 cm",
    care: "Trim wick to 5 mm before each burn",
    image: IMAGE.livingRoom,
    imageAlt: "A lit soy candle on a coffee table in evening light",
  },
  {
    slug: "serving-board",
    name: "Isla Serving Board",
    price: 34,
    category: "Tableware",
    rooms: ["dining"],
    collections: ["tableware"],
    shortDescription: "An oiled oak serving board with a leather hanging loop.",
    description:
      "Cut from a single piece of oiled oak, the Isla board moves from kitchen counter to table without ceremony. A brass-fitting leather loop hangs it neatly between uses.",
    details: ["Cut from a single oak piece", "Food-safe oil finish", "Leather hanging loop"],
    materials: "Oiled oak, vegetable-tanned leather",
    dimensions: "L 45 × W 20 × H 1.5 cm",
    care: "Hand wash; re-oil monthly",
    image: IMAGE.dining,
    imageAlt: "An oiled oak serving board styled with bread and cheese",
  },
  {
    slug: "desk-organiser",
    name: "Rill Desk Organiser",
    price: 46,
    category: "Storage",
    rooms: ["workspace"],
    collections: ["storage"],
    shortDescription: "A tiered oak organiser that keeps the desk surface clear.",
    description:
      "The Rill organiser lifts the things that clutter a working day into a tidy tier: pens and tools up top, papers below, and a felt-lined tray for the small items that go missing.",
    details: [
      "Two tiers with felt-lined tray",
      "Solid oak with matte finish",
      "Flat-packs for storage",
    ],
    materials: "Solid oak, wool felt",
    dimensions: "W 28 × D 18 × H 14 cm",
    care: "Wipe with a dry cloth",
    image: IMAGE.workspace,
    imageAlt: "A tiered oak desk organiser on a tidy wooden desk",
  },
  {
    slug: "bedside-lamp",
    name: "Noor Bedside Lamp",
    price: 72,
    category: "Lighting",
    rooms: ["bedroom", "living-room"],
    collections: ["lighting"],
    shortDescription: "A soft-glow bedside lamp with a linen shade and touch dimmer.",
    description:
      "Made for the last hour of the day, the Noor lamp gives a warm, low glow through a washed linen shade. A three-step touch dimmer sits on the base, so adjusting the light never breaks the quiet.",
    details: [
      "Three-step touch dimmer",
      "Washed linen shade",
      "Warm-white replaceable LED included",
    ],
    materials: "Ceramic base, washed linen shade",
    dimensions: "Ø 18 × H 32 cm",
    care: "Dust shade with a soft brush",
    image: IMAGE.bedroom,
    imageAlt: "A bedside lamp with a linen shade glowing softly in a bedroom",
  },
  {
    slug: "duvet-set",
    name: "Vela Duvet Set",
    price: 110,
    category: "Soft furnishings",
    rooms: ["bedroom"],
    collections: ["soft-furnishings", "bestsellers"],
    shortDescription: "A crisp percale duvet set in warm ivory with co-ordinating shams.",
    description:
      "Woven from long-staple cotton percale and finished in warm ivory, the Vela set brings hotel-crisp freshness to the bedroom. The duvet cover closes with hidden ties and a row of corozo buttons.",
    details: [
      "Long-staple cotton percale, 200 TC",
      "Corozo button closure and inner ties",
      "Two pillowcases included",
    ],
    materials: "100% cotton percale",
    dimensions: "Fits 200 × 200 cm duvets",
    care: "Machine wash warm, line dry",
    image: IMAGE.bedroom,
    imageAlt: "A crisp ivory percale duvet set on a neatly made bed",
  },
  {
    slug: "coat-hook",
    name: "Fjell Coat Hook",
    price: 22,
    category: "Storage",
    rooms: ["storage-entryway"],
    collections: ["storage"],
    shortDescription: "A solid-oak wall hook with a gentle curve and hidden fixing.",
    description:
      "The Fjell hook is a single piece of solid oak, steam-bent into a gentle curve that holds coats and totes without snagging. One hidden fixing keeps the wall line clean.",
    details: ["Steam-bent solid oak", "Hidden wall fixing included", "Holds up to 5 kg"],
    materials: "Solid oak, hard-wax oil",
    dimensions: "W 8 × D 7 × H 10 cm",
    care: "Wipe with a dry cloth",
    image: nordicWallHooksImage,
    imageAlt: "A curved oak wall hook holding a woven tote",
  },
  {
    slug: "plant-pot",
    name: "Vela Terracotta Pot",
    price: 28,
    category: "Home fragrance",
    rooms: ["living-room", "workspace"],
    collections: ["tableware", "new-arrivals"],
    shortDescription: "A hand-finished terracotta pot with a drainage tray.",
    description:
      "Hand-finished with a raw exterior and smooth rim, the Vela pot suits both leafy plants and structural succulents. A matching drainage tray keeps shelves and sills dry.",
    details: [
      "Raw terracotta breathes with roots",
      "Matching drainage tray included",
      "Fits nursery pots up to 14 cm",
    ],
    materials: "Terracotta",
    dimensions: "Ø 15 × H 14 cm",
    care: "Indoor use; wipe tray after watering",
    image: IMAGE.workspace,
    imageAlt: "A terracotta plant pot on a windowsill",
  },
];

export const collections: readonly Collection[] = [
  {
    slug: "new-arrivals",
    title: "New Arrivals",
    description: "The latest pieces to join the Kestorae edit — quiet additions, chosen slowly.",
    note: "Refreshed as new pieces complete their testing at the fictional Kestorae studio.",
  },
  {
    slug: "bestsellers",
    title: "Bestsellers",
    description: "The pieces Kestorae visitors return to most often, season after season.",
    note: "Ranking is illustrative and refreshed with each catalogue update.",
  },
  {
    slug: "soft-furnishings",
    title: "Soft Furnishings",
    description: "Throws, cushions, rugs, and bedding in washed linen and warm wool.",
    note: "Every textile is chosen for how it feels after the hundredth wash.",
  },
  {
    slug: "tableware",
    title: "Tableware",
    description: "Glazed stoneware, oiled oak, and small-batch ceramics for everyday rituals.",
    note: "Dishwasher-friendly where possible; details are listed on each piece.",
  },
  {
    slug: "lighting",
    title: "Lighting",
    description: "Warm, considered light for desks, bedsides, and reading corners.",
    note: "Each lamp is tested for the light it gives, not just the look it makes.",
  },
  {
    slug: "storage",
    title: "Storage & Entryway",
    description: "Benches, shelves, and hooks that give everyday things a proper home.",
    note: "Storage that earns its place by being easy to live with.",
  },
];

export const journalEntries: readonly JournalEntry[] = [
  {
    slug: "slow-living",
    title: "Slow Living Begins at Home",
    excerpt:
      "Why the objects we reach for every day shape the pace of our lives — and how to choose them well.",
    date: "2026-11-18",
    readingTime: "4 min read",
    category: "Philosophy",
    image: livingRoomImage,
    imageAlt: "A calm living room with natural wood furniture and soft light",
    relatedProductSlugs: ["linen-throw", "oak-side-table", "ceramic-vase"],
    body: [
      "There is a quiet test for the things we live with: not whether they impress, but whether they help. A chair that invites you to sit a little longer. A lamp that makes evening reading feel like a small occasion. A throw that ends up on every sofa in the house because it is the one everyone reaches for.",
      "Slow living is often photographed as candlelight and unhurried breakfasts, but at home it begins somewhere plainer — with objects that work so easily they stop asking for attention. The linen throw that folds itself back into shape. The side table that holds exactly what needs holding.",
      "Choosing this way is simpler than it sounds. Prefer fewer, better things. Ask what a piece will be doing on an ordinary Tuesday, not a perfect Sunday. Give every daily object a place to rest, so tidying becomes a gesture rather than a project.",
      "None of this requires a renovation or a budget. It asks only that when something in the home works well, you notice it — and let that noticing teach you what to choose next.",
    ],
  },
  {
    slug: "the-entryway-reset",
    title: "The Five-Minute Entryway Reset",
    excerpt:
      "A small weekly ritual that keeps the threshold of your home calm, whatever the week has been.",
    date: "2026-11-04",
    readingTime: "3 min read",
    category: "How to",
    image: storageEntrywayImage,
    imageAlt: "A considered entryway with practical storage and warm wood",
    relatedProductSlugs: ["storage-bench", "coat-hook", "wall-shelf"],
    body: [
      "The entryway is the first room you meet and the last one you tidy, which is why it drifts. The fix is not more storage — it is a short, repeatable reset that takes five minutes once a week.",
      "Start by emptying the surfaces completely. Return everything that belongs elsewhere, then put back only what genuinely serves the threshold: the keys bowl, the bag hook, the shoes in actual rotation. Everything else finds a home further inside.",
      "Next, clear the floor. If shoes outnumber the household, the overflow is telling you the shoe shelf is in the wrong place, or the wrong season's shoes never left. Rotate seasonally rather than adding capacity.",
      "Finally, set the stage for tomorrow. Hang tomorrow's coat, clear the path to the door, and leave one surface completely empty. An entryway with room to land makes coming home feel like arriving.",
    ],
  },
  {
    slug: "caring-for-linen",
    title: "Caring for Linen, Simply",
    excerpt:
      "Linen rewards the lightest of touches. A short guide to washing, drying, and softening it well.",
    date: "2026-10-21",
    readingTime: "5 min read",
    category: "Care guides",
    image: bedroomImage,
    imageAlt: "A softly layered bedroom in warm natural tones",
    relatedProductSlugs: ["linen-throw", "linen-cushion", "duvet-set"],
    body: [
      "Linen is one of the few materials that improves with neglect. Wash it cool, skip the softener, and let it wrinkle — the creases are the character, and pressing them away is a choice, not a duty.",
      "Wash separately for the first few cycles at 30 degrees with a mild detergent. Fabric softener coats the flax fibres and works against the very softness you are cultivating, so leave it on the shelf.",
      "Line drying is kindest, and the outdoors does half the work of freshening. If you tumble dry, choose low heat and pull the pieces while still slightly damp; the final moisture disappears in minutes on the bed or the sofa arm.",
      "Stains respond better to patience than force: cool water, a little detergent, and time. With washing and use, stonewashed linen keeps softening until the throw you bought becomes the throw you cannot do without.",
    ],
  },
];

const DEFAULT_VARIANTS_BY_CATEGORY: Record<Product["category"], readonly ProductVariant[]> = {
  "Soft furnishings": [
    { label: "Warm Oat", swatch: "#E7DFD2" },
    { label: "Clay Taupe", swatch: "#B79F86" },
    { label: "Sage Olive", swatch: "#6B7F5D" },
  ],
  Furniture: [
    { label: "Natural Oiled Oak", swatch: "#C8A986" },
    { label: "Smoked Oak", swatch: "#6E5847", priceDelta: 15 },
  ],
  Tableware: [
    { label: "Speckled Sand", swatch: "#E7DFD2" },
    { label: "Raw Clay", swatch: "#B79F86" },
    { label: "Forest Glaze", swatch: "#2F4A3B" },
  ],
  Storage: [
    { label: "Natural Oak", swatch: "#C8A986" },
    { label: "Pale Ash", swatch: "#DFD3C3" },
  ],
  Lighting: [
    { label: "Warm Ivory", swatch: "#FAF8F4" },
    { label: "Matte Charcoal", swatch: "#2B2B2B" },
    { label: "Mist Blue", swatch: "#8FA8B8" },
  ],
  "Home fragrance": [
    { label: "Cedar & Fig", swatch: "#6B7F5D" },
    { label: "Warm Amber", swatch: "#D4A656" },
  ],
};

const ROOM_IMAGE_MAP: Record<string, { src: string; alt: string }> = {
  "living-room": {
    src: IMAGE.livingRoom,
    alt: "Styled in a sunlit Scandinavian living room",
  },
  bedroom: {
    src: IMAGE.bedroom,
    alt: "Styled in a calm neutral bedroom sanctuary",
  },
  dining: {
    src: IMAGE.dining,
    alt: "Styled around an everyday Nordic oak dining table",
  },
  workspace: {
    src: IMAGE.workspace,
    alt: "Styled in a quiet daylight home workspace",
  },
  "storage-entryway": {
    src: IMAGE.storage,
    alt: "Styled in an organised natural oak entryway",
  },
};

export function getProductVariants(product: Product): readonly ProductVariant[] {
  return product.variants ?? DEFAULT_VARIANTS_BY_CATEGORY[product.category];
}

export function getVariantPrice(product: Product, variantLabel?: string): number {
  if (!variantLabel) return product.price;
  const variant = getProductVariants(product).find((v) => v.label === variantLabel);
  return product.price + (variant?.priceDelta ?? 0);
}

export function getProductGallery(product: Product): readonly ProductGalleryItem[] {
  if (product.gallery?.length) return product.gallery;
  const items: ProductGalleryItem[] = [{ src: product.image, alt: product.imageAlt }];
  const seen = new Set<string>([product.image]);

  for (const roomSlug of product.rooms) {
    const roomImg = ROOM_IMAGE_MAP[roomSlug];
    if (roomImg && !seen.has(roomImg.src)) {
      seen.add(roomImg.src);
      items.push({ src: roomImg.src, alt: `${product.name} — ${roomImg.alt.toLowerCase()}` });
    }
  }

  const studioFallbacks: ProductGalleryItem[] = [
    {
      src: IMAGE.studio,
      alt: `${product.name} — styled in morning studio daylight`,
    },
    {
      src: ceramicShelfDetailImage,
      alt: `${product.name} — paired with tactile studio materials`,
    },
  ];

  for (const fallback of studioFallbacks) {
    if (items.length >= 3) break;
    if (!seen.has(fallback.src)) {
      seen.add(fallback.src);
      items.push(fallback);
    }
  }

  return items;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRoom(slug: string) {
  return rooms.find((room) => room.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getJournalEntry(slug: string) {
  return journalEntries.find((entry) => entry.slug === slug);
}

export function getProductsForRoom(slug: string) {
  return products.filter((product) => product.rooms.includes(slug));
}

export function getProductsForCollection(slug: string) {
  return products.filter((product) => product.collections.includes(slug));
}

export function searchProducts(term: string) {
  return matchProductsByQuery(products, term);
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(amount);
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function formatJournalDate(isoDate: string) {
  const parts = isoDate.split("-");
  const year = Number(parts[0]);
  const monthIndex = Number(parts[1]) - 1;
  const day = Number(parts[2]);
  const month = MONTHS[monthIndex];
  if (!Number.isFinite(year) || !Number.isFinite(day) || !month) {
    return isoDate;
  }
  return `${day} ${month} ${year}`;
}
