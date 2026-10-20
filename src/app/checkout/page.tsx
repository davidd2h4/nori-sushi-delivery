import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Оформлення замовлення",
  description: "Демонстраційне оформлення замовлення NORI.",
};

export default function Page() {
  return <CheckoutView />;
}
