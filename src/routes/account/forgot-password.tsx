import { createFileRoute, Link } from "@tanstack/react-router";

import livingSanctuary from "@/assets/images/room_living_sanctuary_1795589414829.jpg";
import { ForgotPasswordForm } from "@/components/storefront/ForgotPasswordForm";
import { storefrontHead } from "@/lib/storefront-meta";

export const Route = createFileRoute("/account/forgot-password")({
  head: () =>
    storefrontHead({
      title: "Forgot Password",
      description:
        "Reset your Kestorae account password with a secure reset link sent to your email address.",
      path: "/account/forgot-password",
    }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <main className="flex-1 bg-brand-ivory">
      <section
        aria-label="Reset your Kestorae password"
        className="grid min-h-[calc(100vh-7.5rem)] grid-cols-1 items-stretch md:grid-cols-[0.72fr_1.28fr] lg:grid-cols-2"
      >
        <div className="relative min-h-[15rem] overflow-hidden bg-brand-sand sm:min-h-[18rem] md:min-h-full">
          <img
            src={livingSanctuary}
            alt="Quiet Scandinavian living corner with a natural oak armchair, linen curtains, and woven rug in soft daylight"
            width={1600}
            height={1067}
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/28 to-black/10"
          />

          <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8 md:p-7 lg:p-11 xl:p-12">
            <div className="max-w-md text-brand-ivory">
              <p className="font-display text-[11px] font-medium uppercase tracking-[0.16em] text-brand-sand">
                Kestorae Studio
              </p>
              <h2 className="mt-2 font-display text-2xl font-medium leading-[1.2] tracking-[-0.02em] text-brand-ivory md:text-[1.45rem] lg:text-[2.1rem] xl:text-[2.25rem]">
                Make Room for Considered Living.
              </h2>
              <p className="mt-2.5 text-sm leading-6 text-brand-ivory/90 lg:text-[15px] lg:leading-6">
                Enter your email address and we&apos;ll send quiet instructions to help you get back
                into your account.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-brand-ivory px-5 py-8 sm:px-10 sm:py-10 md:px-9 md:py-8 lg:px-14 lg:py-8 xl:px-20">
          <div className="mx-auto w-full max-w-[440px]">
            <Link
              to="/"
              aria-label="Kestorae home"
              className="mb-5 inline-block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest"
            >
              <img
                src="/assets/aistudio/KESTORAE_f8485794.png"
                alt="Kestorae — Home & Lifestyle"
                width={2172}
                height={724}
                className="-ml-4 h-10 w-auto object-contain brightness-[1.08] contrast-[1.1] mix-blend-multiply sm:h-11"
              />
            </Link>

            <ForgotPasswordForm />
          </div>
        </div>
      </section>
    </main>
  );
}
