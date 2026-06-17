import type { Metadata } from "next";
import Script from "next/script";
import dynamic from "next/dynamic";
import ExpertHero from "@/components/company/experts/ExpertHero";

const ServicesSection = dynamic(() => import("@/components/company/experts/ServicesSection"));
const HowItWorks = dynamic(() => import("@/components/company/experts/HowItWorks"));
const ExpertDirectory = dynamic(() => import("@/components/company/experts/ExpertDirectory"));
const ExpertMetrics = dynamic(() => import("@/components/company/experts/ExpertMetrics"));
const CompanyCTA = dynamic(() => import("@/components/company/shared/CompanyCTA"));

export const metadata: Metadata = {
  title: "Hire an ERVFlow Expert — Certified Professionals",
  description:
    "Work with certified ERVFlow professionals to design, build, optimize, and launch your website faster. Browse our expert network today.",
  openGraph: {
    title: "Hire an ERVFlow Expert",
    description: "Connect with certified ERVFlow professionals for your next project.",
    type: "website",
  },
  alternates: { canonical: "/company/experts" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "ERVFlow Expert Network",
  provider: {
    "@type": "Organization",
    name: "ERVFlow",
    url: "https://ervflow.com",
  },
  description:
    "Certified ERVFlow professionals for website design, development, and optimization",
  serviceType: "Web Design and Development",
};

export default function ExpertsPage() {
  return (
    <>
      <Script
        id="experts-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <main>
        <ExpertHero />
        <ServicesSection />
        <HowItWorks />
        <ExpertDirectory />
        <ExpertMetrics />
        <CompanyCTA
          heading="Ready to get expert help?"
          sub="Connect with a certified ERVFlow expert today and get your project done right — on time, on budget."
          primary={{ label: "Find an Expert", href: "#directory" }}
          secondary={{ label: "Become an Expert", href: "#become-expert" }}
        />
      </main>
    </>
  );
}
