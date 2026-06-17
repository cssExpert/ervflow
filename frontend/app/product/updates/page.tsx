import type { Metadata } from "next";
import UpdatesHero from "@/components/product/UpdatesHero";
import UpdateCard from "@/components/product/UpdateCard";
import ChangelogTimeline from "@/components/product/ChangelogTimeline";
import RoadmapBoard from "@/components/product/RoadmapBoard";
import SubscribeForm from "@/components/product/SubscribeForm";

export const metadata: Metadata = {
  title: "Product Updates — ERVFlow | Changelog & Roadmap",
  description:
    "Stay up to date with every feature, fix, and improvement we ship. See the ERVFlow changelog, roadmap, and subscribe for release notifications.",
  openGraph: {
    title: "ERVFlow Product Updates — Changelog & Roadmap",
    description:
      "Every release, improvement, and what's coming next — all in one place.",
    type: "website",
  },
};

export default function UpdatesPage() {
  return (
    <main>
      <UpdatesHero />

      {/* Featured release */}
      <section className="py-12 bg-white dark:bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-5">
            Latest Release
          </p>
          <UpdateCard
            version="3.2.0"
            date="June 12, 2026"
            tag="Major Feature"
            title="AI Content Localization — Ship Your Website in 30+ Languages"
            description="ERVFlow now automatically translates your entire website into over 30 languages, with locale-aware SEO, language switcher component, and full RTL layout support for Arabic and Hebrew."
            highlights={[
              "Auto-translate content into 30+ languages with a single click",
              "Language switcher component added to the design library",
              "Locale-specific SEO meta tags and hreflang attributes generated automatically",
              "RTL layout engine for Arabic, Hebrew, and other right-to-left languages",
              "Translation memory to keep brand terminology consistent across pages",
            ]}
            href="#v3-2-0"
          />
        </div>
      </section>

      <ChangelogTimeline />
      <RoadmapBoard />
      <SubscribeForm />
    </main>
  );
}
