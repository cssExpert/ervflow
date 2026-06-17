import { ClipboardList, UserCheck, Rocket } from "lucide-react";
import SectionReveal from "@/components/company/shared/SectionReveal";

const STEPS = [
  {
    num: "01",
    icon: ClipboardList,
    title: "Submit Your Requirements",
    description:
      "Tell us about your project goals, timeline, and budget. Our brief intake process takes less than 5 minutes.",
  },
  {
    num: "02",
    icon: UserCheck,
    title: "Get Matched",
    description:
      "We analyze your needs and connect you with the best-fit certified expert from our vetted network.",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Collaborate & Launch",
    description:
      "Work directly with your expert using built-in collaboration tools to bring your vision to life.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
            Process
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
            How it works
          </h2>
          <p className="mt-4 text-base text-zinc-400 max-w-md mx-auto">
            From brief to launch in three straightforward steps.
          </p>
        </SectionReveal>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-10 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px bg-gradient-to-r from-zinc-800 via-primary-500/40 to-zinc-800"
            aria-hidden
          />

          {STEPS.map((step, i) => (
            <SectionReveal key={step.num} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center px-4 lg:px-6">
                <div className="relative w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center mb-6 z-10">
                  <span className="text-[10px] font-mono text-primary-500/70 mb-1">
                    {step.num}
                  </span>
                  <step.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-base font-semibold text-zinc-100 mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
