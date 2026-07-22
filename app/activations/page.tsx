import type { Metadata } from "next";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ActivationsClient } from "./ActivationsClient";

export const metadata: Metadata = {
  title: "Activations",
  description:
    "From in-store celebrations to community charity events and competitions — see how Checkstar brings its stores to life across Durban, Overport, and Phoenix.",
};

export default function ActivationsPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-ink pt-16 pb-16 lg:pt-24 lg:pb-20 overflow-hidden" aria-label="Activations hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <AnimateOnScroll>
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-5">
                In-Store Events &amp; Community
              </p>
              <h1
                className="font-extrabold tracking-tighter text-white leading-[1.0] mb-5"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
              >
                Where the store{" "}
                <br className="hidden sm:block" />
                comes alive.{" "}
                <span
                  className="font-handwritten text-orange block mt-1"
                  style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)" }}
                >
                  We love to celebrate.
                </span>
              </h1>
              <p className="text-base text-white/55 font-light leading-relaxed max-w-lg">
                Checkstar has always been more than a place to shop. From community charity fairs and DJ parties to beauty competitions and grand openings — our stores are built to bring people together.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── Interactive sections (type cards, grid, lightbox, CTA) ────────── */}
      <ActivationsClient />
    </>
  );
}
