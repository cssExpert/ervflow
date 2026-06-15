"use client";

const GlowBlob = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-125"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(247,98,53,0.125) 0%, transparent 70%)",
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
  );
};

export default GlowBlob;
