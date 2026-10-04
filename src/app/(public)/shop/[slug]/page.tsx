"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ShoppingCart, TriangleAlert } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHead } from "@/components/layout/section-head";
import { QtyStepper } from "@/components/product/qty-stepper";
import { StockBadge } from "@/components/product/stock-badge";
import { ProductCard, type Product } from "@/components/product/product-card";
import { categoryLabel } from "@/components/product/category-label";
import { MoneyFromKobo } from "@/lib/utils/format";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [qty, setQty] = useState(1);

  const products: Product[] = [];
  const product = products.find((p) => p.slug === slug) ?? null;
  const related = product
    ? products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            icon={TriangleAlert}
            title="Product Not Found"
            description="This product may have been removed."
            ctaLabel="Back to Shop"
            ctaHref="/shop"
          />
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section section-white" style={{ paddingTop: 44 }}>
        <div className="container">
          <div className="breadcrumb" style={{ color: "var(--color-muted)" }}>
            <Link href="/">Home</Link> / <Link href="/shop">Shop</Link> /{" "}
            {product.name}
          </div>

          <div className="pd-grid">
            <div className="pd-img">
              {product.images[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={600}
                  height={450}
                />
              )}
            </div>
            <div>
              <span
                className="cat-badge"
                style={{
                  position: "static",
                  display: "inline-block",
                  marginBottom: 14,
                  background: "var(--color-cream-deep)",
                }}
              >
                {categoryLabel(product.category)}
              </span>
              <h1>{product.name}</h1>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 28,
                    color: "var(--color-forest)",
                    fontWeight: 700,
                  }}
                >
                  {MoneyFromKobo(product.price)}
                </span>
                <span className="muted">/ {product.unit}</span>
              </div>
              <p className="muted">{product.description}</p>
              <p>
                <StockBadge stock={product.stock} inline />
                <span className="muted" style={{ marginLeft: 8 }}>
                  {product.stock > 0
                    ? `${product.stock} ${product.unit}(s) available`
                    : "Currently unavailable"}
                </span>
              </p>

              <div className="form-group">
                <label>Quantity</label>
                <QtyStepper
                  value={qty}
                  max={Math.max(product.stock, 1)}
                  onChange={setQty}
                />
              </div>

              <button
                type="button"
                className="btn btn-primary"
                disabled={product.stock <= 0}
                style={{ padding: "15px 32px" }}
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <Link
                href="/cart"
                className="btn btn-outline"
                style={{ marginLeft: 10, padding: "15px 28px" }}
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section-deep">
          <div className="container">
            <SectionHead
              eyebrow="You May Also Like"
              title="Related Products"
            />
            <div className="grid grid-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
