"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
// import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Bypasses the React 19 script-tag warning safely
  const scriptProps =
    typeof window === "undefined"
      ? undefined
      : ({ type: "application/json" } as const);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      scriptProps={scriptProps}
    >
      {children}
      {/* Scroll to top */}
      <motion.button
        onClick={scrollTop}
        whileHover={{ y: -3 }}
        aria-label="Scroll to top"
        className="cursor-pointer fixed bottom-8 right-6 z-40 w-10 h-10 rounded-full bg-primary text-white dark:text-dark flex items-center justify-center shadow-lg glow-primary hover:shadow-primary/40 transition-shadow duration-300"
      >
        <ArrowUp size={18} strokeWidth={2.5} />
      </motion.button>
    </NextThemesProvider>
  );
}
