"use client";

import { useEffect, useState } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  Code2,
  Eye,
  Sparkles,
  GripVertical,
  Check,
  Loader2,
  ChevronRight,
  Play,
} from "lucide-react";

type Stage = "editor" | "ai" | "generating" | "code";
type Preview = "desktop" | "tablet" | "mobile";

const PROMPT =
  "Build a SaaS pricing section — 3 tiers, highlight Pro plan, monthly/annual toggle";
const STAGE_MS = 3600;

const SECTIONS = [
  "Hero",
  "Features",
  "Pricing",
  "Testimonials",
  "CTA Banner",
  "Footer",
];
const ELEMENTS = ["Button", "Card", "Input", "Badge", "Divider"];

const GENERATING_STEPS = [
  { label: "Section header", done: true },
  { label: "Billing toggle", done: true },
  { label: "Pricing cards", done: true },
  { label: "Feature lists", loading: true },
];

function SelectionBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1 mt-1">
      <span className="text-[10px] text-primary-400 font-medium bg-primary-500/10 px-2 py-0.5 rounded border border-primary-500/20">
        {label}
      </span>
      <ChevronRight className="w-3 h-3 text-zinc-400 dark:text-zinc-600" />
    </div>
  );
}

export default function HeroVisual() {
  const [stage, setStage] = useState<Stage>("editor");
  const [typed, setTyped] = useState(0);
  const [preview, setPreview] = useState<Preview>("desktop");
  const [active, setActive] = useState(0);
  const [manualCode, setManualCode] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setStage((s) => {
        const order: Stage[] = ["editor", "ai", "generating"];
        const next = order[(order.indexOf(s) + 1) % order.length];
        if (next === "ai") setTyped(0);
        return next;
      });
    }, STAGE_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (stage !== "ai" || typed >= PROMPT.length) return;
    const id = setTimeout(() => setTyped((t) => t + 1), 28);
    return () => clearTimeout(id);
  }, [stage, typed]);

  useEffect(() => {
    const id = setInterval(() => setActive((n) => (n + 1) % 4), 1800);
    return () => clearInterval(id);
  }, []);

  const showAI = stage === "ai" || stage === "generating";
  const showCode = manualCode;

  return (
    <div className="relative w-full">
      {/* Adaptive glow — subtle in light mode, rich in dark mode */}
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl blur-3xl opacity-15 dark:opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 90%, #F76235 0%, #6366f1 55%, transparent 75%)",
        }}
      />

      {/* Editor shell — intentionally always dark (simulates a real app like VS Code / Figma) */}
      <div className="w-full rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-black/15 dark:border-zinc-800 shadow-2xl shadow-zinc-400/25 dark:shadow-black/70 ring-1 ring-inset ring-white/4">
        {/* Traffic lights + URL bar */}
        <div className="flex items-center gap-2 px-3 py-3 bg-muted-foreground/10 dark:bg-zinc-900 border-b border-black/8 dark:border-zinc-800">
          <div className="hidden sm:inline-flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>

          <div className="sm:flex-1 mx-0 sm:mx-3 flex justify-start sm:justify-center">
            <div className="flex items-center gap-2 min-h-7 bg-zinc-800/10 dark:bg-zinc-800 rounded-sm px-3 py-1 text-xs text-zinc-900 dark:text-zinc-400 font-mono truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 shrink-0" />
              app.ervflow.com/editor
            </div>
          </div>

          {/* Mode switcher */}
          <div className="flex items-center gap-0.5 bg-zinc-800/10 dark:bg-zinc-800 rounded-sm p-0.5">
            {(
              [
                ["visual", "Visual", Eye],
                ["code", "Code", Code2],
              ] as const
            ).map(([s, label, Icon]) => (
              <button
                key={s}
                onClick={() => setManualCode(s === "code")}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-sm text-xs font-medium transition-all ${
                  (s === "code" && showCode) || (s === "visual" && !showCode)
                    ? "bg-zinc-800/20 dark:bg-zinc-700 text-zinc-950 dark:text-white"
                    : "text-zinc-900 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-300"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden md:inline">{label}</span>
              </button>
            ))}
          </div>

          <button className="flex items-center gap-1.5 bg-primary-500 hover:bg-primary-600 text-white text-xs font-semibold px-3 py-1.5 rounded-sm transition-colors ml-1 sm:min-h-8">
            <Play className="hidden sm:inline w-3 h-3 fill-current" /> Publish
          </button>
        </div>

        {/* Secondary toolbar */}
        <div className="flex items-center px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border-b border-black/8 dark:border-zinc-800/60 text-xs text-zinc-500">
          {["Components", "Layers", "Assets", "Pages"].map((t, i) => (
            <button
              key={t}
              className={`mr-4 transition-colors ${i === 0 ? "text-zinc-900 dark:text-white font-medium" : "hover:text-zinc-900 dark:hover:text-white"}`}
            >
              {t}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-1">
            {(["desktop", "tablet", "mobile"] as Preview[]).map((s) => {
              const Icon =
                s === "desktop"
                  ? Monitor
                  : s === "tablet"
                    ? Tablet
                    : Smartphone;
              return (
                <button
                  key={s}
                  onClick={() => setPreview(s)}
                  className={`p-1.5 rounded transition-colors ${preview === s ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Editor body */}
        <div className="flex h-105 md:h-115">
          {/* Left sidebar */}
          <div className="w-44 shrink-0 border-r border-black/8 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hidden sm:flex flex-col">
            <div className="px-3 pt-3 pb-2">
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 text-xs text-zinc-500 dark:text-zinc-600 rounded-md px-2.5 py-1.5">
                Search components…
              </div>
            </div>
            <div className="flex-1 overflow-hidden px-2 py-1">
              <p className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wider px-1 py-1.5 font-semibold">
                Sections
              </p>
              {SECTIONS.map((label, i) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-all cursor-pointer ${
                    i === active
                      ? "bg-primary-500/15 text-primary-600 dark:text-primary-300 border border-primary-500/30"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                  }`}
                >
                  <GripVertical className="w-3 h-3 text-zinc-400 dark:text-zinc-600 shrink-0" />
                  <span className="truncate">{label}</span>
                  {i === active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                  )}
                </div>
              ))}
              <p className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wider px-1 py-1.5 font-semibold mt-2">
                Elements
              </p>
              {ELEMENTS.map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer transition-all"
                >
                  <GripVertical className="w-3 h-3 text-zinc-400 dark:text-zinc-600 shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div className="@container flex-1 bg-zinc-100 dark:bg-zinc-950 overflow-auto flex flex-col items-center">
            {showCode ? (
              <div className="w-full h-full">
                <CodeView />
              </div>
            ) : (
              <div
                className={`transition-all duration-500 ease-in-out w-full p-4 flex flex-col gap-3 ${
                  preview !== "desktop"
                    ? "border border-dashed border-zinc-300 dark:border-zinc-700/60 rounded-lg mx-auto"
                    : ""
                }`}
                style={{
                  maxWidth:
                    preview === "tablet"
                      ? "768px"
                      : preview === "mobile"
                        ? "375px"
                        : "100%",
                }}
              >
                {[
                  { label: "Hero Section", content: <HeroBlock /> },
                  {
                    label: "Feature Grid",
                    content: <FeatureBlock preview={preview} />,
                  },
                  {
                    label: "Pricing Cards",
                    content: <PricingBlock preview={preview} />,
                  },
                  { label: "Testimonials", content: <TestimonialsBlock /> },
                ].map(({ label, content }, i) => (
                  <div
                    key={label}
                    className={`rounded-lg border-2 transition-all duration-400 ${
                      i === active
                        ? "border-primary-500 shadow-md shadow-primary-500/20"
                        : "border-transparent"
                    }`}
                  >
                    <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-transparent shadow-sm dark:shadow-none">{content}</div>
                    {i === active && <SelectionBadge label={label} />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Panel */}
          <div
            className={`border-l border-black/8 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex flex-col transition-all duration-500 overflow-hidden ${showAI ? "w-52 opacity-100" : "w-0 opacity-0"}`}
          >
            <div className="px-3 pt-3 pb-2 border-b border-black/8 dark:border-zinc-800 shrink-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-white">
                <Sparkles className="w-3.5 h-3.5 text-primary-400" /> AI Builder
              </div>
            </div>
            <div className="flex-1 overflow-auto p-3 space-y-3">
              <div className="rounded-lg bg-zinc-200 dark:bg-zinc-800 p-2.5">
                <p className="text-[10px] text-zinc-500 mb-1.5 font-medium uppercase tracking-wide">
                  Prompt
                </p>
                <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed min-h-14">
                  {PROMPT.slice(0, typed)}
                  {stage === "ai" && typed < PROMPT.length && (
                    <span className="inline-block w-px h-3 bg-primary-400 animate-pulse ml-0.5 align-middle" />
                  )}
                </p>
              </div>
              {stage === "generating" && (
                <div className="space-y-1.5">
                  <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wide">
                    Generating
                  </p>
                  {GENERATING_STEPS.map(({ label, done }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 text-xs"
                    >
                      {done ? (
                        <Check className="w-3 h-3 text-green-500 dark:text-green-400 shrink-0" />
                      ) : (
                        <Loader2 className="w-3 h-3 text-primary-400 animate-spin shrink-0" />
                      )}
                      <span
                        className={done ? "text-zinc-600 dark:text-zinc-300" : "text-zinc-500 dark:text-zinc-400"}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-3 border-t border-black/8 dark:border-zinc-800 shrink-0">
              <div className="flex items-center gap-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg px-2.5 py-2">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-600 flex-1 truncate">
                  Ask AI to modify…
                </span>
                <Sparkles className="w-3 h-3 text-primary-400 shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center gap-4 px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border-t border-black/8 dark:border-zinc-800 text-[10px] text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Ready
          </span>
          <span>Next.js 15</span>
          <span>Tailwind v4</span>
          <span className="ml-auto">TypeScript · ESLint</span>
        </div>
      </div>
    </div>
  );
}

/* ── Canvas sub-views ── */

function HeroBlock() {
  return (
    <div className="text-center space-y-2">
      <div className="w-20 h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded mx-auto" />
      <div className="w-full @sm:w-48 h-5 bg-zinc-300 dark:bg-zinc-600 rounded mx-auto" />
      <div className="w-full @sm:w-36 h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded mx-auto" />
      <div className="flex gap-2 justify-center pt-2">
        <div className="w-20 h-7 bg-primary-500/70 rounded-full" />
        <div className="w-20 h-7 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
      </div>
    </div>
  );
}

function FeatureBlock({ preview }: { preview?: Preview }) {
  const cols =
    preview === "mobile"
      ? "grid-cols-1"
      : preview === "tablet"
        ? "grid-cols-2"
        : "grid-cols-3";
  return (
    <div className={`grid gap-3 transition-all duration-500 ${cols}`}>
      {[0, 1, 2].map((i) => (
        <div key={i} className="space-y-1.5">
          <div className="w-6 h-6 bg-zinc-200 dark:bg-zinc-700 rounded" />
          <div className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded" />
          <div className="w-4/5 h-2 bg-zinc-100 dark:bg-zinc-800 rounded" />
          <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded" />
        </div>
      ))}
    </div>
  );
}

function PricingBlock({ preview }: { preview?: Preview }) {
  const cols =
    preview === "mobile"
      ? "grid-cols-1"
      : preview === "tablet"
        ? "grid-cols-2"
        : "grid-cols-3";
  return (
    <div className={`grid gap-2 transition-all duration-500 ${cols}`}>
      {[
        ["Starter", false],
        ["Pro", true],
        ["Scale", false],
      ].map(([tier, featured]) => (
        <div
          key={String(tier)}
          className={`rounded-md p-2.5 space-y-2 ${featured ? "bg-primary-500/20 border border-primary-500/40" : "bg-zinc-100 dark:bg-zinc-800"}`}
        >
          <div className="w-10 h-2 bg-zinc-300 dark:bg-zinc-600 rounded" />
          <div className="w-14 h-4 bg-zinc-300 dark:bg-zinc-600 rounded" />
          {[0, 1, 2].map((j) => (
            <div key={j} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary-500/60 shrink-0" />
              <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function TestimonialsBlock() {
  return (
    <div className="space-y-2">
      {[0, 1].map((i) => (
        <div key={i} className="flex gap-3 items-center">
          <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-700 shrink-0" />
          <div className="flex-1 space-y-1">
            <div className="w-3/4 h-2 bg-zinc-200 dark:bg-zinc-700 rounded" />
            <div className="w-1/2 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded" />
          </div>
          <div className="flex gap-0.5 shrink-0">
            {[0, 1, 2, 3, 4].map((j) => (
              <div key={j} className="w-2 h-2 bg-yellow-400/60 rounded-sm" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CodeView() {
  const tokens = [
    {
      c: "text-zinc-500",
      v: "// components/Pricing.tsx — generated by ERVFlow AI\n",
    },
    { c: "text-purple-400", v: "import " },
    { c: "text-zinc-200", v: "{ useState } " },
    { c: "text-purple-400", v: "from " },
    { c: "text-green-400", v: "'react'\n\n" },
    { c: "text-purple-400", v: "export function " },
    { c: "text-yellow-300", v: "Pricing" },
    { c: "text-zinc-200", v: "() {\n" },
    { c: "text-zinc-200", v: "  " },
    { c: "text-purple-400", v: "const " },
    { c: "text-zinc-200", v: "[annual, setAnnual] = " },
    { c: "text-yellow-300", v: "useState" },
    { c: "text-zinc-200", v: "(false)\n\n" },
    { c: "text-zinc-200", v: "  " },
    { c: "text-purple-400", v: "return " },
    { c: "text-zinc-200", v: "(\n" },
    { c: "text-zinc-200", v: "    " },
    { c: "text-blue-400", v: "<section" },
    { c: "text-cyan-300", v: " className" },
    { c: "text-zinc-200", v: "=" },
    { c: "text-green-400", v: '"py-24 bg-zinc-950"' },
    { c: "text-blue-400", v: ">\n" },
    { c: "text-zinc-200", v: "      " },
    { c: "text-blue-400", v: "<Toggle " },
    { c: "text-cyan-300", v: "value" },
    { c: "text-zinc-200", v: "={annual} " },
    { c: "text-cyan-300", v: "onChange" },
    { c: "text-zinc-200", v: "={setAnnual} " },
    { c: "text-blue-400", v: "/>\n" },
    { c: "text-zinc-200", v: "      " },
    { c: "text-blue-400", v: "<div" },
    { c: "text-cyan-300", v: " className" },
    { c: "text-zinc-200", v: "=" },
    { c: "text-green-400", v: '"grid grid-cols-3 gap-6"' },
    { c: "text-blue-400", v: ">\n" },
    { c: "text-zinc-200", v: "        " },
    { c: "text-blue-400", v: "<PricingCard " },
    { c: "text-cyan-300", v: "tier" },
    { c: "text-zinc-200", v: "=" },
    { c: "text-green-400", v: '"Starter"' },
    { c: "text-blue-400", v: " />\n" },
    { c: "text-zinc-200", v: "        " },
    { c: "text-blue-400", v: "<PricingCard " },
    { c: "text-cyan-300", v: "tier" },
    { c: "text-zinc-200", v: "=" },
    { c: "text-green-400", v: '"Pro"' },
    { c: "text-cyan-300", v: " featured" },
    { c: "text-blue-400", v: " />\n" },
    { c: "text-zinc-200", v: "        " },
    { c: "text-blue-400", v: "<PricingCard " },
    { c: "text-cyan-300", v: "tier" },
    { c: "text-zinc-200", v: "=" },
    { c: "text-green-400", v: '"Scale"' },
    { c: "text-blue-400", v: " />\n" },
    { c: "text-zinc-200", v: "      " },
    { c: "text-blue-400", v: "</div>\n" },
    { c: "text-zinc-200", v: "    " },
    { c: "text-blue-400", v: "</section>\n" },
    { c: "text-zinc-200", v: "  )\n}" },
  ];

  return (
    <div className="h-full p-4 font-mono text-xs leading-relaxed overflow-auto bg-zinc-950">
      {tokens.map((t, i) => (
        <span key={i} className={t.c} style={{ whiteSpace: "pre" }}>
          {t.v}
        </span>
      ))}
    </div>
  );
}
