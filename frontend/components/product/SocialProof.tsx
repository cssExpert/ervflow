import SectionReveal from "@/components/company/shared/SectionReveal";
import StatCounter from "@/components/company/shared/StatCounter";

const METRICS = [
  { value: 10000, suffix: "+", label: "Websites Generated" },
  { value: 500, suffix: "+", label: "Teams Using ERVFlow" },
  { value: 99, suffix: ".9%", label: "Platform Uptime" },
  { value: 50, suffix: "%", label: "Faster Launch Cycles" },
];

export default function SocialProof() {
  return (
    <section className="py-16 bg-[#F9F9F9] dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {METRICS.map((m, i) => (
            <SectionReveal key={m.label} delay={i * 0.1}>
              <StatCounter value={m.value} suffix={m.suffix} label={m.label} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
