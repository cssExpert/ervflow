import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — ERVFlow",
  description:
    "Get in touch with the ERVFlow team. We'd love to hear about your project and explore how we can help.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — ERVFlow",
    description: "Get in touch with the ERVFlow team.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
