import Link from "next/link";
import {
  Repeat,
  Truck,
  ShieldCheck,
  Accessibility,
  CreditCard,
  Baby,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const services = [
  {
    icon: ShieldCheck,
    title: "Freshness Guarantee",
    description:
      "If any product doesn't meet your freshness standard, we replace it immediately. No questions asked.",
  },
  {
    icon: Repeat,
    title: "Easy Returns",
    description:
      "Changed your mind? Our simple return policy puts you first. In-store exchanges are always free.",
  },
  {
    icon: Truck,
    title: "Bulk Orders",
    description:
      "Feeding a function? Our bulk ordering service caters to large families, schools, and corporate events.",
  },
  {
    icon: CreditCard,
    title: "Multiple Payment Options",
    description:
      "Cash, card, SnapScan, and Zapper. We make paying easy so you can spend time enjoying your shop.",
  },
  {
    icon: Accessibility,
    title: "Accessible Stores",
    description:
      "Wide aisles, wheelchair ramps, and trained staff to assist every member of our community.",
  },
  {
    icon: Baby,
    title: "Family-Friendly",
    description:
      "Baby change facilities, child-safe trolleys, and a layout designed for families with little ones.",
  },
];

export function ConsumerServicesSection() {
  return (
    <section
      id="consumer-services"
      aria-label="Consumer services"
      className="py-20 lg:py-28 bg-ink border-t border-white/8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimateOnScroll className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-orange mb-3">
                Why Shop With Us
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter text-white leading-tight text-balance">
                A store that{" "}
                <span className="font-handwritten text-orange" style={{ fontSize: "1.1em" }}>
                  cares enough
                </span>{" "}
                <br className="hidden sm:block" />
                to go further.
              </h2>
            </div>
            <Link
              href="/consumer-services"
              className="shrink-0 text-sm font-bold text-white/50 hover:text-orange transition-colors duration-200 flex items-center gap-1.5"
            >
              All services &rarr;
            </Link>
          </div>
        </AnimateOnScroll>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8 border border-white/8 rounded-lg overflow-hidden">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimateOnScroll key={service.title} delay={0.04 * i}>
                <div className="bg-ink-800 p-7 h-full hover:bg-ink-600 transition-colors duration-200 group">
                  <div className="bg-orange/15 text-orange w-10 h-10 rounded-sm flex items-center justify-center mb-5 group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs text-white/45 font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
