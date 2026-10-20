import type { Metadata } from "next";
import { CreditsView } from "@/components/info/CreditsView";

export const metadata: Metadata = {
  title: "Автори фото",
  description: "Автори фотографій, використаних на сайті NORI.",
};

export default function Page() {
  return <CreditsView />;
}
