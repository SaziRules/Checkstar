"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Search, MapPin, Phone, Navigation, Clock, X, List, Map,
  ChevronDown, Beef, Wheat, Flame, CreditCard, Award,
  Accessibility, Baby, Pill, ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Store } from "@/types";
import { cn } from "@/lib/utils";

const StoreMap = dynamic(() => import("./StoreMap"), { ssr: false });

/* ── Time helpers ──────────────────────────────────────────────────── */

function toMins(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function isOpenNow(store: Store): boolean {
  const d = new Date();
  const day = d.getDay();
  const mins = d.getHours() * 60 + d.getMinutes();
  const raw =
    day === 0 ? store.hours.sunday
    : day === 6 ? store.hours.saturday
    : store.hours.weekdays;
  const m = raw.match(/(\d{2}:\d{2})\s*[–\-]\s*(\d{2}:\d{2})/);
  if (!m) return false;
  if (mins < toMins(m[1]) || mins >= toMins(m[2])) return false;
  if (day === 5 && store.hours.fridayNote) {
    if (mins >= toMins("12:15") && mins < toMins("13:15")) return false;
  }
  return true;
}

function todayLabel() {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
    new Date().getDay()
  ];
}

function todayHours(store: Store): string {
  const day = new Date().getDay();
  if (day === 0) return store.hours.sunday;
  if (day === 6) return store.hours.saturday;
  return store.hours.weekdays;
}

function directionsUrl(store: Store) {
  const q = store.coordinates
    ? `${store.coordinates.lat},${store.coordinates.lng}`
    : encodeURIComponent(`${store.address}, ${store.suburb}, South Africa`);
  return `https://www.google.com/maps/dir/?api=1&destination=${q}`;
}

/* ── Service badge ─────────────────────────────────────────────────── */

const SERVICE_ICONS: Record<string, React.ElementType> = {
  "Master Butchery": Beef,
  "Scratch Bakery": Wheat,
  "Hot Foods & Deli": Flame,
  "ATM": CreditCard,
  "Halaal Friendly": Award,
  "Wheelchair Accessible": Accessibility,
  "Baby Change Facility": Baby,
  "Pharmacy": Pill,
};

function ServiceBadge({ label }: { label: string }) {
  const Icon = SERVICE_ICONS[label];
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-white/6 border border-white/10 text-white/50 px-2 py-0.5 rounded-sm whitespace-nowrap">
      {Icon && <Icon className="w-3 h-3 shrink-0" aria-hidden="true" />}
      {label}
    </span>
  );
}

/* ── Hours table ───────────────────────────────────────────────────── */

function HoursTable({ store }: { store: Store }) {
  const today = new Date().getDay();
  const rows = [
    { label: "Mon – Fri", hours: store.hours.weekdays, active: today >= 1 && today <= 5 },
    { label: "Saturday",  hours: store.hours.saturday, active: today === 6 },
    { label: "Sunday",    hours: store.hours.sunday,   active: today === 0 },
    ...(store.hours.publicHolidays
      ? [{ label: "Public Holidays", hours: store.hours.publicHolidays, active: false }]
      : []),
  ];
  return (
    <div className="mt-4 rounded-sm overflow-hidden border border-white/10">
      {rows.map(({ label, hours, active }) => (
        <div
          key={label}
          className={cn(
            "flex items-center justify-between px-3.5 py-2 text-xs border-b border-white/6 last:border-0",
            active ? "bg-orange/10 text-white" : "text-white/40"
          )}
        >
          <span className={cn("font-medium", active && "font-bold")}>{label}</span>
          <span className={cn(active && "font-bold text-orange")}>{hours}</span>
        </div>
      ))}
      {store.hours.fridayNote && (
        <p className="px-3.5 py-2 text-[10px] text-orange/60 italic border-t border-white/6">
          * {store.hours.fridayNote}
        </p>
      )}
    </div>
  );
}

/* ── Store card (sidebar) ──────────────────────────────────────────── */

function StoreCard({
  store, active, open, onClick,
}: {
  store: Store; active: boolean; open: boolean; onClick: () => void;
}) {
  const day   = todayLabel();
  const hours = todayHours(store);

  return (
    <div
      onClick={onClick}
      className={cn(
        "border-b border-white/8 cursor-pointer transition-colors duration-200",
        active ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"
      )}
    >
      {/* Store photo */}
      {store.image && (
        <div className="relative h-36 w-full overflow-hidden">
          <Image
            src={store.image}
            alt={store.name}
            fill
            className="object-cover"
            sizes="400px"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(17,17,17,0.88) 0%, rgba(0,0,0,0.08) 60%)" }}
            aria-hidden="true"
          />
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-orange/80 mb-0.5">
                {store.suburb}
              </p>
              <h3 className="text-base font-extrabold text-white leading-tight">{store.name}</h3>
            </div>
            <span
              className={cn(
                "shrink-0 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-sm",
                open
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              )}
            >
              <span
                className={cn("w-1.5 h-1.5 rounded-full", open ? "bg-green-400" : "bg-red-400")}
                aria-hidden="true"
              />
              {open ? "Open" : "Closed"}
            </span>
          </div>
        </div>
      )}

      <div className="px-4 py-4">
        {/* Address + phone */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <p className="flex items-start gap-1.5 text-sm text-white/50 leading-snug">
            <MapPin className="w-3.5 h-3.5 text-orange shrink-0 mt-0.5" aria-hidden="true" />
            {store.address}, {store.suburb}
          </p>
          <a
            href={`tel:${store.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs text-white/40 hover:text-orange transition-colors shrink-0"
            aria-label={`Call ${store.name}`}
          >
            <Phone className="w-3 h-3" aria-hidden="true" />
            {store.phone}
          </a>
        </div>

        {/* Today's hours */}
        <div className="flex items-center gap-1.5 text-xs text-white/40 mb-3">
          <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span className="font-medium text-white/60">{day}:</span>
          <span>{hours}</span>
        </div>

        {/* Services */}
        <div className="flex flex-wrap gap-1.5">
          {store.services.map((s) => <ServiceBadge key={s} label={s} />)}
        </div>

        {/* Expanded: full hours + actions */}
        <AnimatePresence initial={false}>
          {active && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <HoursTable store={store} />
              <div className="flex gap-2 mt-4">
                <a
                  href={directionsUrl(store)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 bg-orange text-white text-xs font-bold py-2.5 rounded-sm hover:bg-orange-hover transition-colors duration-200"
                >
                  <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                  Get Directions
                </a>
                <a
                  href={`tel:${store.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center gap-2 border border-white/15 text-white text-xs font-bold px-4 py-2.5 rounded-sm hover:bg-white/8 transition-colors duration-200"
                  aria-label={`Call ${store.name}`}
                >
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  Call
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!active && (
          <button
            className="mt-3 flex items-center gap-1 text-[11px] text-white/25 hover:text-orange/70 transition-colors"
            tabIndex={-1}
            aria-hidden="true"
          >
            <ChevronDown className="w-3 h-3" aria-hidden="true" />
            View hours & directions
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Mobile bottom sheet ───────────────────────────────────────────── */

function MobileBottomSheet({
  store, open: isOpen, onClose, onViewDetails,
}: {
  store: Store; open: boolean; onClose: () => void; onViewDetails: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-[9]"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.32, 0, 0.32, 1] }}
            className="absolute bottom-0 left-0 right-0 z-10 bg-ink rounded-t-2xl shadow-[0_-8px_40px_rgba(0,0,0,0.5)] pb-6"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-4">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Store photo strip */}
            {store.image && (
              <div className="relative h-28 mx-4 rounded-sm overflow-hidden mb-4">
                <Image
                  src={store.image}
                  alt={store.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(17,17,17,0.7) 0%, transparent 60%)" }}
                  aria-hidden="true"
                />
              </div>
            )}

            <div className="px-4">
              {/* Name + status */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-lg font-extrabold text-white leading-tight">{store.name}</h3>
                  <p className="text-sm text-white/50 mt-0.5">{store.address}, {store.suburb}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 text-white/40 hover:text-white transition-colors shrink-0"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Today hours + phone */}
              <div className="flex items-center justify-between text-xs text-white/45 mb-4">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  {todayLabel()}: {todayHours(store)}
                </span>
                <a
                  href={`tel:${store.phone}`}
                  className="flex items-center gap-1 hover:text-orange transition-colors"
                  aria-label={`Call ${store.name}`}
                >
                  <Phone className="w-3 h-3" aria-hidden="true" />
                  {store.phone}
                </a>
              </div>

              {/* Services */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {store.services.map((s) => <ServiceBadge key={s} label={s} />)}
              </div>

              {/* CTAs */}
              <div className="flex gap-2.5">
                <a
                  href={directionsUrl(store)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-orange text-white text-sm font-bold py-3 rounded-sm hover:bg-orange-hover transition-colors"
                >
                  <Navigation className="w-4 h-4" aria-hidden="true" />
                  Get Directions
                </a>
                <a
                  href={`tel:${store.phone}`}
                  className="flex items-center justify-center gap-2 border border-white/15 text-white text-sm font-bold px-4 py-3 rounded-sm hover:bg-white/8 transition-colors"
                  aria-label={`Call ${store.name}`}
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call
                </a>
              </div>

              {/* View all details link */}
              <button
                onClick={onViewDetails}
                className="mt-3 w-full flex items-center justify-center gap-1 text-xs text-white/30 hover:text-orange transition-colors py-1"
              >
                View full store details
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Main component ────────────────────────────────────────────────── */

export function StoreLocatorClient({ stores }: { stores: Store[] }) {
  const [query, setQuery]       = useState("");
  const [selected, setSelected] = useState<Store | null>(null);
  const [mobileTab, setMobileTab] = useState<"list" | "map">("list");
  const [openMap, setOpenMap]   = useState<Record<string, boolean>>({});

  useEffect(() => {
    const compute = () => {
      const m: Record<string, boolean> = {};
      stores.forEach((s) => { m[s.id] = isOpenNow(s); });
      setOpenMap(m);
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, [stores]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return stores;
    return stores.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.suburb.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q)
    );
  }, [stores, query]);

  const handleSelect = (store: Store) =>
    setSelected((prev) => (prev?.id === store.id ? null : store));

  const openCount = Object.values(openMap).filter(Boolean).length;

  /* ── Shared search box ─────────────────────────────────────────── */
  const SearchBox = ({ placeholder = "Search by suburb or store name…" }: { placeholder?: string }) => (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" aria-hidden="true" />
      <input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-9 pr-9 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-orange/50 transition-colors duration-200"
        aria-label="Search stores"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-48 text-center px-6">
      <MapPin className="w-8 h-8 text-white/15 mb-3" aria-hidden="true" />
      <p className="text-sm text-white/40">No stores match your search.</p>
      <button
        onClick={() => setQuery("")}
        className="mt-2 text-xs text-orange hover:text-orange-hover transition-colors"
      >
        Clear search
      </button>
    </div>
  );

  return (
    <>
      {/* ── Desktop layout ─────────────────────────────────────────── */}
      <div className="hidden lg:flex" style={{ height: "calc(100dvh - 124px)" }}>

        {/* Sidebar */}
        <aside className="w-[400px] shrink-0 bg-ink border-r border-white/8 flex flex-col overflow-hidden">
          <div className="px-5 pt-6 pb-5 border-b border-white/8 shrink-0">
            <div className="flex items-baseline gap-2 mb-1">
              <h1 className="text-2xl font-extrabold tracking-tighter text-white">Find a Store</h1>
              {openCount > 0 && (
                <span className="text-xs text-green-400 font-semibold">{openCount} open now</span>
              )}
            </div>
            <p className="text-sm text-white/40 mb-4">
              {filtered.length} location{filtered.length !== 1 ? "s" : ""} across KwaZulu-Natal
            </p>
            <SearchBox />
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? <EmptyState /> : filtered.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                active={selected?.id === store.id}
                open={openMap[store.id] ?? false}
                onClick={() => handleSelect(store)}
              />
            ))}
          </div>

          <div className="px-5 py-4 border-t border-white/8 shrink-0">
            <p className="text-[11px] text-white/25 text-center">
              More Checkstar locations coming soon across KwaZulu-Natal
            </p>
          </div>
        </aside>

        {/* Map — isolated stacking context keeps Leaflet's z-indexes below the sticky header */}
        <div className="flex-1 relative z-0 isolate">
          <StoreMap stores={filtered} selected={selected} onSelect={handleSelect} />

          {/* Floating selected-store pill */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[500] bg-ink/95 backdrop-blur-sm border border-white/15 rounded-md px-5 py-3.5 shadow-float flex items-center gap-4"
              >
                <div>
                  <p className="text-sm font-bold text-white leading-tight">{selected.name}</p>
                  <p className="text-xs text-white/50 mt-0.5">{selected.address}</p>
                </div>
                <a
                  href={directionsUrl(selected)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1.5 bg-orange text-white text-xs font-bold px-3.5 py-2 rounded-sm hover:bg-orange-hover transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                  Directions
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile layout ──────────────────────────────────────────── */}
      {/* 72px mobile header + 36px announcement bar = 108px total offset */}
      <div
        className="lg:hidden flex flex-col bg-ink overflow-hidden"
        style={{ height: "calc(100dvh - 108px)" }}
      >
        {/* Mobile top bar */}
        <div className="px-4 pt-5 pb-4 border-b border-white/8 shrink-0">
          <div className="flex items-baseline gap-2 mb-3">
            <h1 className="text-xl font-extrabold tracking-tighter text-white">Find a Store</h1>
            {openCount > 0 && (
              <span className="text-xs text-green-400 font-semibold">{openCount} open now</span>
            )}
          </div>
          <SearchBox placeholder="Search stores…" />

          {/* List / Map tabs */}
          <div className="flex gap-1 bg-white/5 p-1 rounded-sm mt-3">
            {(["list", "map"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setMobileTab(tab);
                  if (tab === "list") setSelected(null);
                }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-sm text-xs font-bold transition-colors duration-200",
                  mobileTab === tab ? "bg-orange text-white" : "text-white/45 hover:text-white"
                )}
              >
                {tab === "list"
                  ? <><List className="w-3.5 h-3.5" aria-hidden="true" />List</>
                  : <><Map className="w-3.5 h-3.5" aria-hidden="true" />Map</>}
              </button>
            ))}
          </div>
        </div>

        {/* List view */}
        {mobileTab === "list" && (
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? <EmptyState /> : filtered.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                active={selected?.id === store.id}
                open={openMap[store.id] ?? false}
                onClick={() => handleSelect(store)}
              />
            ))}
            <div className="p-5 text-center">
              <p className="text-[11px] text-white/25">More locations coming soon across KwaZulu-Natal</p>
            </div>
          </div>
        )}

        {/* Map view — isolated stacking context + bottom sheet for selected store */}
        {mobileTab === "map" && (
          <div className="flex-1 relative overflow-hidden">
            {/* Map in isolated stacking context */}
            <div className="absolute inset-0 z-0 isolate">
              <StoreMap
                stores={filtered}
                selected={selected}
                onSelect={(store) => {
                  // Select store → shows bottom sheet; tapping same store → deselects
                  setSelected((prev) => (prev?.id === store.id ? null : store));
                }}
              />
            </div>

            {/* Bottom sheet — outside isolation so it floats above the map */}
            <MobileBottomSheet
              store={selected!}
              open={!!selected}
              onClose={() => setSelected(null)}
              onViewDetails={() => {
                setMobileTab("list");
                // selected stays set so card expands on list
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
