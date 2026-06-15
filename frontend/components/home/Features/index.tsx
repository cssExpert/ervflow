"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Inline SVG logos ──────────────────────────────────────── */
function NextLogo({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none">
      <mask id="n-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: "alpha" }}>
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#n-mask)">
        <circle cx="90" cy="90" r="90" fill="black" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
        <rect x="115" y="54" width="12" height="72" fill="white" />
      </g>
    </svg>
  );
}

function TailwindLogo({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 54 33" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8C16.2 7.2 19.35 5.85 22.95 6.75C25.004 7.263 26.472 8.754 28.097 10.403C30.744 13.09 33.808 16.2 40.5 16.2C47.7 16.2 52.2 12.6 54 5.4C51.3 9 48.15 10.35 44.55 9.45C42.496 8.937 41.028 7.446 39.403 5.797C36.756 3.11 33.692 0 27 0ZM13.5 16.2C6.3 16.2 1.8 19.8 0 27C2.7 23.4 5.85 22.05 9.45 22.95C11.504 23.464 12.972 24.954 14.597 26.603C17.244 29.29 20.308 32.4 27 32.4C34.2 32.4 38.7 28.8 40.5 21.6C37.8 25.2 34.65 26.55 31.05 25.65C28.996 25.137 27.528 23.646 25.903 21.997C23.256 19.31 20.192 16.2 13.5 16.2Z" fill="#38BDF8" />
    </svg>
  );
}

function ReactLogo({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 79.2 70.8" fill="none">
      <g fill="#61DAFB">
        <ellipse cx="39.6" cy="35.4" rx="7" ry="7" />
        <ellipse cx="39.6" cy="35.4" rx="38.6" ry="14.6" stroke="#61DAFB" strokeWidth="3.4" fill="none" />
        <ellipse cx="39.6" cy="35.4" rx="38.6" ry="14.6" stroke="#61DAFB" strokeWidth="3.4" fill="none" transform="rotate(60 39.6 35.4)" />
        <ellipse cx="39.6" cy="35.4" rx="38.6" ry="14.6" stroke="#61DAFB" strokeWidth="3.4" fill="none" transform="rotate(120 39.6 35.4)" />
      </g>
    </svg>
  );
}

function GitHubLogo({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* ─── VS Code–style syntax tokens ─────────────────────────── */
const KW  = "#569CD6"; // keywords
const FN  = "#DCDCAA"; // function / component names
const STR = "#CE9178"; // strings
const CMT = "#6A9955"; // comments
const TYP = "#4EC9B0"; // JSX tags / types
const ATR = "#9CDCFE"; // props / attributes
const DEF = "#D4D4D4"; // default text
const NUM = "#B5CEA8"; // numbers
const PNK = "#C586C0"; // control (use client / hooks)

type Token = { t: string; c: string };
type Line  = Token[];

const CODE_LINES: Line[] = [
  [{ t: PNK, c: '"use client"' }],
  [],
  [{ t: KW, c: "import " }, { t: DEF, c: "{ " }, { t: TYP, c: "motion" }, { t: DEF, c: " } " }, { t: KW, c: "from " }, { t: STR, c: "'framer-motion'" }],
  [{ t: KW, c: "import " }, { t: DEF, c: "{ " }, { t: TYP, c: "ArrowRight" }, { t: DEF, c: " } " }, { t: KW, c: "from " }, { t: STR, c: "'lucide-react'" }],
  [],
  [{ t: KW, c: "export default function " }, { t: FN, c: "Hero" }, { t: DEF, c: "() {" }],
  [{ t: DEF, c: "  " }, { t: KW, c: "return" }, { t: DEF, c: " (" }],
  [{ t: DEF, c: "    " }, { t: TYP, c: "<section" }, { t: ATR, c: " className" }, { t: DEF, c: '=' }, { t: STR, c: '"py-24 px-6"' }, { t: TYP, c: ">" }],
  [{ t: DEF, c: "      " }, { t: TYP, c: "<motion.h1" }],
  [{ t: DEF, c: "        " }, { t: ATR, c: "initial" }, { t: DEF, c: "={{ " }, { t: ATR, c: "opacity" }, { t: DEF, c: ": " }, { t: NUM, c: "0" }, { t: DEF, c: ", " }, { t: ATR, c: "y" }, { t: DEF, c: ": " }, { t: NUM, c: "20" }, { t: DEF, c: " }}" }],
  [{ t: DEF, c: "        " }, { t: ATR, c: "animate" }, { t: DEF, c: "={{ " }, { t: ATR, c: "opacity" }, { t: DEF, c: ": " }, { t: NUM, c: "1" }, { t: DEF, c: ", " }, { t: ATR, c: "y" }, { t: DEF, c: ": " }, { t: NUM, c: "0" }, { t: DEF, c: " }}" }],
  [{ t: DEF, c: "        " }, { t: ATR, c: "className" }, { t: DEF, c: "=" }, { t: STR, c: '"text-6xl font-bold"' }],
  [{ t: DEF, c: "      " }, { t: TYP, c: ">" }, { t: DEF, c: "Build Faster" }, { t: TYP, c: "</motion.h1>" }],
  [{ t: DEF, c: "      " }, { t: TYP, c: "<p" }, { t: ATR, c: " className" }, { t: DEF, c: "=" }, { t: STR, c: '"text-zinc-500 mt-4"' }, { t: TYP, c: ">" }],
  [{ t: DEF, c: "        " }, { t: DEF, c: "AI-powered websites in seconds." }],
  [{ t: DEF, c: "      " }, { t: TYP, c: "</p>" }],
  [{ t: DEF, c: "    " }, { t: TYP, c: "</section>" }],
  [{ t: DEF, c: "  )" }],
  [{ t: DEF, c: "}" }],
];

const FILE_TREE = [
  { label: "components/", type: "dir", depth: 0 },
  { label: "Hero.tsx",    type: "file", depth: 1, active: true },
  { label: "Pricing.tsx", type: "file", depth: 1 },
  { label: "Button.tsx",  type: "file", depth: 1 },
  { label: "app/",        type: "dir",  depth: 0 },
  { label: "page.tsx",    type: "file", depth: 1 },
  { label: "layout.tsx",  type: "file", depth: 1 },
  { label: "globals.css", type: "file", depth: 1 },
];

type EditorPhase = "typing" | "building" | "preview" | "exporting" | "idle";

/* ─── Main animated graphic ─────────────────────────────────── */
function BuildWithStackVisual() {
  const [phase,     setPhase]     = useState<EditorPhase>("typing");
  const [lines,     setLines]     = useState(0);
  const [cursorOn,  setCursorOn]  = useState(true);
  const [showPrev,  setShowPrev]  = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [litFile,   setLitFile]   = useState(0); // index of highlighted file

  /* cursor blink */
  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  /* main cycle */
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

      // type lines
      CODE_LINES.forEach((_, i) => {
        add(() => setLines(i + 1), delay + 300 + i * 155);
      });

      const afterTyping = delay + 300 + CODE_LINES.length * 155;

      // build phase
      add(() => setPhase("building"), afterTyping + 300);
      // file tree cycling
      FILE_TREE.forEach((_, i) => {
        add(() => setLitFile(i), afterTyping + 300 + i * 160);
      });

      // preview slides in
      add(() => { setPhase("preview"); setShowPrev(true); }, afterTyping + 1700);
      // github notif
      add(() => { setPhase("exporting"); setShowNotif(true); }, afterTyping + 2800);
      // idle pause then restart
      add(() => setPhase("idle"), afterTyping + 4200);
      add(() => cycle(0), afterTyping + 5800);
    };

    cycle(400);
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative h-full w-full p-3 md:p-4 overflow-hidden">

      {/* ── Editor shell ──────────────────────────────────── */}
      <div className="h-full rounded-2xl overflow-hidden flex flex-col shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_64px_rgba(0,0,0,0.55)] bg-[#1e1e1e]">

        {/* Title bar */}
        <div className="flex items-center gap-0 bg-[#323233] border-b border-white/[0.06] shrink-0">
          {/* Traffic lights */}
          <div className="flex gap-1.5 px-3 py-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>

          {/* Tabs */}
          {["Hero.tsx", "Pricing.tsx", "globals.css"].map((tab, i) => (
            <div
              key={tab}
              className={`flex items-center gap-1.5 px-3 py-2 border-r border-white/[0.06] text-[10px] font-mono shrink-0 ${
                i === 0
                  ? "bg-[#1e1e1e] text-white/90"
                  : "text-white/35 bg-transparent"
              }`}
            >
              {i === 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70 shrink-0" />
              )}
              {tab}
            </div>
          ))}

          {/* Stack logos */}
          <div className="ml-auto flex items-center gap-2 pr-3 opacity-70">
            <NextLogo size={12} />
            <TailwindLogo size={12} />
            <ReactLogo size={12} />
          </div>
        </div>

        {/* Editor body */}
        <div className="flex flex-1 min-h-0 overflow-hidden">

          {/* Sidebar */}
          <div className="w-28 bg-[#252526] border-r border-white/[0.06] shrink-0 overflow-hidden py-2">
            <p className="text-[8px] font-semibold text-white/25 uppercase tracking-widest px-3 mb-2">Explorer</p>
            {FILE_TREE.map((f, i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: i === litFile ? "rgba(255,255,255,0.07)" : "transparent",
                  color: i === litFile ? "rgba(255,255,255,0.9)" : f.active ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.3)",
                }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-1 px-2 py-[3px] text-[9px] font-mono cursor-default"
                style={{ paddingLeft: `${8 + f.depth * 10}px` }}
              >
                {f.type === "dir" ? (
                  <svg className="w-2.5 h-2.5 shrink-0 opacity-60" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M1.75 2h3.5l1.5 1.5h7.5A.75.75 0 0 1 15 4.25v8.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75v-10A.75.75 0 0 1 1.75 2Z" />
                  </svg>
                ) : (
                  <svg className="w-2.5 h-2.5 shrink-0 opacity-50" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M2 1.75A.75.75 0 0 1 2.75 1h6.586a.75.75 0 0 1 .53.22l2.914 2.914a.75.75 0 0 1 .22.53V13.25a.75.75 0 0 1-.75.75H2.75a.75.75 0 0 1-.75-.75Zm1.5.75v11h9V5.5h-2a.75.75 0 0 1-.75-.75V2Z" />
                  </svg>
                )}
                <span className="truncate">{f.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Code pane */}
          <div className="flex-1 overflow-hidden relative">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1 px-4 py-1.5 border-b border-white/[0.05] bg-[#1e1e1e]">
              <span className="text-[9px] text-white/25 font-mono">src</span>
              <span className="text-[9px] text-white/20 font-mono">/</span>
              <span className="text-[9px] text-white/25 font-mono">components</span>
              <span className="text-[9px] text-white/20 font-mono">/</span>
              <span className="text-[9px] text-white/60 font-mono">Hero.tsx</span>
            </div>

            {/* Lines */}
            <div className="flex overflow-hidden h-full">
              {/* Line numbers */}
              <div className="select-none w-8 shrink-0 text-right pr-3 pt-2 text-[8.5px] font-mono leading-[1.7] text-white/20">
                {CODE_LINES.map((_, i) => (
                  <div key={i}>{i < lines ? i + 1 : ""}</div>
                ))}
              </div>
              {/* Code content */}
              <div className="flex-1 overflow-hidden pt-2 pr-2">
                {CODE_LINES.map((line, li) => (
                  <motion.div
                    key={li}
                    initial={{ opacity: 0, x: -8 }}
                    animate={li < lines ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                    transition={{ duration: 0.14, ease: "easeOut" }}
                    className="font-mono text-[8.5px] leading-[1.7] flex items-center min-h-[14px]"
                  >
                    {line.length === 0 ? " " : line.map((tok, ti) => (
                      <span key={ti} style={{ color: tok.t, whiteSpace: "pre" }}>{tok.c}</span>
                    ))}
                    {/* blinking cursor on last revealed line */}
                    {li === lines - 1 && phase === "typing" && (
                      <span
                        className="inline-block w-[1.5px] h-[10px] ml-px align-middle"
                        style={{ backgroundColor: "#AEAFAD", opacity: cursorOn ? 1 : 0, transition: "opacity 0.05s" }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <motion.div
          animate={{
            backgroundColor: phase === "building" ? "#D97706" : phase === "preview" || phase === "exporting" || phase === "idle" ? "#166534" : "#007ACC",
          }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4 px-3 py-1 shrink-0"
        >
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 fill-white/70" viewBox="0 0 16 16">
              <path d="M8 .25a7.75 7.75 0 1 0 0 15.5A7.75 7.75 0 0 0 8 .25Zm1.75 10.75a.25.25 0 0 1-.25.25h-3a.25.25 0 0 1-.25-.25v-1.5a.25.25 0 0 1 .25-.25H7v-2.5h-.5a.25.25 0 0 1-.25-.25v-1.5A.25.25 0 0 1 6.5 5H8a.25.25 0 0 1 .25.25V9.5h.75a.25.25 0 0 1 .25.25v1.25Z" />
            </svg>
            <span className="text-[8px] text-white/70 font-mono">main</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={phase}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-[8px] text-white/80 font-mono ml-auto"
            >
              {phase === "typing"   && "TypeScript · Hero.tsx"}
              {phase === "building" && "⚡ Compiling…"}
              {(phase === "preview" || phase === "idle") && "✓ Build successful · 847ms"}
              {phase === "exporting" && "✓ Exported · Next.js + Tailwind"}
            </motion.span>
          </AnimatePresence>
          <div className="flex items-center gap-1 text-[8px] text-white/50 font-mono">
            <span>Ln {Math.min(lines, CODE_LINES.length)}</span>
            <span>·</span>
            <span>UTF‑8</span>
          </div>
        </motion.div>
      </div>

      {/* ── Floating live preview card ─────────────────────── */}
      <AnimatePresence>
        {showPrev && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="absolute bottom-7 right-7 w-48 rounded-xl overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_20px_60px_rgba(0,0,0,0.35)] bg-white"
          >
            {/* Mini hero render */}
            <div className="bg-zinc-50 p-3.5">
              <div className="flex items-center gap-1 mb-2">
                <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-sm" />
                </div>
                <span className="text-[8px] font-semibold text-zinc-500 font-mono">Preview</span>
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="text-[11px] font-bold text-zinc-900 leading-tight mb-1">Build Faster</div>
                <div className="text-[8px] text-zinc-400 leading-tight mb-2">AI-powered websites in seconds.</div>
                <div className="inline-flex items-center gap-0.5 bg-blue-600 text-white text-[7px] font-semibold px-2 py-1 rounded-full">
                  Get Started
                  <svg className="w-2 h-2" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.042-1.06l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06Z" />
                  </svg>
                </div>
              </motion.div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border-t border-green-100">
              <svg className="w-2.5 h-2.5 text-green-600" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
              </svg>
              <span className="text-[8px] text-green-700 font-semibold">Live Preview</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── GitHub export notification ─────────────────────── */}
      <AnimatePresence>
        {showNotif && (
          <motion.div
            initial={{ opacity: 0, x: 24, y: -4 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="absolute top-6 right-6 flex items-start gap-2.5 bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_16px_40px_rgba(0,0,0,0.2)] p-3 max-w-[180px]"
          >
            <div className="w-7 h-7 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0">
              <GitHubLogo size={14} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-900 leading-tight">Pushed to GitHub</p>
              <p className="text-[8px] text-zinc-400 mt-0.5 leading-tight">Clean Next.js + Tailwind code</p>
              <div className="flex items-center gap-1 mt-1.5">
                <NextLogo size={9} />
                <TailwindLogo size={9} />
                <ReactLogo size={9} />
                <span className="text-[7px] text-zinc-400 ml-0.5 font-mono">v1.0.0</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Generate with AI visual ───────────────────────────────── */
const AI_PROMPT = "Create a website for a dental clinic in Texas.";

const AI_STEPS = [
  { id: "typing",   label: "Prompt" },
  { id: "thinking", label: "Thinking" },
  { id: "sitemap",  label: "Sitemap" },
  { id: "preview",  label: "Preview" },
];

const AI_PAGES = [
  { label: "Home",     letter: "H", sections: 4, color: "#22c55e" },
  { label: "About",    letter: "A", sections: 3, color: "#3b82f6" },
  { label: "Services", letter: "S", sections: 5, color: "#8b5cf6" },
  { label: "Contact",  letter: "C", sections: 2, color: "#f59e0b" },
  { label: "Blog",     letter: "B", sections: 6, color: "#ec4899" },
];

const AI_TAGS = ["dental", "clinic", "Texas", "medical", "local SEO"];

type AIPhase = "typing" | "thinking" | "sitemap" | "preview" | "idle";

function GenerateWithAIVisual() {
  const [phase,        setPhase]        = useState<AIPhase>("typing");
  const [typedChars,   setTypedChars]   = useState(0);
  const [visiblePages, setVisiblePages] = useState(0);
  const [visibleCards, setVisibleCards] = useState(0);
  const [showBadge,    setShowBadge]    = useState(false);
  const [cursorOn,     setCursorOn]     = useState(true);

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
        setTypedChars(0);
        setVisiblePages(0);
        setVisibleCards(0);
        setShowBadge(false);
      }, delay);

      for (let i = 0; i <= AI_PROMPT.length; i++) {
        add(() => setTypedChars(i), delay + 300 + i * 48);
      }
      const afterTyping = delay + 300 + AI_PROMPT.length * 48;

      add(() => setPhase("thinking"), afterTyping + 350);
      add(() => setPhase("sitemap"),  afterTyping + 2100);

      AI_PAGES.forEach((_, i) => {
        add(() => setVisiblePages(i + 1), afterTyping + 2100 + i * 320);
      });

      add(() => setPhase("preview"), afterTyping + 3800);
      [1, 2, 3].forEach((n) => {
        add(() => setVisibleCards(n), afterTyping + 3800 + n * 420);
      });
      add(() => setShowBadge(true), afterTyping + 5100);

      add(() => setPhase("idle"),  afterTyping + 6200);
      add(() => cycle(0),          afterTyping + 8000);
    };

    cycle(400);
    return () => ts.forEach(clearTimeout);
  }, []);

  const stepIndex = AI_STEPS.findIndex((s) => s.id === phase);
  const isAfterSitemap = phase === "preview" || phase === "idle";

  return (
    <div className="relative h-full w-full p-3 md:p-4 overflow-hidden">
      {/* ── Main AI Studio shell ─────────────────────────── */}
      <div className="h-full rounded-2xl flex flex-col overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_64px_rgba(0,0,0,0.55)] bg-[#0d1117]">

        {/* Title bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.07] bg-[#161b22] shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex items-center gap-1.5 ml-1">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-violet-400"
            />
            <span className="text-[10px] font-semibold text-white/60 font-mono">ERVFlow AI Studio</span>
          </div>
          <span className="ml-auto text-[9px] text-white/25 font-mono">claude‑3.5‑sonnet</span>
        </div>

        {/* Step progress */}
        <div className="flex items-center gap-0 px-4 py-2 border-b border-white/[0.05] bg-[#0d1117] shrink-0">
          {AI_STEPS.map((step, i) => {
            const done   = i < stepIndex || phase === "idle";
            const active = i === stepIndex && phase !== "idle";
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center gap-1">
                  <motion.div
                    animate={{
                      backgroundColor: done ? "#22c55e" : active ? "#7c3aed" : "rgba(255,255,255,0.08)",
                      scale: active ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {done ? (
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                      </svg>
                    ) : (
                      <span className="text-[7px] font-bold text-white/60">{i + 1}</span>
                    )}
                  </motion.div>
                  <span className={`text-[8px] font-mono ${active ? "text-violet-400" : done ? "text-green-400" : "text-white/25"}`}>
                    {step.label}
                  </span>
                </div>
                {i < AI_STEPS.length - 1 && (
                  <motion.div
                    animate={{ backgroundColor: done ? "#22c55e" : "rgba(255,255,255,0.08)" }}
                    transition={{ duration: 0.4 }}
                    className="w-5 h-[1.5px] mx-1.5 rounded-full"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-hidden flex flex-col gap-3 p-3 md:p-4 min-h-0">

          {/* User bubble */}
          <div className="flex gap-2 items-start">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[8px] font-bold text-white">U</span>
            </div>
            <div className="flex-1 bg-[#21262d] rounded-xl rounded-tl-sm px-3 py-2 border border-white/[0.06]">
              <p className="text-[10px] font-mono text-white/80 leading-relaxed">
                {AI_PROMPT.slice(0, typedChars)}
                {phase === "typing" && (
                  <span
                    className="inline-block w-[1.5px] h-[10px] ml-0.5 align-middle bg-amber-400"
                    style={{ opacity: cursorOn ? 1 : 0, transition: "opacity 0.05s" }}
                  />
                )}
              </p>
            </div>
          </div>

          {/* AI bubble */}
          <AnimatePresence>
            {phase !== "typing" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex gap-2 items-start"
              >
                {/* AI avatar */}
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm1 12H11v-7h2v7Z" />
                  </svg>
                </div>

                <div className="flex-1 bg-[#21262d] rounded-xl rounded-tl-sm px-3 py-2.5 border border-white/[0.06] overflow-hidden">

                  {/* THINKING */}
                  {phase === "thinking" && (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18 }}
                            className="w-1.5 h-1.5 rounded-full bg-violet-400"
                          />
                        ))}
                        <span className="text-[9px] text-white/35 font-mono">Analyzing your request…</span>
                      </div>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.6, ease: "easeInOut" }}
                        style={{ transformOrigin: "left" }}
                        className="h-[2px] w-full bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 rounded-full"
                      />
                      <div className="flex gap-1 flex-wrap mt-0.5">
                        {AI_TAGS.map((tag, i) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.75 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.14, type: "spring", stiffness: 300 }}
                            className="text-[8px] px-1.5 py-0.5 rounded-full bg-violet-500/15 text-violet-300 font-mono border border-violet-500/25"
                          >
                            #{tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SITEMAP + PREVIEW */}
                  {(phase === "sitemap" || isAfterSitemap) && (
                    <div className="flex flex-col gap-2">
                      <p className="text-[8.5px] text-white/40 font-mono">
                        Generated sitemap —{" "}
                        <span className="text-green-400">{Math.min(visiblePages, AI_PAGES.length)} of {AI_PAGES.length} pages</span>
                      </p>

                      {/* Page nodes grid */}
                      <div className="grid grid-cols-5 gap-1.5">
                        {AI_PAGES.map((page, i) => (
                          <AnimatePresence key={page.label}>
                            {i < visiblePages && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.7, y: 8 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                                className="flex flex-col items-center gap-1 rounded-lg p-1.5 border border-white/[0.07] bg-white/[0.03]"
                              >
                                <div
                                  className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                                  style={{ backgroundColor: page.color + "35", color: page.color }}
                                >
                                  {page.letter}
                                </div>
                                <span className="text-[7px] text-white/55 font-mono text-center leading-tight">{page.label}</span>
                                <span className="text-[6px] text-white/20 font-mono">{page.sections}s</span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        ))}
                      </div>

                      {/* Sub-services row */}
                      {visiblePages >= 3 && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-1 pl-1"
                        >
                          <span className="text-[8px] text-white/20 font-mono shrink-0">└─</span>
                          {["Cleaning", "Whitening", "Implants"].map((s, i) => (
                            <motion.span
                              key={s}
                              initial={{ opacity: 0, x: -4 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 + 0.1 }}
                              className="text-[7.5px] font-mono px-1.5 py-0.5 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/20"
                            >
                              {s}
                            </motion.span>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Page preview strip ─────────────────────────── */}
        <AnimatePresence>
          {(phase === "preview" || phase === "idle") && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="px-3 md:px-4 pb-3 md:pb-4 shrink-0"
            >
              <p className="text-[8px] text-white/30 font-mono mb-2">Page previews</p>
              <div className="flex gap-2">
                {[
                  { title: "Home",     color: "#22c55e", rows: [70, 50, 85, 60] },
                  { title: "Services", color: "#8b5cf6", rows: [70, 40, 40, 40] },
                  { title: "Contact",  color: "#f59e0b", rows: [70, 60, 60, 45] },
                ].map((card, i) => (
                  <AnimatePresence key={card.title}>
                    {i < visibleCards && (
                      <motion.div
                        initial={{ opacity: 0, y: 14, scale: 0.88 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="flex-1 rounded-lg overflow-hidden border border-white/[0.07] bg-[#161b22] shadow-lg"
                      >
                        {/* Mini nav bar */}
                        <div
                          className="flex items-center gap-0.5 px-1.5 py-1"
                          style={{ backgroundColor: card.color + "22", borderBottom: `1px solid ${card.color}25` }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: card.color }} />
                          <span className="text-[6.5px] font-mono ml-0.5" style={{ color: card.color }}>{card.title}</span>
                          <div className="ml-auto flex gap-0.5">
                            {[0, 1, 2].map((d) => (
                              <div key={d} className="w-3 h-0.5 rounded-full bg-white/10" />
                            ))}
                          </div>
                        </div>
                        {/* Mini content blocks */}
                        <div className="p-1.5 flex flex-col gap-1">
                          {/* Hero block */}
                          <div className="rounded-sm p-1.5" style={{ backgroundColor: card.color + "12" }}>
                            <div className="h-1.5 rounded-sm mb-1 w-4/5" style={{ backgroundColor: card.color + "60" }} />
                            <div className="h-1 rounded-sm w-3/5 bg-white/10" />
                            <div
                              className="mt-1.5 h-2.5 w-10 rounded-sm"
                              style={{ backgroundColor: card.color + "80" }}
                            />
                          </div>
                          {/* Content rows */}
                          {i === 1 ? (
                            <div className="grid grid-cols-3 gap-0.5">
                              {[0, 1, 2].map((b) => (
                                <div key={b} className="bg-white/[0.04] rounded-sm p-1">
                                  <div className="w-2 h-2 rounded-sm mx-auto mb-0.5" style={{ backgroundColor: card.color + "40" }} />
                                  <div className="h-0.5 rounded-sm bg-white/10 w-full" />
                                </div>
                              ))}
                            </div>
                          ) : i === 2 ? (
                            <div className="flex flex-col gap-0.5">
                              {[0, 1, 2].map((b) => (
                                <div key={b} className="h-2 rounded-sm bg-white/[0.05] border border-white/[0.06]" />
                              ))}
                              <div className="h-2.5 rounded-sm w-2/3 mt-0.5" style={{ backgroundColor: card.color + "60" }} />
                            </div>
                          ) : (
                            <div className="flex gap-0.5">
                              {[0, 1, 2].map((b) => (
                                <div key={b} className="flex-1 bg-white/[0.04] rounded-sm p-1">
                                  <div className="h-1.5 rounded-sm mb-0.5" style={{ backgroundColor: card.color + "30" }} />
                                  <div className="h-0.5 rounded-sm bg-white/10" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── "5 pages ready" floating badge ───────────────── */}
      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 16 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="absolute top-6 right-6 flex items-center gap-2 bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_12px_36px_rgba(0,0,0,0.18)] px-3 py-2"
          >
            <div className="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-900 leading-tight">5 pages generated</p>
              <p className="text-[8px] text-zinc-400 leading-tight">Ready to customize</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Customize visual ──────────────────────────────────────── */
const BLOCKS = [
  { label: "Hero",    color: "#6366f1" },
  { label: "Text",    color: "#22c55e" },
  { label: "Image",   color: "#f59e0b" },
  { label: "Button",  color: "#3b82f6" },
  { label: "Card",    color: "#ec4899" }, // index 4 — gets dragged
  { label: "Form",    color: "#8b5cf6" },
];

const STYLE_ROWS = [
  { label: "Width",    a: "100%",   b: "90%"   },
  { label: "Padding",  a: "16px",   b: "24px"  },
  { label: "Radius",   a: "8px",    b: "16px"  },
  { label: "Color",    a: "#6366f1", b: "#ec4899" },
  { label: "Shadow",   a: "none",   b: "2xl"   },
];

type VPhase = "hover" | "dragging" | "dropped" | "styling" | "responsive";

function CustomizeVisual() {
  const [phase,        setPhase]        = useState<VPhase>("hover");
  const [hovered,      setHovered]      = useState(4);
  const [cardOnCanvas, setCardOnCanvas] = useState(false);
  const [showHandles,  setShowHandles]  = useState(false);
  const [activeRow,    setActiveRow]    = useState(-1);
  const [rowUpdated,   setRowUpdated]   = useState(false);
  const [viewport,     setViewport]     = useState<"desktop" | "tablet" | "mobile">("desktop");

  useEffect(() => {
    const ts: ReturnType<typeof setTimeout>[] = [];
    const add = (fn: () => void, ms: number) => ts.push(setTimeout(fn, ms));

    const cycle = (delay = 0) => {
      add(() => {
        setPhase("hover");
        setHovered(4);
        setCardOnCanvas(false);
        setShowHandles(false);
        setActiveRow(-1);
        setRowUpdated(false);
        setViewport("desktop");
      }, delay);

      // hover lingers, then drag starts
      add(() => setPhase("dragging"), delay + 1100);

      // card lands on canvas
      add(() => { setPhase("dropped"); setCardOnCanvas(true); }, delay + 2100);
      add(() => setShowHandles(true), delay + 2450);

      // style panel animations
      add(() => { setPhase("styling"); setActiveRow(0); }, delay + 3300);
      STYLE_ROWS.forEach((_, i) => {
        add(() => { setActiveRow(i); setRowUpdated(false); }, delay + 3300 + i * 700);
        add(() => setRowUpdated(true),                        delay + 3300 + i * 700 + 340);
      });

      // responsive toggle cycle
      add(() => { setPhase("responsive"); setShowHandles(false); },   delay + 7100);
      add(() => setViewport("tablet"),                                  delay + 7600);
      add(() => setViewport("mobile"),                                  delay + 8500);
      add(() => setViewport("desktop"),                                 delay + 9400);

      // restart
      add(() => cycle(0), delay + 10800);
    };

    cycle(400);
    return () => ts.forEach(clearTimeout);
  }, []);

  const canvasW = viewport === "mobile" ? "44%" : viewport === "tablet" ? "70%" : "100%";
  const isDragging = phase === "dragging";

  return (
    <div className="relative h-full w-full p-3 md:p-4 overflow-hidden">
      <div className="h-full rounded-2xl flex flex-col overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_64px_rgba(0,0,0,0.55)] bg-[#12121e]">

        {/* ── Title bar ─────────────────────────────────────── */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a2e] border-b border-white/[0.06] shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[10px] font-semibold text-white/45 font-mono ml-1">Visual Editor</span>

          {/* Responsive toggle */}
          <div className="ml-auto flex items-center bg-white/[0.06] rounded-lg p-0.5 gap-0.5">
            {(["desktop", "tablet", "mobile"] as const).map((v) => (
              <motion.div
                key={v}
                animate={{ backgroundColor: viewport === v ? "rgba(255,255,255,0.14)" : "transparent" }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center w-6 h-5 rounded-md cursor-pointer"
                title={v}
              >
                {v === "desktop" && (
                  <svg className="w-3 h-3 text-white/55" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M0 3.75A1.75 1.75 0 0 1 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 14.25 13H8.5v1.5h2a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1 0-1.5h2V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
                  </svg>
                )}
                {v === "tablet" && (
                  <svg className="w-2.5 h-3 text-white/55" viewBox="0 0 12 16" fill="currentColor">
                    <path d="M2 0C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2H2Zm0 1.5h8a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5ZM6 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
                  </svg>
                )}
                {v === "mobile" && (
                  <svg className="w-2 h-3 text-white/55" viewBox="0 0 10 16" fill="currentColor">
                    <path d="M2 0C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2H2Zm0 1.5h6a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V2A.5.5 0 0 1 2 1.5ZM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Editor body ────────────────────────────────────── */}
        <div className="flex flex-1 min-h-0 overflow-hidden">

          {/* Blocks sidebar */}
          <div className="w-[84px] bg-[#0c0c1a] border-r border-white/[0.06] shrink-0 py-2 overflow-hidden">
            <p className="text-[7px] font-semibold text-white/20 uppercase tracking-widest px-2.5 mb-1.5">Blocks</p>
            {BLOCKS.map((blk, i) => {
              const isActive = i === hovered && (phase === "hover" || phase === "dragging");
              return (
                <motion.div
                  key={blk.label}
                  animate={{ backgroundColor: isActive ? "rgba(255,255,255,0.07)" : "transparent" }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5 px-2 py-[5px]"
                >
                  <motion.div
                    animate={isActive && phase === "hover" ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 0.6, repeat: isActive && phase === "hover" ? Infinity : 0, repeatDelay: 0.4 }}
                    className="w-4 h-4 rounded-[4px] flex items-center justify-center text-[8px] font-bold shrink-0"
                    style={{ backgroundColor: blk.color + "28", color: blk.color }}
                  >
                    {blk.label[0]}
                  </motion.div>
                  <span
                    className="text-[8.5px] font-mono truncate"
                    style={{ color: isActive ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)" }}
                  >
                    {blk.label}
                  </span>
                  {/* Drag grip icon on active */}
                  {isActive && phase === "hover" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-auto flex flex-col gap-[2px] shrink-0"
                    >
                      {[0,1,2].map((d) => (
                        <div key={d} className="w-2.5 h-[1.5px] rounded-full bg-white/20" />
                      ))}
                    </motion.div>
                  )}
                  {/* "Lifting" animation during drag */}
                  {isActive && phase === "dragging" && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-[#0f0f1e] overflow-hidden relative flex items-start justify-center p-2">
            {/* Viewport container — shrinks for tablet/mobile */}
            <motion.div
              animate={{ width: canvasW }}
              transition={{ type: "spring", stiffness: 180, damping: 26 }}
              className="rounded-lg border border-white/[0.07] bg-[#1a1a2e] overflow-hidden"
              style={{ minHeight: "calc(100% - 0px)" }}
            >
              <div className="flex flex-col gap-1.5 p-2">

                {/* Nav */}
                <div className="h-5 rounded-md bg-white/[0.05] border border-white/[0.06] flex items-center px-2 gap-1 shrink-0">
                  <div className="w-2 h-2 rounded-sm bg-violet-400/60" />
                  <div className="h-[3px] w-8 rounded-full bg-white/15 ml-0.5" />
                  <div className="ml-auto flex gap-1">
                    {[0,1,2].map((d) => <div key={d} className="h-[3px] w-5 rounded-full bg-white/10" />)}
                  </div>
                </div>

                {/* Hero block */}
                <div className="h-12 rounded-md bg-white/[0.04] border border-white/[0.05] flex flex-col justify-center px-3 gap-1 shrink-0">
                  <div className="h-1.5 w-3/4 rounded-full bg-white/15" />
                  <div className="h-1 w-1/2 rounded-full bg-white/8" />
                  <div className="h-2.5 w-11 rounded-full bg-violet-500/40 mt-0.5" />
                </div>

                {/* Drag placeholder / dropped card */}
                <div className="relative">
                  {/* Drop-zone outline shown while dragging */}
                  <AnimatePresence>
                    {isDragging && !cardOnCanvas && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-16 rounded-md border-2 border-dashed border-blue-500/60 flex items-center justify-center"
                      >
                        <span className="text-[8px] text-blue-400/70 font-mono">Drop here</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Settled card with selection + handles */}
                  <AnimatePresence>
                    {cardOnCanvas && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 320, damping: 22 }}
                        className="relative"
                      >
                        {/* Selection outline */}
                        <div className="absolute inset-0 rounded-md border-2 border-blue-500 pointer-events-none z-10" />

                        {/* Corner handles */}
                        <AnimatePresence>
                          {showHandles && (
                            <>
                              {[
                                "-top-[3px] -left-[3px] cursor-nw-resize",
                                "-top-[3px] -right-[3px] cursor-ne-resize",
                                "-bottom-[3px] -left-[3px] cursor-sw-resize",
                                "-bottom-[3px] -right-[3px] cursor-se-resize",
                              ].map((cls, i) => (
                                <motion.div
                                  key={cls}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.05, type: "spring", stiffness: 500 }}
                                  className={`absolute w-[7px] h-[7px] bg-white border-[1.5px] border-blue-500 rounded-[2px] z-20 ${cls}`}
                                />
                              ))}
                              {/* Edge midpoint handles */}
                              {[
                                "top-1/2 -left-[3px] -translate-y-1/2 cursor-w-resize",
                                "top-1/2 -right-[3px] -translate-y-1/2 cursor-e-resize",
                                "-top-[3px] left-1/2 -translate-x-1/2 cursor-n-resize",
                                "-bottom-[3px] left-1/2 -translate-x-1/2 cursor-s-resize",
                              ].map((cls, i) => (
                                <motion.div
                                  key={cls}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.2 + i * 0.04, type: "spring", stiffness: 500 }}
                                  className={`absolute w-[7px] h-[5px] bg-white border-[1.5px] border-blue-500 rounded-[2px] z-20 ${cls}`}
                                />
                              ))}
                            </>
                          )}
                        </AnimatePresence>

                        {/* Card body */}
                        <motion.div
                          animate={{
                            borderColor: phase === "styling" && rowUpdated
                              ? "rgba(236,72,153,0.5)"
                              : "rgba(255,255,255,0.08)",
                          }}
                          className="h-16 rounded-md border bg-white/[0.04] flex flex-col justify-center px-3 gap-1.5"
                        >
                          <motion.div
                            animate={{
                              backgroundColor: phase === "styling" && activeRow >= 3 && rowUpdated
                                ? "rgba(236,72,153,0.25)"
                                : "rgba(255,255,255,0.15)",
                            }}
                            className="h-1.5 w-2/3 rounded-full"
                          />
                          <div className="h-1 w-full rounded-full bg-white/8" />
                          <div className="h-1 w-3/4 rounded-full bg-white/8" />
                          <div className="flex gap-1 mt-0.5">
                            <motion.div
                              animate={{
                                backgroundColor: phase === "styling" && activeRow >= 3 && rowUpdated
                                  ? "rgba(236,72,153,0.6)"
                                  : "rgba(99,102,241,0.5)",
                              }}
                              className="h-2.5 w-11 rounded-full"
                            />
                            <div className="h-2.5 w-8 rounded-full bg-white/8" />
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Drag ghost — flies from sidebar into canvas */}
            <AnimatePresence>
              {isDragging && (
                <motion.div
                  initial={{ opacity: 0, x: -70, y: 56, rotate: -3, scale: 0.88 }}
                  animate={{ opacity: 0.92, x: 6, y: 72, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-0 left-0 pointer-events-none z-50"
                  style={{ width: "calc(100% - 16px)", paddingLeft: 8, paddingRight: 8 }}
                >
                  <div className="h-16 rounded-md border-2 border-blue-500 bg-[#1a1a2e] shadow-[0_0_24px_rgba(59,130,246,0.45)] flex flex-col justify-center px-3 gap-1.5">
                    <div className="h-1.5 w-2/3 rounded-full bg-white/20" />
                    <div className="h-1 w-full rounded-full bg-white/10" />
                    <div className="h-1 w-3/4 rounded-full bg-white/10" />
                    <div className="flex gap-1 mt-0.5">
                      <div className="h-2.5 w-11 rounded-full bg-violet-500/50" />
                      <div className="h-2.5 w-8 rounded-full bg-white/10" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Style panel */}
          <div className="w-[100px] bg-[#0c0c1a] border-l border-white/[0.06] shrink-0 py-2 overflow-hidden">
            <p className="text-[7px] font-semibold text-white/20 uppercase tracking-widest px-2.5 mb-1.5">Style</p>
            {STYLE_ROWS.map((row, i) => {
              const isActive = phase === "styling" && activeRow === i;
              const isDone   = phase === "styling" && activeRow > i;
              const showB    = (isActive && rowUpdated) || isDone;
              return (
                <motion.div
                  key={row.label}
                  animate={{ backgroundColor: isActive ? "rgba(255,255,255,0.05)" : "transparent" }}
                  className="px-2.5 py-[5px]"
                >
                  <p className="text-[7px] text-white/25 font-mono mb-0.5">{row.label}</p>
                  <div className="flex items-center gap-1">
                    {row.label === "Color" ? (
                      <>
                        <motion.div
                          animate={{ backgroundColor: showB ? row.b : row.a }}
                          transition={{ duration: 0.35 }}
                          className="w-3 h-3 rounded-[3px] shrink-0"
                        />
                        <motion.span
                          animate={{ color: isActive ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)" }}
                          className="text-[7.5px] font-mono truncate"
                        >
                          {showB ? row.b : row.a}
                        </motion.span>
                      </>
                    ) : (
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={showB ? "b" : "a"}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.18 }}
                          className="text-[8px] font-mono"
                          style={{ color: isActive ? "#a78bfa" : "rgba(167,139,250,0.5)" }}
                        >
                          {showB ? row.b : row.a}
                        </motion.span>
                      </AnimatePresence>
                    )}
                  </div>
                  {/* Active progress line */}
                  {isActive && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.65, ease: "easeInOut" }}
                      style={{ transformOrigin: "left" }}
                      className="h-[1.5px] w-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full mt-1"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Status bar ──────────────────────────────────────── */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0c0c1a] border-t border-white/[0.06] shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 text-[8px] font-mono"
            >
              <div className={`w-1.5 h-1.5 rounded-full ${
                phase === "dropped" || phase === "styling" ? "bg-blue-400" :
                phase === "responsive" ? "bg-violet-400" : "bg-white/20"
              }`} />
              <span className="text-white/45">
                {phase === "hover"      && "Hover to drag a block"}
                {phase === "dragging"   && "Dragging Card…"}
                {phase === "dropped"    && "Card selected"}
                {phase === "styling"    && `Editing · ${STYLE_ROWS[Math.max(activeRow, 0)].label}`}
                {phase === "responsive" && `Preview · ${viewport}`}
              </span>
            </motion.div>
          </AnimatePresence>
          <div className="ml-auto flex items-center gap-1 text-[8px] font-mono text-white/25">
            {viewport !== "desktop" && (
              <span className="text-violet-400">{viewport === "tablet" ? "768px" : "375px"}</span>
            )}
            <span>{viewport === "desktop" ? "1440px" : ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Features section ───────────────────────────────────────── */
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
            className="inline-flex items-center border-[1.5px] border-white text-black bg-white hover:border-primary-600 hover:text-white hover:bg-primary-500 px-6 min-h-11 rounded-full text-sm font-semibold transition-all shadow-md"
          >
            Explore Integrations
          </Link>
        </div>
      ),
      customVisual: "stack",
    },
    {
      color: "#FFD104",
      badge: "AI BUILDER",
      title: "Generate with AI",
      titleColor: "text-black",
      desc: (
        <div>
          <p className="text-black mb-4">
            Turn simple prompts into layouts, pages, and reusable components in seconds.
          </p>
          <ul className="list-disc pl-10 space-y-1 text-black mb-5">
            <li>Smart Prompts</li>
            <li>Auto Layouts</li>
            <li>Reusable Blocks</li>
          </ul>
          <Link
            href="/"
            className="inline-flex items-center border-[1.5px] border-black text-white bg-black hover:border-primary-600 hover:text-white hover:bg-primary px-6 min-h-11 rounded-full text-sm font-semibold transition-all shadow-md"
          >
            Try AI Builder
          </Link>
        </div>
      ),
      customVisual: "generate",
    },
    {
      color: "#7558D4",
      badge: "VISUAL EDITOR",
      title: "Customize Without Limits",
      titleColor: "#FFFFFF",
      desc: (
        <div>
          <p className="mb-4">
            Adjust layouts, typography, spacing, and interactions with real-time visual editing.
          </p>
          <ul className="list-disc pl-10 space-y-1 mb-5">
            <li>Drag & Drop</li>
            <li>Responsive Preview</li>
            <li>Visual + Code</li>
          </ul>
          <Link
            href="/"
            className="inline-flex items-center border-[1.5px] border-white text-black bg-white hover:border-primary-600 hover:text-white hover:bg-primary-500 px-6 min-h-11 rounded-full text-sm font-semibold transition-all shadow-md"
          >
            Open Editor
          </Link>
        </div>
      ),
      customVisual: "customize",
    },
    {
      color: "#C94D1F",
      badge: "EXPORT + PUBLISH",
      title: "Launch Anywhere",
      titleColor: "#FFFFFF",
      desc: (
        <div>
          <p className="mb-4">
            Publish instantly or export clean code to your preferred hosting platform.
          </p>
          <ul className="list-disc pl-10 space-y-1 mb-5">
            <li>One-Click Deploy</li>
            <li>Custom Domains</li>
            <li>Git Integration</li>
          </ul>
          <Link
            href="/"
            className="inline-flex items-center border-[1.5px] border-black text-white bg-black/90 hover:border-white/90 hover:text-black hover:bg-white px-6 min-h-11 rounded-full text-sm font-semibold transition-all shadow-md"
          >
            Publish Now
          </Link>
        </div>
      ),
      image: "/images/Features/Features_04.webp",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [pinnedIndex, setPinnedIndex] = useState<number>(-1);

  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!containerRef.current) return;
        const cards = containerRef.current.children;
        let current = -1;
        for (let i = 0; i < cards.length; i++) {
          if (cards[i].getBoundingClientRect().top <= 100 + i * 40) current = i;
        }
        setPinnedIndex(current);
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
            </span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-800 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-10">
            AI-powered generation, visual editing, and clean code export—all the tools you need to create production-ready websites.
          </p>
        </div>

        <div ref={containerRef} className="w-full flex flex-col items-center gap-y-30 pb-30">
          {features.map(({ color, badge, title, titleColor, desc, image, customVisual }, index) => {
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
                  transform: isPinned ? `scale(${1 - (pinnedIndex - index) * 0.05})` : "scale(1)",
                  transformOrigin: "top center",
                }}
              >
                <div
                  className="w-full min-h-120 md:h-120 lg:max-h-124.5 flex flex-col md:flex-row overflow-hidden rounded-[32px] shadow-2xl"
                  style={{ backgroundColor: color }}
                >
                  <div className="flex h-full w-full flex-col md:flex-row md:justify-between">
                    {/* Copy */}
                    <div className="flex mb-auto md:mb-0 shrink-0 flex-col items-start justify-end text-left gap-8 md:gap-12 p-6 md:p-10 pb-12 md:pb-15 text-white">
                      <div className="flex max-w-70 md:max-w-85 lg:max-w-120 flex-col gap-3 md:gap-4">
                        <span className={`text-xs uppercase tracking-widest font-semibold ${titleColor}`}>{badge}</span>
                        <h3 className={`text-2xl font-bold tracking-tight md:text-3xl md:leading-10 lg:text-4xl lg:leading-12 ${titleColor}`}>{title}</h3>
                        <div className="text-sm md:text-base">{desc}</div>
                      </div>
                    </div>
                    {/* Right graphic */}
                    <div className="relative -mr-1 h-[40%] max-h-125 w-full min-w-0 px-0 md:h-full md:min-w-0 md:flex-1 md:basis-0 md:p-0">
                      <div className="relative w-full h-70 md:h-full max-h-125">
                        {customVisual === "stack" ? (
                          <BuildWithStackVisual />
                        ) : customVisual === "generate" ? (
                          <GenerateWithAIVisual />
                        ) : customVisual === "customize" ? (
                          <CustomizeVisual />
                        ) : (
                          <Image
                            src={image as string}
                            alt={title}
                            priority={index === 0}
                            loading={index === 0 ? "eager" : "lazy"}
                            fill
                            className="object-cover object-top-left inset-0"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
