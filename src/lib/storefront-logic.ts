export const FREE_DELIVERY_THRESHOLD = 120;
export const STANDARD_DELIVERY_FEE = 4.95;
export const EXPRESS_DELIVERY_FEE = 9.95;

export type ShippingMethod = "standard" | "express";

export type PriceableLine = {
  unitPrice: number;
  quantity: number;
};

export type CartTotals = {
  itemCount: number;
  subtotal: number;
  standardDelivery: number;
  delivery: number;
  total: number;
  remainingForFreeDelivery: number;
};

export function makeCartLineKey(slug: string, variant?: string): string {
  const normalized = variant?.trim();
  return normalized ? `${slug}::${normalized}` : slug;
}

export function calculateCartTotals(
  lines: readonly PriceableLine[],
  shippingMethod: ShippingMethod = "standard",
): CartTotals {
  const itemCount = lines.reduce((sum, line) => sum + Math.max(0, line.quantity), 0);
  const rawSubtotal = lines.reduce(
    (sum, line) => sum + Math.max(0, line.unitPrice) * Math.max(0, line.quantity),
    0,
  );
  const subtotal = Math.round(rawSubtotal * 100) / 100;
  const standardDelivery =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
  const delivery =
    subtotal === 0 ? 0 : shippingMethod === "express" ? EXPRESS_DELIVERY_FEE : standardDelivery;
  const total = Math.round((subtotal + delivery) * 100) / 100;
  const remainingForFreeDelivery =
    subtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : Math.round((FREE_DELIVERY_THRESHOLD - subtotal) * 100) / 100;

  return {
    itemCount,
    subtotal,
    standardDelivery,
    delivery,
    total,
    remainingForFreeDelivery,
  };
}

export type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

export type FilterableProduct = {
  slug: string;
  name: string;
  price: number;
  category: string;
  rooms: readonly string[];
  collections: readonly string[];
  shortDescription: string;
  description: string;
  materials: string;
  badge?: string;
};

export type ProductFilterCriteria = {
  room?: string | null;
  categories?: readonly string[];
  maxPrice?: number | null;
  sort?: SortOption;
};

export function filterAndSortProducts<T extends FilterableProduct>(
  items: readonly T[],
  criteria: ProductFilterCriteria,
): T[] {
  const { room, categories = [], maxPrice, sort = "featured" } = criteria;

  const filtered = items.filter((item) => {
    if (room && !item.rooms.includes(room)) return false;
    if (categories.length > 0 && !categories.includes(item.category)) return false;
    if (typeof maxPrice === "number" && Number.isFinite(maxPrice) && item.price > maxPrice) {
      return false;
    }
    return true;
  });

  if (sort === "featured") return filtered;

  return [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price || a.name.localeCompare(b.name);
    if (sort === "price-desc") return b.price - a.price || a.name.localeCompare(b.name);
    return a.name.localeCompare(b.name);
  });
}

export function matchProductsByQuery<T extends FilterableProduct>(
  items: readonly T[],
  query: string,
): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  return items.filter((product) => {
    const haystack = [
      product.name,
      product.shortDescription,
      product.description,
      product.materials,
      product.category,
      ...product.rooms,
      ...product.collections,
    ]
      .join(" ")
      .toLowerCase();
    return tokens.every((token) => haystack.includes(token));
  });
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

export type CheckoutFormValues = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postcode: string;
};

export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormValues, string>>;

export function validateCheckoutForm(values: CheckoutFormValues): CheckoutFormErrors {
  const errors: CheckoutFormErrors = {};

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.firstName.trim()) {
    errors.firstName = "Please enter your first name.";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Please enter your last name.";
  }

  if (!values.address.trim() || values.address.trim().length < 5) {
    errors.address = "Please enter a full street address.";
  }

  if (!values.city.trim()) {
    errors.city = "Please enter your town or city.";
  }

  if (!values.postcode.trim() || values.postcode.trim().length < 3) {
    errors.postcode = "Please enter a valid postcode.";
  }

  return errors;
}

export type SupportFormValues = {
  name: string;
  email: string;
  topic: string;
  orderNumber: string;
  message: string;
};

export type SupportFormErrors = Partial<Record<keyof SupportFormValues, string>>;

export function validateSupportForm(values: SupportFormValues): SupportFormErrors {
  const errors: SupportFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please tell us your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = "Please include at least 10 characters so our studio can help.";
  }

  return errors;
}
