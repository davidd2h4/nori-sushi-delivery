import { AboutTeaser } from "@/components/home/AboutTeaser";
import { Advantages } from "@/components/home/Advantages";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FaqSection } from "@/components/home/FaqSection";
import { Hero } from "@/components/home/Hero";
import { PopularProducts } from "@/components/home/PopularProducts";
import { PromoTeaser } from "@/components/home/PromoTeaser";
import { SetsShowcase } from "@/components/home/SetsShowcase";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24 md:gap-32">
      <div className="flex flex-col gap-4 md:gap-8">
        <Hero />
        <Advantages />
      </div>
      <CategoryShowcase />
      <PopularProducts />
      <SetsShowcase />
      <PromoTeaser />
      <AboutTeaser />
      <FaqSection />
    </div>
  );
}
