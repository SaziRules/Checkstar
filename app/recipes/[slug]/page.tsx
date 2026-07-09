import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft, Clock, Users, BarChart2,
  CheckCircle, Lightbulb, ArrowRight, Tag,
} from "lucide-react";
import { recipes } from "@/data/recipes";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) return { title: "Recipe Not Found" };
  return {
    title: recipe.title,
    description: recipe.description,
  };
}

const DIFFICULTY_STYLE = {
  Easy:     "text-green-700 bg-green-50 border border-green-100",
  Medium:   "text-amber-700 bg-amber-50 border border-amber-100",
  Advanced: "text-red-700   bg-red-50   border border-red-100",
};

const DIFFICULTY_BAR = {
  Easy:     1,
  Medium:   2,
  Advanced: 3,
};

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) notFound();

  const others = recipes
    .filter((r) => r.slug !== slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const diffBars = DIFFICULTY_BAR[recipe.difficulty];

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[420px] max-h-[620px] overflow-hidden" aria-label="Recipe hero">
        <Image
          src={recipe.image.src}
          alt={recipe.image.alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.15) 100%)" }}
          aria-hidden="true"
        />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white/60 hover:text-white transition-colors duration-200"
          >
            <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
            All Recipes
          </Link>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 lg:pb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-sm", DIFFICULTY_STYLE[recipe.difficulty])}>
              {recipe.difficulty}
            </span>
            <span className="text-xs text-white/45 font-medium">{recipe.category}</span>
          </div>
          <h1
            className="font-extrabold tracking-tighter text-white leading-[1.0] mb-4 max-w-2xl"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
          >
            {recipe.title}
          </h1>
          <p className="text-sm text-white/55 font-light max-w-xl leading-relaxed">
            {recipe.description}
          </p>
        </div>
      </section>

      {/* ── Meta bar ──────────────────────────────────────────────────────── */}
      <div className="bg-ink border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 py-5">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-orange shrink-0" aria-hidden="true" />
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Prep</p>
                <p className="text-white font-bold">{recipe.prepTime}</p>
              </div>
            </div>
            {recipe.cookTime !== "0 min" && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-orange shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Cook</p>
                  <p className="text-white font-bold">{recipe.cookTime}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-orange shrink-0" aria-hidden="true" />
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Serves</p>
                <p className="text-white font-bold">{recipe.servings}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BarChart2 className="w-4 h-4 text-orange shrink-0" aria-hidden="true" />
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Difficulty</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className={cn(
                        "w-4 h-1.5 rounded-full",
                        n <= diffBars ? "bg-orange" : "bg-white/20"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Tags */}
            {recipe.tags.length > 0 && (
              <div className="flex items-center gap-2 ml-auto">
                <Tag className="w-3.5 h-3.5 text-white/30 shrink-0" aria-hidden="true" />
                <div className="flex flex-wrap gap-1.5">
                  {recipe.tags.map((tag) => (
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

      {/* ── Ingredients + Method ──────────────────────────────────────────── */}
      <section className="bg-cream py-14 lg:py-20" aria-label="Recipe ingredients and method">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Ingredients — narrower left column */}
            <div>
              <h2 className="text-xs font-bold tracking-widest uppercase text-orange mb-5">
                Ingredients
              </h2>
              {recipe.ingredients && recipe.ingredients.length > 0 ? (
                <ul className="space-y-2.5">
                  {recipe.ingredients.map((ing) => (
                    <li key={ing} className="flex items-start gap-3 text-sm text-ink-600 font-light border-b border-ink-100 pb-2.5 last:border-0">
                      <CheckCircle className="w-3.5 h-3.5 text-orange shrink-0 mt-0.5" aria-hidden="true" />
                      {ing}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink-400 font-light italic">Full ingredients list coming soon.</p>
              )}
            </div>

            {/* Method — wider right column */}
            <div className="lg:col-span-2">
              <h2 className="text-xs font-bold tracking-widest uppercase text-orange mb-5">
                Method
              </h2>
              {recipe.method && recipe.method.length > 0 ? (
                <ol className="space-y-6">
                  {recipe.method.map((step, i) => (
                    <li key={i} className="flex gap-5">
                      <span className="shrink-0 w-7 h-7 rounded-full bg-orange text-white text-xs font-extrabold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-ink-600 font-light leading-relaxed pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm text-ink-400 font-light italic">Full method coming soon.</p>
              )}

              {/* Tip */}
              {recipe.tip && (
                <div className="mt-8 flex gap-4 bg-orange/8 border border-orange/20 rounded-sm p-5">
                  <Lightbulb className="w-5 h-5 text-orange shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-bold text-orange uppercase tracking-widest mb-1">Chef&apos;s Tip</p>
                    <p className="text-sm text-ink-600 font-light leading-relaxed">{recipe.tip}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── More recipes ──────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-ink-100 py-14 lg:py-20" aria-label="More recipes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">More to cook</h2>
            <Link
              href="/recipes"
              className="flex items-center gap-1.5 text-sm font-bold text-orange hover:text-orange-hover transition-colors duration-200"
            >
              All recipes
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {others.map((r) => (
              <Link
                key={r.id}
                href={`/recipes/${r.slug}`}
                className="group bg-ink-50 border border-ink-100 rounded-sm overflow-hidden hover:shadow-raised transition-shadow duration-300 flex flex-col"
              >
                <div className="relative h-44 overflow-hidden shrink-0">
                  <Image
                    src={r.image.src}
                    alt={r.image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-sm", DIFFICULTY_STYLE[r.difficulty])}>
                      {r.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-1">{r.category}</p>
                  <h3 className="text-sm font-bold text-ink group-hover:text-orange transition-colors duration-200 leading-snug mb-2">
                    {r.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] text-ink-400 mt-auto">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {r.prepTime}
                    </span>
                    <span className="flex items-center gap-1 ml-auto">
                      <Users className="w-3 h-3" aria-hidden="true" />
                      {r.servings}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
