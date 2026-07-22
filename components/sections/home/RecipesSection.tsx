import Link from "next/link";
import { Clock, Users, ArrowRight, ChefHat } from "lucide-react";
import { featuredRecipes } from "@/data/recipes";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { cn } from "@/lib/utils";
import type { Recipe } from "@/types";

function recipeFallback(recipe: Recipe): string {
  const meatTags = ["Beef", "Chicken", "Lamb", "Peri-Peri", "Braai"];
  if (recipe.tags.some((t) => meatTags.includes(t))) return "/images/fresh-meat.png";
  if (recipe.category === "Baked" || recipe.category === "Salads") return "/images/veg.png";
  return "/images/grocerry.jpg";
}

const difficultyColor = {
  Easy: "text-open bg-open-bg",
  Medium: "text-amber-700 bg-amber-50",
  Advanced: "text-red-700 bg-red-50",
};

export function RecipesSection() {
  const [hero, ...rest] = featuredRecipes;
  const sideCards = rest.slice(0, 3);

  return (
    <section
      id="recipes"
      aria-label="Recipes and inspiration"
      className="py-20 lg:py-28 bg-ink-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimateOnScroll className="mb-14">
          <p className="text-xs font-bold tracking-widest uppercase text-orange mb-3">
            What&apos;s For Dinner?
          </p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter text-ink leading-tight text-balance">
              Authentic South African <br />flavours, made fresh.
            </h2>
            <Link
              href="/recipes"
              className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-ink-600 hover:text-orange transition-colors duration-200"
            >
              All Recipes
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </AnimateOnScroll>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Hero recipe — large, spans 3 columns */}
          {hero && (
            <AnimateOnScroll className="lg:col-span-3" delay={0.05}>
              <Link
                href={`/recipes/${hero.slug}`}
                className="group relative flex flex-col justify-end rounded-lg overflow-hidden bg-ink-200 h-80 lg:h-[500px]"
                aria-label={`View recipe: ${hero.title}`}
              >
                <ImageWithFallback
                  src={hero.image.src}
                  fallback={recipeFallback(hero)}
                  alt={hero.image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" aria-hidden="true" />
                <div className="relative z-10 p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-sm", difficultyColor[hero.difficulty])}>
                      {hero.difficulty}
                    </span>
                    <span className="text-[11px] text-white/60 font-medium">{hero.category}</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight mb-2">
                    {hero.title}
                  </h3>
                  <p className="text-sm text-white/70 font-light line-clamp-2 mb-4 max-w-md">
                    {hero.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/60">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {hero.prepTime} prep
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {hero.cookTime} cook
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" aria-hidden="true" />
                      Serves {hero.servings}
                    </span>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          )}

          {/* Side cards — right side */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {sideCards.map((recipe, i) => (
              <AnimateOnScroll key={recipe.id} delay={0.1 + i * 0.08}>
                <Link
                  href={`/recipes/${recipe.slug}`}
                  className="group flex gap-4 bg-white border border-ink-100 rounded-lg overflow-hidden hover:shadow-card transition-shadow duration-300"
                  aria-label={`View recipe: ${recipe.title}`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-28 h-28 shrink-0 bg-ink-100">
                    <ImageWithFallback
                      src={recipe.image.src}
                      fallback={recipeFallback(recipe)}
                      alt={recipe.image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="112px"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 py-4 pr-4">
                    <span className={cn("inline-block text-[10px] font-bold px-2 py-0.5 rounded-sm mb-2", difficultyColor[recipe.difficulty])}>
                      {recipe.difficulty}
                    </span>
                    <h3 className="text-sm font-bold text-ink tracking-tight mb-1 group-hover:text-orange transition-colors duration-200">
                      {recipe.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-ink-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {recipe.prepTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" aria-hidden="true" />
                        {recipe.servings}
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}

            {/* CTA card */}
            <AnimateOnScroll delay={0.24}>
              <Link
                href="/recipes"
                className="group flex items-center justify-between bg-orange-50 border border-orange-100 rounded-lg px-5 py-4 hover:bg-orange hover:border-orange transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <ChefHat className="w-5 h-5 text-orange group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-orange group-hover:text-white transition-colors duration-300">
                      Explore all recipes
                    </p>
                    <p className="text-xs text-ink-400 group-hover:text-white/80 transition-colors duration-300">
                      40+ South African favourites
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-orange group-hover:text-white transition-all duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
