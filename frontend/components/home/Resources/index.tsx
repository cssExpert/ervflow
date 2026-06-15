"use client";

import Image from "next/image";
import { LayoutPanelTop } from "lucide-react";
import React, { useState, useLayoutEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
import { Button } from "@/components/ui/button";

interface TickerItem {
  id: string;
  name: string;
  graphic: string;
  color: string;
}

const DEFAULT_TEMPLATES: TickerItem[] = [
  {
    id: "1",
    name: "Sonic 3",
    color: "from-blue-500 to-primary-600",
    graphic: "/images/Resources/01.avif",
  },
  {
    id: "2",
    name: "Shinobi",
    color: "from-red-500 to-pink-600",
    graphic: "/images/Resources/01.avif",
  },
  {
    id: "3",
    name: "Sonic 1",
    color: "from-sky-400 to-blue-500",
    graphic: "/images/Resources/01.avif",
  },
  {
    id: "4",
    name: "Street Fighter 2",
    color: "from-yellow-500 to-orange-600",
    graphic: "/images/Resources/01.avif",
  },
  {
    id: "5",
    name: "Mario Kart 64",
    color: "from-green-500 to-emerald-600",
    graphic: "/images/Resources/01.avif",
  },
  {
    id: "6",
    name: "Zelda: Ocarina",
    color: "from-teal-500 to-green-600",
    graphic: "/images/Resources/01.avif",
  },
  {
    id: "7",
    name: "Chrono Trigger",
    color: "from-primary-500 to-violet-600",
    graphic: "/images/Resources/01.avif",
  },
  {
    id: "8",
    name: "Metroid Prime",
    color: "from-amber-600 to-red-600",
    graphic: "/images/Resources/01.avif",
  },
  {
    id: "9",
    name: "Castlevania",
    color: "from-gray-700 to-slate-900",
    graphic: "/images/Resources/01.avif",
  },
];

type Theme = "modern" | "cyber" | "elegant";

interface CustomTickerProps {
  items: TickerItem[];
  /** pixels per second — lower = slower */
  velocity?: number;
  /** true = scroll left, false = scroll right */
  rtl?: boolean;
  pauseOnHover?: boolean;
  gap?: number;
  theme?: Theme;
}

function CustomTicker({
  items,
  velocity = 35,
  rtl = true,
  pauseOnHover = true,
  gap = 16,
  theme = "modern",
}: CustomTickerProps) {
  const firstSetRef = useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();

  // Measure the first set's width (including the trailing gap) so we know
  // exactly how far to translate before resetting — makes the loop seamless.
  useLayoutEffect(() => {
    if (firstSetRef.current) {
      setLoopWidth(firstSetRef.current.offsetWidth + gap);
    }
  }, [items, gap]);

  // Seed the starting position for right-to-left scroll so clone appears off-screen.
  useLayoutEffect(() => {
    if (!rtl && loopWidth > 0) x.set(-loopWidth);
    else if (rtl) x.set(0);
  }, [rtl, loopWidth, x]);

  useAnimationFrame((_, delta) => {
    if (!loopWidth || prefersReducedMotion || velocity === 0) return;
    if (pauseOnHover && isHovered) return;

    const step = (delta / 1000) * velocity * (rtl ? -1 : 1);
    let next = x.get() + step;

    // Seamless reset: once we've slid exactly one set width, snap back.
    if (rtl && next <= -loopWidth) next += loopWidth;
    if (!rtl && next >= 0) next -= loopWidth;

    x.set(next);
  });

  const cardBase =
    "group flex items-center gap-3 w-65 md:w-90 h-60 sm:h-70 p-3 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 backdrop-blur-md shadow-sm dark:shadow-lg flex-shrink-0 select-none";

  const cardTheme =
    theme === "cyber"
      ? "group dark:bg-black/80 border-neutral-200 dark:border-neutral-800 text-cyan-600 dark:text-cyan-400"
      : theme === "elegant"
        ? "group bg-white dark:bg-white/95 border-neutral-200 dark:border-neutral-800 text-slate-900 shadow-sm"
        : "group bg-white dark:bg-black/80 border-neutral-200 dark:border-neutral-800 text-slate-800 dark:text-white";

  const renderCard = (item: TickerItem, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${item.id}`}
      className={`${cardBase} ${cardTheme} flex-col items-start justify-start`}
    >
      <div className="relative w-full h-55 sm:h-65 p-3">
        <div className="absolute inset-0 w-full h-full grid items-center justify-center bg-black/20 z-2 opacity-0 transition-all group-hover:opacity-100 duration-500">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              alert("alert");
            }}
            className="inline-flex items-center gap-1.5 border-[1.5px] border-white text-black bg-white hover:border-primary hover:bg-primary! hover:text-white px-6 min-h-11 rounded-full text-[13px] transition-all shadow-md"
          >
            <LayoutPanelTop className="w-4 h-4" />
            View Template
          </Button>
        </div>
        <Image
          src={item.graphic}
          alt={item.name}
          fill
          priority
          className="w-full h-full object-cover rounded-lg overflow-hidden"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <span className="font-semibold tracking-wide text-sm whitespace-nowrap text-slate-800 dark:text-white">
        {item.name}
      </span>
    </div>
  );

  return (
    <div
      className="relative w-full overflow-hidden py-3 select-none"
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-40 bg-linear-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-linear-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

      <motion.div className="flex items-center" style={{ x }}>
        {/* Primary set — its measured width drives the seamless loop distance */}
        <div
          ref={firstSetRef}
          className="flex items-center shrink-0"
          style={{ gap }}
        >
          {items.map((item) => renderCard(item, "a"))}
        </div>
        {/* Clone — rendered with a leading gap equal to item spacing */}
        <div
          className="flex items-center shrink-0"
          style={{ gap, marginLeft: gap }}
        >
          {items.map((item) => renderCard(item, "b"))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Resources() {
  const [items] = useState<TickerItem[]>(DEFAULT_TEMPLATES);
  const [velocity] = useState(35);
  const [isRtl] = useState(true);
  const [pauseOnHover] = useState(true);
  const [theme] = useState<Theme>("modern");

  return (
    <section className="overflow-x-hidden max-w-full mx-auto py-12 md:pt-16 md:pb-24">
      <div className="max-w-4xl text-center mx-auto mb-10">
        <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.05] text-balance mb-5">
          Build Faster with{" "}
          <span className="bg-linear-to-r from-[#CEFF00] via-primary-500 to-violet-500 bg-clip-text text-transparent animate-gradient-flow">
            Ready-Made
          </span>{" "}
          Templates
        </h3>
        <p className="text-base sm:text-lg text-zinc-800 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Discover professionally designed templates, reusable components, and
          shared assets to launch websites in minutes.
        </p>
      </div>
      {/* Ticker stage */}
      <div className="flex flex-col gap-4 overflow-hidden shadow-inner">
        <CustomTicker
          items={items}
          velocity={Math.round(velocity * 1)}
          rtl={isRtl}
          pauseOnHover={pauseOnHover}
          theme={theme}
        />
        <CustomTicker
          items={items}
          velocity={Math.round(velocity * 1)}
          rtl={!isRtl}
          pauseOnHover={pauseOnHover}
          theme={theme}
        />
      </div>
    </section>
  );
}
