'use client';

import { useCart } from "@/components/cart-context";
import Image from "next/image";
import { useEffect, type CSSProperties } from "react";

export default function CartDrawer() {
  const { items, isOpen, total, closeCart, removeFromCart, updateQuantity, clearCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={closeCart}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(17, 24, 39, 0.4)",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
          zIndex: 40
        }}
      />
      <aside
        className="glass"
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          insetInlineEnd: 0,
          width: "min(420px, 100vw)",
          transform: isOpen ? "translateX(0)" : "translateX(110%)",
          transition: "transform 0.35s ease",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          padding: "2rem 1.75rem"
        }}
        aria-hidden={!isOpen}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.4rem" }}>سلة التسوق</h2>
            <p style={{ margin: "0.25rem 0 0", color: "var(--color-muted)" }}>
              {items.length > 0 ? "أكمل الطلب أو تابع التسوق." : "سلتك فارغة حالياً."}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            style={{
              border: "none",
              background: "rgba(15, 118, 110, 0.08)",
              color: "var(--color-primary)",
              borderRadius: "999px",
              width: "2.2rem",
              height: "2.2rem",
              cursor: "pointer"
            }}
            aria-label="إغلاق السلة"
          >
            ×
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", paddingInlineEnd: "0.25rem" }}>
          {items.map(({ product, quantity }) => (
            <article
              key={product.id}
              className="glass fade-in"
              style={{ marginBottom: "1rem", display: "grid", gridTemplateColumns: "96px 1fr", gap: "1rem", padding: "1rem" }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: "1rem",
                  overflow: "hidden"
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="120px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1rem" }}>{product.name}</h3>
                  <p style={{ margin: "0.25rem 0 0", color: "var(--color-muted)", fontSize: "0.9rem" }}>{product.category}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      style={quantity > 1 ? quantityButtonStyle : disabledQuantityButtonStyle}
                      aria-label="إنقاص الكمية"
                    >
                      −
                    </button>
                    <span style={{ minWidth: "2rem", textAlign: "center", fontWeight: 600 }}>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      style={quantity < 9 ? quantityButtonStyle : disabledQuantityButtonStyle}
                      aria-label="زيادة الكمية"
                    >
                      +
                    </button>
                  </div>
                  <strong>{(product.price * quantity).toLocaleString("ar-EG", { style: "currency", currency: "EGP", minimumFractionDigits: 0 })}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  style={{
                    alignSelf: "flex-start",
                    border: "none",
                    background: "none",
                    color: "var(--color-muted)",
                    cursor: "pointer",
                    fontSize: "0.9rem"
                  }}
                >
                  إزالة المنتج
                </button>
              </div>
            </article>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(15, 118, 110, 0.12)", paddingTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: "var(--color-muted)" }}>الإجمالي</span>
            <strong style={{ fontSize: "1.2rem" }}>
              {total.toLocaleString("ar-EG", { style: "currency", currency: "EGP", minimumFractionDigits: 0 })}
            </strong>
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={() => alert("شكراً لثقتك! سيتم التواصل لإتمام الطلب.")}
            disabled={items.length === 0}
            style={{
              opacity: items.length === 0 ? 0.5 : 1,
              cursor: items.length === 0 ? "not-allowed" : "pointer"
            }}
          >
            إتمام الشراء
          </button>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              style={{
                border: "none",
                background: "none",
                color: "var(--color-muted)",
                cursor: "pointer"
              }}
            >
              تفريغ السلة
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

const quantityButtonStyle: CSSProperties = {
  border: "none",
  background: "rgba(15, 118, 110, 0.1)",
  color: "var(--color-primary)",
  width: "2.2rem",
  height: "2.2rem",
  borderRadius: "999px",
  cursor: "pointer",
  fontSize: "1.1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const disabledQuantityButtonStyle: CSSProperties = {
  ...quantityButtonStyle,
  cursor: "not-allowed",
  opacity: 0.4
};
