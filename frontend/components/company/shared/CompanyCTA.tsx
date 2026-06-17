import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTALink {
  label: string;
  href: string;
}

interface CompanyCTAProps {
  heading: string;
  sub: string;
  primary: CTALink;
  secondary?: CTALink;
}

export default function CompanyCTA({ heading, sub, primary, secondary }: CompanyCTAProps) {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full bg-primary-500/10 blur-[100px]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
          {heading}
        </h2>
        <p className="mt-4 text-base text-zinc-400 leading-relaxed">{sub}</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={primary.href}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors duration-200"
          >
            {primary.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 rounded-xl transition-colors duration-200"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
