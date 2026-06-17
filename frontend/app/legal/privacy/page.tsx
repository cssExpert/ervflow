import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import LegalHero from "@/components/legal/LegalHero";
import PrivacySections from "./PrivacySections";
import type { TocItem } from "@/components/legal/TableOfContents";

export const metadata: Metadata = {
  title: "Privacy Notice — ERVFlow",
  description:
    "Your privacy matters. This notice explains how ERVFlow collects, uses, stores, and protects your information.",
};

const TOC: TocItem[] = [
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-information", label: "How We Use Information" },
  { id: "cookies-tracking", label: "Cookies & Tracking" },
  { id: "third-party-services", label: "Third-Party Services" },
  { id: "data-retention", label: "Data Retention" },
  { id: "international-transfers", label: "International Transfers" },
  { id: "your-rights", label: "Your Rights" },
  { id: "security-measures", label: "Security Measures" },
  { id: "childrens-privacy", label: "Children's Privacy" },
  { id: "changes-to-notice", label: "Changes to This Notice" },
  { id: "contact-us", label: "Contact Us" },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      header={
        <LegalHero
          badge="Privacy Notice"
          title="Privacy Notice"
          description="Your privacy matters. This notice explains how ERVFlow collects, uses, stores, and protects your information when you use our platform."
          effectiveDate="June 15, 2026"
          lastUpdated="June 15, 2026"
          version="v1.0"
        />
      }
      tocItems={TOC}
      backHref="/legal"
      backLabel="Policy Center"
    >
      <PrivacySections />
    </LegalLayout>
  );
}
