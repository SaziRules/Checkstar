import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Users, ChefHat, Send } from "lucide-react";
import { recipes, featuredRecipes } from "@/data/recipes";
import { cn } from "@/lib/utils";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { RecipesClient } from "@/components/sections/recipes/RecipesClient";

export const metadata: Metadata = {
  title: "Recipes",
  description:
    "Explore authentic South African recipes from Checkstar — from Durban Bunny Chow and Lamb Biryani to Malva Pudding and Braai classics. Fresh ideas using ingredients from our departments.",
};

const DIFFICULTY_STYLE = {
  Easy:     "text-green-700 bg-green-50 border border-green-100",
  Medium:   "text-amber-700 bg-amber-50 border border-amber-100",
  Advanced: "text-red-700   bg-red-50   border border-red-100",
};

export default function RecipesPage() {
  const [heroRecipe, ...rest] = featuredRecipes;
  const otherFeatured = rest.slice(0, 2);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-ink pt-16 pb-14 lg:pt-20 lg:pb-16" aria-label="Recipes hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-4">
              Checkstar Recipes
            </p>
            <h1
              className="font-extrabold tracking-tighter text-white leading-[1.0] mb-5"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              Fresh ideas,{" "}
              <span className="font-handwritten text-orange" style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)" }}>
                straight from our kitchen.
              </span>
            </h1>
            <p className="text-base text-white/55 font-light leading-relaxed max-w-lg">
              Authentic South African recipes — from Durban street food classics to slow-cooked Sunday meals — all made with fresh ingredients from our departments.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured recipes ──────────────────────────────────────────────── */}
      {featuredRecipes.length > 0 && (
        <section className="bg-cream py-14 lg:py-20" aria-label="Featured recipes">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <AnimateOnScroll className="flex items-center gap-3 mb-10">
              <span className="text-[11px] font-bold tracking-widest uppercase text-ink">
                Featured This Month
              </span>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              {/* Hero recipe card */}
              {heroRecipe && (
                <AnimateOnScroll className="lg:col-span-3">
                  <Link
                    href={`/recipes/${heroRecipe.slug}`}
                    className="group relative flex flex-col justify-end h-[420px] lg:h-[500px] rounded-sm overflow-hidden block"
                    aria-label={`View recipe: ${heroRecipe.title}`}
                  >
                    <Image
                      src={heroRecipe.image.src}
                      alt={heroRecipe.image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)" }}
                      aria-hidden="true"
                    />
                    <div className="relative z-10 p-7">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-sm", DIFFICULTY_STYLE[heroRecipe.difficulty])}>
                          {heroRecipe.difficulty}
                        </span>
                        <span className="text-[11px] text-white/55 font-medium">{heroRecipe.category}</span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-2 leading-tight">
                        {heroRecipe.title}
                      </h2>
                      <p className="text-sm text-white/65 font-light line-clamp-2 mb-5 max-w-md">
                        {heroRecipe.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-white/55">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                            {heroRecipe.prepTime} prep · {heroRecipe.cookTime} cook
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" aria-hidden="true" />
                            Serves {heroRecipe.servings}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white/70 group-hover:text-orange transition-colors duration-200">
                          View recipe <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              )}

              {/* Side featured cards */}
              <div className="lg:col-span-2 flex flex-col gap-5 lg:h-[500px]">
                {otherFeatured.map((recipe, i) => (
                  <AnimateOnScroll key={recipe.id} delay={0.08 + i * 0.07} className="lg:flex-1 lg:min-h-0">
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      className="group relative h-[200px] lg:h-full rounded-sm overflow-hidden block"
                      aria-label={`View recipe: ${recipe.title}`}
                    >
                      <Image
                        src={recipe.image.src}
                        alt={recipe.image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)" }}
                        aria-hidden="true"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-sm", DIFFICULTY_STYLE[recipe.difficulty])}>
                            {recipe.difficulty}
                          </span>
                          <span className="text-[10px] text-white/50">{recipe.category}</span>
                        </div>
                        <h3 className="text-base font-extrabold text-white leading-tight mb-1">
                          {recipe.title}
                        </h3>
                        <p className="text-xs text-white/55 flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            {recipe.prepTime} prep
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" aria-hidden="true" />
                            {recipe.servings}
                          </span>
                        </p>
                      </div>
                    </Link>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── All recipes with filter ───────────────────────────────────────── */}
      <section className="bg-white border-t border-ink-100 py-14 lg:py-20" aria-label="All recipes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="mb-10">
            <p className="text-[11px] font-bold tracking-widest uppercase text-ink-400 mb-2">
              Browse By Category
            </p>
            <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-ink">
              All recipes
            </h2>
          </AnimateOnScroll>

          <RecipesClient recipes={recipes} />
        </div>
      </section>

      {/* ── Submit your recipe ────────────────────────────────────────────── */}
      <section className="bg-ink py-16 lg:py-20 border-t border-white/8" aria-label="Submit your recipe">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <AnimateOnScroll>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-sm bg-orange/15 flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-orange" aria-hidden="true" />
                </div>
                <p className="text-[11px] font-bold tracking-widest uppercase text-orange">
                  Community Kitchen
                </p>
              </div>
              <h2
                className="font-extrabold tracking-tight text-white leading-[1.1] mb-5"
                style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)" }}
              >
                Got a recipe to share?{" "}
                <span className="font-handwritten text-orange" style={{ fontSize: "1.1em" }}>
                  We&apos;d love it.
                </span>
              </h2>
              <p className="text-base text-white/55 font-light leading-relaxed">
                Checkstar is built on community. If you have a family recipe, a Durban classic, or something you&apos;ve perfected using our fresh departments — share it with us. The best submissions get featured right here on our recipes page.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <RecipeSubmitForm />
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Recipe submission form ──────────────────────────────────────────────── */

function RecipeSubmitForm() {
  return (
    <form
      action="/api/recipe-submit"
      method="POST"
      className="space-y-4"
      aria-label="Submit your recipe"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="recipe-name" className="block text-xs font-bold text-white/60 mb-1.5 uppercase tracking-widest">
            Your Name
          </label>
          <input
            id="recipe-name"
            name="name"
            type="text"
            required
            placeholder="e.g. Fatima Moosa"
            className="w-full px-4 py-3 text-sm bg-white/8 border border-white/15 rounded-sm text-white placeholder:text-white/30 focus:outline-none focus:border-orange transition-colors duration-200"
          />
        </div>
        <div>
          <label htmlFor="recipe-phone" className="block text-xs font-bold text-white/60 mb-1.5 uppercase tracking-widest">
            Contact Number
          </label>
          <input
            id="recipe-phone"
            name="phone"
            type="tel"
            placeholder="e.g. 083 123 4567"
            className="w-full px-4 py-3 text-sm bg-white/8 border border-white/15 rounded-sm text-white placeholder:text-white/30 focus:outline-none focus:border-orange transition-colors duration-200"
          />
        </div>
      </div>

      <div>
        <label htmlFor="recipe-email" className="block text-xs font-bold text-white/60 mb-1.5 uppercase tracking-widest">
          Email Address
        </label>
        <input
          id="recipe-email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          className="w-full px-4 py-3 text-sm bg-white/8 border border-white/15 rounded-sm text-white placeholder:text-white/30 focus:outline-none focus:border-orange transition-colors duration-200"
        />
      </div>

      <div>
        <label htmlFor="recipe-details" className="block text-xs font-bold text-white/60 mb-1.5 uppercase tracking-widest">
          Your Recipe
        </label>
        <textarea
          id="recipe-details"
          name="recipe"
          required
          rows={5}
          placeholder="Tell us the recipe name, ingredients, and how to make it..."
          className="w-full px-4 py-3 text-sm bg-white/8 border border-white/15 rounded-sm text-white placeholder:text-white/30 focus:outline-none focus:border-orange transition-colors duration-200 resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-orange text-white text-sm font-bold py-3.5 rounded-sm hover:bg-orange-hover transition-colors duration-200 shadow-orange"
      >
        Submit Recipe
        <Send className="w-4 h-4" aria-hidden="true" />
      </button>
    </form>
  );
}
