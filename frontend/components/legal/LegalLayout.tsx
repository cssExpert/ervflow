"use client";
import { type ReactNode } from "react";
import ReadingProgress from "./ReadingProgress";
import TableOfContents, { type TocItem } from "./TableOfContents";
import FloatingActions from "./FloatingActions";

interface LegalLayoutProps {
  header: ReactNode;
  children: ReactNode;
  tocItems: TocItem[];
  backHref?: string;
  backLabel?: string;
}

export default function LegalLayout({
  header,
  children,
  tocItems,
  backHref,
  backLabel,
}: LegalLayoutProps) {
  return (
    <>
      <ReadingProgress />

      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 pb-24 lg:pb-12 print:bg-white print:text-black">
        {header}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 lg:mt-10">
          <div className="flex flex-col lg:flex-row lg:gap-10 xl:gap-16 lg:items-stretch">
            <TableOfContents
              items={tocItems}
              backHref={backHref}
              backLabel={backLabel}
            />
            <main className="flex-1 min-w-0 max-w-3xl w-full pt-2 lg:pt-0">
              {children}
            </main>
          </div>
        </div>
      </div>

      <FloatingActions />
    </>
  );
}
