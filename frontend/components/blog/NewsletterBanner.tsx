"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function NewsletterBanner() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl bg-primary-500 px-6 py-8 md:px-10 md:py-14"
      aria-label="Newsletter signup"
    >
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="relative col-span-2 w-full max-w-lg">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Stay updated with our content
          </h2>
          <p className="mt-2 mb-6 text-sm text-white/85">
            Subscribe to the ERVFlow blog and get new deep dives straight to
            your inbox. No spam, ever.
          </p>

          {submitted ? (
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              <CheckCircle2 size={18} aria-hidden="true" />
              You&apos;re on the list — thanks for subscribing!
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:bg-white sm:rounded-sm p-1.5 md:p-2"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Type your email address…"
                className="grow px-5 py-2.5 text-md text-zinc-800 placeholder:text-zinc-500 bg-white rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ring-0!"
              />
              <button
                type="submit"
                className="px-6 py-2.5 md:py-3.5 md:px-8 text-sm md:text-base font-bold text-white bg-zinc-900 hover:bg-primary shadow-md rounded-sm transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>

        <div className="relative w-full max-w-lg">
          <Image
            src="/images/ervflow_blogging.svg"
            alt="Stay updated with our content"
            priority
            fill
            loading="eager"
            className="pointer-events-none object-cover object-top-left"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </motion.section>
  );
}
