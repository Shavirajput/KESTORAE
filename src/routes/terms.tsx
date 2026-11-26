import { createFileRoute } from "@tanstack/react-router";

import { LegalPageLayout, type LegalSection } from "@/components/storefront/LegalPageLayout";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () =>
    storefrontHead({
      title: "Terms & Conditions of Sale",
      description:
        "Terms governing browsing, illustrative orders, pricing, and product descriptions on the Kestorae storefront.",
      path: "/terms",
    }),
});

const SECTIONS: readonly LegalSection[] = [
  {
    id: "scope",
    heading: "1. About These Terms",
    paragraphs: [
      "These Terms & Conditions explain how the Kestorae Home & Lifestyle storefront operates, how product descriptions and pricing are presented, and what applies when placing an order.",
      "This web application is presented as an illustrative frontend storefront experience: cart totals, delivery selections, and order confirmations run locally in your browser without processing live card payments.",
    ],
  },
  {
    id: "pricing",
    heading: "2. Pricing & Currency",
    paragraphs: [
      "All prices are displayed in British Pounds Sterling (GBP £) inclusive of applicable UK VAT. Standard UK delivery is complimentary on orders of £120 or more, with a £4.95 fee below £120, or £9.95 for Express next-working-day delivery.",
    ],
  },
  {
    id: "natural-materials",
    heading: "3. Natural Material Variations",
    paragraphs: [
      "Because our pieces are crafted from solid European timber, stonewashed flax, and reactive-glazed stoneware, subtle variations in wood grain, glaze speckling, and weave texture are inherent to each piece rather than defects.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "4. Brand & Editorial Content",
    paragraphs: [
      "All Kestorae photography, product copy, journal essays, and brand marks remain the property of Kestorae Home & Lifestyle and may not be reproduced commercially without prior written permission.",
    ],
  },
  {
    id: "contact",
    heading: "5. Questions & Consumer Rights",
    paragraphs: [
      "Nothing in these terms affects your statutory consumer rights under UK law. For questions regarding any policy or order, reach our studio team via the Customer Care page or email care@kestorae.com.",
    ],
  },
];

function TermsPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal Information"
      title="Terms & Conditions of Sale"
      summary="Clear terms covering storefront use, GBP pricing, natural material characteristics, and customer rights."
      lastUpdated="November 2026"
      sections={SECTIONS}
    />
  );
}
