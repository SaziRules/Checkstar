import Link from "next/link";
import { ArrowRight, Calendar, Tag, Clock, TrendingDown } from "lucide-react";
import { promotions } from "@/data/promotions";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const typeConfig = {
  monthly: {
    icon: Calendar,
    badgeClass: "badge-monthly",
    accent: "#c2410c",
  },
  "market-day": {
    icon: TrendingDown,
    badgeClass: "badge-market-day",
    accent: "#e75b13",
  },
  "mid-month": {
    icon: Clock,
    badgeClass: "badge-mid-month",
    accent: "#1d4ed8",
  },
  "month-end": {
    icon: Tag,
    badgeClass: "badge-month-end",
    accent: "#15803d",
  },
};

export function PromotionsBand() {
  return (
    <section
      aria-label="Current promotions"
      className="bg-ink-50 border-b border-ink-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-1">
          {/* Label */}
          <span className="text-[10px] font-bold tracking-widest uppercase bg-ink text-white px-2.5 py-1 rounded-sm whitespace-nowrap shrink-0">
            Live Promotions
          </span>

          <div className="w-px h-4 bg-ink-200 shrink-0" aria-hidden="true" />

          {/* Promotion cards — horizontal scroll on mobile */}
          <div className="flex items-center gap-3 min-w-0">
            {promotions.map((promo) => {
              const config = typeConfig[promo.type];
              const Icon = config.icon;

              return (
                <Link
                  key={promo.id}
                  href={`/promotions/${promo.type === "monthly" ? "monthly-specials" : promo.type}`}
                  className={cn(
                    "flex items-center gap-2.5 shrink-0 px-3.5 py-2 rounded-sm border text-xs font-semibold transition-all duration-200 group",
                    promo.isActive
                      ? `${config.badgeClass} hover:shadow-card hover:scale-[1.02]`
                      : "bg-white border-ink-200 text-ink-400 opacity-60 cursor-default pointer-events-none"
                  )}
                  aria-disabled={!promo.isActive}
                  tabIndex={promo.isActive ? 0 : -1}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{promo.badge}</span>
                  {promo.isActive && (
                    <span className="text-[10px] font-normal opacity-70">
                      Valid until {formatDate(promo.validTo)}
                    </span>
                  )}
                  {promo.isActive && (
                    <ArrowRight
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* View all link */}
          <Link
            href="/promotions"
            className="ml-auto shrink-0 text-xs font-bold text-orange hover:text-orange-hover transition-colors duration-200 flex items-center gap-1 whitespace-nowrap"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
