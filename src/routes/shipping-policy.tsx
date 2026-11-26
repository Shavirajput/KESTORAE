import { createFileRoute } from "@tanstack/react-router";

import { LegalPageLayout, type LegalSection } from "@/components/storefront/LegalPageLayout";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/shipping-policy")({
  component: ShippingPolicyPage,
  head: () =>
    storefrontHead({
      title: "Shipping & Delivery Policy",
      description:
        "UK standard and express delivery timelines, complimentary £120 threshold, and protective packaging details.",
      path: "/shipping-policy",
    }),
});

const SHIPPING_RATES = [
  {
    service: "Standard Tracked Delivery (Orders £120+)",
    timeline: "2–4 working days",
    cost: "Complimentary",
  },
  {
    service: "Standard Tracked Delivery (Under £120)",
    timeline: "2–4 working days",
    cost: "£4.95",
  },
  {
    service: "Express Next-Working-Day Delivery",
    timeline: "Next working day (order before 14:00 GMT)",
    cost: "£9.95",
  },
] as const;

const SECTIONS: readonly LegalSection[] = [
  {
    id: "dispatch",
    heading: "1. Studio Dispatch & Preparation",
    paragraphs: [
      "All in-stock Kestorae pieces are inspected by hand and dispatched from our studio within one working day. Orders placed after 14:00 GMT on Friday or over the weekend are dispatched on the next working Monday.",
      "Once collected by our courier partner, you receive a tracking link so you can adjust delivery windows or nominate a safe place.",
    ],
  },
  {
    id: "packaging",
    heading: "2. Considered Protective Packaging",
    paragraphs: [
      "We avoid polystyrene and unnecessary plastic voids wherever possible. Ceramics and stoneware are cradled in moulded unbleached paper pulp, while timber furniture ships in double-walled recyclable cartons.",
    ],
    bullets: [
      "100% kerbside-recyclable outer cartons and paper tape.",
      "Reusable cotton storage bags included with selected flat-woven wool rugs.",
      "Please retain original cartons if you think you may wish to use our 30-day return window.",
    ],
  },
  {
    id: "large-items",
    heading: "3. Larger Furniture Pieces",
    paragraphs: [
      "Benches and solid oak side tables ship via our two-person or scheduled tracked courier service. Before checkout, please check doorways and hallways against the dimensions listed on each product page.",
    ],
  },
  {
    id: "delivery-issues",
    heading: "4. Delayed or Damaged Parcels",
    paragraphs: [
      "If your parcel has not arrived within the estimated window or shows visible transit damage, contact our Customer Care team within 48 hours of delivery with your order reference and photographs so we can resolve it promptly.",
    ],
  },
];

function ShippingPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Delivery Information"
      title="Shipping & Delivery Policy"
      summary="Transparent UK delivery options, complimentary thresholds, and how we prepare natural materials for transit."
      lastUpdated="November 2026"
      sections={SECTIONS}
      extraContent={
        <section
          aria-label="UK delivery rates"
          className="overflow-hidden rounded-md border border-border bg-background"
        >
          <div className="border-b border-border bg-brand-sand/35 px-5 py-3.5">
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-charcoal">
              United Kingdom Delivery Services
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Service</th>
                  <th className="px-5 py-3 font-medium">Estimated Time</th>
                  <th className="px-5 py-3 text-right font-medium">Charge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SHIPPING_RATES.map((rate) => (
                  <tr key={rate.service}>
                    <td className="px-5 py-3.5 font-medium text-brand-charcoal">{rate.service}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{rate.timeline}</td>
                    <td className="px-5 py-3.5 text-right font-medium tabular-nums text-brand-forest">
                      {rate.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      }
    />
  );
}
