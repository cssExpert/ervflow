"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";

const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const Promotion = dynamic(() => import("@/components/home/Promotion"));
const Resources = dynamic(() => import("@/components/home/Resources"));
const FAQ = dynamic(() => import("@/components/home/FAQ"));
const FreeTrial = dynamic(() => import("@/components/common/FreeTrial"));

export default function HomePage() {
  return (
    <main className="min-h-screen relative bg-white dark:bg-black text-white z-2 overflow-clip">
      <div
        className="pointer-events-none fixed inset-0 -z-1 overflow-hidden"
        aria-hidden="true"
      >
        {/* Radial-gradient glows — replaced filter:blur to eliminate GPU repaint cost */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px]"
          style={{ background: "radial-gradient(ellipse at center, rgba(96,165,250,0.18) 0%, transparent 65%)" }} />
        <div className="absolute -top-10 -right-20 w-[500px] h-[400px]"
          style={{ background: "radial-gradient(ellipse at center, rgba(167,139,250,0.08) 0%, transparent 65%)" }} />
        <div className="absolute -bottom-10 -left-20 w-[450px] h-[350px]"
          style={{ background: "radial-gradient(ellipse at center, rgba(96,165,250,0.07) 0%, transparent 65%)" }} />
        <div className="absolute -bottom-10 -right-10 w-[400px] h-[350px]"
          style={{ background: "radial-gradient(ellipse at center, rgba(167,139,250,0.07) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_38%,hsl(var(--background))_30%,transparent_100%)]"></div>
      </div>

      <Hero />
      <Features />
      <Testimonials />
      <Promotion />
      <Resources />
      <FAQ />
      <FreeTrial />
    </main>
  );
}
