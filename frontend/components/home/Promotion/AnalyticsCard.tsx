"use client";

import Icon from "@/components/common/Icon";

import React, { useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import TiltCard from "./TiltCard";

const graphData = [
  { label: "May 24", visitors: 65000, pageviews: 210000 },
  { label: "May 25", visitors: 72000, pageviews: 225000 },
  { label: "May 26", visitors: 81000, pageviews: 242000 },
  { label: "May 27", visitors: 78000, pageviews: 230000 },
  { label: "May 28", visitors: 85458, pageviews: 258156 },
  { label: "May 29", visitors: 92000, pageviews: 275000 },
  { label: "May 30", visitors: 88000, pageviews: 265000 },
  { label: "May 31", visitors: 96000, pageviews: 290000 },
  { label: "Jun 01", visitors: 104000, pageviews: 312000 },
];

interface AnalyticsCardProps {
  debugMode: boolean;
  liveVisitors: number;
}

export default function AnalyticsCard({
  debugMode,
  liveVisitors,
}: AnalyticsCardProps) {
  const [hoverIndex, setHoverIndex] = useState(4);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const referrers = [
    {
      name: "google.com",
      count: "436K",
      icon: (
        <Icon
          name="Google"
          size="20"
          fill="currentColor"
          role="button"
          className="w-5 h-5"
        />
      ),
    },
    {
      name: "chatgpt.com",
      count: "189K",
      icon: (
        <Icon
          name="ChatGpt"
          size="20"
          fill="currentColor"
          role="button"
          className="w-5 h-5"
        />
      ),
    },
    {
      name: "linkedin.com",
      count: "96K",
      icon: (
        <Icon
          name="LinkedIn"
          size="20"
          fill="currentColor"
          role="button"
          className="w-5 h-5"
        />
      ),
    },
    {
      name: "youtube.com",
      count: "82K",
      icon: (
        <Icon
          name="Youtube"
          size="20"
          fill="currentColor"
          role="button"
          className="w-5 h-5"
        />
      ),
    },
    {
      name: "bing.com",
      count: "71K",
      icon: (
        <Icon
          name="Bing"
          size="20"
          fill="currentColor"
          role="button"
          className="w-5 h-5"
        />
      ),
    },
    {
      name: "x.com",
      count: "49K",
      icon: (
        <Icon
          name="TwitterX"
          size="20"
          fill="currentColor"
          role="button"
          className="w-5 h-5"
        />
      ),
    },
  ];

  const handleChartMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chartContainerRef.current) return;
    const rect = chartContainerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, relativeX / rect.width));
    const rawIndex = Math.round(percentage * (graphData.length - 1));
    setHoverIndex(rawIndex);
  };

  return (
    <TiltCard debugMode={debugMode} className="p-4 sm:p-8 flex flex-col h-full">
      <div className="space-y-2 mb-6">
        <span className="text-xs text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
          Module 01
        </span>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight mt-2 text-white">
          Analytics & insights
        </h2>
        <p className="text-neutral-400 text-sm max-w-sm">
          Track traffic, measure performance, and monitor conversions in a clean
          overview.
        </p>
        <a
          href="#learn-more-analytics"
          className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors pt-2 group"
        >
          Learn more
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="bg-[#050505] rounded-[18px] border border-white/5 p-4 sm:p-6 grow flex flex-col justify-between relative">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold tracking-wide text-neutral-200">
              Overview
            </h3>
            <div className="flex items-center gap-2 text-[11px] bg-neutral-900 border border-white/5 px-2 py-1 rounded text-neutral-400">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping"></span>
              <span>Real-time tracking</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                <span>Live Visitors</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1da1f2] inline-block animate-pulse" />
              </div>
              <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white font-mono">
                {liveVisitors}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-neutral-500">Unique Visitors</div>
              <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white font-mono">
                1.7M
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-neutral-500">Total Pageviews</div>
              <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white font-mono">
                3.2M
              </div>
            </div>
          </div>
        </div>

        <div className="relative my-4 grow flex flex-col justify-end min-h-40">
          <div className="absolute top-0 left-0 text-[11px] text-neutral-600 font-mono">
            330k
          </div>

          <div
            ref={chartContainerRef}
            onMouseMove={handleChartMouseMove}
            className="w-full h-32 relative cursor-crosshair"
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 400 120"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  className="w-full"
                  id="blueGlow"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  className="w-full"
                  id="amberGlow"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--bg-accessibility)"
                    stopOpacity="0.4"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--bg-accessibility)"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              <path
                d={`
                  M 0 ${120 - (graphData[0].pageviews / 330000) * 100}
                  L ${50} ${120 - (graphData[1].pageviews / 330000) * 100}
                  L ${100} ${120 - (graphData[2].pageviews / 330000) * 100}
                  L ${150} ${120 - (graphData[3].pageviews / 330000) * 100}
                  L ${200} ${120 - (graphData[4].pageviews / 330000) * 100}
                  L ${250} ${120 - (graphData[5].pageviews / 330000) * 100}
                  L ${300} ${120 - (graphData[6].pageviews / 330000) * 100}
                  L ${350} ${120 - (graphData[7].pageviews / 330000) * 100}
                  L ${400} ${120 - (graphData[8].pageviews / 330000) * 100}
                `}
                fill="none"
                stroke="var(--bg-seo)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <path
                d={`
                  M 0 ${120 - (graphData[0].visitors / 330000) * 100}
                  L ${50} ${120 - (graphData[1].visitors / 330000) * 100}
                  L ${100} ${120 - (graphData[2].visitors / 330000) * 100}
                  L ${150} ${120 - (graphData[3].visitors / 330000) * 100}
                  L ${200} ${120 - (graphData[4].visitors / 330000) * 100}
                  L ${250} ${120 - (graphData[5].visitors / 330000) * 100}
                  L ${300} ${120 - (graphData[6].visitors / 330000) * 100}
                  L ${350} ${120 - (graphData[7].visitors / 330000) * 100}
                  L ${400} ${120 - (graphData[8].visitors / 330000) * 100}
                `}
                fill="none"
                stroke="var(--bg-accessibility)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {hoverIndex !== null && (
                <line
                  x1={`${(hoverIndex / (graphData.length - 1)) * 100}%`}
                  y1="0"
                  x2={`${(hoverIndex / (graphData.length - 1)) * 100}%`}
                  y2="100%"
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              )}

              {hoverIndex !== null && (
                <>
                  <circle
                    cx={`${(hoverIndex / (graphData.length - 1)) * 100}%`}
                    cy={`${120 - (graphData[hoverIndex].pageviews / 330000) * 100}`}
                    r="5"
                    fill="var(--bg-seo)"
                    stroke="white"
                    strokeWidth="2.5"
                    className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] shrink-0"
                  />
                  <circle
                    cx={`${(hoverIndex / (graphData.length - 1)) * 100}%`}
                    cy={`${120 - (graphData[hoverIndex].visitors / 330000) * 100}`}
                    r="5"
                    fill="var(--bg-accessibility)"
                    stroke="white"
                    strokeWidth="2.5"
                    className="drop-shadow-[0_0_8px_rgba(192,132,252,0.8)] shrink-0"
                  />
                </>
              )}
            </svg>

            <div
              className="absolute z-10 bg-black/90 border border-white/10 rounded-xl p-3.5 shadow-2xl backdrop-blur-md text-xs w-40 pointer-events-none transition-all duration-75"
              style={{
                left: `clamp(0%, ${(hoverIndex / (graphData.length - 1)) * 100}%, calc(100% - 10rem))`,
                bottom: "50px",
              }}
            >
              <div className="text-[10px] text-neutral-500 mb-1.5">
                {graphData[hoverIndex].label}, 2026
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
                    Pageviews
                  </span>
                  {/* Added suppressHydrationWarning to handle localized number format mismatches */}
                  <span
                    className="font-semibold text-white"
                    suppressHydrationWarning
                  >
                    {graphData[hoverIndex].pageviews.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                    Visitors
                  </span>
                  {/* Added suppressHydrationWarning to handle localized number format mismatches */}
                  <span
                    className="font-semibold text-white"
                    suppressHydrationWarning
                  >
                    {graphData[hoverIndex].visitors.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/5 pt-4">
          <div className="flex items-center justify-between mb-3 text-xs text-neutral-400">
            <span className="font-medium">Sources</span>
            <span className="text-[10px] text-neutral-500">Referrer</span>
          </div>
          <div className="space-y-1.5">
            {referrers.map((ref, idx) => (
              <div
                key={idx}
                className="group/row flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 p-1 rounded bg-neutral-900 border border-white/5 flex items-center justify-center group-hover/row:border-white/20 transition-all">
                    {ref.icon}
                  </div>
                  <span className="text-neutral-300 group-hover/row:text-white transition-colors">
                    {ref.name}
                  </span>
                </div>
                <span className="text-neutral-400 font-semibold">
                  {ref.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
