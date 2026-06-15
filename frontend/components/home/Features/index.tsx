"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Features = () => {
  const features = [
    {
      color: "#2073E6",
      badge: "NEXT.JS + TAILWIND",
      title: "Build with Your Stack",
      titleColor: "#FFFFFF",
      desc: (
        <div>
          <p className="mb-4">
            Create websites using modern frameworks and export clean,
            production-ready code.
          </p>
          <ul className="list-disc pl-10 space-y-1 mb-5">
            <li>Next.js Export</li>
            <li>Tailwind Native</li>
            <li>Clean React Code</li>
          </ul>
          <Link
            href="/"
            className="inline-flex items-center border-[1.5px] border-white text-black bg-white hover:border-primary-600 hover:text-white hover:bg-primary-500 px-6 min-h-11 rounded-full text-sm md:text-md font-semibold transition-all shadow-md"
          >
            Explore Integrations
          </Link>
        </div>
      ),
      image: "/images/Features/Features_01.webp",
    },
    {
      color: "#FFD104",
      badge: "AI BUILDER",
      title: "Generate with AI",
      titleColor: "text-black",
      desc: (
        <div>
          <p className="text-black mb-4">
            Turn simple prompts into layouts, pages, and reusable components in
            seconds.
          </p>
          <ul className="list-disc pl-10 space-y-1 text-black mb-5">
            <li>Smart Prompts</li>
            <li>Auto Layouts</li>
            <li>Reusable Blocks</li>
          </ul>
          <Link
            href="/"
            className="inline-flex items-center border-[1.5px] border-black text-white bg-black hover:border-primary-600 hover:text-white hover:bg-primary px-6 min-h-11 rounded-full text-sm md:text-md font-semibold transition-all shadow-md"
          >
            Try AI Builder
          </Link>
        </div>
      ),
      image: "/images/Features/Features_02.webp",
    },
    {
      color: "#7558D4",
      badge: "VISUAL EDITOR",
      title: "Customize Without Limits",
      titleColor: "#FFFFFF",
      desc: (
        <div>
          <p className="mb-4">
            Adjust layouts, typography, spacing, and interactions with real-time
            visual editing.
          </p>
          <ul className="list-disc pl-10 space-y-1 mb-5">
            <li>Drag & Drop</li>
            <li>Responsive Preview</li>
            <li>Visual + Code</li>
          </ul>
          <Link
            href="/"
            className="inline-flex items-center border-[1.5px] border-white text-black bg-white hover:border-primary-600 hover:text-white hover:bg-primary-500 px-6 min-h-11 rounded-full text-sm md:text-md font-semibold transition-all shadow-md"
          >
            Open Editor
          </Link>
        </div>
      ),
      image: "/images/Features/Features_03.webp",
    },
    {
      color: "#C94D1F",
      badge: "EXPORT + PUBLISH",
      title: "Launch Anywhere",
      titleColor: "#FFFFFF",
      desc: (
        <div>
          <p className="mb-4">
            Publish instantly or export clean code to your preferred hosting
            platform.
          </p>
          <ul className="list-disc pl-10 space-y-1 mb-5">
            <li>One-Click Deploy</li>
            <li>Custom Domains</li>
            <li>Git Integration</li>
          </ul>
          <Link
            href="/"
            className="inline-flex items-center border-[1.5px] border-black text-white bg-black/90 hover:border-white/90 hover:text-black hover:bg-white px-6 min-h-11 rounded-full text-sm md:text-md font-semibold transition-all shadow-md"
          >
            Publish Now
          </Link>
        </div>
      ),
      image: "/images/Features/Features_04.webp",
    },
  ];

  // We keep track of which card index should be actively pinned
  const containerRef = useRef<HTMLDivElement>(null);
  const [pinnedIndex, setPinnedIndex] = useState<number>(-1);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      // Batch DOM reads in rAF to prevent forced reflow
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!containerRef.current) return;
        const cards = containerRef.current.children;
        let currentPinned = -1;
        for (let i = 0; i < cards.length; i++) {
          const rect = cards[i].getBoundingClientRect();
          if (rect.top <= 100 + i * 40) currentPinned = i;
        }
        setPinnedIndex(currentPinned);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="features" className="pt-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.05] text-balance mb-5">
            Build Faster.{" "}
            <span className="bg-linear-to-r from-[#CEFF00] via-primary-500 to-violet-500 bg-clip-text text-transparent animate-gradient-flow">
              Launch Smarter.
            </span>{" "}
          </h2>
          <p className="text-base sm:text-lg text-zinc-800 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-10">
            AI-powered generation, visual editing, and clean code export—all the
            tools you need to create production-ready websites.
          </p>
        </div>

        {/* CONTAINER HOLDING THE STACK CANVAS */}
        <div
          ref={containerRef}
          className="w-full flex flex-col items-center gap-y-30 pb-30"
        >
          {features.map(
            ({ color, badge, title, titleColor, desc, image }, index) => {
              const dynamicTop = 100 + index * 40;
              const isPinned = index <= pinnedIndex;

              return (
                <div
                  key={title}
                  className="w-full transition-transform duration-300 ease-out"
                  style={{
                    position: isPinned ? "sticky" : "relative",
                    top: isPinned ? `${dynamicTop}px` : "auto",
                    zIndex: index + 1,
                    transform: isPinned
                      ? `scale(${1 - (pinnedIndex - index) * 0.05})`
                      : "scale(1)",
                    transformOrigin: "top center",
                  }}
                >
                  {/* THE CARD DESIGN CONTAINER */}
                  <div
                    className="w-full min-h-120 md:h-120 lg:max-h-124.5 flex flex-col md:flex-row overflow-hidden rounded-[32px] shadow-2xl"
                    style={{ backgroundColor: color }}
                  >
                    <div className="flex h-full w-full flex-col md:flex-row md:justify-between">
                      {/* Copy Text details */}
                      <div className="flex mb-auto md:mb-0 shrink-0 flex-col items-start justify-end text-left gap-8 md:gap-12 p-6 md:p-10 pb-12 md:pb-15 text-white">
                        <div className="flex max-w-70 md:max-w-85 lg:max-w-120 flex-col gap-3 md:gap-4">
                          <span
                            className={`text-xs uppercase tracking-widest font-semibold ${titleColor}`}
                          >
                            {badge}
                          </span>
                          <h3
                            className={`text-2xl font-bold tracking-tight md:text-3xl md:leading-10 lg:text-4xl lg:leading-12 ${titleColor}`}
                          >
                            {title}
                          </h3>
                          <div className="text-sm md:text-base">{desc}</div>
                        </div>
                      </div>

                      {/* Image block mockups */}
                      <div className="relative -mr-1 h-[40%] max-h-125 w-full min-w-0 px-0 md:h-full md:min-w-0 md:flex-1 md:basis-0 md:p-0">
                        <div className="relative w-full h-70 md:h-full max-h-125">
                          <Image
                            src={image}
                            alt={title}
                            priority={index === 0}
                            loading={index === 0 ? "eager" : "lazy"}
                            fill
                            className="object-cover object-top-left inset-0"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
};

export default Features;
