import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { SaleCountdownSection } from "@/components/sections/home/SaleCountdownSection";
import { PromotionsBand } from "@/components/sections/home/PromotionsBand";
import { QuickAccessSection } from "@/components/sections/home/QuickAccessSection";
import { DepartmentsSection } from "@/components/sections/home/DepartmentsSection";
import { RecipesSection } from "@/components/sections/home/RecipesSection";
import { ConsumerServicesSection } from "@/components/sections/home/ConsumerServicesSection";
import { CommunitySection } from "@/components/sections/home/CommunitySection";
import { StoreLocatorSection } from "@/components/sections/home/StoreLocatorSection";
import { SocialFeedSection } from "@/components/sections/home/SocialFeedSection";

export const metadata: Metadata = {
  title: "Checkstar Supermarket | Freshness. Value. Community.",
  description:
    "South Africa's premier independent community supermarket. Fresh daily, priced honestly. Shop this week's specials from your nearest Checkstar in KwaZulu-Natal.",
};

export default function HomePage() {
  return (
    <>
      {/* Mobile sticky countdown — desktop version lives in the announcement bar */}
      <SaleCountdownSection />

      {/*
        Desktop: hero + quick access strip fill the viewport below the
        announcement bar (≈36px) and sticky header (84px) = 120px total.
        Mobile: normal document flow.
      */}
      <div className="flex flex-col lg:h-[calc(100dvh-124px)]">
        <div className="flex-1 min-h-0">
          <HeroSection />
        </div>
        <QuickAccessSection />
      </div>

      <PromotionsBand />
      <DepartmentsSection />
      <RecipesSection />
      <ConsumerServicesSection />
      <CommunitySection />
      <StoreLocatorSection />
      <SocialFeedSection />
    </>
  );
}
