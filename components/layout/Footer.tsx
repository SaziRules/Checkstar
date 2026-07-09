import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { footerNav } from "@/data/navigation";
import { FooterNewsletter } from "@/components/layout/FooterNewsletter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white" aria-label="Site footer">

      {/* ── Newsletter ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FooterNewsletter />
      </div>

      {/* ── Main Footer Body ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column — wider */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="Checkstar — go to homepage">
              <Image
                src="/logos/logo-white.png"
                alt="Checkstar Supermarket"
                width={260}
                height={68}
                style={{ width: "auto", height: "4rem" }}
                className="object-contain mb-6"
              />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs font-light">
              South Africa&apos;s premier independent community supermarket. Fresh produce, honest
              prices, and a neighbourhood welcome — every single day.
            </p>
            <p className="text-[11px] font-bold tracking-widest uppercase text-white/30 mb-3">
              Follow Us
            </p>
            <div className="flex items-center gap-3">
              {[
                {
                  href: "https://facebook.com",
                  label: "Checkstar on Facebook",
                  d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                },
                {
                  href: "https://instagram.com",
                  label: "Checkstar on Instagram",
                  d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7.5 2h9a5.5 5.5 0 0 1 5.5 5.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z",
                },
              ].map(({ href, label, d }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 bg-white/5 border border-white/10 rounded-sm hover:bg-orange hover:border-orange text-white/60 hover:text-white transition-colors duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                    aria-hidden="true"
                  >
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[11px] font-bold tracking-widest uppercase text-orange mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerNav.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 font-light hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Promotions */}
          <div>
            <h3 className="text-[11px] font-bold tracking-widest uppercase text-orange mb-5">
              Promotions
            </h3>
            <ul className="space-y-3">
              {footerNav.promotions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 font-light hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[11px] font-bold tracking-widest uppercase text-orange mb-5">
              Support
            </h3>
            <ul className="space-y-3 mb-6">
              {footerNav.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 font-light hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact */}
            <div className="space-y-2">
              <a
                href="tel:0800CHECKSTAR"
                className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors duration-200"
              >
                <Phone className="w-3.5 h-3.5 text-orange shrink-0" aria-hidden="true" />
                0800 CHECKSTAR
              </a>
              <a
                href="mailto:info@checkstar.co.za"
                className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-3.5 h-3.5 text-orange shrink-0" aria-hidden="true" />
                info@checkstar.co.za
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Legal Bar ─────────────────────────────────────────────────── */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/30 font-light">
            &copy; {currentYear} Checkstar Supermarkets (Pty) Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[11px] text-white/30">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">
              Terms of Use
            </Link>
            <Link href="/paia" className="hover:text-white/70 transition-colors">
              PAIA Manual
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
