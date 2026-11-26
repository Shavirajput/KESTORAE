import { useMemo, useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowRight, Check, Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  INITIAL_REGISTRATION_VALUES,
  evaluatePasswordStrength,
  validateRegistrationForm,
  type PasswordStrengthLevel,
  type RegistrationFormErrors,
  type RegistrationFormValues,
} from "@/lib/account-registration";

const MOCK_EXISTING_EMAIL = "existing@kestorae.com";

type RegisteredAccount = {
  firstName: string;
  lastName: string;
  email: string;
};

const STRENGTH_BAR_COLORS: Record<PasswordStrengthLevel, string> = {
  empty: "bg-border",
  weak: "bg-brand-terracotta",
  fair: "bg-brand-ochre",
  good: "bg-brand-olive",
  strong: "bg-brand-forest",
};

const STRENGTH_LABEL_COLORS: Record<PasswordStrengthLevel, string> = {
  empty: "text-muted-foreground",
  weak: "text-brand-terracotta",
  fair: "text-brand-charcoal",
  good: "text-brand-olive",
  strong: "text-brand-forest",
};

const FIELD_ORDER: (keyof RegistrationFormValues)[] = [
  "firstName",
  "lastName",
  "email",
  "password",
  "confirmPassword",
  "acceptedPolicies",
];

export function CreateAccountForm() {
  const [values, setValues] = useState<RegistrationFormValues>(INITIAL_REGISTRATION_VALUES);
  const [errors, setErrors] = useState<RegistrationFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof RegistrationFormValues, boolean>>>(
    {},
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [registeredAccount, setRegisteredAccount] = useState<RegisteredAccount | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  const passwordStrength = useMemo(
    () => evaluatePasswordStrength(values.password),
    [values.password],
  );

  const passwordsMatch =
    values.confirmPassword.length > 0 && values.confirmPassword === values.password;

  const updateField = <K extends keyof RegistrationFormValues>(
    field: K,
    value: RegistrationFormValues[K],
  ) => {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    setFormError(null);

    if (touched[field] || errors[field]) {
      const nextValidation = validateRegistrationForm(nextValues);
      setErrors((prev) => ({
        ...prev,
        [field]: nextValidation[field],
        ...(field === "password" && (touched.confirmPassword || prev.confirmPassword)
          ? { confirmPassword: nextValidation.confirmPassword }
          : {}),
      }));
    }
  };

  const handleBlur = (field: keyof RegistrationFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const nextValidation = validateRegistrationForm(values);
    setErrors((prev) => ({
      ...prev,
      [field]: nextValidation[field],
    }));
  };

  const focusFirstError = (validationErrors: RegistrationFormErrors) => {
    const firstKey = FIELD_ORDER.find((key) => Boolean(validationErrors[key]));
    if (!firstKey || !formRef.current) return;
    const element = formRef.current.querySelector<HTMLElement>(`#register-${firstKey}`);
    element?.focus();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateRegistrationForm(values);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
      acceptedPolicies: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const count = Object.keys(validationErrors).length;
      setFormError(
        count === 1
          ? "Please review the highlighted field below."
          : `Please review the ${count} highlighted fields below.`,
      );
      focusFirstError(validationErrors);
      return;
    }

    setErrors({});
    setFormError(null);
    setIsSubmitting(true);

    const normalizedEmail = values.email.trim().toLowerCase();
    const firstName = values.firstName.trim();
    const lastName = values.lastName.trim();

    window.setTimeout(() => {
      if (normalizedEmail === MOCK_EXISTING_EMAIL) {
        setIsSubmitting(false);
        setErrors({ email: "An account with this email address already exists." });
        setFormError(
          "We found an existing account for that email address. Try signing in instead.",
        );
        focusFirstError({ email: "exists" });
        return;
      }

      // Frontend-only mock authentication: never persist passwords in localStorage or sessionStorage.
      setIsSubmitting(false);
      setRegisteredAccount({
        firstName,
        lastName,
        email: normalizedEmail,
      });
      setValues(INITIAL_REGISTRATION_VALUES);
    }, 650);
  };

  if (registeredAccount) {
    return (
      <div role="status" aria-live="polite" className="border-t border-border/80 pt-8">
        <div className="inline-flex size-10 items-center justify-center rounded-sm bg-brand-forest text-brand-ivory">
          <Check aria-hidden="true" className="size-5" />
        </div>

        <p className="mt-6 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-olive">
          Account Created
        </p>
        <h1 className="mt-2 font-display text-2xl font-medium tracking-[-0.02em] text-brand-charcoal sm:text-3xl">
          Welcome to Kestorae, {registeredAccount.firstName}.
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Your account for{" "}
          <span className="font-medium text-brand-charcoal">{registeredAccount.email}</span> is now
          ready. Explore calm essentials crafted for everyday spaces.
        </p>

        <div className="mt-6 border-y border-border/80 py-4 text-xs leading-5 text-muted-foreground">
          <div className="flex items-center justify-between gap-4 py-1">
            <span>Member</span>
            <span className="font-medium text-brand-charcoal">
              {registeredAccount.firstName} {registeredAccount.lastName}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 py-1">
            <span>Email</span>
            <span className="font-medium text-brand-charcoal">{registeredAccount.email}</span>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="h-11 flex-1 rounded-sm bg-brand-forest font-display text-xs font-medium tracking-[0.04em] text-brand-ivory hover:bg-brand-forest/90"
          >
            <Link to="/shop">
              Explore the Collection
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 flex-1 rounded-sm border-brand-clay/80 bg-transparent font-display text-xs font-medium text-brand-charcoal hover:bg-brand-sand/50"
          >
            <Link to="/">Return Home</Link>
          </Button>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Ready to sign in later?{" "}
          <a
            href="/account/login"
            className="font-medium text-brand-forest underline-offset-4 transition-colors hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-medium tracking-[-0.02em] text-brand-charcoal sm:text-[1.75rem]">
          Create your account
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Join us in making everyday living more considered.
        </p>
      </div>

      {formError ? (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2.5 rounded-sm border border-brand-terracotta/50 bg-brand-terracotta/8 px-3.5 py-2.5 text-xs leading-5 text-brand-charcoal"
        >
          <AlertCircle
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-brand-terracotta"
          />
          <span>{formError}</span>
        </div>
      ) : null}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isSubmitting}
        className="mt-5 space-y-4"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3.5">
          <div>
            <label
              htmlFor="register-firstName"
              className="block font-display text-xs font-medium text-brand-charcoal"
            >
              First Name <span className="text-brand-terracotta">*</span>
            </label>
            <Input
              id="register-firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              disabled={isSubmitting}
              value={values.firstName}
              onChange={(event) => updateField("firstName", event.target.value)}
              onBlur={() => handleBlur("firstName")}
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? "register-firstName-error" : undefined}
              placeholder="Astrid"
              className={`mt-1.5 h-11 rounded-sm bg-card px-3.5 text-sm shadow-none focus-visible:ring-1 md:h-10 ${
                errors.firstName
                  ? "border-brand-terracotta focus-visible:ring-brand-terracotta"
                  : "border-brand-clay/65 focus-visible:border-brand-forest focus-visible:ring-brand-forest"
              }`}
            />
            {errors.firstName ? (
              <p
                id="register-firstName-error"
                role="alert"
                className="mt-1.5 text-xs text-brand-terracotta"
              >
                {errors.firstName}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="register-lastName"
              className="block font-display text-xs font-medium text-brand-charcoal"
            >
              Last Name <span className="text-brand-terracotta">*</span>
            </label>
            <Input
              id="register-lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              disabled={isSubmitting}
              value={values.lastName}
              onChange={(event) => updateField("lastName", event.target.value)}
              onBlur={() => handleBlur("lastName")}
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? "register-lastName-error" : undefined}
              placeholder="Lindholm"
              className={`mt-1.5 h-11 rounded-sm bg-card px-3.5 text-sm shadow-none focus-visible:ring-1 md:h-10 ${
                errors.lastName
                  ? "border-brand-terracotta focus-visible:ring-brand-terracotta"
                  : "border-brand-clay/65 focus-visible:border-brand-forest focus-visible:ring-brand-forest"
              }`}
            />
            {errors.lastName ? (
              <p
                id="register-lastName-error"
                role="alert"
                className="mt-1.5 text-xs text-brand-terracotta"
              >
                {errors.lastName}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label
            htmlFor="register-email"
            className="block font-display text-xs font-medium text-brand-charcoal"
          >
            Email Address <span className="text-brand-terracotta">*</span>
          </label>
          <Input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            disabled={isSubmitting}
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "register-email-error" : undefined}
            placeholder="astrid@example.com"
            className={`mt-1.5 h-11 rounded-sm bg-card px-3.5 text-sm shadow-none focus-visible:ring-1 md:h-10 ${
              errors.email
                ? "border-brand-terracotta focus-visible:ring-brand-terracotta"
                : "border-brand-clay/65 focus-visible:border-brand-forest focus-visible:ring-brand-forest"
            }`}
          />
          {errors.email ? (
            <p
              id="register-email-error"
              role="alert"
              className="mt-1.5 text-xs text-brand-terracotta"
            >
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="register-password"
            className="block font-display text-xs font-medium text-brand-charcoal"
          >
            Password <span className="text-brand-terracotta">*</span>
          </label>
          <div className="relative mt-1.5">
            <Input
              id="register-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              disabled={isSubmitting}
              value={values.password}
              onChange={(event) => updateField("password", event.target.value)}
              onBlur={() => handleBlur("password")}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password
                  ? "register-password-error register-password-requirements"
                  : "register-password-requirements"
              }
              placeholder="Create a password"
              className={`h-11 rounded-sm bg-card pl-3.5 pr-11 text-sm shadow-none focus-visible:ring-1 md:h-10 ${
                errors.password
                  ? "border-brand-terracotta focus-visible:ring-brand-terracotta"
                  : "border-brand-clay/65 focus-visible:border-brand-forest focus-visible:ring-brand-forest"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              disabled={isSubmitting}
              className="absolute right-1 top-1/2 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-brand-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest disabled:cursor-not-allowed disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff aria-hidden="true" className="size-4" />
              ) : (
                <Eye aria-hidden="true" className="size-4" />
              )}
            </button>
          </div>

          {errors.password ? (
            <p
              id="register-password-error"
              role="alert"
              className="mt-1.5 text-xs text-brand-terracotta"
            >
              {errors.password}
            </p>
          ) : null}

          <div id="register-password-requirements" className="mt-2.5 space-y-2">
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Password strength</span>
                <span
                  aria-live="polite"
                  className={`font-display text-[11px] font-semibold transition-colors duration-150 ${STRENGTH_LABEL_COLORS[passwordStrength.level]}`}
                >
                  {passwordStrength.label}
                </span>
              </div>
              <div
                className="mt-1.5 grid grid-cols-4 gap-1.5"
                role="meter"
                aria-label="Password strength"
                aria-valuemin={0}
                aria-valuemax={4}
                aria-valuenow={passwordStrength.score}
                aria-valuetext={`${passwordStrength.label} (${passwordStrength.score} of 4 requirements met)`}
              >
                {[1, 2, 3, 4].map((segment) => (
                  <span
                    key={segment}
                    className={`h-1.5 rounded-xs transition-colors duration-200 ${
                      segment <= passwordStrength.score
                        ? STRENGTH_BAR_COLORS[passwordStrength.level]
                        : "bg-brand-sand"
                    }`}
                  />
                ))}
              </div>
            </div>

            <ul className="grid grid-cols-1 gap-x-4 gap-y-1 text-xs sm:grid-cols-2">
              {passwordStrength.requirements.map((req) => (
                <li
                  key={req.id}
                  className={`flex items-center gap-1.5 transition-colors duration-150 ${
                    req.met ? "text-brand-forest font-medium" : "text-muted-foreground"
                  }`}
                >
                  <Check
                    aria-hidden="true"
                    className={`size-3.5 shrink-0 transition-opacity ${req.met ? "opacity-100" : "opacity-35"}`}
                  />
                  <span>{req.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <label
            htmlFor="register-confirmPassword"
            className="block font-display text-xs font-medium text-brand-charcoal"
          >
            Confirm Password <span className="text-brand-terracotta">*</span>
          </label>
          <div className="relative mt-1.5">
            <Input
              id="register-confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              disabled={isSubmitting}
              value={values.confirmPassword}
              onChange={(event) => updateField("confirmPassword", event.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword ? "register-confirmPassword-error" : undefined
              }
              placeholder="Re-enter your password"
              className={`h-11 rounded-sm bg-card pl-3.5 pr-11 text-sm shadow-none focus-visible:ring-1 md:h-10 ${
                errors.confirmPassword
                  ? "border-brand-terracotta focus-visible:ring-brand-terracotta"
                  : "border-brand-clay/65 focus-visible:border-brand-forest focus-visible:ring-brand-forest"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((visible) => !visible)}
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              aria-pressed={showConfirmPassword}
              disabled={isSubmitting}
              className="absolute right-1 top-1/2 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-brand-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest disabled:cursor-not-allowed disabled:opacity-50"
            >
              {showConfirmPassword ? (
                <EyeOff aria-hidden="true" className="size-4" />
              ) : (
                <Eye aria-hidden="true" className="size-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword ? (
            <p
              id="register-confirmPassword-error"
              role="alert"
              className="mt-1.5 text-xs text-brand-terracotta"
            >
              {errors.confirmPassword}
            </p>
          ) : passwordsMatch ? (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-brand-forest">
              <Check aria-hidden="true" className="size-3.5" />
              <span>Passwords match</span>
            </p>
          ) : null}
        </div>

        <div className="pt-0.5">
          <div className="flex items-start gap-3">
            <span className="relative mt-0.5 inline-flex size-4 shrink-0 items-center justify-center">
              <input
                id="register-acceptedPolicies"
                name="acceptedPolicies"
                type="checkbox"
                checked={values.acceptedPolicies}
                disabled={isSubmitting}
                onChange={(event) => updateField("acceptedPolicies", event.target.checked)}
                aria-invalid={Boolean(errors.acceptedPolicies)}
                aria-describedby={
                  errors.acceptedPolicies ? "register-acceptedPolicies-error" : undefined
                }
                className="peer size-4 cursor-pointer appearance-none rounded-xs border border-brand-clay/80 bg-card transition-colors checked:border-brand-forest checked:bg-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Check
                aria-hidden="true"
                className="pointer-events-none absolute size-3 text-brand-ivory opacity-0 transition-opacity peer-checked:opacity-100"
              />
            </span>
            <label
              htmlFor="register-acceptedPolicies"
              className="cursor-pointer text-xs leading-5 text-muted-foreground"
            >
              I agree to the{" "}
              <Link
                to="/terms"
                className="font-medium text-brand-charcoal underline underline-offset-4 transition-colors hover:text-brand-forest"
              >
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
                className="font-medium text-brand-charcoal underline underline-offset-4 transition-colors hover:text-brand-forest"
              >
                Privacy Policy
              </Link>
              .
            </label>
          </div>
          {errors.acceptedPolicies ? (
            <p
              id="register-acceptedPolicies-error"
              role="alert"
              className="mt-1.5 pl-7 text-xs text-brand-terracotta"
            >
              {errors.acceptedPolicies}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-sm bg-brand-forest font-display text-xs font-medium tracking-[0.06em] text-brand-ivory shadow-none transition-colors hover:bg-brand-forest/90"
        >
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Creating your account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <div className="mt-5 border-t border-border/80 pt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/account/login"
            className="font-display text-xs font-semibold text-brand-forest underline-offset-4 transition-colors hover:underline"
          >
            Sign in
          </a>
        </p>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Protected under our{" "}
          <Link to="/privacy-policy" className="transition-colors hover:text-brand-charcoal">
            Privacy Policy
          </Link>{" "}
          <span aria-hidden="true">&middot;</span>{" "}
          <Link to="/terms" className="transition-colors hover:text-brand-charcoal">
            Terms &amp; Conditions
          </Link>
        </p>
      </div>
    </div>
  );
}
