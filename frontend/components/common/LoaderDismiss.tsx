"use client";

import { useEffect } from "react";

export default function LoaderDismiss() {
  useEffect(() => {
    const el = document.getElementById("ervflow-loader");
    if (!el) return;

    const dismiss = () => {
      el.classList.add("done");
      // Remove from DOM after transition ends to free memory
      el.addEventListener("transitionend", () => el.remove(), { once: true });
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }
  }, []);

  return null;
}
