import { X } from "lucide-react";
import { cn } from "../../lib/utils.js";
import { formatCurrency } from "../../lib/formatters.js";
import { Button } from "../ui/button.jsx";

export function AppliedFiltersChips({
  filters,
  priceRange,
  onChange,
  onClearAll,
  className,
}) {
  const chips = [];

  (filters?.brands || []).forEach((brand) => {
    chips.push({
      id: `brand-${brand}`,
      label: brand,
      onRemove: () =>
        onChange?.({
          ...filters,
          brands: (filters.brands || []).filter((item) => item !== brand),
        }),
    });
  });

  (filters?.subcategories || []).forEach((subcategory) => {
    chips.push({
      id: `subcategory-${subcategory}`,
      label: subcategory,
      onRemove: () =>
        onChange?.({
          ...filters,
          subcategories: (filters.subcategories || []).filter((item) => item !== subcategory),
        }),
    });
  });

  if (filters?.minRating !== undefined) {
    chips.push({
      id: `rating-${filters.minRating}`,
      label: `${filters.minRating} stars & up`,
      onRemove: () =>
        onChange?.({
          ...filters,
          minRating: undefined,
        }),
    });
  }

  if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
    const min = filters.minPrice ?? priceRange?.min ?? 0;
    const max = filters.maxPrice ?? priceRange?.max ?? 0;
    chips.push({
      id: "price-range",
      label: `${formatCurrency(min)} - ${formatCurrency(max)}`,
      onRemove: () =>
        onChange?.({
          ...filters,
          minPrice: undefined,
          maxPrice: undefined,
        }),
    });
  }

  if (!chips.length) {
    return null;
  }

  return (
    <div className={cn("mb-4 flex flex-wrap items-center gap-2", className)}>
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={chip.onRemove}
          className="focus-ring inline-flex items-center gap-1 rounded-full border border-border/80 bg-background px-3 py-1 text-xs font-medium transition hover:border-primary/40 hover:text-primary"
        >
          {chip.label}
          <X className="h-3.5 w-3.5" />
        </button>
      ))}

      {onClearAll && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 rounded-full text-xs"
          onClick={onClearAll}
        >
          Clear all
        </Button>
      )}
    </div>
  );
}

