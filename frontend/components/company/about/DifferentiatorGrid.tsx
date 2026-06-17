import { Zap, Paintbrush, Code2, Users } from "lucide-react";
import SectionReveal from "@/components/company/shared/SectionReveal";

const FEATURES = [
  {
    icon: Zap,
    title: "AI-Powered Generation",
    description:
      "Generate complete, production-ready websites from simple text prompts in seconds — not days.",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Paintbrush,
    title: "Visual Editing",
    description:
      "Customize layouts, content, and styles with pixel precision — no code required for any of it.",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: Code2,
    title: "Developer Friendly",
    description:
      "Export clean, maintainable code and integrate with modern development workflows seamlessly.",
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: Users,
    title: "Built for Teams",
    description:
      "Collaborate seamlessly across design, marketing, and development — all from a single platform.",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
  },
];

export default function DifferentiatorGrid() {
  return (
    <section className="py-20 sm:py-28 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
            Why ERVFlow
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
            What makes ERVFlow different
          </h2>
          <p className="mt-4 text-base text-zinc-400 max-w-xl mx-auto">
            A complete platform designed to replace your entire website creation toolkit.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FEATURES.map((f, i) => (
            <SectionReveal key={f.title} delay={i * 0.07}>
              <div className="group h-full p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-colors duration-300">
                <div
                  className={`w-12 h-12 rounded-xl border ${f.iconBg} flex items-center justify-center mb-5`}
                >
                  <f.icon className={`w-6 h-6 ${f.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
