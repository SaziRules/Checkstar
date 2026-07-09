"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, MapPin, ChevronDown, Search, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mainNav } from "@/data/navigation";
import { departments } from "@/data/departments";
import { promotionsMega, discoverMega } from "@/data/megaMenus";
import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";

type MegaType = "departments" | "promotions" | "discover";

const MEGA_LABELS = new Set<string>(["Departments", "Promotions", "Discover"]);

/* ── Departments mega content ──────────────────────────────────────── */
function DepartmentsContent({ onClose }: { onClose: () => void }) {
  const featured = departments[0];
  const rest = departments.slice(1);

  return (
    <div className="grid grid-cols-5 gap-6 py-6">

      {/* Featured panel */}
      <Link
        href={featured.href}
        onClick={onClose}
        className="col-span-2 group relative rounded-sm overflow-hidden block"
      >
        <div className="relative h-56 w-full">
          <Image
            src={featured.image.src}
            alt={featured.image.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 1280px) 40vw, 512px"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 65%)",
            }}
            aria-hidden="true"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-[9px] font-bold tracking-widest uppercase text-orange mb-1 block">
            Highlight
          </span>
          <p className="text-xl font-extrabold text-white leading-tight mb-1">
            {featured.name}
          </p>
          <p className="text-xs text-white/55 font-light mb-4">{featured.tagline}</p>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-orange px-3.5 py-1.5 rounded-sm group-hover:bg-orange-hover transition-colors duration-200">
            Explore
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </span>
        </div>
      </Link>

      {/* Department grid */}
      <div className="col-span-3 grid grid-cols-3 gap-1 content-start">
        {rest.map((dept) => (
          <Link
            key={dept.id}
            href={dept.href}
            onClick={onClose}
            className="group flex items-center gap-3 p-2.5 rounded-sm hover:bg-white/5 transition-colors duration-150"
          >
            <div className="relative w-16 h-16 rounded-sm overflow-hidden shrink-0">
              <Image
                src={dept.image.src}
                alt=""
                aria-hidden="true"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="64px"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white group-hover:text-orange transition-colors duration-150 leading-tight">
                {dept.name}
              </p>
              <p className="text-[11px] text-white/40 font-light leading-snug mt-0.5 truncate">
                {dept.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Promotions mega content ───────────────────────────────────────── */
function PromotionsContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="grid grid-cols-4 gap-4 py-6">
      {promotionsMega.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="group block rounded-sm overflow-hidden border border-white/8 hover:border-orange/50 transition-colors duration-200"
        >
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1280px) 25vw, 320px"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 60%)",
              }}
              aria-hidden="true"
            />
            {i === 1 && (
              <span className="absolute top-2.5 left-2.5 text-[9px] font-bold tracking-widest uppercase bg-orange text-white px-2 py-1 rounded-sm">
                Live Now
              </span>
            )}
          </div>
          <div className="p-3.5 bg-white/[0.04]">
            <p className="text-sm font-bold text-white group-hover:text-orange transition-colors duration-150 leading-tight mb-1.5">
              {item.label}
            </p>
            <p className="text-[11px] text-white/45 font-light leading-snug">
              {item.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ── Discover mega content ─────────────────────────────────────────── */
function DiscoverContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-1 py-6">
      {discoverMega.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="group flex items-center gap-3.5 p-2.5 rounded-sm hover:bg-white/5 transition-colors duration-150"
        >
          <div className="relative w-20 h-[60px] rounded-sm overflow-hidden shrink-0">
            <Image
              src={item.image.src}
              alt=""
              aria-hidden="true"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="80px"
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white group-hover:text-orange transition-colors duration-150 leading-tight">
              {item.label}
            </p>
            <p className="text-[11px] text-white/40 font-light leading-snug mt-0.5">
              {item.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ── Mega menu shell ───────────────────────────────────────────────── */
const megaTitles: Record<MegaType, string> = {
  departments: "Shop by Department",
  promotions: "Current Promotions",
  discover: "Discover Checkstar",
};

const megaViewAll: Record<MegaType, { href: string; label: string } | null> = {
  departments: { href: "/departments", label: "All Departments" },
  promotions: { href: "/promotions", label: "All Promotions" },
  discover: null,
};

function MegaMenu({ type, onClose }: { type: MegaType; onClose: () => void }) {
  const va = megaViewAll[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 bg-ink border-t border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pt-4 pb-3 border-b border-white/8">
          <p className="text-[10px] font-bold tracking-widest uppercase text-white/35">
            {megaTitles[type]}
          </p>
          {va && (
            <Link
              href={va.href}
              onClick={onClose}
              className="flex items-center gap-1 text-xs font-bold text-orange hover:text-orange-hover transition-colors duration-200"
            >
              {va.label}
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          )}
        </div>

        {type === "departments" && <DepartmentsContent onClose={onClose} />}
        {type === "promotions" && <PromotionsContent onClose={onClose} />}
        {type === "discover" && <DiscoverContent onClose={onClose} />}
      </div>
    </motion.div>
  );
}

/* ── Regular dropdown (Corporate) ─────────────────────────────────── */
function DropdownMenu({ items }: { items: NavItem[] }) {
  return (
    <ul
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-ink border border-white/10 rounded-md shadow-float py-1.5 z-50"
      role="menu"
    >
      {items.map((item) => (
        <li key={item.href} role="none">
          <Link
            href={item.href}
            role="menuitem"
            className="block px-4 py-2.5 text-sm text-white/70 hover:text-orange hover:bg-white/5 transition-colors duration-150"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function NavLink({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!item.children) {
    return (
      <li>
        <Link
          href={item.href}
          className="text-sm font-medium text-white/75 hover:text-white transition-colors duration-200 py-1"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 text-sm font-medium text-white/75 hover:text-white transition-colors duration-200 py-1"
      >
        {item.label}
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      {open && <DropdownMenu items={item.children} />}
    </li>
  );
}

/* ── Mobile accordion nav item ─────────────────────────────────────── */
function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false);

  if (!item.children) {
    return (
      <li>
        <Link
          href={item.href}
          onClick={onClose}
          className="flex items-center justify-between py-4 border-b border-white/8 text-base font-semibold text-white/80 hover:text-orange transition-colors duration-200"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex items-center justify-between w-full py-4 border-b border-white/8 text-base font-semibold text-white/80 hover:text-orange transition-colors duration-200 text-left"
      >
        {item.label}
        <ChevronDown
          className={cn(
            "w-4 h-4 text-white/30 transition-transform duration-300",
            expanded && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={onClose}
                  className="flex items-center gap-3 pl-5 pr-4 py-3.5 border-b border-white/5 text-sm text-white/55 hover:text-orange transition-colors duration-200"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-orange/50 shrink-0"
                    aria-hidden="true"
                  />
                  {child.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ── Header ───────────────────────────────────────────────────────── */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaType | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveMega(null);
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setActiveMega(null);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const closeMega = useCallback(() => setActiveMega(null), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const desktopNav = mainNav.filter(
    (item) => !["Home", "Corporate"].includes(item.label)
  );

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={closeMega}
        className={cn(
          "sticky top-0 z-40 w-full bg-ink transition-all duration-300",
          scrolled
            ? "border-b border-white/8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)]"
            : "border-b border-white/8"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px] lg:h-[88px]">

            {/* Logo */}
            <Link href="/" className="shrink-0" aria-label="Checkstar — go to homepage">
              <Image
                src="/logos/logo-color.png"
                alt="Checkstar Supermarket"
                width={260}
                height={68}
                style={{ width: "auto", height: "3.75rem" }}
                className="object-contain"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Primary navigation" className="hidden lg:block">
              <ul className="flex items-center gap-7">
                {desktopNav.map((item) => {
                  if (MEGA_LABELS.has(item.label)) {
                    const type = item.label.toLowerCase() as MegaType;
                    return (
                      <li key={item.label}>
                        <button
                          onMouseEnter={() => setActiveMega(type)}
                          onClick={() =>
                            setActiveMega((v) => (v === type ? null : type))
                          }
                          aria-expanded={activeMega === type}
                          aria-haspopup="true"
                          className={cn(
                            "flex items-center gap-1 text-sm font-medium transition-colors duration-200 py-1",
                            activeMega === type
                              ? "text-orange"
                              : "text-white/75 hover:text-white"
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "w-3.5 h-3.5 transition-transform duration-200",
                              activeMega === type && "rotate-180"
                            )}
                            aria-hidden="true"
                          />
                        </button>
                      </li>
                    );
                  }
                  return <NavLink key={item.label} item={item} />;
                })}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                aria-label="Search"
                className="hidden sm:flex p-2 rounded-sm text-white/50 hover:text-white hover:bg-white/8 transition-colors duration-200"
              >
                <Search className="w-[18px] h-[18px]" aria-hidden="true" />
              </button>

              <Link
                href="/store-locator"
                className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-white/75 border border-white/15 rounded-full px-3.5 py-1.5 hover:border-orange hover:text-orange transition-colors duration-200"
              >
                <MapPin className="w-3.5 h-3.5 text-orange shrink-0" aria-hidden="true" />
                Find a Store
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                className="lg:hidden p-2 rounded-sm text-white/75 hover:text-white hover:bg-white/8 transition-colors duration-200"
              >
                <Menu className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {activeMega && (
            <MegaMenu key="mega" type={activeMega} onClose={closeMega} />
          )}
        </AnimatePresence>
      </header>

      {/* Mobile overlay — slides in from right */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.32, 0, 0.32, 1] }}
            className="fixed inset-0 z-50 bg-ink flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Mobile menu header */}
            <div className="flex items-center justify-between px-4 h-[72px] border-b border-white/8 shrink-0">
              <Link href="/" onClick={closeMobile} aria-label="Checkstar — homepage">
                <Image
                  src="/logos/logo-color.png"
                  alt="Checkstar Supermarket"
                  width={220}
                  height={58}
                  style={{ width: "auto", height: "3.25rem" }}
                />
              </Link>
              <button
                onClick={closeMobile}
                aria-label="Close menu"
                className="p-2 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Nav items with accordions */}
            <nav
              className="flex-1 overflow-y-auto px-4 py-2"
              aria-label="Mobile navigation"
            >
              <ul>
                {mainNav.map((item) => (
                  <MobileNavItem
                    key={item.label}
                    item={item}
                    onClose={closeMobile}
                  />
                ))}
              </ul>
            </nav>

            {/* CTA footer */}
            <div className="px-4 pb-8 pt-4 border-t border-white/8 shrink-0">
              <p className="font-handwritten text-orange text-xl text-center mb-3">
                cares enough
              </p>
              <Link
                href="/store-locator"
                onClick={closeMobile}
                className="flex items-center justify-center gap-2 w-full bg-orange text-white font-bold text-sm px-6 py-3.5 rounded-sm hover:bg-orange-hover transition-colors duration-200"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Find Your Nearest Store
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
