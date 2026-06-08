"use client";

import Link from "next/link";

const FreeTrial = () => {
  return (
    <section className="w-full px-6 border-t border-zinc-800/60 py-15 bg-primary-600 backdrop-blur-lg">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between">
        <h2 className="mb-5 md:mb-0 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center md:text-start text-white">
          Build your business on{" "}
          <span className="font-extrabold bg-linear-to-r from-fuchsia-500 via-black to-white bg-clip-text text-transparent animate-gradient-flow">
            ERVFlow
          </span>
        </h2>
        <Link
          href="/"
          className="inline-flex items-center border-[1.5px] border-white text-black bg-white hover:border-black hover:text-white hover:bg-black px-10 py-4 rounded-sm text-base md:text-md font-semibold transition-all shadow-md"
        >
          Start Free Trial
        </Link>
      </div>
    </section>
  );
};

export default FreeTrial;
