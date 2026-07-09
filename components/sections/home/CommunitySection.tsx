import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";
import { communityStats, communityStories } from "@/data/community";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function CommunitySection() {
  return (
    <section
      id="community"
      aria-label="Community impact"
      className="py-20 lg:py-28 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Split Layout: Stats + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Left — Text */}
          <AnimateOnScroll>
            <p className="text-xs font-bold tracking-widest uppercase text-orange mb-4">
              Rooted In The Community
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter text-ink leading-tight mb-6 text-balance">
              We don&apos;t just serve the community.
              <span className="font-handwritten text-orange block text-4xl sm:text-5xl lg:text-6xl mt-1">
                We belong to it.
              </span>
            </h2>
            <p className="text-base text-ink-600 font-light leading-relaxed mb-8 max-w-md">
              As an independent supermarket, every rand stays local. We source from
              nearby farms, employ from surrounding neighbourhoods, and reinvest in the
              schools, charities, and causes that matter to the people we serve every day.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {communityStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-ink-50 border border-ink-100 rounded-lg px-5 py-4"
                >
                  <p className="text-2xl font-black text-ink tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-ink-500 font-medium uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/community"
              className="inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-orange transition-colors duration-200"
            >
              <Heart className="w-4 h-4 text-orange" aria-hidden="true" />
              Read our community stories
              <ArrowRight className="w-4 h-4 transition-transform duration-200 hover:translate-x-1" aria-hidden="true" />
            </Link>
          </AnimateOnScroll>

          {/* Right — Image Stack */}
          <AnimateOnScroll delay={0.15} className="relative">
            <div className="relative h-[420px] lg:h-[520px]">
              {/* Main image */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <Image
                  src={communityStories[0].image.src}
                  alt={communityStories[0].image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Floating card — testimonial */}
              <div className="absolute -bottom-4 -left-4 lg:-left-8 max-w-xs bg-ink rounded-xl p-5 shadow-float z-10">
                <p className="text-sm text-white/80 font-medium italic leading-snug mb-3">
                  &ldquo;Checkstar feels like family. The staff know my kids by name, and
                  the prices are unmatched anywhere in the area.&rdquo;
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-orange flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-xs">NM</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Nomvula M.</p>
                    <p className="text-[10px] text-white/40">Checkstar Durban Central Regular</p>
                  </div>
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute top-4 right-4 bg-orange text-white text-[10px] font-bold px-2.5 py-1 rounded-sm tracking-wider uppercase">
                Community Feeding
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Story Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {communityStories.map((story, i) => (
            <AnimateOnScroll key={story.id} delay={0.05 + i * 0.08} className="h-full">
              <article className="group bg-ink-50 border border-ink-100 rounded-lg overflow-hidden hover:shadow-card transition-shadow duration-300 h-full flex flex-col">
                <div className="relative h-44 overflow-hidden bg-ink-200 shrink-0">
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
                  <p className="text-xs text-ink-500 font-light leading-relaxed flex-1">
                    {story.excerpt}
                  </p>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
