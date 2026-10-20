import type { Metadata } from "next";
import { MenuView } from "@/components/catalog/MenuView";

export const metadata: Metadata = {
  title: "Меню",
  description: "Меню NORI: роли, Філадельфія, Каліфорнія, нігірі, гункани, сети, супи, салати, десерти та напої.",
};

export default function MenuPage() {
  return <MenuView />;
}
