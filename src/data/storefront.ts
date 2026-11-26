import { IMAGES } from "@/lib/responsive-images";

const bedroomImage = IMAGES.roomSereneBedroom.src;
const diningImage = IMAGES.roomNordicDining.src;
const livingRoomImage = IMAGES.roomLivingSanctuary.src;
const storageEntrywayImage = IMAGES.roomOakEntryway.src;
const workspaceImage = IMAGES.roomQuietWorkspace.src;

export const rooms = [
  {
    title: "Living Room",
    slug: "living-room",
    description: "Comfortable spaces for slowing down.",
    editorialNote:
      "Anchor the room with low timber forms, stonewashed flax throws, and warm ambient light that softens as dusk settles.",
    materialsFocus: "Oiled European oak · Stonewashed flax · Flat-woven wool",
    image: livingRoomImage,
    alt: "A calm living room with natural wood furniture and soft light",
  },
  {
    title: "Bedroom",
    slug: "bedroom",
    description: "Quiet essentials for rest and reset.",
    editorialNote:
      "Breathable cotton percale, muted clay linens, and soft touch-dimmed lighting create a calm threshold at the end of the day.",
    materialsFocus: "Long-staple percale · Washed clay linen · Matte ceramic",
    image: bedroomImage,
    alt: "A softly layered bedroom in warm natural tones",
  },
  {
    title: "Dining",
    slug: "dining",
    description: "Everyday rituals, simply considered.",
    editorialNote:
      "Stackable speckled stoneware, oiled oak serving boards, and hand-glazed vessels elevate weeknight suppers without ceremony.",
    materialsFocus: "Reactive stoneware · Single-piece oiled oak · Raw linen",
    image: diningImage,
    alt: "A welcoming dining table arranged for an everyday meal",
  },
  {
    title: "Workspace",
    slug: "workspace",
    description: "A little more calm in the working day.",
    editorialNote:
      "Focused task lighting and tiered solid-oak organisation clear visual noise from the desk so attention stays where it belongs.",
    materialsFocus: "Powder-coated steel · Solid oak · Wool felt",
    image: workspaceImage,
    alt: "A light-filled home workspace with a wooden desk",
  },
  {
    title: "Storage & Entryway",
    slug: "storage-entryway",
    description: "Useful places for the things you reach for.",
    editorialNote:
      "Steam-bent hooks, slim floating shelves, and generous benches give daily coats, bags, and shoes a considered resting place.",
    materialsFocus: "Solid ash · Steam-bent oak · Concealed hardware",
    image: storageEntrywayImage,
    alt: "A considered entryway with practical storage and warm wood",
  },
] as const;

export const shopLinks = [
  { label: "Living Room", slug: "living-room", kind: "room" },
  { label: "Bedroom", slug: "bedroom", kind: "room" },
  { label: "Dining", slug: "dining", kind: "room" },
  { label: "Workspace", slug: "workspace", kind: "room" },
  { label: "Storage", slug: "storage", kind: "collection" },
  { label: "New Arrivals", slug: "new-arrivals", kind: "collection" },
  { label: "Bestsellers", slug: "bestsellers", kind: "collection" },
] as const;
