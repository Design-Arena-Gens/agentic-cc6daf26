'use client';

import type { Product } from "@/lib/products";
import Image from "next/image";
import { useCart } from "@/components/cart-context";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <article
      className="glass fade-in"
      style={{
        overflow: "hidden",
        borderRadius: "1.5rem",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%"
      }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 5" }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 600px) 50vw, 90vw"
          style={{ objectFit: "cover" }}
        />
        {product.isFeatured && (
          <span
            className="pill active fade-in"
            style={{ position: "absolute", top: "1.2rem", insetInlineEnd: "1rem", fontSize: "0.85rem" }}
          >
            مختار بعناية
          </span>
        )}
      </div>
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{product.name}</h3>
          <p style={{ margin: "0.35rem 0 0", color: "var(--color-muted)", lineHeight: 1.6 }}>
            {product.description}
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <span className="pill" style={{ fontSize: "0.8rem" }}>
            {product.careLevel}
          </span>
          <span className="pill" style={{ fontSize: "0.8rem" }}>
            {product.light}
          </span>
          <span className="pill" style={{ fontSize: "0.8rem" }}>
            الحجم: {product.size}
          </span>
        </div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <strong style={{ fontSize: "1.25rem" }}>
            {product.price.toLocaleString("ar-EG", {
              style: "currency",
              currency: "EGP",
              minimumFractionDigits: 0
            })}
          </strong>
          <button type="button" className="btn-primary" onClick={() => addToCart(product)} style={{ fontSize: "0.95rem" }}>
            أضف إلى السلة
          </button>
        </div>
      </div>
    </article>
  );
}
