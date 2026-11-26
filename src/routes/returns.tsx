import { createFileRoute } from "@tanstack/react-router";

import { LegalPageLayout, type LegalSection } from "@/components/storefront/LegalPageLayout";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/returns")({
  component: ReturnsPage,
  head: () =>
    storefrontHead({
      title: "Returns & Exchanges Policy",
      description:
        "Kestorae 30-day conscious returns: eligibility, simple return steps, and refund timelines.",
      path: "/returns",
    }),
});

const SECTIONS: readonly LegalSection[] = [
  {
    id: "window",
    heading: "1. 30-Day Conscious Returns",
    paragraphs: [
      "We want every piece you bring into your home to earn its place. If an item does not quite suit your space, you may return it within 30 calendar days of delivery for a refund or exchange.",
      "To keep returns low-impact, we encourage measuring your room and reviewing finish details before ordering — our studio team is always glad to advise before you buy.",
    ],
  },
  {
    id: "eligibility",
    heading: "2. Return Eligibility",
    paragraphs: [
      "To qualify for a full refund, returned pieces should meet the following conditions:",
    ],
    bullets: [
      "Unused, unwashed, and in the same condition in which they arrived.",
      "Packed securely inside their original boxes and protective inner pulp or wrapping.",
      "Returned alongside your KST order reference so our studio can match your parcel quickly.",
      "Candles and home fragrances must remain unlit and sealed for hygiene and safety.",
    ],
  },
  {
    id: "how-to-return",
    heading: "3. How to Arrange a Return",
    paragraphs: [
      "Visit our Customer Care page and share your order number alongside the item(s) you wish to return. We issue a prepaid tracked courier label or arrange doorstep collection for larger timber pieces.",
      "Standard parcel return labels carry a £4.95 contribution deducted from your refund unless the item arrived faulty or damaged, in which case return shipping is complimentary.",
    ],
  },
  {
    id: "refunds",
    heading: "4. Refunds & Exchanges",
    paragraphs: [
      "Once your parcel reaches our studio and passes inspection, refunds are processed within 5 working days back to your original payment method. Exchanges are dispatched immediately once the return scan is confirmed by the courier.",
    ],
  },
];

function ReturnsPage() {
  return (
    <LegalPageLayout
      eyebrow="Returns Information"
      title="Returns & Exchanges"
      summary="Straightforward 30-day conscious returns designed around careful home decisions and clear refund timelines."
      lastUpdated="November 2026"
      sections={SECTIONS}
    />
  );
}
