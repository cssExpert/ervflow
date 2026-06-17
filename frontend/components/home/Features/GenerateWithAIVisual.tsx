"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

const AI_PROMPT = "Create a website for a dental clinic in Texas.";
const AI_STEPS = [
  { id: "typing", label: "Prompt" },
  { id: "thinking", label: "Thinking" },
  { id: "sitemap", label: "Sitemap" },
  { id: "preview", label: "Preview" },
];
const AI_PAGES = [
  { label: "Home", letter: "H", sections: 4, color: "#22c55e" },
  { label: "About", letter: "A", sections: 3, color: "#3b82f6" },
  { label: "Services", letter: "S", sections: 5, color: "#8b5cf6" },
  { label: "Contact", letter: "C", sections: 2, color: "#f59e0b" },
  { label: "Blog", letter: "B", sections: 6, color: "#ec4899" },
];
const AI_TAGS = ["dental", "clinic", "Texas", "medical", "local SEO"];

type AIPhase = "typing" | "thinking" | "sitemap" | "preview" | "idle";

export default function GenerateWithAIVisual({}: { isActive: boolean }) {
  const [phase, setPhase] = useState<AIPhase>("typing");
  const [typedChars, setTypedChars] = useState(0);
  const [visiblePages, setVisiblePages] = useState(0);
  const [visibleCards, setVisibleCards] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);

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
      add(() => setPhase("sitemap"), afterTyping + 2100);

      AI_PAGES.forEach((_, i) => {
        add(() => setVisiblePages(i + 1), afterTyping + 2100 + i * 320);
      });

      add(() => setPhase("preview"), afterTyping + 3800);
      [1, 2, 3].forEach((n) => {
        add(() => setVisibleCards(n), afterTyping + 3800 + n * 420);
      });
      add(() => setShowBadge(true), afterTyping + 5100);
      add(() => setPhase("idle"), afterTyping + 6200);
      add(() => cycle(0), afterTyping + 8000);
    };

    cycle(200);
    return () => ts.forEach(clearTimeout);
  }, []);

  const stepIndex = AI_STEPS.findIndex((s) => s.id === phase);
  const isAfterSitemap = phase === "preview" || phase === "idle";

  return (
    <div
      className="relative h-full w-full p-3 md:p-5 pb-0! overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
        backgroundSize: "12px 12px",
      }}
    >
      <div className="h-full rounded-2xl rounded-b-none flex flex-col overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_64px_rgba(0,0,0,0.55)] bg-[#0d1117]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.07] bg-[#161b22] shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex items-center gap-1.5 ml-1">
            <m.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-violet-400"
            />
            <span className="text-[10px] font-semibold text-white/60 font-mono">
              ERVFlow AI Studio
            </span>
          </div>
          <span className="ml-auto text-[9px] text-white/45 font-mono">
            claude‑3.5‑sonnet
          </span>
        </div>

        {/* Step progress */}
        <div className="flex items-center gap-0 px-4 py-2 border-b border-white/5 bg-[#0d1117] shrink-0">
          {AI_STEPS.map((step, i) => {
            const done = i < stepIndex || phase === "idle";
            const active = i === stepIndex && phase !== "idle";
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center gap-1">
                  <m.div
                    animate={{
                      backgroundColor: done
                        ? "#22c55e"
                        : active
                          ? "#FFD104"
                          : "rgba(255,255,255,0.125)",
                      scale: active ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {done ? (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                      </svg>
                    ) : (
                      <span
                        className={`text-[7px] font-bold text-black ${active ? "text-[#FFD104]" : done ? "text-green-400" : "text-white/50"}`}
                      >
                        {i + 1}
                      </span>
                    )}
                  </m.div>
                  <span
                    className={`text-[8px] font-mono ${active ? "text-[#FFD104]" : done ? "text-green-400" : "text-white/45"}`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < AI_STEPS.length - 1 && (
                  <m.div
                    animate={{
                      backgroundColor: done
                        ? "#22c55e"
                        : "rgba(255,255,255,0.08)",
                    }}
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
            <div className="w-5 h-5 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[8px] font-bold text-white">U</span>
            </div>
            <div className="flex-1 bg-[#21262d] rounded-xl rounded-tl-sm px-3 py-2 border border-white/6">
              <p className="text-[10px] font-mono text-white/80 leading-relaxed">
                {AI_PROMPT.slice(0, typedChars)}
                {phase === "typing" && (
                  <span
                    className="inline-block w-[1.5px] h-2.5 ml-0.5 align-middle bg-amber-400"
                    style={{
                      opacity: cursorOn ? 1 : 0,
                      transition: "opacity 0.05s",
                    }}
                  />
                )}
              </p>
            </div>
          </div>

          {/* AI bubble */}
          <AnimatePresence>
            {phase !== "typing" && (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex gap-2 items-start"
              >
                <div className="w-5 h-5 rounded-full bg-linear-to-br from-violet-600 to-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm0 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm1 12H11v-7h2v7Z" />
                  </svg>
                </div>
                <div className="flex-1 bg-[#21262d] rounded-xl rounded-tl-sm px-3 py-2.5 border border-white/6 overflow-hidden">
                  {phase === "thinking" && (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        {[0, 1, 2].map((i) => (
                          <m.div
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.18,
                            }}
                            className="w-1.5 h-1.5 rounded-full bg-violet-400"
                          />
                        ))}
                        <span className="text-[9px] text-white/55 font-mono">
                          Analyzing your request…
                        </span>
                      </div>
                      <m.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.6, ease: "easeInOut" }}
                        style={{ transformOrigin: "left" }}
                        className="h-0.5 w-full bg-linear-to-r from-violet-600 via-blue-500 to-cyan-400 rounded-full"
                      />
                      <div className="flex gap-1 flex-wrap mt-0.5">
                        {AI_TAGS.map((tag, i) => (
                          <m.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.75 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: 0.2 + i * 0.14,
                              type: "spring",
                              stiffness: 300,
                            }}
                            className="text-[8px] px-1.5 py-0.5 rounded-full bg-violet-500/15 text-violet-300 font-mono border border-violet-500/25"
                          >
                            #{tag}
                          </m.span>
                        ))}
                      </div>
                    </div>
                  )}
                  {(phase === "sitemap" || isAfterSitemap) && (
                    <div className="flex flex-col gap-2">
                      <p className="text-[8.5px] text-white/40 font-mono">
                        Generated sitemap —{" "}
                        <span className="text-green-400">
                          {Math.min(visiblePages, AI_PAGES.length)} of{" "}
                          {AI_PAGES.length} pages
                        </span>
                      </p>
                      <div className="grid grid-cols-5 gap-1.5">
                        {AI_PAGES.map((page, i) => (
                          <AnimatePresence key={page.label}>
                            {i < visiblePages && (
                              <m.div
                                initial={{ opacity: 0, scale: 0.7, y: 8 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 350,
                                  damping: 20,
                                }}
                                className="flex flex-col items-center gap-1 rounded-lg p-1.5 border border-white/[0.07] bg-white/3"
                              >
                                <div
                                  className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0"
                                  style={{
                                    backgroundColor: page.color + "35",
                                    color: page.color,
                                  }}
                                >
                                  {page.letter}
                                </div>
                                <span className="text-[7px] text-white/55 font-mono text-center leading-tight">
                                  {page.label}
                                </span>
                                <span className="text-[6px] text-white/40 font-mono">
                                  {page.sections}s
                                </span>
                              </m.div>
                            )}
                          </AnimatePresence>
                        ))}
                      </div>
                      {visiblePages >= 3 && (
                        <m.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-1 pl-1"
                        >
                          <span className="text-[8px] text-white/40 font-mono shrink-0">
                            └─
                          </span>
                          {["Cleaning", "Whitening", "Implants"].map((s, i) => (
                            <m.span
                              key={s}
                              initial={{ opacity: 0, x: -4 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 + 0.1 }}
                              className="text-[7.5px] font-mono px-1.5 py-0.5 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/20"
                            >
                              {s}
                            </m.span>
                          ))}
                        </m.div>
                      )}
                    </div>
                  )}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        {/* Page preview strip */}
        <AnimatePresence>
          {(phase === "preview" || phase === "idle") && (
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="px-3 md:px-4 pb-3 md:pb-4 shrink-0"
            >
              <p className="text-[8px] text-white/50 font-mono mb-2">
                Page previews
              </p>
              <div className="flex gap-2">
                {[
                  { title: "Home", color: "#22c55e" },
                  { title: "Services", color: "#8b5cf6" },
                  { title: "Contact", color: "#f59e0b" },
                ].map((card, i) => (
                  <AnimatePresence key={card.title}>
                    {i < visibleCards && (
                      <m.div
                        initial={{ opacity: 0, y: 14, scale: 0.88 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 22,
                        }}
                        className="flex-1 rounded-lg overflow-hidden border border-white/[0.07] bg-[#161b22] shadow-lg"
                      >
                        <div
                          className="flex items-center gap-0.5 px-1.5 py-1"
                          style={{
                            backgroundColor: card.color + "22",
                            borderBottom: `1px solid ${card.color}25`,
                          }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: card.color }}
                          />
                          <span
                            className="text-[6.5px] font-mono ml-0.5"
                            style={{ color: card.color }}
                          >
                            {card.title}
                          </span>
                          <div className="ml-auto flex gap-0.5">
                            {[0, 1, 2].map((d) => (
                              <div
                                key={d}
                                className="w-3 h-0.5 rounded-full bg-white/10"
                              />
                            ))}
                          </div>
                        </div>
                        <div className="p-1.5 flex flex-col gap-1">
                          <div
                            className="rounded-sm p-1.5"
                            style={{ backgroundColor: card.color + "12" }}
                          >
                            <div
                              className="h-1.5 rounded-sm mb-1 w-4/5"
                              style={{ backgroundColor: card.color + "60" }}
                            />
                            <div className="h-1 rounded-sm w-3/5 bg-white/10" />
                            <div
                              className="mt-1.5 h-2.5 w-10 rounded-sm"
                              style={{ backgroundColor: card.color + "80" }}
                            />
                          </div>
                          {i === 1 ? (
                            <div className="grid grid-cols-3 gap-0.5">
                              {[0, 1, 2].map((b) => (
                                <div
                                  key={b}
                                  className="bg-white/4 rounded-sm p-1"
                                >
                                  <div
                                    className="w-2 h-2 rounded-sm mx-auto mb-0.5"
                                    style={{
                                      backgroundColor: card.color + "40",
                                    }}
                                  />
                                  <div className="h-0.5 rounded-sm bg-white/10 w-full" />
                                </div>
                              ))}
                            </div>
                          ) : i === 2 ? (
                            <div className="flex flex-col gap-0.5">
                              {[0, 1, 2].map((b) => (
                                <div
                                  key={b}
                                  className="h-2 rounded-sm bg-white/5 border border-white/6"
                                />
                              ))}
                              <div
                                className="h-2.5 rounded-sm w-2/3 mt-0.5"
                                style={{ backgroundColor: card.color + "60" }}
                              />
                            </div>
                          ) : (
                            <div className="flex gap-0.5">
                              {[0, 1, 2].map((b) => (
                                <div
                                  key={b}
                                  className="flex-1 bg-white/4 rounded-sm p-1"
                                >
                                  <div
                                    className="h-1.5 rounded-sm mb-0.5"
                                    style={{
                                      backgroundColor: card.color + "30",
                                    }}
                                  />
                                  <div className="h-0.5 rounded-sm bg-white/10" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Status bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#A38500] border-t border-white/6 shrink-0">
          <AnimatePresence mode="wait">
            <m.div
              key={phase}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5"
            >
              <m.div
                animate={{
                  backgroundColor:
                    phase === "thinking"
                      ? "#a78bfa"
                      : phase === "sitemap"
                        ? "#3b82f6"
                        : phase === "preview" || phase === "idle"
                          ? "#22c55e"
                          : "rgba(255,255,255,0.2)",
                }}
                transition={{ duration: 0.3 }}
                className="w-1.5 h-1.5 rounded-full shrink-0"
              />
              <span className="text-[8.5px] font-mono text-white/75">
                {phase === "typing" && "Generating prompt…"}
                {phase === "thinking" && "Analyzing request…"}
                {phase === "sitemap" &&
                  `Mapping pages · ${visiblePages} / ${AI_PAGES.length}`}
                {phase === "preview" && "Pages ready · preview"}
                {phase === "idle" && "Ready to customize"}
              </span>
            </m.div>
          </AnimatePresence>
          <div className="ml-auto text-[8px] font-mono text-white/75">
            {(phase === "preview" || phase === "idle") && "5 pages"}
            {phase === "sitemap" && `${visiblePages} pages`}
          </div>
        </div>
      </div>

      {/* "5 pages ready" floating badge */}
      <AnimatePresence>
        {showBadge && (
          <m.div
            initial={{ opacity: 0, scale: 0.85, x: 16 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="absolute top-6 right-6 flex items-center gap-2 bg-white rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_12px_36px_rgba(0,0,0,0.18)] px-3 py-2"
          >
            <div className="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center shrink-0">
              <svg
                className="w-3.5 h-3.5 text-white"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-900 leading-tight">
                5 pages generated
              </p>
              <p className="text-[8px] text-zinc-400 leading-tight">
                Ready to customize
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
