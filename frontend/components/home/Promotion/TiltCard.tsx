import React, { useState, useRef, useCallback, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  debugMode?: boolean;
}

const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
  ({ children, className = "", debugMode = false }, forwardedRef) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [forwardedRef],
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!internalRef.current) return;
      const card = internalRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
      setIsHovered(true);
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      setTilt({ x: rotateX, y: rotateY });
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
      setIsHovered(false);
    };

    return (
      <div
        ref={setRefs}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered
            ? "transform 0.08s ease-out"
            : "transform 0.5s ease-out",
        }}
        className={`relative rounded-[24px] border border-white/10 bg-[#0a0a0a] overflow-hidden group/card ${className}`}
      >
        {/* Spotlight overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.05), transparent 80%)`,
          }}
        />

        {/* Shiny border spotlight */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(250px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.12), transparent 50%)`,
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
            <div>X: {Math.round(mousePos.x)}px</div>
            <div>Y: {Math.round(mousePos.y)}px</div>
          </div>
        )}
      </div>
    );
  },
);

TiltCard.displayName = "TiltCard";
export default TiltCard;
