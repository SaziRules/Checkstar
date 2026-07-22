"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// month is 0-indexed: 8 = September
const COMPETITION_END = new Date(2026, 8, 30, 23, 59, 59);

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function AnnouncementBar() {
  function calc() {
    const diff = Math.max(0, COMPETITION_END.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      seconds: Math.floor((diff % 60_000) / 1_000),
    };
  }

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc), 1000);
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
      aria-label="Competition announcement"
      className="bg-orange text-white text-xs font-semibold py-2.5 px-4 tracking-wide"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-center lg:justify-between gap-4">

        {/* Announcement text */}
        <Link
          href="/competitions"
          className="inline-flex items-center gap-1.5 hover:text-white/80 transition-colors duration-200 whitespace-nowrap"
        >
          <span className="opacity-60 text-[8px]">&#9679;</span>
          <span>Win 1 of 10 — a year&apos;s supply of Lil-Lets &amp; Dove Cotton. Enter now</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>

        {/* Countdown — desktop only */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div className="w-px h-3 bg-white/25" aria-hidden="true" />

          <span className="text-[10px] font-bold tracking-widest uppercase text-white/55 whitespace-nowrap">
            Competition closes
          </span>

          <div
            className="flex items-baseline gap-0.5"
            role="timer"
            aria-label="Time remaining to enter competition"
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
            href="/competitions"
            className="inline-flex items-center gap-1 text-[10px] font-bold text-white border border-white/30 rounded-sm px-2 py-0.5 hover:bg-white hover:text-orange transition-colors duration-200 whitespace-nowrap"
          >
            Enter Now
            <ArrowRight className="w-2.5 h-2.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
