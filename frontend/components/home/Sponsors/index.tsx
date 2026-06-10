"use client";

import Image from "next/image";
import { useState } from "react";

const SPONSOR_LOGOS = [
  { src: "/images/Sponsors/logo-pink1.png", alt: "Partner logo 1" },
  { src: "/images/Sponsors/logo-pink2.png", alt: "Partner logo 2" },
  { src: "/images/Sponsors/logo-pink3.png", alt: "Partner logo 3" },
  { src: "/images/Sponsors/logo-pink4.png", alt: "Partner logo 4" },
  { src: "/images/Sponsors/logo-pink5.png", alt: "Partner logo 5" },
  { src: "/images/Sponsors/logo-pink6.png", alt: "Partner logo 6" },
];

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
      className="relative w-[100px] h-[100px] shrink-0"
      aria-hidden={isDuplicate}
    >
      {!isLoaded && (
        <div className="absolute inset-0 rounded-lg bg-black/10 dark:bg-white/10 animate-pulse" />
      )}
      <Image
        src={src}
        alt={isDuplicate ? "" : alt}
        fill
        className={`object-contain transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        sizes="100px"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

export default function Sponsors() {
  return (
    <section className="py-20 md:py-30 px-6 text-start">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-end gap-8 md:gap-15 items-center border-y border-border py-10">
          <div className="w-full max-w-[220px] flex items-center">
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
              {/* Track is rendered twice; translateX(-50%) loops seamlessly */}
              <div className="sponsors-track flex w-max items-center gap-10">
                {[...SPONSOR_LOGOS, ...SPONSOR_LOGOS].map((logo, index) => (
                  <SponsorLogo
                    key={`${logo.src}-${index}`}
                    src={logo.src}
                    alt={logo.alt}
                    isDuplicate={index >= SPONSOR_LOGOS.length}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
