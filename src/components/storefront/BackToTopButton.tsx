import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { useCart } from "@/components/storefront/CartContext";

const SCROLL_THRESHOLD_PX = 360;

export function BackToTopButton() {
  const [scrolledPast, setScrolledPast] = useState(false);
  const { lastAdded } = useCart();

  useEffect(() => {
    const updateVisibility = () => {
      setScrolledPast(window.scrollY > SCROLL_THRESHOLD_PX);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  const visible = scrolledPast && !lastAdded;

  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="Back to top"
      title="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 inline-flex size-11 cursor-pointer items-center justify-center rounded-sm border border-brand-clay/75 bg-brand-ivory/95 text-brand-charcoal shadow-sm backdrop-blur-xs transition-all duration-200 hover:border-brand-forest hover:bg-brand-forest hover:text-brand-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp aria-hidden="true" className="size-4" />
    </button>
  );
}
