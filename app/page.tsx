import Storefront from "@/components/storefront";
import { products } from "@/lib/products";

export default function Page() {
  return <Storefront products={products} />;
}
