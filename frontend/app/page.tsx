import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";

const Features = dynamic(() => import("@/components/home/Features"));
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
        <div
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-125"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(247,98,53,0.08) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -top-10 -right-20 w-96 h-96"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-80 h-80"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(59,130,246,0.06) 0%, transparent 70%)",
            }}
          />
        </div>
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
