import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar, ArrowRight, Download,
  ChevronLeft, TrendingDown, Clock, Tag,
  Leaf, Beef, Wheat, ShoppingBasket, Flame,
  GlassWater, Sparkles, Heart, Home, Package,
  Snowflake, Archive, CheckCircle,
} from "lucide-react";
import { promotions, SLUG_TO_TYPE, TYPE_TO_SLUG } from "@/data/promotions";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { CatalogueSection } from "@/components/ui/CatalogueSection";

/* ── Type config ─────────────────────────────────────────────────────────── */

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

/* ── Highlight icon map ───────────────────────────────────────────────────── */

const HIGHLIGHT_ICONS: Record<string, React.ElementType> = {
  "Fresh Produce":       Leaf,
  "Super Fresh Produce": Leaf,
  "Master Butchery":     Beef,
  "Scratch Bakery":      Wheat,
  "Grocery & Pantry":    ShoppingBasket,
  "Beverages":           GlassWater,
  "Hot Foods & Deli":    Flame,
  "Cleaning & Household": Sparkles,
  "Personal Care":       Heart,
  "Household Staples":   Home,
  "Bulk Buying Value":   Package,
  "Frozen Foods":        Snowflake,
  "Canned & Dry Goods":  Archive,
};

/* ── Static params ───────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return Object.keys(SLUG_TO_TYPE).map((slug) => ({ slug }));
}

/* ── Metadata ────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const type = SLUG_TO_TYPE[slug];
  if (!type) return { title: "Promotion Not Found" };
  const promo = promotions.find((p) => p.type === type);
  if (!promo) return { title: "Promotion Not Found" };
  return {
    title: promo.title,
    description: promo.description,
  };
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default async function PromotionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const type = SLUG_TO_TYPE[slug];
  if (!type) notFound();

  const promo = promotions.find((p) => p.type === type);
  if (!promo) notFound();

  const cfg = TYPE_CONFIG[promo.type];
  const Icon = cfg.icon;
  const isSingleDay = promo.validFrom === promo.validTo;
  const dateRange = isSingleDay
    ? formatDate(promo.validFrom)
    : `${formatDate(promo.validFrom)} — ${formatDate(promo.validTo)}`;

  const others = promotions.filter((p) => p.type !== promo.type);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[480px] max-h-[700px] overflow-hidden" aria-label="Promotion hero">

        {/* Background image */}
        {promo.image && (
          <Image
            src={promo.image}
            alt={promo.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.20) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/promotions"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white/60 hover:text-white transition-colors duration-200"
          >
            <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
            All Promotions
          </Link>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 lg:pb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className={cn("inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-sm", cfg.badgeClass)}>
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {promo.badge}
            </span>
            {promo.isActive ? (
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-green-400 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                Active Now
              </span>
            ) : (
              <span className="text-[11px] font-bold text-white/50 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                Coming Soon
              </span>
            )}
          </div>

          <h1
            className="font-extrabold tracking-tighter text-white leading-[1.0] mb-3 max-w-2xl"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            {promo.title}
          </h1>

          <p className="text-sm text-white/50 font-light mb-6 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            {dateRange}
          </p>

          <div className="flex flex-wrap gap-3">
            {promo.isActive && (
              <a
                href="#highlights"
                className="inline-flex items-center gap-2 bg-orange text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-orange-hover transition-colors duration-200 shadow-orange"
              >
                Browse Specials
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            {promo.pdfUrl && (
              <a
                href={promo.pdfUrl}
                download
                id="catalogue"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download Catalogue
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-24" aria-label="Promotion details" id="highlights">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left: description */}
            <AnimateOnScroll>
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-4">
                About this promotion
              </p>
              <h2
                className="font-extrabold tracking-tight text-ink leading-[1.1] mb-6"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
              >
                {cfg.label}
              </h2>
              <p className="text-base text-ink-600 font-light leading-relaxed mb-8">
                {promo.longDescription ?? promo.description}
              </p>

              {/* Date pill */}
              <div className="inline-flex items-center gap-2 bg-white border border-ink-100 rounded-sm px-4 py-2.5 shadow-card">
                <Calendar className="w-4 h-4 text-orange shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400">
                    {isSingleDay ? "Valid on" : "Valid from"}
                  </p>
                  <p className="text-sm font-bold text-ink">{dateRange}</p>
                </div>
                {promo.isActive && (
                  <span className="ml-2 flex items-center gap-1 text-[10px] font-bold text-green-600">
                    <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    Live
                  </span>
                )}
              </div>
            </AnimateOnScroll>

            {/* Right: highlights grid */}
            {promo.highlights && promo.highlights.length > 0 && (
              <AnimateOnScroll delay={0.1}>
                <p className="text-[11px] font-bold tracking-widest uppercase text-ink-400 mb-5">
                  What&apos;s included
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {promo.highlights.map((h, i) => {
                    const HIcon = HIGHLIGHT_ICONS[h.label] ?? ShoppingBasket;
                    return (
                      <AnimateOnScroll key={h.label} delay={i * 0.06}>
                        <div className="flex gap-3 bg-white border border-ink-100 rounded-sm p-4 shadow-card hover:shadow-raised transition-shadow duration-200">
                          <div
                            className="shrink-0 w-9 h-9 rounded-sm flex items-center justify-center"
                            style={{ background: `${cfg.accentHex}18` }}
                          >
                            <HIcon
                              className="w-5 h-5"
                              style={{ color: cfg.accentHex }}
                              aria-hidden="true"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-ink leading-tight mb-0.5">{h.label}</p>
                            <p className="text-xs text-ink-600 font-light leading-snug">{h.note}</p>
                          </div>
                        </div>
                      </AnimateOnScroll>
                    );
                  })}
                </div>
              </AnimateOnScroll>
            )}
          </div>
        </div>
      </section>

      {/* ── Catalogue download ─────────────────────────────────────────────── */}
      {promo.pdfUrl && (
        <section className="bg-ink py-16 lg:py-20 overflow-hidden" aria-label="Catalogue download">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

              {/* Decorative mock catalogue */}
              <AnimateOnScroll className="shrink-0 relative w-48 h-64 lg:w-56 lg:h-72">
                <div className="absolute inset-0 rounded-sm overflow-hidden shadow-float">
                  {promo.image && (
                    <Image
                      src={promo.image}
                      alt=""
                      fill
                      aria-hidden="true"
                      className="object-cover"
                      sizes="224px"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[9px] font-bold tracking-widest uppercase text-white/60 mb-1">Checkstar</p>
                    <p className="text-sm font-extrabold text-white leading-tight">{promo.title}</p>
                    <span className={cn("inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-sm mt-2", cfg.badgeClass)}>
                      <Icon className="w-3 h-3" aria-hidden="true" />
                      {promo.badge}
                    </span>
                  </div>
                </div>
                {/* Page edge effect */}
                <div className="absolute -right-2 top-2 bottom-2 w-2 bg-gradient-to-r from-white/10 to-transparent rounded-r-sm" aria-hidden="true" />
              </AnimateOnScroll>

              {/* Text + CTA */}
              <AnimateOnScroll delay={0.1} className="flex-1 max-w-lg lg:max-w-none">
                <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-4">
                  Digital Catalogue
                </p>
                <h2
                  className="font-extrabold tracking-tight text-white leading-[1.1] mb-4"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
                >
                  Browse the full catalogue
                </h2>
                <p className="text-sm text-white/50 font-light leading-relaxed mb-8 max-w-md">
                  Download or view the complete {cfg.label.toLowerCase()} catalogue — every deal, every department, every page.
                </p>
                <CatalogueSection pdfUrl={promo.pdfUrl!} title={promo.title} />
              </AnimateOnScroll>

              {/* Background decoration */}
              <div
                className="absolute -right-24 -top-12 w-72 h-72 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
                style={{ background: cfg.accentHex }}
                aria-hidden="true"
              />
            </div>
          </div>
        </section>
      )}

      {/* ── Other Promotions ──────────────────────────────────────────────── */}
      <section className="bg-white border-t border-ink-100 py-16 lg:py-20" aria-label="Other promotions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="mb-10">
            <p className="text-[11px] font-bold tracking-widest uppercase text-ink-400 mb-2">More Deals</p>
            <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-ink">
              Other promotions
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {others.map((other, i) => {
              const oCfg = TYPE_CONFIG[other.type];
              const oSlug = TYPE_TO_SLUG[other.type];
              const OIcon = oCfg.icon;
              const oSingleDay = other.validFrom === other.validTo;

              return (
                <AnimateOnScroll key={other.id} delay={i * 0.08}>
                  <Link
                    href={`/promotions/${oSlug}`}
                    className="group block border border-ink-100 rounded-sm overflow-hidden bg-white hover:shadow-raised transition-shadow duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      {other.image && (
                        <Image
                          src={other.image}
                          alt={other.title}
                          fill
                          className={cn(
                            "object-cover transition-transform duration-500 group-hover:scale-105",
                            !other.isActive && "grayscale opacity-60"
                          )}
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" aria-hidden="true" />
                      <div className="absolute top-3 left-3">
                        <span className={cn("inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-sm", oCfg.badgeClass)}>
                          <OIcon className="w-3.5 h-3.5" aria-hidden="true" />
                          {other.badge}
                        </span>
                      </div>
                      {other.isActive && (
                        <div className="absolute top-3 right-3">
                          <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-sm">
                            <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                            Active
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-ink mb-1.5 group-hover:text-orange transition-colors duration-200 leading-snug">
                        {other.title}
                      </h3>
                      <p className="text-xs text-ink-400 font-light flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 shrink-0" aria-hidden="true" />
                        {oSingleDay ? formatDate(other.validFrom) : `${formatDate(other.validFrom)} — ${formatDate(other.validTo)}`}
                      </p>
                    </div>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}
