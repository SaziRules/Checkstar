import Link from "next/link";
import { MapPin, Clock, Phone, ArrowRight, ChevronRight } from "lucide-react";
import { stores } from "@/data/stores";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function StoreLocatorSection() {
  return (
    <section
      id="store-locator"
      aria-label="Store locator"
      className="py-20 lg:py-28 bg-ink"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left — Header + CTA */}
          <AnimateOnScroll className="lg:col-span-2">
            <p className="text-xs font-bold tracking-widest uppercase text-orange mb-4">
              Find Your Checkstar
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-white leading-tight mb-5">
              Come visit us. <br />
              <span className="font-handwritten text-orange text-4xl sm:text-5xl">
                We&apos;d love to see you.
              </span>
            </h2>
            <p className="text-sm text-white/60 font-light leading-relaxed mb-8 max-w-sm">
              Select your nearest flagship store to access personalised specials,
              accurate trading hours, and branch-specific services.
            </p>
            <Link
              href="/store-locator"
              className="inline-flex items-center gap-2 bg-white text-ink text-sm font-bold px-6 py-3 rounded-sm hover:bg-orange hover:text-white transition-colors duration-200"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              View All Stores & Map
            </Link>
          </AnimateOnScroll>

          {/* Right — Store Cards */}
          <div className="lg:col-span-3 space-y-4">
            {stores.map((store, i) => (
              <AnimateOnScroll key={store.id} delay={0.1 + i * 0.1}>
                <div className="group bg-white/5 border border-white/10 hover:border-orange/50 rounded-lg p-6 transition-all duration-300 hover:bg-white/8">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className="bg-orange/10 border border-orange/20 text-orange p-2.5 rounded-sm shrink-0 h-fit">
                        <MapPin className="w-5 h-5" aria-hidden="true" />
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-bold text-white group-hover:text-orange transition-colors duration-200">
                            {store.name}
                          </h3>
                          {store.isOpen && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-open bg-open-bg px-2 py-0.5 rounded-sm" aria-label="Currently open">
                              <span className="w-1.5 h-1.5 rounded-full bg-open" aria-hidden="true" />
                              Open
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white/50 mb-3">
                          {store.address}, {store.suburb}, {store.province}
                        </p>

                        {/* Hours */}
                        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/40">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            Mon–Fri: {store.hours.weekdays}
                          </span>
                          <span>Sat: {store.hours.saturday}</span>
                          <span>Sun: {store.hours.sunday}</span>
                        </div>

                        {/* Services */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {store.services.slice(0, 4).map((service) => (
                            <span
                              key={service}
                              className="text-[10px] font-medium bg-white/8 border border-white/10 text-white/50 px-2 py-0.5 rounded-sm"
                            >
                              {service}
                            </span>
                          ))}
                          {store.services.length > 4 && (
                            <span className="text-[10px] font-medium text-white/30">
                              +{store.services.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-2 sm:flex-col sm:items-end shrink-0">
                      <a
                        href={`tel:${store.phone}`}
                        aria-label={`Call ${store.name}`}
                        className="flex items-center gap-1.5 text-[11px] font-bold text-white/40 hover:text-white transition-colors duration-200"
                      >
                        <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                        {store.phone}
                      </a>
                      <Link
                        href={`/store-locator#${store.id}`}
                        className="flex items-center gap-1 text-[11px] font-bold text-orange hover:text-white transition-colors duration-200"
                        aria-label={`View details for ${store.name}`}
                      >
                        View details
                        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}

            {/* View all link */}
            <AnimateOnScroll delay={0.3}>
              <Link
                href="/store-locator"
                className="flex items-center justify-between w-full text-sm font-bold text-white/30 hover:text-white pt-2 transition-colors duration-200"
              >
                <span>Find more branches across KwaZulu-Natal</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 hover:translate-x-1" aria-hidden="true" />
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
