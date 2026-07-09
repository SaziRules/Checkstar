"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <div className="py-10 border-b border-white/8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="shrink-0">
          <p className="text-[10px] font-bold tracking-widest uppercase text-orange mb-1">
            Weekly Specials Digest
          </p>
          <p className="text-lg font-extrabold text-white tracking-tight leading-snug">
            Never miss a deal.
          </p>
          <p className="text-xs text-white/40 font-light mt-1">
            Best prices to your inbox every Thursday. No spam.
          </p>
        </div>

        {submitted ? (
          <div className="flex items-center gap-2 text-sm text-white/60">
            <CheckCircle className="w-4 h-4 text-orange shrink-0" aria-hidden="true" />
            You&apos;re on the list — specials land every Thursday.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex-1 max-w-md"
            aria-label="Newsletter signup"
          >
            <div className="flex gap-2">
              <div className="flex-1">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-describedby={error ? "footer-email-error" : undefined}
                  aria-invalid={!!error}
                  className="w-full px-4 py-3 text-sm bg-white/8 border border-white/15 rounded-sm text-white placeholder:text-white/30 focus:outline-none focus:border-orange transition-colors duration-200"
                />
                {error && (
                  <p id="footer-email-error" role="alert" className="mt-1 text-xs text-red-400">
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="shrink-0 flex items-center gap-1.5 bg-orange text-white text-sm font-bold px-5 py-3 rounded-sm hover:bg-orange-hover transition-colors duration-200"
              >
                Subscribe
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
