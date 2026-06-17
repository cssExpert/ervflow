"use client";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import BreadcrumbNav from "@/components/company/shared/BreadcrumbNav";

const CRUMBS = [{ label: "Company" }, { label: "Hire an Expert" }];

const DOT_GRID = `url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23ffffff'/%3E%3C/svg%3E")`;

const AVATARS = [
  { initials: "SR", gradient: "from-violet-500 to-purple-600" },
  { initials: "MJ", gradient: "from-blue-500 to-cyan-600" },
  { initials: "PM", gradient: "from-emerald-500 to-teal-600" },
  { initials: "CM", gradient: "from-amber-500 to-orange-500" },
  { initials: "AO", gradient: "from-rose-500 to-pink-600" },
];

export default function ExpertHero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-zinc-950">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: DOT_GRID, backgroundSize: "32px 32px" }}
        aria-hidden
      />
      {/* Glow left */}
      <div
        className="absolute top-1/2 -left-40 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-primary-500/10 blur-[150px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-20 right-1/4 w-[400px] h-[300px] rounded-full bg-primary-500/5 blur-[120px] pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BreadcrumbNav crumbs={CRUMBS} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          {/* Avatar stack */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex -space-x-2">
              {AVATARS.map(({ initials, gradient }) => (
                <div
                  key={initials}
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} border-2 border-zinc-950 flex items-center justify-center text-[10px] font-bold text-white`}
                  aria-hidden
                >
                  {initials}
                </div>
              ))}
            </div>
            <span className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <strong className="text-zinc-200">4.9</strong> from 500+ projects
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary-500/20 bg-primary-500/8 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" aria-hidden />
            <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest">
              Expert Network Available
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-100 tracking-tight leading-[1.08] max-w-3xl">
            Get Expert Help{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-orange-400">
              When You Need It
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed">
            Work with certified ERVFlow professionals to design, build, optimize, and launch
            your website — faster and better than going it alone.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href="#directory"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors duration-200"
            >
              Find an Expert
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#become-expert"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 rounded-xl transition-colors duration-200"
            >
              Become an Expert
            </Link>
          </div>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none"
        aria-hidden
      />
    </section>
  );
}
