import { createFileRoute } from "@tanstack/react-router";

import { EditorialFeatureSection } from "@/components/storefront/home/EditorialFeatureSection";
import { FeaturedCollectionSection } from "@/components/storefront/home/FeaturedCollectionSection";
import { HeroSection } from "@/components/storefront/home/HeroSection";
import { JournalSection } from "@/components/storefront/home/JournalSection";
import { LifestyleGallerySection } from "@/components/storefront/home/LifestyleGallerySection";
import { PrinciplesSection } from "@/components/storefront/home/PrinciplesSection";
import { ReassuranceStrip } from "@/components/storefront/home/ReassuranceStrip";
import { ShopByRoomSection } from "@/components/storefront/home/ShopByRoomSection";
import { HERO_IMAGE_SIZES, IMAGES } from "@/lib/responsive-images";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => {
    const base = storefrontHead({
      title: "Thoughtfully designed home essentials",
      description:
        "Discover functional, beautifully considered Scandinavian-inspired home essentials designed to bring calm, organisation, and clarity to everyday spaces.",
      path: "/",
    });

    return {
      ...base,
      links: [
        ...base.links,
        {
          rel: "preload",
          as: "image",
          type: "image/avif",
          imageSrcSet: IMAGES.heroLivingRoom.avifSrcSet,
          imageSizes: HERO_IMAGE_SIZES,
          fetchPriority: "high",
        },
      ],
    };
  },
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
