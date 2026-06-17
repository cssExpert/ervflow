import { CheckCircle2, XCircle } from "lucide-react";
import SectionReveal from "@/components/company/shared/SectionReveal";

const BELIEFS = [
  "AI should accelerate creativity, not replace it",
  "Beautiful websites should be accessible to every team",
  "Developer experience is product experience",
  "Speed and quality are not trade-offs",
];

const BEFORE = [
  "Slow and expensive custom development",
  "Dependent on multiple disconnected tools",
  "Difficult to scale across teams",
  "Requires technical expertise at every step",
];

const AFTER = [
  "Generate complete pages from a single prompt",
  "Design, develop, and publish from one platform",
  "Scale effortlessly across any team size",
  "Empower every contributor — technical or not",
];

export default function MissionBlock() {
  return (
    <>
      {/* Mission */}
      <section className="py-20 sm:py-28 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
              Our Mission
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight max-w-2xl">
              Making professional web creation fast, collaborative, and accessible.
            </h2>
          </SectionReveal>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <SectionReveal delay={0.1}>
              <p className="text-base text-zinc-400 leading-relaxed">
                We believe creating professional websites should be fast, collaborative,
                and accessible to everyone — not just those with large budgets or deep
                technical teams.
              </p>
              <p className="mt-4 text-base text-zinc-400 leading-relaxed">
                ERVFlow empowers teams to turn ideas into production-ready websites using
                AI-driven workflows, visual editing, and developer-friendly tools that
                bridge the gap between design, content, and engineering.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                We believe
              </p>
              <ul className="space-y-3">
                {BELIEFS.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-zinc-300 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 sm:py-28 bg-zinc-900/40 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
              The Problem We Solve
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
              Traditional website creation is broken.
            </h2>
            <p className="mt-4 text-base text-zinc-400 max-w-xl mx-auto">
              Teams waste months on tools that don&apos;t talk to each other. We fixed that.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <SectionReveal delay={0.1}>
              <div className="h-full p-6 rounded-2xl border border-zinc-800 bg-zinc-950">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                  Before ERVFlow
                </h3>
                <ul className="space-y-3">
                  {BEFORE.map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-500">
                      <XCircle className="w-4 h-4 text-zinc-700 shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div className="h-full p-6 rounded-2xl border border-primary-500/20 bg-primary-500/5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-primary-500 mb-4">
                  With ERVFlow
                </h3>
                <ul className="space-y-3">
                  {AFTER.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
