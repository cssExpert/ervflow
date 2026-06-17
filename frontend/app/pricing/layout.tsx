import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — ERVFlow",
  description:
    "Simple, transparent pricing for every team. Start free, scale as you grow with ERVFlow's AI-powered visual website builder.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — ERVFlow",
    description: "Simple, transparent pricing for every team. Start free, scale as you grow.",
    url: "/pricing",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
