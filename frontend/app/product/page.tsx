import type { Metadata } from "next";
import Script from "next/script";
import dynamic from "next/dynamic";
import ProductHero from "@/components/product/ProductHero";
import SocialProof from "@/components/product/SocialProof";

const ValueProp = dynamic(() => import("@/components/product/ValueProp"));
const WorkflowTimeline = dynamic(() => import("@/components/product/WorkflowTimeline"));
const FeatureShowcase = dynamic(() => import("@/components/product/FeatureShowcase"));
const ComparisonTable = dynamic(() => import("@/components/product/ComparisonTable"));
const UseCasesGrid = dynamic(() => import("@/components/product/UseCasesGrid"));
const CompanyCTA = dynamic(() => import("@/components/company/shared/CompanyCTA"));

export const metadata: Metadata = {
  title: "Product — ERVFlow | AI-Powered Website Builder",
  description:
    "Generate, customize, and publish production-ready websites with ERVFlow's AI-powered visual builder. Designed for agencies, freelancers, and enterprise teams.",
  openGraph: {
    title: "ERVFlow Product — Build Websites with AI",
    description:
      "AI generation, visual editor, CMS, and one-click publishing in one platform.",
    type: "website",
  },
  alternates: { canonical: "/product" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ERVFlow",
  applicationCategory: "WebApplication",
  description:
    "AI-powered visual website builder for agencies, freelancers, and enterprise teams.",
  url: "https://ervflow.com/product",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free tier available",
  },
};

export default function ProductPage() {
  return (
    <>
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <main>
        <ProductHero />
        <SocialProof />
        <ValueProp />
        <WorkflowTimeline />
        <FeatureShowcase />
        <ComparisonTable />
        <UseCasesGrid />
        <CompanyCTA
          heading="Ready to Build Faster with AI?"
          sub="Start generating your first website in minutes. No credit card required."
          primary={{ label: "Start Building Free", href: "/signup" }}
          secondary={{ label: "Watch Demo", href: "/contact" }}
        />
      </main>
    </>
  );
}
