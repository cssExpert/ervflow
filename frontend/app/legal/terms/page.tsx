import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import LegalHero from "@/components/legal/LegalHero";
import TermsSections from "./TermsSections";
import type { TocItem } from "@/components/legal/TableOfContents";

export const metadata: Metadata = {
  title: "Terms of Service — ERVFlow",
  description:
    "These terms govern your use of ERVFlow and outline the responsibilities of both users and the platform.",
};

const TOC: TocItem[] = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "eligibility", label: "Eligibility" },
  { id: "user-accounts", label: "User Accounts" },
  { id: "subscription-billing", label: "Subscription & Billing" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "user-content", label: "User Content" },
  { id: "service-availability", label: "Service Availability" },
  { id: "limitation-of-liability", label: "Limitation of Liability" },
  { id: "termination", label: "Termination" },
  { id: "governing-law", label: "Governing Law" },
  { id: "changes-to-terms", label: "Changes to Terms" },
  { id: "contact-information", label: "Contact Information" },
];

export default function TermsPage() {
  return (
    <LegalLayout
      header={
        <LegalHero
          badge="Terms of Service"
          title="Terms of Service"
          description="These terms govern your use of ERVFlow and outline the responsibilities of both users and the platform. Please read them carefully."
          effectiveDate="June 15, 2026"
          lastUpdated="June 15, 2026"
          version="v1.0"
        />
      }
      tocItems={TOC}
      backHref="/legal"
      backLabel="Policy Center"
    >
      <TermsSections />
    </LegalLayout>
  );
}
