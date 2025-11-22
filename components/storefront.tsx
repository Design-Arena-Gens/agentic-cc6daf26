'use client';

import { useMemo, useState, type CSSProperties } from "react";
import type { Product } from "@/lib/products";
import ProductCard from "@/components/product-card";
import { useCart } from "@/components/cart-context";

type Props = {
  products: Product[];
};

const priceRanges = [
  { id: "all", label: "كل الأسعار", min: 0, max: Infinity },
  { id: "budget", label: "أقل من 500 ج.م", min: 0, max: 500 },
  { id: "mid", label: "500 - 1200 ج.م", min: 500, max: 1200 },
  { id: "premium", label: "أكثر من 1200 ج.م", min: 1200, max: Infinity }
];

export default function Storefront({ products }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("الكل");
  const [activeRange, setActiveRange] = useState<string>("all");
  const [careLevel, setCareLevel] = useState<string>("الكل");
  const [lightLevel, setLightLevel] = useState<string>("الكل");
  const { openCart } = useCart();

  const categories = useMemo(
    () => ["الكل", ...Array.from(new Set(products.map((product) => product.category)))],
    [products]
  );

  const careLevels = useMemo(
    () => ["الكل", ...Array.from(new Set(products.map((product) => product.careLevel)))],
    [products]
  );

  const lightLevels = useMemo(
    () => ["الكل", ...Array.from(new Set(products.map((product) => product.light)))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const activeRangeObject = priceRanges.find((range) => range.id === activeRange) ?? priceRanges[0];
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = activeCategory === "الكل" || product.category === activeCategory;
      const matchesCare = careLevel === "الكل" || product.careLevel === careLevel;
      const matchesLight = lightLevel === "الكل" || product.light === lightLevel;
      const matchesRange = product.price >= activeRangeObject.min && product.price <= activeRangeObject.max;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch) ||
        product.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

      return matchesCategory && matchesCare && matchesLight && matchesRange && matchesSearch;
    });
  }, [products, activeCategory, activeRange, careLevel, lightLevel, searchTerm]);

  const featured = useMemo(() => products.filter((product) => product.isFeatured), [products]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
      <section
        className="glass fade-in"
        style={{
          display: "grid",
          gap: "2rem",
          padding: "3rem",
          marginTop: "2rem",
          alignItems: "center"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <span className="pill active" style={{ alignSelf: "flex-start" }}>
            مجموعة الربيع ٢٠٢٤
          </span>
          <h1 style={{ margin: 0, fontSize: "2.6rem", lineHeight: 1.3 }}>
            كل ما تحتاجه لتصميم زاويتك الخضراء
          </h1>
          <p style={{ margin: 0, color: "var(--color-muted)", fontSize: "1.05rem", lineHeight: 1.8 }}>
            اخترنا بعناية نباتات داخلية وإكسسوارات عصرية لتمنح منزلك روح الطبيعة. منتجاتنا تأتي مع إرشادات العناية
            وخدمة دعم باللغة العربية في كل خطوة.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <button type="button" className="btn-primary" onClick={openCart}>
              أكمل طلبك الحالي
            </button>
            <a
              href="#catalog"
              className="pill active"
              style={{ borderRadius: "999px", paddingInline: "1.5rem", fontSize: "0.95rem" }}
            >
              تصفح المنتجات
            </a>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))"
          }}
        >
          {featured.map((item) => (
            <div
              key={item.id}
              className="glass"
              style={{
                padding: "1.4rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                alignItems: "flex-start"
              }}
            >
              <span className="pill" style={{ fontSize: "0.75rem" }}>
                {item.category}
              </span>
              <h3 style={{ margin: 0 }}>{item.name}</h3>
              <p style={{ margin: 0, color: "var(--color-muted)", fontSize: "0.9rem" }}>{item.description}</p>
              <strong>{item.price.toLocaleString("ar-EG", { style: "currency", currency: "EGP", minimumFractionDigits: 0 })}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="catalog" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div className="glass" style={{ padding: "1.75rem", display: "grid", gap: "1.25rem" }}>
          <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            <div style={{ position: "relative" }}>
              <input
                type="search"
                placeholder="ابحث عن نبات، أداة أو كلمة مفتاحية..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                style={inputStyle}
                aria-label="بحث في المنتجات"
              />
            </div>
            <select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value)} style={inputStyle} aria-label="تصفية حسب الفئة">
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select value={activeRange} onChange={(event) => setActiveRange(event.target.value)} style={inputStyle} aria-label="تصفية حسب السعر">
              {priceRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
            <select value={careLevel} onChange={(event) => setCareLevel(event.target.value)} style={inputStyle} aria-label="تصفية حسب مستوى العناية">
              {careLevels.map((level) => (
                <option key={level} value={level}>
                  مستوى العناية: {level}
                </option>
              ))}
            </select>
            <select value={lightLevel} onChange={(event) => setLightLevel(event.target.value)} style={inputStyle} aria-label="تصفية حسب الإضاءة">
              {lightLevels.map((level) => (
                <option key={level} value={level}>
                  الإضاءة: {level}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
            <span style={{ color: "var(--color-muted)" }}>
              {filteredProducts.length > 0
                ? `تم العثور على ${filteredProducts.length} منتج`
                : "لم نعثر على نتائج مطابقة. جرّب كلمات أخرى."}
            </span>
            {(searchTerm || activeCategory !== "الكل" || activeRange !== "all" || careLevel !== "الكل" || lightLevel !== "الكل") && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("الكل");
                  setActiveRange("all");
                  setCareLevel("الكل");
                  setLightLevel("الكل");
                }}
                style={{
                  border: "none",
                  background: "none",
                  color: "var(--color-primary)",
                  cursor: "pointer"
                }}
              >
                إعادة التصفية
              </button>
            )}
          </div>
        </div>

        <div className="grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section
        id="care"
        className="glass"
        style={{ padding: "2.5rem", display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
      >
        <article style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3 style={{ margin: 0 }}>خدمة ما بعد الشراء</h3>
          <p style={{ margin: 0, color: "var(--color-muted)" }}>
            فريق مختص يجيب على جميع استفسارات العناية بالنبات باللغة العربية خلال ٢٤ ساعة عبر واتساب أو البريد.
          </p>
        </article>
        <article style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3 style={{ margin: 0 }}>تغليف صديق للبيئة</h3>
          <p style={{ margin: 0, color: "var(--color-muted)" }}>
            نستخدم مواد قابلة لإعادة التدوير مع بطاقات عناية مفصلة لكل منتج لضمان وصوله في حالة ممتازة.
          </p>
        </article>
        <article style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <h3 style={{ margin: 0 }}>توصيل ذكي</h3>
          <p style={{ margin: 0, color: "var(--color-muted)" }}>
            تغطية لمعظم المدن العربية مع إمكانية تحديد موعد التوصيل والتتبع اللحظي للطلب.
          </p>
        </article>
      </section>
    </div>
  );
}

const inputStyle: CSSProperties = {
  width: "100%",
  borderRadius: "0.9rem",
  border: "1px solid rgba(15, 118, 110, 0.18)",
  padding: "0.85rem 1rem",
  background: "rgba(255,255,255,0.85)",
  fontFamily: "inherit",
  fontSize: "0.95rem",
  color: "var(--color-text)",
  outline: "none"
};
