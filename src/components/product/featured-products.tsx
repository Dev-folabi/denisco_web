"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import { useProducts } from "@/features/products/hooks";
import type { Product } from "@/features/products/types";
import { useAddToCartAction } from "@/features/cart/use-add-to-cart";
import { SITE } from "@/lib/constants";

/** How often the featured grid rotates its random pick, in milliseconds. */
const ROTATE_MS = 5000;

/** The listing params the home page and this grid share, so TanStack Query
 *  reuses the server-rendered copy as initial data instead of refetching a
 *  different key. */
export const FEATURED_QUERY = { limit: 100 } as const;

/**
 * The home page's featured grid.
 *
 * It shows one product per category — chosen at random — and re-rolls the
 * choice every five seconds. The first render (server and first client paint)
 * is deterministic (the first product in each category) so hydration matches;
 * randomisation starts only after mount.
 *
 * The home page renders on the server and hands the full catalogue down, so
 * the grid is in the HTML a crawler sees. The query then refetches on mount to
 * pick up stock changes.
 */
export function FeaturedProducts({
  initialProducts,
}: {
  initialProducts?: Product[];
}) {
  const { data, isPending } = useProducts(
    FEATURED_QUERY,
    initialProducts ? { data: initialProducts } : undefined,
  );
  const { addToCart } = useAddToCartAction();

  const products = useMemo(() => data?.data ?? [], [data]);

  // Group active products by category, keeping the catalogue's category order.
  const groups = useMemo(() => {
    const byCategory = new Map<string, Product[]>();
    for (const product of products) {
      if (product.status !== "active") continue;
      const list = byCategory.get(product.category) ?? [];
      list.push(product);
      byCategory.set(product.category, list);
    }
    const order: string[] = SITE.categories.map((c) => c.slug);
    return [...byCategory.entries()].sort(
      (a, b) => order.indexOf(a[0]) - order.indexOf(b[0]),
    );
  }, [products]);

  // One selected index per category. Starts at 0 everywhere (deterministic),
  // then re-rolls at random on an interval once mounted.
  const [picks, setPicks] = useState<Record<string, number>>({});

  useEffect(() => {
    if (groups.length === 0) return;
    const roll = () => {
      setPicks(() => {
        const next: Record<string, number> = {};
        for (const [category, list] of groups) {
          next[category] = Math.floor(Math.random() * list.length);
        }
        return next;
      });
    };
    const timer = setInterval(roll, ROTATE_MS);
    return () => clearInterval(timer);
  }, [groups]);

  if (isPending) {
    return (
      <div className="grid grid-4 gap-7">
        {Array.from({ length: 4 }).map((_, index) => (
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

  if (groups.length === 0) {
    return (
      <p className="text-center text-sm text-white/70">
        Our featured products will appear here shortly.
      </p>
    );
  }

  return (
    <div className="grid grid-4 gap-7">
      {groups.map(([category, list]) => {
        const index = Math.min(picks[category] ?? 0, list.length - 1);
        const product = list[index];
        return (
          // Keying on the product id remounts the card when the pick changes,
          // which replays the fade-in defined in globals.css.
          <div className="featured-rotator-slot" key={`${category}-${product.id}`}>
            <ProductCard
              product={product}
              onAddToCart={(item) => addToCart(item.id, 1, item.name)}
            />
          </div>
        );
      })}
    </div>
  );
}
