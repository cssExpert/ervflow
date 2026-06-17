import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  Cookie,
  AlertTriangle,
  Building2,
  Lock,
  Mail,
  CheckCircle2,
  Clock,
} from "lucide-react";
import PolicyCard from "@/components/legal/PolicyCard";

export const metadata: Metadata = {
  title: "Legal & Compliance Center — ERVFlow",
  description:
    "Access ERVFlow's policies, terms, privacy practices, and compliance information in one place.",
  alternates: { canonical: "/legal" },
};

const POLICIES = [
  {
    icon: ShieldCheck,
    title: "Privacy Notice",
    description:
      "Learn how we collect, process, and protect your personal data, and understand your rights.",
    href: "/legal/privacy",
  },
  {
    icon: FileText,
    title: "Terms of Service",
    description:
      "Understand your rights and responsibilities when using ERVFlow's platform and services.",
    href: "/legal/terms",
  },
  {
    icon: Cookie,
    title: "Cookie Policy",
    description:
      "Manage cookie preferences and learn about tracking technologies we use.",
    href: "/legal/cookies",
    tag: "Coming soon",
  },
  {
    icon: AlertTriangle,
    title: "Acceptable Use Policy",
    description:
      "Guidelines for responsible platform usage and prohibited activities.",
    href: "/legal/aup",
    tag: "Coming soon",
  },
  {
    icon: Building2,
    title: "Data Processing Agreement",
    description:
      "Information for business and enterprise customers on data processing terms.",
    href: "/legal/dpa",
    tag: "Coming soon",
  },
  {
    icon: Lock,
    title: "Security & Compliance",
    description:
      "Learn about our security measures, infrastructure safeguards, and compliance certifications.",
    href: "/legal/security",
    tag: "Coming soon",
  },
];

const TRUST_BADGES = [
  {
    label: "GDPR Ready",
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "CCPA Ready",
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "SSL Encrypted",
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "Data Encrypted at Rest",
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "SOC 2 (Coming Soon)",
    icon: Clock,
    color: "text-amber-600 dark:text-amber-400",
  },
];

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Hero */}
      <section className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-22 pb-12 sm:pt-30 sm:pb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-primary-400 mb-5">
            Legal Center
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Legal &amp; Compliance Center
          </h1>
          <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Access ERVFlow&apos;s policies, terms, privacy practices, and
            compliance information in one place.
          </p>
          <div className="mt-5 flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
            <span>Last updated: June 2026</span>
            <span className="text-zinc-400 dark:text-zinc-600" aria-hidden>·</span>
            <span className="font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
              v1.0
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Policy cards */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-6">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POLICIES.map((p) => (
              <PolicyCard key={p.title} {...p} />
            ))}
          </div>
        </section>

        {/* Compliance badges */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-6">
            Compliance &amp; Trust
          </h2>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {TRUST_BADGES.map(({ label, icon: Icon, color }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              ERVFlow is committed to the highest standards of data protection
              and security. We continually work toward additional compliance
              certifications to meet the needs of enterprise and
              regulated-industry customers.
            </p>
          </div>
        </section>

        {/* Help CTA */}
        <section>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Mail className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Questions about privacy or compliance?
                </h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Our legal team is here to help with any questions you have about
                our policies.
              </p>
            </div>
            <Link
              href="mailto:legal@ervflow.com"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 rounded-sm hover:bg-primary-500 dark:hover:text-white transition-colors"
            >
              Contact legal team
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
