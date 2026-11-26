import { describe, expect, it } from "vitest";

import {
  EXPRESS_DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  STANDARD_DELIVERY_FEE,
  calculateCartTotals,
  filterAndSortProducts,
  isValidEmail,
  makeCartLineKey,
  matchProductsByQuery,
  validateCheckoutForm,
  validateSupportForm,
  type FilterableProduct,
} from "./storefront-logic";

const SAMPLE_PRODUCTS: readonly FilterableProduct[] = [
  {
    slug: "linen-throw",
    name: "Aran Linen Throw",
    price: 68,
    category: "Soft furnishings",
    rooms: ["living-room", "bedroom"],
    collections: ["bestsellers", "soft-furnishings"],
    shortDescription: "Stonewashed flax linen throw.",
    description: "Woven from European flax.",
    materials: "100% stonewashed European flax linen",
  },
  {
    slug: "oak-side-table",
    name: "Herra Oak Side Table",
    price: 145,
    category: "Furniture",
    rooms: ["living-room", "bedroom"],
    collections: ["bestsellers"],
    shortDescription: "Compact solid oak side table.",
    description: "Cut from solid oak with hard-wax oil.",
    materials: "Solid European oak",
  },
  {
    slug: "ceramic-vase",
    name: "Pella Ceramic Vase",
    price: 38,
    category: "Tableware",
    rooms: ["living-room", "dining"],
    collections: ["new-arrivals", "tableware"],
    shortDescription: "Hand-glazed matte ceramic vase.",
    description: "Small-batch ceramic vessel.",
    materials: "Glazed stoneware ceramic",
  },
];

describe("Storefront pure logic", () => {
  it("calculates empty cart totals with zero delivery", () => {
    const totals = calculateCartTotals([], "standard");
    expect(totals.itemCount).toBe(0);
    expect(totals.subtotal).toBe(0);
    expect(totals.delivery).toBe(0);
    expect(totals.total).toBe(0);
    expect(totals.remainingForFreeDelivery).toBe(FREE_DELIVERY_THRESHOLD);
  });

  it("charges £4.95 standard delivery below £120 and free at £120+", () => {
    const below = calculateCartTotals([{ unitPrice: 68, quantity: 1 }], "standard");
    expect(below.subtotal).toBe(68);
    expect(below.delivery).toBe(STANDARD_DELIVERY_FEE);
    expect(below.total).toBe(72.95);
    expect(below.remainingForFreeDelivery).toBe(52);

    const atThreshold = calculateCartTotals([{ unitPrice: 60, quantity: 2 }], "standard");
    expect(atThreshold.subtotal).toBe(120);
    expect(atThreshold.delivery).toBe(0);
    expect(atThreshold.total).toBe(120);
    expect(atThreshold.remainingForFreeDelivery).toBe(0);
  });

  it("charges flat £9.95 for express delivery without stacking standard fee", () => {
    const expressUnder = calculateCartTotals([{ unitPrice: 68, quantity: 1 }], "express");
    expect(expressUnder.delivery).toBe(EXPRESS_DELIVERY_FEE);
    expect(expressUnder.total).toBe(77.95);

    const expressOver = calculateCartTotals([{ unitPrice: 145, quantity: 1 }], "express");
    expect(expressOver.delivery).toBe(EXPRESS_DELIVERY_FEE);
    expect(expressOver.total).toBe(154.95);
  });

  it("builds unique variant-aware cart keys", () => {
    expect(makeCartLineKey("linen-throw")).toBe("linen-throw");
    expect(makeCartLineKey("linen-throw", "Warm Oat")).toBe("linen-throw::Warm Oat");
    expect(makeCartLineKey("linen-throw", "   ")).toBe("linen-throw");
  });

  it("filters by room, category, maxPrice and sorts deterministically", () => {
    expect(filterAndSortProducts(SAMPLE_PRODUCTS, { room: "dining" }).map((p) => p.slug)).toEqual([
      "ceramic-vase",
    ]);

    expect(
      filterAndSortProducts(SAMPLE_PRODUCTS, { maxPrice: 100, sort: "price-asc" }).map(
        (p) => p.slug,
      ),
    ).toEqual(["ceramic-vase", "linen-throw"]);

    expect(
      filterAndSortProducts(SAMPLE_PRODUCTS, { sort: "price-desc" }).map((p) => p.slug),
    ).toEqual(["oak-side-table", "linen-throw", "ceramic-vase"]);

    expect(
      filterAndSortProducts(SAMPLE_PRODUCTS, {
        categories: ["Furniture", "Tableware"],
        sort: "name-asc",
      }).map((p) => p.slug),
    ).toEqual(["oak-side-table", "ceramic-vase"]);
  });

  it("matches search queries across materials and multi-word terms", () => {
    expect(matchProductsByQuery(SAMPLE_PRODUCTS, "   ")).toHaveLength(0);
    expect(matchProductsByQuery(SAMPLE_PRODUCTS, "european flax").map((p) => p.slug)).toEqual([
      "linen-throw",
    ]);
    expect(matchProductsByQuery(SAMPLE_PRODUCTS, "stoneware").map((p) => p.slug)).toEqual([
      "ceramic-vase",
    ]);
  });

  it("validates email, checkout, and support forms accurately", () => {
    expect(isValidEmail("studio@kestorae.com")).toBe(true);
    expect(isValidEmail("not-an-email")).toBe(false);

    const emptyCheckoutErrors = validateCheckoutForm({
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postcode: "",
    });
    expect(emptyCheckoutErrors.email).toBeTruthy();
    expect(emptyCheckoutErrors.firstName).toBeTruthy();
    expect(emptyCheckoutErrors.lastName).toBeTruthy();
    expect(emptyCheckoutErrors.address).toBeTruthy();
    expect(emptyCheckoutErrors.city).toBeTruthy();
    expect(emptyCheckoutErrors.postcode).toBeTruthy();

    expect(
      validateCheckoutForm({
        email: "claire@example.com",
        phone: "+44 7700 900123",
        firstName: "Claire",
        lastName: "Lindqvist",
        address: "14 Clerkenwell Green",
        city: "London",
        postcode: "EC1R 0DP",
      }),
    ).toEqual({});

    const invalidSupport = validateSupportForm({
      name: "",
      email: "bad@",
      topic: "Delivery",
      orderNumber: "",
      message: "Too short",
    });
    expect(invalidSupport.name).toBeTruthy();
    expect(invalidSupport.email).toBeTruthy();
    expect(invalidSupport.message).toBeTruthy();

    expect(
      validateSupportForm({
        name: "Maja Holm",
        email: "maja@example.com",
        topic: "Returns",
        orderNumber: "KST-2026-0347",
        message: "Could you share return pickup guidance for the oak side table?",
      }),
    ).toEqual({});
  });
});
