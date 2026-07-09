"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SALE_END = new Date(Date.now() + 3 * 86_400_000 + 7 * 3_600_000 + 23 * 60_000);

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function AnnouncementBar() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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
    <div
      role="banner"
      aria-label="Site announcement"
      className="bg-orange text-white text-xs font-semibold py-2.5 px-4 tracking-wide"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center lg:justify-between gap-4">

        {/* Announcement text */}
        <Link
          href="/promotions/market-day"
          className="inline-flex items-center gap-1.5 hover:text-white/80 transition-colors duration-200 whitespace-nowrap"
        >
          <span className="opacity-60 text-[8px]">&#9679;</span>
          <span>Market Day Specials are live — shop this week&apos;s best prices</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>

        {/* Countdown — desktop only */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div className="w-px h-3 bg-white/25" aria-hidden="true" />

          <span className="text-[10px] font-bold tracking-widest uppercase text-white/55 whitespace-nowrap">
            Sale ends
          </span>

          <div
            className="flex items-baseline gap-0.5"
            role="timer"
            aria-label="Time remaining in Market Day sale"
          >
            {units.map(({ v, l }, i) => (
              <span key={l} className="flex items-baseline">
                {i > 0 && (
                  <span className="text-white/30 font-black mx-0.5">:</span>
                )}
                <span className="font-black text-white tabular-nums">{v}</span>
                <span className="text-[9px] font-bold text-white/60 ml-px">{l}</span>
              </span>
            ))}
          </div>

          <Link
            href="/promotions/market-day"
            className="inline-flex items-center gap-1 text-[10px] font-bold text-white border border-white/30 rounded-sm px-2 py-0.5 hover:bg-white hover:text-orange transition-colors duration-200 whitespace-nowrap"
          >
            Shop
            <ArrowRight className="w-2.5 h-2.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
