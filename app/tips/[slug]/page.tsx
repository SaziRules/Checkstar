import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Clock, Calendar, Tag, ArrowRight, Lightbulb } from "lucide-react";
import { tips } from "@/data/tips";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return tips.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tip = tips.find((t) => t.slug === slug);
  if (!tip) return { title: "Article Not Found" };
  return {
    title: tip.title,
    description: tip.excerpt,
  };
}

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

export default async function TipDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tip = tips.find((t) => t.slug === slug);
  if (!tip) notFound();

  const related = tips
    .filter((t) => t.slug !== slug)
    .sort((a, b) => {
      // same category first
      if (a.category === tip.category && b.category !== tip.category) return -1;
      if (b.category === tip.category && a.category !== tip.category) return 1;
      return 0;
    })
    .slice(0, 3);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ height: "clamp(340px, 55vh, 580px)" }}
        aria-label="Article hero"
      >
        <Image
          src={tip.image.src}
          alt={tip.image.alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.18) 100%)" }}
          aria-hidden="true"
        />

        {/* Back link */}
        <div className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/tips"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white/60 hover:text-white transition-colors duration-200"
          >
            <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
            All Tips
          </Link>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 lg:pb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-sm", CATEGORY_STYLE[tip.category])}>
              {tip.category}
            </span>
            <span className="text-xs text-white/45 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" aria-hidden="true" />
              {tip.readTime}
            </span>
          </div>
          <h1
            className="font-extrabold tracking-tighter text-white leading-[1.0] mb-3 max-w-2xl"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
          >
            {tip.title}
          </h1>
          <p className="text-sm text-white/55 font-light max-w-xl leading-relaxed">
            {tip.excerpt}
          </p>
        </div>
      </section>

      {/* ── Meta bar ──────────────────────────────────────────────────────── */}
      <div className="bg-ink border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-orange shrink-0" aria-hidden="true" />
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Published</p>
                <p className="text-white font-bold text-xs">{formatDate(tip.date)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-orange shrink-0" aria-hidden="true" />
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Read Time</p>
                <p className="text-white font-bold text-xs">{tip.readTime}</p>
              </div>
            </div>
            {tip.tags.length > 0 && (
              <div className="flex items-center gap-2 ml-auto">
                <Tag className="w-3.5 h-3.5 text-white/30 shrink-0" aria-hidden="true" />
                <div className="flex flex-wrap gap-1.5">
                  {tip.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-white/40 bg-white/8 px-2 py-0.5 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Article body ──────────────────────────────────────────────────── */}
      <section className="bg-cream py-14 lg:py-20" aria-label="Article content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Intro */}
              <p className="text-base text-ink-800 font-light leading-relaxed mb-10 border-l-2 border-orange pl-5">
                {tip.intro}
              </p>

              {/* Sections */}
              <div className="space-y-10">
                {tip.sections.map((section, i) => (
                  <div key={i}>
                    {section.heading && (
                      <h2 className="text-base font-extrabold text-ink tracking-tight mb-4">
                        {section.heading}
                      </h2>
                    )}
                    <div className="space-y-3">
                      {section.body.map((para, j) => (
                        <p key={j} className="text-sm text-ink-600 font-light leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar: key takeaways */}
            <div className="lg:col-span-1">
              {tip.keyTakeaways && tip.keyTakeaways.length > 0 && (
                <div className="bg-orange/8 border border-orange/20 rounded-sm p-6 sticky top-24">
                  <div className="flex items-center gap-2 mb-5">
                    <Lightbulb className="w-4 h-4 text-orange shrink-0" aria-hidden="true" />
                    <p className="text-xs font-bold text-orange uppercase tracking-widest">
                      Key Takeaways
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {tip.keyTakeaways.map((point) => (
                      <li key={point} className="flex gap-3 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0 mt-1.5" aria-hidden="true" />
                        <p className="text-sm text-ink-700 leading-relaxed font-light">{point}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-5 border-t border-orange/15">
                    <Link
                      href="/tips"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-orange hover:text-orange-hover transition-colors duration-200"
                    >
                      More tips
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Related tips ──────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-white border-t border-ink-100 py-14 lg:py-20" aria-label="More tips">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4 mb-10">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">More to read</h2>
              <Link
                href="/tips"
                className="flex items-center gap-1.5 text-sm font-bold text-orange hover:text-orange-hover transition-colors duration-200"
              >
                All tips
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((t) => (
                <Link
                  key={t.id}
                  href={`/tips/${t.slug}`}
                  className="group bg-ink-50 border border-ink-100 rounded-sm overflow-hidden hover:shadow-raised transition-shadow duration-300 flex flex-col"
                >
                  <div className="relative h-44 overflow-hidden shrink-0">
                    <Image
                      src={t.image.src}
                      alt={t.image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-sm", CATEGORY_STYLE[t.category])}>
                        {t.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-sm font-bold text-ink group-hover:text-orange transition-colors duration-200 leading-snug mb-2">
                      {t.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-ink-400 mt-auto pt-3 border-t border-ink-100">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {t.readTime}
                      </span>
                      <span className="flex items-center gap-1 ml-auto">
                        <Calendar className="w-3 h-3" aria-hidden="true" />
                        {formatDate(t.date)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
