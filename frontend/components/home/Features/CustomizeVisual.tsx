"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BLOCKS = [
  { label: "Hero", color: "#6366f1" },
  { label: "Text", color: "#22c55e" },
  { label: "Image", color: "#f59e0b" },
  { label: "Button", color: "#3b82f6" },
  { label: "Card", color: "#ec4899" },
  { label: "Form", color: "#8b5cf6" },
];

const STYLE_ROWS = [
  { label: "Width", a: "100%", b: "90%" },
  { label: "Padding", a: "16px", b: "24px" },
  { label: "Radius", a: "8px", b: "16px" },
  { label: "Color", a: "#6366f1", b: "#ec4899" },
  { label: "Shadow", a: "none", b: "2xl" },
];

type VPhase = "hover" | "dragging" | "dropped" | "styling" | "responsive";

export default function CustomizeVisual({}: { isActive: boolean }) {
  const [phase, setPhase] = useState<VPhase>("hover");
  const [hovered, setHovered] = useState(4);
  const [cardOnCanvas, setCardOnCanvas] = useState(false);
  const [showHandles, setShowHandles] = useState(false);
  const [activeRow, setActiveRow] = useState(-1);
  const [rowUpdated, setRowUpdated] = useState(false);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );

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

      add(() => setPhase("dragging"), delay + 1100);
      add(() => {
        setPhase("dropped");
        setCardOnCanvas(true);
      }, delay + 2100);
      add(() => setShowHandles(true), delay + 2450);

      add(() => {
        setPhase("styling");
        setActiveRow(0);
      }, delay + 3300);
      STYLE_ROWS.forEach((_, i) => {
        add(
          () => {
            setActiveRow(i);
            setRowUpdated(false);
          },
          delay + 3300 + i * 700,
        );
        add(() => setRowUpdated(true), delay + 3300 + i * 700 + 340);
      });

      add(() => {
        setPhase("responsive");
        setShowHandles(false);
      }, delay + 7100);
      add(() => setViewport("tablet"), delay + 7600);
      add(() => setViewport("mobile"), delay + 8500);
      add(() => setViewport("desktop"), delay + 9400);

      add(() => cycle(0), delay + 10800);
    };

    cycle(200);
    return () => ts.forEach(clearTimeout);
  }, []);

  const canvasW =
    viewport === "mobile" ? "44%" : viewport === "tablet" ? "70%" : "100%";
  const isDragging = phase === "dragging";

  return (
    <div
      className="relative h-full w-full p-3 md:p-5 pb-0! overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
        backgroundSize: "12px 12px",
      }}
    >
      <div className="h-full rounded-2xl rounded-b-none flex flex-col overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_64px_rgba(0,0,0,0.55)] bg-[#12121e]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a2e] border-b border-white/6 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[10px] font-semibold text-white/45 font-mono ml-1">
            Visual Editor
          </span>
          <div className="ml-auto flex items-center bg-white/6 rounded-lg p-0.5 gap-0.5">
            {(["desktop", "tablet", "mobile"] as const).map((v) => (
              <motion.div
                key={v}
                animate={{
                  backgroundColor:
                    viewport === v ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.001)",
                }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center w-6 h-5 rounded-md"
                title={v}
              >
                {v === "desktop" && (
                  <svg
                    className="w-3 h-3 text-white/55"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M0 3.75A1.75 1.75 0 0 1 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 14.25 13H8.5v1.5h2a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1 0-1.5h2V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
                  </svg>
                )}
                {v === "tablet" && (
                  <svg
                    className="w-2.5 h-3 text-white/55"
                    viewBox="0 0 12 16"
                    fill="currentColor"
                  >
                    <path d="M2 0C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2H2Zm0 1.5h8a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5ZM6 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
                  </svg>
                )}
                {v === "mobile" && (
                  <svg
                    className="w-2 h-3 text-white/55"
                    viewBox="0 0 10 16"
                    fill="currentColor"
                  >
                    <path d="M2 0C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2H2Zm0 1.5h6a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V2A.5.5 0 0 1 2 1.5ZM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
                  </svg>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Editor body */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Blocks sidebar */}
          <div className="w-21 bg-[#0c0c1a] border-r border-white/6 shrink-0 py-2 overflow-hidden">
            <p className="text-[7px] font-semibold text-white/45 uppercase tracking-widest px-2.5 mb-1.5">
              Blocks
            </p>
            {BLOCKS.map((blk, i) => {
              const blockActive =
                i === hovered && (phase === "hover" || phase === "dragging");
              return (
                <motion.div
                  key={blk.label}
                  animate={{
                    backgroundColor: blockActive
                      ? "rgba(255,255,255,0.07)"
                      : "rgba(255,255,255,0.001)",
                  }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5 px-2 py-1.25"
                >
                  <motion.div
                    animate={
                      blockActive && phase === "hover"
                        ? { scale: [1, 1.15, 1] }
                        : { scale: 1 }
                    }
                    transition={{
                      duration: 0.6,
                      repeat: blockActive && phase === "hover" ? Infinity : 0,
                      repeatDelay: 0.4,
                    }}
                    className="w-4 h-4 rounded-lg flex items-center justify-center text-[8px] font-bold shrink-0"
                    style={{
                      backgroundColor: blk.color + "28",
                      color: blk.color,
                    }}
                  >
                    {blk.label[0]}
                  </motion.div>
                  <span
                    className="text-[8.5px] font-mono truncate"
                    style={{
                      color: blockActive
                        ? "rgba(255,255,255,0.8)"
                        : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {blk.label}
                  </span>
                  {blockActive && phase === "hover" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-auto flex flex-col gap-0.5] shrink-0"
                    >
                      {[0, 1, 2].map((d) => (
                        <div
                          key={d}
                          className="w-2.5 h-[1.5px] rounded-full bg-white/20"
                        />
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-[#0f0f1e] overflow-hidden relative flex items-start justify-center p-2">
            <motion.div
              animate={{ width: canvasW }}
              transition={{ type: "spring", stiffness: 180, damping: 26 }}
              className="rounded-lg border border-white/[0.07] bg-[#1a1a2e] overflow-hidden h-full"
            >
              <div
                className="flex flex-col gap-1.5 p-2 h-full overflow-y-auto"
                style={{ scrollbarWidth: "none" }}
              >
                {/* Nav */}
                <div className="h-5 rounded-md bg-white/5 border border-white/6 flex items-center px-2 gap-1 shrink-0">
                  <div className="w-2 h-2 rounded-sm bg-violet-400/60" />
                  <div className="h-0.75 w-8 rounded-full bg-white/15 ml-0.5" />
                  <div className="ml-auto flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <div
                        key={d}
                        className="h-0.75 w-5 rounded-full bg-white/10"
                      />
                    ))}
                  </div>
                </div>

                {/* Hero block */}
                <div className="h-12 rounded-md bg-white/4 border border-white/5 flex flex-col justify-center px-3 gap-1 shrink-0">
                  <div className="h-1.5 w-3/4 rounded-full bg-white/15" />
                  <div className="h-1 w-1/2 rounded-full bg-white/8" />
                  <div className="h-2.5 w-11 rounded-full bg-violet-500/40 mt-0.5" />
                </div>

                {/* Drag placeholder / dropped card */}
                <div className="relative">
                  <AnimatePresence>
                    {isDragging && !cardOnCanvas && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-16 rounded-md border-2 border-dashed border-blue-500/60 flex items-center justify-center"
                      >
                        <span className="text-[8px] text-blue-400/70 font-mono">
                          Drop here
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {cardOnCanvas && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 22,
                        }}
                        className="relative"
                      >
                        <div className="absolute inset-0 rounded-md border-2 border-blue-500 pointer-events-none z-10" />
                        <AnimatePresence>
                          {showHandles && (
                            <>
                              {[
                                "-top-0.75 -left-0.75 cursor-nw-resize",
                                "-top-0.75 -right-0.75 cursor-ne-resize",
                                "-bottom-0.75 -left-0.75 cursor-sw-resize",
                                "-bottom-0.75 -right-0.75 cursor-se-resize",
                              ].map((cls, i) => (
                                <motion.div
                                  key={cls}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    delay: i * 0.05,
                                    type: "spring",
                                    stiffness: 500,
                                  }}
                                  className={`absolute w-2 h-2 bg-white border-[1.5px] border-blue-500 rounded-xs z-20 ${cls}`}
                                />
                              ))}
                              {[
                                "top-1/2 -left-0.75 -translate-y-1/2 cursor-w-resize",
                                "top-1/2 -right-0.75 -translate-y-1/2 cursor-e-resize",
                                "-top-0.75 left-1/2 -translate-x-1/2 cursor-n-resize",
                                "-bottom-0.75 left-1/2 -translate-x-1/2 cursor-s-resize",
                              ].map((cls, i) => (
                                <motion.div
                                  key={cls}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    delay: 0.2 + i * 0.04,
                                    type: "spring",
                                    stiffness: 500,
                                  }}
                                  className={`absolute w-2 h-1.25 bg-white border-[1.5px] border-blue-500 rounded-xs z-20 ${cls}`}
                                />
                              ))}
                            </>
                          )}
                        </AnimatePresence>
                        <motion.div
                          animate={{
                            borderColor:
                              phase === "styling" && rowUpdated
                                ? "rgba(236,72,153,0.5)"
                                : "rgba(255,255,255,0.08)",
                          }}
                          className="h-16 rounded-md border bg-white/4 flex flex-col justify-center px-3 gap-1.5"
                        >
                          <motion.div
                            animate={{
                              backgroundColor:
                                phase === "styling" &&
                                activeRow >= 3 &&
                                rowUpdated
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
                                backgroundColor:
                                  phase === "styling" &&
                                  activeRow >= 3 &&
                                  rowUpdated
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

                {/* Features grid */}
                <motion.div
                  animate={{
                    gridTemplateColumns:
                      viewport === "mobile" ? "1fr" : "1fr 1fr 1fr",
                  }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="grid gap-1 shrink-0"
                >
                  {[
                    { color: "#6366f1", pct: "75%" },
                    { color: "#22c55e", pct: "66%" },
                    { color: "#f59e0b", pct: "50%" },
                  ].map((col, i) => (
                    <div
                      key={i}
                      className="rounded-md bg-white/3 border border-white/6 p-2 flex flex-col gap-1"
                    >
                      <div
                        className="w-4 h-4 rounded-lg mb-0.5"
                        style={{ backgroundColor: col.color + "30" }}
                      />
                      <div
                        className="h-1 rounded-full bg-white/15"
                        style={{ width: col.pct }}
                      />
                      <div className="h-0.75 rounded-full bg-white/8 w-full" />
                      <div className="h-0.75 rounded-full bg-white/8 w-3/4" />
                    </div>
                  ))}
                </motion.div>

                {/* Stats */}
                <motion.div
                  animate={{
                    flexDirection: viewport === "mobile" ? "column" : "row",
                  }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex gap-1 shrink-0"
                >
                  {[
                    { val: "98%", label: "Uptime", accent: "#22c55e" },
                    { val: "2.4k", label: "Projects", accent: "#6366f1" },
                    { val: "50+", label: "Templates", accent: "#f59e0b" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-md bg-white/3 border border-white/5 px-2 py-1.5 flex flex-col items-center gap-0.5"
                    >
                      <span
                        className="text-[9px] font-bold font-mono"
                        style={{ color: s.accent }}
                      >
                        {s.val}
                      </span>
                      <span className="text-[7px] text-white/45 font-mono">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* Testimonial */}
                <div className="rounded-md bg-white/3 border border-white/6 px-3 py-2 flex flex-col gap-1 shrink-0">
                  <div className="flex gap-0.5 mb-0.5">
                    {[0, 1, 2, 3, 4].map((d) => (
                      <div
                        key={d}
                        className="w-2 h-1.5 rounded-sm bg-yellow-400/50"
                      />
                    ))}
                  </div>
                  <div className="h-0.75 rounded-full bg-white/12 w-full" />
                  <div className="h-0.75 rounded-full bg-white/10 w-5/6" />
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-4 h-4 rounded-full bg-violet-500/40 shrink-0" />
                    <div className="flex flex-col gap-0.5">
                      <div className="h-0.75 rounded-full bg-white/20 w-10" />
                      <div className="h-0.75 rounded-full bg-white/10 w-8" />
                    </div>
                  </div>
                </div>

                {/* CTA banner */}
                <div className="rounded-md border border-violet-500/25 bg-violet-500/8 px-3 py-2 flex items-center gap-2 shrink-0">
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="h-1.5 rounded-full bg-white/20 w-3/4" />
                    <div className="h-0.75 rounded-full bg-white/10 w-1/2" />
                  </div>
                  <div className="h-4 w-12 rounded-full bg-violet-500/60 shrink-0" />
                </div>

                {/* Footer */}
                <div className="rounded-md bg-white/2 border border-white/5 px-2 py-2 flex items-center gap-2 shrink-0">
                  <div className="w-2 h-2 rounded-sm bg-violet-400/40 shrink-0" />
                  <div className="h-0.75 rounded-full bg-white/10 w-12" />
                  <div className="ml-auto flex gap-2">
                    {[0, 1, 2].map((d) => (
                      <div
                        key={d}
                        className="h-0.75 w-6 rounded-full bg-white/8"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Drag ghost */}
            <AnimatePresence>
              {isDragging && (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -70,
                    y: 56,
                    rotate: -3,
                    scale: 0.88,
                  }}
                  animate={{ opacity: 0.92, x: 6, y: 72, rotate: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.85,
                    transition: { duration: 0.15 },
                  }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-0 left-0 pointer-events-none z-50"
                  style={{
                    width: "calc(100% - 16px)",
                    paddingLeft: 8,
                    paddingRight: 8,
                  }}
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
          <div className="w-25 bg-[#0c0c1a] border-l border-white/6 shrink-0 py-2 overflow-hidden">
            <p className="text-[7px] font-semibold text-white/45 uppercase tracking-widest px-2.5 mb-1.5">
              Style
            </p>
            {STYLE_ROWS.map((row, i) => {
              const rowActive = phase === "styling" && activeRow === i;
              const isDone = phase === "styling" && activeRow > i;
              const showB = (rowActive && rowUpdated) || isDone;
              return (
                <motion.div
                  key={row.label}
                  animate={{
                    backgroundColor: rowActive
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.001)",
                  }}
                  className="px-2.5 py-1.25"
                >
                  <p className="text-[7px] text-white/50 font-mono mb-0.5">
                    {row.label}
                  </p>
                  <div className="flex items-center gap-1">
                    {row.label === "Color" ? (
                      <>
                        <motion.div
                          animate={{ backgroundColor: showB ? row.b : row.a }}
                          transition={{ duration: 0.35 }}
                          className="w-3 h-3 rounded-0.75 shrink-0"
                        />
                        <motion.span
                          animate={{
                            color: rowActive
                              ? "rgba(255,255,255,0.8)"
                              : "rgba(255,255,255,0.35)",
                          }}
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
                          style={{
                            color: rowActive
                              ? "#a78bfa"
                              : "rgba(167,139,250,0.5)",
                          }}
                        >
                          {showB ? row.b : row.a}
                        </motion.span>
                      </AnimatePresence>
                    )}
                  </div>
                  {rowActive && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.65, ease: "easeInOut" }}
                      style={{ transformOrigin: "left" }}
                      className="h-[1.5px] w-full bg-linear-to-r from-violet-500 to-pink-500 rounded-full mt-1"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#452B9A] border-t border-white/6 shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 text-[8px] font-mono"
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${phase === "dropped" || phase === "styling" ? "bg-blue-400" : phase === "responsive" ? "bg-violet-400" : "bg-white/20"}`}
              />
              <span className="text-white/45">
                {phase === "hover" && "Hover to drag a block"}
                {phase === "dragging" && "Dragging Card…"}
                {phase === "dropped" && "Card selected"}
                {phase === "styling" &&
                  `Editing · ${STYLE_ROWS[Math.max(activeRow, 0)].label}`}
                {phase === "responsive" && `Preview · ${viewport}`}
              </span>
            </motion.div>
          </AnimatePresence>
          <div className="ml-auto flex items-center gap-1 text-[8px] font-mono text-white/50">
            {viewport !== "desktop" && (
              <span className="text-violet-400">
                {viewport === "tablet" ? "768px" : "375px"}
              </span>
            )}
            <span>{viewport === "desktop" ? "1440px" : ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
