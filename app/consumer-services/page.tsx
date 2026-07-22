import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ShieldCheck, Repeat, Truck, CreditCard,
  Accessibility, Baby, CheckCircle, Phone, MapPin,
  Beef, Wheat, Flame, Leaf, Clock, Users, MessageCircle,
  Smartphone, Banknote, Calendar,
} from "lucide-react";
import { stores } from "@/data/stores";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Consumer Services",
  description:
    "Checkstar is committed to a superior shopping experience — freshness guarantees, easy returns, bulk ordering, accessible stores, family facilities, and multiple payment options across all three KZN branches.",
};

/* ── Service anchors ─────────────────────────────────────────────────────── */

const SERVICE_ANCHORS = [
  { icon: ShieldCheck, label: "Freshness Guarantee", href: "#freshness" },
  { icon: Repeat,      label: "Returns & Exchanges", href: "#returns"   },
  { icon: Truck,       label: "Bulk Orders",         href: "#bulk"      },
  { icon: CreditCard,  label: "Payment Options",     href: "#payments"  },
  { icon: Accessibility, label: "Accessibility",     href: "#access"    },
  { icon: Baby,        label: "Family Facilities",   href: "#family"    },
];

/* ── Expert in-store services ────────────────────────────────────────────── */

const EXPERT_SERVICES = [
  {
    icon: Beef,
    dept: "Master Butchery",
    href: "/departments/butchery",
    title: "Custom cuts to order",
    body: "Our blockmen cut to your specification — thick-cut steaks, braai packs, stewing cubes, strips, mince. Just ask at the counter.",
    cta: "Explore Master Butchery",
  },
  {
    icon: Wheat,
    dept: "Scratch Bakery",
    href: "/departments/bakery",
    title: "Custom cakes & catering platters",
    body: "Custom celebration cakes, catering pastry trays, and bulk bread orders available in-store. Speak to the bakery team for lead times.",
    cta: "Explore Scratch Bakery",
  },
  {
    icon: Flame,
    dept: "Hot Foods & Deli",
    href: "/departments/deli",
    title: "Deli platters & event catering",
    body: "Cold meat and cheese platters, rotisserie chicken in bulk, and hot food trays — perfect for events, meetings, and family gatherings.",
    cta: "Explore Hot Foods & Deli",
  },
  {
    icon: Leaf,
    dept: "Fresh Produce",
    href: "/departments/fresh-produce",
    title: "Pre-packed & bulk produce",
    body: "Family-size packs and loose bulk produce for large households, restaurants, and catering. Restocked daily from regional KZN farms.",
    cta: "Explore Fresh Produce",
  },
];

/* ── Payment methods ─────────────────────────────────────────────────────── */

const PAYMENT_METHODS = [
  { icon: Banknote,    label: "Cash",             note: "Accepted at all tills" },
  { icon: CreditCard,  label: "Debit & Credit",   note: "Visa, Mastercard & more" },
  { icon: Smartphone,  label: "SnapScan",          note: "Scan & pay instantly"  },
  { icon: Smartphone,  label: "Zapper",            note: "QR-based mobile pay"   },
  { icon: MapPin,      label: "ATM In-Store",      note: "Cash withdrawals on-site" },
];

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function ConsumerServicesPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-ink pt-16 pb-14 lg:pt-20 lg:pb-16" aria-label="Consumer services hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-4">
              Consumer Services
            </p>
            <h1
              className="font-extrabold tracking-tighter text-white leading-[1.0] mb-5"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              A store that{" "}
              <span className="font-handwritten text-orange" style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)" }}>
                cares enough
              </span>{" "}
              to go further.
            </h1>
            <p className="text-base text-white/55 font-light leading-relaxed max-w-lg">
              At Checkstar, customer service isn&apos;t a department — it&apos;s how we operate. From our freshness guarantee to our in-store expert services, everything we do is designed to make your shopping experience exceptional.
            </p>
          </div>

          {/* Quick-jump anchors */}
          <div className="flex flex-wrap gap-2 mt-10">
            {SERVICE_ANCHORS.map(({ icon: Icon, label, href }) => (
              <a
                key={href}
                href={href}
                className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-sm bg-white/8 border border-white/12 text-white/70 hover:text-white hover:bg-white/15 hover:border-white/25 transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5 text-orange" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Freshness guarantee ───────────────────────────────────────────── */}
      <section id="freshness" className="bg-cream py-16 lg:py-20 scroll-mt-24" aria-label="Freshness guarantee">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <AnimateOnScroll>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-sm bg-green-100 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-green-600" aria-hidden="true" />
                </div>
                <p className="text-[11px] font-bold tracking-widest uppercase text-green-600">
                  Our Promise
                </p>
              </div>
              <h2
                className="font-extrabold tracking-tight text-ink leading-[1.1] mb-5"
                style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)" }}
              >
                If it&apos;s not fresh,{" "}
                <span className="font-handwritten text-orange" style={{ fontSize: "1.1em" }}>
                  we make it right.
                </span>
              </h2>
              <p className="text-base text-ink-600 font-light leading-relaxed mb-6">
                Every product that leaves our shelves is held to the Checkstar freshness standard. If anything you purchase doesn&apos;t meet that standard — whether it&apos;s produce, butchery, bakery, or deli — bring it back and we will replace it immediately. No questions asked, no forms, no waiting.
              </p>
              <ul className="space-y-3">
                {[
                  "Instant replacement at any Checkstar branch",
                  "Covers all fresh departments — produce, butchery, bakery, deli",
                  "No receipt required for fresh items",
                  "Valid within a reasonable time of purchase",
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-sm text-ink-600 font-light">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1} className="relative h-[340px] lg:h-[420px]">
              <div className="absolute inset-0 rounded-sm overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"
                  alt="Fresh produce at Checkstar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/15" aria-hidden="true" />
              </div>
              <div className="absolute bottom-5 left-5 right-5 bg-white rounded-sm p-4 shadow-raised">
                <p className="text-xs font-bold text-ink mb-0.5">Freshness Guarantee</p>
                <p className="text-[11px] text-ink-600 font-light">
                  Instant replacement on any fresh item that doesn&apos;t meet your standard. No questions asked.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── Returns & exchanges ───────────────────────────────────────────── */}
      <section id="returns" className="bg-white border-t border-ink-100 py-16 lg:py-20 scroll-mt-24" aria-label="Returns and exchanges">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="mb-10 max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm bg-orange/10 flex items-center justify-center">
                <Repeat className="w-5 h-5 text-orange" aria-hidden="true" />
              </div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange">
                Returns & Exchanges
              </p>
            </div>
            <h2
              className="font-extrabold tracking-tight text-ink leading-[1.1] mb-4"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)" }}
            >
              Simple returns. No hassle.
            </h2>
            <p className="text-base text-ink-600 font-light leading-relaxed">
              We want you to be satisfied with every purchase. If something isn&apos;t right, our return policy is straightforward and designed with you in mind.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                title: "Fresh Items",
                icon: Leaf,
                points: [
                  "Instant replacement, no receipt needed",
                  "Must be returned within 24 hours of purchase",
                  "Applies to all fresh departments",
                  "Exchange or full refund — your choice",
                ],
              },
              {
                title: "Grocery & Packaged",
                icon: ShieldCheck,
                points: [
                  "Original receipt required",
                  "Item must be unused and in original packaging",
                  "Return within 7 days of purchase",
                  "Exchange or store credit issued",
                ],
              },
              {
                title: "Bakery & Deli",
                icon: Wheat,
                points: [
                  "Quality issue? Replace immediately",
                  "Custom or catering orders reviewed individually",
                  "Speak to the department manager in-store",
                  "All issues resolved same day",
                ],
              },
            ].map((cat, i) => {
              const CIcon = cat.icon;
              return (
                <AnimateOnScroll key={cat.title} delay={i * 0.08}>
                  <div className="border border-ink-100 rounded-sm p-6 h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-8 rounded-sm bg-orange/10 flex items-center justify-center">
                        <CIcon className="w-4 h-4 text-orange" aria-hidden="true" />
                      </div>
                      <h3 className="text-sm font-bold text-ink">{cat.title}</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {cat.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 text-xs text-ink-600 font-light">
                          <CheckCircle className="w-3.5 h-3.5 text-orange shrink-0 mt-0.5" aria-hidden="true" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bulk orders & catering ────────────────────────────────────────── */}
      <section id="bulk" className="bg-ink py-16 lg:py-20 border-t border-white/8 scroll-mt-24" aria-label="Bulk orders and catering">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <AnimateOnScroll>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-sm bg-orange/15 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-orange" aria-hidden="true" />
                </div>
                <p className="text-[11px] font-bold tracking-widest uppercase text-orange">
                  Bulk Orders & Catering
                </p>
              </div>
              <h2
                className="font-extrabold tracking-tight text-white leading-[1.1] mb-5"
                style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)" }}
              >
                Feeding a crowd?{" "}
                <span className="font-handwritten text-orange" style={{ fontSize: "1.1em" }}>
                  We&apos;ve got you.
                </span>
              </h2>
              <p className="text-base text-white/55 font-light leading-relaxed mb-8">
                Checkstar&apos;s bulk ordering service caters to large families, schools, mosques, corporate offices, and event organisers. Every department can accommodate larger-volume orders — speak to the relevant department manager in-store to discuss your requirements and lead times.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: Users,    text: "Functions & events" },
                  { icon: Calendar, text: "Advance ordering" },
                  { icon: Truck,    text: "All departments" },
                  { icon: Phone,    text: "In-store consultation" },
                ].map((item) => {
                  const BIcon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-sm px-4 py-3">
                      <BIcon className="w-4 h-4 text-orange shrink-0" aria-hidden="true" />
                      <span className="text-sm text-white/70 font-light">{item.text}</span>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/store-locator"
                className="inline-flex items-center gap-2 bg-orange text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-orange-hover transition-colors duration-200 shadow-orange"
              >
                Find your nearest branch
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </AnimateOnScroll>

            {/* Who we cater for */}
            <AnimateOnScroll delay={0.1}>
              <p className="text-[11px] font-bold tracking-widest uppercase text-white/35 mb-5">
                Who we cater for
              </p>
              <div className="space-y-3">
                {[
                  { label: "Large families & households", note: "Bulk produce, meat, and pantry packs" },
                  { label: "Mosques & religious functions", note: "Halaal-friendly catering across all departments" },
                  { label: "Schools & educational institutions", note: "Tuck shop stocking, event catering, feeding schemes" },
                  { label: "Corporate offices & businesses", note: "Deli platters, drinks, and pantry restocking" },
                  { label: "Events & celebrations", note: "Custom braai packs, catering platters, cakes" },
                  { label: "Restaurants & food businesses", note: "Fresh produce, butchery, and dry goods in volume" },
                ].map((item, i) => (
                  <AnimateOnScroll key={item.label} delay={i * 0.05}>
                    <div className="flex items-start gap-3 border-b border-white/8 pb-3 last:border-0 last:pb-0">
                      <CheckCircle className="w-4 h-4 text-orange shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-bold text-white">{item.label}</p>
                        <p className="text-xs text-white/45 font-light mt-0.5">{item.note}</p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── Expert in-store services ──────────────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-20" aria-label="Expert in-store services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="mb-10">
            <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-3">
              In-Store Expertise
            </p>
            <h2
              className="font-extrabold tracking-tight text-ink leading-[1.1] mb-4"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              Specialist services, every day.
            </h2>
            <p className="text-sm text-ink-600 font-light leading-relaxed max-w-xl">
              Each Checkstar department is staffed by specialists — blockmen, bakers, and chefs who bring genuine craft to what they do. These services are available daily, in-store, at every branch.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {EXPERT_SERVICES.map((svc, i) => {
              const SIcon = svc.icon;
              return (
                <AnimateOnScroll key={svc.title} delay={i * 0.07}>
                  <div className="group bg-white border border-ink-100 rounded-sm p-6 hover:shadow-raised transition-shadow duration-300 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-sm bg-orange/10 flex items-center justify-center group-hover:bg-orange transition-colors duration-300">
                        <SIcon className="w-4.5 h-4.5 text-orange group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                      </div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-ink-400">{svc.dept}</span>
                    </div>
                    <h3 className="text-base font-bold text-ink mb-2 group-hover:text-orange transition-colors duration-200">{svc.title}</h3>
                    <p className="text-sm text-ink-600 font-light leading-relaxed flex-1 mb-5">{svc.body}</p>
                    <Link
                      href={svc.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-orange hover:text-orange-hover transition-colors duration-200 mt-auto"
                    >
                      {svc.cta}
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Payment methods ───────────────────────────────────────────────── */}
      <section id="payments" className="bg-white border-t border-ink-100 py-16 lg:py-20 scroll-mt-24" aria-label="Payment methods">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="mb-10 max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm bg-orange/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-orange" aria-hidden="true" />
              </div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-orange">
                Payment Options
              </p>
            </div>
            <h2
              className="font-extrabold tracking-tight text-ink leading-[1.1] mb-4"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)" }}
            >
              Pay the way you prefer.
            </h2>
            <p className="text-base text-ink-600 font-light leading-relaxed">
              We accept a wide range of payment methods so you can shop with convenience. ATMs are available in-store at all three branches for cash withdrawals.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PAYMENT_METHODS.map((pm, i) => {
              const PMIcon = pm.icon;
              return (
                <AnimateOnScroll key={pm.label} delay={i * 0.07}>
                  <div className="border border-ink-100 rounded-sm p-5 text-center hover:shadow-card transition-shadow duration-200">
                    <div className="w-10 h-10 rounded-sm bg-orange/10 flex items-center justify-center mx-auto mb-3">
                      <PMIcon className="w-5 h-5 text-orange" aria-hidden="true" />
                    </div>
                    <p className="text-sm font-bold text-ink mb-1">{pm.label}</p>
                    <p className="text-[11px] text-ink-400 font-light leading-snug">{pm.note}</p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Accessibility & family ────────────────────────────────────────── */}
      <section id="access" className="bg-ink py-16 lg:py-20 border-t border-white/8 scroll-mt-24" aria-label="Accessibility and family facilities">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="mb-12">
            <p className="text-[11px] font-bold tracking-widest uppercase text-orange mb-3">
              Inclusive Shopping
            </p>
            <h2
              className="font-extrabold tracking-tight text-white leading-[1.1]"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              Built for everyone.
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="family">
            {/* Accessibility */}
            <AnimateOnScroll>
              <div className="bg-white/5 border border-white/10 rounded-sm p-7 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-sm bg-orange/15 flex items-center justify-center">
                    <Accessibility className="w-5 h-5 text-orange" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-white">Accessible Stores</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Wheelchair ramps at all store entrances",
                    "Wide aisles designed for full accessibility",
                    "Staff trained to assist customers with disabilities",
                    "Wheelchair-accessible tills at every branch",
                    "Accessible parking bays at all locations",
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-white/65 font-light">
                      <CheckCircle className="w-3.5 h-3.5 text-orange shrink-0 mt-0.5" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>

            {/* Family */}
            <AnimateOnScroll delay={0.08}>
              <div className="bg-white/5 border border-white/10 rounded-sm p-7 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-sm bg-orange/15 flex items-center justify-center">
                    <Baby className="w-5 h-5 text-orange" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-white">Family-Friendly Facilities</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Baby change facilities available in-store",
                    "Child-safe trolleys with secure child seats",
                    "Store layout designed with families in mind",
                    "Wide family lanes at selected checkouts",
                    "Staff happy to assist parents with young children",
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-white/65 font-light">
                      <CheckCircle className="w-3.5 h-3.5 text-orange shrink-0 mt-0.5" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── Trading hours & contact ───────────────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-20" aria-label="Trading hours and contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateOnScroll className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-ink-400 mb-2">
                Trading Hours & Contact
              </p>
              <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-ink">
                We&apos;re open when you need us.
              </h2>
            </div>
            <Link
              href="/store-locator"
              className="shrink-0 flex items-center gap-1.5 text-sm font-bold text-orange hover:text-orange-hover transition-colors duration-200"
            >
              View on map
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {stores.map((store, i) => (
              <AnimateOnScroll key={store.id} delay={i * 0.08}>
                <div className="bg-white border border-ink-100 rounded-sm p-6 hover:shadow-card transition-shadow duration-200">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <h3 className="text-sm font-bold text-ink leading-snug">{store.name}</h3>
                    <span className="shrink-0 text-[9px] font-bold tracking-widest uppercase bg-orange text-white px-2 py-0.5 rounded-sm">
                      {store.suburb.split(",")[0]}
                    </span>
                  </div>

                  {/* Hours */}
                  <div className="space-y-1.5 mb-4 border-b border-ink-100 pb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-ink-400 font-light">Mon – Sat</span>
                      <span className="font-bold text-ink">{store.hours.weekdays}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-ink-400 font-light">Sunday</span>
                      <span className="font-bold text-ink">{store.hours.sunday}</span>
                    </div>
                    {store.hours.fridayNote && (
                      <div className="flex items-start gap-1.5 mt-2">
                        <Clock className="w-3 h-3 text-orange shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-[10px] text-ink-400 font-light leading-snug">
                          {store.hours.fridayNote}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Contact */}
                  <div className="space-y-2">
                    <a
                      href={`tel:${store.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 text-xs text-ink-600 hover:text-orange transition-colors duration-200"
                    >
                      <Phone className="w-3.5 h-3.5 text-orange shrink-0" aria-hidden="true" />
                      {store.phone}
                    </a>
                    <p className="flex items-start gap-2 text-xs text-ink-600 font-light">
                      <MapPin className="w-3.5 h-3.5 text-orange shrink-0 mt-0.5" aria-hidden="true" />
                      {store.address}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feedback CTA ──────────────────────────────────────────────────── */}
      <section className="bg-ink py-14 lg:py-16 border-t border-white/8" aria-label="Feedback and complaints">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-sm bg-orange/15 flex items-center justify-center">
                  <MessageCircle className="w-4.5 h-4.5 text-orange" aria-hidden="true" />
                </div>
                <p className="text-[11px] font-bold tracking-widest uppercase text-orange">
                  We Want To Hear From You
                </p>
              </div>
              <h2 className="text-xl lg:text-2xl font-extrabold tracking-tight text-white leading-tight mb-2">
                Compliment, complaint, or suggestion?
              </h2>
              <p className="text-sm text-white/45 font-light max-w-lg">
                Feedback from our shoppers is how we get better. Speak to any manager in-store, call your nearest branch, or reach us through our contact page.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-orange text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-orange-hover transition-colors duration-200 shadow-orange"
              >
                Contact us
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/store-locator"
                className="inline-flex items-center justify-center gap-2 bg-white/8 border border-white/15 text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-white/15 transition-colors duration-200"
              >
                Find a store
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
