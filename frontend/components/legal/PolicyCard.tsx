import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";

interface PolicyCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  tag?: string;
  external?: boolean;
}

export default function PolicyCard({
  icon: Icon,
  title,
  description,
  href,
  tag,
  external,
}: PolicyCardProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex flex-col p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm dark:hover:bg-zinc-900/80 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
          <Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors" />
        </div>
        {tag && (
          <span className="text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">
            {tag}
          </span>
        )}
      </div>
      <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-50 transition-colors">
        {title}
      </h3>
      <p className="mt-1.5 text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
        {description}
      </p>
      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary-700 dark:text-primary-400 opacity-0 group-hover:opacity-100 group-hover:gap-1.5 transition-all duration-150">
        <span>View document</span>
        <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
      </div>
    </Link>
  );
}
