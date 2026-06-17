import { Calendar, RefreshCw, GitBranch } from "lucide-react";

interface ChangeEntry {
  date: string;
  note: string;
}

interface VersionHistoryProps {
  version: string;
  effectiveDate: string;
  lastUpdated: string;
  changelog?: ChangeEntry[];
}

export default function VersionHistory({
  version,
  effectiveDate,
  lastUpdated,
  changelog,
}: VersionHistoryProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-sm sm:text-base md:text-lg lg:text-xl font-bold text-zinc-800 dark:text-zinc-200">
          <GitBranch className="w-5 h-5 text-zinc-400" />
          Document History
        </div>
        <span className="font-mono text-[11px] bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700">
          {version}
        </span>
      </div>
      <div className="px-5 py-4 grid grid-cols-2 gap-4 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <Calendar className="w-3 h-3" />
            <span>Effective date</span>
          </div>
          <p className="text-zinc-800 dark:text-zinc-200 font-medium">
            {effectiveDate}
          </p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <RefreshCw className="w-3 h-3" />
            <span>Last updated</span>
          </div>
          <p className="text-zinc-800 dark:text-zinc-200 font-medium">
            {lastUpdated}
          </p>
        </div>
      </div>
      {changelog && changelog.length > 0 && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 px-5 py-4 space-y-3">
          {changelog.map((entry, i) => (
            <div key={i} className="flex gap-4 text-xs">
              <span className="font-mono text-zinc-500 dark:text-zinc-400 shrink-0 pt-px">
                {entry.date}
              </span>
              <span className="text-zinc-600 dark:text-zinc-400">
                {entry.note}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
