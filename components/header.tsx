'use client';

import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { useEffect, useState } from "react";

export default function Header() {
  const { cartCount, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        insetInline: 0,
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(15, 118, 110, 0.08)" : "1px solid transparent"
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontWeight: 700, fontSize: "1.2rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.75rem",
              background: "linear-gradient(135deg, #0f766e 0%, #0b5c55 100%)",
              color: "#fff",
              fontSize: "1.35rem"
            }}
          >
            ن
          </span>
          <div>
            <div>متجر نبتة</div>
            <small style={{ color: "var(--color-muted)", fontWeight: 400 }}>أناقة طبيعية لمنزلك</small>
          </div>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <nav style={{ display: "none", gap: "1.5rem", color: "var(--color-muted)" }}>
            <Link href="#featured">مختارات</Link>
            <Link href="#plants">نباتات</Link>
            <Link href="#accessories">إكسسوارات</Link>
            <Link href="#care">العناية</Link>
          </nav>
          <button
            type="button"
            onClick={toggleCart}
            className="btn-primary"
            style={{ paddingInline: "1.2rem", gap: "0.6rem" }}
          >
            <span>السلة</span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "1.9rem",
                minHeight: "1.9rem",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.16)",
                fontWeight: 600
              }}
            >
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
