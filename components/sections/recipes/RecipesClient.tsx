"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, ChefHat } from "lucide-react";
import type { Recipe } from "@/types";
import { RECIPE_CATEGORIES } from "@/data/recipes";
import { cn } from "@/lib/utils";

const DIFFICULTY_STYLE = {
  Easy:     "text-green-700 bg-green-50 border border-green-100",
  Medium:   "text-amber-700 bg-amber-50 border border-amber-100",
  Advanced: "text-red-700   bg-red-50   border border-red-100",
};

interface Props {
  recipes: Recipe[];
}

export function RecipesClient({ recipes }: Props) {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? recipes : recipes.filter((r) => r.category === active);

  return (
    <div>
      {/* ── Category filter ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter by category">
        {["All", ...RECIPE_CATEGORIES].map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
            className={cn(
              "text-xs font-bold px-4 py-2 rounded-sm border transition-all duration-200",
              active === cat
                ? "bg-orange text-white border-orange shadow-orange"
                : "bg-white text-ink-600 border-ink-100 hover:border-orange hover:text-orange"
            )}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto self-center text-xs text-ink-400 font-light">
          {filtered.length} recipe{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Recipe grid ──────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-ink-400">
          <ChefHat className="w-10 h-10 mx-auto mb-4 opacity-30" aria-hidden="true" />
          <p className="text-sm font-light">No recipes in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.slug}`}
              className="group bg-white border border-ink-100 rounded-sm overflow-hidden hover:shadow-raised transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden shrink-0">
                <Image
                  src={recipe.image.src}
                  alt={recipe.image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-sm", DIFFICULTY_STYLE[recipe.difficulty])}>
                    {recipe.difficulty}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold bg-ink/70 text-white/80 backdrop-blur-sm px-2 py-0.5 rounded-sm">
                    {recipe.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-sm font-bold text-ink mb-2 group-hover:text-orange transition-colors duration-200 leading-snug">
                  {recipe.title}
                </h3>
                <p className="text-xs text-ink-600 font-light leading-relaxed mb-4 line-clamp-2 flex-1">
                  {recipe.description}
                </p>
                <div className="flex items-center gap-4 text-[11px] text-ink-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {recipe.prepTime} prep
                  </span>
                  {recipe.cookTime !== "0 min" && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {recipe.cookTime} cook
                    </span>
                  )}
                  <span className="flex items-center gap-1 ml-auto">
                    <Users className="w-3 h-3" aria-hidden="true" />
                    {recipe.servings}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
