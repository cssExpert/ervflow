"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Activity,
  Zap,
  Globe,
  PenTool,
  Upload,
  Server,
  Lock,
  CreditCard,
  CloudCog,
  ChevronDown,
  Mail,
  Rss,
  Bell,
  RefreshCw,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────── */

type ServiceStatus = "operational" | "degraded" | "outage" | "maintenance";
type IncidentStatus =
  | "resolved"
  | "monitoring"
  | "identified"
  | "investigating";

interface Service {
  name: string;
  icon: React.ElementType;
  status: ServiceStatus;
  uptime: number;
  responseTime: number;
  history: number[];
}

interface Incident {
  date: string;
  title: string;
  body: string;
  status: IncidentStatus;
  duration: string;
  affectedServices: string[];
}

interface Maintenance {
  date: string;
  time: string;
  title: string;
  body: string;
  affectedServices: string[];
}

/* ─── Data ───────────────────────────────────────────── */

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = Math.imul(s ^ (s >>> 17), 0x45d9f3b);
    s = Math.imul(s ^ (s >>> 11), 0x119de1f3);
    s ^= s >>> 15;
    return (s >>> 0) / 0x100000000;
  };
}

function generateHistory(
  seed: number,
  outageChance = 0.015,
  degradedChance = 0.025,
): number[] {
  const rand = seeded(seed);
  return Array.from({ length: 90 }, () => {
    const r = rand();
    if (r < outageChance) return 2;
    if (r < outageChance + degradedChance) return 1;
    return 0;
  });
}

const SERVICES: Service[] = [
  {
    name: "Website Builder",
    icon: Globe,
    status: "operational",
    uptime: 99.98,
    responseTime: 112,
    history: generateHistory(1001),
  },
  {
    name: "AI Studio",
    icon: Zap,
    status: "operational",
    uptime: 99.94,
    responseTime: 184,
    history: generateHistory(2002),
  },
  {
    name: "Editor Canvas",
    icon: PenTool,
    status: "operational",
    uptime: 99.99,
    responseTime: 94,
    history: generateHistory(3003),
  },
  {
    name: "Publishing Engine",
    icon: Upload,
    status: "operational",
    uptime: 99.97,
    responseTime: 138,
    history: generateHistory(4004),
  },
  {
    name: "API Services",
    icon: Server,
    status: "operational",
    uptime: 99.99,
    responseTime: 68,
    history: generateHistory(5005),
  },
  {
    name: "Authentication",
    icon: Lock,
    status: "operational",
    uptime: 100,
    responseTime: 55,
    history: generateHistory(6006),
  },
  {
    name: "Billing & Subscriptions",
    icon: CreditCard,
    status: "operational",
    uptime: 99.96,
    responseTime: 145,
    history: generateHistory(7007),
  },
  {
    name: "CDN & Asset Delivery",
    icon: CloudCog,
    status: "operational",
    uptime: 99.99,
    responseTime: 28,
    history: generateHistory(8008),
  },
];

const INCIDENTS: Incident[] = [
  {
    date: "June 12, 2026",
    title: "Publishing delays resolved",
    body: "Some users experienced delays when publishing websites between 10:15 AM and 11:05 AM UTC. The issue was traced to a misconfiguration in our edge worker deployment. All affected builds were requeued and completed successfully.",
    status: "resolved",
    duration: "50 min",
    affectedServices: ["Publishing Engine"],
  },
  {
    date: "May 28, 2026",
    title: "AI Studio performance degradation",
    body: "Response times were slower than expected due to elevated GPU queue depth on our inference cluster. We scaled capacity horizontally and response times returned to normal within the hour.",
    status: "resolved",
    duration: "1h 12min",
    affectedServices: ["AI Studio"],
  },
  {
    date: "May 4, 2026",
    title: "CDN asset serving latency",
    body: "Assets served from our EU-West region experienced elevated latency due to a BGP route flap from one of our upstream transit providers. Traffic was rerouted automatically.",
    status: "resolved",
    duration: "28 min",
    affectedServices: ["CDN & Asset Delivery"],
  },
];

const MAINTENANCE: Maintenance[] = [
  {
    date: "June 25, 2026",
    time: "02:00 – 03:00 UTC",
    title: "Infrastructure upgrade for editor performance",
    body: "We will perform infrastructure upgrades to improve editor performance. During this period, website publishing may be temporarily unavailable. The Website Builder and Editor Canvas remain accessible.",
    affectedServices: ["Publishing Engine", "API Services"],
  },
];

/* ─── Status configs — light + dark ─────────────────── */

const STATUS_CONFIG: Record<
  ServiceStatus,
  { label: string; color: string; dot: string }
> = {
  operational: {
    label: "Operational",
    color: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  degraded: {
    label: "Degraded",
    color: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-400",
  },
  outage: {
    label: "Major Outage",
    color: "text-red-600 dark:text-red-400",
    dot: "bg-red-500",
  },
  maintenance: {
    label: "Maintenance",
    color: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
  },
};

const INCIDENT_CONFIG: Record<
  IncidentStatus,
  { label: string; color: string }
> = {
  resolved: {
    label: "Resolved",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  monitoring: {
    label: "Monitoring",
    color: "text-amber-600 dark:text-amber-400",
  },
  identified: {
    label: "Identified",
    color: "text-orange-600 dark:text-orange-400",
  },
  investigating: {
    label: "Investigating",
    color: "text-red-600 dark:text-red-400",
  },
};

function useNow() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/* ─── Reveal ─────────────────────────────────────────── */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Uptime Bar ──────────────────────────────────────── */

function UptimeBar({
  history,
  inView,
}: {
  history: number[];
  inView: boolean;
}) {
  const barColors = ["bg-emerald-500", "bg-amber-400", "bg-red-500"];
  return (
    <div className="flex gap-0.5 md:gap-1 items-end h-4 mt-2">
      {history.map((val, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={
            inView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }
          }
          transition={{
            duration: 0.4,
            delay: inView ? i * 0.004 : 0,
            ease: "easeOut",
          }}
          style={{ originY: 1 }}
          className={`flex-1 rounded-sm ${barColors[val]} ${val === 0 ? "h-full" : val === 1 ? "h-3/4" : "h-1/2"}`}
        />
      ))}
    </div>
  );
}

/* ─── Service Card ────────────────────────────────────── */

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const cfg = STATUS_CONFIG[service.status];
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.055,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group w-full"
    >
      <div
        className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 backdrop-blur-sm overflow-hidden cursor-pointer transition-colors duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/80 shadow-sm dark:shadow-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-4">
          <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">
              {service.name}
            </p>
            <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 font-mono">
              {service.uptime}% · {service.responseTime}ms
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cfg.dot} opacity-50`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${cfg.dot}`}
              />
            </span>
            <span
              className={`text-xs font-medium ${cfg.color} hidden sm:inline`}
            >
              {cfg.label}
            </span>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0 text-zinc-400 dark:text-zinc-600"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-3 sm:px-5 pb-4 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-zinc-500 font-mono">
                    90-day uptime
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {service.uptime}%
                  </span>
                </div>
                <UptimeBar history={service.history} inView={expanded} />
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-600">
                    90 days ago
                  </span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-600">
                    Today
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Metric Card ─────────────────────────────────────── */

function MetricCard({
  value,
  label,
  sub,
  delay,
}: {
  value: string;
  label: string;
  sub?: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 backdrop-blur-sm p-6 text-center shadow-sm dark:shadow-none">
        <p className="text-3xl sm:text-4xl font-black font-mono text-zinc-900 dark:text-zinc-100 tracking-tight">
          {value}
        </p>
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300 mt-2">
          {label}
        </p>
        {sub && <p className="text-xs text-zinc-500 mt-1">{sub}</p>}
      </div>
    </Reveal>
  );
}

/* ─── Incident Item ───────────────────────────────────── */

function IncidentItem({
  incident,
  index,
}: {
  incident: Incident;
  index: number;
}) {
  const icfg = INCIDENT_CONFIG[incident.status];
  return (
    <Reveal delay={index * 0.1}>
      {/* 36px gutter column (dot) + card column */}
      <div className="grid grid-cols-[36px_1fr] gap-x-1 pb-4">
        {/* Gutter: dot centered horizontally, pushed down to align with card top */}
        <div className="flex justify-center pt-5">
          <div className="w-3 h-3 shrink-0 rounded-full border-2 border-emerald-500 bg-zinc-50 dark:bg-zinc-950 z-10" />
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 backdrop-blur-sm p-4 sm:p-5 shadow-sm dark:shadow-none">
          <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-mono text-zinc-500 mb-1">
                {incident.date}
              </p>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {incident.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full whitespace-nowrap">
                {incident.duration}
              </span>
              <span
                className={`text-[11px] font-medium ${icfg.color} bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full whitespace-nowrap`}
              >
                {icfg.label}
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {incident.body}
          </p>
          {incident.affectedServices.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {incident.affectedServices.map((s) => (
                <span
                  key={s}
                  className="text-[10px] font-mono text-zinc-500 border border-zinc-300 dark:border-zinc-700 px-2 py-0.5 rounded"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Main Page ───────────────────────────────────────── */

export default function StatusPage() {
  const now = useNow();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const overallUptime = (
    SERVICES.reduce((acc, s) => acc + s.uptime, 0) / SERVICES.length
  ).toFixed(2);
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <main className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-x-hidden">
      {/* Background glows */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(34,197,94,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(247,98,53,0.05) 0%, transparent 50%)`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.018] dark:opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
        aria-hidden
      />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-[88vh] pt-30 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 text-center"
      >
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 mb-10 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-sm text-xs font-mono text-zinc-500 dark:text-zinc-400 shadow-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Live · Updated {formattedTime}
            <RefreshCw className="w-3 h-3 ml-0.5" />
          </motion.div>

          {/* Status orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative inline-flex items-center justify-center mb-10 top-2.5 ml-2"
          >
            <span
              className="absolute rounded-full border border-emerald-500/25 animate-ping"
              style={{ width: 96, height: 96, animationDuration: "2.4s" }}
            />
            <span
              className="absolute rounded-full border border-emerald-500/15"
              style={{ width: 120, height: 120 }}
            />
            <div
              className="relative w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(34,197,94,0.28), rgba(34,197,94,0.06) 60%, transparent 80%)",
                border: "1px solid rgba(34,197,94,0.3)",
                boxShadow:
                  "0 0 40px rgba(34,197,94,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-4"
          >
            <span className="text-zinc-900 dark:text-zinc-100">
              All Systems
            </span>
            <br />
            <span className="bg-linear-to-r from-[#CEFF00] via-primary-500 to-violet-500 bg-clip-text text-transparent animate-gradient-flow">
              Operational
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.32,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-zinc-700 dark:text-zinc-400 text-base sm:text-lg max-w-full md:max-w-lg mx-auto font-normal leading-relaxed"
          >
            {SERVICES.length} services monitored ·{" "}
            <span className="text-zinc-700 dark:text-zinc-300 font-medium">
              {overallUptime}%
            </span>{" "}
            average uptime · 0 active incidents
          </motion.p>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.44,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 w-full max-w-sm sm:max-w-none sm:w-auto mx-auto px-3 md:px-5 grid grid-cols-3 sm:inline-flex sm:items-center sm:gap-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-sm shadow-sm dark:shadow-none overflow-hidden"
          >
            <div className="flex justify-center py-4 sm:py-5 sm:px-0 border-r border-zinc-200 dark:border-zinc-800 sm:border-0">
              <StatPill
                icon={
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                }
                label="No Incidents"
                sublabel="Last 30 days"
              />
            </div>
            <div className="flex justify-center py-4 sm:py-0 sm:px-0 border-r border-zinc-200 dark:border-zinc-800 sm:border-0 sm:contents">
              <div className="hidden sm:block w-px h-19 bg-zinc-200 dark:bg-zinc-800" />
              <StatPill
                icon={
                  <Activity className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                }
                label="120ms"
                sublabel="Avg response"
              />
            </div>
            <div className="flex justify-center py-4 sm:py-0 sm:contents">
              <div className="hidden sm:block w-px h-19 bg-zinc-200 dark:bg-zinc-800" />
              <StatPill
                icon={
                  <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                }
                label={`${overallUptime}%`}
                sublabel="30-day uptime"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-[11px] text-zinc-400 dark:text-zinc-600 tracking-widest uppercase font-mono">
            Status
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-zinc-400 dark:text-zinc-700" />
          </motion.div>
        </motion.div>
      </section>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-20 sm:pb-32 space-y-16 sm:space-y-24">
        {/* System Components */}
        <section>
          <SectionHeader
            label="Components"
            title="System health"
            sub="Click any service to expand the 90-day uptime history."
          />
          <div className="mt-8 grid gap-2.5">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.name} service={service} index={i} />
            ))}
          </div>
        </section>

        {/* Uptime Metrics */}
        <section>
          <SectionHeader
            label="Reliability"
            title="Uptime metrics"
            sub="30-day rolling statistics across all systems."
          />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              value={`${overallUptime}%`}
              label="Overall Uptime"
              sub="30-day rolling average"
              delay={0}
            />
            <MetricCard
              value="0"
              label="Active Incidents"
              sub="Last 30 days"
              delay={0.08}
            />
            <MetricCard
              value="120ms"
              label="Avg Response Time"
              sub="Across all services"
              delay={0.16}
            />
          </div>
          <Reveal delay={0.22} className="mt-4">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 backdrop-blur-sm p-6 shadow-sm dark:shadow-none">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  90-Day Global Uptime
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  {overallUptime}% avg
                </span>
              </div>
              <GlobalUptimeBar services={SERVICES} />
              <div className="flex justify-between mt-2">
                <span className="text-[11px] text-zinc-400 dark:text-zinc-600 font-mono">
                  90 days ago
                </span>
                <div className="flex items-center gap-3">
                  <Legend color="bg-emerald-500" label="Operational" />
                  <Legend color="bg-amber-400" label="Degraded" />
                  <Legend color="bg-red-500" label="Outage" />
                </div>
                <span className="text-[11px] text-zinc-400 dark:text-zinc-600 font-mono">
                  Today
                </span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Incident History */}
        <section>
          <SectionHeader
            label="History"
            title="Past incidents"
            sub="A transparent record of issues and how we resolved them."
          />
          {/* Continuous vertical line runs through the gutter column of every item */}
          <div className="mt-8 relative">
            <div className="absolute left-4.5 top-5 bottom-5 w-px bg-zinc-200 dark:bg-zinc-800" />
            {INCIDENTS.map((incident, i) => (
              <IncidentItem key={i} incident={incident} index={i} />
            ))}
          </div>
        </section>

        {/* Scheduled Maintenance */}
        <section>
          <SectionHeader
            label="Upcoming"
            title="Scheduled maintenance"
            sub="Planned work that may temporarily affect service availability."
          />
          <div className="mt-8 space-y-4">
            {MAINTENANCE.map((m, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="rounded-2xl border border-blue-200 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-500/4 backdrop-blur-sm p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-blue-500 dark:text-blue-400 shrink-0 relative top-1" />
                      <div>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                          {m.title}
                        </p>
                        <p className="text-xs font-mono text-blue-600 dark:text-blue-400 mt-0.5">
                          {m.date} · {m.time}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-2.5 py-1 rounded-full">
                      Scheduled
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {m.body}
                  </p>
                  {m.affectedServices.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      <span className="text-[11px] text-zinc-500 mr-1">
                        Affected:
                      </span>
                      {m.affectedServices.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] font-mono text-zinc-500 border border-zinc-300 dark:border-zinc-700 px-2 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Subscribe */}
        <section>
          <Reveal>
            <div
              className="relative rounded-3xl border border-black/8 dark:border-zinc-800 overflow-hidden p-8 sm:p-12 text-center bg-slate-100 dark:bg-zinc-900/20 shadow-sm dark:shadow-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0, 0, 0, 0.033) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.033) 1px, transparent 1px)",
                backgroundSize: "1.5vw 1.5vw",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(247,98,53,0.04) 0%, rgba(34,197,94,0.03) 50%, rgba(139,92,246,0.03) 100%)",
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(247,98,53,0.06), transparent 70%)",
                }}
                aria-hidden
              />

              <Bell
                className="w-8 h-8 mx-auto mb-4"
                style={{ color: "#f76235" }}
              />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">
                Stay in the loop
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                Get instant notifications about outages, degraded performance,
                and scheduled maintenance windows.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {[
                  { icon: Mail, label: "Email notifications" },
                  { icon: Rss, label: "RSS feed" },
                  { icon: Bell, label: "Webhook alerts" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/60 text-xs text-zinc-600 dark:text-zinc-400"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {!subscribed ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    onSubmit={handleSubscribe}
                    className="mx-auto max-w-2xl flex flex-col sm:flex-row gap-2 sm:gap-0 bg-white dark:bg-white/5 sm:rounded-sm p-1.5 md:p-2 border border-black/10"
                  >
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="grow px-5 py-2.5 text-md text-zinc-800 dark:text-zinc-300 placeholder:text-zinc-500 bg-white/0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ring-0!"
                    />
                    <motion.button
                      whileHover={{ scale: 1 }}
                      whileTap={{ scale: 1 }}
                      type="submit"
                      className="px-6 py-2.5 md:py-3.5 md:px-8 text-sm md:text-base font-bold text-white bg-black dark:text-black dark:bg-white hover:bg-primary hover:text-white shadow-md rounded-sm transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      Subscribe
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    You&apos;re subscribed. We&apos;ll keep you posted.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </section>

        {/* Footer note */}
        <Reveal>
          <div className="text-center border-t border-zinc-200 dark:border-zinc-800 pt-12">
            <p className="text-sm text-zinc-500">
              Need help?{" "}
              <a
                href="/contact"
                className="text-zinc-700 dark:text-zinc-300 underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                Visit the Help Center
              </a>{" "}
              or{" "}
              <a
                href="/contact"
                className="text-zinc-700 dark:text-zinc-300 underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                contact our support team
              </a>
              .
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-700 mt-3 font-mono">
              ERVFlow Status · Powered by real-time monitoring
            </p>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

/* ─── Shared components ───────────────────────────────── */

function StatPill({
  icon,
  label,
  sublabel,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-2.5 px-2 sm:px-0">
      <div className="shrink-0">{icon}</div>
      <div className="text-center sm:text-left">
        <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-none">
          {label}
        </p>
        <p className="text-[10px] sm:text-[11px] text-zinc-500 mt-0.5 font-mono">
          {sublabel}
        </p>
      </div>
    </div>
  );
}

function SectionHeader({
  label,
  title,
  sub,
}: {
  label: string;
  title: string;
  sub: string;
}) {
  return (
    <Reveal>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-600 uppercase tracking-widest">
            {label}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
            {title}
          </h2>
        </div>
        <p className="text-sm text-zinc-500 sm:text-right sm:max-w-xs leading-relaxed">
          {sub}
        </p>
      </div>
    </Reveal>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2 h-2 rounded-sm ${color}`} />
      <span className="text-[10px] text-zinc-500 dark:text-zinc-600 font-mono">
        {label}
      </span>
    </div>
  );
}

function GlobalUptimeBar({ services }: { services: Service[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const merged = Array.from({ length: 90 }, (_, i) =>
    Math.max(...services.map((s) => s.history[i])),
  );
  const barColors = ["bg-emerald-500", "bg-amber-400", "bg-red-500"];

  return (
    <div ref={ref} className="flex gap-[2px] items-end h-8">
      {merged.map((val, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={inView ? { scaleY: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.45,
            delay: inView ? i * 0.005 : 0,
            ease: "easeOut",
          }}
          style={{ originY: 1 }}
          className={`flex-1 rounded-sm ${barColors[val]} ${val === 0 ? "h-full" : val === 1 ? "h-3/4" : "h-1/2"} hover:opacity-80 transition-opacity`}
        />
      ))}
    </div>
  );
}
