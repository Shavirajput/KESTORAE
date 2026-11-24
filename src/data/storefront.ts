import bedroomImage from "@/assets/bedroom.png.asset.json";
import diningImage from "@/assets/dining.png.asset.json";
import livingRoomImage from "@/assets/living-room.png.asset.json";
import storageEntrywayImage from "@/assets/storage-entryway.png.asset.json";
import workspaceImage from "@/assets/workspace.png.asset.json";

export const rooms = [
  {
    title: "Living room",
    slug: "living-room",
    description: "Comfortable spaces for slowing down.",
    image: livingRoomImage.url,
    alt: "A calm living room with natural wood furniture and soft light",
  },
  {
    title: "Bedroom",
    slug: "bedroom",
    description: "Quiet essentials for rest and reset.",
    image: bedroomImage.url,
    alt: "A softly layered bedroom in warm natural tones",
  },
  {
    title: "Dining",
    slug: "dining",
    description: "Everyday rituals, simply considered.",
    image: diningImage.url,
    alt: "A welcoming dining table arranged for an everyday meal",
  },
  {
    title: "Workspace",
    slug: "workspace",
    description: "A little more calm in the working day.",
    image: workspaceImage.url,
    alt: "A light-filled home workspace with a wooden desk",
  },
  {
    title: "Storage & entryway",
    slug: "storage-entryway",
    description: "Useful places for the things you reach for.",
    image: storageEntrywayImage.url,
    alt: "A considered entryway with practical storage and warm wood",
  },
] as const;

export const shopLinks = [
  { label: "Living Room", slug: "living-room" },
  { label: "Bedroom", slug: "bedroom" },
  { label: "Dining", slug: "dining" },
  { label: "Workspace", slug: "workspace" },
  { label: "Storage", slug: "storage" },
  { label: "New Arrivals", slug: "new-arrivals" },
  { label: "Bestsellers", slug: "bestsellers" },
] as const;