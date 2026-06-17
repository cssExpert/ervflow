import type { Metadata } from "next";
import Script from "next/script";
import ExpertHero from "@/components/company/experts/ExpertHero";
import ServicesSection from "@/components/company/experts/ServicesSection";
import HowItWorks from "@/components/company/experts/HowItWorks";
import ExpertDirectory from "@/components/company/experts/ExpertDirectory";
import ExpertMetrics from "@/components/company/experts/ExpertMetrics";
import CompanyCTA from "@/components/company/shared/CompanyCTA";

export const metadata: Metadata = {
  title: "Hire an ERVFlow Expert — Certified Professionals",
  description:
    "Work with certified ERVFlow professionals to design, build, optimize, and launch your website faster. Browse our expert network today.",
  openGraph: {
    title: "Hire an ERVFlow Expert",
    description: "Connect with certified ERVFlow professionals for your next project.",
    type: "website",
  },
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
