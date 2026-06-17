import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — ERVFlow",
  description:
    "UI/UX design, frontend development, AI integration, performance optimisation, and more. Explore ERVFlow's full service offering.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — ERVFlow",
    description: "UI/UX design, frontend development, AI integration and more.",
    url: "/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
