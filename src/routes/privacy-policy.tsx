import { createFileRoute } from "@tanstack/react-router";

import { LegalPageLayout, type LegalSection } from "@/components/storefront/LegalPageLayout";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
  head: () =>
    storefrontHead({
      title: "Privacy & Cookie Policy",
      description:
        "How Kestorae collects, uses, and safeguards personal information and browser cookies.",
      path: "/privacy-policy",
    }),
});

const SECTIONS: readonly LegalSection[] = [
  {
    id: "overview",
    heading: "1. Our Commitment to Quiet Privacy",
    paragraphs: [
      "Kestorae Home & Lifestyle respects your personal space online just as we do in the home. We collect only the information strictly required to fulfil orders, answer studio enquiries, and send the Considered Living newsletter when you explicitly opt in.",
      "We never sell, rent, or trade customer records with third-party data brokers.",
    ],
  },
  {
    id: "information-collected",
    heading: "2. Information We Collect",
    paragraphs: [
      "Depending on how you interact with the Kestorae storefront, we may process the following categories of data:",
    ],
    bullets: [
      "Contact and delivery details (name, email address, phone number, and postal address) supplied during checkout or customer care enquiries.",
      "Order details, including chosen finishes, quantities, delivery preferences, and correspondence relating to returns.",
      "Newsletter subscription preferences when you register for Considered Living.",
      "Essential technical session data required to keep your shopping bag and saved wishlist intact while browsing.",
    ],
  },
  {
    id: "cookies",
    heading: "3. Cookies & Local Preferences",
    paragraphs: [
      "We keep browser storage intentionally minimal. Essential session storage preserves your shopping bag items, selected finishes, and saved wishlist pieces as you move across rooms and collections.",
      "You can clear or restrict cookies at any time through your browser settings; disabling essential storage may reset your shopping bag between visits.",
    ],
  },
  {
    id: "your-rights",
    heading: "4. Your Data Rights",
    paragraphs: [
      "Under UK GDPR and equivalent European privacy standards, you have the right to request access to, correction of, or deletion of personal data we hold about you, as well as the right to unsubscribe from editorial emails at any time.",
      "To submit a privacy request, contact care@kestorae.com. Please note that this interactive storefront operates entirely in the browser and does not transmit payment credentials or store personal data on external servers.",
    ],
  },
];

function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal & Privacy"
      title="Privacy & Cookie Policy"
      summary="Clear, plain-language details on how Kestorae handles personal information, essential browser storage, and your data rights."
      lastUpdated="November 2026"
      sections={SECTIONS}
    />
  );
}
