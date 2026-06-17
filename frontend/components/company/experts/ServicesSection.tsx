import {
  Palette,
  Code2,
  RefreshCcw,
  BarChart2,
  FileText,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import SectionReveal from "@/components/company/shared/SectionReveal";

const SERVICES = [
  {
    icon: Palette,
    title: "Website Design",
    desc: "Custom website design tailored to your brand identity and conversion goals.",
    iconColor: "text-violet-400",
    iconBg: "border-violet-500/20 bg-violet-500/10",
  },
  {
    icon: Code2,
    title: "Custom Development",
    desc: "Advanced functionality, third-party integrations, and custom component builds.",
    iconColor: "text-blue-400",
    iconBg: "border-blue-500/20 bg-blue-500/10",
  },
  {
    icon: RefreshCcw,
    title: "Platform Migration",
    desc: "Move your existing website to ERVFlow with zero data loss and minimal downtime.",
    iconColor: "text-emerald-400",
    iconBg: "border-emerald-500/20 bg-emerald-500/10",
  },
  {
    icon: BarChart2,
    title: "SEO & Performance",
    desc: "Optimize your site for Core Web Vitals, search visibility, and conversion rates.",
    iconColor: "text-amber-400",
    iconBg: "border-amber-500/20 bg-amber-500/10",
  },
  {
    icon: FileText,
    title: "Content Creation",
    desc: "Professional copywriting, content strategy, and AI-assisted content pipelines.",
    iconColor: "text-rose-400",
    iconBg: "border-rose-500/20 bg-rose-500/10",
  },
  {
    icon: GraduationCap,
    title: "Training & Support",
    desc: "Team onboarding, platform training, and ongoing expert guidance for your crew.",
    iconColor: "text-cyan-400",
    iconBg: "border-cyan-500/20 bg-cyan-500/10",
  },
];

const BENEFITS = [
  "Faster project delivery",
  "Access to deep ERVFlow expertise",
  "Reduced learning curve for your team",
  "Higher-quality, polished outcomes",
  "Vetted and platform-certified professionals",
  "Ongoing support beyond project launch",
];

export default function ServicesSection() {
  return (
    <>
      {/* Services Grid */}
      <section className="py-20 sm:py-28 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
              Services
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
              What our experts can do
            </h2>
            <p className="mt-4 text-base text-zinc-400 max-w-xl mx-auto">
              Comprehensive services to take your website from concept to a polished launch.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc, i) => (
              <SectionReveal key={svc.title} delay={i * 0.06}>
                <div className="group h-full p-5 sm:p-6 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-colors duration-300">
                  <div
                    className={`w-10 h-10 rounded-xl border ${svc.iconBg} flex items-center justify-center mb-4`}
                  >
                    <svc.icon className={`w-5 h-5 ${svc.iconColor}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-100 mb-1.5">{svc.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{svc.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hire */}
      <section className="py-20 sm:py-28 bg-zinc-900/40 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <SectionReveal>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
                Benefits
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
                Why hire an ERVFlow expert?
              </h2>
              <p className="mt-4 text-base text-zinc-400 leading-relaxed">
                Our certified professionals bring deep platform expertise, helping you ship
                faster and avoid costly mistakes along the way.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.12}>
              <ul className="space-y-2.5">
                {BENEFITS.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-zinc-800 bg-zinc-900"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary-400" />
                    </div>
                    <span className="text-sm text-zinc-300">{b}</span>
                  </li>
                ))}
              </ul>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
