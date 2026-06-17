import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import SectionReveal from "@/components/company/shared/SectionReveal";
import StatCounter from "@/components/company/shared/StatCounter";

const METRICS = [
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "h", label: "Avg. Response Time" },
  { value: 50, suffix: "+", label: "Global Experts" },
];

const PERKS = [
  "Set your own rates",
  "Choose your projects",
  "Get ERVFlow certified",
  "Join a top community",
];

export default function ExpertMetrics() {
  return (
    <>
      {/* Success Metrics */}
      <section className="py-20 sm:py-28 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
              Track Record
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
              Results that speak for themselves
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {METRICS.map((m, i) => (
              <SectionReveal key={m.label} delay={i * 0.1}>
                <StatCounter
                  value={m.value}
                  suffix={m.suffix}
                  label={m.label}
                />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Become an Expert */}
      <section
        id="become-expert"
        className="py-20 sm:py-28 bg-zinc-900/40 border-y border-zinc-800"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900 p-8 sm:p-12 lg:p-16 overflow-hidden">
            {/* Glow */}
            <div
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-500/10 blur-[80px] pointer-events-none"
              aria-hidden
            />
            {/* Top border accent */}
            <div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent"
              aria-hidden
            />

            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-primary-400" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
                    Join the Network
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
                  Become a certified ERVFlow Expert
                </h2>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  Help businesses succeed while growing your own. Access
                  exclusive projects, platform tools, and a thriving community
                  of top-tier professionals.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {PERKS.map((p) => (
                    <li
                      key={p}
                      className="text-xs text-zinc-300 bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-full"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="shrink-0">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary-500 hover:bg-primary-600 text-white rounded-sm transition-colors duration-200"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
