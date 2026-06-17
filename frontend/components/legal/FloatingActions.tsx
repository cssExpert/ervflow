"use client";
import { useState } from "react";
import { Link2, Printer, Download, Check } from "lucide-react";

const BTN =
  "w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-600 shadow-sm transition-all";

export default function FloatingActions() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      {/* Desktop — fixed right pill */}
      <div className="hidden lg:flex fixed right-7 top-1/2 -translate-y-1/2 flex-col gap-2 z-40 print:hidden">
        <button
          onClick={copy}
          title="Copy link"
          aria-label="Copy link"
          className={BTN}
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <Link2 className="w-4 h-4" />
          )}
        </button>
        <button
          onClick={() => window.print()}
          title="Print"
          aria-label="Print page"
          className={BTN}
        >
          <Printer className="w-4 h-4" />
        </button>
        <button
          onClick={() => window.print()}
          title="Download PDF"
          aria-label="Download PDF"
          className={BTN}
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile — sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-center gap-6 print:hidden">
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Link2 className="w-3.5 h-3.5" />
          )}
          {copied ? "Copied!" : "Copy link"}
        </button>
        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700" />
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          Print
        </button>
        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700" />
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </button>
      </div>
    </>
  );
}
