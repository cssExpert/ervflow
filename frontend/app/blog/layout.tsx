import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — ERVFlow",
  description:
    "Deep dives into Next.js, TypeScript, AI integration, CSS architecture, and modern DevOps — written by the ERVFlow team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — ERVFlow",
    description: "Deep dives into Next.js, TypeScript, AI integration, and modern web development.",
    url: "/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
