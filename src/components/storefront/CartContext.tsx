import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { getProduct, type Product } from "@/data/catalogue";

export type CartLine = {
  slug: string;
  quantity: number;
};

type CartContextValue = {
  lines: readonly CartLine[];
  count: number;
  subtotal: number;
  delivery: number;
  total: number;
  lastAdded: Product | null;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  dismissLastAdded: () => void;
};

const FREE_DELIVERY_THRESHOLD = 120;
const DELIVERY_FEE = 4.95;

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<readonly CartLine[]>([]);
  const [lastAdded, setLastAdded] = useState<Product | null>(null);

  const add = useCallback((slug: string, quantity = 1) => {
    const product = getProduct(slug);
    if (!product) return;
    setLines((current) => {
      const existing = current.find((line) => line.slug === slug);
      if (existing) {
        return current.map((line) =>
          line.slug === slug ? { ...line, quantity: Math.min(line.quantity + quantity, 99) } : line,
        );
      }
      return [...current, { slug, quantity: Math.min(quantity, 99) }];
    });
    setLastAdded(product);
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setLines((current) => {
      if (quantity <= 0) return current.filter((line) => line.slug !== slug);
      return current.map((line) =>
        line.slug === slug ? { ...line, quantity: Math.min(quantity, 99) } : line,
      );
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((current) => current.filter((line) => line.slug !== slug));
  }, []);

  const clear = useCallback(() => {
    setLines([]);
    setLastAdded(null);
  }, []);

  const dismissLastAdded = useCallback(() => setLastAdded(null), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = lines.reduce((sum, line) => {
      const product = getProduct(line.slug);
      return product ? sum + product.price * line.quantity : sum;
    }, 0);
    const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
    return {
      lines,
      count,
      subtotal,
      delivery,
      total: subtotal + delivery,
      lastAdded,
      add,
      setQuantity,
      remove,
      clear,
      dismissLastAdded,
    };
  }, [lines, lastAdded, add, setQuantity, remove, clear, dismissLastAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}

export { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE };
