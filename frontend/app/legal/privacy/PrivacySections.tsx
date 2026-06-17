import Link from "next/link";
import { Mail } from "lucide-react";
import LegalSection from "@/components/legal/LegalSection";
import VersionHistory from "@/components/legal/VersionHistory";

export default function PrivacySections() {
  return (
    <>
      <LegalSection id="information-we-collect" title="Information We Collect">
        <p>
          We collect information you provide directly, information collected
          automatically when you use ERVFlow, and data from third-party sources.
        </p>
        <h3>Account &amp; Profile Data</h3>
        <ul>
          <li>Name, email address, and password (stored as a bcrypt hash)</li>
          <li>Profile photo and display preferences</li>
          <li>Company name and role, if provided</li>
        </ul>
        <h3>Billing Information</h3>
        <ul>
          <li>Subscription plan and billing cycle</li>
          <li>
            Payment method details — processed securely by Stripe; we never
            store card numbers
          </li>
          <li>Invoice history and transaction records</li>
        </ul>
        <h3>Usage &amp; Interaction Data</h3>
        <ul>
          <li>
            Features accessed, pages visited, and time spent in the editor
          </li>
          <li>Projects created, templates used, and AI generation counts</li>
          <li>Error logs and performance diagnostics to improve reliability</li>
        </ul>
        <h3>Device &amp; Technical Data</h3>
        <ul>
          <li>Browser type, operating system, and screen resolution</li>
          <li>IP address and approximate geolocation (country/region level)</li>
          <li>Session identifiers and authentication tokens</li>
        </ul>
      </LegalSection>

      <LegalSection id="how-we-use-information" title="How We Use Information">
        <p>We use the information we collect to operate and improve ERVFlow:</p>
        <ul>
          <li>
            <strong>Service delivery</strong> — authenticate accounts, render
            projects, and process subscriptions
          </li>
          <li>
            <strong>Personalization</strong> — remember preferences, settings,
            and suggested templates
          </li>
          <li>
            <strong>Security &amp; fraud prevention</strong> — detect unusual
            activity and enforce our Acceptable Use Policy
          </li>
          <li>
            <strong>Product improvement</strong> — analyze aggregate usage to
            prioritize features and fix issues
          </li>
          <li>
            <strong>Communications</strong> — send service announcements,
            security alerts, and (with consent) product news
          </li>
          <li>
            <strong>Legal obligations</strong> — comply with applicable laws and
            enforce our Terms of Service
          </li>
        </ul>
        <p>
          We do not sell your personal data or use your project content to train
          AI models without explicit written consent.
        </p>
      </LegalSection>

      <LegalSection id="cookies-tracking" title="Cookies & Tracking">
        <p>
          ERVFlow uses cookies and similar technologies for core functionality
          and to understand platform usage.
        </p>
        <h3>Essential Cookies</h3>
        <p>
          Required for the platform to function — session tokens, CSRF
          protection, and authentication state. Cannot be disabled without
          breaking the service.
        </p>
        <h3>Analytics Cookies</h3>
        <p>
          We use privacy-respecting analytics (Vercel Analytics) to understand
          aggregate usage. These do not track you across third-party sites.
        </p>
        <h3>Marketing Cookies</h3>
        <p>
          Used only with your explicit consent. Manage preferences at any time
          below.
        </p>
        <div className="mt-4">
          <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            Manage Cookie Preferences
          </button>
        </div>
      </LegalSection>

      <LegalSection id="third-party-services" title="Third-Party Services">
        <p>
          We work with carefully vetted third-party providers, each bound by a
          data processing agreement:
        </p>
        <ul>
          <li>
            <strong>Analytics</strong> — Vercel Analytics (privacy-first, no
            cross-site tracking)
          </li>
          <li>
            <strong>Payments</strong> — Stripe (PCI-DSS Level 1 compliant)
          </li>
          <li>
            <strong>Cloud infrastructure</strong> — Vercel and AWS (ISO 27001,
            SOC 2)
          </li>
          <li>
            <strong>Email delivery</strong> — Resend (transactional
            notifications only)
          </li>
          <li>
            <strong>Error monitoring</strong> — Sentry (no PII in error traces)
          </li>
        </ul>
        <p>We do not share personal data with advertisers or data brokers.</p>
      </LegalSection>

      <LegalSection id="data-retention" title="Data Retention">
        <ul>
          <li>
            <strong>Account data</strong> — retained while active and for 90
            days after deletion
          </li>
          <li>
            <strong>Billing records</strong> — retained for 7 years for
            financial record-keeping
          </li>
          <li>
            <strong>Usage analytics</strong> — aggregated for 24 months; raw
            events purged after 90 days
          </li>
          <li>
            <strong>Support communications</strong> — retained for 3 years
          </li>
          <li>
            <strong>Backups</strong> — encrypted, 30-day rolling retention
          </li>
        </ul>
        <p>
          You can request deletion at any time. We will honor requests within 30
          days, subject to legal obligations.
        </p>
      </LegalSection>

      <LegalSection
        id="international-transfers"
        title="International Transfers"
      >
        <p>
          ERVFlow is operated from the United States. Data may be transferred to
          and processed in the US and other countries. Where required, we
          implement Standard Contractual Clauses (SCCs) approved by the European
          Commission. Enterprise customers can request regional data hosting.
        </p>
      </LegalSection>

      <LegalSection id="your-rights" title="Your Rights">
        <p>
          Depending on your location, you may have the following rights. Submit
          requests to{" "}
          <a href="mailto:privacy@ervflow.com">privacy@ervflow.com</a>.
        </p>
        <ul>
          <li>
            <strong>Access</strong> — request a copy of your personal data
          </li>
          <li>
            <strong>Rectification</strong> — correct inaccurate or incomplete
            information
          </li>
          <li>
            <strong>Erasure</strong> — request deletion of your personal data
          </li>
          <li>
            <strong>Portability</strong> — export your data from Settings →
            Account → Export Data
          </li>
          <li>
            <strong>Objection</strong> — object to processing based on
            legitimate interests
          </li>
          <li>
            <strong>Withdraw consent</strong> — opt out of marketing at any time
            via account settings
          </li>
        </ul>
        <p>
          We respond to all requests within 30 days and may need to verify your
          identity.
        </p>
      </LegalSection>

      <LegalSection id="security-measures" title="Security Measures">
        <ul>
          <li>All data in transit protected with TLS 1.3</li>
          <li>Data at rest encrypted with AES-256</li>
          <li>Production access restricted to authorized personnel via MFA</li>
          <li>Regular penetration tests and security audits</li>
          <li>Infrastructure hosted on SOC 2 Type II certified providers</li>
          <li>Responsible disclosure program for security researchers</li>
        </ul>
        <p>
          To report a vulnerability:{" "}
          <a href="mailto:security@ervflow.com">security@ervflow.com</a>
        </p>
      </LegalSection>

      <LegalSection id="childrens-privacy" title="Children's Privacy">
        <p>
          ERVFlow is not intended for individuals under 16. We do not knowingly
          collect data from children. If you believe we have done so, contact us
          at <a href="mailto:privacy@ervflow.com">privacy@ervflow.com</a> and we
          will promptly delete it.
        </p>
      </LegalSection>

      <LegalSection id="changes-to-notice" title="Changes to This Notice">
        <p>
          We may update this Privacy Notice from time to time. For material
          changes, we will notify you at least 30 days in advance by email and
          via an in-app banner. Continued use after the effective date
          constitutes acceptance.
        </p>
      </LegalSection>

      <LegalSection id="contact-us" title="Contact Us">
        <div className="mt-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 p-4 flex items-start gap-3">
          <Mail className="w-5 h-5 text-zinc-400 mt-1.5 shrink-0" />
          <div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-zinc-800 dark:text-zinc-200">
              Privacy Team
            </p>
            <Link
              href="mailto:privacy@ervflow.com"
              className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              privacy@ervflow.com
            </Link>
            <p className="text-xs text-zinc-500 mt-1">
              We aim to respond within 5 business days.
            </p>
          </div>
        </div>
      </LegalSection>

      <div className="mt-10">
        <VersionHistory
          version="v1.0"
          effectiveDate="June 15, 2026"
          lastUpdated="June 15, 2026"
          changelog={[
            {
              date: "2026-06-15",
              note: "Initial publication of Privacy Notice.",
            },
          ]}
        />
      </div>
    </>
  );
}
