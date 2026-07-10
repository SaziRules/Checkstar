"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight } from "lucide-react";
import { heroSlides } from "@/data/hero";
import { cn } from "@/lib/utils";

const SLIDE_DURATION = 6000;

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(() => emblaApi.scrollNext(), SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [emblaApi]);

  const slide = heroSlides[selectedIndex];

  return (
    <section
      className="relative w-full bg-ink lg:!h-full"
      style={{ height: "clamp(520px, 68vh, 760px)" }}
      aria-label="Hero"
    >
      {/* ── Carousel images ─────────────────────────────────────────── */}
      <div className="embla absolute inset-0 overflow-hidden" ref={emblaRef}>
        <div className="embla__container h-full">
          {heroSlides.map((s, i) => (
            <div key={s.id} className="embla__slide relative h-full">
              <Image
                key={s.image.src}
                src={s.image.src}
                alt={s.image.alt}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
              />
              {/* Left-heavy dark gradient so text is always legible */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(105deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 100%)",
                }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Content layer ───────────────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col">

        {/* Main content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Eyebrow */}
                  <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block text-[11px] font-bold tracking-widest text-white/50 uppercase mb-4"
                  >
                    {slide.eyebrow}
                  </motion.span>

                  {/* Headline */}
                  <h1
                    className="font-extrabold tracking-tighter leading-[1.0] text-white mb-5"
                    style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
                  >
                    {slide.headline.map((line, i) => (
                      <motion.span
                        key={i}
                        className="block"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.12 + i * 0.09,
                          duration: 0.65,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {i === slide.headline.length - 1 ? (
                          <span className="text-orange">{line}</span>
                        ) : (
                          line
                        )}
                      </motion.span>
                    ))}
                  </h1>

                  {/* Subtext */}
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="text-sm sm:text-base text-white/65 font-light leading-relaxed mb-7 max-w-md"
                  >
                    {slide.subtext}
                  </motion.p>

                  {/* CTAs */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <Link
                      href={slide.cta.href}
                      className="inline-flex items-center justify-center gap-2 bg-orange text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-orange-hover transition-colors duration-200 shadow-orange"
                    >
                      {slide.cta.label}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    {slide.secondaryCta && (
                      <Link
                        href={slide.secondaryCta.href}
                        className="inline-flex items-center justify-center gap-2 bg-white/8 border border-white/20 text-white text-sm font-semibold px-6 py-3 rounded-sm hover:bg-white/15 transition-colors duration-200"
                      >
                        {slide.secondaryCta.label}
                      </Link>
                    )}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-6 flex items-center justify-between">

          {/* Brand tagline */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="font-handwritten text-white/40 text-xl sm:text-2xl"
            aria-hidden="true"
          >
            cares enough
          </motion.span>

          {/* Slide dots */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Slide navigation">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === selectedIndex}
                aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
                onClick={() => scrollTo(i)}
                className={cn(
                  "h-[3px] rounded-full transition-all duration-500",
                  i === selectedIndex
                    ? "w-8 bg-orange"
                    : "w-4 bg-white/25 hover:bg-white/50"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
