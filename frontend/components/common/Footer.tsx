"use client";

// import Image from "next/image";

import Link from "next/link";
import { Heart } from "lucide-react";
import Icon from "@/components/common/Icon";
import Social from "./Social";
import FooterTextLogo from "./FooterTextLogo";

const companyLinks = [
  {
    href: "/",
    label: "About",
  },
  {
    href: "/",
    label: "Hire an ERVFlow Expert",
  },
];

const productLinks = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/pricing",
    label: "Pricing",
  },
  {
    href: "/",
    label: "Updates",
  },
];

const resourcesLinks = [
  {
    href: "/",
    label: "Blog",
  },
  {
    href: "/",
    label: "Help Center",
  },
  {
    href: "/",
    label: "Status",
  },
];

const legalLinks = [
  {
    href: "/",
    label: "Policy Center",
  },
  {
    href: "/",
    label: "Privacy Notice",
  },
  {
    href: "/",
    label: "Terms of Services",
  },
];

const NAV_GROUPS = [
  { heading: "Company", links: companyLinks },
  { heading: "Product", links: productLinks },
  { heading: "Resources", links: resourcesLinks },
  { heading: "Legal", links: legalLinks },
];

const Footer = () => {
  return (
    <>
      <footer className="w-full px-6 dark:border-zinc-800/60 py-20 bg-white dark:bg-black backdrop-blur-lg">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="w-full grid gap-10 md:grid-cols-3">
            <div className="col-span-1 space-y-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary shadow-glow-brand text-white">
                <Icon
                  name="Logo"
                  size="32"
                  fill="currentColor"
                  role="button"
                  className="w-8 h-8"
                />
              </div>
              <p className="font-sans text-sm text-slate-700 dark:text-muted-foreground leading-relaxed max-w-sm mb-6">
                ERVFlow is a modern all-in-one business operating platform —
                CRM, CMS, SEO, Payments, Store, Email, and more.
              </p>
              {/* Social icons */}
              <Social />
            </div>

            <div className="col-span-2 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0">
              {NAV_GROUPS.map(({ heading, links }) => (
                <div key={heading} className="w-full">
                  <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4">
                    {heading}
                  </h3>
                  <ul className="space-y-3">
                    {links.map(({ href, label }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          prefetch={false}
                          className="group relative inline-flex items-center text-xs md:text-sm text-slate-700 dark:text-muted-foreground hover:text-primary transition-all duration-300 hover:pl-2.5"
                        >
                          <span className="opacity-0 absolute left-0 group-hover:opacity-100 w-1 h-1 rounded-full bg-primary transition-all duration-500 delay-100"></span>
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* <div className="w-full mx-auto relative min-h-21.75 border-zinc-300/20 dark:border-zinc-800/60 bg-zinc-100 dark:bg-black">
        <div
          className="relative -bottom-8.5 bg-zinc-100 dark:bg-black text-center uppercase text-[clamp(4rem,-1.5rem+21.5909vw,15.625rem)] leading-none font-black text-transparent font-sans"
          style={{
            WebkitTextStroke: "1px var(--stroke-color)",
            WebkitTextFillColor: "transparent",
          }}
        >
          ERVFlow
        </div>
      </div> */}

      {/* Bottom bar */}
      <div className="border-t border-black/10 dark:border-zinc-800/60 px-6 py-4.5 md:py-6 bg-white dark:bg-black backdrop-blur-lg">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            suppressHydrationWarning
            className="font-sans text-sm text-slate-700 dark:text-muted-foreground leading-relaxed flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0"
          >
            <span suppressHydrationWarning>© {new Date().getFullYear()}</span>
            <span className="font-merienda text-black dark:text-white whitespace-nowrap">
              ERV<span className="text-primary">Flow</span>
            </span>
            <span className="whitespace-nowrap inline-flex items-center gap-1">
              · Made with{" "}
              <Heart size={12} className="text-primary fill-primary" /> using
              Next.js &amp; Tailwind CSS
            </span>
          </p>
          <p className="font-sans text-sm text-slate-700 dark:text-muted-foreground leading-relaxed">
            All rights reserved.
          </p>
        </div>
      </div>

      <FooterTextLogo />
    </>
  );
};

export default Footer;
