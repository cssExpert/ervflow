"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Features = () => {
  const features = [
    {
      color: "#2073E6",
      badge: "Step 1 of 4",
      title: "Select your favorite front-end technology",
      titleColor: "#FFFFFF",
      desc: (
        <div>
          <p className="mb-2">
            Demonstrate to your team the efficiency and adaptability you bring
            by working seamlessly across different front-end technologies.
          </p>
          <ul className="list-disc pl-10 space-y-1 mb-5">
            <li>Tailwind CSS</li>
            <li>Bootstrap</li>
          </ul>
          <Link
            href="/"
            className="inline-flex items-center border-[1.5px] border-white text-black bg-white hover:border-primary-600 hover:text-white hover:bg-primary-500 px-6 min-h-11 rounded-full text-sm md:text-md font-semibold transition-all shadow-md"
          >
            Try Demo
          </Link>
        </div>
      ),
      image: "/images/Features/Features_01.webp",
    },
    {
      color: "#FFD104",
      badge: "Step 2 of 4",
      title: "Pick UI components or create new with AI",
      titleColor: "text-black",
      desc: (
        <div>
          <p className="text-black mb-4">
            Shuffle offloads your company&rsquo;s design team. Build layouts
            from 13,400+ UI components grouped into categories such as
            navigations, headers, features, and more.
          </p>
          <Link
            href="/"
            className="inline-flex items-center border-[1.5px] border-black text-white bg-black hover:border-primary-600 hover:text-white hover:bg-primary px-6 min-h-11 rounded-full text-sm md:text-md font-semibold transition-all shadow-md"
          >
            Try Demo
          </Link>
        </div>
      ),
      image: "/images/Features/Features_02.webp",
    },
    {
      color: "#7558D4",
      badge: "Step 3 of 4",
      title: "Customize styles",
      titleColor: "#FFFFFF",
      desc: (
        <div>
          <p className="mb-5">
            A client asks to make the logo bigger? Don&rsquo;t worry! You will
            get a lot of configuration options to help you customize your
            templates.
          </p>
          <Link
            href="/"
            className="inline-flex items-center border-[1.5px] border-white text-black bg-white hover:border-primary-600 hover:text-white hover:bg-primary-500 px-6 min-h-11 rounded-full text-sm md:text-md font-semibold transition-all shadow-md"
          >
            Try Demo
          </Link>
        </div>
      ),
      image: "/images/Features/Features_03.webp",
    },
    {
      color: "#C94D1F",
      badge: "Step 4 of 4",
      title: "Publish anywhere or download the source code",
      titleColor: "#FFFFFF",
      desc: (
        <div>
          <p className="mb-5">
            Click export and download the project with all sources. There are no
            external dependencies and no vendor lock-in. You can also deploy
            code to Git or via SSH if needed!
          </p>
          <Link
            href="/"
            className="inline-flex items-center border-[1.5px] border-black text-white bg-black hover:border-primary-600 hover:text-white hover:bg-primary px-6 min-h-11 rounded-full text-sm md:text-md font-semibold transition-all shadow-md"
          >
            Try Demo
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
    <section id="features" className="pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-balance text-zinc-800 dark:text-white">
            Build{" "}
            <span className="bg-linear-to-r from-fuchsia-500 via-primary-600 to-indigo-500 bg-clip-text text-transparent animate-gradient-flow">
              stunning
            </span>{" "}
            layouts quickly
          </h2>
          <p className="text-base md:text-lg text-zinc-600 dark:text-neutral-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Speed up your workflow in a few simple steps.
          </p>
        </div>

        {/* CONTAINER HOLDING THE STACK CANVAS */}
        <div
          ref={containerRef}
          className="w-full flex flex-col items-center gap-y-40 pb-30"
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
                            sizes="(max-width: 768px) 100vw, 50vw"
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
