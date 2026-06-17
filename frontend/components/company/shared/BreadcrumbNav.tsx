import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

export default function BreadcrumbNav({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-600">
      <Link href="/" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors" aria-label="Home">
        <Home className="w-3 h-3" />
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3 h-3 text-zinc-600 dark:text-zinc-700" aria-hidden />
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-zinc-600 dark:text-zinc-400" aria-current="page">
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
