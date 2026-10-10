"use client";

import { ProductCard } from "@/components/product/product-card";
import { useProducts } from "@/features/products/hooks";
import type { Product } from "@/features/products/types";
import { useAddToCartAction } from "@/features/cart/use-add-to-cart";

/** How many products the home page's featured grid shows. */
export const FEATURED_LIMIT = 4;

/**
 * The home page's featured grid.
 *
 * The home page renders on the server and hands the products down, so the
 * grid is in the HTML a crawler sees. The query then refetches on mount to
 * pick up stock changes; the skeleton below is only reached when the server
 * render had nothing — the API was unreachable while the page was built.
 */
export function FeaturedProducts({
  initialProducts,
}: {
  initialProducts?: Product[];
}) {
  const { data, isPending } = useProducts(
    { featured: true, limit: FEATURED_LIMIT },
    initialProducts ? { data: initialProducts } : undefined,
  );
  const { addToCart } = useAddToCartAction();

  const products = data?.data ?? [];

  if (isPending) {
    return (
      <div className="grid grid-4 gap-7">
        {Array.from({ length: FEATURED_LIMIT }).map((_, index) => (
          <div key={index} className="flex flex-col">
            <div className="h-[210px] rounded-[18px] bg-white/60 shadow-[var(--shadow-default)]" />
            <div className="px-1 pt-[22px]">
              <div className="mb-1.5 h-5 w-3/4 rounded bg-white/60" />
              <div className="mb-3.5 h-3 w-full rounded bg-white/60" />
              <div className="h-4 w-1/2 rounded bg-white/60" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-sm text-white/70">
        Our featured products will appear here shortly.
      </p>
    );
  }

  return (
    <div className="grid grid-4 gap-7">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={(item) => addToCart(item.id, 1, item.name)}
        />
      ))}
    </div>
  );
}
