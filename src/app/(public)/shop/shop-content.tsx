"use client";

import { useState } from "react";
import { ShoppingBasket } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CategoryFilter } from "@/components/product/category-filter";
import { SortDropdown } from "@/components/product/sort-dropdown";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductCard, type Product } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

const ALL_CATEGORIES = [
  { slug: "", label: "All Products" },
  ...SITE.categories,
];

const SORT_OPTIONS = [
  { value: "featured", label: "Sort: Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A-Z" },
];

interface ShopContentProps {
  initialSearch?: string;
  initialCategory?: string;
}

export function ShopContent({
  initialSearch = "",
  initialCategory = "",
}: ShopContentProps) {
  const search = initialSearch;
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("featured");

  const products: Product[] = [];
  const list = products.filter((product) => {
    const matchCat = !activeCategory || product.category === activeCategory;
    const matchSearch = search
      ? product.name.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchCat && matchSearch;
  });

  if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
  if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));

  const clearFilters = () => {
    setActiveCategory("");
    setSortBy("featured");
  };

  return (
    <>
      <PageHero
        title="Farm Products Shop"
        description="Order quality poultry, livestock, piggery, snail and crop produce directly from our farm."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
      />

      <section className="section section-white" style={{ paddingTop: 50 }}>
        <div className="container">
          <div className="shop-toolbar">
            <CategoryFilter
              categories={ALL_CATEGORIES}
              active={activeCategory}
              onChange={setActiveCategory}
            />
            <SortDropdown
              options={SORT_OPTIONS}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>

          <p className="results-count">
            {list.length} product{list.length !== 1 ? "s" : ""} found{" "}
            {search && (
              <>
                for &quot;
                <strong>{search}</strong>&quot;
              </>
            )}
          </p>

          <ProductGrid id="shop-grid">
            {list.length ? (
              list.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="empty-state">
                <ShoppingBasket size={48} className="empty-icon" />
                <h3>No products found</h3>
                <p>
                  Try adjusting your search or filters to find what you are
                  looking for.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </ProductGrid>
        </div>
      </section>
    </>
  );
}
