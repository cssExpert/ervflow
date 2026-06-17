import { Calendar, RefreshCw } from "lucide-react";

interface LegalHeroProps {
  badge?: string;
  title: string;
  description: string;
  effectiveDate?: string;
  lastUpdated?: string;
  version?: string;
}

export default function LegalHero({
  badge,
  title,
  description,
  effectiveDate,
  lastUpdated,
  version,
}: LegalHeroProps) {
  return (
    <section className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 print:border-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-22 pb-12 sm:pt-30 sm:pb-14">
        {badge && (
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-primary-400 mb-5">
            {badge}
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          {title}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          {description}
        </p>
        {(effectiveDate || lastUpdated || version) && (
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
            {effectiveDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                Effective {effectiveDate}
              </span>
            )}
            {lastUpdated && (
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 shrink-0" />
                Updated {lastUpdated}
              </span>
            )}
            {version && (
              <span className="font-mono text-[11px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
                {version}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
