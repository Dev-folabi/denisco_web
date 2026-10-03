"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBasket, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ProductDetailPage() {
  const [qty, setQty] = useState(1);

  return (
    <section className="px-6 py-12 max-sm:py-8">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs text-muted">
          <Link href="/" className="text-olive hover:text-forest">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/shop" className="text-olive hover:text-forest">
            Shop
          </Link>{" "}
          / <span>Product Name</span>
        </nav>

        <div className="grid grid-cols-[0.9fr_1.1fr] gap-[60px] max-[1024px]:grid-cols-1 max-[760px]:gap-7">
          {/* Image */}
          <div className="h-[460px] overflow-hidden rounded-[44%_56%_60%_40%/50%_45%_55%_50%] bg-cream-deep shadow-[var(--shadow-lg)] max-[760px]:h-[330px]">
            <div className="size-full bg-cream-deep" />
          </div>

          {/* Content */}
          <div>
            <span className="mb-3 inline-block rounded-full bg-white px-3 py-[5px] text-[10.5px] font-extrabold uppercase tracking-[.3px] text-forest shadow-sm">
              Category
            </span>
            <h1 className="mb-3 text-[38px] font-semibold max-sm:text-[31px]">
              Product Name
            </h1>
            <p className="mb-5 font-heading text-[28px] font-bold text-forest">
              ₦0{" "}
              <span className="text-base font-normal text-muted">/ unit</span>
            </p>
            <p className="mb-6 text-muted">
              Product description will be loaded from the API when the backend is
              connected.
            </p>

            {/* Stock badge */}
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-full bg-badge-green-bg px-[13px] py-[5px] text-[11.5px] font-extrabold text-badge-green-text">
                In Stock
              </span>
              <span className="text-[13px] text-muted">
                0 unit(s) available
              </span>
            </div>

            {/* Qty Stepper */}
            <div className="mb-6 flex items-center gap-4">
              <div className="inline-flex items-center overflow-hidden rounded-[10px] border-[1.5px] border-line">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="grid size-[42px] place-items-center border-none bg-cream-deep text-base text-forest"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="h-[42px] w-[54px] border-x border-line text-center text-sm"
                  min={1}
                />
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="grid size-[42px] place-items-center border-none bg-cream-deep text-base text-forest"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 max-[760px]:flex-col">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-[9px] rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive max-[760px]:w-full"
              >
                <ShoppingBasket size={16} /> Add to Cart
              </button>
              <Link
                href="/cart"
                className="inline-flex items-center justify-center gap-[9px] rounded-full border-2 border-forest bg-transparent px-7 py-[15px] text-sm font-bold text-forest transition-all hover:-translate-y-0.5 hover:bg-forest hover:text-white max-[760px]:w-full"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>

        {/* Related products */}
        <div className="mt-20">
          <h2 className="mb-8 text-[28px] font-semibold">Related Products</h2>
          <div className="grid grid-cols-4 gap-7 max-[1024px]:grid-cols-2 max-sm:grid-cols-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col">
                <div className="h-[210px] rounded-[18px] bg-cream-deep shadow-[var(--shadow-default)]" />
                <div className="px-1 pt-[22px]">
                  <div className="mb-1.5 h-5 w-3/4 rounded bg-cream-deep" />
                  <div className="mb-3.5 h-3 w-full rounded bg-cream-deep" />
                  <div className="h-4 w-1/2 rounded bg-cream-deep" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
