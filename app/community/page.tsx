import type { Metadata } from "next";
import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { CommunityClient } from "./CommunityClient";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Checkstar is more than a supermarket — it's a cornerstone of the Phoenix, Overport, and Durban communities. Discover how we give back through events, education, sport, and charity.",
};

export default function CommunityPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-ink pt-16 pb-16 lg:pt-24 lg:pb-20 overflow-hidden"
        aria-label="Community hero"
      >
        {/* Stock background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1600"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.30) 100%)" }}
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-5">
              Consumer Involvement
            </p>
            <h1
              className="font-extrabold tracking-tighter text-white leading-[1.0] mb-5"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", wordSpacing: "0.08em" }}
            >
              We don&apos;t{" "}just serve
              <br className="hidden sm:block" />
              the community.{" "}
              <span
                className="font-handwritten text-orange block mt-1"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)" }}
              >
                We belong to it.
              </span>
            </h1>
            <p className="text-base text-white/60 font-light leading-relaxed max-w-lg">
              From Christmas parties for hundreds of children to reopening school libraries and sponsoring youth sports — Checkstar has been putting the community first since day one.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Client sections (philosophy, initiatives, lightbox, CTA) ─────── */}
      <CommunityClient />
    </>
  );
}
