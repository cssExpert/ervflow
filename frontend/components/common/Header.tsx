"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X } from "lucide-react";
import Icon from "@/components/common/Icon";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/data";
import Social from "./Social";
import { useTheme } from "@/components/ThemeProvider";

const Header = () => {
  const [sticky,     setSticky]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/\/$/, "") || "/";

  const handleStickyNavbar = () => {
    setSticky(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar, { passive: true });
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  // Track which hash-anchor section is in view
  useEffect(() => {
    const hashHrefs = navLinks
      .filter((l) => l.href.startsWith("/#"))
      .map((l) => l.href.slice(2)); // e.g. "features"

    if (!hashHrefs.length) return;

    const observers: IntersectionObserver[] = [];

    hashHrefs.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveHash(id);
          else setActiveHash((prev) => (prev === id ? "" : prev));
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const { resolvedTheme, setTheme } = useTheme();

  return (
    <>
      <nav
        className={`border-b border-white/10 dark:border-zinc-800/60 bg-brand-background/80 header top-0 left-0 z-40 px-3 flex w-full items-center py-2 lg:py-2.5 ${
          sticky
            ? "bg-white/80 dark:bg-black/80 dark:bg-gray-dark border-zinc-800/10 dark:shadow-sticky-dark shadow-sticky fixed z-9999 backdrop-blur-lg transition"
            : "absolute bg-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center justify-center rounded-md gap-2.5 cursor-pointer text-white transition-all"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-primary shadow-glow-brand">
              <Icon
                name="Logo"
                size="28"
                fill="currentColor"
                role="button"
                className="w-7 h-7"
              />
            </div>
            <span className="text-md md:text-lg lg:text-xl font-extrabold font-merienda text-black dark:text-white whitespace-nowrap">
              ERV<span className="text-primary">Flow</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = link.href.startsWith("/#")
                ? pathname === "/" && activeHash === link.href.slice(2)
                : pathname === link.href && (link.href !== "/" || activeHash === "");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  className={`relative px-4 py-2 text-sm font-sans font-semibold tracking-wide transition-colors duration-300 cursor-pointer ${
                    isActive
                      ? "text-primary"
                      : "text-black dark:text-white/65 hover:text-primary"
                  }`}
                >
                  {link.label}
                  <motion.span
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="inline-flex items-center gap-2.5">
            <Link
              href="/"
              className="hidden md:inline-flex items-center border-[1.5px] border-black/5 dark:border-white text-slate-800 dark:text-black bg-slate-100 dark:bg-white hover:border-primary-500 hover:text-white hover:bg-primary-500 px-6 min-h-11 rounded-full text-sm transition-all duration-500 shadow-xs"
            >
              <span className="font-bold tracking-tight">Login</span>
            </Link>
            <Link
              className="group hidden sm:inline-flex text-indigo-300 hover:text-primary-400"
              href="/"
            >
              <motion.div
                // Framer Motion spring physics handle hover and tap smoothly!
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="relative group inline-flex rounded-full p-0.75 overflow-hidden bg-white dark:bg-zinc-800/40 shadow-sm cursor-pointer select-none"
              >
                {/* 1. ROTATING GLOW BEAM */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-[150%] h-[150%] pointer-events-none"
                  style={{
                    x: "-50%",
                    y: "-50%",
                    background:
                      "conic-gradient(from 0deg at 50% 50%, transparent 60%, #F76235 85%, transparent 100%)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                />

                {/* 2. INNER CONTENT CARD */}
                <div className="relative z-10 flex items-center px-6 py-2.5 rounded-full text-sm text-zinc-400 bg-slate-100 dark:bg-black border group-hover:bg-primary-50 dark:group-hover:bg-black border-black/5 dark:border-zinc-900/60">
                  <span className="font-bold text-slate-800 dark:text-primary-300 hover:text-primary-600 group-hover:text-primary-600 dark:hover:text-primary-500 dark:group-hover:text-primary-500 tracking-tight">
                    Request Demo
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Theme Switcher */}
            <button
              suppressHydrationWarning
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              aria-label="Toggle Theme"
              className="w-10 h-10 flex items-center justify-center rounded-md bg-white/10 border border-black/10 dark:border-zinc-800/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={resolvedTheme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.25 }}
                  suppressHydrationWarning
                >
                  {resolvedTheme === "dark" ? (
                    <Moon size={20} />
                  ) : (
                    <Sun size={20} />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 flex md:hidden items-center justify-center rounded-md bg-white/10 border border-black/10 dark:border-zinc-800/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 cursor-pointer"
              aria-label="Toggle Menu"
              suppressHydrationWarning
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-52 w-72 bg-black/75 border-l border-zinc-800/60 lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/60">
              <div className="flex shrink-0 items-center justify-center gap-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white rounded-sm bg-primary shadow-glow-brand">
                  <Icon
                    name="Logo"
                    size="28"
                    fill="currentColor"
                    role="button"
                    className="w-7 h-7"
                  />
                </div>
                <span className="text-lg font-extrabold font-merienda text-white whitespace-nowrap">
                  ERV<span className="text-primary">Flow</span>
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-md inline-flex items-center justify-center transition-all duration-500 cursor-pointer text-white hover:bg-primary"
                aria-label="Close Menu"
                suppressHydrationWarning
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-6">
              {navLinks.map((link, i) => {
                const isMobileActive = link.href.startsWith("/#")
                  ? pathname === "/" && activeHash === link.href.slice(2)
                  : pathname === link.href && (link.href !== "/" || activeHash === "");
                return (
                  <motion.a
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    href={link.href}
                    className={`text-left px-4 py-3 text-base font-sans font-medium rounded-lg transition-all duration-500 ${
                      isMobileActive
                        ? "text-primary bg-primary/15"
                        : "text-white/85 hover:text-primary hover:bg-primary/15"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
            </nav>
            <div className="mt-auto px-6 pb-8 space-y-5">
              {/* Social icons */}
              <Social />
              <Link
                className="group inline-flex text-indigo-300 hover:text-primary-400"
                href="/"
              >
                <motion.div
                  // Framer Motion spring physics handle hover and tap smoothly!
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="relative inline-flex rounded-full p-0.5 overflow-hidden bg-zinc-800/40 shadow-lg cursor-pointer select-none"
                >
                  {/* 1. ROTATING GLOW BEAM */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-[150%] h-[150%] pointer-events-none"
                    style={{
                      x: "-50%",
                      y: "-50%",
                      background:
                        "conic-gradient(from 0deg at 50% 50%, transparent 60%, #F76235 85%, transparent 100%)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "linear",
                    }}
                  />

                  {/* 2. INNER CONTENT CARD */}
                  <div className="relative z-10 flex items-center px-6 py-2.5 rounded-full text-sm text-zinc-400 bg-black border border-zinc-900/60">
                    <span className="font-bold text-primary-300 hover:text-primary-500 tracking-tight">
                      Get Started — Save 50%
                    </span>
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
