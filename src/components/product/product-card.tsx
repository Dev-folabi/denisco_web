"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, ShoppingCart, Tag } from "lucide-react";
import { StockBadge } from "./stock-badge";
import { MoneyFromKobo } from "@/lib/utils/format";

import type { Product } from "@/features/products/types";

export type { Product };

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const truncated =
    product.description.length > 78
      ? product.description.slice(0, 78) + "…"
      : product.description;

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        )}
        <StockBadge stock={product.stock} />
      </div>
      <div className="product-body">
        <h4>{product.name}</h4>
        <p className="product-desc">{truncated}</p>
        <div className="unit-row">
          <Tag size={12} /> {MoneyFromKobo(product.price)} per {product.unit}
        </div>
        <div className="product-actions">
          <Link href={`/shop/${product.slug}`} className="btn btn-outline btn-sm">
            <Eye size={14} /> Details
          </Link>
          <button
            type="button"
            disabled={product.stock <= 0}
            onClick={() => onAddToCart?.(product)}
            className="btn btn-primary btn-sm"
          >
            <ShoppingCart size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
