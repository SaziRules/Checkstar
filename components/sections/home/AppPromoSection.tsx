import Image from "next/image";
import Link from "next/link";
import { Clock, ShoppingBag, Truck, Tag } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const features = [
  { icon: Clock,       text: "Delivered in under 60 minutes" },
  { icon: ShoppingBag, text: "Full Checkstar range — fresh meat, produce & more" },
  { icon: Truck,       text: "Real-time order tracking" },
  { icon: Tag,         text: "Exclusive app-only deals every week" },
];

/* Google Play SVG mark */
function GooglePlayIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.18 23.76c.37.2.8.22 1.19.04l12.65-7.06-2.94-2.94-10.9 9.96zm-2.68-22c-.31.33-.5.83-.5 1.48v17.5c0 .65.19 1.15.5 1.48l.08.07 9.81-9.81v-.23L.58 1.7l-.08.07zm19.87 8.5L17.02 8.4l-3.27 3.27 3.27 3.27 3.38-1.89c.97-.54.97-1.43-.03-1.78zM4.37.24L17.02 7.3l-2.94 2.94L3.18.28c.4-.18.83-.17 1.19-.04z" />
    </svg>
  );
}

/* Apple icon */
function AppleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

export function AppPromoSection() {
  return (
    <section
      className="relative bg-ink overflow-hidden"
      aria-label="Checkstar Now Now delivery app"
    >
      {/* Orange radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(231,91,19,0.12) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Content ─────────────────────────────────────────────────── */}
          <AnimateOnScroll>
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-orange bg-orange/10 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                Now Available
              </span>
            </div>

            {/* Headline */}
            <h2
              className="font-extrabold tracking-tighter text-white leading-[1.05] mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Checkstar{" "}
              <span className="font-handwritten text-orange" style={{ fontSize: "1.15em" }}>
                Now Now.
              </span>
              <br />
              Groceries at your door.
            </h2>

            <p className="text-base text-white/55 font-light leading-relaxed mb-8 max-w-md">
              Your favourite Checkstar products — fresh meat, crisp produce, and pantry
              essentials — delivered straight to your door in under an hour. No queues, no fuss.
            </p>

            {/* Features */}
            <ul className="space-y-3.5 mb-10">
              {features.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-white/65">
                  <span className="w-6 h-6 rounded-full bg-orange/15 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-orange" aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            {/* App store buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://play.google.com/store/apps/details?id=com.checkstar.za&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-ink px-5 py-3 rounded-sm hover:bg-orange hover:text-white transition-colors duration-200 group"
                aria-label="Download Checkstar Now Now on Google Play"
              >
                <GooglePlayIcon />
                <div className="text-left">
                  <p className="text-[10px] leading-none mb-0.5 opacity-60 group-hover:opacity-90 transition-opacity">Get it on</p>
                  <p className="text-sm font-bold leading-none">Google Play</p>
                </div>
              </Link>

              <Link
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white/8 border border-white/15 text-white px-5 py-3 rounded-sm hover:bg-white/15 transition-colors duration-200 group"
                aria-label="Download Checkstar Now Now on the App Store"
              >
                <AppleIcon />
                <div className="text-left">
                  <p className="text-[10px] leading-none mb-0.5 opacity-60 group-hover:opacity-90 transition-opacity">Download on the</p>
                  <p className="text-sm font-bold leading-none">App Store</p>
                </div>
              </Link>
            </div>
          </AnimateOnScroll>

          {/* ── Lifestyle image ──────────────────────────────────────────── */}
          <AnimateOnScroll delay={0.12} className="relative">
            {/* Decorative glow behind image */}
            <div
              className="absolute -inset-4 rounded-3xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(231,91,19,0.18) 0%, transparent 70%)" }}
              aria-hidden="true"
            />

            {/* Image frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-float aspect-[4/5] max-w-sm mx-auto lg:max-w-none">
              <Image
                src="/images/now-now.png"
                alt="Person smiling while using the Checkstar Now Now delivery app at home"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Bottom fade */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(17,17,17,0.55) 0%, transparent 50%)" }}
                aria-hidden="true"
              />

              {/* Floating delivery badge */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-float">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-orange rounded-lg flex items-center justify-center shrink-0 shadow-orange">
                    <ShoppingBag className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-ink">Your order is on the way!</p>
                    <p className="text-[11px] text-ink-400">Estimated arrival: 38 min</p>
                  </div>
                  <span className="text-[10px] font-bold text-orange bg-orange/10 px-2 py-1 rounded-full shrink-0">
                    En Route
                  </span>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}
