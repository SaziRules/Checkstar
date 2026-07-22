"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import type { Tip } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Shopping", "Storage", "Cooking", "Health", "Budget", "Seasonal"] as const;

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

export function TipsClient({ tips }: { tips: Tip[] }) {
  const [active, setActive] = useState<string>("All");

  const filtered = active === "All" ? tips : tips.filter((t) => t.category === active);

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-sm transition-colors duration-200",
              active === cat
                ? "bg-orange text-white"
                : "bg-ink-100 text-ink-600 hover:bg-ink-200"
            )}
            aria-pressed={active === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tip) => (
          <Link
            key={tip.id}
            href={`/tips/${tip.slug}`}
            className="group bg-white border border-ink-100 rounded-sm overflow-hidden hover:shadow-raised transition-shadow duration-300 flex flex-col"
            aria-label={`Read: ${tip.title}`}
          >
            <div className="relative h-48 overflow-hidden shrink-0">
              <Image
                src={tip.image.src}
                alt={tip.image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute top-3 left-3">
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-sm", CATEGORY_STYLE[tip.category])}>
                  {tip.category}
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-sm font-bold text-ink group-hover:text-orange transition-colors duration-200 leading-snug mb-2">
                {tip.title}
              </h3>
              <p className="text-xs text-ink-600 font-light leading-relaxed line-clamp-2 mb-4 flex-1">
                {tip.excerpt}
              </p>
              <div className="flex items-center justify-between text-[11px] text-ink-400 mt-auto pt-3 border-t border-ink-100">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" aria-hidden="true" />
                  {formatDate(tip.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  {tip.readTime}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-ink-400 text-center py-16">
          No tips in this category yet — check back soon.
        </p>
      )}
    </div>
  );
}
