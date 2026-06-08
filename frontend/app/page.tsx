"use client";

import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import Promotion from "@/components/home/Promotion";
import FAQ from "@/components/home/FAQ";
import Resources from "@/components/home/Resources";
import FreeTrial from "@/components/common/FreeTrial";

export default function HomePage() {
  return (
    <main className="min-h-screen relative bg-black text-white z-2">
      <div
        className="pointer-events-none fixed inset-0 -z-1 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-w-175 h-125 rounded-full bg-blue-400/30 dark:bg-blue-500/12 blur-[120px]"></div>
        <div className="absolute -top-10 -right-20 w-125 h-100 rounded-full bg-violet-400/8 dark:bg-violet-500/10 blur-[110px]"></div>
        <div className="absolute -bottom-10 -left-20 w-112.5 h-87.5 rounded-full bg-blue-400/7 dark:bg-blue-600/8 blur-[110px]"></div>
        <div className="absolute -bottom-10 -right-10 w-100 h-87.5 rounded-full bg-violet-400/7 dark:bg-violet-600/7 blur-[100px]"></div>
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
