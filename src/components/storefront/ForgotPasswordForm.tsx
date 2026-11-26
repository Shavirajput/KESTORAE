import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, Check, Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateForgotPasswordEmail } from "@/lib/account-registration";

const RESEND_COOLDOWN_SECONDS = 30;

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [resendCount, setResendCount] = useState(0);
  const [cooldown, setCooldown] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

  const handleEmailChange = (nextValue: string) => {
    setEmail(nextValue);
    if (touched || error) {
      const result = validateForgotPasswordEmail(nextValue);
      setError(result.valid ? null : result.error);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    const result = validateForgotPasswordEmail(email);
    setError(result.valid ? null : result.error);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setTouched(true);
    const result = validateForgotPasswordEmail(email);

    if (!result.valid) {
      setError(result.error);
      inputRef.current?.focus();
      return;
    }

    setError(null);
    setIsSubmitting(true);

    // Frontend-only mock reset flow: never persist email or tokens to browser storage.
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedEmail(result.normalizedEmail);
      setCooldown(RESEND_COOLDOWN_SECONDS);
    }, 600);
  };

  const handleResend = () => {
    if (cooldown > 0 || isSubmitting || !submittedEmail) return;
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setResendCount((count) => count + 1);
      setCooldown(RESEND_COOLDOWN_SECONDS);
    }, 450);
  };

  const handleResetFlow = () => {
    setSubmittedEmail(null);
    setEmail("");
    setError(null);
    setTouched(false);
    setResendCount(0);
    setCooldown(0);
  };

  if (submittedEmail) {
    return (
      <div role="status" aria-live="polite" className="border-t border-border/80 pt-7">
        <div className="inline-flex size-10 items-center justify-center rounded-sm bg-brand-forest text-brand-ivory">
          <Check aria-hidden="true" className="size-5" />
        </div>

        <p className="mt-5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-olive">
          Reset Link Sent
        </p>
        <h1 className="mt-2 font-display text-2xl font-medium tracking-[-0.02em] text-brand-charcoal sm:text-[1.75rem]">
          Check your inbox
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          If an account is associated with{" "}
          <span className="font-medium text-brand-charcoal">{submittedEmail}</span>, we&apos;ve sent
          a secure link to reset your password. The link expires in 30 minutes.
        </p>

        {resendCount > 0 ? (
          <p className="mt-3 text-xs font-medium text-brand-forest">
            A fresh reset link has been sent to {submittedEmail}.
          </p>
        ) : null}

        <div className="mt-6 border-y border-border/80 py-4 text-xs leading-5 text-muted-foreground">
          <p>
            Don&apos;t see the email? Check your spam or promotions folder, or request a new link
            below.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0 || isSubmitting}
            className="h-11 flex-1 rounded-sm bg-brand-forest font-display text-xs font-medium tracking-[0.04em] text-brand-ivory shadow-none hover:bg-brand-forest/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                Sending...
              </>
            ) : cooldown > 0 ? (
              `Resend link in ${cooldown}s`
            ) : (
              "Resend Reset Link"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleResetFlow}
            className="h-11 flex-1 rounded-sm border-brand-clay/80 bg-transparent font-display text-xs font-medium text-brand-charcoal shadow-none hover:bg-brand-sand/50"
          >
            Use Different Email
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <a
            href="/account/login"
            className="inline-flex items-center gap-1.5 font-display font-semibold text-brand-forest underline-offset-4 transition-colors hover:underline"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            Return to Sign in
          </a>
          <span aria-hidden="true">&middot;</span>
          <Link to="/account/register" className="transition-colors hover:text-brand-charcoal">
            Create an account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-medium tracking-[-0.02em] text-brand-charcoal sm:text-[1.75rem]">
          Forgot your password?
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Enter the email address associated with your Kestorae account and we&apos;ll send a link
          to reset your password.
        </p>
      </div>

      {error ? (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2.5 rounded-sm border border-brand-terracotta/50 bg-brand-terracotta/8 px-3.5 py-2.5 text-xs leading-5 text-brand-charcoal"
        >
          <AlertCircle
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-brand-terracotta"
          />
          <span>{error}</span>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate aria-busy={isSubmitting} className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="forgot-email"
            className="block font-display text-xs font-medium text-brand-charcoal"
          >
            Email Address <span className="text-brand-terracotta">*</span>
          </label>
          <div className="relative mt-1.5">
            <Input
              ref={inputRef}
              id="forgot-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              autoCapitalize="none"
              spellCheck={false}
              required
              disabled={isSubmitting}
              value={email}
              onChange={(event) => handleEmailChange(event.target.value)}
              onBlur={handleBlur}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "forgot-email-error" : "forgot-email-hint"}
              placeholder="astrid@example.com"
              className={`h-11 rounded-sm bg-card pl-3.5 pr-10 text-sm shadow-none focus-visible:ring-1 md:h-10 ${
                error
                  ? "border-brand-terracotta focus-visible:ring-brand-terracotta"
                  : "border-brand-clay/65 focus-visible:border-brand-forest focus-visible:ring-brand-forest"
              }`}
            />
            <Mail
              aria-hidden="true"
              className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/70"
            />
          </div>
          {error ? (
            <p
              id="forgot-email-error"
              role="alert"
              className="mt-1.5 text-xs text-brand-terracotta"
            >
              {error}
            </p>
          ) : (
            <p id="forgot-email-hint" className="mt-1.5 text-xs text-muted-foreground">
              For your privacy, we&apos;ll confirm submission without disclosing whether an email is
              registered.
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-sm bg-brand-forest font-display text-xs font-medium tracking-[0.06em] text-brand-ivory shadow-none transition-colors hover:bg-brand-forest/90"
        >
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending reset link...
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </form>

      <div className="mt-7 border-t border-border/80 pt-5 text-center">
        <p className="text-sm text-muted-foreground">
          Remembered your password?{" "}
          <a
            href="/account/login"
            className="font-display text-xs font-semibold text-brand-forest underline-offset-4 transition-colors hover:underline"
          >
            Sign in
          </a>
        </p>
        <p className="mt-2.5 text-xs text-muted-foreground">
          New to Kestorae?{" "}
          <Link
            to="/account/register"
            className="font-medium text-brand-charcoal underline-offset-4 transition-colors hover:text-brand-forest hover:underline"
          >
            Create an account
          </Link>{" "}
          <span aria-hidden="true">&middot;</span>{" "}
          <Link to="/support" className="transition-colors hover:text-brand-charcoal">
            Customer Care
          </Link>
        </p>
      </div>
    </div>
  );
}
