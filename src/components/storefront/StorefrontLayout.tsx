import type { ReactNode } from "react";

import { AddedToBagToast } from "@/components/storefront/AddedToBagToast";
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar";
import { BackToTopButton } from "@/components/storefront/BackToTopButton";
import { CartProvider } from "@/components/storefront/CartContext";
import { StorefrontFooter } from "@/components/storefront/StorefrontFooter";
import { StorefrontHeader } from "@/components/storefront/StorefrontHeader";
import { WishlistProvider } from "@/components/storefront/WishlistContext";

export function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-brand-forest focus:px-4 focus:py-2 focus:font-display focus:text-xs focus:font-medium focus:text-brand-ivory focus:shadow-md"
          >
            Skip to main content
          </a>
          <AnnouncementBar />
          <StorefrontHeader />
          <div id="main-content" className="flex flex-1 flex-col">
            {children}
          </div>
          <StorefrontFooter />
          <BackToTopButton />
          <AddedToBagToast />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
