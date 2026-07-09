"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    // In production: connect to mailing list API
    setSubmitted(true);
  }

  return (
    <section
      aria-label="Newsletter signup"
      className="py-16 lg:py-20 bg-ink"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">

          {submitted ? (
            <div className="flex flex-col items-center gap-4">
              <CheckCircle className="w-10 h-10 text-orange" aria-hidden="true" />
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                You&apos;re on the list!
              </h3>
              <p className="text-sm text-white/50 font-light">
                Welcome to the Checkstar family. Your weekly specials will arrive
                every Thursday morning.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-orange" aria-hidden="true" />
                <p className="text-[11px] font-bold tracking-widest uppercase text-white/40">
                  Weekly Specials Digest
                </p>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tighter mb-3">
                Never miss a deal.
              </h3>
              <p className="text-sm text-white/50 font-light mb-8 max-w-md mx-auto">
                Get this week&apos;s best prices delivered straight to your inbox every
                Thursday morning. No spam. Cancel any time.
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto"
                aria-label="Newsletter signup form"
              >
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-describedby={error ? "newsletter-error" : undefined}
                    aria-invalid={!!error}
                    className="w-full px-4 py-3 text-sm bg-white/8 border border-white/15 rounded-sm text-white placeholder:text-white/30 focus:outline-none focus:border-orange transition-colors duration-200"
                  />
                  {error && (
                    <p id="newsletter-error" role="alert" className="mt-1.5 text-xs text-red-400 text-left">
                      {error}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-orange text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-orange-hover transition-colors duration-200 shrink-0"
                >
                  Join for Free
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </form>

              <p className="text-[11px] text-white/25 mt-4">
                By subscribing you agree to our{" "}
                <a href="/privacy" className="underline hover:text-orange transition-colors">
                  Privacy Policy
                </a>
                . Unsubscribe at any time.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
