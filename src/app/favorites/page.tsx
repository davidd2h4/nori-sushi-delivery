import type { Metadata } from "next";
import { FavoritesView } from "@/components/favorites/FavoritesView";

export const metadata: Metadata = {
  title: "Обране",
  description: "Збережені страви NORI.",
};

export default function Page() {
  return <FavoritesView />;
}
