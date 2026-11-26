import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getProduct, getProductVariants, getVariantPrice, type Product } from "@/data/catalogue";
import {
  EXPRESS_DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  STANDARD_DELIVERY_FEE,
  calculateCartTotals,
  makeCartLineKey,
  type ShippingMethod,
} from "@/lib/storefront-logic";

const CART_STORAGE_KEY = "kestorae.cart.v1";
const LAST_ORDER_STORAGE_KEY = "kestorae.lastOrder.v1";

export type CartLine = {
  key: string;
  slug: string;
  variant: string;
  quantity: number;
};

export type PlacedOrderItem = {
  key: string;
  slug: string;
  name: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  image: string;
};

export type PlacedOrder = {
  orderNumber: string;
  placedAt: string;
  email: string;
  customerName: string;
  addressSummary: string;
  shippingMethod: ShippingMethod;
  items: readonly PlacedOrderItem[];
  subtotal: number;
  delivery: number;
  total: number;
};

type LastAddedItem = {
  product: Product;
  variant: string;
  quantity: number;
};

type CartContextValue = {
  lines: readonly CartLine[];
  count: number;
  subtotal: number;
  delivery: number;
  total: number;
  remainingForFreeDelivery: number;
  lastAdded: LastAddedItem | null;
  lastOrder: PlacedOrder | null;
  add: (slug: string, quantity?: number, variant?: string) => void;
  setQuantity: (keyOrSlug: string, quantity: number) => void;
  remove: (keyOrSlug: string) => void;
  clear: () => void;
  recordOrder: (order: PlacedOrder) => void;
  dismissLastAdded: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<readonly CartLine[]>([]);
  const [lastAdded, setLastAdded] = useState<LastAddedItem | null>(null);
  const [lastOrder, setLastOrder] = useState<PlacedOrder | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedLines = window.localStorage.getItem(CART_STORAGE_KEY);
      if (savedLines) {
        const parsed = JSON.parse(savedLines) as unknown;
        if (Array.isArray(parsed)) {
          const valid = parsed.filter(
            (item): item is CartLine =>
              Boolean(item) &&
              typeof item === "object" &&
              typeof (item as CartLine).key === "string" &&
              typeof (item as CartLine).slug === "string" &&
              typeof (item as CartLine).variant === "string" &&
              typeof (item as CartLine).quantity === "number" &&
              (item as CartLine).quantity > 0 &&
              Boolean(getProduct((item as CartLine).slug)),
          );
          if (valid.length > 0) setLines(valid);
        }
      }
      const savedOrder = window.localStorage.getItem(LAST_ORDER_STORAGE_KEY);
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder) as PlacedOrder;
        if (parsedOrder && typeof parsedOrder.orderNumber === "string") {
          setLastOrder(parsedOrder);
        }
      }
    } catch {
      // Ignore storage errors in restricted environments
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Ignore storage quota errors
    }
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated || !lastOrder) return;
    try {
      window.localStorage.setItem(LAST_ORDER_STORAGE_KEY, JSON.stringify(lastOrder));
    } catch {
      // Ignore storage quota errors
    }
  }, [lastOrder, hydrated]);

  const add = useCallback((slug: string, quantity = 1, variant?: string) => {
    const product = getProduct(slug);
    if (!product) return;
    const resolvedVariant = variant?.trim() || getProductVariants(product)[0]?.label || "Standard";
    const key = makeCartLineKey(slug, resolvedVariant);
    setLines((current) => {
      const existing = current.find((line) => line.key === key);
      if (existing) {
        return current.map((line) =>
          line.key === key ? { ...line, quantity: Math.min(line.quantity + quantity, 99) } : line,
        );
      }
      return [
        ...current,
        { key, slug, variant: resolvedVariant, quantity: Math.min(quantity, 99) },
      ];
    });
    setLastAdded({ product, variant: resolvedVariant, quantity });
  }, []);

  const setQuantity = useCallback((keyOrSlug: string, quantity: number) => {
    setLines((current) => {
      const matches = (line: CartLine) => line.key === keyOrSlug || line.slug === keyOrSlug;
      if (quantity <= 0) return current.filter((line) => !matches(line));
      return current.map((line) =>
        matches(line) ? { ...line, quantity: Math.min(quantity, 99) } : line,
      );
    });
  }, []);

  const remove = useCallback((keyOrSlug: string) => {
    setLines((current) =>
      current.filter((line) => line.key !== keyOrSlug && line.slug !== keyOrSlug),
    );
  }, []);

  const clear = useCallback(() => {
    setLines([]);
    setLastAdded(null);
  }, []);

  const recordOrder = useCallback((order: PlacedOrder) => {
    setLastOrder(order);
  }, []);

  const dismissLastAdded = useCallback(() => setLastAdded(null), []);

  const value = useMemo<CartContextValue>(() => {
    const priceableLines = lines
      .map((line) => {
        const product = getProduct(line.slug);
        if (!product) return null;
        return {
          unitPrice: getVariantPrice(product, line.variant),
          quantity: line.quantity,
        };
      })
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

    const totals = calculateCartTotals(priceableLines, "standard");

    return {
      lines,
      count: totals.itemCount,
      subtotal: totals.subtotal,
      delivery: totals.delivery,
      total: totals.total,
      remainingForFreeDelivery: totals.remainingForFreeDelivery,
      lastAdded,
      lastOrder,
      add,
      setQuantity,
      remove,
      clear,
      recordOrder,
      dismissLastAdded,
    };
  }, [lines, lastAdded, lastOrder, add, setQuantity, remove, clear, recordOrder, dismissLastAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}

export { FREE_DELIVERY_THRESHOLD, STANDARD_DELIVERY_FEE as DELIVERY_FEE, EXPRESS_DELIVERY_FEE };
