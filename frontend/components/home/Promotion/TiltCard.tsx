"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  debugMode?: boolean;
}

const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
  ({ children, className = "", debugMode = false }, forwardedRef) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // Cached bounding rect — avoids forced reflow on every mousemove
    const cachedRect = useRef<{
      left: number;
      top: number;
      width: number;
      height: number;
    } | null>(null);
    const debugMousePos = useRef({ x: 0, y: 0 });

    const updateRect = useCallback(() => {
      const el = internalRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      cachedRect.current = {
        left: r.left + window.scrollX,
        top: r.top + window.scrollY,
        width: r.width,
        height: r.height,
      };
    }, []);

    useEffect(() => {
      const el = internalRef.current;
      if (!el) return;
      updateRect();
      const ro = new ResizeObserver(updateRect);
      ro.observe(el);
      window.addEventListener("scroll", updateRect, { passive: true });
      return () => {
        ro.disconnect();
        window.removeEventListener("scroll", updateRect);
      };
    }, [updateRect]);

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        (internalRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (
            forwardedRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = node;
        }
      },
      [forwardedRef],
    );

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const card = internalRef.current;
        if (!card) return;

        // Use cached rect — no forced reflow on mousemove
        const rect = cachedRect.current;
        if (!rect) return;

        const x = e.clientX - (rect.left - window.scrollX);
        const y = e.clientY - (rect.top - window.scrollY);

        if (debugMode) debugMousePos.current = { x, y };

        setIsHovered(true);
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -7;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 7;
        setTilt({ x: rotateX, y: rotateY });

        // CSS var writes — no layout read, so no forced reflow
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      },
      [debugMode],
    );

    const handleMouseLeave = useCallback(() => {
      setTilt({ x: 0, y: 0 });
      setIsHovered(false);
    }, []);

    return (
      <div
        ref={setRefs}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered
            ? "transform 0.08s ease-out, box-shadow 0.2s ease-out"
            : "transform 0.5s ease-out, box-shadow 0.5s ease-out",
          boxShadow: isHovered
            ? [
                "0 0 0 1px rgba(255,255,255,0.28)",
                "0 0 18px rgba(255,255,255,0.14)",
                "0 0 50px rgba(255,255,255,0.07)",
                "0 0 100px rgba(255,255,255,0.03)",
                "inset 0 0 24px rgba(255,255,255,0.025)",
              ].join(", ")
            : "0 0 0 1px rgba(255,255,255,0.07)",
        }}
        className={`relative rounded-[24px] border-0 bg-white dark:bg-[#0a0a0a] overflow-hidden group/card ${className}`}
      >
        {/* Cursor-follow spotlight */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0,0,0,0.04), transparent 80%)`,
          }}
        />
        {/* Brand-color spotlight — light mode only */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-0 group-hover/card:opacity-100 dark:group-hover/card:opacity-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(247,98,53,0.06), transparent 80%)`,
          }}
        />
        {/* Shiny inner-border spotlight */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(250px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,0.12), transparent 50%)`,
            padding: "1px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {children}

        {debugMode && (
          <div className="absolute top-4 right-4 pointer-events-none z-50 bg-black/80 border border-yellow-500/50 rounded-lg p-2 text-[10px] font-mono text-yellow-500 select-none space-y-1">
            <div>Tilt X: {tilt.x.toFixed(2)}°</div>
            <div>Tilt Y: {tilt.y.toFixed(2)}°</div>
            <div>X: {Math.round(debugMousePos.current.x)}px</div>
            <div>Y: {Math.round(debugMousePos.current.y)}px</div>
          </div>
        )}
      </div>
    );
  },
);

TiltCard.displayName = "TiltCard";
export default TiltCard;
