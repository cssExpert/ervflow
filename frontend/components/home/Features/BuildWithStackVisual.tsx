"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { NextLogo, TailwindLogo, ReactLogo, GitHubLogo } from "./FeatureLogos";

const KW = "#569CD6";
const FN = "#DCDCAA";
const STR = "#CE9178";
const TYP = "#4EC9B0";
const ATR = "#9CDCFE";
const DEF = "#D4D4D4";
const NUM = "#B5CEA8";
const PNK = "#C586C0";

type Token = { t: string; c: string };
type Line = Token[];

const CODE_LINES: Line[] = [
  [{ t: PNK, c: '"use client"' }],
  [],
  [
    { t: KW, c: "import " },
    { t: DEF, c: "{ " },
    { t: TYP, c: "motion" },
    { t: DEF, c: " } " },
    { t: KW, c: "from " },
    { t: STR, c: "'framer-motion'" },
  ],
  [
    { t: KW, c: "import " },
    { t: DEF, c: "{ " },
    { t: TYP, c: "ArrowRight" },
    { t: DEF, c: " } " },
    { t: KW, c: "from " },
    { t: STR, c: "'lucide-react'" },
  ],
  [],
  [
    { t: KW, c: "export default function " },
    { t: FN, c: "Hero" },
    { t: DEF, c: "() {" },
  ],
  [
    { t: DEF, c: "  " },
    { t: KW, c: "return" },
    { t: DEF, c: " (" },
  ],
  [
    { t: DEF, c: "    " },
    { t: TYP, c: "<section" },
    { t: ATR, c: " className" },
    { t: DEF, c: "=" },
    { t: STR, c: '"py-24 px-6"' },
    { t: TYP, c: ">" },
  ],
  [
    { t: DEF, c: "      " },
    { t: TYP, c: "<m.h1" },
  ],
  [
    { t: DEF, c: "        " },
    { t: ATR, c: "initial" },
    { t: DEF, c: "={{ " },
    { t: ATR, c: "opacity" },
    { t: DEF, c: ": " },
    { t: NUM, c: "0" },
    { t: DEF, c: ", " },
    { t: ATR, c: "y" },
    { t: DEF, c: ": " },
    { t: NUM, c: "20" },
    { t: DEF, c: " }}" },
  ],
  [
    { t: DEF, c: "        " },
    { t: ATR, c: "animate" },
    { t: DEF, c: "={{ " },
    { t: ATR, c: "opacity" },
    { t: DEF, c: ": " },
    { t: NUM, c: "1" },
    { t: DEF, c: ", " },
    { t: ATR, c: "y" },
    { t: DEF, c: ": " },
    { t: NUM, c: "0" },
    { t: DEF, c: " }}" },
  ],
  [
    { t: DEF, c: "        " },
    { t: ATR, c: "className" },
    { t: DEF, c: "=" },
    { t: STR, c: '"text-6xl font-bold"' },
  ],
  [
    { t: DEF, c: "      " },
    { t: TYP, c: ">" },
    { t: DEF, c: "Build Faster" },
    { t: TYP, c: "</m.h1>" },
  ],
  [
    { t: DEF, c: "      " },
    { t: TYP, c: "<p" },
    { t: ATR, c: " className" },
    { t: DEF, c: "=" },
    { t: STR, c: '"text-zinc-500 mt-4"' },
    { t: TYP, c: ">" },
  ],
  [
    { t: DEF, c: "        " },
    { t: DEF, c: "AI-powered websites in seconds." },
  ],
  [
    { t: DEF, c: "      " },
    { t: TYP, c: "</p>" },
  ],
  [
    { t: DEF, c: "    " },
    { t: TYP, c: "</section>" },
  ],
  [{ t: DEF, c: "  )" }],
  [{ t: DEF, c: "}" }],
];

const FILE_TREE = [
  { label: "components/", type: "dir", depth: 0 },
  { label: "Hero.tsx", type: "file", depth: 1, active: true },
  { label: "Pricing.tsx", type: "file", depth: 1 },
  { label: "Button.tsx", type: "file", depth: 1 },
  { label: "app/", type: "dir", depth: 0 },
  { label: "page.tsx", type: "file", depth: 1 },
  { label: "layout.tsx", type: "file", depth: 1 },
  { label: "globals.css", type: "file", depth: 1 },
];

type EditorPhase = "typing" | "building" | "preview" | "exporting" | "idle";

export default function BuildWithStackVisual({}: { isActive: boolean }) {
  const [phase, setPhase] = useState<EditorPhase>("typing");
  const [lines, setLines] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);
  const [showPrev, setShowPrev] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [litFile, setLitFile] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ts: ReturnType<typeof setTimeout>[] = [];
    const add = (fn: () => void, ms: number) => ts.push(setTimeout(fn, ms));

    const cycle = (delay = 0) => {
      add(() => {
        setPhase("typing");
        setLines(0);
        setShowPrev(false);
        setShowNotif(false);
        setLitFile(0);
      }, delay);

      CODE_LINES.forEach((_, i) => {
        add(() => setLines(i + 1), delay + 300 + i * 155);
      });

      const afterTyping = delay + 300 + CODE_LINES.length * 155;

      add(() => setPhase("building"), afterTyping + 300);
      FILE_TREE.forEach((_, i) => {
        add(() => setLitFile(i), afterTyping + 300 + i * 160);
      });

      add(() => {
        setPhase("preview");
        setShowPrev(true);
      }, afterTyping + 1700);
      add(() => {
        setPhase("exporting");
        setShowNotif(true);
      }, afterTyping + 2800);
      add(() => setPhase("idle"), afterTyping + 4200);
      add(() => cycle(0), afterTyping + 5800);
    };

    cycle(200);
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="relative h-full w-full p-3 md:p-5 pb-0! overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
        backgroundSize: "12px 12px",
      }}
    >
      <div className="h-full rounded-2xl rounded-b-none flex flex-col overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_64px_rgba(0,0,0,0.55)] bg-[#1e1e1e]">
        {/* Title bar */}
        <div className="flex items-center gap-0 bg-[#323233] border-b border-white/6 shrink-0">
          <div className="flex gap-1.5 px-3 py-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          {["Hero.tsx", "Pricing.tsx", "globals.css"].map((tab, i) => (
            <div
              key={tab}
              className={`flex items-center gap-1.5 px-3 py-2 border-r border-white/6 text-[10px] font-mono shrink-0 ${
                i === 0
                  ? "bg-[#1e1e1e] text-white/90"
                  : "text-white/70 bg-transparent"
              }`}
            >
              {i === 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70 shrink-0" />
              )}
              {tab}
            </div>
          ))}
          <div className="ml-auto flex items-center gap-2 pr-3 opacity-70">
            <NextLogo size={16} />
            <TailwindLogo size={16} />
            <ReactLogo size={16} />
          </div>
        </div>

        {/* Editor body */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Sidebar */}
          <div className="w-28 bg-[#252526] border-r border-white/6 shrink-0 overflow-hidden py-2">
            <p className="text-[8px] font-semibold text-white/60 uppercase tracking-widest px-3 mb-2">
              Explorer
            </p>
            {FILE_TREE.map((f, i) => (
              <m.div
                key={i}
                animate={{
                  backgroundColor:
                    i === litFile ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.001)",
                  color:
                    i === litFile
                      ? "rgba(255,255,255,0.9)"
                      : f.active
                        ? "rgba(255,255,255,0.65)"
                        : "rgba(255,255,255,0.55)",
                }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-1 px-2 py-0.75 text-[9px] font-mono cursor-default"
                style={{ paddingLeft: `${8 + f.depth * 10}px` }}
              >
                {f.type === "dir" ? (
                  <svg
                    className="w-2.5 h-2.5 shrink-0 opacity-60"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M1.75 2h3.5l1.5 1.5h7.5A.75.75 0 0 1 15 4.25v8.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75v-10A.75.75 0 0 1 1.75 2Z" />
                  </svg>
                ) : (
                  <svg
                    className="w-2.5 h-2.5 shrink-0 opacity-50"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M2 1.75A.75.75 0 0 1 2.75 1h6.586a.75.75 0 0 1 .53.22l2.914 2.914a.75.75 0 0 1 .22.53V13.25a.75.75 0 0 1-.75.75H2.75a.75.75 0 0 1-.75-.75Zm1.5.75v11h9V5.5h-2a.75.75 0 0 1-.75-.75V2Z" />
                  </svg>
                )}
                <span className="truncate">{f.label}</span>
              </m.div>
            ))}
          </div>

          {/* Code pane */}
          <div className="flex-1 overflow-hidden relative">
            <div className="flex items-center gap-1 px-4 py-1.5 border-b border-white/5 bg-[#1e1e1e]">
              <span className="text-[9px] text-white/55 font-mono">src</span>
              <span className="text-[9px] text-white/50 font-mono">/</span>
              <span className="text-[9px] text-white/55 font-mono">
                components
              </span>
              <span className="text-[9px] text-white/50 font-mono">/</span>
              <span className="text-[9px] text-white/60 font-mono">
                Hero.tsx
              </span>
            </div>
            <div className="flex overflow-hidden h-full">
              <div className="select-none w-8 shrink-0 text-right pr-3 pt-2 text-[8.5px] font-mono leading-[1.7] text-white/50">
                {CODE_LINES.map((_, i) => (
                  <div key={i}>{i < lines ? i + 1 : ""}</div>
                ))}
              </div>
              <div className="flex-1 overflow-hidden pt-2 pr-2">
                {CODE_LINES.map((line, li) => (
                  <m.div
                    key={li}
                    initial={{ opacity: 0, x: -8 }}
                    animate={
                      li < lines ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }
                    }
                    transition={{ duration: 0.14, ease: "easeOut" }}
                    className="font-mono text-[8.5px] leading-[1.7] flex items-center min-h-3.5"
                  >
                    {line.length === 0
                      ? " "
                      : line.map((tok, ti) => (
                          <span
                            key={ti}
                            style={{ color: tok.t, whiteSpace: "pre" }}
                          >
                            {tok.c}
                          </span>
                        ))}
                    {li === lines - 1 && phase === "typing" && (
                      <span
                        className="inline-block w-[1.5px] h-2.5 ml-px align-middle"
                        style={{
                          backgroundColor: "#AEAFAD",
                          opacity: cursorOn ? 1 : 0,
                          transition: "opacity 0.05s",
                        }}
                      />
                    )}
                  </m.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <m.div
          animate={{
            backgroundColor:
              phase === "building"
                ? "#D97706"
                : phase === "preview" ||
                    phase === "exporting" ||
                    phase === "idle"
                  ? "#166534"
                  : "#0850B5",
          }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4 px-3 py-2 shrink-0"
        >
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 fill-white/70" viewBox="0 0 16 16">
              <path d="M8 .25a7.75 7.75 0 1 0 0 15.5A7.75 7.75 0 0 0 8 .25Zm1.75 10.75a.25.25 0 0 1-.25.25h-3a.25.25 0 0 1-.25-.25v-1.5a.25.25 0 0 1 .25-.25H7v-2.5h-.5a.25.25 0 0 1-.25-.25v-1.5A.25.25 0 0 1 6.5 5H8a.25.25 0 0 1 .25.25V9.5h.75a.25.25 0 0 1 .25.25v1.25Z" />
            </svg>
            <span className="text-[8px] text-white/70 font-mono">main</span>
          </div>
          <AnimatePresence mode="wait">
            <m.span
              key={phase}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-[8px] text-white/80 font-mono ml-auto"
            >
              {phase === "typing" && "TypeScript · Hero.tsx"}
              {phase === "building" && "⚡ Compiling…"}
              {(phase === "preview" || phase === "idle") &&
                "✓ Build successful · 847ms"}
              {phase === "exporting" && "✓ Exported · Next.js + Tailwind"}
            </m.span>
          </AnimatePresence>
          <div className="flex items-center gap-1 text-[8px] text-white/50 font-mono">
            <span>Ln {Math.min(lines, CODE_LINES.length)}</span>
            <span>·</span>
            <span>UTF-8</span>
          </div>
        </m.div>
      </div>

      {/* Floating live preview */}
      <AnimatePresence>
        {showPrev && (
          <m.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="absolute bottom-7 right-7 w-48 rounded-xl overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_20px_60px_rgba(0,0,0,0.35)] bg-white"
          >
            <div className="bg-zinc-50 p-3.5">
              <div className="flex items-center gap-1 mb-2">
                <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-sm" />
                </div>
                <span className="text-[8px] font-semibold text-zinc-500 font-mono">
                  Preview
                </span>
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              </div>
              <m.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-[11px] font-bold text-zinc-900 leading-tight mb-1">
                  Build Faster
                </div>
                <div className="text-[8px] text-zinc-400 leading-tight mb-2">
                  AI-powered websites in seconds.
                </div>
                <div className="inline-flex items-center gap-0.5 bg-blue-600 text-white text-[7px] font-semibold px-2 py-1 rounded-full">
                  Get Started
                  <svg
                    className="w-2 h-2"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.042-1.06l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06Z" />
                  </svg>
                </div>
              </m.div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border-t border-green-100">
              <svg
                className="w-2.5 h-2.5 text-green-600"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
              </svg>
              <span className="text-[8px] text-green-700 font-semibold">
                Live Preview
              </span>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* GitHub export notification */}
      <AnimatePresence>
        {showNotif && (
          <m.div
            initial={{ opacity: 0, x: 24, y: -4 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="absolute top-6 right-6 flex items-start gap-2.5 bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_16px_40px_rgba(0,0,0,0.2)] p-3 max-w-45"
          >
            <div className="w-7 h-7 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0">
              <GitHubLogo size={14} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-900 leading-tight">
                Pushed to GitHub
              </p>
              <p className="text-[8px] text-zinc-400 mt-0.5 leading-tight">
                Clean Next.js + Tailwind code
              </p>
              <div className="flex items-center gap-1 mt-1.5">
                <NextLogo size={9} />
                <TailwindLogo size={9} />
                <ReactLogo size={9} />
                <span className="text-[7px] text-zinc-400 ml-0.5 font-mono">
                  v1.0.0
                </span>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
