import type { ReactNode } from "react";

import { AddedToBagToast } from "@/components/storefront/AddedToBagToast";
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar";
import { CartProvider } from "@/components/storefront/CartContext";
import { StorefrontFooter } from "@/components/storefront/StorefrontFooter";
import { StorefrontHeader } from "@/components/storefront/StorefrontHeader";
import { WishlistProvider } from "@/components/storefront/WishlistContext";

export function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <AnnouncementBar />
          <StorefrontHeader />
          {children}
          <StorefrontFooter />
          <AddedToBagToast />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
