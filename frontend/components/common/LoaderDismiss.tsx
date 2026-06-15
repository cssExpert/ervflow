"use client";

import { useEffect } from "react";

export default function LoaderDismiss() {
  useEffect(() => {
    const loader = document.getElementById("ervflow-loader");
    if (!loader) return;

    loader.classList.add("is-hidden");
  }, []);

  return null;
}
