"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SALE_END = new Date(Date.now() + 3 * 86_400_000 + 7 * 3_600_000 + 23 * 60_000);

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function SaleCountdownSection() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function tick() {
      const diff = SALE_END.getTime() - Date.now();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTime({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { v: pad(time.days), l: "d" },
    { v: pad(time.hours), l: "h" },
    { v: pad(time.minutes), l: "m" },
    { v: pad(time.seconds), l: "s" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-orange shadow-[0_-6px_40px_rgba(0,0,0,0.4)] lg:hidden"
          role="region"
          aria-label="Market Day sale countdown"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 sm:gap-5 py-3 sm:py-3.5">

              {/* Label — desktop */}
              <div className="hidden md:flex items-center gap-2 shrink-0">
                <Zap className="w-3.5 h-3.5 text-white" fill="white" aria-hidden="true" />
                <span className="text-[11px] font-bold tracking-widest uppercase text-white/70 whitespace-nowrap">
                  Market Day Sale
                </span>
                <span className="text-white/25">—</span>
              </div>

              {/* Label — mobile */}
              <div className="flex items-center gap-1.5 md:hidden shrink-0">
                <Zap className="w-3 h-3 text-white" fill="white" aria-hidden="true" />
                <span className="text-[9px] font-bold tracking-widest uppercase text-white/70 whitespace-nowrap">
                  Sale ends
                </span>
              </div>

              {/* Countdown digits */}
              <div className="flex items-baseline gap-0.5 sm:gap-1" role="timer" aria-label="Time remaining">
                {units.map(({ v, l }, i) => (
                  <span key={l} className="flex items-baseline gap-px">
                    {i > 0 && (
                      <span className="text-white/30 font-black text-base sm:text-xl mx-0.5 sm:mx-1">
                        :
                      </span>
                    )}
                    <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white tabular-nums leading-none">
                      {v}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-white/50 uppercase self-end mb-0.5 ml-px">
                      {l}
                    </span>
                  </span>
                ))}
              </div>

              <div className="flex-1" />

              {/* CTA */}
              <Link
                href="/promotions/market-day"
                className="shrink-0 inline-flex items-center gap-1.5 bg-white text-orange text-xs sm:text-sm font-bold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-sm hover:bg-ink hover:text-white transition-colors duration-200"
              >
                <span className="hidden sm:inline">Shop the Sale</span>
                <span className="sm:hidden">Shop</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>

              {/* Dismiss */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Dismiss sale banner"
                className="p-1.5 text-white/50 hover:text-white transition-colors duration-200 shrink-0"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
