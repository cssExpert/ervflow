import Link from "next/link";
import { Mail } from "lucide-react";
import LegalSection from "@/components/legal/LegalSection";
import VersionHistory from "@/components/legal/VersionHistory";

export default function TermsSections() {
  return (
    <>
      <LegalSection id="acceptance" title="Acceptance of Terms">
        <p>
          By accessing or using ERVFlow (&ldquo;the Service&rdquo;), you agree
          to be bound by these Terms of Service. If you do not agree, you may
          not use the Service. These Terms form a legally binding agreement
          between you and ERVFlow, Inc.
        </p>
      </LegalSection>

      <LegalSection id="eligibility" title="Eligibility">
        <p>To use ERVFlow, you must:</p>
        <ul>
          <li>
            Be at least 18 years of age or the age of legal majority in your
            jurisdiction
          </li>
          <li>Have the legal capacity to enter into binding contracts</li>
          <li>
            Not be prohibited from receiving services under applicable law
          </li>
          <li>
            If registering for an organization, have authority to bind that
            organization
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="user-accounts" title="User Accounts">
        <p>You are responsible for:</p>
        <ul>
          <li>
            <strong>Account security</strong> — maintaining credential
            confidentiality and enabling two-factor authentication
          </li>
          <li>
            <strong>Accurate information</strong> — providing truthful, current
            registration details and keeping them updated
          </li>
          <li>
            <strong>All account activity</strong> — all actions taken under your
            credentials, whether authorized by you or not
          </li>
          <li>
            <strong>Prompt notification</strong> — immediately reporting
            suspected unauthorized access to{" "}
            <a href="mailto:security@ervflow.com">security@ervflow.com</a>
          </li>
        </ul>
        <p>
          Sharing account credentials or allowing multiple users on a single
          account is not permitted.
        </p>
      </LegalSection>

      <LegalSection id="subscription-billing" title="Subscription & Billing">
        <h3>Plans &amp; Pricing</h3>
        <p>
          ERVFlow offers Free, Pro, and Growth tiers as described on our{" "}
          <Link
            href="/pricing"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            Pricing page
          </Link>
          . Paid plans are billed monthly or annually.
        </p>
        <h3>Automatic Renewal</h3>
        <p>
          Subscriptions renew automatically at the end of each billing period
          unless cancelled beforehand. You authorize recurring charges to your
          payment method on file.
        </p>
        <h3>Refund Policy</h3>
        <p>
          Annual subscriptions may be refunded within 14 days of purchase.
          Monthly subscriptions are non-refundable once the billing period has
          begun. Email{" "}
          <a href="mailto:billing@ervflow.com">billing@ervflow.com</a> for
          refund requests.
        </p>
        <h3>Cancellation</h3>
        <p>
          Cancel anytime from Settings → Billing. Your subscription remains
          active until the end of the current period. No pro-rated refunds are
          provided for monthly plans.
        </p>
        <h3>Price Changes</h3>
        <p>
          We provide 30 days&apos; advance notice of pricing changes to existing
          subscribers via email.
        </p>
      </LegalSection>

      <LegalSection id="acceptable-use" title="Acceptable Use">
        <p>The following are expressly prohibited:</p>
        <ul>
          <li>Hosting or distributing illegal, harmful, or abusive content</li>
          <li>Uploading malicious code, viruses, or exploits of any kind</li>
          <li>Abusing AI features to produce spam, misinformation, or CSAM</li>
          <li>
            Attempting unauthorized access to our systems, other accounts, or
            infrastructure
          </li>
          <li>
            Scraping or data-mining the platform without written permission
          </li>
          <li>Circumventing subscription limits or usage quotas</li>
          <li>
            Reselling or sublicensing platform access without written consent
          </li>
          <li>Impersonating ERVFlow, its employees, or other users</li>
          <li>
            Any activity violating applicable local, national, or international
            law
          </li>
        </ul>
        <p>
          Violations may result in immediate suspension or termination. We
          report unlawful conduct to appropriate authorities.
        </p>
      </LegalSection>

      <LegalSection id="intellectual-property" title="Intellectual Property">
        <h3>ERVFlow&apos;s Property</h3>
        <p>
          ERVFlow and its licensors retain all rights to the platform software,
          branding, built-in component libraries, design systems, templates, and
          documentation.
        </p>
        <h3>Your Property</h3>
        <p>
          You retain full ownership of all content you create on ERVFlow,
          including uploaded assets, published websites, custom components, and
          exported code.
        </p>
        <p>
          By using the Service, you grant ERVFlow a limited, non-exclusive
          license to host and transmit your content solely as necessary to
          provide the Service.
        </p>
      </LegalSection>

      <LegalSection id="user-content" title="User Content">
        <p>
          You are solely responsible for all content you upload or publish. You
          represent that:
        </p>
        <ul>
          <li>
            You own or have the necessary rights to all content you submit
          </li>
          <li>
            Your content does not infringe any third-party intellectual property
            rights
          </li>
          <li>
            Your content complies with all applicable laws and our Acceptable
            Use Policy
          </li>
        </ul>
        <p>
          We reserve the right to remove content that violates these Terms.
          Removed content may not be recoverable.
        </p>
      </LegalSection>

      <LegalSection id="service-availability" title="Service Availability">
        <p>
          ERVFlow aims for high availability but does not guarantee
          uninterrupted access. Downtime may occur due to:
        </p>
        <ul>
          <li>
            Scheduled maintenance (announced in advance at{" "}
            <Link
              href="/status"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              ervflow.com/status
            </Link>
            )
          </li>
          <li>Emergency security patches or infrastructure incidents</li>
          <li>Events outside our reasonable control (force majeure)</li>
        </ul>
        <p>
          We endeavor to provide at least 24 hours notice for planned
          maintenance. Monitor real-time status at our{" "}
          <Link
            href="/status"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            Status Page →
          </Link>
        </p>
      </LegalSection>

      <LegalSection
        id="limitation-of-liability"
        title="Limitation of Liability"
      >
        <p>
          To the fullest extent permitted by law, ERVFlow will not be liable for
          any indirect, incidental, special, consequential, or punitive damages,
          including lost profits, data loss, or business interruption, arising
          from your use of or inability to use the Service.
        </p>
        <p>
          Our total aggregate liability will not exceed the greater of: (i) the
          amount you paid us in the 12 months preceding the claim, or (ii) USD
          $100.
        </p>
      </LegalSection>

      <LegalSection id="termination" title="Termination">
        <h3>Termination by You</h3>
        <p>
          Terminate your account anytime from Settings → Account → Delete
          Account. Termination does not entitle you to a refund of prepaid fees.
        </p>
        <h3>Termination by ERVFlow</h3>
        <p>
          We may suspend or terminate your account, with or without notice, for
          violations of these Terms, fraudulent activity, or risk to other users
          or the platform.
        </p>
        <h3>Effect of Termination</h3>
        <p>
          Your access ceases immediately upon termination. Data is retained for
          90 days then permanently deleted, unless required by law.
        </p>
      </LegalSection>

      <LegalSection id="governing-law" title="Governing Law">
        <p>
          These Terms are governed by the laws of the State of Delaware, United
          States, without regard to conflict of law principles. Disputes shall
          be resolved exclusively in state or federal courts in Delaware, and
          you consent to personal jurisdiction there.
        </p>
        <p>
          EU consumers may additionally benefit from mandatory provisions of
          their country of residence.
        </p>
      </LegalSection>

      <LegalSection id="changes-to-terms" title="Changes to Terms">
        <p>
          We may update these Terms from time to time. Material changes will be
          communicated at least 30 days before taking effect via email and an
          in-app notification. Continued use after the effective date
          constitutes acceptance.
        </p>
      </LegalSection>

      <LegalSection id="contact-information" title="Contact Information">
        <div className="mt-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 p-4 flex items-start gap-3">
          <Mail className="w-5 h-5 text-zinc-400 mt-1.5 shrink-0" />
          <div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-zinc-800 dark:text-zinc-200">
              Legal Team
            </p>
            <Link
              href="mailto:legal@ervflow.com"
              className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              legal@ervflow.com
            </Link>
            <p className="text-xs text-zinc-500 mt-1">
              ERVFlow, Inc. · Wilmington, Delaware, USA
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
              note: "Initial publication of Terms of Service.",
            },
          ]}
        />
      </div>
    </>
  );
}
