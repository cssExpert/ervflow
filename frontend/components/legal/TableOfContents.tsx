"use client";
import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, X, MoveLeft } from "lucide-react";
import Link from "next/link";

export interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  backHref?: string;
  backLabel?: string;
}

export default function TableOfContents({
  items,
  backHref = "/legal",
  backLabel = "Policy Center",
}: TableOfContentsProps) {
  const [active, setActive] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = search
    ? items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()))
    : items;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  const activeLabel = items.find((i) => i.id === active)?.label;

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:block w-56 xl:w-60 shrink-0 print:hidden">
        <div className="sticky top-24 space-y-4 max-h-[calc(100vh-7rem)] overflow-y-auto pb-4 pr-1">
          {backHref && (
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <MoveLeft className="w-3 h-3" />
              {backLabel}
            </Link>
          )}

          <div className="relative">
            {/* Search icon — decorative, contrast not required */}
            <Search className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500 dark:text-zinc-400" aria-hidden />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sections…"
              className="w-full pl-7 pr-7 py-1.5 text-xs rounded-sm bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-500 dark:placeholder:text-zinc-500 outline-none transition-[border-color,box-shadow] focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <nav className="space-y-0.5" aria-label="Document sections">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 px-2 mb-2">
              Contents
            </p>
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md transition-all duration-150 ${
                  active === item.id
                    ? "text-zinc-900 dark:text-zinc-100 font-semibold bg-zinc-100 dark:bg-zinc-800"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* ── Mobile collapsible TOC — sticky under header ── */}
      <div className="lg:hidden w-full sticky top-16 z-30 mb-0 bg-zinc-50 dark:bg-zinc-950 pb-3 pt-2 print:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium text-zinc-800 dark:text-zinc-200"
          aria-expanded={mobileOpen}
        >
          <span className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 text-zinc-800 dark:text-zinc-200">Contents</span>
            {activeLabel && (
              <span className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
                · {activeLabel}
              </span>
            )}
          </span>
          <m.span
            animate={{ rotate: mobileOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 ml-2"
          >
            <ChevronDown className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          </m.span>
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <div className="mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2 space-y-0.5">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${
                      active === item.id
                        ? "text-zinc-900 dark:text-zinc-100 font-medium bg-zinc-100 dark:bg-zinc-800"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
