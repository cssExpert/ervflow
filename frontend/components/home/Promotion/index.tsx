"use client";

import { useState } from "react";
import AnalyticsCard from "./AnalyticsCard";
import ABTestingCard from "./ABTestingCard";
import SEOCard from "./SEOCard";

export default function Promotion() {
  const [debugMode] = useState(false);
  const [liveVisitors] = useState(420);

  const [selectedABVersion, setSelectedABVersion] = useState("B");
  const [abActiveTab, setAbActiveTab] = useState("Pages");

  return (
    <div className="min-h-screen pt-20 text-white font-sans overflow-x-hidden selection:bg-neutral-800 selection:text-white pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 xl:px-0 mt-0">
        <div className="max-w-4xl text-center mx-auto mb-15">
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.05] text-balance mb-5">
            Scale{" "}
            <span className="bg-linear-to-r from-[#CEFF00] via-primary-500 to-violet-500 bg-clip-text text-transparent animate-gradient-flow">
              without
            </span>{" "}
            switching tools
          </h3>
          <p className="text-base sm:text-lg text-zinc-800 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Build, edit, customize, and manage your entire website experience
            from one powerful visual editor — no coding or platform switching
            required.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <AnalyticsCard debugMode={debugMode} liveVisitors={liveVisitors} />

          <div className="space-y-6 flex flex-col h-full">
            <ABTestingCard
              debugMode={debugMode}
              selectedABVersion={selectedABVersion}
              setSelectedABVersion={setSelectedABVersion}
              abActiveTab={abActiveTab}
              setAbActiveTab={setAbActiveTab}
            />

            <SEOCard debugMode={debugMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
