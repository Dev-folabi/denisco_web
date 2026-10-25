"use client";

import { useState } from "react";
import { Loader2, ShoppingBasket, TriangleAlert } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CategoryFilter } from "@/components/product/category-filter";
import { SortDropdown } from "@/components/product/sort-dropdown";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { useCategories, useProducts } from "@/features/products/hooks";
import type { Category, Product, ProductSort } from "@/features/products/types";
import { useAddToCartAction } from "@/features/cart/use-add-to-cart";

const SORT_OPTIONS = [
  { value: "featured", label: "Sort: Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A-Z" },
];

// Within the Spices & Nutrition category the shop shows two titled sections,
// one per brand range. The brand is read from the product name's prefix, since
// the product model carries no brand field.
const SPICE_BRANDS = [
  { prefix: "AROMACRAFT", title: "AROMACRAFT (100g)" },
  { prefix: "ROYAL LUSH", title: "ROYAL LUSH (100g)" },
];

interface ProductSection {
  title: string | null;
  items: Product[];
}

/** Splits the Spices & Nutrition category into its two brand sections; every
 *  other view is a single untitled section. */
function buildSections(
  category: string,
  products: Product[],
): ProductSection[] {
  if (category !== "spices") {
    return [{ title: null, items: products }];
  }

  const matched = new Set<string>();
  const sections: ProductSection[] = SPICE_BRANDS.map((brand) => {
    const items = products.filter((product) => {
      const hit = product.name.toUpperCase().startsWith(brand.prefix);
      if (hit) matched.add(product.id);
      return hit;
    });
    return { title: brand.title, items };
  });

  const rest = products.filter((product) => !matched.has(product.id));
  if (rest.length) {
    sections.push({ title: "More Spices & Nutrition", items: rest });
  }

  return sections.filter((section) => section.items.length > 0);
}

interface ShopContentProps {
  initialSearch?: string;
  initialCategory?: string;
  /** The grid as the server rendered it, for the first paint. */
  initialProducts?: { data: Product[]; meta?: { total: number } };
  initialCategories?: Category[];
}

export function ShopContent({
  initialSearch = "",
  initialCategory = "",
  initialProducts,
  initialCategories,
}: ShopContentProps) {
  const search = initialSearch;
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<ProductSort>("featured");

  // The server data belongs to the filters the page was requested with. Once
  // the visitor changes a chip or the sort order, the query key changes and
  // the initial data no longer applies — which is exactly what should happen.
  const isInitialView = activeCategory === initialCategory && sortBy === "featured";

  // Filtering and sorting run on the server so the shop never has to load the
  // whole catalogue to show one category.
  const { data: categories } = useCategories(initialCategories);
  const { data, isPending, isError, refetch } = useProducts(
    {
      category: activeCategory || undefined,
      search: search || undefined,
      sort: sortBy,
      limit: 100,
    },
    isInitialView ? initialProducts : undefined,
  );

  const { addToCart } = useAddToCartAction();

  const products = data?.data ?? [];
  const total = data?.meta?.total ?? products.length;

  const categoryChips = [
    { slug: "", label: "All Products" },
    ...(categories ?? []).map((category) => ({
      slug: category.slug,
      label: category.name,
    })),
  ];

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
              categories={categoryChips}
              active={activeCategory}
              onChange={setActiveCategory}
            />
            <SortDropdown
              options={SORT_OPTIONS}
              value={sortBy}
              onChange={(value) => setSortBy(value as ProductSort)}
            />
          </div>

          <p className="results-count">
            {isPending
              ? "Loading products…"
              : `${total} product${total !== 1 ? "s" : ""} found`}{" "}
            {search && (
              <>
                for &quot;
                <strong>{search}</strong>&quot;
              </>
            )}
          </p>

          {isPending ? (
            <div className="flex min-h-[240px] items-center justify-center">
              <Loader2
                size={28}
                className="animate-spin text-olive"
                aria-label="Loading products"
              />
            </div>
          ) : isError ? (
            <div className="empty-state">
              <TriangleAlert size={48} className="empty-icon" />
              <h3>Could not load products</h3>
              <p>Please check your connection and try again.</p>
              <Button variant="outline" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          ) : products.length ? (
            <div id="shop-grid">
              {buildSections(activeCategory, products).map((section) => (
                <div key={section.title ?? "all"} className="shop-section">
                  {section.title && (
                    <h3 className="shop-section-title">{section.title}</h3>
                  )}
                  <ProductGrid>
                    {section.items.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={(item) =>
                          addToCart(item.id, 1, item.name)
                        }
                      />
                    ))}
                  </ProductGrid>
                </div>
              ))}
            </div>
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
        </div>
      </section>
    </>
  );
}
