import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar, TrendingDown, Clock, Tag,
  ArrowRight, BookOpen, ChevronRight,
} from "lucide-react";
import { promotions, TYPE_TO_SLUG } from "@/data/promotions";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Promotions",
  description:
    "Browse all current Checkstar specials — Monthly Specials, Market Day deals, Mid-Month and Month-End value promotions across every department.",
};

/* ── Type config ──────────────────────────────────────────────────── */

const TYPE_CONFIG = {
  monthly: {
    icon: Calendar,
    badgeClass: "badge-monthly",
    darkBadge: "bg-orange-900/40 text-orange-300 border border-orange-700/40",
    accentHex: "#c2410c",
    label: "Monthly Specials",
  },
  "market-day": {
    icon: TrendingDown,
    badgeClass: "badge-market-day",
    darkBadge: "bg-orange/15 text-orange border border-orange/30",
    accentHex: "#e75b13",
    label: "Market Day",
  },
  "mid-month": {
    icon: Clock,
    badgeClass: "badge-mid-month",
    darkBadge: "bg-blue-900/40 text-blue-300 border border-blue-700/40",
    accentHex: "#1d4ed8",
    label: "Mid-Month",
  },
  "month-end": {
    icon: Tag,
    badgeClass: "badge-month-end",
    darkBadge: "bg-green-900/40 text-green-300 border border-green-700/40",
    accentHex: "#15803d",
    label: "Month-End",
  },
} as const;

const active   = promotions.filter((p) => p.isActive);
const upcoming = promotions.filter((p) => !p.isActive);

/* ── Page ─────────────────────────────────────────────────────────── */

export default function PromotionsPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="bg-ink pt-16 pb-12 lg:pt-20 lg:pb-16" aria-label="Promotions hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            <div className="max-w-2xl">
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-4">
                Checkstar Promotions
              </p>
              <h1
                className="font-extrabold tracking-tighter text-white leading-[1.0] mb-5"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
              >
                Great deals,{" "}
                <span className="font-handwritten text-orange" style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)" }}>
                  honest prices.
                </span>
              </h1>
              <p className="text-base text-white/55 font-light leading-relaxed max-w-lg">
                Browse all active catalogues, weekly Market Days, and monthly value specials — updated throughout the month across every department.
              </p>
            </div>

            {/* Promo type quick links */}
            <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end shrink-0">
              {promotions.map((p) => {
                const cfg = TYPE_CONFIG[p.type];
                const slug = TYPE_TO_SLUG[p.type];
                return (
                  <Link
                    key={p.id}
                    href={`/promotions/${slug}`}
                    className={cn(
                      "inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-sm transition-opacity duration-200",
                      cfg.darkBadge,
                      !p.isActive && "opacity-50"
                    )}
                  >
                    <cfg.icon className="w-3.5 h-3.5" aria-hidden="true" />
                    {cfg.label}
                    {p.isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" aria-hidden="true" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Active Promotions ──────────────────────────────────────── */}
      {active.length > 0 && (
        <section className="bg-cream py-16 lg:py-20" aria-label="Active promotions">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section header */}
            <AnimateOnScroll className="flex items-center gap-3 mb-10">
              <span className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-ink">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                Live Right Now
              </span>
              <span className="text-ink-200">—</span>
              <span className="text-sm text-ink-600 font-light">
                {active.length} promotion{active.length !== 1 ? "s" : ""} currently active
              </span>
            </AnimateOnScroll>

            {/* Big editorial cards */}
            <div className={cn(
              "grid gap-5",
              active.length === 1 ? "grid-cols-1 max-w-2xl" : "grid-cols-1 lg:grid-cols-2"
            )}>
              {active.map((promo, i) => {
                const cfg = TYPE_CONFIG[promo.type];
                const slug = TYPE_TO_SLUG[promo.type];
                const Icon = cfg.icon;
                const isSingleDay = promo.validFrom === promo.validTo;

                return (
                  <AnimateOnScroll key={promo.id} delay={i * 0.1}>
                    <div className="group relative h-[500px] lg:h-[540px] overflow-hidden rounded-sm shadow-raised">

                      {/* Background image */}
                      {promo.image && (
                        <Image
                          src={promo.image}
                          alt={promo.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority={i === 0}
                        />
                      )}

                      {/* Gradient overlay */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.08) 100%)",
                        }}
                        aria-hidden="true"
                      />

                      {/* Top row: badge + live dot */}
                      <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                        <span className={cn("inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-sm", cfg.badgeClass)}>
                          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                          {promo.badge}
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-green-400 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                          Active
                        </span>
                      </div>

                      {/* Bottom content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                        <p className="text-xs text-white/50 mb-2 font-light">
                          {isSingleDay
                            ? formatDate(promo.validFrom)
                            : `${formatDate(promo.validFrom)} — ${formatDate(promo.validTo)}`}
                        </p>
                        <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-3 leading-tight">
                          {promo.title}
                        </h2>
                        <p className="text-sm text-white/65 font-light leading-relaxed mb-6 max-w-sm line-clamp-2">
                          {promo.description}
                        </p>

                        <div className="flex gap-2.5">
                          <Link
                            href={`/promotions/${slug}`}
                            className="flex-1 flex items-center justify-center gap-2 bg-orange text-white text-sm font-bold py-3 rounded-sm hover:bg-orange-hover transition-colors duration-200 shadow-orange"
                          >
                            Shop Now
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </Link>
                          {promo.pdfUrl && (
                            <Link
                              href={`/promotions/${slug}#catalogue`}
                              className="flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-bold px-4 py-3 rounded-sm hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
                            >
                              <BookOpen className="w-4 h-4" aria-hidden="true" />
                              <span className="hidden sm:inline">Catalogue</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Coming Soon ────────────────────────────────────────────── */}
      {upcoming.length > 0 && (
        <section className="bg-white border-t border-ink-100 py-16 lg:py-20" aria-label="Upcoming promotions">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <AnimateOnScroll className="mb-10">
              <p className="text-[11px] font-bold tracking-widest uppercase text-ink-400 mb-2">Up Next</p>
              <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-ink">
                Coming this month
              </h2>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {upcoming.map((promo, i) => {
                const cfg = TYPE_CONFIG[promo.type];
                const slug = TYPE_TO_SLUG[promo.type];
                const Icon = cfg.icon;

                return (
                  <AnimateOnScroll key={promo.id} delay={i * 0.1}>
                    <div className="group border border-ink-100 rounded-sm overflow-hidden bg-white hover:shadow-card transition-shadow duration-300">

                      {/* Greyed image */}
                      <div className="relative h-48 overflow-hidden">
                        {promo.image && (
                          <Image
                            src={promo.image}
                            alt=""
                            fill
                            aria-hidden="true"
                            className="object-cover grayscale opacity-50 group-hover:opacity-60 transition-opacity duration-300"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        )}
                        <div className="absolute inset-0 bg-ink-50/40" aria-hidden="true" />
                        <div className="absolute top-3 left-3">
                          <span className={cn("inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-sm", cfg.badgeClass)}>
                            <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                            {promo.badge}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="text-[10px] font-bold bg-ink text-white px-2 py-1 rounded-sm tracking-wide">
                            Coming Soon
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-bold text-ink mb-2 group-hover:text-orange transition-colors duration-200">
                          {promo.title}
                        </h3>
                        <p className="text-sm text-ink-600 font-light leading-relaxed mb-4 line-clamp-2">
                          {promo.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-ink-400 font-medium">
                            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                            Starts {formatDate(promo.validFrom)}
                          </div>
                          <Link
                            href={`/promotions/${slug}`}
                            className="flex items-center gap-1 text-xs font-bold text-orange hover:text-orange-hover transition-colors duration-200"
                          >
                            Preview
                            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
