"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Hash, Link2, Plus } from "lucide-react";

const steps = [
  { id: 1, title: "Connect sources once." },
  { id: 2, title: "Plug the agent." },
  { id: 3, title: "Choose access level." },
];

export default function HowItWorksCards() {
  const [active, setActive] = useState(1);

  return (
    <div
      className="mx-auto grid max-w-[1600px] grid-cols-1 overflow-hidden rounded-[32px] border border-white/10 bg-[#191919] md:grid-cols-[var(--cols)]"
      style={{
        ["--cols" as string]:
          active === 1
            ? "1.6fr 1fr 1fr"
            : active === 2
              ? "1fr 1.6fr 1fr"
              : "1fr 1fr 1.6fr",
      }}
    >
      {steps.map((step) => (
        <motion.div
          key={step.id}
          onMouseEnter={() => setActive(step.id)}
          className="relative min-h-[620px] cursor-pointer border-white/10 p-10 md:border-r last:border-r-0"
          animate={{
            background:
              active === step.id
                ? "radial-gradient(circle at 55% 35%, rgba(255,255,255,.13), transparent 18%), #202020"
                : "#171717",
          }}
          transition={{ duration: 0.45 }}
        >
          {step.id === 1 && <Sources active={active === 1} />}
          {step.id === 2 && <Token active={active === 2} />}
          {step.id === 3 && <Access active={active === 3} />}

          <div className="absolute bottom-16 left-10 right-10">
            <p className="mb-5 text-4xl font-light text-white/45">0{step.id}</p>

            <h3 className="mb-4 text-3xl font-bold tracking-[-0.04em]">
              {step.title}
            </h3>

            <p className="max-w-[650px] text-xl leading-9 text-white/45">
              {step.id === 1 &&
                "From hundreds of integrations, extract data, segment it and prepare for retrieval."}

              {step.id === 2 &&
                (active === 2
                  ? "Plug Claude Code, OpenClaw, Perplexity via MCP and make sure it has always up-to-date context."
                  : "Plug Claude Code, OpenClaw, Perple always up-to-date context.")}

              {step.id === 3 &&
                (active === 3
                  ? "On granular item-level or topical / confidence level."
                  : "On granular item-level or topical / cc")}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Sources({ active }: { active: boolean }) {
  const items = ["Notion", "Slack", "Gmail"];

  return (
    <motion.div
      animate={{
        x: active ? 80 : 35,
        y: active ? 20 : 0,
        scale: active ? 1.05 : 0.96,
      }}
      transition={{ duration: 0.45 }}
      className="mt-24 max-w-[430px] space-y-4"
    >
      {items.map((item, i) => (
        <motion.div
          key={item}
          animate={{ opacity: active || i !== 2 ? 1 : 0.75 }}
          className="flex h-[76px] items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.04] px-6 shadow-[inset_0_1px_0_rgba(255,255,255,.08)]"
        >
          <div className="flex items-center gap-4">
            <div className="grid size-11 place-items-center rounded-full bg-white/10 text-lg">
              {item === "Notion" ? "▣" : item === "Slack" ? "✣" : "M"}
            </div>
            <span className="text-xl font-bold text-white/85">{item}</span>
          </div>

          <span className="flex items-center gap-2 text-base font-bold text-white/65">
            <Link2 size={18} />
            Connect
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Token({ active }: { active: boolean }) {
  return (
    <motion.div
      animate={{
        x: active ? 120 : 20,
        y: active ? 45 : 100,
        scale: active ? 1.05 : 0.9,
      }}
      transition={{ duration: 0.45 }}
      className="mt-20 max-w-[430px] rounded-[22px] border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.08)]"
    >
      {!active ? (
        <>
          <div className="mb-6 flex gap-4">
            <div className="grid size-11 place-items-center rounded-xl border border-yellow-400/30 bg-yellow-400/15 text-yellow-300">
              <Hash size={24} />
            </div>

            <div>
              <h4 className="text-lg font-bold">
                Need a token for an MCP host?
              </h4>
              <p className="text-sm text-white/40">Just generate one!</p>
            </div>
          </div>

          <button className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-white text-lg font-bold text-black">
            <Plus size={20} />
            Generate token
          </button>
        </>
      ) : (
        <>
          <div className="mb-5 flex gap-4">
            <div className="grid size-11 place-items-center rounded-xl bg-emerald-500/25 text-emerald-300">
              <Check size={24} />
            </div>

            <div>
              <h4 className="text-lg font-bold">Token created</h4>
              <p className="text-sm text-white/40">
                Copy it now — it won’t be shown again.
              </p>
            </div>
          </div>

          <div className="flex h-16 items-center justify-between rounded-xl border border-dashed border-white/20 bg-white/[0.04] px-5 font-mono text-white/80">
            una_live_8f2b3c...d91a
            <Copy size={20} className="text-white/45" />
          </div>
        </>
      )}
    </motion.div>
  );
}

function Access({ active }: { active: boolean }) {
  const rows = [
    ["Exclude private", "Personal items stay yours", active],
    ["Exclude confidential", "Hide work-restricted notes", active],
    ["Exclude apps", "Pick which sources to omit", false],
  ] as const;

  return (
    <motion.div
      animate={{
        x: active ? 105 : 35,
        y: active ? 40 : 5,
        scale: active ? 1.06 : 0.95,
      }}
      transition={{ duration: 0.45 }}
      className="mt-20 max-w-[390px] rounded-[22px] border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.08)]"
    >
      <h4 className="mb-6 text-xl font-bold">Access for Claude</h4>

      <div className="space-y-5">
        {rows.map(([title, desc, on]) => (
          <div key={title} className="flex items-center justify-between">
            <div>
              <p className="text-base font-bold">{title}</p>
              <p className="text-sm text-white/35">{desc}</p>
            </div>

            <div
              className={`flex h-6 w-11 items-center rounded-full border p-0.5 ${
                on
                  ? "justify-end border-emerald-400/40 bg-emerald-500"
                  : "justify-start border-white/25 bg-white/10"
              }`}
            >
              <div className="size-4 rounded-full bg-white" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 flex justify-end">
        <button className="rounded-full bg-white/75 px-6 py-3 font-bold text-black">
          Save
        </button>
      </div>
    </motion.div>
  );
}
