import Link from "next/link";
import Image from "next/image";
import { Eye, ShoppingBasket } from "lucide-react";
import { StockBadge } from "./stock-badge";
import { MoneyFromKobo } from "@/lib/utils/format";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  unit: string;
  price: number;
  stock: number;
  images: string[];
  status: string;
}

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
    <div className="flex flex-col">
      <div className="relative h-[210px] overflow-hidden rounded-[18px] bg-cream-deep shadow-[var(--shadow-default)]">
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        )}
        <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/90 px-3 py-[5px] text-[10.5px] font-extrabold uppercase tracking-[.3px] text-forest">
          {product.category}
        </span>
        <StockBadge
          stock={product.stock}
          className="absolute right-3 top-3"
        />
      </div>
      <div className="flex flex-1 flex-col px-1 pt-[22px]">
        <h4 className="mb-1.5 text-[16.5px] font-semibold">{product.name}</h4>
        <p className="mb-3.5 flex-1 text-[12.8px] text-muted">{truncated}</p>
        <p className="mb-3.5 text-[11.5px] uppercase tracking-[.4px] text-muted">
          {MoneyFromKobo(product.price)} / {product.unit}
        </p>
        <div className="flex gap-2">
          <Link
            href={`/shop/${product.slug}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-forest bg-transparent px-2 py-[11px] text-[12.5px] font-bold text-forest transition-all hover:bg-forest hover:text-white"
          >
            <Eye size={14} /> Details
          </Link>
          <button
            type="button"
            disabled={product.stock <= 0}
            onClick={() => onAddToCart?.(product)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-forest px-2 py-[11px] text-[12.5px] font-bold text-white transition-all hover:bg-olive disabled:cursor-not-allowed disabled:opacity-45"
          >
            <ShoppingBasket size={14} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
