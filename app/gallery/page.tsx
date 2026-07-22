import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Camera, Store, Leaf, Tag, Users, ArrowRight, Film } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Gallery · Coming Soon",
  description:
    "The Checkstar Gallery is coming — a visual home for our stores, our quality, our people, and the moments that make us who we are.",
};

/* ── Data ────────────────────────────────────────────────────────────────── */

const CATEGORIES = [
  {
    icon: Store,
    title: "The Stores",
    body: "Step inside our three KZN branches — the aisles, the displays, and the departments that make Checkstar what it is.",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800",
    alt: "Supermarket interior",
    accent: "text-blue-300",
    accentBg: "bg-blue-500/15",
  },
  {
    icon: Leaf,
    title: "Fresh & Quality",
    body: "The produce, the butchery, the bakery — captured at their very best. We're proud of what we put on your table.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
    alt: "Fresh produce and quality food",
    accent: "text-green-300",
    accentBg: "bg-green-500/15",
  },
  {
    icon: Tag,
    title: "Promotions",
    body: "Market Day. Mid-Month. Month-End specials. The deals that keep our community coming back — documented and ready to browse.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
    alt: "Promotions and specials",
    accent: "text-orange",
    accentBg: "bg-orange/15",
  },
  {
    icon: Users,
    title: "People & Culture",
    body: "The faces behind the counter, the events, the community moments — the heartbeat of everything Checkstar does.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
    alt: "Checkstar community and people",
    accent: "text-pink-300",
    accentBg: "bg-pink-500/15",
  },
];

const PROMISES = [
  {
    number: "01",
    title: "Real photography. No stock.",
    body: "Every image in the Checkstar Gallery will be shot on location — in our stores, at our events, with our people. What you see is exactly what you get.",
  },
  {
    number: "02",
    title: "Footage from the floor.",
    body: "Behind the butchery counter, inside the bakery at 4am, at the market when the produce comes in — we're documenting it all.",
  },
  {
    number: "03",
    title: "Culture, not just commerce.",
    body: "The gallery won't just be product shots. It'll be the story of Checkstar — the community, the craft, and the care that goes into every single day.",
  },
];

const MARQUEE_WORDS = [
  "Fresh Produce", "Master Butchery", "Scratch Bakery", "Hot Foods & Deli",
  "Grocery", "Beverages", "Promotions", "Community", "Our People",
  "Culture", "Quality", "KwaZulu-Natal", "Phoenix", "Overport", "Durban",
];

const HERO_MOSAIC = [
  "photo-1604719312566-8912e9227c6a",
  "photo-1542838132-92c53300491e",
  "photo-1529156069898-49953e39b3ac",
  "photo-1500937386664-56d1dfef3854",
];

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function GalleryPage() {
  const ticker = [...MARQUEE_WORDS, ...MARQUEE_WORDS];

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-ink pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden"
        aria-label="Gallery coming soon"
      >
        {/* Mosaic background — 4 images at low opacity, blurred */}
        <div className="absolute inset-0 grid grid-cols-2 lg:grid-cols-4" aria-hidden="true">
          {HERO_MOSAIC.map((id) => (
            <div key={id} className="relative overflow-hidden">
              <Image
                src={`https://images.unsplash.com/${id}?auto=format&fit=crop&q=60&w=600`}
                alt=""
                fill
                className="object-cover blur-sm scale-110"
                sizes="25vw"
              />
            </div>
          ))}
          {/* Veil */}
          <div className="absolute inset-0 bg-ink/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            {/* Status badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-10">
              <span className="w-2 h-2 rounded-full bg-orange animate-pulse shrink-0" aria-hidden="true" />
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                In Development
              </span>
            </div>

            {/* Headline */}
            <div className="mb-7">
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-5">
                Gallery
              </p>
              <h1
                className="font-extrabold tracking-tighter text-white leading-[1.0]"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
              >
                Something this good
                <br className="hidden sm:block" />
                deserves to be seen.
              </h1>
              <p
                className="font-extrabold text-orange uppercase leading-none mt-3 block tracking-tighter"
                style={{ fontSize: "clamp(4rem, 11vw, 9.5rem)" }}
              >
                Coming Soon.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.15}>
            <p className="text-base text-white/45 font-light leading-relaxed max-w-md mb-8">
              We&apos;re building a visual home for Checkstar — photos and footage of our stores, our stock, our quality, and the people and moments that make us who we are. It&apos;s going to be worth the wait.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/community"
                className="inline-flex items-center gap-2 bg-orange text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-orange-hover transition-colors duration-200 shadow-orange"
              >
                See our community
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/activations"
                className="inline-flex items-center gap-2 bg-white/8 border border-white/15 text-white text-sm font-semibold px-6 py-3 rounded-sm hover:bg-white/15 transition-colors duration-200"
              >
                View activations
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Marquee strip ─────────────────────────────────────────────────── */}
      <div className="bg-orange py-3 overflow-hidden select-none" aria-hidden="true">
        <div className="flex gallery-ticker whitespace-nowrap">
          {ticker.map((word, i) => (
            <span
              key={i}
              className="text-white text-[11px] font-bold uppercase tracking-widest px-5 shrink-0"
            >
              {word}&nbsp;&nbsp;·
            </span>
          ))}
        </div>
      </div>

      {/* ── What's inside ─────────────────────────────────────────────────── */}
      <section className="bg-ink py-20 lg:py-28" aria-label="Gallery categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="max-w-xl mb-14">
            <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-3">
              What&apos;s Inside
            </p>
            <h2
              className="font-extrabold tracking-tight text-white leading-[1.1]"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              Four chapters.{" "}
              <span className="font-handwritten text-orange" style={{ fontSize: "1.15em" }}>
                One story.
              </span>
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => {
              const CIcon = cat.icon;
              return (
                <AnimateOnScroll key={cat.title} delay={i * 0.08}>
                  <div className="group relative overflow-hidden rounded-sm bg-ink-800" style={{ aspectRatio: "3/4" }}>
                    {/* Image — peeks through on hover */}
                    <Image
                      src={cat.image}
                      alt={cat.alt}
                      fill
                      className="object-cover transition-all duration-700 opacity-25 group-hover:opacity-55 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Dark gradient */}
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.97) 25%, rgba(0,0,0,0.60) 65%, rgba(0,0,0,0.25) 100%)" }}
                      aria-hidden="true"
                    />

                    {/* Coming soon badge */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/12 text-white/50 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-sm">
                        <Camera className="w-2.5 h-2.5" aria-hidden="true" />
                        Coming soon
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <div className={`w-8 h-8 rounded-sm flex items-center justify-center mb-3 ${cat.accentBg}`}>
                        <CIcon className={`w-4 h-4 ${cat.accent}`} aria-hidden="true" />
                      </div>
                      <h3 className="text-base font-bold text-white mb-2 tracking-tight leading-snug">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-white/40 font-light leading-relaxed">
                        {cat.body}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── The promise ───────────────────────────────────────────────────── */}
      <section className="bg-ink-800 border-t border-white/8 py-20 lg:py-28" aria-label="Gallery promise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="mb-14 max-w-xl">
            <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-3">
              Our Commitment
            </p>
            <h2
              className="font-extrabold tracking-tight text-white leading-[1.1]"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              Not just a photo album.
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/8 border border-white/8 rounded-sm overflow-hidden">
            {PROMISES.map((p, i) => (
              <AnimateOnScroll key={p.number} delay={i * 0.1}>
                <div className="bg-ink-800 p-8 lg:p-10 h-full">
                  <p
                    className="font-handwritten text-orange/30 leading-none mb-5 select-none"
                    style={{ fontSize: "clamp(3.5rem, 5vw, 5rem)" }}
                    aria-hidden="true"
                  >
                    {p.number}
                  </p>
                  <h3 className="text-sm font-bold text-white mb-3 tracking-tight leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-white/40 font-light leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore now ───────────────────────────────────────────────────── */}
      <section className="bg-ink border-t border-white/8 py-20 lg:py-28" aria-label="Explore Checkstar now">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="mb-10 max-w-xl">
            <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-3">
              In the Meantime
            </p>
            <h2
              className="font-extrabold tracking-tight text-white leading-[1.1]"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              While we build,{" "}
              <span className="font-handwritten text-orange" style={{ fontSize: "1.1em" }}>
                explore what&apos;s live.
              </span>
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                eyebrow: "Community",
                title: "See the real stories.",
                body: "Christmas parties for 400 kids, school library reopenings, sports festivals — the moments that show who we are.",
                href: "/community",
                cta: "Our Community",
                image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=900",
              },
              {
                eyebrow: "Activations",
                title: "See us in action.",
                body: "DJ events, beauty competitions, grand openings, Easter fairs — Checkstar knows how to show up for its community.",
                href: "/activations",
                cta: "View Activations",
                image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=900",
              },
            ].map((card, i) => (
              <AnimateOnScroll key={card.href} delay={i * 0.1}>
                <Link
                  href={card.href}
                  className="group relative overflow-hidden rounded-sm block bg-ink-800"
                  style={{ aspectRatio: "16/9" }}
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-all duration-700 opacity-45 group-hover:opacity-65 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.40) 60%, transparent 100%)" }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 p-7 flex flex-col justify-end">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange mb-2">
                      {card.eyebrow}
                    </p>
                    <h3 className="text-xl font-extrabold text-white tracking-tight mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-white/50 font-light leading-relaxed mb-5 max-w-sm">
                      {card.body}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white/70 group-hover:text-orange transition-colors duration-200">
                      {card.cta}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-orange py-14 lg:py-16" aria-label="Stay close">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Film className="w-4 h-4 text-white/65" aria-hidden="true" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/65">
                  Be First to See It
                </p>
              </div>
              <h2 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight leading-tight">
                The Gallery opens soon.{" "}
                <span className="font-handwritten" style={{ fontSize: "1.2em" }}>
                  Stay close.
                </span>
              </h2>
            </div>
            <Link
              href="/store-locator"
              className="shrink-0 inline-flex items-center gap-2 bg-white text-orange text-sm font-bold px-6 py-3 rounded-sm hover:bg-orange-50 transition-colors duration-200"
            >
              Find a Branch
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
