"use client";

import { ChevronRight, Target } from "lucide-react";
import TiltCard from "./TiltCard";

interface ABTestingCardProps {
  debugMode: boolean;
  selectedABVersion: string;
  setSelectedABVersion: (v: string) => void;
  abActiveTab: string;
  setAbActiveTab: (v: string) => void;
}

export default function ABTestingCard({
  debugMode,
  selectedABVersion,
  setSelectedABVersion,
  abActiveTab,
  setAbActiveTab,
}: ABTestingCardProps) {
  return (
    <TiltCard
      debugMode={debugMode}
      className="p-4 sm:p-8 flex flex-col justify-between h-full"
    >
      <div className="space-y-2 mb-6">
        <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
          Module 02
        </span>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight mt-2 text-white">
          A/B Testing & optimization
        </h2>
        <p className="text-neutral-400 text-sm">
          Run high performance experiments. Tailor pages with seamless variation
          control.
        </p>
        <a
          href="#learn-more-ab"
          className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors pt-1 group"
        >
          Learn more
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="bg-[#050505] rounded-[18px] border border-white/5 overflow-hidden flex flex-col max-h-55">
        <div className="bg-neutral-950 px-4 py-2 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>

          <div className="flex items-center gap-3 bg-neutral-900 px-3 py-1 rounded-md border border-white/5">
            <button
              onClick={() => setAbActiveTab("Pages")}
              className={`text-[10px] font-semibold tracking-wider uppercase transition-colors px-1.5 py-0.5 rounded ${abActiveTab === "Pages" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
            >
              Pages
            </button>
            <button
              onClick={() => setAbActiveTab("Layers")}
              className={`text-[10px] font-semibold tracking-wider uppercase transition-colors px-1.5 py-0.5 rounded ${abActiveTab === "Layers" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
            >
              Layers
            </button>
            <button
              onClick={() => setAbActiveTab("Assets")}
              className={`text-[10px] font-semibold tracking-wider uppercase transition-colors px-1.5 py-0.5 rounded ${abActiveTab === "Assets" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
            >
              Assets
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-4 w-px bg-white/10" />
            <Target className="w-4.5 h-4.5 text-cyan-400 animate-pulse" />
          </div>
        </div>

        <div className="flex flex-row grow h-40">
          <div className="w-1/3 bg-neutral-950 p-3.5 border-r border-white/5 flex flex-col gap-2 font-mono overflow-y-auto">
            {abActiveTab === "Pages" && (
              <>
                <div className="text-[10px] text-neutral-500 font-semibold mb-1 tracking-wider uppercase">
                  Active Tree
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center gap-1.5 text-neutral-300 px-1 py-0.5">
                    <span className="text-neutral-600">▾</span>{" "}
                    <span>Home</span>
                  </div>
                  <button
                    onClick={() => setSelectedABVersion("A")}
                    className={`w-full text-left flex items-center justify-between pl-4 pr-1.5 py-1 rounded transition-all ${selectedABVersion === "A" ? "bg-blue-600/20 text-blue-400 font-bold border-l-2 border-blue-500" : "text-neutral-500 hover:bg-white/5"}`}
                  >
                    <span>A: Control</span>
                    <span className="text-[9px] bg-neutral-900 border border-white/5 px-1 rounded">
                      20%
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedABVersion("B")}
                    className={`w-full text-left flex items-center justify-between pl-4 pr-1.5 py-1 rounded transition-all ${selectedABVersion === "B" ? "bg-cyan-600/20 text-cyan-400 font-bold border-l-2 border-cyan-500" : "text-neutral-500 hover:bg-white/5"}`}
                  >
                    <span>B: Version B</span>
                    <span className="text-[9px] bg-cyan-500/20 text-cyan-400 px-1 rounded">
                      60%
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedABVersion("C")}
                    className={`w-full text-left flex items-center justify-between pl-4 pr-1.5 py-1 rounded transition-all ${selectedABVersion === "C" ? "bg-purple-600/20 text-purple-400 font-bold border-l-2 border-purple-500" : "text-neutral-500 hover:bg-white/5"}`}
                  >
                    <span>C: Version C</span>
                    <span className="text-[9px] bg-neutral-900 border border-white/5 px-1 rounded">
                      20%
                    </span>
                  </button>
                </div>
              </>
            )}

            {abActiveTab === "Layers" && (
              <div className="space-y-1.5 text-[11px] text-neutral-400">
                <div>■ Layout.Header</div>
                <div className="pl-3">□ Header.Logo</div>
                <div className="pl-3">□ Header.NavList</div>
                <div>■ MainHero</div>
                <div className="pl-3 text-cyan-400">■ InteractiveHeroText</div>
                <div className="pl-6 text-cyan-500">
                  └─ Variation: {selectedABVersion}
                </div>
                <div>■ Footer</div>
              </div>
            )}

            {abActiveTab === "Assets" && (
              <div className="space-y-1.5 text-[11px] text-neutral-400">
                <div>⚡ GoogleAnalyticsAPI</div>
                <div>⚡ StripeElementsEngine</div>
                <div>◈ neonGlowBackground.png</div>
                <div>◈ brandFontBold.woff2</div>
              </div>
            )}
          </div>

          <div className="w-2/3 bg-neutral-900 p-4 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between text-[8px] text-neutral-500 font-mono bg-black/40 px-2 py-1 rounded border border-white/5">
              <span className="truncate">
                https://preview.voiceai.platform/
              </span>
              <span className="text-cyan-400">
                Preview: {selectedABVersion}
              </span>
            </div>

            <div className="my-auto space-y-1.5">
              <div className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">
                Dynamic Sandbox Website
              </div>

              {selectedABVersion === "A" && (
                <div className="text-sm font-semibold tracking-tight text-white leading-tight animate-fade-in">
                  The absolute fastest voice AI platform on earth.
                </div>
              )}
              {selectedABVersion === "B" && (
                <div className="text-sm font-semibold tracking-tight leading-tight animate-fade-in bg-linear-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  The fastest, ultra-realistic voice AI platform.
                </div>
              )}
              {selectedABVersion === "C" && (
                <div className="text-sm font-semibold tracking-tight text-white leading-tight animate-fade-in">
                  Deploy high-performance voice AI agents in seconds.
                </div>
              )}

              <div className="text-[9px] text-neutral-400 flex items-center gap-1.5">
                <span className="bg-white/10 px-1 py-0.5 rounded">
                  60fps rendering
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 px-1 py-0.5 rounded font-mono">
                  204ms TTFB
                </span>
              </div>
            </div>

            <div className="absolute bottom-2 right-2 bg-neutral-950/90 border border-white/10 px-2 py-1 rounded text-[9px] font-mono flex items-center gap-1.5 shadow-md">
              <span className="text-neutral-500">Conversion Rate:</span>
              {selectedABVersion === "A" && (
                <span className="text-neutral-400">3.14%</span>
              )}
              {selectedABVersion === "B" && (
                <span className="text-cyan-400 font-bold">5.82% (Winner)</span>
              )}
              {selectedABVersion === "C" && (
                <span className="text-purple-400">4.11%</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
