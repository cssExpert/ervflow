"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  resolvedTheme: "dark",
  setTheme: () => {},
});

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme | null) ?? "dark";
    setThemeState(stored);
    document.documentElement.classList.toggle("dark", stored === "dark");
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <ThemeContext.Provider value={{ resolvedTheme: theme, setTheme }}>
      {children}
      <button
        onClick={scrollTop}
        aria-label="Scroll to top"
        className="cursor-pointer fixed bottom-8 right-6 z-40 w-10 h-10 rounded-full bg-primary text-white dark:text-dark flex items-center justify-center shadow-lg glow-primary hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-200"
      >
        <ArrowUp size={18} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </ThemeContext.Provider>
  );
}
