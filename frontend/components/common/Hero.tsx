"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
          <Zap className="w-3.5 h-3.5" />
          EXPORT CODE TO THE TECH YOU LOVE
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight tracking-tight">
          Build websites{" "}
          <span className="bg-linear-to-r from-fuchsia-500 via-primary-600 to-indigo-500 bg-clip-text text-transparent animate-gradient-flow">
            visually
          </span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          A production-grade visual editor with drag-and-drop, live Tailwind
          editing, responsive preview, and clean HTML export.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/editor"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
          >
            Start Building
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#features"
            className="flex items-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};
export default Hero;
