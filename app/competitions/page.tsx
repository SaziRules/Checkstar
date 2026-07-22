import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, ShoppingCart, Trophy, Calendar, CheckCircle } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Competitions",
  description:
    "Checkstar runs competitions year-round with leading brands. Stand a chance to win big — see the latest competition and how to enter.",
};

const ENTRY_STEPS = [
  {
    icon: ShoppingCart,
    label: "Shop",
    body: (
      <>
        Purchase any <strong>3 Lil-Lets or Dove Cotton products</strong> in-store
        at any Checkstar branch between 1 August and 30 September 2026.
      </>
    ),
  },
  {
    icon: Mail,
    label: "Submit",
    body: (
      <>
        Email your till slip to{" "}
        <a
          href="mailto:lil-letsSA@lil-lets.com"
          className="font-bold text-orange hover:underline"
        >
          lil-letsSA@lil-lets.com
        </a>{" "}
        with your name and contact details.
      </>
    ),
  },
  {
    icon: Trophy,
    label: "Win",
    body: (
      <>
        You could be one of <strong>10 lucky winners</strong> to take home a full
        year&apos;s supply of Lil-Lets &amp; Dove Cotton products.
      </>
    ),
  },
];

const YEAR_ROUND_POINTS = [
  "Brand partnerships with household names",
  "Multiple winners every competition",
  "In-store entry — shop, then submit your slip",
  "New competitions launched every season",
];

export default function CompetitionsPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-ink pt-16 pb-16 lg:pt-24 lg:pb-20 overflow-hidden"
        aria-label="Competitions hero"
      >
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #e75b13 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="max-w-2xl">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2.5 bg-orange/10 border border-orange/25 rounded-full px-4 py-2 mb-8">
              <span
                className="w-2 h-2 rounded-full bg-orange animate-pulse shrink-0"
                aria-hidden="true"
              />
              <span className="text-[10px] font-bold text-orange uppercase tracking-widest">
                Competition Live Now
              </span>
            </div>

            <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-5">
              Competitions
            </p>
            <h1
              className="font-extrabold tracking-tighter text-white leading-[1.0] mb-5"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              There&apos;s always
              <br className="hidden sm:block" />
              something to win.
            </h1>
            <p className="text-base text-white/60 font-light leading-relaxed max-w-lg">
              Checkstar runs competitions year-round with leading brands — giving our community real chances to win big. Shop, enter, and walk away a winner.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Current Competition ────────────────────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-24" aria-label="Active competition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-orange animate-pulse" aria-hidden="true" />
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange">Running Now</p>
            </div>
            <h2
              className="font-extrabold tracking-tight text-ink leading-[1.1]"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              Current Competition
            </h2>
          </AnimateOnScroll>

          {/* Full-width landscape banner */}
          <AnimateOnScroll className="mb-12">
            <div className="relative overflow-hidden shadow-float">
              {/* Diagonal corner ribbon */}
              <div
                className="absolute top-0 right-0 z-10 w-[210px] h-[210px] overflow-hidden pointer-events-none"
                aria-hidden="true"
              >
                <div
                  className="absolute text-white font-extrabold uppercase text-center"
                  style={{
                    width: 300,
                    top: 54,
                    right: -82,
                    transform: "rotate(45deg)",
                    padding: "13px 0",
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    background:
                      "linear-gradient(to bottom, rgba(255,255,255,0.38) 0%, #ff6f2e 12%, #e75b13 42%, #c04410 72%, #892f09 100%)",
                    boxShadow:
                      "0 5px 18px rgba(0,0,0,0.5), 0 2px 5px rgba(0,0,0,0.35), inset 0 1.5px 0 rgba(255,255,255,0.55), inset 0 -2px 5px rgba(0,0,0,0.28)",
                    textShadow: "0 1px 3px rgba(0,0,0,0.45)",
                  }}
                >
                  Live Now
                </div>
              </div>

              <Image
                src="/images/competition/august-comp.png"
                alt="Win 1 of 10 — a year's supply of Lil-Lets and Dove Cotton products"
                width={1200}
                height={628}
                className="w-full h-auto"
                priority
              />
            </div>
          </AnimateOnScroll>

          {/* Prize + steps below the banner */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">

            {/* Prize callout + deadline */}
            <AnimateOnScroll delay={0.08}>
              <p className="text-[11px] font-bold tracking-widest uppercase text-ink-400 mb-2">
                The Prize
              </p>
              <p
                className="font-extrabold text-orange uppercase tracking-tighter leading-none"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
              >
                Win 1 of 10
              </p>
              <p className="text-base font-bold text-ink tracking-tight mt-2">
                1 Year&apos;s Supply of Products
              </p>
              <p className="text-sm text-ink-600 mt-1">
                with <strong>Lil-Lets</strong> &amp; <strong>Dove Cotton</strong>
              </p>

              <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-sm px-4 py-3 mt-6">
                <Calendar className="w-4 h-4 text-orange shrink-0" aria-hidden="true" />
                <p className="text-sm text-ink-800">
                  <strong>Closes:</strong> 30 September 2026
                </p>
              </div>
            </AnimateOnScroll>

            {/* Entry steps */}
            <AnimateOnScroll delay={0.14} className="lg:col-span-2">
              <p className="text-[11px] font-bold tracking-widest uppercase text-ink-400 mb-6">
                How to Enter
              </p>
              <ol className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {ENTRY_STEPS.map(({ icon: Icon, label, body }, i) => (
                  <li key={label} className="flex flex-col gap-3">
                    <div className="w-9 h-9 rounded-sm bg-orange/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-orange" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400 mb-1">
                        Step {i + 1} — {label}
                      </p>
                      <p className="text-sm text-ink-800 leading-relaxed">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:lil-letsSA@lil-lets.com"
                  className="inline-flex items-center gap-2 bg-orange text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-orange-hover transition-colors duration-200 shadow-orange"
                >
                  Email Your Till Slip
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </a>
                <Link
                  href="/store-locator"
                  className="inline-flex items-center gap-2 bg-ink text-white text-sm font-semibold px-6 py-3 rounded-sm hover:bg-ink-800 transition-colors duration-200"
                >
                  Find a Branch
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
              <p className="text-xs text-ink-400 mt-4">T&amp;Cs apply.</p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── Always Running ─────────────────────────────────────────────────── */}
      <section
        className="bg-ink border-t border-white/8 py-16 lg:py-24"
        aria-label="Year-round competitions"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <AnimateOnScroll>
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-5">
                Year-Round
              </p>
              <h2
                className="font-extrabold tracking-tight text-white leading-[1.1] mb-5"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
              >
                A new competition every season. Every time.
              </h2>
              <p className="text-base text-white/55 font-light leading-relaxed">
                We don&apos;t wait for special occasions to give back. Checkstar partners with top brands all year to make sure there&apos;s always a reason to shop — and always a chance to win something worth walking away with.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <div className="space-y-5">
                {YEAR_ROUND_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-4">
                    <CheckCircle
                      className="w-4 h-4 text-orange shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-white/70 leading-relaxed">{point}</p>
                  </div>
                ))}

                <div className="pt-4 border-t border-white/8">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30">
                    Check back regularly — new competitions drop each season
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-orange py-14 lg:py-16" aria-label="Shop to enter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/65 mb-2">
                Entering Is Easy
              </p>
              <h2 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight leading-tight">
                Shop at Checkstar.{" "}
                <span className="font-extrabold uppercase">Win big.</span>
              </h2>
            </div>
            <Link
              href="/store-locator"
              className="shrink-0 inline-flex items-center gap-2 bg-white text-orange text-sm font-bold px-6 py-3 rounded-sm hover:bg-orange-50 transition-colors duration-200"
            >
              Find Your Nearest Branch
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
