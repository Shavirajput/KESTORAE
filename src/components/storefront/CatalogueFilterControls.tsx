import { useEffect, useState } from "react";
import { ArrowRight, Check, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { rooms } from "@/data/storefront";
import type { Product } from "@/data/catalogue";
import type { SortOption } from "@/lib/storefront-logic";

const PRICE_TIERS = [
  { label: "All prices", value: null },
  { label: "Under £50", value: 50 },
  { label: "Under £100", value: 100 },
  { label: "Under £150", value: 150 },
] as const;

const SORT_LABELS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
];

type CatalogueFilterControlsProps = {
  allItems: readonly Product[];
  filteredCount: number;
  selectedRoom: string | null;
  onSelectRoom?: (roomSlug: string | null) => void;
  selectedCategories: readonly string[];
  onToggleCategory: (category: string) => void;
  maxPrice: number | null;
  onSelectMaxPrice: (price: number | null) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onClearAll: () => void;
  hideRoomFilter?: boolean;
};

export function CatalogueFilterControls({
  allItems,
  filteredCount,
  selectedRoom,
  onSelectRoom,
  selectedCategories,
  onToggleCategory,
  maxPrice,
  onSelectMaxPrice,
  sort,
  onSortChange,
  onClearAll,
  hideRoomFilter = false,
}: CatalogueFilterControlsProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const availableCategories = Array.from(new Set(allItems.map((item) => item.category)));
  const activeFilterCount =
    (selectedRoom ? 1 : 0) + selectedCategories.length + (maxPrice !== null ? 1 : 0);

  useEffect(() => {
    if (!drawerOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [drawerOpen]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border/80 py-3.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-controls="collection-filter-drawer"
            className="h-9 rounded-sm border-border bg-background font-display text-xs font-medium text-brand-charcoal hover:border-brand-forest hover:bg-brand-sand/50 hover:text-brand-charcoal"
          >
            <SlidersHorizontal aria-hidden="true" className="size-3.5 text-brand-forest" />
            Refine
            {activeFilterCount > 0 ? (
              <span className="ml-1 inline-flex size-5 items-center justify-center rounded-full bg-brand-forest text-[10px] font-semibold tabular-nums text-brand-ivory">
                {activeFilterCount}
              </span>
            ) : null}
          </Button>

          <p className="text-xs text-muted-foreground tabular-nums" aria-live="polite">
            Showing <span className="font-medium text-brand-charcoal">{filteredCount}</span> of{" "}
            {allItems.length} {allItems.length === 1 ? "piece" : "pieces"}
          </p>

          {activeFilterCount > 0 ? (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs font-medium text-brand-forest underline underline-offset-4 transition-colors hover:text-brand-charcoal"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="catalogue-sort"
            className="font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground"
          >
            Sort
          </label>
          <select
            id="catalogue-sort"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className="h-9 rounded-sm border border-border bg-background px-3 text-xs font-medium text-brand-charcoal focus:border-brand-forest focus:outline-none"
          >
            {SORT_LABELS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {activeFilterCount > 0 ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Applied:
          </span>
          {selectedRoom && onSelectRoom ? (
            <button
              type="button"
              onClick={() => onSelectRoom(null)}
              className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-brand-sand/50 px-2.5 py-1 text-brand-charcoal transition-colors hover:border-brand-forest"
            >
              {rooms.find((r) => r.slug === selectedRoom)?.title ?? selectedRoom}
              <X aria-hidden="true" className="size-3" />
            </button>
          ) : null}
          {selectedCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onToggleCategory(category)}
              className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-brand-sand/50 px-2.5 py-1 text-brand-charcoal transition-colors hover:border-brand-forest"
            >
              {category}
              <X aria-hidden="true" className="size-3" />
            </button>
          ))}
          {maxPrice !== null ? (
            <button
              type="button"
              onClick={() => onSelectMaxPrice(null)}
              className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-brand-sand/50 px-2.5 py-1 text-brand-charcoal transition-colors hover:border-brand-forest"
            >
              Under £{maxPrice}
              <X aria-hidden="true" className="size-3" />
            </button>
          ) : null}
        </div>
      ) : null}

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            aria-hidden="true"
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-brand-charcoal/35 backdrop-blur-[2px]"
          />
          <aside
            id="collection-filter-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Refine collection"
            className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal aria-hidden="true" className="size-4 text-brand-forest" />
                <h2 className="font-display text-sm font-semibold text-brand-charcoal">
                  Refine Collection
                </h2>
                <span className="rounded-sm bg-brand-sand/70 px-2 py-0.5 text-[11px] font-medium tabular-nums text-brand-charcoal">
                  {filteredCount} {filteredCount === 1 ? "Item" : "Items"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {activeFilterCount > 0 ? (
                  <button
                    type="button"
                    onClick={onClearAll}
                    className="text-xs text-muted-foreground transition-colors hover:text-brand-forest"
                  >
                    Reset
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close refine drawer"
                  className="rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-brand-sand/60 hover:text-brand-charcoal"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
              {!hideRoomFilter && onSelectRoom ? (
                <section aria-labelledby="filter-room-heading">
                  <div className="flex items-baseline justify-between">
                    <h3
                      id="filter-room-heading"
                      className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-olive"
                    >
                      1. Spatial Archetype
                    </h3>
                    <span className="text-[11px] text-muted-foreground">Single select</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {rooms.map((room) => {
                      const count = allItems.filter((item) =>
                        item.rooms.includes(room.slug),
                      ).length;
                      const active = selectedRoom === room.slug;
                      return (
                        <button
                          key={room.slug}
                          type="button"
                          onClick={() => onSelectRoom(active ? null : room.slug)}
                          aria-pressed={active}
                          className={`inline-flex items-center gap-1.5 rounded-sm border px-3 py-2 font-display text-xs font-medium transition-colors ${
                            active
                              ? "border-brand-forest bg-brand-forest text-brand-ivory"
                              : "border-border bg-brand-sand/35 text-brand-charcoal hover:border-brand-forest/60"
                          }`}
                        >
                          {room.title}
                          <span
                            className={`text-[10px] tabular-nums ${
                              active ? "text-brand-sand" : "text-muted-foreground"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              ) : null}

              <section aria-labelledby="filter-category-heading">
                <div className="flex items-baseline justify-between">
                  <h3
                    id="filter-category-heading"
                    className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-olive"
                  >
                    {hideRoomFilter ? "1. Category" : "2. Category"}
                  </h3>
                  {selectedCategories.length > 0 ? (
                    <span className="text-[11px] text-muted-foreground">
                      {selectedCategories.length} active
                    </span>
                  ) : null}
                </div>
                <ul className="mt-3 space-y-2">
                  {availableCategories.map((category) => {
                    const checked = selectedCategories.includes(category);
                    const count = allItems.filter((item) => item.category === category).length;
                    return (
                      <li key={category}>
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          onClick={() => onToggleCategory(category)}
                          className={`flex w-full items-center justify-between rounded-sm border px-3.5 py-2.5 text-left transition-colors ${
                            checked
                              ? "border-brand-forest bg-brand-sand/35"
                              : "border-border bg-background hover:border-brand-clay"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`flex size-4 items-center justify-center rounded-[3px] border transition-colors ${
                                checked
                                  ? "border-brand-forest bg-brand-forest text-brand-ivory"
                                  : "border-brand-clay bg-background"
                              }`}
                            >
                              {checked ? <Check aria-hidden="true" className="size-3" /> : null}
                            </span>
                            <span className="text-xs font-medium text-brand-charcoal">
                              {category}
                            </span>
                          </span>
                          <span className="text-xs tabular-nums text-muted-foreground">
                            {count}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section aria-labelledby="filter-price-heading">
                <h3
                  id="filter-price-heading"
                  className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-olive"
                >
                  {hideRoomFilter ? "2. Price Range" : "3. Price Range"}
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {PRICE_TIERS.map((tier) => {
                    const active = maxPrice === tier.value;
                    return (
                      <button
                        key={tier.label}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onSelectMaxPrice(tier.value)}
                        className={`rounded-sm border px-3 py-2 text-xs font-medium transition-colors ${
                          active
                            ? "border-brand-forest bg-brand-forest text-brand-ivory"
                            : "border-border bg-background text-brand-charcoal hover:border-brand-forest/60"
                        }`}
                      >
                        {tier.label}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border bg-brand-ivory px-6 py-4">
              <button
                type="button"
                onClick={onClearAll}
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-brand-charcoal"
              >
                Clear All
              </button>
              <Button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="h-10 rounded-sm bg-brand-forest px-5 font-display text-xs font-medium text-brand-ivory hover:bg-brand-forest/90"
              >
                Show {filteredCount} Matching {filteredCount === 1 ? "Piece" : "Pieces"}
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Button>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
