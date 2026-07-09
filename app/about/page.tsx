import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ShoppingBasket, Users, TrendingUp, Heart,
  Star, Award, CheckCircle, MapPin, Phone, ShieldCheck,
  Leaf, Beef, Wheat, Flame, GlassWater, Clock, Tag,
} from "lucide-react";
import { communityStats, communityStories } from "@/data/community";
import { stores } from "@/data/stores";
import { departments } from "@/data/departments";
import { promotions, TYPE_TO_SLUG } from "@/data/promotions";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Checkstar is KwaZulu-Natal's halaal-certified independent supermarket. Three branches across Durban — Durban CBD, Overport, and Phoenix — delivering fresh produce, master butchery, and great value every day.",
};

/* ── Stakeholder commitments ─────────────────────────────────────────────── */

const STAKEHOLDERS = [
  {
    icon: ShoppingBasket,
    title: "Our Customers",
    body: "Your desired product range at the most affordable prices — every aisle, every day. Our number one priority is you, our shopper.",
  },
  {
    icon: Users,
    title: "Our People",
    body: "We invest in our team's growth, well-being, and belonging. When our people thrive, our stores feel it — and so do you.",
  },
  {
    icon: TrendingUp,
    title: "Our Shareholders",
    body: "We run our business with the highest standards of stewardship, transparency, and long-term thinking.",
  },
  {
    icon: Heart,
    title: "Our Communities",
    body: "We act as responsible corporate citizens — sourcing locally, employing locally, and giving back to the neighbourhoods that support us.",
  },
];

/* ── Character values ────────────────────────────────────────────────────── */

const VALUES = [
  {
    icon: Star,
    title: "Helpful, friendly & understanding",
    body: "Walk into any Checkstar branch and you'll feel it — staff who actually want to help, who know the products, and who treat every customer like a neighbour.",
  },
  {
    icon: Award,
    title: "Humble & hard-working",
    body: "We're not the loudest brand. We just show up, do the work, and let the product speak for itself. Every day, across every department.",
  },
  {
    icon: CheckCircle,
    title: "Getting it right for you",
    body: "The right products at the right price — that's the job. We hold ourselves accountable to that standard, not just in what we sell, but in how we operate.",
  },
];

/* ── Halaal trust points ─────────────────────────────────────────────────── */

const HALAAL_POINTS = [
  {
    icon: ShieldCheck,
    title: "Certified across all branches",
    body: "Every Checkstar store — Durban CBD, Overport, and Phoenix — carries full halaal certification. No exceptions, no partial compliance.",
  },
  {
    icon: CheckCircle,
    title: "Halaal-vetted suppliers",
    body: "Every product on our shelves is sourced from halaal-approved suppliers. Our buying team verifies certification before any product enters the store.",
  },
  {
    icon: Clock,
    title: "Jumu'ah closure every Friday",
    body: "All Checkstar branches close from 12:15 to 13:15 every Friday for Jumu'ah prayers — a commitment to faith we stand by without compromise.",
  },
];

/* ── Department icon map ─────────────────────────────────────────────────── */

const DEPT_ICONS: Record<string, { icon: React.ElementType; accent: string }> = {
  produce:   { icon: Leaf,          accent: "#16a34a" },
  butchery:  { icon: Beef,          accent: "#b91c1c" },
  bakery:    { icon: Wheat,         accent: "#b45309" },
  deli:      { icon: Flame,         accent: "#e75b13" },
  grocery:   { icon: ShoppingBasket, accent: "#1d4ed8" },
  beverages: { icon: GlassWater,    accent: "#0369a1" },
};

/* ── FAQ ─────────────────────────────────────────────────────────────────── */

const FAQ = [
  {
    q: "What is Checkstar?",
    a: "Checkstar is an independent, halaal-certified supermarket group based in KwaZulu-Natal. We operate three full-service stores across the greater Durban area — in Durban CBD, Overport, and Phoenix — serving the local community with fresh produce, master butchery, scratch bakery, hot foods, grocery, and beverages.",
  },
  {
    q: "Is Checkstar halaal?",
    a: "Yes — 100%. All three Checkstar branches are fully halaal-certified. Every product, every supplier, and every department is held to strict halaal standards. We also close all stores from 12:15 to 13:15 every Friday for Jumu'ah prayers.",
  },
  {
    q: "Where are Checkstar stores located?",
    a: "We have three branches in KwaZulu-Natal: Checkstar Durban at 18/26 Bertha Mkhize Street (Durban CBD), Checkstar Overport at 99 Cannon Avenue (Overport), and Checkstar Mount Edgecombe at 3333 Mark House Place, Chris Hani Road (Phoenix). Use our store locator to get directions.",
  },
  {
    q: "What departments does Checkstar have?",
    a: "Checkstar is a full-service supermarket with six departments: Fresh Produce, Master Butchery, Scratch Bakery, Hot Foods & Deli, Grocery & Pantry, and Beverages. Every department is staffed by in-store specialists and restocked daily.",
  },
  {
    q: "How do I find out about Checkstar's latest specials?",
    a: "We run four types of promotions throughout the month: Monthly Specials, Market Day (one-day flash deals), Mid-Month Specials, and Month-End value deals. You can view all current and upcoming promotions on our promotions page, or subscribe to our newsletter via the website footer.",
  },
  {
    q: "Does Checkstar offer bulk ordering?",
    a: "Yes. Our bulk ordering service caters to large families, schools, mosques, and corporate events. Speak to any Checkstar branch manager or contact your nearest store directly to discuss your requirements.",
  },
  {
    q: "What payment methods does Checkstar accept?",
    a: "We accept cash, debit and credit card, SnapScan, and Zapper at all branches. ATMs are available in-store for cash withdrawals.",
  },
  {
    q: "What are Checkstar's trading hours?",
    a: "Hours vary by branch. Durban CBD: Mon–Sat 07:00–19:00, Sun 09:00–19:00. Overport: Mon–Sun 07:00–21:00. Mount Edgecombe (Phoenix): Mon–Sat 07:00–20:00, Sun 08:00–19:00. All branches close 12:15–13:15 on Fridays for Jumu'ah.",
  },
];

/* ── Active promotions for teaser ────────────────────────────────────────── */

const PROMO_BADGE: Record<string, string> = {
  monthly:      "badge-monthly",
  "market-day": "badge-market-day",
  "mid-month":  "badge-mid-month",
  "month-end":  "badge-month-end",
};

export default function AboutPage() {
  const activePromos = promotions.filter((p) => p.isActive);
  const teaserPromos = activePromos.length > 0 ? activePromos.slice(0, 2) : promotions.slice(0, 2);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-ink pt-16 pb-16 lg:pt-24 lg:pb-20 overflow-hidden" aria-label="About hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-5">
                About Checkstar
              </p>
              <h1
                className="font-extrabold tracking-tighter text-white leading-[1.0] mb-6"
                style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)" }}
              >
                More than a{" "}
                <br className="hidden sm:block" />
                supermarket.{" "}
                <span
                  className="font-handwritten text-orange block mt-1"
                  style={{ fontSize: "clamp(2.8rem, 5vw, 4.25rem)" }}
                >
                  We care enough.
                </span>
              </h1>
              <p className="text-base text-white/55 font-light leading-relaxed max-w-md mb-8">
                Checkstar is KwaZulu-Natal&apos;s premium halaal-certified independent food retailer — built to deliver a full hyperstore experience while staying genuinely invested in every customer, employee, and community we touch.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/store-locator"
                  className="inline-flex items-center gap-2 bg-orange text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-orange-hover transition-colors duration-200 shadow-orange"
                >
                  Find a store
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/community"
                  className="inline-flex items-center gap-2 bg-white/8 border border-white/15 text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-white/15 transition-colors duration-200"
                >
                  Our community
                </Link>
              </div>
            </div>

            <AnimateOnScroll delay={0.1} className="relative h-[380px] lg:h-[460px]">
              <div className="absolute inset-0 rounded-sm overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=1200"
                  alt="Inside a Checkstar supermarket in KwaZulu-Natal"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
              </div>

              <div className="absolute -bottom-4 -left-4 lg:-left-8 max-w-[260px] bg-orange rounded-sm p-5 shadow-float z-10">
                <p className="text-sm text-white font-semibold italic leading-snug mb-3">
                  &ldquo;Our number one priority is you, our shopper.&rdquo;
                </p>
                <p className="text-[10px] text-white/70 font-bold tracking-widest uppercase">
                  The Checkstar Promise
                </p>
              </div>

              <div className="absolute top-4 right-4 bg-ink/90 backdrop-blur-sm rounded-sm px-4 py-3 z-10">
                <p className="text-2xl font-black text-white tracking-tight leading-none">3</p>
                <p className="text-[10px] text-white/50 font-bold tracking-widest uppercase mt-0.5">
                  KZN Branches
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── Who we are ────────────────────────────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-24" aria-label="Who we are">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimateOnScroll>
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-4">
                Who We Are
              </p>
              <h2
                className="font-extrabold tracking-tight text-ink leading-[1.1] mb-6"
                style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)" }}
              >
                Premium food retail with a heart for the community.
              </h2>
              <div className="space-y-4 text-base text-ink-600 font-light leading-relaxed">
                <p>
                  Checkstar was built with a clear purpose: to deliver a premium hyperstore food retail experience to KwaZulu-Natal families — without losing sight of the people on both sides of the counter. From our Durban CBD branch on Bertha Mkhize Street to our Overport and Phoenix stores, we serve diverse communities across the greater Durban metropolitan area every single day.
                </p>
                <p>
                  As an independent halaal-certified retailer, every decision we make is guided by four commitments: giving customers the right products at the right price, building a company culture our team is proud to be part of, running the business with integrity, and acting as a genuinely responsible presence in the communities we serve.
                </p>
                <p>
                  We don&apos;t outsource our values. You&apos;ll find them in our{" "}
                  <Link href="/departments/fresh-produce" className="text-orange font-medium hover:underline">
                    fresh produce department
                  </Link>
                  , in how our{" "}
                  <Link href="/departments/butchery" className="text-orange font-medium hover:underline">
                    master butchers
                  </Link>{" "}
                  work, in the farms we partner with, and in the{" "}
                  <Link href="/community" className="text-orange font-medium hover:underline">
                    schools and feeding programmes
                  </Link>{" "}
                  we support every week.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <p className="text-[11px] font-bold tracking-widest uppercase text-ink-400 mb-5">
                By the numbers
              </p>
              <div className="grid grid-cols-2 gap-4">
                {communityStats.map((stat, i) => (
                  <AnimateOnScroll key={stat.label} delay={i * 0.07}>
                    <div className="bg-white border border-ink-100 rounded-sm px-5 py-5 shadow-card">
                      <p className="text-3xl font-black text-ink tracking-tight leading-none mb-1">
                        {stat.value}
                      </p>
                      <p className="text-[11px] text-ink-400 font-bold uppercase tracking-widest leading-snug">
                        {stat.label}
                      </p>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── Halaal commitment ─────────────────────────────────────────────── */}
      <section className="bg-ink py-16 lg:py-20 border-t border-white/8" aria-label="Halaal certification">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <AnimateOnScroll>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-sm bg-green-500/15 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-green-400" aria-hidden="true" />
                </div>
                <p className="text-[11px] font-bold tracking-widest uppercase text-green-400">
                  Halaal Certified
                </p>
              </div>
              <h2
                className="font-extrabold tracking-tight text-white leading-[1.1] mb-5"
                style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)" }}
              >
                100% halaal.{" "}
                <span className="font-handwritten text-orange" style={{ fontSize: "1.1em" }}>
                  No compromises.
                </span>
              </h2>
              <p className="text-base text-white/55 font-light leading-relaxed">
                Every product, every supplier, every department across all three Checkstar branches is fully halaal-certified. This isn&apos;t a marketing position — it&apos;s a founding commitment we&apos;ve held since day one. Families across Durban, Overport, and Phoenix can shop with complete confidence.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <div className="space-y-4">
                {HALAAL_POINTS.map((pt, i) => {
                  const PIcon = pt.icon;
                  return (
                    <AnimateOnScroll key={pt.title} delay={i * 0.07}>
                      <div className="flex gap-4 bg-white/5 border border-white/10 rounded-sm p-5">
                        <div className="shrink-0 w-9 h-9 rounded-sm bg-green-500/15 flex items-center justify-center">
                          <PIcon className="w-4.5 h-4.5 text-green-400" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white mb-1">{pt.title}</p>
                          <p className="text-xs text-white/50 font-light leading-relaxed">{pt.body}</p>
                        </div>
                      </div>
                    </AnimateOnScroll>
                  );
                })}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── Four stakeholders ─────────────────────────────────────────────── */}
      <section className="bg-white border-t border-ink-100 py-16 lg:py-20" aria-label="Our commitments">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="mb-12 max-w-xl">
            <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-3">
              Our Commitments
            </p>
            <h2
              className="font-extrabold tracking-tight text-ink leading-[1.1]"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              A brand built for four.
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STAKEHOLDERS.map((s, i) => {
              const SIcon = s.icon;
              return (
                <AnimateOnScroll key={s.title} delay={i * 0.08}>
                  <div className="group border border-ink-100 rounded-sm p-6 hover:shadow-raised transition-shadow duration-300 h-full">
                    <div className="w-10 h-10 rounded-sm bg-orange/10 flex items-center justify-center mb-5 group-hover:bg-orange transition-colors duration-300">
                      <SIcon className="w-5 h-5 text-orange group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                    </div>
                    <h3 className="text-sm font-bold text-ink mb-2 tracking-tight">{s.title}</h3>
                    <p className="text-xs text-ink-600 font-light leading-relaxed">{s.body}</p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Character / Values ────────────────────────────────────────────── */}
      <section className="bg-ink py-16 lg:py-20 border-t border-white/8" aria-label="Our values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="mb-12">
            <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-3">
              Our Character
            </p>
            <h2
              className="font-extrabold tracking-tight text-white leading-[1.1] max-w-lg"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              Helpful. Humble.{" "}
              <span className="font-handwritten text-orange" style={{ fontSize: "1.15em" }}>
                Honest.
              </span>
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/8 border border-white/8 rounded-sm overflow-hidden">
            {VALUES.map((v, i) => {
              const VIcon = v.icon;
              return (
                <AnimateOnScroll key={v.title} delay={i * 0.08}>
                  <div className="bg-ink-800 p-8 h-full hover:bg-ink-600 transition-colors duration-200 group">
                    <div className="w-10 h-10 rounded-sm bg-orange/15 flex items-center justify-center mb-5 group-hover:bg-orange transition-colors duration-300">
                      <VIcon className="w-5 h-5 text-orange group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-3 tracking-tight leading-snug">{v.title}</h3>
                    <p className="text-xs text-white/45 font-light leading-relaxed">{v.body}</p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Our departments ───────────────────────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-20" aria-label="Our departments">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-2">
                Six Departments
              </p>
              <h2
                className="font-extrabold tracking-tight text-ink leading-[1.1]"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
              >
                Everything fresh, all in one roof.
              </h2>
              <p className="text-sm text-ink-600 font-light mt-3 max-w-lg">
                Each department at Checkstar is run by in-store specialists — not stocked from a central warehouse and left to sit. Every aisle is a commitment to quality.
              </p>
            </div>
            <Link
              href="/departments"
              className="shrink-0 flex items-center gap-1.5 text-sm font-bold text-orange hover:text-orange-hover transition-colors duration-200"
            >
              All departments
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {departments.map((dept, i) => {
              const d = DEPT_ICONS[dept.id];
              const DIcon = d?.icon ?? ShoppingBasket;
              const accent = d?.accent ?? "#e75b13";
              return (
                <AnimateOnScroll key={dept.id} delay={i * 0.06}>
                  <Link
                    href={dept.href}
                    className="group flex flex-col items-center text-center gap-3 bg-white border border-ink-100 rounded-sm p-5 hover:shadow-raised hover:border-orange/30 transition-all duration-200"
                  >
                    <div
                      className="w-12 h-12 rounded-sm flex items-center justify-center transition-colors duration-200"
                      style={{ background: `${accent}15` }}
                    >
                      <DIcon
                        className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                        style={{ color: accent }}
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-ink group-hover:text-orange transition-colors duration-200 leading-snug">
                        {dept.name}
                      </p>
                      <p className="text-[10px] text-ink-400 font-light mt-0.5 leading-snug hidden sm:block">
                        {dept.tagline}
                      </p>
                    </div>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Community impact ──────────────────────────────────────────────── */}
      <section className="bg-white border-t border-ink-100 py-16 lg:py-20" aria-label="Community impact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <AnimateOnScroll>
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-2">
                Rooted In KZN
              </p>
              <h2
                className="font-extrabold tracking-tight text-ink leading-[1.1]"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
              >
                We don&apos;t just serve the community.
                <span className="font-handwritten text-orange block mt-0.5" style={{ fontSize: "1.1em" }}>
                  We belong to it.
                </span>
              </h2>
            </AnimateOnScroll>
            <Link
              href="/community"
              className="shrink-0 flex items-center gap-1.5 text-sm font-bold text-orange hover:text-orange-hover transition-colors duration-200"
            >
              Our community stories
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {communityStories.map((story, i) => (
              <AnimateOnScroll key={story.id} delay={i * 0.08}>
                <article className="group bg-ink-50 border border-ink-100 rounded-sm overflow-hidden hover:shadow-raised transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative h-44 overflow-hidden shrink-0">
                    <Image
                      src={story.image.src}
                      alt={story.image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 text-ink text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                      {story.category}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-sm font-bold text-ink mb-2 group-hover:text-orange transition-colors duration-200 tracking-tight">
                      {story.title}
                    </h3>
                    <p className="text-xs text-ink-600 font-light leading-relaxed flex-1">
                      {story.excerpt}
                    </p>
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Current specials teaser ───────────────────────────────────────── */}
      <section className="bg-ink py-16 lg:py-20 border-t border-white/8" aria-label="Current promotions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-2">
                Current Deals
              </p>
              <h2
                className="font-extrabold tracking-tight text-white leading-[1.1]"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
              >
                Great prices, every week.
              </h2>
              <p className="text-sm text-white/45 font-light mt-3 max-w-lg">
                Checkstar runs four promotion types throughout the month — Monthly Specials, Market Day, Mid-Month, and Month-End deals. There&apos;s always something worth coming in for.
              </p>
            </div>
            <Link
              href="/promotions"
              className="shrink-0 flex items-center gap-1.5 text-sm font-bold text-orange hover:text-orange-hover transition-colors duration-200"
            >
              All promotions
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {teaserPromos.map((promo, i) => {
              const promoSlug = TYPE_TO_SLUG[promo.type];
              const isSingleDay = promo.validFrom === promo.validTo;
              return (
                <AnimateOnScroll key={promo.id} delay={i * 0.08}>
                  <Link
                    href={`/promotions/${promoSlug}`}
                    className="group relative h-[220px] overflow-hidden rounded-sm block"
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
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }}
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
                      <p className="text-xs text-white/45 font-light mb-1">
                        {isSingleDay ? formatDate(promo.validFrom) : `${formatDate(promo.validFrom)} — ${formatDate(promo.validTo)}`}
                      </p>
                      <h3 className="text-base font-extrabold text-white leading-tight mb-2">{promo.title}</h3>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white/60 group-hover:text-orange transition-colors duration-200">
                        View specials <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Our branches ──────────────────────────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-20" aria-label="Our branches">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-ink-400 mb-2">
                Find Us
              </p>
              <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-ink">
                Three branches across KZN
              </h2>
            </div>
            <Link
              href="/store-locator"
              className="shrink-0 flex items-center gap-1.5 text-sm font-bold text-orange hover:text-orange-hover transition-colors duration-200"
            >
              View on map
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {stores.map((store, i) => (
              <AnimateOnScroll key={store.id} delay={i * 0.08}>
                <div className="group bg-white border border-ink-100 rounded-sm overflow-hidden hover:shadow-raised transition-shadow duration-300">
                  <div className="relative h-44 overflow-hidden">
                    {store.image && (
                      <Image
                        src={store.image}
                        alt={store.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" aria-hidden="true" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[9px] font-bold tracking-widest uppercase bg-orange text-white px-2.5 py-1 rounded-sm">
                        {store.suburb}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-ink mb-3 group-hover:text-orange transition-colors duration-200">
                      {store.name}
                    </h3>
                    <div className="space-y-1.5 mb-4">
                      <p className="flex items-start gap-2 text-xs text-ink-600 font-light">
                        <MapPin className="w-3.5 h-3.5 text-orange shrink-0 mt-0.5" aria-hidden="true" />
                        {store.address}, {store.suburb}
                      </p>
                      <p className="flex items-center gap-2 text-xs text-ink-600 font-light">
                        <Phone className="w-3.5 h-3.5 text-orange shrink-0" aria-hidden="true" />
                        {store.phone}
                      </p>
                    </div>
                    <Link
                      href="/store-locator"
                      className="text-xs font-bold text-orange hover:text-orange-hover transition-colors duration-200 flex items-center gap-1"
                    >
                      View store details
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-ink-100 py-16 lg:py-20" aria-label="Frequently asked questions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="mb-10">
            <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-3">
              Common Questions
            </p>
            <h2
              className="font-extrabold tracking-tight text-ink leading-[1.1]"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              Everything you need to know.
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {FAQ.map((item, i) => (
              <AnimateOnScroll key={item.q} delay={i * 0.05}>
                <details className="group border border-ink-100 rounded-sm overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-ink-50 transition-colors duration-200">
                    <h3 className="text-sm font-bold text-ink leading-snug">{item.q}</h3>
                    <span
                      className="shrink-0 w-5 h-5 rounded-full border border-ink-200 flex items-center justify-center text-ink-400 group-open:rotate-45 group-open:border-orange group-open:text-orange transition-all duration-200 text-base font-light leading-none"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5 pt-1">
                    <p className="text-sm text-ink-600 font-light leading-relaxed">{item.a}</p>
                  </div>
                </details>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Careers CTA ───────────────────────────────────────────────────── */}
      <section className="bg-ink py-14 lg:py-16 border-t border-white/8" aria-label="Careers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-2">
                Join Our Team
              </p>
              <h2 className="text-xl lg:text-2xl font-extrabold tracking-tight text-white leading-tight">
                We&apos;re growing.{" "}
                <span className="font-handwritten text-orange" style={{ fontSize: "1.15em" }}>
                  Come grow with us.
                </span>
              </h2>
              <p className="text-sm text-white/45 font-light mt-2 max-w-md">
                Checkstar is an equal opportunity employer committed to hiring from the communities we serve across KwaZulu-Natal.
              </p>
            </div>
            <Link
              href="/careers"
              className="shrink-0 inline-flex items-center gap-2 bg-orange text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-orange-hover transition-colors duration-200 shadow-orange"
            >
              View open positions
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
