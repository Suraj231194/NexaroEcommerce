"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  categories,
  filterProducts,
  getBrandsByCategory,
  getPriceRange,
} from "../../../data/products.js";
import { ProductGrid } from "../../../components/products/ProductGrid.jsx";
import { FilterSidebar } from "../../../components/products/FilterSidebar.jsx";
import { AppliedFiltersChips } from "../../../components/products/AppliedFiltersChips.jsx";
import { SortSelect } from "../../../components/products/SortSelect.jsx";
import { Button } from "../../../components/ui/button.jsx";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;
  const category = categories.find((item) => item.slug === slug);

  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState({
    brands: [],
    subcategories: [],
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined,
  });

  const toggleSubcategory = (subcategory) => {
    setFilters((current) => {
      const selected = current.subcategories || [];
      const exists = selected.includes(subcategory);
      return {
        ...current,
        subcategories: exists
          ? selected.filter((item) => item !== subcategory)
          : [...selected, subcategory],
      };
    });
  };

  const clearSubcategoryChips = () =>
    setFilters((current) => ({
      ...current,
      subcategories: [],
    }));

  const clearFilters = () =>
    setFilters({
      brands: [],
      subcategories: [],
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
    });

  const brands = useMemo(() => getBrandsByCategory(slug), [slug]);
  const priceRange = useMemo(() => getPriceRange(slug), [slug]);

  const products = useMemo(() => {
    const selectedSort = sortBy === "relevance" ? undefined : sortBy;
    return filterProducts(slug, filters, selectedSort);
  }, [slug, filters, sortBy]);

  if (!category) {
    return (
      <div className="container-shell py-16 text-center">
        <h1 className="text-4xl font-semibold">Category Not Found</h1>
        <p className="mt-3 text-muted-foreground">
          We could not locate this category.
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </Button>
      </div>
    );
  }

  const hasActiveFilters =
    (filters.brands?.length || 0) > 0 ||
    (filters.subcategories?.length || 0) > 0 ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.minRating !== undefined;

  return (
    <div className="pb-12 pt-8">
      <div className="container-shell">
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <Link href="/" className="focus-ring hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">{category.name}</span>
          </div>

          <div className="surface-card p-5 md:p-6">
            <h1 className="text-3xl font-semibold md:text-4xl">{category.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              {category.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-secondary px-3 py-1">{products.length} products</span>
              <button
                type="button"
                onClick={clearSubcategoryChips}
                className={`focus-ring rounded-full border px-3 py-1 transition ${
                  (filters.subcategories || []).length === 0
                    ? "border-primary/40 bg-primary/10 font-semibold text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
                }`}
              >
                All
              </button>
              {(category.subcategories || []).map((subcategory) => (
                <button
                  type="button"
                  key={subcategory}
                  onClick={() => toggleSubcategory(subcategory)}
                  className={`focus-ring rounded-full border px-3 py-1 transition ${
                    (filters.subcategories || []).includes(subcategory)
                      ? "border-primary/40 bg-primary/10 font-semibold text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {subcategory}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{products.length} results</span>
            {hasActiveFilters && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">Filtered</span>}
          </div>
          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>

        <AppliedFiltersChips
          filters={filters}
          priceRange={priceRange}
          onChange={setFilters}
          onClearAll={clearFilters}
        />

        <div className="flex flex-col gap-6 lg:flex-row">
          <FilterSidebar
            brands={brands}
            subcategories={category.subcategories || []}
            priceRange={priceRange}
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={clearFilters}
          />
          <div className="min-w-0 flex-1">
            <ProductGrid products={products} columns={4} />
          </div>
        </div>
      </div>
    </div>
  );
}
