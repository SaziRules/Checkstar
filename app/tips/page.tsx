import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { tips, featuredTips } from "@/data/tips";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { TipsClient } from "./TipsClient";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tips 4 You",
  description:
    "Smart shopping, storage, cooking, and budget advice from the Checkstar team — practical tips to help you get more from every trip to the store.",
};

const CATEGORY_STYLE: Record<string, string> = {
  Shopping: "text-blue-700 bg-blue-50 border border-blue-100",
  Storage:  "text-amber-700 bg-amber-50 border border-amber-100",
  Cooking:  "text-orange bg-orange-50 border border-orange-100",
  Health:   "text-green-700 bg-green-50 border border-green-100",
  Budget:   "text-purple-700 bg-purple-50 border border-purple-100",
  Seasonal: "text-teal-700 bg-teal-50 border border-teal-100",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function TipsPage() {
  const [heroTip, ...restFeatured] = featuredTips;
  const sideTips = restFeatured.slice(0, 2);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-ink pt-16 pb-16 lg:pt-24 lg:pb-20" aria-label="Tips hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-5">
              Tips 4 You
            </p>
            <h1
              className="font-extrabold tracking-tighter text-white leading-[1.0] mb-5"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              Shop smarter.
              <br className="hidden sm:block" />
              Cook better.{" "}
              <span className="font-handwritten text-orange" style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)" }}>
                Waste less.
              </span>
            </h1>
            <p className="text-base text-white/60 font-light leading-relaxed max-w-lg">
              Practical advice from the Checkstar team — on storage, budgeting, cooking, and getting the most out of every shopping trip.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Featured tips ─────────────────────────────────────────────────── */}
      {featuredTips.length > 0 && (
        <section className="bg-cream py-14 lg:py-20" aria-label="Featured tips">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <AnimateOnScroll className="mb-10">
              <p className="text-[11px] font-bold tracking-widest uppercase text-ink-400">
                Must-Reads
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

              {/* Hero featured tip */}
              {heroTip && (
                <AnimateOnScroll className="lg:col-span-3">
                  <Link
                    href={`/tips/${heroTip.slug}`}
                    className="group relative flex flex-col justify-end h-[420px] lg:h-[500px] rounded-sm overflow-hidden block"
                    aria-label={`Read: ${heroTip.title}`}
                  >
                    <Image
                      src={heroTip.image.src}
                      alt={heroTip.image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)" }}
                      aria-hidden="true"
                    />
                    <div className="relative z-10 p-7">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-sm", CATEGORY_STYLE[heroTip.category])}>
                          {heroTip.category}
                        </span>
                        <span className="text-[11px] text-white/55 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          {heroTip.readTime}
                        </span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-2 leading-tight">
                        {heroTip.title}
                      </h2>
                      <p className="text-sm text-white/65 font-light line-clamp-2 mb-5 max-w-md">
                        {heroTip.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white/70 group-hover:text-orange transition-colors duration-200">
                        Read article <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </AnimateOnScroll>
              )}

              {/* Side featured tips */}
              <div className="lg:col-span-2 flex flex-col gap-5 lg:h-[500px]">
                {sideTips.map((tip, i) => (
                  <AnimateOnScroll key={tip.id} delay={0.08 + i * 0.07} className="lg:flex-1 lg:min-h-0">
                    <Link
                      href={`/tips/${tip.slug}`}
                      className="group relative h-[200px] lg:h-full rounded-sm overflow-hidden block"
                      aria-label={`Read: ${tip.title}`}
                    >
                      <Image
                        src={tip.image.src}
                        alt={tip.image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 65%, transparent 100%)" }}
                        aria-hidden="true"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-sm", CATEGORY_STYLE[tip.category])}>
                            {tip.category}
                          </span>
                          <span className="text-[10px] text-white/50 flex items-center gap-1">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            {tip.readTime}
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold text-white leading-tight mb-1">
                          {tip.title}
                        </h3>
                      </div>
                    </Link>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── All tips ──────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-ink-100 py-14 lg:py-20" aria-label="All tips">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="mb-10">
            <p className="text-[11px] font-bold tracking-widest uppercase text-ink-400 mb-2">
              Browse by Topic
            </p>
            <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-ink">
              All tips &amp; articles
            </h2>
          </AnimateOnScroll>

          <TipsClient tips={tips} />
        </div>
      </section>
    </>
  );
}
