import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Leaf, Beef, Wheat, Flame, ShoppingBasket, GlassWater,
  Truck, Award, Clock, Heart,
} from "lucide-react";
import { departments } from "@/data/departments";
import { cn } from "@/lib/utils";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Departments",
  description:
    "Explore every Checkstar department — Farm-fresh produce, on-site Master Butchery, Scratch Bakery, Hot Foods & Deli, Grocery & Pantry, and Beverages.",
};

const DEPT_ICONS: Record<string, React.ElementType> = {
  produce:   Leaf,
  butchery:  Beef,
  bakery:    Wheat,
  deli:      Flame,
  grocery:   ShoppingBasket,
  beverages: GlassWater,
};

const PILLARS = [
  {
    icon: Truck,
    title: "Farm Direct",
    body: "Produce sourced from regional KZN farms — on shelf within 24 hours of harvest.",
  },
  {
    icon: Award,
    title: "Expert Craft",
    body: "On-site blockmen, bakers, and chefs handcrafting fresh product every single day.",
  },
  {
    icon: Clock,
    title: "Daily Restocking",
    body: "Every department is restocked daily so you always find what you came for.",
  },
  {
    icon: Heart,
    title: "Family Value",
    body: "Prices negotiated directly with suppliers — no inflated margins, just honest value.",
  },
];

export default function DepartmentsPage() {
  const [featured, ...rest] = departments;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-ink pt-16 pb-12 lg:pt-20 lg:pb-16" aria-label="Departments hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-4">
              Checkstar Departments
            </p>
            <h1
              className="font-extrabold tracking-tighter text-white leading-[1.0] mb-5"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              Everything fresh,{" "}
              <span className="font-handwritten text-orange" style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)" }}>
                all in one place.
              </span>
            </h1>
            <p className="text-base text-white/55 font-light leading-relaxed max-w-lg">
              Six full-service departments under one roof — each run by in-store specialists who take pride in what they put on shelf every day.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured department ────────────────────────────────────────────── */}
      <section className="bg-cream pt-14 lg:pt-20" aria-label="Featured department">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <Link
              href={featured.href}
              className="group relative block h-[420px] lg:h-[480px] overflow-hidden rounded-sm shadow-raised"
            >
              <Image
                src={featured.image.src}
                alt={featured.image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.08) 100%)",
                }}
                aria-hidden="true"
              />

              {/* Badge */}
              <div className="absolute top-6 left-6">
                <span className="text-[9px] font-bold tracking-widest uppercase bg-orange text-white px-3 py-1 rounded-sm">
                  Flagship Department
                </span>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="px-8 lg:px-12 max-w-xl">
                  <p className="text-xs text-white/50 font-light mb-3">{featured.tagline}</p>
                  <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tighter text-white mb-4 leading-tight">
                    {featured.name}
                  </h2>
                  <p className="text-sm text-white/65 font-light leading-relaxed mb-7 max-w-sm">
                    {featured.description}
                  </p>
                  <span className="inline-flex items-center gap-2 bg-orange text-white text-sm font-bold px-6 py-3 rounded-sm group-hover:bg-orange-hover transition-colors duration-200 shadow-orange">
                    Explore
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Department grid ────────────────────────────────────────────────── */}
      <section className="bg-cream py-5 pb-16 lg:pb-20" aria-label="All departments">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {rest.map((dept, i) => {
              const Icon = DEPT_ICONS[dept.id] ?? ShoppingBasket;
              return (
                <AnimateOnScroll key={dept.id} delay={i * 0.07}>
                  <Link
                    href={dept.href}
                    className="group relative h-[300px] lg:h-[320px] overflow-hidden rounded-sm shadow-card hover:shadow-raised transition-shadow duration-300 block"
                  >
                    <Image
                      src={dept.image.src}
                      alt={dept.image.alt}
                      fill
                      className="object-cover transition-transform duration-600 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.04) 100%)",
                      }}
                      aria-hidden="true"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-end justify-between gap-2">
                        <div>
                          <p className="text-[10px] text-white/45 font-light mb-1">{dept.tagline}</p>
                          <h3 className="text-xl font-extrabold tracking-tight text-white leading-tight">
                            {dept.name}
                          </h3>
                        </div>
                        <div className="shrink-0 w-9 h-9 rounded-sm bg-orange flex items-center justify-center group-hover:bg-orange-hover transition-colors duration-200 shadow-orange">
                          <Icon className="w-4.5 h-4.5 text-white" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Quality pillars ────────────────────────────────────────────────── */}
      <section className="bg-ink py-16 lg:py-20 border-t border-white/8" aria-label="Our quality promise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="text-center mb-12">
            <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-3">
              Our Promise
            </p>
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              Why Checkstar is different
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((p, i) => {
              const PIcon = p.icon;
              return (
                <AnimateOnScroll key={p.title} delay={i * 0.08}>
                  <div className="text-center lg:text-left">
                    <div className="inline-flex lg:flex items-center justify-center lg:justify-start mb-4">
                      <div className="w-11 h-11 rounded-sm bg-orange/15 flex items-center justify-center">
                        <PIcon className="w-5 h-5 text-orange" aria-hidden="true" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-sm text-white/45 font-light leading-relaxed">{p.body}</p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}
