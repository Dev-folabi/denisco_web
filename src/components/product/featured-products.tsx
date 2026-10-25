"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import { useProducts } from "@/features/products/hooks";
import type { Product } from "@/features/products/types";
import { useAddToCartAction } from "@/features/cart/use-add-to-cart";
import { SITE } from "@/lib/constants";

/** How often the featured grid rotates its random pick, in milliseconds. */
const ROTATE_MS = 5000;

/** How many products the featured grid shows. */
const FEATURED_COUNT = 8;

/** The listing params the home page and this grid share, so TanStack Query
 *  reuses the server-rendered copy as initial data instead of refetching a
 *  different key. */
export const FEATURED_QUERY = { limit: 100 } as const;

type Group = [string, Product[]];

/** A Fisher–Yates shuffle returning a new array. */
function shuffle<T>(list: T[]): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Chooses the products to feature: one from each category first (so the grid
 * always spans the range), then fills the remaining slots from the rest of the
 * catalogue, up to FEATURED_COUNT.
 *
 * When `random` is false the choice is deterministic (the first product of each
 * category, in order), which is what the server render and the first client
 * paint use so hydration matches. After mount, each tick passes `random: true`.
 */
function choosePicks(groups: Group[], random: boolean): Product[] {
  const picks: Product[] = [];
  const used = new Set<string>();

  const orderedGroups = random ? shuffle(groups) : groups;
  for (const [, list] of orderedGroups) {
    if (picks.length >= FEATURED_COUNT) break;
    const candidates = list.filter((p) => !used.has(p.id));
    if (candidates.length === 0) continue;
    const product = random
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : candidates[0];
    picks.push(product);
    used.add(product.id);
  }

  if (picks.length < FEATURED_COUNT) {
    const rest = groups
      .flatMap(([, list]) => list)
      .filter((p) => !used.has(p.id));
    for (const product of random ? shuffle(rest) : rest) {
      if (picks.length >= FEATURED_COUNT) break;
      picks.push(product);
      used.add(product.id);
    }
  }

  return picks;
}

/**
 * The home page's featured grid.
 *
 * It shows eight products — one per category, then filled out from the rest —
 * and re-rolls the choice every five seconds. The first render (server and
 * first client paint) is deterministic so hydration matches; randomisation
 * starts only after mount.
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
  const groups = useMemo<Group[]>(() => {
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

  // `tick` drives the rotation. It starts at 0 (deterministic pick, so SSR and
  // the first client render agree) and increments every ROTATE_MS, after which
  // each pick is randomised.
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (groups.length === 0) return;
    const timer = setInterval(() => setTick((t) => t + 1), ROTATE_MS);
    return () => clearInterval(timer);
  }, [groups]);

  const picks = useMemo(
    () => choosePicks(groups, tick > 0),
    [groups, tick],
  );

  if (isPending) {
    return (
      <div className="grid grid-4 gap-7">
        {Array.from({ length: FEATURED_COUNT }).map((_, index) => (
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

  if (picks.length === 0) {
    return (
      <p className="text-center text-sm text-white/70">
        Our featured products will appear here shortly.
      </p>
    );
  }

  return (
    <div className="grid grid-4 gap-7">
      {picks.map((product) => (
        // Keying on the product id remounts the card when the pick changes,
        // which replays the fade-in defined in globals.css.
        <div className="featured-rotator-slot" key={product.id}>
          <ProductCard
            product={product}
            onAddToCart={(item) => addToCart(item.id, 1, item.name)}
          />
        </div>
      ))}
    </div>
  );
}
