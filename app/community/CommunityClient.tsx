"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ChevronLeft, ChevronRight, Calendar, MapPin,
  Heart, Users, BookOpen, Trophy, Gift, Rocket, ArrowRight,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { communityStats } from "@/data/community";
import { cn } from "@/lib/utils";

/* ── Types ───────────────────────────────────────────────────────────────── */

interface Initiative {
  id: string;
  eyebrow: string;
  title: string;
  date: string;
  description: string[];
  highlight?: string;
  images: string[];
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

/* ── Data ────────────────────────────────────────────────────────────────── */

const BASE = "https://checkstar.co.za/images/consumer%20involvement";

const INITIATIVES: Initiative[] = [
  {
    id: "easter-fun-fair-2016",
    eyebrow: "14 April 2016",
    title: "The Easter Fun Fair",
    date: "14 April 2016",
    description: [
      "Checkstar and Feedy Needy brought the community together for a full day of Easter fun at our Mount Edgecombe branch. Families, children, and community members of all ages came out to celebrate — with games, food, music, and the warm spirit that makes Phoenix special.",
      "This event captured everything Checkstar stands for: showing up for the people who show up for us, every single day.",
    ],
    highlight: "Brought to you by Checkstar and Feedy Needy.",
    icon: Heart,
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/10",
    images: [
      `${BASE}/14%20APRIL%202016/a.jpg`,
      `${BASE}/14%20APRIL%202016/B.jpg`,
      `${BASE}/14%20APRIL%202016/C.jpg`,
      `${BASE}/14%20APRIL%202016/D.jpg`,
      `${BASE}/14%20APRIL%202016/E.jpg`,
      `${BASE}/14%20APRIL%202016/F.jpg`,
      `${BASE}/14%20APRIL%202016/G.jpg`,
      `${BASE}/14%20APRIL%202016/H.jpg`,
      `${BASE}/14%20APRIL%202016/I.jpg`,
      `${BASE}/14%20APRIL%202016/J.jpg`,
      `${BASE}/14%20APRIL%202016/K.jpg`,
      `${BASE}/14%20APRIL%202016/V.jpg`,
      `${BASE}/14%20APRIL%202016/M.jpg`,
      `${BASE}/14%20APRIL%202016/N.jpg`,
      `${BASE}/14%20APRIL%202016/O.jpg`,
      `${BASE}/14%20APRIL%202016/P.jpg`,
      `${BASE}/14%20APRIL%202016/Q.jpg`,
      `${BASE}/14%20APRIL%202016/X.jpg`,
      `${BASE}/14%20APRIL%202016/S.jpg`,
      `${BASE}/14%20APRIL%202016/T.jpg`,
      `${BASE}/14%20APRIL%202016/U.jpg`,
    ],
  },
  {
    id: "stonebridge-library-2016",
    eyebrow: "16 March 2016",
    title: "Checkstar Re-opened the Stonebridge Primary Library",
    date: "16 March 2016",
    description: [
      "Education is the foundation of every strong community. When Stonebridge Primary School needed help getting their library back on its feet, Checkstar answered. We re-opened the library and invested in the future of the children who depend on it.",
      "Because a community that reads together, grows together.",
    ],
    icon: BookOpen,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
    images: [
      `${BASE}/16%20March%202016.jpg`,
      `${BASE}/a.jpg`,
      `${BASE}/b.jpg`,
      `${BASE}/c.jpg`,
      `${BASE}/d.jpg`,
      `${BASE}/e.jpg`,
    ],
  },
  {
    id: "phoenix-sports-festival-2015",
    eyebrow: "18–19 July 2015",
    title: "Phoenix Sports Festival",
    date: "18–19 July 2015",
    description: [
      "Checkstar sponsored the Phoenix Sports Festival in tribute of the legacy of Nelson Mandela. Held over the 18th and 19th of July 2015, the festival featured six different codes of sport for our youth — celebrating Madiba's belief in the power of sport to unite.",
      "The 'Zee Stars' KT & MAYANK graced us with their presence and entertained the crowd, making this a truly special tribute to a truly special man.",
    ],
    highlight: "6 sports codes. 2 days. One community.",
    icon: Trophy,
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-500/10",
    images: [
      `${BASE}/pheonix%201.jpg`,
      `${BASE}/phoenix%202.jpg`,
      `${BASE}/phoenix%203.jpg`,
      `${BASE}/phoenix%205.jpg`,
      `${BASE}/phoenix%206.jpg`,
      `${BASE}/phoenix%207.jpg`,
    ],
  },
  {
    id: "christmas-party-2014",
    eyebrow: "17 December 2014",
    title: "Children's Christmas Party 2014",
    date: "17 December 2014",
    description: [
      "Checkstar is proud of the success of their Christmas Party 2014, working in collaboration with the Phoenix Child and Family Welfare to co-ordinate and arrange a celebration for 400 disadvantaged kids from in and around the Phoenix area.",
      "The Christmas party took place at the Phoenix Child Welfare Hall. There were many fun activities and games — and kids were given the opportunity to take a picture with Santa Claus. Checkstar provided meals for every child (chicken and chips), a scrumptious cake made by our own bakery, and a Checkstar hamper filled with treats and Marlin stationery.",
      "Checkstar would like to thank the co-ordinators and entire team of the Phoenix Child and Family Welfare Association, Freedom Stationery, and every volunteer who helped make this day a roaring success.",
    ],
    highlight: "400 children. One unforgettable Christmas.",
    icon: Gift,
    iconColor: "text-red-400",
    iconBg: "bg-red-500/10",
    images: [
      `${BASE}/DSC02181.JPG`,
      `${BASE}/DSC02193.JPG`,
      `${BASE}/DSC02210.JPG`,
      `${BASE}/DSC02218.JPG`,
      `${BASE}/DSC02220.JPG`,
    ],
  },
  {
    id: "brailsford-christmas-2014",
    eyebrow: "1 November 2014",
    title: "Checkstar Sponsors Christmas Party at Brailsford Primary",
    date: "1 November 2014",
    description: [
      "Checkstar sponsored a Christmas Party held at Brailsford Primary School (57 Brailsford Avenue), working in collaboration with the social group Feedy Needy and Mohammed Haniff, director of Feedy Needy, in planning and coordinating the event.",
      "The Christmas party featured 1,000 kids in total from four different schools. Checkstar provided meals, hampers, Christmas colouring books, balloons, and badges for every single child — all in the aim of creating an extraordinary Christmas spirit this festive season.",
      "Checkstar would like to thank Mohammed Haniff and the entire Feedy Needy team for allowing us the opportunity to be part of this memorable day. We hope it can be the first of many for Checkstar and Feedy Needy working together to bring bright smiles.",
    ],
    highlight: "1 000 children across four schools.",
    icon: Users,
    iconColor: "text-green-400",
    iconBg: "bg-green-500/10",
    images: [
      `${BASE}/c1.jpg`,
      `${BASE}/c2.jpg`,
      `${BASE}/c3.jpg`,
      `${BASE}/c4.jpg`,
      `${BASE}/c5.jpg`,
    ],
  },
  {
    id: "launch-initiatives-2014",
    eyebrow: "2014 · Our Launch",
    title: "Giving Back from Day One",
    date: "2014",
    description: [
      "To celebrate our launch, Checkstar staff visited Mahatma Gandhi Hospital to spread some love and cheer, donated hampers to the Durban and Coastal Mental Health Organisation, and sponsored a jungle gym at Phoenix Happy Hours Day Care Centre.",
      "It is these little things — the giving of time, heart, and energy — that really set Checkstar apart.",
    ],
    highlight: "Checkstar … Cares enough.",
    icon: Rocket,
    iconColor: "text-orange",
    iconBg: "bg-orange/10",
    images: [
      `${BASE}/01.jpg`,
      `${BASE}/02.jpg`,
      `${BASE}/03.jpg`,
      `${BASE}/04.jpg`,
    ],
  },
];

/* ── Lightbox ────────────────────────────────────────────────────────────── */

function Lightbox({
  images,
  title,
  date,
  index,
  onClose,
  onChangeIndex,
}: {
  images: string[];
  title: string;
  date: string;
  index: number;
  onClose: () => void;
  onChangeIndex: (i: number) => void;
}) {
  const total = images.length;
  const prev = useCallback(() => onChangeIndex((index - 1 + total) % total), [index, total, onChangeIndex]);
  const next = useCallback(() => onChangeIndex((index + 1) % total), [index, total, onChangeIndex]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

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
      <div className="flex items-center justify-between px-4 py-3 shrink-0 border-b border-white/10">
        <div className="flex items-center gap-3 min-w-0">
          <p className="text-white font-semibold text-sm truncate">{title}</p>
          <span className="text-white/35 text-xs shrink-0">{index + 1} / {total}</span>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors ml-3"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Image area */}
      <div className="relative flex-1 flex items-center justify-center px-12 overflow-hidden" onClick={onClose}>
        {total > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={images[index]}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center h-full w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[index]}
              alt={`${title} — photo ${index + 1} of ${total}`}
              className="max-h-full max-w-full object-contain rounded-sm select-none"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {total > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 border-t border-white/10 px-4 py-3 flex items-center justify-between gap-4">
        <p className="flex items-center gap-1.5 text-[11px] text-white/45">
          <Calendar className="w-3 h-3" aria-hidden="true" />
          {date}
        </p>
        {total > 1 && (
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => onChangeIndex(i)}
                aria-label={`Photo ${i + 1}`}
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

/* ── Photo grid ──────────────────────────────────────────────────────────── */

const MAX_VISIBLE = 5;

function PhotoGrid({
  images,
  title,
  onOpen,
}: {
  images: string[];
  title: string;
  onOpen: (i: number) => void;
}) {
  if (images.length === 0) return null;

  /* Simple equal grid for 1-3 images */
  if (images.length <= 3) {
    return (
      <div className={cn(
        "grid gap-1.5 rounded-sm overflow-hidden",
        images.length === 1 ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3"
      )}>
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => onOpen(i)}
            className="relative aspect-[4/3] overflow-hidden group focus-visible:ring-2 focus-visible:ring-orange outline-none"
            aria-label={`View photo ${i + 1} from ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" aria-hidden="true" />
          </button>
        ))}
      </div>
    );
  }

  /* Featured layout for 4+ images */
  const visible = images.slice(0, MAX_VISIBLE);
  const overflow = images.length - MAX_VISIBLE;

  return (
    <div className="grid grid-cols-3 gap-1.5 rounded-sm overflow-hidden" style={{ gridAutoRows: "130px" }}>
      {/* Featured — large */}
      <button
        onClick={() => onOpen(0)}
        className="col-span-2 row-span-2 relative overflow-hidden group focus-visible:ring-2 focus-visible:ring-orange outline-none"
        aria-label={`View photo 1 from ${title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={visible[0]}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" aria-hidden="true" />
      </button>

      {/* Small images */}
      {visible.slice(1).map((src, i) => {
        const imgIndex = i + 1;
        const isLast = imgIndex === MAX_VISIBLE - 1 && overflow > 0;
        return (
          <button
            key={i}
            onClick={() => onOpen(imgIndex)}
            className="relative overflow-hidden group focus-visible:ring-2 focus-visible:ring-orange outline-none"
            aria-label={isLast ? `View all ${images.length} photos from ${title}` : `View photo ${imgIndex + 1} from ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {isLast ? (
              <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
                <span className="text-white font-bold text-base">+{overflow + 1}</span>
              </div>
            ) : (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" aria-hidden="true" />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ── Initiative section ──────────────────────────────────────────────────── */

function InitiativeSection({
  initiative,
  index,
  onOpen,
}: {
  initiative: Initiative;
  index: number;
  onOpen: (images: string[], imgIndex: number, title: string, date: string) => void;
}) {
  const IIcon = initiative.icon;
  const flip = index % 2 === 1;

  return (
    <section
      className={cn("py-16 lg:py-24", index % 2 === 0 ? "bg-white" : "bg-cream")}
      aria-label={initiative.title}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Text column */}
          <AnimateOnScroll className={flip ? "lg:order-2" : ""}>
            <div className="flex items-center gap-3 mb-5">
              <div className={cn("w-9 h-9 rounded-sm flex items-center justify-center shrink-0", initiative.iconBg)}>
                <IIcon className={cn("w-4.5 h-4.5", initiative.iconColor)} aria-hidden="true" />
              </div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-ink-400">
                {initiative.eyebrow}
              </p>
            </div>

            <h2
              className="font-extrabold tracking-tight text-ink leading-[1.1] mb-5"
              style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)" }}
            >
              {initiative.title}
            </h2>

            {initiative.highlight && (
              <p className={cn(
                "font-handwritten text-orange mb-5 leading-snug",
              )}
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>
                &ldquo;{initiative.highlight}&rdquo;
              </p>
            )}

            <div className="space-y-3">
              {initiative.description.map((para, i) => (
                <p key={i} className="text-sm text-ink-600 font-light leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {initiative.images.length > 0 && (
              <button
                onClick={() => onOpen(initiative.images, 0, initiative.title, initiative.date)}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange hover:text-orange-hover transition-colors duration-200"
              >
                View all {initiative.images.length} photos
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </AnimateOnScroll>

          {/* Photo grid column */}
          <AnimateOnScroll delay={0.1} className={flip ? "lg:order-1" : ""}>
            <PhotoGrid
              images={initiative.images}
              title={initiative.title}
              onOpen={(i) => onOpen(initiative.images, i, initiative.title, initiative.date)}
            />
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}

/* ── Main client component ───────────────────────────────────────────────── */

export function CommunityClient() {
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
    title: string;
    date: string;
  } | null>(null);

  const openLightbox = useCallback((images: string[], index: number, title: string, date: string) => {
    setLightbox({ images, index, title, date });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const changeIndex = useCallback((index: number) => {
    setLightbox((prev) => prev ? { ...prev, index } : null);
  }, []);

  return (
    <>
      {/* ── Philosophy / stats ────────────────────────────────────────────── */}
      <section className="bg-ink py-16 lg:py-20 border-t border-white/8" aria-label="Our philosophy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <AnimateOnScroll>
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-4">
                Our Philosophy
              </p>
              <blockquote
                className="font-extrabold tracking-tight text-white leading-[1.1] mb-6"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}
              >
                &ldquo;It is these little things — the giving of time, heart, and energy — that really set Checkstar apart.&rdquo;
              </blockquote>
              <p className="text-sm text-white/50 font-light leading-relaxed max-w-md">
                From day one, Checkstar has believed that a supermarket is more than a business — it&apos;s a cornerstone of the community it serves. We show up not just behind the counter, but out in the streets, schools, and homes of Phoenix, Overport, and Durban.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {communityStats.map((stat, i) => (
                  <AnimateOnScroll key={stat.label} delay={0.1 + i * 0.07}>
                    <div className="bg-white/5 border border-white/10 rounded-sm p-5">
                      <p className="text-3xl font-black text-white tracking-tight leading-none mb-1">
                        {stat.value}
                      </p>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-snug">
                        {stat.label}
                      </p>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </AnimateOnScroll>

          </div>
        </div>
      </section>

      {/* ── Initiative sections ───────────────────────────────────────────── */}
      {INITIATIVES.map((initiative, i) => (
        <InitiativeSection
          key={initiative.id}
          initiative={initiative}
          index={i}
          onOpen={openLightbox}
        />
      ))}

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="bg-ink py-16 lg:py-20 border-t border-white/8" aria-label="Get involved">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <AnimateOnScroll className="max-w-xl">
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-3">
                Be Part of It
              </p>
              <h2
                className="font-extrabold tracking-tight text-white leading-[1.1] mb-4"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
              >
                We don&apos;t just serve the community.{" "}
                <span className="font-handwritten text-orange" style={{ fontSize: "1.1em" }}>
                  We belong to it.
                </span>
              </h2>
              <p className="text-sm text-white/50 font-light leading-relaxed">
                Visit any of our three branches across Durban, Overport, and Phoenix. Our doors are always open — and so is our commitment to the people who make this community what it is.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1} className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/activations"
                className="inline-flex items-center justify-center gap-2 bg-orange text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-orange-hover transition-colors duration-200 shadow-orange"
              >
                View Activations
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
            images={lightbox.images}
            title={lightbox.title}
            date={lightbox.date}
            index={lightbox.index}
            onClose={closeLightbox}
            onChangeIndex={changeIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
