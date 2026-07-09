import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { departments } from "@/data/departments";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function DepartmentsSection() {
  const [featured, ...rest] = departments;

  return (
    <section
      id="departments"
      aria-label="Our departments"
      className="py-20 lg:py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <AnimateOnScroll className="mb-14">
          <p className="text-xs font-bold tracking-widest uppercase text-orange mb-3">
            Explore Our Aisles
          </p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter text-ink leading-tight max-w-lg text-balance">
              Sourced locally. <br />Served fresh daily.
            </h2>
            <Link
              href="/departments"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold bg-ink text-white px-4 py-2 rounded-sm hover:bg-ink-800 transition-colors duration-200"
            >
              All Departments
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </AnimateOnScroll>

        {/* Grid — featured card large, rest 2-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Featured (left, spans full height) */}
          <AnimateOnScroll className="lg:col-span-1 lg:row-span-2" delay={0.05}>
            <Link
              href={featured.href}
              className="group relative flex flex-col justify-end rounded-lg overflow-hidden h-72 lg:h-full min-h-[420px] bg-ink-100"
              aria-label={`Explore ${featured.name}`}
            >
              <Image
                src={featured.image.src}
                alt={featured.image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" aria-hidden="true" />
              <div className="relative z-10 p-6">
                <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-1">
                  {featured.tagline}
                </p>
                <h3 className="text-xl font-extrabold text-white mb-2 tracking-tight">
                  {featured.name}
                </h3>
                <p className="text-sm text-white/70 font-light leading-snug mb-4 text-pretty">
                  {featured.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-orange transition-colors duration-200">
                  Explore
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </AnimateOnScroll>

          {/* Rest — 2-column grid on the right */}
          {rest.map((dept, i) => (
            <AnimateOnScroll key={dept.id} delay={0.1 + i * 0.06}>
              <Link
                href={dept.href}
                className="group relative flex flex-col justify-end rounded-lg overflow-hidden h-52 bg-ink-100"
                aria-label={`Explore ${dept.name}`}
              >
                <Image
                  src={dept.image.src}
                  alt={dept.image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" aria-hidden="true" />
                <div className="relative z-10 p-4 pb-5">
                  <p className="text-[10px] font-bold tracking-wider uppercase text-orange/80 mb-0.5">
                    {dept.tagline}
                  </p>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {dept.name}
                  </h3>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Mobile view-all */}
        <AnimateOnScroll className="mt-8 sm:hidden">
          <Link
            href="/departments"
            className="flex items-center justify-center gap-2 w-full py-3 border border-ink-200 rounded-sm text-sm font-bold text-ink-600 hover:border-orange hover:text-orange transition-colors duration-200"
          >
            Explore All Departments
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
