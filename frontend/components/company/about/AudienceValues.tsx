import { Building2, User, BarChart3, Rocket, Store, Layers } from "lucide-react";
import SectionReveal from "@/components/company/shared/SectionReveal";

const AUDIENCES = [
  { label: "Digital Agencies", icon: Building2 },
  { label: "Freelancers", icon: User },
  { label: "Marketing Teams", icon: BarChart3 },
  { label: "Startups", icon: Rocket },
  { label: "Small & Mid-Sized Businesses", icon: Store },
  { label: "Enterprise Teams", icon: Layers },
];

const VALUES = [
  {
    num: "01",
    title: "Simplicity",
    desc: "Complex workflows should feel effortless. We remove friction at every step.",
  },
  {
    num: "02",
    title: "Speed",
    desc: "Launch faster without sacrificing quality. Time is your most valuable asset.",
  },
  {
    num: "03",
    title: "Flexibility",
    desc: "Work the way your team prefers. ERVFlow adapts to your workflow, not the other way around.",
  },
  {
    num: "04",
    title: "Innovation",
    desc: "We continuously push what AI-powered creation can do for real-world teams.",
  },
];

export default function AudienceValues() {
  return (
    <>
      {/* Who We Serve */}
      <section className="py-20 sm:py-28 bg-zinc-900/40 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
              Who We Serve
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
              Built for every team
            </h2>
            <p className="mt-4 text-base text-zinc-400 max-w-lg mx-auto">
              Whether you&apos;re a solo freelancer or an enterprise team, ERVFlow adapts to your scale.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1} className="flex flex-wrap justify-center gap-3">
            {AUDIENCES.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-sm text-zinc-300 hover:border-zinc-700 hover:text-zinc-100 transition-colors cursor-default"
              >
                <Icon className="w-4 h-4 text-primary-500 shrink-0" />
                {label}
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 sm:py-28 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
              Core Values
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
              What we stand for
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.07}>
                <div className="h-full p-6 rounded-2xl border border-zinc-800 bg-zinc-900">
                  <div className="w-8 h-8 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-4">
                    <span className="text-[11px] font-bold text-primary-400 font-mono">
                      {v.num}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-zinc-100 mb-2">{v.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{v.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
