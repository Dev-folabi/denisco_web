"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { SITE } from "@/lib/constants";
import { ShoppingBasket, Eye } from "lucide-react";
import { MoneyFromKobo } from "@/lib/utils/format";

const ALL_CATEGORIES = [
  { slug: "", label: "All Products" },
  ...SITE.categories,
];

const SORT_OPTIONS = [
  { value: "featured", label: "Sort: Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "",
  );
  const [sortBy, setSortBy] = useState("featured");

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

      <section className="px-6 py-24 max-sm:py-16">
        <div className="container">
          {/* Toolbar */}
          <div className="mb-[30px] flex flex-wrap items-center justify-between gap-5">
            <div className="flex flex-wrap gap-2.5">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`rounded-full border-[1.5px] px-5 py-2.5 text-[13px] font-bold transition-colors ${
                    activeCategory === cat.slug
                      ? "border-forest bg-forest text-white"
                      : "border-line bg-white text-ink hover:border-forest"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[11px] text-sm"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <p className="mb-[18px] text-[13px] text-muted">
            Showing products — data will load from API when backend is connected.
          </p>

          {/* Product grid placeholder */}
          <div className="grid grid-cols-4 gap-7 max-[1024px]:grid-cols-2 max-sm:grid-cols-1">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex flex-col">
                <div className="relative h-[210px] overflow-hidden rounded-[18px] bg-cream-deep shadow-[var(--shadow-default)]">
                  <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/90 px-3 py-[5px] text-[10.5px] font-extrabold uppercase tracking-[.3px] text-forest">
                    Category
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-badge-green-bg px-[11px] py-[5px] text-[10.5px] font-extrabold text-badge-green-text">
                    In Stock
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-1 pt-[22px]">
                  <h4 className="mb-1.5 text-[16.5px] font-semibold">
                    Product Name
                  </h4>
                  <p className="mb-3.5 flex-1 text-[12.8px] text-muted">
                    Product description placeholder text here...
                  </p>
                  <p className="mb-3.5 text-[11.5px] uppercase tracking-[.4px] text-muted">
                    ₦0 / unit
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href="/shop/product"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-forest bg-transparent px-2 py-[11px] text-[12.5px] font-bold text-forest transition-all hover:bg-forest hover:text-white"
                    >
                      <Eye size={14} /> Details
                    </Link>
                    <button
                      type="button"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-forest px-2 py-[11px] text-[12.5px] font-bold text-white transition-all hover:bg-olive"
                    >
                      <ShoppingBasket size={14} /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {false && (
            <div className="col-span-full py-20 text-center">
              <ShoppingBasket
                size={48}
                className="mx-auto mb-[18px] text-olive-light"
              />
              <h3 className="mb-2">No Products Found</h3>
              <p className="mx-auto mb-[22px] max-w-[400px] text-muted">
                Try adjusting your filters or browse all products.
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory("")}
                className="rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}
