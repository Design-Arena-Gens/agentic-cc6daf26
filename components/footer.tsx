"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="container" style={{ paddingBottom: "3rem", paddingTop: "3rem", color: "var(--color-muted)" }}>
      <div
        className="glass"
        style={{
          padding: "2rem",
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <strong>متجر نبتة</strong>
          <span>نختار نباتاتنا بعناية ونقدّمها مع إرشادات عربية مبسطة.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <strong>تواصل معنا</strong>
          <span>support@nabtaplant.com</span>
          <span>+966 555 000 321</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <strong>ساعات العمل</strong>
          <span>يومياً ٩ ص - ٩ م</span>
          <span>توصيل خلال ٢-٤ أيام</span>
        </div>
      </div>
      <p style={{ textAlign: "center", marginTop: "1.5rem" }}>© {year} متجر نبتة. جميع الحقوق محفوظة.</p>
    </footer>
  );
}
