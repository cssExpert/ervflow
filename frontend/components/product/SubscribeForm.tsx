"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import SectionReveal from "@/components/company/shared/SectionReveal";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function validate(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1200));
    setStatus("success");
  }

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-zinc-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionReveal>
          <div className="w-12 h-12 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-5">
            <Mail className="w-5 h-5 text-primary-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
            Stay Ahead of Every Release
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
            Get notified when we ship new features, improvements, and major
            releases. No spam — unsubscribe any time.
          </p>
        </SectionReveal>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col items-center gap-3 py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 14,
                  delay: 0.1,
                }}
                className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"
              >
                <CheckCircle2 className="w-7 h-7 text-emerald-500" />
              </motion.div>
              <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                You&apos;re on the list!
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                We&apos;ll send you an email when the next release ships.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder="you@company.com"
                  className={`w-full px-4 py-3 text-sm rounded-sm border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none transition-colors duration-200 focus:border-primary-500 dark:focus:border-primary-500 ${
                    errorMsg
                      ? "border-rose-400 dark:border-rose-500"
                      : "border-zinc-300 dark:border-zinc-700"
                  }`}
                  disabled={status === "loading"}
                />
                {errorMsg && (
                  <p className="text-left mt-1.5 text-xs text-rose-500">
                    {errorMsg}
                  </p>
                )}
              </div>
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                whileTap={status !== "loading" ? { scale: 0.97 } : {}}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-primary-500 hover:bg-primary-600 text-white rounded-sm transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed shrink-0"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subscribing…
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="mt-5 text-xs text-zinc-400 dark:text-zinc-600">
          By subscribing you agree to our{" "}
          <a
            href="/legal/privacy"
            className="underline hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
          >
            Privacy Policy
          </a>
          . No spam, ever.
        </p>
      </div>
    </section>
  );
}
