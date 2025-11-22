import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_Arabic } from "next/font/google";
import { ReactNode } from "react";
import { CartProvider } from "@/components/cart-context";
import Header from "@/components/header";
import CartDrawer from "@/components/cart-drawer";
import Footer from "@/components/footer";

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "متجر نبتة | أناقة طبيعية لمنزلك",
  description:
    "متجر إلكتروني حديث يقدم نباتات منزلية وإكسسوارات عصرية مع تجربة تسوق عربية متكاملة."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={notoSansArabic.variable}>
        <CartProvider>
          <Header />
          <main className="container" style={{ paddingTop: "6rem", paddingBottom: "4rem" }}>
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
