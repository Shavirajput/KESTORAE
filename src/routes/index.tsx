import { createFileRoute } from "@tanstack/react-router";

import { EditorialFeatureSection } from "@/components/storefront/home/EditorialFeatureSection";
import { FeaturedCollectionSection } from "@/components/storefront/home/FeaturedCollectionSection";
import { HeroSection } from "@/components/storefront/home/HeroSection";
import { JournalSection } from "@/components/storefront/home/JournalSection";
import { LifestyleGallerySection } from "@/components/storefront/home/LifestyleGallerySection";
import { PrinciplesSection } from "@/components/storefront/home/PrinciplesSection";
import { ReassuranceStrip } from "@/components/storefront/home/ReassuranceStrip";
import { ShopByRoomSection } from "@/components/storefront/home/ShopByRoomSection";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () =>
    storefrontHead({
      title: "Thoughtfully designed home essentials",
      description:
        "Discover functional, beautifully considered Scandinavian-inspired home essentials designed to bring calm, organisation, and clarity to everyday spaces.",
      path: "/",
    }),
});

function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ReassuranceStrip />
      <ShopByRoomSection />
      <FeaturedCollectionSection />
      <PrinciplesSection />
      <EditorialFeatureSection />
      <JournalSection />
      <LifestyleGallerySection />
    </main>
  );
}
