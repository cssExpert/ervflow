"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import TiltCard from "./TiltCard";

export default function SEOCard({ debugMode }: { debugMode: boolean }) {
  const seoRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const [lighthouseSEO, setLighthouseSEO] = useState(0);
  const [lighthousePerformance, setLighthousePerformance] = useState(0);
  const [lighthouseAccessibility, setLighthouseAccessibility] = useState(0);

  const targetSEO = useRef(99);
  const targetPerformance = useRef(100);
  const targetAccessibility = useRef(98);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        } else {
          setIsIntersecting(false);
          setLighthouseSEO(0);
          setLighthousePerformance(0);
          setLighthouseAccessibility(0);
        }
      },
      { threshold: 0.15 },
    );

    if (seoRef.current) {
      observer.observe(seoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;

    let isAnimatingSEO = true;
    let isAnimatingPerf = true;
    let isAnimatingAccess = true;

    let currentSeo = 0;
    const seoInterval = setInterval(() => {
      if (currentSeo < targetSEO.current && isAnimatingSEO) {
        currentSeo++;
        setLighthouseSEO(currentSeo);
      } else {
        isAnimatingSEO = false;
        clearInterval(seoInterval);
      }
    }, 12);

    let currentPerf = 0;
    const perfInterval = setInterval(() => {
      if (currentPerf < targetPerformance.current && isAnimatingPerf) {
        currentPerf++;
        setLighthousePerformance(currentPerf);
      } else {
        isAnimatingPerf = false;
        clearInterval(perfInterval);
      }
    }, 10);

    let currentAccess = 0;
    const accessInterval = setInterval(() => {
      if (currentAccess < targetAccessibility.current && isAnimatingAccess) {
        currentAccess++;
        setLighthouseAccessibility(currentAccess);
      } else {
        isAnimatingAccess = false;
        clearInterval(accessInterval);
      }
    }, 13);

    return () => {
      isAnimatingSEO = false;
      isAnimatingPerf = false;
      isAnimatingAccess = false;
      clearInterval(seoInterval);
      clearInterval(perfInterval);
      clearInterval(accessInterval);
    };
  }, [isIntersecting]);

  return (
    <TiltCard
      ref={seoRef}
      debugMode={debugMode}
      className="p-4 sm:p-8 flex flex-col justify-between h-full"
    >
      <div className="space-y-2 mb-6">
        <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
          Module 03
        </span>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight mt-2 text-white">
          SEO & performance
        </h2>
        <p className="text-neutral-400 text-sm">
          Optimize every page with built-in SEO settings, metadata, and
          blazing-fast performance.
        </p>
        <a
          href="#learn-more-seo"
          className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors pt-1 group"
        >
          Learn more
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="bg-[#050505] rounded-[18px] border border-white/5 p-4 sm:p-6 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-6 self-start">
          <span className="text-xs text-neutral-400 font-mono tracking-wider">
            Lighthouse Metrics Engine
          </span>
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        </div>

        <div className="flex items-center justify-around w-full gap-4 max-w-90">
          {/* SEO Circle */}
          <div className="flex flex-col items-center gap-2 group/meter">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center cursor-pointer">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="32"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="32"
                  stroke="var(--bg-seo)"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - lighthouseSEO / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="font-mono text-base sm:text-lg font-bold text-white group-hover/meter:scale-110 transition-transform">
                {lighthouseSEO}
              </span>
            </div>
            <span className="text-[11px] text-neutral-400 font-medium font-sans mt-1">
              SEO
            </span>
          </div>

          {/* Performance Circle */}
          <div className="flex flex-col items-center gap-2 group/meter">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center cursor-pointer">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="40"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="40"
                  stroke="var(--bg-performance)"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - lighthousePerformance / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="font-mono text-lg sm:text-2xl font-black text-white group-hover/meter:scale-110 transition-transform">
                {lighthousePerformance}
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 font-bold font-sans tracking-wide mt-1">
              Performance
            </span>
          </div>

          {/* Accessibility Circle */}
          <div className="flex flex-col items-center gap-2 group/meter">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center cursor-pointer">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="32"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="32"
                  stroke="var(--bg-accessibility)"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - lighthouseAccessibility / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="font-mono text-base sm:text-lg font-bold text-white group-hover/meter:scale-110 transition-transform">
                {lighthouseAccessibility}
              </span>
            </div>
            <span className="text-[11px] text-neutral-400 font-medium font-sans mt-1">
              Accessibility
            </span>
          </div>
        </div>

        <div className="w-full mt-6 grid grid-cols-2 gap-3 text-[10px] text-neutral-500 font-mono border-t border-white/5 pt-4">
          <div className="flex items-center justify-between">
            <span>Adjust SEO:</span>
            <input
              type="range"
              min="50"
              max="100"
              value={lighthouseSEO}
              onChange={(e) => {
                const val = Number(e.target.value);
                setLighthouseSEO(val);
                targetSEO.current = val;
              }}
              className="w-16 accent-indigo-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Adjust Access:</span>
            <input
              type="range"
              min="50"
              max="100"
              value={lighthouseAccessibility}
              onChange={(e) => {
                const val = Number(e.target.value);
                setLighthouseAccessibility(val);
                targetAccessibility.current = val;
              }}
              className="w-16 accent-amber-500"
            />
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
