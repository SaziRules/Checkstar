import Link from "next/link";
import {
  Tag,
  Calendar,
  MapPin,
  BookOpen,
  Users,
  Trophy,
} from "lucide-react";

const links = [
  {
    label: "Monthly Specials",
    description: "Full catalogue",
    href: "/promotions/monthly-specials",
    icon: Tag,
    highlight: true,
  },
  {
    label: "Market Day",
    description: "One-day deals",
    href: "/promotions/market-day",
    icon: Calendar,
    highlight: true,
  },
  {
    label: "Find a Store",
    description: "Near you",
    href: "/store-locator",
    icon: MapPin,
    highlight: false,
  },
  {
    label: "Recipes",
    description: "SA favourites",
    href: "/recipes",
    icon: BookOpen,
    highlight: false,
  },
  {
    label: "Community",
    description: "Our impact",
    href: "/community",
    icon: Users,
    highlight: false,
  },
  {
    label: "Competitions",
    description: "Win prizes",
    href: "/competitions",
    icon: Trophy,
    highlight: false,
  },
];

export function QuickAccessSection() {
  return (
    <section aria-label="Quick access" className="bg-ink border-b border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 sm:grid-cols-6 divide-x divide-white/8">
          {links.map(({ label, description, href, icon: Icon, highlight }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col items-center gap-2 py-5 px-2 hover:bg-white/5 transition-colors duration-200"
            >
              <div
                className={
                  highlight
                    ? "p-2.5 rounded-sm bg-orange text-white transition-colors duration-200 group-hover:bg-orange-hover"
                    : "p-2.5 rounded-sm bg-white/8 text-white/50 transition-colors duration-200 group-hover:bg-white/15 group-hover:text-white"
                }
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="text-center">
                <p
                  className={
                    highlight
                      ? "text-[11px] font-bold text-orange leading-tight"
                      : "text-[11px] font-bold text-white/70 group-hover:text-white transition-colors duration-200 leading-tight"
                  }
                >
                  {label}
                </p>
                <p className="text-[10px] text-white/30 mt-0.5 hidden sm:block">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
