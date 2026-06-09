"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Mail, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import Link from "next/link";
import Social from "@/components/common/Social";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Variants ────────────────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/* ── Info card ───────────────────────────────────────────────────── */
function InfoCard({
  icon,
  label,
  value,
  href,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const content = (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary-400">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
          {label}
        </p>
        <p className="mt-1 text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {href ? (
        <Link
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="group block rounded-2xl border border-white/8 bg-white/3 p-5 transition-colors hover:border-primary-500/30 hover:bg-primary-500/5"
        >
          {content}
        </Link>
      ) : (
        <div className="rounded-2xl border border-white/8 bg-white/3 p-5">
          {content}
        </div>
      )}
    </motion.div>
  );
}

/* ── Form field ──────────────────────────────────────────────────── */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-400 outline-none transition-all duration-200 focus:border-primary-500/60 focus:bg-primary-500/5 focus:ring-2 focus:ring-primary-500/20";

/* ── Page ────────────────────────────────────────────────────────── */
export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const formInView = useInView(formRef as React.RefObject<Element>, {
    once: true,
    amount: 0.15,
  });
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.4 });

  const [cardMouse, setCardMouse] = useState({ x: 0, y: 0 });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setFields((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1800);
  };

  return (
    <main className="min-h-screen relative px-6 overflow-hidden bg-black text-white z-2">
      {/* Ambient glows */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-120"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(247,98,53,0.125) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 -right-32 w-80 h-80"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 -left-20 w-96 h-96"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(59,130,246,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-40 md:pt-50 pb-16 text-center">
        <motion.div
          ref={heroRef}
          variants={containerVariants}
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
          className="mx-auto max-w-3xl"
        >
          <motion.span
            variants={itemVariants}
            className="mb-5 inline-block rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-400"
          >
            Contact
          </motion.span>
          <motion.h1
            variants={itemVariants}
            className="mb-5 text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white text-balance"
          >
            Let&apos;s Build{" "}
            <span className="bg-linear-to-r from-fuchsia-500 via-primary-600 to-indigo-500 bg-clip-text text-transparent animate-gradient-flow">
              Smarter Digital
            </span>{" "}
            Experiences
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-neutral-400"
          >
            Have a project in mind or just want to say hello? We&apos;d love to
            hear from you.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Main grid ────────────────────────────────────────────── */}
      <section className="px-6 pb-28 z-2">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-5">
          {/* ── Form (3 cols) ──────────────────────────────────── */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setCardMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE }}
            className="relative lg:col-span-3 flex flex-col gap-5 rounded-3xl border border-white/8 bg-white/3 p-8 backdrop-blur-sm overflow-hidden group/form"
            style={{ "--mx": `${cardMouse.x}px`, "--my": `${cardMouse.y}px` } as React.CSSProperties}
          >
            {/* Cursor glow */}
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/form:opacity-100 rounded-3xl"
              style={{ background: "radial-gradient(500px circle at var(--mx) var(--my), rgba(247,98,53,0.07), transparent 70%)" }}
            />
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/form:opacity-100 rounded-3xl"
              style={{
                background: "radial-gradient(200px circle at var(--mx) var(--my), rgba(247,98,53,0.15), transparent 60%)",
                padding: "1px",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                Send a message
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                We typically reply within 24 hours.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name">
                <input
                  name="name"
                  value={fields.name}
                  onChange={handleChange}
                  required
                  placeholder="Ravi Gupta"
                  className={inputClass}
                />
              </Field>
              <Field label="Email address">
                <input
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={handleChange}
                  required
                  placeholder="ravi@example.com"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Subject">
              <select
                name="subject"
                value={fields.subject}
                onChange={handleChange}
                required
                className={`${inputClass} cursor-pointer`}
              >
                <option value="" disabled className="bg-neutral-900">
                  Select a topic…
                </option>
                <option value="project" className="bg-neutral-900">
                  New project
                </option>
                <option value="freelance" className="bg-neutral-900">
                  Freelance inquiry
                </option>
                <option value="partnership" className="bg-neutral-900">
                  Partnership
                </option>
                <option value="support" className="bg-neutral-900">
                  Support
                </option>
                <option value="other" className="bg-neutral-900">
                  Other
                </option>
              </select>
            </Field>

            <Field label="Message">
              <textarea
                name="message"
                value={fields.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell us about your project, timeline, and budget…"
                className={`${inputClass} resize-none`}
              />
            </Field>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status !== "idle"}
              whileHover={status === "idle" ? { scale: 1.02 } : {}}
              whileTap={status === "idle" ? { scale: 0.98 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`mt-1 flex items-center justify-center gap-2.5 rounded-md py-3.5 text-base font-semibold transition-all duration-300 ${
                status === "sent"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-primary-500 text-white hover:bg-primary-600 shadow-[0_4px_24px_rgba(247,98,53,0.3)]"
              }`}
            >
              {status === "idle" && (
                <>
                  Send message <Send className="h-4 w-4" />
                </>
              )}
              {status === "sending" && (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      ease: "linear",
                    }}
                    className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                  />
                  Sending…
                </>
              )}
              {status === "sent" && (
                <>Message sent — we&rsquo;ll be in touch!</>
              )}
            </motion.button>
            </div>{/* end relative z-10 */}
          </motion.form>

          {/* ── Info sidebar (2 cols) ───────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <InfoCard
              icon={<Mail size={18} />}
              label="Email"
              value="ravigupta.exe@gmail.com"
              href="mailto:ravigupta.exe@gmail.com"
              delay={0.1}
            />
            <InfoCard
              icon={<MapPin size={18} />}
              label="Location"
              value="Delhi, India — available worldwide"
              delay={0.18}
            />
            <InfoCard
              icon={<Clock size={18} />}
              label="Response time"
              value="Within 24 hours on weekdays"
              delay={0.26}
            />

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.34, ease: EASE }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/8 bg-white/3 p-5"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Find me on
              </p>
              <div className="flex gap-3">
                {/* Social icons */}
                <Social />
              </div>
            </motion.div>

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.42, ease: EASE }}
              viewport={{ once: true }}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <p className="text-sm font-semibold text-emerald-400">
                  Available for new projects
                </p>
              </div>
              <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
                Currently accepting freelance and contract work for Q3 2026.
              </p>
              <Link
                href="/pricing"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                View packages <ArrowRight className="h-3 w-3" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
