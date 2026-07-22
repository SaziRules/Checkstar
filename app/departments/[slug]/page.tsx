import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight, ChevronLeft, Calendar,
  Leaf, Beef, Wheat, Flame, ShoppingBasket, GlassWater,
  Sunrise, Scissors, Clock, Star, Package, RefreshCw,
  BookOpen, Download,
} from "lucide-react";
import { departments } from "@/data/departments";
import { promotions, TYPE_TO_SLUG } from "@/data/promotions";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

/* ── Per-department rich data ─────────────────────────────────────────────── */

type Feature = { icon: React.ElementType; title: string; body: string };

const DEPT_ENRICHMENT: Record<string, {
  icon: React.ElementType;
  accentHex: string;
  longDescription: string;
  features: Feature[];
  promoBadge?: string;
}> = {
  "fresh-produce": {
    icon: Leaf,
    accentHex: "#16a34a",
    longDescription:
      "Our produce team works directly with regional KZN farms to bring the freshest fruit and vegetables to shelf within 24 hours of harvest. No long-haul cold chains, no compromise on quality. Every morning our team hand-inspects each delivery, removing anything that doesn't meet the Checkstar standard. You'll find over 40 varieties of seasonal produce, pre-packed convenience options, and weekly specials updated to match what's in peak season.",
    features: [
      { icon: Sunrise, title: "Harvested daily", body: "Direct partnerships with regional farmers mean produce reaches shelf within 24 hours." },
      { icon: Leaf, title: "40+ varieties", body: "Seasonal fruit and vegetables, from everyday staples to hard-to-find local varieties." },
      { icon: RefreshCw, title: "Rotated daily", body: "Unsold stock is pulled every morning — you never buy yesterday's produce." },
      { icon: Package, title: "Pre-packed options", body: "Family-size and single-serve packs available across all major product lines." },
    ],
  },
  "butchery": {
    icon: Beef,
    accentHex: "#b91c1c",
    longDescription:
      "Checkstar's Master Butchery is run by a team of in-store blockmen who take their craft seriously. Every cut is prepared on-site, daily — no pre-packed imports from central facilities. We source AAA-grade beef, free-range chicken, and quality lamb from suppliers we've worked with for years. Our blockmen will cut to your specification, prepare custom braai packs, and hand-apply artisanal marinades made in-store.",
    features: [
      { icon: Beef, title: "AAA-grade beef", body: "Hand-selected premium beef, graded for marbling, tenderness, and flavour." },
      { icon: Scissors, title: "Custom cuts", body: "Our blockmen cut to your order — from thick-cut steaks to braai strips and stewing cubes." },
      { icon: Star, title: "Artisanal marinades", body: "In-house marinades applied fresh — peri-peri, garlic herb, lemon pepper and more." },
      { icon: Leaf, title: "Free-range poultry", body: "Free-range chicken and quality lamb sourced from trusted, responsible suppliers." },
    ],
  },
  "bakery": {
    icon: Wheat,
    accentHex: "#b45309",
    longDescription:
      "The Checkstar Scratch Bakery bakes everything entirely from scratch — no par-baked loaves, no frozen dough. Our bakers start before sunrise to ensure fresh bread hits the shelf by opening time, with new batches out every two hours throughout the day. From hearty seed loaves and soft Portuguese rolls to custom celebration cakes and catering pastries, the bakery is the heart of the store.",
    features: [
      { icon: Sunrise, title: "Baked from scratch", body: "Everything is made in-house from raw ingredients — never par-baked or reheated." },
      { icon: Clock, title: "Fresh every 2 hours", body: "New batches throughout the day so bread is always warm when you arrive." },
      { icon: Wheat, title: "Wide variety", body: "Seed loaves, vetkoek, Portuguese rolls, rye, ciabatta, and seasonal specialties." },
      { icon: Star, title: "Custom catering", body: "Custom cakes, pastry platters, and celebration orders taken in-store." },
    ],
  },
  "deli": {
    icon: Flame,
    accentHex: "#e75b13",
    longDescription:
      "Our Hot Foods & Deli counter is a meal in itself. The culinary team prepares restaurant-quality rotisserie chicken, slow-roasted meats, and ready-to-eat platters every day. The deli case is stocked with locally sourced specialty cheeses, premium cold meats sliced to order, and freshly prepared salads. Whether you're grabbing lunch on the go or building a spread for guests, our deli team makes it easy.",
    features: [
      { icon: Flame, title: "Rotisserie daily", body: "Slow-roasted whole chickens and meats prepared fresh throughout the day." },
      { icon: Scissors, title: "Sliced to order", body: "Premium deli meats and specialty cheeses cut to your preferred thickness." },
      { icon: Star, title: "Ready meals", body: "Restaurant-quality prepared dishes — grab from the counter and go." },
      { icon: Package, title: "Catering platters", body: "Cold meat and cheese platters available for ordering — perfect for events." },
    ],
  },
  "grocery": {
    icon: ShoppingBasket,
    accentHex: "#1d4ed8",
    longDescription:
      "Checkstar's Grocery & Pantry department carries everything your family needs, from everyday household staples and cleaning products to international brands and local favourites. Our buying team negotiates directly with suppliers to bring you the lowest possible prices on the products you reach for most. The aisles are well-organised, fully stocked, and refreshed with new specials every month.",
    features: [
      { icon: Package, title: "Full pantry range", body: "Canned goods, dry staples, spices, oils, baking supplies — everything in one run." },
      { icon: ShoppingBasket, title: "Local & international", body: "Popular SA brands alongside a growing selection of imported specialties." },
      { icon: RefreshCw, title: "Monthly specials", body: "Grocery deals change monthly — always something worth stocking up on." },
      { icon: Star, title: "Cleaning & household", body: "Detergents, personal care, and household essentials at honest value prices." },
    ],
  },
  "beverages": {
    icon: GlassWater,
    accentHex: "#0369a1",
    longDescription:
      "From fresh juices and craft cold drinks to everyday soft drinks and bulk water, Checkstar's Beverage department covers every occasion. Our refrigerated section keeps a full range of cold drinks, energy beverages, and fresh juices ready to grab. The ambient aisle carries bulk buying options for soft drinks, cordials, and water — ideal for families and events. We regularly rotate in seasonal and limited specials.",
    features: [
      { icon: GlassWater, title: "Fully refrigerated", body: "Cold drinks, juices, and fresh beverages available chilled and ready to go." },
      { icon: Package, title: "Bulk buy options", body: "Family-size packs and case deals on water, soft drinks, and juices." },
      { icon: Leaf, title: "Craft cold drinks", body: "A curated selection of craft juices, energy drinks, and specialty cold beverages." },
      { icon: RefreshCw, title: "Seasonal specials", body: "Rotating promotions on popular beverage lines throughout the year." },
    ],
  },
};

/* ── Static params ───────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

/* ── Metadata ────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dept = departments.find((d) => d.slug === slug);
  if (!dept) return { title: "Department Not Found" };
  return {
    title: dept.name,
    description: dept.description,
  };
}

/* ── Promotion type badge config (light variant) ─────────────────────────── */

const PROMO_BADGE: Record<string, string> = {
  monthly:    "badge-monthly",
  "market-day": "badge-market-day",
  "mid-month":  "badge-mid-month",
  "month-end":  "badge-month-end",
};

/* ── Page ────────────────────────────────────────────────────────────────── */

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dept = departments.find((d) => d.slug === slug);
  if (!dept) notFound();

  const enrichment = DEPT_ENRICHMENT[dept.slug];
  const Icon = enrichment?.icon ?? ShoppingBasket;
  const accentHex = enrichment?.accentHex ?? "#e75b13";

  const others = departments.filter((d) => d.slug !== dept.slug);
  const activePromos = promotions.filter((p) => p.isActive);
  const showPromos = activePromos.length > 0 ? activePromos : promotions.slice(0, 2);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[460px] max-h-[680px] overflow-hidden" aria-label="Department hero">
        <Image
          src={dept.image.src}
          alt={dept.image.alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/departments"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white/60 hover:text-white transition-colors duration-200"
          >
            <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
            All Departments
          </Link>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 lg:pb-14">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center"
              style={{ background: `${accentHex}28` }}
            >
              <Icon className="w-4 h-4" style={{ color: accentHex }} aria-hidden="true" />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">
              Checkstar Department
            </span>
          </div>

          <h1
            className="font-extrabold tracking-tighter text-white leading-[1.0] mb-3 max-w-2xl"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            {dept.name}
          </h1>
          <p className="text-sm text-white/50 font-light mb-7 max-w-md">
            {dept.tagline}
          </p>

          <Link
            href="#about"
            className="inline-flex items-center gap-2 bg-orange text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-orange-hover transition-colors duration-200 shadow-orange"
          >
            Learn more
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-24" aria-label="About this department" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left: description */}
            <AnimateOnScroll>
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-4">
                About this department
              </p>
              <h2
                className="font-extrabold tracking-tight text-ink leading-[1.1] mb-6"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
              >
                {dept.name}
              </h2>
              <p className="text-base text-ink-600 font-light leading-relaxed">
                {enrichment?.longDescription ?? dept.description}
              </p>
            </AnimateOnScroll>

            {/* Right: features */}
            {enrichment?.features && (
              <AnimateOnScroll delay={0.1}>
                <p className="text-[11px] font-bold tracking-widest uppercase text-ink-400 mb-5">
                  What to expect
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {enrichment.features.map((f, i) => {
                    const FIcon = f.icon;
                    return (
                      <AnimateOnScroll key={f.title} delay={i * 0.06}>
                        <div className="flex gap-3 bg-white border border-ink-100 rounded-sm p-4 shadow-card hover:shadow-raised transition-shadow duration-200">
                          <div
                            className="shrink-0 w-9 h-9 rounded-sm flex items-center justify-center"
                            style={{ background: `${accentHex}18` }}
                          >
                            <FIcon className="w-5 h-5" style={{ color: accentHex }} aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-ink leading-tight mb-0.5">{f.title}</p>
                            <p className="text-xs text-ink-600 font-light leading-snug">{f.body}</p>
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

      {/* ── Current specials ──────────────────────────────────────────────── */}
      <section className="bg-ink py-16 lg:py-20" aria-label="Current specials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-2">
                Current Deals
              </p>
              <h2
                className="font-extrabold tracking-tight text-white leading-[1.1]"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
              >
                Shop our active specials
              </h2>
            </div>
            <Link
              href="/promotions"
              className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-orange hover:text-orange-hover transition-colors duration-200"
            >
              All promotions
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </AnimateOnScroll>

          <div className={cn(
            "grid gap-5",
            showPromos.length === 1 ? "grid-cols-1 max-w-xl" : "grid-cols-1 sm:grid-cols-2"
          )}>
            {showPromos.map((promo, i) => {
              const promoSlug = TYPE_TO_SLUG[promo.type];
              const isSingleDay = promo.validFrom === promo.validTo;

              return (
                <AnimateOnScroll key={promo.id} delay={i * 0.08}>
                  <Link
                    href={`/promotions/${promoSlug}`}
                    className="group relative h-[260px] overflow-hidden rounded-sm block"
                  >
                    {promo.image && (
                      <Image
                        src={promo.image}
                        alt={promo.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    )}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)",
                      }}
                      aria-hidden="true"
                    />

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className={cn("text-xs font-bold px-2.5 py-1 rounded-sm", PROMO_BADGE[promo.type] ?? "badge-monthly")}>
                        {promo.badge}
                      </span>
                      {promo.isActive && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-sm">
                          <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                          Active
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-xs text-white/45 font-light mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" aria-hidden="true" />
                        {isSingleDay ? formatDate(promo.validFrom) : `${formatDate(promo.validFrom)} — ${formatDate(promo.validTo)}`}
                      </p>
                      <h3 className="text-lg font-extrabold text-white leading-tight mb-3">
                        {promo.title}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white/70 group-hover:text-orange transition-colors duration-200">
                        View specials
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Other departments ──────────────────────────────────────────────── */}
      <section className="bg-white border-t border-ink-100 py-16 lg:py-20" aria-label="Other departments">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="mb-10">
            <p className="text-[11px] font-bold tracking-widest uppercase text-ink-400 mb-2">Explore More</p>
            <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-ink">
              Other departments
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {others.map((other, i) => {
              const OIcon = DEPT_ENRICHMENT[other.slug]?.icon ?? ShoppingBasket;
              const oAccent = DEPT_ENRICHMENT[other.slug]?.accentHex ?? "#e75b13";

              return (
                <AnimateOnScroll key={other.id} delay={i * 0.06}>
                  <Link
                    href={other.href}
                    className="group block border border-ink-100 rounded-sm overflow-hidden hover:shadow-card transition-shadow duration-300"
                  >
                    <div className="relative h-28 overflow-hidden">
                      <Image
                        src={other.image.src}
                        alt={other.image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" aria-hidden="true" />
                      <div
                        className="absolute bottom-2 right-2 w-7 h-7 rounded-sm flex items-center justify-center"
                        style={{ background: `${oAccent}22` }}
                      >
                        <OIcon className="w-3.5 h-3.5" style={{ color: oAccent }} aria-hidden="true" />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-bold text-ink group-hover:text-orange transition-colors duration-200 leading-snug">
                        {other.name}
                      </p>
                      <p className="text-[10px] text-ink-400 font-light mt-0.5 line-clamp-1">
                        {other.tagline}
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
