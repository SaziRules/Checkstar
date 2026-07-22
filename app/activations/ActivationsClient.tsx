"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ChevronLeft, ChevronRight, Camera,
  Calendar, MapPin, Users, Trophy, Star, Zap, Building2, Heart, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { cn } from "@/lib/utils";

/* ── Types ───────────────────────────────────────────────────────────────── */

type Category = "Community" | "In-Store Event" | "Competition" | "Grand Opening";

interface Activation {
  id: string;
  title: string;
  date: string;
  location: string;
  category: Category;
  description: string;
  cover: string;
  extras: string[];
  featured: boolean;
}

/* ── Activation types strip data ─────────────────────────────────────────── */

const ACTIVATION_TYPES = [
  {
    icon: Zap,
    title: "In-Store Events",
    body: "Women's Day, Valentine's Day, Easter — we mark every occasion with in-store activations that bring the community together.",
    color: "text-orange",
    bg: "bg-orange/10",
    border: "border-orange/20",
  },
  {
    icon: Heart,
    title: "Community",
    body: "From charity fairs with Feedy Needy to school Christmas parties and hospital visits — giving back is built into how we operate.",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    icon: Trophy,
    title: "Competitions",
    body: "Beauty competitions, potjie pot cook-offs, and more — Checkstar loves giving our community a chance to shine.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    icon: Building2,
    title: "Grand Openings",
    body: "Every new Checkstar branch is welcomed with a celebration worthy of the community it serves.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
];

/* ── Activations data ────────────────────────────────────────────────────── */

const ACTIVATIONS: Activation[] = [
  {
    id: "feedy-needy-2017",
    title: "Feedy Needy Charity Fair",
    date: "August 2017",
    location: "All Branches",
    category: "Community",
    description:
      "Checkstar opened its doors for the annual Feedy Needy Charity Fair — a full day of food, fun, and fundraising for those in need across KwaZulu-Natal. The community showed up in force, and so did we.",
    cover: "https://checkstar.co.za/images/gallery/29%20aug%202017/IMG_2913.jpg",
    extras: [
      "https://checkstar.co.za/images/gallery/29%20aug%202017/IMG_2914.jpg",
      "https://checkstar.co.za/images/gallery/29%20aug%202017/IMG_2915.jpg",
      "https://checkstar.co.za/images/gallery/29%20aug%202017/IMG_2916.jpg",
      "https://checkstar.co.za/images/gallery/29%20aug%202017/IMG_2917.jpg",
      "https://checkstar.co.za/images/gallery/29%20aug%202017/IMG_2918.jpg",
    ],
    featured: true,
  },
  {
    id: "womens-day-2017",
    title: "Women's Day Celebrations",
    date: "9 August 2017",
    location: "All Branches",
    category: "In-Store Event",
    description:
      "Checkstar celebrated National Women's Day with in-store activations honouring the women of our community — our customers, our staff, and our neighbours.",
    cover: "https://checkstar.co.za/images/gallery/28%20aug%202017/20170809_091313.jpg",
    extras: [
      "https://checkstar.co.za/images/gallery/28%20aug%202017/20170809_091427.jpg",
      "https://checkstar.co.za/images/gallery/28%20aug%202017/DSC06361.jpg",
      "https://checkstar.co.za/images/gallery/28%20aug%202017/DSC06391.jpg",
    ],
    featured: false,
  },
  {
    id: "station-of-joy",
    title: "Grand Opening: Station of Joy",
    date: "2016",
    location: "Checkstar Mount Edgecombe",
    category: "Grand Opening",
    description:
      "The grand opening of Checkstar's Station of Joy — a celebration of community, freshness, and everything that makes Checkstar the store the neighbourhood calls home. Hundreds turned out for the occasion.",
    cover: "https://checkstar.co.za/images/gallery/Grand%20opening%20of%20Your%20Station%20of%20joy%20Only%20at%20checkstar/IMG_5445.jpg",
    extras: [
      "https://checkstar.co.za/images/gallery/Grand%20opening%20of%20Your%20Station%20of%20joy%20Only%20at%20checkstar/IMG_5449.jpg",
      "https://checkstar.co.za/images/gallery/Grand%20opening%20of%20Your%20Station%20of%20joy%20Only%20at%20checkstar/IMG_5451.jpg",
      "https://checkstar.co.za/images/gallery/Grand%20opening%20of%20Your%20Station%20of%20joy%20Only%20at%20checkstar/IMG_5453.jpg",
    ],
    featured: true,
  },
  {
    id: "easter-fun-fair-2016",
    title: "Easter Fun Fair with Feedy Needy",
    date: "14 April 2016",
    location: "Checkstar Mount Edgecombe",
    category: "Community",
    description:
      "Co-hosted with Feedy Needy, the Easter Fun Fair brought together hundreds of children from Phoenix for a day of joy, food, and celebration at the store.",
    cover: "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/a.jpg",
    extras: [
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/B.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/C.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/D.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/E.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/F.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/G.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/H.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/I.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/J.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/K.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/V.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/M.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/N.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/O.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/P.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/Q.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/X.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/S.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/T.jpg",
      "https://checkstar.co.za/images/consumer%20involvement/14%20APRIL%202016/U.jpg",
    ],
    featured: false,
  },
  {
    id: "beauty-competition-2016",
    title: "Community Beauty Competition",
    date: "August 2016",
    location: "Checkstar Durban CBD",
    category: "Competition",
    description:
      "Checkstar hosted a community beauty competition celebrating local talent across our Durban branches — spotlighting the confidence and beauty in our community.",
    cover: "https://checkstar.co.za/images/gallery/31%20August%202016/IMG-20160802-WA0000.jpg",
    extras: [
      "https://checkstar.co.za/images/gallery/31%20August%202016/IMG-20160802-WA0003.jpg",
    ],
    featured: false,
  },
  {
    id: "easter-2016",
    title: "Easter at Checkstar",
    date: "April 2016",
    location: "All Branches",
    category: "In-Store Event",
    description:
      "Easter came alive at Checkstar with in-store decorations, seasonal specials, and family fun for shoppers across Durban, Overport, and Phoenix.",
    cover: "https://checkstar.co.za/images/gallery/01%20April%202016/1.jpg",
    extras: [
      "https://checkstar.co.za/images/gallery/01%20April%202016/2.jpg",
      "https://checkstar.co.za/images/gallery/01%20April%202016/3.jpg",
      "https://checkstar.co.za/images/gallery/01%20April%202016/4.jpg",
      "https://checkstar.co.za/images/gallery/01%20April%202016/5.jpg",
    ],
    featured: false,
  },
  {
    id: "potjie-pot",
    title: "Potjie Pot Competition",
    date: "2016",
    location: "Checkstar Durban CBD",
    category: "Competition",
    description:
      "A celebration of South African cooking culture — the Potjie Pot Competition brought the community together around the fire, proudly sponsored by Checkstar.",
    cover: "https://checkstar.co.za/images/competition/Lungi%20Poitjie%20Pot.jpg",
    extras: [],
    featured: false,
  },
  {
    id: "dj-selby",
    title: "DJ Selby In-Store Party",
    date: "2015",
    location: "Checkstar Durban CBD",
    category: "In-Store Event",
    description:
      "Checkstar turned up the volume with a live DJ in-store — bringing energy, entertainment, and great vibes for the whole community to enjoy.",
    cover: "https://checkstar.co.za/images/dj%20selby/2.jpg",
    extras: [
      "https://checkstar.co.za/images/dj%20selby/3.jpg",
      "https://checkstar.co.za/images/dj%20selby/4.jpg",
      "https://checkstar.co.za/images/dj%20selby/5.jpg",
    ],
    featured: false,
  },
  {
    id: "christmas-2014",
    title: "Children's Christmas Party",
    date: "December 2014",
    location: "Checkstar Mount Edgecombe",
    category: "Community",
    description:
      "Checkstar partnered with Phoenix Child and Family Welfare to host a Christmas party for over 400 disadvantaged children — a truly memorable day for the whole community.",
    cover: "https://checkstar.co.za/images/consumer%20involvement/DSC02181.JPG",
    extras: [
      "https://checkstar.co.za/images/consumer%20involvement/DSC02185.JPG",
      "https://checkstar.co.za/images/consumer%20involvement/DSC02190.JPG",
    ],
    featured: false,
  },
  {
    id: "valentines-2015",
    title: "Valentine's Day Celebrations",
    date: "February 2015",
    location: "All Branches",
    category: "In-Store Event",
    description:
      "Checkstar spread the love with Valentine's Day in-store activations — special offers, giveaways, and a little extra warmth for everyone who walked through our doors.",
    cover: "https://checkstar.co.za/images/gallery/20%20Feb%202015/s1.jpg",
    extras: [
      "https://checkstar.co.za/images/gallery/20%20Feb%202015/s2.jpg",
      "https://checkstar.co.za/images/gallery/20%20Feb%202015/s3.jpg",
      "https://checkstar.co.za/images/gallery/20%20Feb%202015/s4.jpg",
    ],
    featured: false,
  },
];

/* ── Category helpers ────────────────────────────────────────────────────── */

const CATEGORY_BADGE: Record<Category, string> = {
  "Community":      "bg-green-500/20 text-green-300 border border-green-500/25",
  "In-Store Event": "bg-orange/15 text-orange border border-orange/25",
  "Competition":    "bg-yellow-500/20 text-yellow-300 border border-yellow-500/25",
  "Grand Opening":  "bg-blue-500/20 text-blue-300 border border-blue-500/25",
};

function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className={cn(
      "inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm",
      CATEGORY_BADGE[category]
    )}>
      {category}
    </span>
  );
}

/* ── Lightbox ────────────────────────────────────────────────────────────── */

function Lightbox({
  activation,
  index,
  onClose,
  onChangeIndex,
}: {
  activation: Activation;
  index: number;
  onClose: () => void;
  onChangeIndex: (i: number) => void;
}) {
  const allImages = [activation.cover, ...activation.extras];
  const total = allImages.length;
  const current = allImages[index];

  const prev = useCallback(() => onChangeIndex((index - 1 + total) % total), [index, total, onChangeIndex]);
  const next = useCallback(() => onChangeIndex((index + 1) % total), [index, total, onChangeIndex]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-black/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <CategoryBadge category={activation.category} />
          <span className="text-white/40 text-xs font-medium">
            {index + 1} / {total}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Image area — click backdrop to close */}
      <div className="relative flex-1 flex items-center justify-center px-12 overflow-hidden" onClick={onClose}>

        {/* Prev */}
        {total > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center h-full w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current}
              alt={`${activation.title} — photo ${index + 1} of ${total}`}
              className="max-h-full max-w-full object-contain rounded-sm select-none"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Next */}
        {total > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 border-t border-white/10 px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-white font-bold text-sm leading-snug">{activation.title}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-[11px] text-white/45">
              <Calendar className="w-3 h-3" aria-hidden="true" />
              {activation.date}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-white/45">
              <MapPin className="w-3 h-3" aria-hidden="true" />
              {activation.location}
            </span>
          </div>
        </div>

        {/* Dot navigation */}
        {total > 1 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={() => onChangeIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-200",
                  i === index ? "w-5 bg-orange" : "w-1.5 bg-white/30 hover:bg-white/55"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Activation card ─────────────────────────────────────────────────────── */

function ActivationCard({
  activation,
  onOpen,
}: {
  activation: Activation;
  onOpen: (index: number) => void;
}) {
  const totalPhotos = 1 + activation.extras.length;

  return (
    <article
      className={cn(
        "group bg-white border border-ink-100 rounded-sm overflow-hidden hover:shadow-raised transition-shadow duration-300 flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange",
        activation.featured && "md:col-span-2"
      )}
      onClick={() => onOpen(0)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(0); }}
      aria-label={`View photos from ${activation.title}`}
    >
      {/* Cover image */}
      <div className={cn(
        "relative w-full overflow-hidden shrink-0",
        activation.featured ? "aspect-[16/7]" : "aspect-[4/3]"
      )}>
        <Image
          src={activation.cover}
          alt={activation.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={activation.featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden="true" />

        {/* Photo count */}
        {totalPhotos > 1 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1.5 rounded-sm">
            <Camera className="w-3 h-3" aria-hidden="true" />
            {totalPhotos} photos
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <CategoryBadge category={activation.category} />
        </div>

        {/* Date */}
        <div className="absolute bottom-3 left-4">
          <p className="flex items-center gap-1.5 text-[11px] text-white/70 font-medium">
            <Calendar className="w-3 h-3" aria-hidden="true" />
            {activation.date}
          </p>
        </div>
      </div>

      {/* Thumbnail strip — featured cards only */}
      {activation.featured && activation.extras.length > 0 && (
        <div className="flex gap-1.5 px-4 pt-3">
          {activation.extras.slice(0, 4).map((src, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); onOpen(i + 1); }}
              className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm ring-0 hover:ring-2 hover:ring-orange transition-all duration-150 focus-visible:ring-2 focus-visible:ring-orange outline-none"
              aria-label={`View photo ${i + 2}`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
                unoptimized
                aria-hidden="true"
              />
            </button>
          ))}
          {activation.extras.length > 4 && (
            <button
              onClick={(e) => { e.stopPropagation(); onOpen(5); }}
              className="h-14 w-20 shrink-0 rounded-sm bg-ink-100 hover:bg-ink-200 transition-colors flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-orange"
              aria-label={`View all ${totalPhotos} photos`}
            >
              <span className="text-xs font-bold text-ink-400">+{activation.extras.length - 4}</span>
            </button>
          )}
        </div>
      )}

      {/* Text content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className={cn(
          "font-bold text-ink tracking-tight mb-2 group-hover:text-orange transition-colors duration-200",
          activation.featured ? "text-lg" : "text-sm"
        )}>
          {activation.title}
        </h3>
        <p className="flex items-center gap-1.5 text-[11px] text-ink-400 font-medium mb-3">
          <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
          {activation.location}
        </p>
        <p className={cn(
          "text-ink-600 font-light leading-relaxed flex-1",
          activation.featured ? "text-sm" : "text-xs"
        )}>
          {activation.description}
        </p>
      </div>
    </article>
  );
}

/* ── Main client component ───────────────────────────────────────────────── */

export function ActivationsClient() {
  const [lightbox, setLightbox] = useState<{ activation: Activation; index: number } | null>(null);

  const openLightbox = useCallback((activation: Activation, index: number) => {
    setLightbox({ activation, index });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const changeIndex = useCallback((index: number) => {
    setLightbox((prev) => prev ? { ...prev, index } : null);
  }, []);

  return (
    <>
      {/* ── Activation type cards ──────────────────────────────────────────── */}
      <section className="bg-white border-b border-ink-100 py-12 lg:py-16" aria-label="Types of activations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ACTIVATION_TYPES.map((type, i) => {
              const TIcon = type.icon;
              return (
                <AnimateOnScroll key={type.title} delay={i * 0.07}>
                  <div className={cn("border rounded-sm p-5 h-full", type.border)}>
                    <div className={cn("w-9 h-9 rounded-sm flex items-center justify-center mb-4", type.bg)}>
                      <TIcon className={cn("w-[18px] h-[18px]", type.color)} aria-hidden="true" />
                    </div>
                    <h3 className="text-sm font-bold text-ink mb-2 tracking-tight">{type.title}</h3>
                    <p className="text-xs text-ink-600 font-light leading-relaxed">{type.body}</p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Activations grid ──────────────────────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-24" aria-label="Past activations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="mb-12">
            <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-3">
              Our Activations
            </p>
            <div className="flex items-end justify-between gap-4">
              <h2
                className="font-extrabold tracking-tight text-ink leading-[1.1]"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
              >
                Memories from across our stores.
              </h2>
              <p className="text-sm text-ink-400 font-light shrink-0 hidden sm:block">
                {ACTIVATIONS.length} events
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACTIVATIONS.map((activation, i) => (
              <AnimateOnScroll key={activation.id} delay={Math.min(i * 0.05, 0.3)}>
                <ActivationCard
                  activation={activation}
                  onOpen={(index) => openLightbox(activation, index)}
                />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="bg-ink py-16 lg:py-20 border-t border-white/8" aria-label="Stay connected">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <AnimateOnScroll className="max-w-xl">
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-3">
                Never Miss One
              </p>
              <h2
                className="font-extrabold tracking-tight text-white leading-[1.1] mb-4"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
              >
                The next activation is just around the corner.{" "}
                <span className="font-handwritten text-orange" style={{ fontSize: "1.1em" }}>
                  Stay in the loop.
                </span>
              </h2>
              <p className="text-sm text-white/50 font-light leading-relaxed">
                Follow Checkstar on social media or pop into any of our three branches to find out what&apos;s coming up — competitions, live events, seasonal celebrations, and community days.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1} className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/community"
                className="inline-flex items-center justify-center gap-2 bg-orange text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-orange-hover transition-colors duration-200 shadow-orange"
              >
                Our Community Story
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/store-locator"
                className="inline-flex items-center justify-center gap-2 bg-white/8 border border-white/20 text-white text-sm font-semibold px-6 py-3 rounded-sm hover:bg-white/15 transition-colors duration-200"
              >
                Find a Branch
              </Link>
            </AnimateOnScroll>

          </div>
        </div>
      </section>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            activation={lightbox.activation}
            index={lightbox.index}
            onClose={closeLightbox}
            onChangeIndex={changeIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
