import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { CircleCheck, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/components/storefront/CartContext";

export function AddedToBagToast() {
  const { lastAdded, dismissLastAdded } = useCart();
  const [visible, setVisible] = useState(false);
  const timer = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!lastAdded) {
      setVisible(false);
      return;
    }
    setVisible(true);
    timer.current = window.setTimeout(() => setVisible(false), 4000);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [lastAdded]);

  if (!lastAdded) return null;

  const handleClose = () => {
    setVisible(false);
    dismissLastAdded();
  };

  return (
    <aside
      aria-live="polite"
      className={`fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-sm border border-border bg-background p-4 shadow-lg transition-all duration-300 motion-reduce:transition-none sm:bottom-6 sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <div className="flex items-start gap-3">
        <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-forest" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-medium text-brand-charcoal">Added to your bag</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{lastAdded.name}</p>
          <div className="mt-3 flex gap-2">
            <Button asChild size="sm">
              <Link to="/cart" onClick={handleClose}>
                View bag
              </Link>
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                handleClose();
                void navigate({ to: "/checkout" });
              }}
            >
              Checkout
            </Button>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Dismiss notification"
          className="-mr-2 -mt-2 size-8"
          onClick={handleClose}
        >
          <X aria-hidden="true" />
        </Button>
      </div>
    </aside>
  );
}
