import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Status — ERVFlow",
  description:
    "Live status for ERVFlow services. Check uptime, incidents, and performance across all platform components.",
  alternates: { canonical: "/status" },
  openGraph: {
    title: "ERVFlow System Status",
    description: "Live uptime and incident status for all ERVFlow services.",
    type: "website",
  },
};

export default function StatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
