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

/* ── Store button icons ──────────────────────────────────────────────────── */
function GooglePlayIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.18 23.76c.37.2.8.22 1.19.04l12.65-7.06-2.94-2.94-10.9 9.96zm-2.68-22C.19 2.1 0 2.6 0 3.25v17.5c0 .65.19 1.15.5 1.48l.08.07 9.81-9.81v-.23L.58 1.7l-.08.07zm19.87 8.5L17.02 8.4l-3.27 3.27 3.27 3.27 3.38-1.89c.97-.54.97-1.43-.03-1.78zM4.37.24L17.02 7.3l-2.94 2.94L3.18.28c.4-.18.83-.17 1.19-.04z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

/* ── Star rating ─────────────────────────────────────────────────────────── */
function StarRating() {
  return (
    <div className="flex items-center gap-1.5 mb-5">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5 text-orange" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-white/55 font-medium">Available on Google Play &amp; App Store</span>
    </div>
  );
}

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
  const isApp = slide.variant === "app";

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
              {/* Base gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: s.variant === "app"
                    ? "linear-gradient(105deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.70) 45%, rgba(0,0,0,0.30) 100%)"
                    : "linear-gradient(105deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 100%)",
                }}
                aria-hidden="true"
              />
              {/* App slide — orange atmospheric glow from bottom-right */}
              {s.variant === "app" && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 55% 60% at 85% 90%, rgba(231,91,19,0.35) 0%, transparent 70%)" }}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Content layer ───────────────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col">

        {/* Main content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Eyebrow — hidden on app slide */}
                  {!isApp && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="mb-4"
                    >
                      <span className="inline-block text-[11px] font-bold tracking-widest text-white/50 uppercase">
                        {slide.eyebrow}
                      </span>
                    </motion.div>
                  )}

                  {/* Headline */}
                  <h1
                    className="font-extrabold tracking-tighter leading-[1.0] text-white mb-5"
                    style={{ fontSize: isApp ? "clamp(2.6rem, 6vw, 5rem)" : "clamp(2.4rem, 5.5vw, 4.5rem)" }}
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
                        {typeof line === "object" ? (
                          <>
                            {line.plain}
                            <span className={cn(isApp ? "font-handwritten text-orange" : "text-orange")}
                              style={isApp ? { fontSize: "1.12em" } : undefined}>
                              {line.highlight}
                            </span>
                          </>
                        ) : i === slide.headline.length - 1 ? (
                          <span className={cn(isApp ? "font-handwritten text-orange" : "text-orange")}
                            style={isApp ? { fontSize: "1.12em" } : undefined}>
                            {line}
                          </span>
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
                  >
                    {isApp ? (
                      <>
                        <StarRating />
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link
                            href="https://play.google.com/store/apps/details?id=com.checkstar.za&pcampaignid=web_share"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white text-ink px-5 py-3 rounded-sm hover:bg-orange hover:text-white transition-colors duration-200 group shadow-orange"
                            aria-label="Download Checkstar Now Now on Google Play"
                          >
                            <GooglePlayIcon />
                            <div className="text-left">
                              <p className="text-[10px] leading-none mb-0.5 opacity-50 group-hover:opacity-80 transition-opacity">Get it on</p>
                              <p className="text-sm font-bold leading-none">Google Play</p>
                            </div>
                          </Link>
                          <Link
                            href="https://apps.apple.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white/10 border border-white/25 text-white px-5 py-3 rounded-sm hover:bg-white/20 transition-colors duration-200 group"
                            aria-label="Download Checkstar Now Now on the App Store"
                          >
                            <AppleIcon />
                            <div className="text-left">
                              <p className="text-[10px] leading-none mb-0.5 opacity-50 group-hover:opacity-80 transition-opacity">Download on the</p>
                              <p className="text-sm font-bold leading-none">App Store</p>
                            </div>
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-3">
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
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-6 flex items-center justify-end">

          {/* Slide progress bars */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Slide navigation">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === selectedIndex}
                aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
                onClick={() => scrollTo(i)}
                className={cn(
                  "relative h-[3px] rounded-full overflow-hidden bg-white/25 transition-all duration-500",
                  i === selectedIndex ? "w-10" : "w-4 hover:bg-white/40"
                )}
              >
                {i === selectedIndex && (
                  <span
                    key={selectedIndex}
                    className="absolute inset-y-0 left-0 rounded-full bg-orange"
                    style={{ animation: `heroProgress ${SLIDE_DURATION}ms linear forwards` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
