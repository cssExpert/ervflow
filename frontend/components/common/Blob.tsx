"use client";

import type { ComponentProps } from "react";
import { m } from "framer-motion";

/* ── Animated blob ──────────────────────────────────────────────────── */
type MotionDivProps = ComponentProps<typeof m.div>;

function Blob({
  className,
  animate,
  transition,
}: {
  className: string;
  animate: MotionDivProps["animate"];
  transition: MotionDivProps["transition"];
}) {
  return (
    <m.div
      aria-hidden="true"
      className={`pointer-events-none absolute blur-[120px] ${className}`}
      animate={animate}
      transition={transition}
    />
  );
}

const AddressBar = () => {
  return (
    <>
      <Blob
        className="h-130 w-130 rounded-full bg-primary-500/18 -top-20 -left-32"
        animate={{
          borderRadius: [
            "60% 40% 70% 30% / 50% 60% 40% 70%",
            "40% 60% 30% 70% / 70% 30% 60% 40%",
            "70% 30% 50% 50% / 40% 60% 70% 30%",
            "60% 40% 70% 30% / 50% 60% 40% 70%",
          ],
          x: [0, 60, -30, 0],
          y: [0, -50, 70, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <Blob
        className="h-100 w-100 rounded-full bg-violet-500/12 bottom-0 -right-24"
        animate={{
          borderRadius: [
            "40% 60% 50% 50% / 60% 40% 70% 30%",
            "70% 30% 60% 40% / 40% 60% 30% 70%",
            "50% 50% 40% 60% / 70% 30% 50% 50%",
            "40% 60% 50% 50% / 60% 40% 70% 30%",
          ],
          x: [0, -50, 40, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <Blob
        className="h-75 w-75 rounded-full bg-blue-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          borderRadius: [
            "50% 50% 60% 40% / 40% 70% 30% 60%",
            "60% 40% 40% 60% / 60% 40% 60% 40%",
            "40% 60% 70% 30% / 30% 60% 40% 70%",
            "50% 50% 60% 40% / 40% 70% 30% 60%",
          ],
          x: [0, 80, -60, 20, 0],
          y: [0, -40, 60, -20, 0],
          scale: [1, 1.12, 0.92, 1.04, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
};

export default AddressBar;
