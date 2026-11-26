import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CircleCheck,
  Clock,
  Mail,
  PackageSearch,
  RotateCcw,
  Truck,
} from "lucide-react";

import { useCart } from "@/components/storefront/CartContext";
import { StorefrontBreadcrumb } from "@/components/storefront/StorefrontBreadcrumb";
import { AssuranceStrip } from "@/components/storefront/StorefrontSections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  validateSupportForm,
  type SupportFormErrors,
  type SupportFormValues,
} from "@/lib/storefront-logic";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/support")({
  component: SupportPage,
  head: () =>
    storefrontHead({
      title: "Customer care & FAQs",
      description:
        "Find answers on delivery, 30-day conscious returns, product care, and order support at Kestorae.",
      path: "/support",
    }),
});

const FAQ_GROUPS = [
  {
    category: "Orders & Delivery",
    items: [
      {
        id: "delivery-times",
        question: "How long does UK delivery take?",
        answer:
          "Standard tracked delivery arrives within 2–4 working days and is complimentary on orders over £120 (£4.95 below £120). Express next-working-day delivery is available for £9.95 on orders placed before 2pm.",
      },
      {
        id: "packaging",
        question: "How are fragile ceramics and furniture packed?",
        answer:
          "Stoneware and ceramics are wrapped in moulded unbleached pulp and corrugated kraft board rather than foam. Solid timber pieces travel in reinforced recyclable cartons with corner guards.",
      },
      {
        id: "amend-order",
        question: "Can I update my delivery address after ordering?",
        answer:
          "If your parcel has not yet been collected by our courier, write to our studio team within two hours of placing your order with your KST order reference and revised address.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        id: "return-window",
        question: "What is your returns policy?",
        answer:
          "Unused items in their original protective packaging can be returned within 30 days of delivery. Refunds are issued to your original payment method within 5 working days of studio inspection.",
      },
      {
        id: "damaged-item",
        question: "What should I do if a piece arrives damaged?",
        answer:
          "Photograph the outer carton and the affected piece and share your order reference using the form below. We arrange a swift replacement or full refund at no cost to you.",
      },
    ],
  },
  {
    category: "Materials & Product Care",
    items: [
      {
        id: "oak-care",
        question: "How do I care for oiled European oak?",
        answer:
          "Dust with a soft, dry cotton cloth and wipe spills promptly. Re-applying a thin coat of clear hard-wax oil once a year keeps the grain nourished and water-resistant.",
      },
      {
        id: "linen-care",
        question: "Will stonewashed flax linen shrink in the wash?",
        answer:
          "All Kestorae linens are pre-washed before leaving the mill, so shrinkage is minimal. Wash cool at 30°C with mild detergent, skip fabric softener, and line dry for the best texture.",
      },
    ],
  },
] as const;

const INITIAL_SUPPORT_VALUES: SupportFormValues = {
  name: "",
  email: "",
  topic: "Order & delivery",
  orderNumber: "",
  message: "",
};

function SupportPage() {
  const { lastOrder } = useCart();
  const [trackingInput, setTrackingInput] = useState(lastOrder?.orderNumber ?? "");
  const [trackingStatus, setTrackingStatus] = useState<{
    kind: "error" | "found";
    message: string;
  } | null>(null);

  const [values, setValues] = useState<SupportFormValues>(INITIAL_SUPPORT_VALUES);
  const [errors, setErrors] = useState<SupportFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleTrackingLookup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleaned = trackingInput.trim().toUpperCase();
    if (!cleaned || cleaned.length < 5) {
      setTrackingStatus({
        kind: "error",
        message: "Enter an order reference such as KST-2026-0347 to check delivery status.",
      });
      return;
    }
    if (lastOrder && cleaned === lastOrder.orderNumber.toUpperCase()) {
      setTrackingStatus({
        kind: "found",
        message: `Order ${lastOrder.orderNumber} is confirmed and being packed for ${
          lastOrder.shippingMethod === "express" ? "express next-working-day" : "standard 2–4 day"
        } delivery to ${lastOrder.addressSummary}.`,
      });
      return;
    }
    setTrackingStatus({
      kind: "found",
      message: `Order ${cleaned} is recorded in our studio dispatch queue. Standard UK parcels ship within 1 working day with tracked courier updates.`,
    });
  };

  const updateField = <K extends keyof SupportFormValues>(field: K, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
    if (submitted) setSubmitted(false);
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateSupportForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setValues(INITIAL_SUPPORT_VALUES);
  };

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <StorefrontBreadcrumb items={[{ label: "Home", to: "/" }, { label: "Customer Care" }]} />

        <header className="max-w-2xl">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
            Customer Care
          </p>
          <h1 className="mt-2.5 font-display text-3xl font-medium leading-tight tracking-[-0.015em] text-brand-charcoal sm:text-4xl">
            How can we help?
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Quiet, straightforward guidance on deliveries, 30-day conscious returns, and caring for
            natural materials in your home.
          </p>
        </header>

        <section aria-label="Customer care quick links" className="mt-10 grid gap-5 sm:grid-cols-3">
          <Link
            to="/shipping-policy"
            className="group rounded-md border border-border bg-background p-6 transition-all hover:border-brand-forest/60 hover:shadow-sm"
          >
            <Truck aria-hidden="true" className="size-5 text-brand-forest" />
            <h2 className="mt-4 font-display text-base font-medium text-brand-charcoal group-hover:text-brand-forest">
              Shipping &amp; Delivery
            </h2>
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
              Complimentary delivery over £120, UK &amp; express timelines, and recyclable
              packaging.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 font-display text-xs font-semibold text-brand-forest">
              Read shipping policy <ArrowRight aria-hidden="true" className="size-3.5" />
            </span>
          </Link>

          <Link
            to="/returns"
            className="group rounded-md border border-border bg-background p-6 transition-all hover:border-brand-forest/60 hover:shadow-sm"
          >
            <RotateCcw aria-hidden="true" className="size-5 text-brand-forest" />
            <h2 className="mt-4 font-display text-base font-medium text-brand-charcoal group-hover:text-brand-forest">
              30-Day Conscious Returns
            </h2>
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
              Step-by-step guidance for returning or exchanging unused pieces within 30 days.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 font-display text-xs font-semibold text-brand-forest">
              Read returns policy <ArrowRight aria-hidden="true" className="size-3.5" />
            </span>
          </Link>

          <a
            href="#order-tracking"
            className="group rounded-md border border-border bg-background p-6 transition-all hover:border-brand-forest/60 hover:shadow-sm"
          >
            <PackageSearch aria-hidden="true" className="size-5 text-brand-forest" />
            <h2 className="mt-4 font-display text-base font-medium text-brand-charcoal group-hover:text-brand-forest">
              Order Tracking
            </h2>
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
              Check the dispatch stage of an existing KST order reference in seconds.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 font-display text-xs font-semibold text-brand-forest">
              Look up an order <ArrowRight aria-hidden="true" className="size-3.5" />
            </span>
          </a>
        </section>

        <section
          id="order-tracking"
          aria-labelledby="order-tracking-heading"
          className="mt-12 scroll-mt-24 rounded-md border border-border bg-brand-sand/35 p-6 sm:p-8"
        >
          <div className="max-w-xl">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-olive">
              Order Status
            </p>
            <h2
              id="order-tracking-heading"
              className="mt-2 font-display text-xl font-medium text-brand-charcoal"
            >
              Track your parcel
            </h2>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Enter your Kestorae reference (for example, KST-2026-0347) to view its current studio
              dispatch status.
            </p>

            <form
              onSubmit={handleTrackingLookup}
              noValidate
              className="mt-4 flex flex-col gap-2.5 sm:flex-row"
            >
              <label htmlFor="tracking-reference" className="sr-only">
                Order reference number
              </label>
              <Input
                id="tracking-reference"
                value={trackingInput}
                onChange={(event) => {
                  setTrackingInput(event.target.value);
                  if (trackingStatus) setTrackingStatus(null);
                }}
                placeholder="e.g. KST-2026-0347"
                aria-invalid={trackingStatus?.kind === "error"}
                className="h-10 flex-1 rounded-sm bg-background text-sm"
              />
              <Button
                type="submit"
                className="h-10 rounded-sm bg-brand-forest px-5 font-display text-xs font-medium text-brand-ivory hover:bg-brand-forest/90"
              >
                Check status
              </Button>
            </form>

            {trackingStatus ? (
              <p
                role="status"
                className={`mt-3 text-xs leading-5 ${
                  trackingStatus.kind === "error"
                    ? "text-brand-terracotta"
                    : "font-medium text-brand-forest"
                }`}
              >
                {trackingStatus.message}
              </p>
            ) : null}
          </div>
        </section>

        <div className="mt-14 grid gap-12 pb-14 lg:grid-cols-[1.25fr_0.95fr]">
          <section aria-labelledby="faq-heading">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
              Frequently Asked Questions
            </p>
            <h2
              id="faq-heading"
              className="mt-2 font-display text-2xl font-medium text-brand-charcoal"
            >
              Common questions
            </h2>

            <div className="mt-6 space-y-8">
              {FAQ_GROUPS.map((group) => (
                <div key={group.category}>
                  <h3 className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-charcoal">
                    {group.category}
                  </h3>
                  <Accordion type="single" collapsible className="mt-2 border-t border-border">
                    {group.items.map((item) => (
                      <AccordionItem key={item.id} value={item.id} className="border-border">
                        <AccordionTrigger className="py-4 text-left font-display text-sm font-medium text-brand-charcoal hover:text-brand-forest hover:no-underline">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-sm leading-6 text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="contact-form-heading"
            className="h-fit rounded-md border border-border bg-background p-6 sm:p-8"
          >
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
              Write to the Studio
            </p>
            <h2
              id="contact-form-heading"
              className="mt-2 font-display text-xl font-medium text-brand-charcoal"
            >
              Send us a message
            </h2>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Need advice on finishes, dimensions, or an existing order? Our team responds within
              one working day.
            </p>

            <div className="mt-4 flex flex-wrap gap-4 border-y border-border/70 py-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Mail aria-hidden="true" className="size-3.5 text-brand-forest" />
                care@kestorae.com
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden="true" className="size-3.5 text-brand-forest" />
                Mon–Fri, 09:00–17:30 GMT
              </span>
            </div>

            {submitted ? (
              <div
                role="status"
                className="mt-6 rounded-sm border border-brand-forest/30 bg-brand-sand/35 p-4 text-sm text-brand-charcoal"
              >
                <div className="flex items-start gap-3">
                  <CircleCheck
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-brand-forest"
                  />
                  <div>
                    <p className="font-display font-medium">Message received</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Thank you for writing to Kestorae Customer Care. Our studio team will reply to
                      your email shortly.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <form onSubmit={handleContactSubmit} noValidate className="mt-6 space-y-4">
              <div className="grid gap-1.5">
                <Label htmlFor="support-name">Your name *</Label>
                <Input
                  id="support-name"
                  value={values.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "support-name-error" : undefined}
                  placeholder="Claire Lindqvist"
                  className={`h-10 rounded-sm bg-background ${errors.name ? "border-brand-terracotta" : ""}`}
                />
                {errors.name ? (
                  <p id="support-name-error" className="text-xs text-brand-terracotta">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="support-email">Email address *</Label>
                <Input
                  id="support-email"
                  type="email"
                  value={values.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "support-email-error" : undefined}
                  placeholder="you@example.com"
                  className={`h-10 rounded-sm bg-background ${errors.email ? "border-brand-terracotta" : ""}`}
                />
                {errors.email ? (
                  <p id="support-email-error" className="text-xs text-brand-terracotta">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="support-topic">Topic</Label>
                  <select
                    id="support-topic"
                    value={values.topic}
                    onChange={(event) => updateField("topic", event.target.value)}
                    className="h-10 rounded-sm border border-input bg-background px-3 text-sm text-brand-charcoal focus:border-brand-forest focus:outline-none"
                  >
                    <option value="Order & delivery">Order &amp; delivery</option>
                    <option value="Returns & exchanges">Returns &amp; exchanges</option>
                    <option value="Materials & sizing">Materials &amp; sizing</option>
                    <option value="Trade & studio enquiries">Trade &amp; studio enquiries</option>
                  </select>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="support-order">Order reference (optional)</Label>
                  <Input
                    id="support-order"
                    value={values.orderNumber}
                    onChange={(event) => updateField("orderNumber", event.target.value)}
                    placeholder="KST-2026-0347"
                    className="h-10 rounded-sm bg-background"
                  />
                </div>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="support-message">How can we help? *</Label>
                <Textarea
                  id="support-message"
                  rows={4}
                  value={values.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "support-message-error" : undefined}
                  placeholder="Share any details about your space, piece, or order..."
                  className={`rounded-sm bg-background ${errors.message ? "border-brand-terracotta" : ""}`}
                />
                {errors.message ? (
                  <p id="support-message-error" className="text-xs text-brand-terracotta">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <Button
                type="submit"
                className="h-11 w-full rounded-sm bg-brand-forest font-display text-xs font-medium text-brand-ivory hover:bg-brand-forest/90"
              >
                Send message
              </Button>
            </form>
          </section>
        </div>
      </div>

      <AssuranceStrip />
    </main>
  );
}
