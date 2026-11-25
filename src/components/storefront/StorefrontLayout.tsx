import type { ReactNode } from "react";

import { AnnouncementBar } from "@/components/storefront/AnnouncementBar";
import { CartProvider } from "@/components/storefront/CartContext";
import { StorefrontFooter } from "@/components/storefront/StorefrontFooter";
import { StorefrontHeader } from "@/components/storefront/StorefrontHeader";

export function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <AnnouncementBar />
        <StorefrontHeader />
        {children}
        <StorefrontFooter />
      </div>
    </CartProvider>
  );
}
