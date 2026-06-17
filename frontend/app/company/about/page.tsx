import type { Metadata } from "next";
import Script from "next/script";
import AboutHero from "@/components/company/about/AboutHero";
import MissionBlock from "@/components/company/about/MissionBlock";
import DifferentiatorGrid from "@/components/company/about/DifferentiatorGrid";
import AudienceValues from "@/components/company/about/AudienceValues";
import CompanyCTA from "@/components/company/shared/CompanyCTA";

export const metadata: Metadata = {
  title: "About ERVFlow — Building the Future of Website Creation",
  description:
    "Learn about ERVFlow's mission to make professional website creation fast, collaborative, and accessible for agencies, freelancers, and enterprise teams.",
  openGraph: {
    title: "About ERVFlow",
    description: "AI-powered website creation for modern teams.",
    type: "website",
  },
  alternates: { canonical: "/company/about" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ERVFlow",
  url: "https://ervflow.com",
  description: "AI-powered visual website builder for modern teams",
  foundingDate: "2024",
};

export default function AboutPage() {
  return (
    <>
      <Script
        id="about-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <main>
        <AboutHero />
        <MissionBlock />
        <DifferentiatorGrid />
        <AudienceValues />
        <CompanyCTA
          heading="Ready to build your next website?"
          sub="Create, customize, and publish with ERVFlow. Start free — no credit card required."
          primary={{ label: "Start for Free", href: "/signup" }}
          secondary={{ label: "Book a Demo", href: "/demo" }}
        />
      </main>
    </>
  );
}
