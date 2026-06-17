"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

const DEPLOY_LOGS = [
  { text: "Installing dependencies", icon: "⬇" },
  { text: "Running build command", icon: "⚙" },
  { text: "Compiling TypeScript", icon: "◈" },
  { text: "Optimising images", icon: "⊡" },
  { text: "Generating static pages", icon: "⊞" },
  { text: "Deploying to edge network", icon: "⟢" },
];

const DOMAIN_ROWS = [
  { host: "mydentalclinic.com", type: "A", value: "76.76.21.21" },
  { host: "www.mydentalclinic.com", type: "CNAME", value: "cname.ervflow.app" },
  { host: "_ssl.mydentalclinic.com", type: "TXT", value: "v=ssl1 cert…" },
];

const METRICS = [
  { label: "Build", value: "23s", color: "#22c55e" },
  { label: "Pages", value: "14", color: "#6366f1" },
  { label: "Score", value: "98", color: "#f59e0b" },
];

type LaunchPhase = "configure" | "building" | "domain" | "success";

export default function LaunchVisual({}: { isActive: boolean }) {
  const [phase, setPhase] = useState<LaunchPhase>("configure");
  const [progress, setProgress] = useState(0);
  const [logLines, setLogLines] = useState(0);
  const [domainReady, setDomainReady] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [btnPulse, setBtnPulse] = useState(false);

  useEffect(() => {
    const ts: ReturnType<typeof setTimeout>[] = [];
    const add = (fn: () => void, ms: number) => ts.push(setTimeout(fn, ms));

    const cycle = (delay = 0) => {
      add(() => {
        setPhase("configure");
        setProgress(0);
        setLogLines(0);
        setDomainReady(0);
        setShowCard(false);
        setBtnPulse(false);
      }, delay);

      add(() => setBtnPulse(true), delay + 700);
      add(() => {
        setPhase("building");
        setBtnPulse(false);
      }, delay + 1800);

      const TICKS = 28;
      for (let i = 1; i <= TICKS; i++) {
        add(
          () => setProgress(Math.round((i / TICKS) * 100)),
          delay + 1800 + i * 100,
        );
      }
      DEPLOY_LOGS.forEach((_, i) => {
        add(() => setLogLines(i + 1), delay + 1800 + i * 480);
      });

      const afterBuild = delay + 1800 + TICKS * 100 + 200;

      add(() => {
        setPhase("domain");
        setProgress(0);
      }, afterBuild + 200);
      DOMAIN_ROWS.forEach((_, i) => {
        add(() => setDomainReady(i + 1), afterBuild + 200 + 600 + i * 700);
      });

      const afterDomain =
        afterBuild + 200 + 600 + DOMAIN_ROWS.length * 700 + 400;
      add(() => setPhase("success"), afterDomain);
      add(() => setShowCard(true), afterDomain + 900);

      add(() => cycle(0), afterDomain + 5000);
    };

    cycle(400);
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
      <div className="h-full rounded-2xl rounded-b-none flex flex-col overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_64px_rgba(0,0,0,0.55)] bg-[#0d1117]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#161b22] border-b border-white/[0.07] shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[10px] font-semibold text-white/70 font-mono ml-1">
            Deploy Studio
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <svg
              className="w-3 h-3 text-white/50"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            <span className="text-[9px] text-white/50 font-mono">main</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {/* CONFIGURE */}
            {phase === "configure" && (
              <m.div
                key="configure"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col gap-3 p-4 overflow-hidden"
              >
                <div className="bg-[#161b22] rounded-xl border border-white/8 p-3 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                      <svg
                        className="w-4 h-4 text-orange-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-white/80">
                        Texas Dental Care
                      </p>
                      <p className="text-[8px] text-white/50 font-mono">
                        github.com / user / dental-site
                      </p>
                    </div>
                    <div className="ml-auto px-1.5 py-0.5 rounded-full text-[7px] font-semibold bg-green-500/15 text-green-400 border border-green-500/20">
                      Ready
                    </div>
                  </div>
                  {[
                    { label: "Framework", value: "Next.js 15", dot: "#fff" },
                    { label: "Branch", value: "main", dot: "#22c55e" },
                    {
                      label: "Environment",
                      value: "Production",
                      dot: "#f59e0b",
                    },
                    { label: "Node", value: "20.x LTS", dot: "#6366f1" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center gap-2 border-t border-white/5 pt-2"
                    >
                      <span className="text-[8.5px] text-white/50 font-mono w-20 shrink-0">
                        {row.label}
                      </span>
                      <div className="flex items-center gap-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: row.dot }}
                        />
                        <span className="text-[8.5px] text-white/65 font-mono">
                          {row.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <m.div
                  animate={
                    btnPulse
                      ? {
                          boxShadow: [
                            "0 0 0 0 rgba(249,115,22,0)",
                            "0 0 0 8px rgba(249,115,22,0.2)",
                            "0 0 0 0 rgba(249,115,22,0)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1, repeat: btnPulse ? Infinity : 0 }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-2.5"
                >
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm3.78 6.28-4.25 4.25a.75.75 0 0 1-1.06 0L4.22 8.28a.75.75 0 0 1 1.06-1.06L7 8.94l3.72-3.72a.75.75 0 1 1 1.06 1.06Z" />
                  </svg>
                  <span className="text-[10px] font-bold text-white">
                    Deploy to Production
                  </span>
                </m.div>

                <div className="flex items-center gap-2 text-[8px] font-mono text-white/65">
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M11.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-2.25.75a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.492 2.492 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Z" />
                  </svg>
                  <span>3 commits ahead · last push 2m ago</span>
                </div>
              </m.div>
            )}

            {/* BUILDING */}
            {phase === "building" && (
              <m.div
                key="building"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col gap-3 p-4 overflow-hidden"
              >
                <div className="flex items-center gap-2">
                  <m.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-4 h-4 rounded-full border-2 border-orange-500 border-t-transparent"
                  />
                  <span className="text-[10px] font-semibold text-white/70">
                    Building…
                  </span>
                  <span className="ml-auto text-[9px] text-orange-400 font-mono">
                    {progress}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/6 overflow-hidden">
                  <m.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.15 }}
                    className="h-full rounded-full bg-linear-to-r from-orange-600 to-orange-400"
                  />
                </div>
                <div className="flex-1 bg-[#0a0a0a] rounded-xl border border-white/6 p-3 overflow-hidden font-mono">
                  <div className="flex flex-col gap-1">
                    {DEPLOY_LOGS.map((log, i) => (
                      <AnimatePresence key={i}>
                        {i < logLines && (
                          <m.div
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2"
                          >
                            {i < logLines - 1 ? (
                              <svg
                                className="w-3 h-3 text-green-400 shrink-0"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                              >
                                <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                              </svg>
                            ) : (
                              <m.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="w-3 h-3 rounded-full border border-orange-400 border-t-transparent shrink-0"
                              />
                            )}
                            <span
                              className={`text-[8.5px] ${i < logLines - 1 ? "text-white/60" : "text-white/70"}`}
                            >
                              {log.text}
                            </span>
                            {i < logLines - 1 && (
                              <span className="ml-auto text-[7px] text-green-400/60">
                                done
                              </span>
                            )}
                          </m.div>
                        )}
                      </AnimatePresence>
                    ))}
                  </div>
                </div>
              </m.div>
            )}

            {/* DOMAIN */}
            {phase === "domain" && (
              <m.div
                key="domain"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col gap-3 p-4 overflow-hidden"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-400"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM1.5 8a6.5 6.5 0 0 1 .1-1.046l2.195 2.195A1.5 1.5 0 0 0 5.06 10.5H6v.5a1.5 1.5 0 0 0 3 0v-1a.5.5 0 0 1 .5-.5h.75a1.5 1.5 0 0 0 1.28-.72l.5-.835a1.5 1.5 0 0 0 .194-1.264l-.34-1.023A1.5 1.5 0 0 0 10.46 4.5H9.5V4a.5.5 0 0 0-.5-.5H7.5a.5.5 0 0 0-.5.5v1.5H5.5a.5.5 0 0 0-.5.5v1H4a.5.5 0 0 0-.354.146L2.08 8.71A6.494 6.494 0 0 1 1.5 8Z" />
                  </svg>
                  <span className="text-[10px] font-semibold text-white/70">
                    Connecting Domain
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-[#161b22] border border-white/8 rounded-xl px-3 py-2">
                  <svg
                    className="w-3 h-3 text-blue-400/60 shrink-0"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0Z" />
                  </svg>
                  <span className="text-[10px] font-mono text-white/70 flex-1">
                    mydentalclinic.com
                  </span>
                  <AnimatePresence mode="wait">
                    {domainReady >= DOMAIN_ROWS.length ? (
                      <m.div
                        key="done"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1 text-[8px] text-green-400 font-semibold"
                      >
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                        </svg>
                        Connected
                      </m.div>
                    ) : (
                      <m.div
                        key="checking"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-3 h-3 rounded-full border border-blue-400 border-t-transparent"
                      />
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col gap-1.5">
                  <p className="text-[8px] text-white/65 font-mono uppercase tracking-widest">
                    DNS Records
                  </p>
                  {DOMAIN_ROWS.map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-[#161b22] border border-white/6 rounded-lg px-2.5 py-1.5"
                    >
                      <div className="w-7 text-[7px] font-bold text-center rounded bg-blue-500/20 text-blue-400 py-0.5 shrink-0">
                        {row.type}
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-[8px] font-mono text-white/60 truncate">
                          {row.host}
                        </span>
                        <span className="text-[7px] font-mono text-white/65 truncate">
                          {row.value}
                        </span>
                      </div>
                      <div className="shrink-0">
                        <AnimatePresence mode="wait">
                          {i < domainReady ? (
                            <m.div
                              key="check"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400 }}
                              className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center"
                            >
                              <svg
                                className="w-2.5 h-2.5 text-green-400"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                              >
                                <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                              </svg>
                            </m.div>
                          ) : (
                            <m.div
                              key="spin"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-4 h-4 rounded-full border border-white/20 border-t-blue-400"
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {domainReady >= 2 && (
                    <m.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 bg-green-500/8 border border-green-500/20 rounded-lg px-3 py-2"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-green-400 shrink-0"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm3.78 6.28-4.25 4.25a.75.75 0 0 1-1.06 0L4.22 8.28a.75.75 0 0 1 1.06-1.06L7 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06Z" />
                      </svg>
                      <span className="text-[9px] text-green-400 font-mono">
                        SSL certificate issued · TLS 1.3
                      </span>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            )}

            {/* SUCCESS */}
            {phase === "success" && (
              <m.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4"
              >
                <m.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 18,
                    delay: 0.1,
                  }}
                  className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center"
                >
                  <svg
                    className="w-7 h-7 text-green-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </m.div>

                <div className="text-center">
                  <m.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="text-[13px] font-bold text-white"
                  >
                    Deployed to Production
                  </m.p>
                  <m.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.38 }}
                    className="flex items-center justify-center gap-1 mt-1"
                  >
                    <svg
                      className="w-3 h-3 text-green-400"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM1.5 8a6.5 6.5 0 0 1 .1-1.046l2.195 2.195A1.5 1.5 0 0 0 5.06 10.5H6v.5a1.5 1.5 0 0 0 3 0v-1a.5.5 0 0 1 .5-.5h.75a1.5 1.5 0 0 0 1.28-.72l.5-.835a1.5 1.5 0 0 0 .194-1.264l-.34-1.023A1.5 1.5 0 0 0 10.46 4.5H9.5V4a.5.5 0 0 0-.5-.5H7.5a.5.5 0 0 0-.5.5v1.5H5.5a.5.5 0 0 0-.5.5v1H4a.5.5 0 0 0-.354.146L2.08 8.71A6.494 6.494 0 0 1 1.5 8Z" />
                    </svg>
                    <span className="text-[10px] font-mono text-green-400">
                      mydentalclinic.com
                    </span>
                  </m.div>
                </div>

                <m.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-2 w-full"
                >
                  {METRICS.map((m) => (
                    <div
                      key={m.label}
                      className="flex-1 rounded-xl border border-white/[0.07] bg-white/3 py-2 flex flex-col items-center gap-0.5"
                    >
                      <span
                        className="text-[12px] font-bold"
                        style={{ color: m.color }}
                      >
                        {m.value}
                      </span>
                      <span className="text-[7.5px] text-white/50 font-mono">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </m.div>

                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="flex gap-2 w-full"
                >
                  <div className="flex-1 flex items-center gap-1.5 bg-[#161b22] border border-white/8 rounded-lg px-3 py-1.5">
                    <svg
                      className="w-3 h-3 text-green-400/60"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Z" />
                    </svg>
                    <span className="text-[9px] font-mono text-white/65 flex-1 truncate">
                      https://mydentalclinic.com
                    </span>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-orange-500 flex items-center gap-1 shrink-0">
                    <span className="text-[8.5px] font-bold text-white">
                      Visit
                    </span>
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z" />
                    </svg>
                  </div>
                </m.div>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#B23507] border-t border-white/6 shrink-0">
          <m.div
            animate={{
              backgroundColor:
                phase === "building"
                  ? "#d97706"
                  : phase === "domain"
                    ? "#3b82f6"
                    : phase === "success"
                      ? "#16a34a"
                      : "#374151",
            }}
            transition={{ duration: 0.4 }}
            className="w-2 h-2 rounded-full shrink-0"
          />
          <AnimatePresence mode="wait">
            <m.span
              key={phase}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.2 }}
              className="text-[8.5px] font-mono text-white"
            >
              {phase === "configure" && "Ready to deploy"}
              {phase === "building" && "Building…"}
              {phase === "domain" && "Configuring domain…"}
              {phase === "success" && "✓ Live at mydentalclinic.com"}
            </m.span>
          </AnimatePresence>
          <span className="ml-auto text-[8px] text-white font-mono">
            {phase === "building"
              ? `${progress}%`
              : phase === "success"
                ? "23s"
                : "—"}
          </span>
        </div>
      </div>

      {/* Floating live preview */}
      <AnimatePresence>
        {showCard && (
          <m.div
            initial={{ opacity: 0, x: 20, y: 10, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="absolute bottom-7 right-7 w-44 rounded-xl overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.12),0_20px_60px_rgba(0,0,0,0.4)] bg-white"
          >
            <div className="flex items-center gap-1 px-2 py-1.5 bg-zinc-100 border-b border-zinc-200">
              <div className="flex gap-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-white rounded text-[7px] font-mono text-zinc-500 text-center py-0.5 mx-1 border border-zinc-200 truncate">
                mydentalclinic.com
              </div>
            </div>
            <div className="bg-white">
              <div className="h-5 bg-blue-700 flex items-center px-2 gap-1">
                <div className="w-2 h-2 rounded-sm bg-white/80" />
                <div className="h-0.75 w-8 rounded bg-white/50" />
                <div className="ml-auto flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <div key={d} className="h-0.75 w-4 rounded bg-white/30" />
                  ))}
                </div>
              </div>
              <div className="px-3 py-2 flex flex-col gap-1 bg-blue-50">
                <div className="h-2 w-3/4 rounded-full bg-blue-900/20" />
                <div className="h-1 w-1/2 rounded-full bg-blue-900/10" />
                <div className="h-3 w-14 rounded-full bg-blue-700/80 mt-1" />
              </div>
              <div className="grid grid-cols-3 gap-1 px-2 py-2">
                {[0, 1, 2].map((d) => (
                  <div
                    key={d}
                    className="bg-zinc-50 rounded p-1 border border-zinc-100"
                  >
                    <div className="w-3 h-3 rounded bg-blue-200 mb-0.5" />
                    <div className="h-1 rounded-full bg-zinc-200 w-full" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-green-50 border-t border-green-100">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[7px] text-green-700 font-semibold">
                Live
              </span>
              <span className="ml-auto text-[6px] text-green-600/60 font-mono">
                98 perf
              </span>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
