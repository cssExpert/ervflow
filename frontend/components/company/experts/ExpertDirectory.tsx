"use client";
import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/company/shared/SectionReveal";

interface Expert {
  name: string;
  role: string;
  initials: string;
  gradient: string;
  specialties: string[];
  experience: number;
  projects: number;
  rating: number;
  available: boolean;
  rate: string;
}

const EXPERTS: Expert[] = [
  {
    name: "Sophia Reeves",
    role: "UI/UX Designer",
    initials: "SR",
    gradient: "from-violet-500 to-purple-600",
    specialties: ["Design Systems", "Brand Identity", "Figma"],
    experience: 7,
    projects: 64,
    rating: 5.0,
    available: true,
    rate: "$110/hr",
  },
  {
    name: "Marcus Jensen",
    role: "Full-Stack Developer",
    initials: "MJ",
    gradient: "from-blue-500 to-cyan-600",
    specialties: ["Next.js", "API Integration", "Performance"],
    experience: 5,
    projects: 52,
    rating: 4.9,
    available: true,
    rate: "$95/hr",
  },
  {
    name: "Priya Malhotra",
    role: "AI Integration Specialist",
    initials: "PM",
    gradient: "from-emerald-500 to-teal-600",
    specialties: ["AI Workflows", "OpenAI", "Automation"],
    experience: 4,
    projects: 38,
    rating: 4.8,
    available: false,
    rate: "$120/hr",
  },
  {
    name: "Carlos Mendez",
    role: "SEO & Performance Expert",
    initials: "CM",
    gradient: "from-amber-500 to-orange-500",
    specialties: ["Core Web Vitals", "SEO Audit", "Analytics"],
    experience: 8,
    projects: 89,
    rating: 4.9,
    available: true,
    rate: "$85/hr",
  },
  {
    name: "Aisha Okonkwo",
    role: "Content Strategist",
    initials: "AO",
    gradient: "from-rose-500 to-pink-600",
    specialties: ["Copywriting", "Brand Voice", "CMS Setup"],
    experience: 6,
    projects: 71,
    rating: 4.7,
    available: true,
    rate: "$75/hr",
  },
  {
    name: "Raj Patel",
    role: "Migration Specialist",
    initials: "RP",
    gradient: "from-indigo-500 to-blue-600",
    specialties: ["Platform Migration", "Data Import", "WordPress"],
    experience: 5,
    projects: 45,
    rating: 4.8,
    available: false,
    rate: "$90/hr",
  },
];

function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <motion.article
      whileHover={{
        y: -6,
        borderColor: "rgba(247,98,53,0.2)",
        transition: { duration: 0.22, ease: "easeOut" },
      }}
      className="flex flex-col h-full p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 14 }}
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${expert.gradient} flex items-center justify-center text-sm font-bold text-white shrink-0 cursor-default`}
            aria-hidden
          >
            {expert.initials}
          </motion.div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {expert.name}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
              {expert.role}
            </p>
          </div>
        </div>
        <span
          className={`text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 ${
            expert.available
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-500 border border-zinc-300 dark:border-zinc-700"
          }`}
        >
          {expert.available ? (
            <span className="flex items-center gap-1">
              <motion.span
                aria-hidden
                animate={expert.available ? { scale: [1, 1.5, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-1 rounded-full bg-emerald-400 inline-block"
              />
              Available
            </span>
          ) : (
            "Busy"
          )}
        </span>
      </div>

      {/* Specialties */}
      <div className="flex flex-wrap gap-1.5 mb-4" aria-label="Specialties">
        {expert.specialties.map((s) => (
          <span
            key={s}
            className="text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 px-2 py-0.5 rounded-full"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-zinc-200 dark:border-zinc-800 mb-4 text-center">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {expert.experience}y
          </p>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-500 mt-0.5">
            Experience
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {expert.projects}
          </p>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-500 mt-0.5">
            Projects
          </p>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1">
            <Star
              className="w-3 h-3 text-amber-400 fill-amber-400"
              aria-hidden
            />
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {expert.rating}
            </p>
          </div>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-500 mt-0.5">
            Rating
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {expert.rate}
        </span>
        <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.15 }}>
          <Link
            href="#"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors"
            aria-label={`View ${expert.name}'s profile`}
          >
            View Profile
            <ExternalLink className="w-3 h-3" />
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function ExpertDirectory() {
  return (
    <section
      id="directory"
      className="py-20 sm:py-28 bg-[#F9F9F9] dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-500">
            Expert Network
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Meet our certified experts
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
            Every expert is individually vetted, certified, and trusted by
            ERVFlow.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXPERTS.map((expert, i) => (
            <SectionReveal key={expert.name} delay={i * 0.07}>
              <ExpertCard expert={expert} />
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.2} className="text-center mt-10">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-zinc-100 dark:text-zinc-100 hover:text-zinc-200 dark:hover:text-zinc-100 bg-[#405b50] rounded-sm transition-colors duration-200"
            >
              View all experts
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}
