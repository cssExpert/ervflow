"use client";
import { useEffect } from "react";

/**
 * Handles scroll-to-hash when the target section is dynamically loaded.
 * The browser's native scroll happens at navigation time, before lazy
 * components render. This polls for the element and scrolls once it appears.
 */
export default function HashScroller() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    let mounted = true;
    let attempts = 0;
    const maxAttempts = 20;

    const tryScroll = () => {
      if (!mounted) return;
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (++attempts < maxAttempts) {
        setTimeout(tryScroll, 200);
      }
    };

    setTimeout(tryScroll, 100);
    return () => { mounted = false; };
  }, []);

  return null;
}
