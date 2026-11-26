import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Lock } from "lucide-react";

import {
  EXPRESS_DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  useCart,
} from "@/components/storefront/CartContext";
import { ResponsivePicture } from "@/components/storefront/ResponsivePicture";
import { StorefrontBreadcrumb } from "@/components/storefront/StorefrontBreadcrumb";
import { EmptyState } from "@/components/storefront/StorefrontSections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { formatPrice, getProduct, getVariantPrice } from "@/data/catalogue";
import {
  STANDARD_DELIVERY_FEE,
  calculateCartTotals,
  validateCheckoutForm,
  type CheckoutFormErrors,
  type CheckoutFormValues,
  type ShippingMethod,
} from "@/lib/storefront-logic";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () =>
    storefrontHead({
      title: "Checkout",
      description: "Complete your illustrative Kestorae order.",
      path: "/checkout",
    }),
});

const deliveryOptions = [
  { id: "standard" as const, label: "Standard delivery", detail: "2–4 working days" },
  { id: "express" as const, label: "Express delivery", detail: "Next working day" },
];

const INITIAL_VALUES: CheckoutFormValues = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postcode: "",
};

function CheckoutPage() {
  const { lines, clear, recordOrder } = useCart();
  const navigate = useNavigate();
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const [values, setValues] = useState<CheckoutFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  if (lines.length === 0) {
    return (
      <main className="flex-1">
        <div className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8">
          <EmptyState
            title="Nothing to check out"
            description="Your bag is empty. Add a piece to the bag to walk through the illustrative checkout."
          >
            <Button
              asChild
              className="rounded-sm bg-brand-forest text-brand-ivory hover:bg-brand-forest/90"
            >
              <Link to="/shop">Explore the shop</Link>
            </Button>
          </EmptyState>
        </div>
      </main>
    );
  }

  const resolvedLines = lines
    .map((line) => {
      const product = getProduct(line.slug);
      if (!product) return null;
      return {
        line,
        product,
        unitPrice: getVariantPrice(product, line.variant),
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const totals = calculateCartTotals(
    resolvedLines.map((item) => ({ unitPrice: item.unitPrice, quantity: item.line.quantity })),
    shippingMethod,
  );

  const updateField = <K extends keyof CheckoutFormValues>(field: K, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const validationErrors = validateCheckoutForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstKey = Object.keys(validationErrors)[0] as keyof CheckoutFormValues;
      const fieldIdMap: Record<keyof CheckoutFormValues, string> = {
        email: "email",
        phone: "phone",
        firstName: "first-name",
        lastName: "last-name",
        address: "address",
        city: "city",
        postcode: "postcode",
      };
      document.getElementById(fieldIdMap[firstKey])?.focus();
      return;
    }

    setSubmitting(true);
    const suffix = String(Math.floor(1000 + Math.random() * 9000));
    const orderNumber = `KST-2026-${suffix}`;

    window.setTimeout(() => {
      recordOrder({
        orderNumber,
        placedAt: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        email: values.email.trim(),
        customerName: `${values.firstName.trim()} ${values.lastName.trim()}`,
        addressSummary: `${values.address.trim()}, ${values.city.trim()}, ${values.postcode.trim().toUpperCase()}`,
        shippingMethod,
        items: resolvedLines.map(({ line, product, unitPrice }) => ({
          key: line.key,
          slug: product.slug,
          name: product.name,
          variant: line.variant,
          quantity: line.quantity,
          unitPrice,
          image: product.image,
        })),
        subtotal: totals.subtotal,
        delivery: totals.delivery,
        total: totals.total,
      });
      clear();
      void navigate({ to: "/order-confirmation" });
    }, 450);
  };

  const errorCount = Object.keys(errors).length;

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <StorefrontBreadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Shopping Bag", to: "/cart" },
            { label: "Checkout" },
          ]}
        />

        <header className="max-w-2xl">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-olive">
            Secure Checkout
          </p>
          <h1 className="mt-2.5 font-display text-3xl font-medium text-brand-charcoal sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Lock aria-hidden="true" className="size-3.5 text-brand-forest" />
            Illustrative storefront — no payment is taken and no details are stored.
          </p>
        </header>

        {errorCount > 0 ? (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-md border border-brand-terracotta/40 bg-brand-blush/20 px-4 py-3 text-sm text-brand-charcoal"
          >
            <AlertCircle
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-brand-terracotta"
            />
            <p>
              Please review the {errorCount} highlighted {errorCount === 1 ? "field" : "fields"}{" "}
              before placing your order.
            </p>
          </div>
        ) : null}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 grid gap-10 pb-14 lg:grid-cols-[1.4fr_1fr] lg:gap-12"
        >
          <div className="space-y-10">
            <section aria-labelledby="checkout-contact-heading">
              <h2
                id="checkout-contact-heading"
                className="font-display text-lg font-medium text-brand-charcoal"
              >
                1. Contact details
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="email">Email address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    placeholder="you@example.com"
                    className={`h-10 rounded-sm bg-background ${errors.email ? "border-brand-terracotta" : ""}`}
                  />
                  {errors.email ? (
                    <p id="email-error" className="text-xs text-brand-terracotta">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder="+44 7700 900000"
                    className="h-10 rounded-sm bg-background"
                  />
                </div>
              </div>
            </section>

            <section aria-labelledby="checkout-address-heading">
              <h2
                id="checkout-address-heading"
                className="font-display text-lg font-medium text-brand-charcoal"
              >
                2. Delivery address
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="first-name">First name *</Label>
                  <Input
                    id="first-name"
                    name="firstName"
                    autoComplete="given-name"
                    value={values.firstName}
                    onChange={(event) => updateField("firstName", event.target.value)}
                    aria-invalid={Boolean(errors.firstName)}
                    aria-describedby={errors.firstName ? "first-name-error" : undefined}
                    className={`h-10 rounded-sm bg-background ${errors.firstName ? "border-brand-terracotta" : ""}`}
                  />
                  {errors.firstName ? (
                    <p id="first-name-error" className="text-xs text-brand-terracotta">
                      {errors.firstName}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="last-name">Last name *</Label>
                  <Input
                    id="last-name"
                    name="lastName"
                    autoComplete="family-name"
                    value={values.lastName}
                    onChange={(event) => updateField("lastName", event.target.value)}
                    aria-invalid={Boolean(errors.lastName)}
                    aria-describedby={errors.lastName ? "last-name-error" : undefined}
                    className={`h-10 rounded-sm bg-background ${errors.lastName ? "border-brand-terracotta" : ""}`}
                  />
                  {errors.lastName ? (
                    <p id="last-name-error" className="text-xs text-brand-terracotta">
                      {errors.lastName}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-1.5 sm:col-span-2">
                  <Label htmlFor="address">Street address *</Label>
                  <Input
                    id="address"
                    name="address"
                    autoComplete="street-address"
                    value={values.address}
                    onChange={(event) => updateField("address", event.target.value)}
                    aria-invalid={Boolean(errors.address)}
                    aria-describedby={errors.address ? "address-error" : undefined}
                    placeholder="14 Clerkenwell Green"
                    className={`h-10 rounded-sm bg-background ${errors.address ? "border-brand-terracotta" : ""}`}
                  />
                  {errors.address ? (
                    <p id="address-error" className="text-xs text-brand-terracotta">
                      {errors.address}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="city">Town or city *</Label>
                  <Input
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    value={values.city}
                    onChange={(event) => updateField("city", event.target.value)}
                    aria-invalid={Boolean(errors.city)}
                    aria-describedby={errors.city ? "city-error" : undefined}
                    placeholder="London"
                    className={`h-10 rounded-sm bg-background ${errors.city ? "border-brand-terracotta" : ""}`}
                  />
                  {errors.city ? (
                    <p id="city-error" className="text-xs text-brand-terracotta">
                      {errors.city}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="postcode">Postcode *</Label>
                  <Input
                    id="postcode"
                    name="postcode"
                    autoComplete="postal-code"
                    value={values.postcode}
                    onChange={(event) => updateField("postcode", event.target.value)}
                    aria-invalid={Boolean(errors.postcode)}
                    aria-describedby={errors.postcode ? "postcode-error" : undefined}
                    placeholder="EC1R 0DP"
                    className={`h-10 rounded-sm bg-background ${errors.postcode ? "border-brand-terracotta" : ""}`}
                  />
                  {errors.postcode ? (
                    <p id="postcode-error" className="text-xs text-brand-terracotta">
                      {errors.postcode}
                    </p>
                  ) : null}
                </div>
              </div>
            </section>

            <section aria-labelledby="checkout-delivery-heading">
              <h2
                id="checkout-delivery-heading"
                className="font-display text-lg font-medium text-brand-charcoal"
              >
                3. Delivery method
              </h2>
              <RadioGroup
                value={shippingMethod}
                onValueChange={(value) => setShippingMethod(value as ShippingMethod)}
                className="mt-4 gap-3"
              >
                {deliveryOptions.map((option) => {
                  const displayCost =
                    option.id === "standard"
                      ? totals.subtotal >= FREE_DELIVERY_THRESHOLD
                        ? "Free"
                        : formatPrice(STANDARD_DELIVERY_FEE)
                      : formatPrice(EXPRESS_DELIVERY_FEE);

                  return (
                    <Label
                      key={option.id}
                      htmlFor={`delivery-${option.id}`}
                      className="flex cursor-pointer items-center justify-between rounded-sm border border-border bg-background p-4 font-normal transition-colors has-[button[data-state=checked]]:border-brand-forest has-[button[data-state=checked]]:bg-brand-sand/25"
                    >
                      <span className="flex items-center gap-3">
                        <RadioGroupItem id={`delivery-${option.id}`} value={option.id} />
                        <span>
                          <span className="block text-sm font-medium text-brand-charcoal">
                            {option.label}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {option.detail}
                          </span>
                        </span>
                      </span>
                      <span className="text-sm font-medium tabular-nums text-brand-charcoal">
                        {displayCost}
                      </span>
                    </Label>
                  );
                })}
              </RadioGroup>
            </section>

            <section aria-labelledby="checkout-payment-heading">
              <h2
                id="checkout-payment-heading"
                className="font-display text-lg font-medium text-brand-charcoal"
              >
                4. Payment
              </h2>
              <p className="mt-3 rounded-sm border border-dashed border-border bg-brand-sand/30 px-4 py-3.5 text-xs leading-5 text-muted-foreground">
                This frontend storefront does not process live payments. Submitting the form
                validates your delivery details and displays an interactive order receipt without
                charging a card.
              </p>
            </section>
          </div>

          <aside
            aria-label="Order summary"
            className="h-fit rounded-md border border-border bg-brand-sand/30 p-6 lg:sticky lg:top-24"
          >
            <h2 className="font-display text-lg font-medium text-brand-charcoal">Your order</h2>
            <ul className="mt-4 space-y-4">
              {resolvedLines.map(({ line, product, unitPrice }) => (
                <li key={line.key} className="flex items-center gap-3">
                  <span className="relative w-14 shrink-0">
                    <ResponsivePicture
                      src={product.image}
                      alt={product.imageAlt}
                      sizes="56px"
                      width={56}
                      height={56}
                      loading="lazy"
                      className="aspect-square w-full rounded-sm object-cover"
                    />
                    <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-brand-forest text-[10px] font-medium tabular-nums text-brand-ivory">
                      {line.quantity}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-brand-charcoal">
                      {product.name}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {line.variant}
                    </span>
                  </span>
                  <span className="text-sm font-medium tabular-nums text-brand-charcoal">
                    {formatPrice(unitPrice * line.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium tabular-nums text-brand-charcoal">
                  {formatPrice(totals.subtotal)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  {shippingMethod === "express" ? "Express delivery" : "Standard delivery"}
                </dt>
                <dd className="font-medium tabular-nums text-brand-charcoal">
                  {totals.delivery === 0 ? "Free" : formatPrice(totals.delivery)}
                </dd>
              </div>
            </dl>
            <Separator className="my-4" />
            <div className="flex justify-between text-base">
              <p className="font-display font-medium text-brand-charcoal">Total</p>
              <p className="font-display font-semibold tabular-nums text-brand-charcoal">
                {formatPrice(totals.total)}
              </p>
            </div>
            <Button
              type="submit"
              className="mt-6 h-11 w-full rounded-sm bg-brand-forest font-display text-xs font-medium text-brand-ivory hover:bg-brand-forest/90"
              size="lg"
              disabled={submitting}
            >
              {submitting ? "Placing order…" : `Place order · ${formatPrice(totals.total)}`}
            </Button>
            <Button asChild variant="ghost" className="mt-2 w-full">
              <Link to="/cart">Back to bag</Link>
            </Button>
          </aside>
        </form>
      </div>
    </main>
  );
}
