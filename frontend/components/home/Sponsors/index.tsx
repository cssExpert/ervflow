"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

const SPONSOR_LOGOS = [
  { src: "/images/Sponsors/logo-light1.png", alt: "Partner logo 1" },
  { src: "/images/Sponsors/logo-light2.png", alt: "Partner logo 2" },
  { src: "/images/Sponsors/logo-light3.png", alt: "Partner logo 3" },
  { src: "/images/Sponsors/logo-light4.png", alt: "Partner logo 4" },
  { src: "/images/Sponsors/logo-light5.png", alt: "Partner logo 5" },
  { src: "/images/Sponsors/logo-light6.png", alt: "Partner logo 6" },
];

const SCROLL_SPEED = 40; // px per second

function SponsorLogo({
  src,
  alt,
  isDuplicate,
}: {
  src: string;
  alt: string;
  isDuplicate: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="relative w-[100px] h-[100px] shrink-0 mr-10"
      aria-hidden={isDuplicate}
    >
      {!isLoaded && (
        <div className="absolute inset-0 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse" />
      )}
      <Image
        src={src}
        alt={isDuplicate ? "" : alt}
        fill
        draggable={false}
        loading="lazy"
        className={`object-contain pointer-events-none transition-all duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        sizes="100px"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

export default function Sponsors() {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track) return;
    const loopWidth = track.scrollWidth / 2;
    if (!loopWidth) return;

    let next = x.get();
    if (!isDragging && !prefersReducedMotion) {
      next -= (SCROLL_SPEED * delta) / 1000;
    }
    // Wrap into (-loopWidth, 0] so the loop is seamless in both directions
    if (next <= -loopWidth) next += loopWidth;
    else if (next > 0) next -= loopWidth;
    x.set(next);
  });

  return (
    <section className="py-20 md:py-30 px-6 text-center md:text-start">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-end gap-8 md:gap-15 items-center border-y border-border py-10">
          <div className="w-full max-w-[220px] flex items-center justify-center md:justify-start">
            <h3 className="text-black dark:text-white text-lg md:text-xl font-bold whitespace-nowrap">
              Investment &amp;
              <br />
              Collaboration Partners
            </h3>
          </div>

          <div className="w-full flex-1 min-w-0">
            <div
              className="overflow-hidden"
              style={{
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent, #000 25%, #000 75%, transparent)",
                maskImage:
                  "linear-gradient(90deg, transparent, #000 25%, #000 75%, transparent)",
              }}
            >
              {/* Track is rendered twice; x wraps every half-width for a seamless loop */}
              <motion.div
                ref={trackRef}
                className="sponsors-logo flex w-max items-center select-none cursor-grab active:cursor-grabbing"
                style={{ x }}
                drag="x"
                dragMomentum={false}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
              >
                {[...SPONSOR_LOGOS, ...SPONSOR_LOGOS].map((logo, index) => (
                  <SponsorLogo
                    key={`${logo.src}-${index}`}
                    src={logo.src}
                    alt={logo.alt}
                    isDuplicate={index >= SPONSOR_LOGOS.length}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
