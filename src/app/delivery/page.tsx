import type { Metadata } from "next";
import { DeliveryView } from "@/components/info/DeliveryView";

export const metadata: Metadata = {
  title: "Доставка і оплата",
  description: "Як працює демо-замовлення на сайті NORI: доставка, оплата, часті запитання.",
};

export default function Page() {
  return <DeliveryView />;
}
