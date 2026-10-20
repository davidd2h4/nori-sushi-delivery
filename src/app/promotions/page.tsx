import type { Metadata } from "next";
import { PromotionsView } from "@/components/promo/PromotionsView";

export const metadata: Metadata = {
  title: "Акції",
  description: "Демонстраційні пропозиції та промокоди NORI.",
};

export default function Page() {
  return <PromotionsView />;
}
