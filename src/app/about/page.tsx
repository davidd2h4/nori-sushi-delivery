import type { Metadata } from "next";
import { AboutView } from "@/components/about/AboutView";

export const metadata: Metadata = {
  title: "Про нас",
  description: "NORI — концептуальний бренд доставки японської кухні: філософія, естетика, деталі.",
};

export default function Page() {
  return <AboutView />;
}
