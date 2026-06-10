export type PostSize = "hero" | "tall" | "wide" | "sm";

export interface PostSection {
  type: "h2" | "h3" | "p" | "code" | "quote" | "ul";
  text: string;
  items?: string[];
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  sections: PostSection[];
  category: string;
  categoryText: string;
  categoryBg: string;
  gradient: string;
  glow: string;
  artColor: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  featuredImage: string;
  tags: string[];
  size: PostSize;
}

export const POSTS: Post[] = [
  {
    id: "nextjs-perf",
    featuredImage:
      "/images/Blogs/ERVFlow-Building-Blazing-Fast-Next.js-15-Apps.png",
    title: "Building Blazing-Fast Next.js 15 Apps",
    excerpt:
      "Deep dive into Server Components, Partial Prerendering, and the new caching model that separates good apps from great ones.",
    sections: [
      { type: "h2", text: "The New Caching Model" },
      {
        type: "p",
        text: "Next.js 15 fundamentally rethinks caching. Gone are the days of aggressive automatic caching — now you opt in explicitly, giving you predictable, understandable behavior.",
      },
      {
        type: "code",
        text: "const data = await fetch('/api/posts', {\n  cache: 'force-cache',\n  next: { revalidate: 3600 }\n});",
      },
      { type: "h2", text: "Server Components First" },
      {
        type: "p",
        text: "Moving data fetching to the server eliminates client-side waterfalls. Each Server Component fetches its own data in parallel, reducing total load time dramatically.",
      },
      { type: "h2", text: "Partial Prerendering" },
      {
        type: "p",
        text: "PPR lets you mix static shells with dynamic islands on the same page — the shell is served from the CDN in milliseconds while dynamic content streams in behind it.",
      },
      {
        type: "quote",
        text: '"Ship the shell, stream the rest." — The PPR mantra.',
      },
      { type: "h2", text: "Practical Checklist" },
      {
        type: "ul",
        text: "",
        items: [
          "Use Server Components for all data fetching",
          "Reserve Client Components for interactivity only",
          "Enable `experimental.ppr` in next.config.ts",
          "Profile with Chrome DevTools → Performance panel",
          "Set correct Cache-Control headers on the edge",
        ],
      },
    ],
    category: "Performance",
    categoryText: "text-blue-600 dark:text-blue-400",
    categoryBg: "bg-blue-500/10 border-blue-500/20",
    gradient: "from-blue-700 via-indigo-800 to-slate-900",
    glow: "rgba(59,130,246,0.45)",
    artColor: "#93c5fd",
    date: "Jun 5, 2026",
    readTime: "8 min",
    author: "Ravi Gupta",
    authorRole: "Founder · ERVFlow",
    tags: ["Next.js", "React", "Web Perf"],
    size: "hero",
  },
  {
    id: "ai-ui",
    featuredImage: "/images/Blogs/ERVFlow-0_EjoXjdr_rQouVfTz.jpg",
    title: "AI-Driven UI Generation",
    excerpt:
      "LLMs can now produce production-quality component code. Here's the workflow we use at ERVFlow.",
    sections: [
      { type: "h2", text: "The Prompt Architecture" },
      {
        type: "p",
        text: "Good AI UI generation starts with a well-structured prompt. We pass in the design system tokens, component conventions, and TypeScript strict mode requirements as system context.",
      },
      { type: "h2", text: "Streaming UI Patterns" },
      {
        type: "p",
        text: "Using the Vercel AI SDK's `useChat` with `renderTool` callbacks, you can stream UI components directly into the page as the model generates them — no round-trips required.",
      },
      {
        type: "quote",
        text: '"The model writes the scaffold. You write the soul."',
      },
    ],
    category: "AI",
    categoryText: "text-amber-600 dark:text-amber-400",
    categoryBg: "bg-amber-500/10 border-amber-500/20",
    gradient: "from-amber-600 via-orange-700 to-red-900",
    glow: "rgba(251,191,36,0.45)",
    artColor: "#fcd34d",
    date: "May 28, 2026",
    readTime: "6 min",
    author: "Ravi Gupta",
    authorRole: "Founder · ERVFlow",
    tags: ["AI", "LLMs", "Vercel AI SDK"],
    size: "tall",
  },
  {
    id: "design-tokens",
    featuredImage: "/images/Blogs/ERVFlow-Design-Tokens-At-Scale.png",
    title: "Design Tokens at Scale",
    excerpt:
      "How to architect a token system that survives a 10x team and a brand refresh.",
    sections: [
      { type: "h2", text: "Three Layers of Tokens" },
      {
        type: "p",
        text: "Effective token systems use three layers: primitive (raw values), semantic (roles), and component (local overrides). Each layer references the one below it — never skip layers.",
      },
      {
        type: "code",
        text: "/* Primitive */\n--blue-500: #3b82f6;\n\n/* Semantic */\n--color-action: var(--blue-500);\n\n/* Component */\n--btn-bg: var(--color-action);",
      },
    ],
    category: "Design",
    categoryText: "text-violet-600 dark:text-violet-400",
    categoryBg: "bg-violet-500/10 border-violet-500/20",
    gradient: "from-violet-700 via-purple-800 to-indigo-950",
    glow: "rgba(139,92,246,0.45)",
    artColor: "#c4b5fd",
    date: "May 15, 2026",
    readTime: "5 min",
    author: "Ravi Gupta",
    authorRole: "Founder · ERVFlow",
    tags: ["CSS", "Design Systems", "Tokens"],
    size: "sm",
  },
  {
    id: "typescript-patterns",
    featuredImage:
      "/images/Blogs/ERVFlow-TypeScript-Patterns-Youll-Actually-Use.png",
    title: "TypeScript Patterns You'll Actually Use",
    excerpt:
      "Skip the theory. These five patterns have saved our codebase from 90% of runtime errors.",
    sections: [
      { type: "h2", text: "Discriminated Unions" },
      {
        type: "p",
        text: "The most powerful TypeScript pattern for modelling state. Instead of optional fields that may or may not exist, each variant of your union carries exactly the data it needs.",
      },
      {
        type: "code",
        text: "type Result<T> =\n  | { status: 'idle' }\n  | { status: 'loading' }\n  | { status: 'success'; data: T }\n  | { status: 'error'; error: string };",
      },
      { type: "h2", text: "Branded Types" },
      {
        type: "p",
        text: "Prevent passing a `UserId` where a `PostId` is expected, even though both are strings. Brands make the type system enforce your domain semantics.",
      },
    ],
    category: "TypeScript",
    categoryText: "text-rose-600 dark:text-rose-400",
    categoryBg: "bg-rose-500/10 border-rose-500/20",
    gradient: "from-rose-600 via-pink-700 to-purple-950",
    glow: "rgba(244,63,94,0.45)",
    artColor: "#fda4af",
    date: "May 8, 2026",
    readTime: "7 min",
    author: "Ravi Gupta",
    authorRole: "Founder · ERVFlow",
    tags: ["TypeScript", "Patterns", "DX"],
    size: "wide",
  },
  {
    id: "css-architecture",
    featuredImage: "/images/Blogs/ERVFlow-CSS-Architecture-For-Large-Apps.webp",
    title: "CSS Architecture for Large Apps",
    excerpt:
      "Tailwind v4, CSS Layers, and the cascade — used intentionally instead of fought against.",
    sections: [
      { type: "h2", text: "Layers Over Specificity Wars" },
      {
        type: "p",
        text: "CSS Cascade Layers give you explicit ordering without increasing specificity. Utilities always win, but you control the order of everything below them.",
      },
      {
        type: "code",
        text: "@layer base, components, utilities;\n\n@layer components {\n  .card { ... }\n}",
      },
      { type: "h2", text: "Tailwind v4 & Lightning CSS" },
      {
        type: "p",
        text: "Tailwind v4 ships with Lightning CSS as its transform engine, enabling native CSS nesting, modern color spaces, and 100× faster builds over the PostCSS pipeline.",
      },
    ],
    category: "CSS",
    categoryText: "text-emerald-600 dark:text-emerald-400",
    categoryBg: "bg-emerald-500/10 border-emerald-500/20",
    gradient: "from-emerald-700 via-teal-800 to-cyan-950",
    glow: "rgba(16,185,129,0.45)",
    artColor: "#6ee7b7",
    date: "Apr 30, 2026",
    readTime: "9 min",
    author: "Ravi Gupta",
    authorRole: "Founder · ERVFlow",
    tags: ["CSS", "Tailwind v4", "Architecture"],
    size: "wide",
  },
  {
    id: "devops-scale",
    featuredImage:
      "/images/Blogs/ERVFlow-Zero-Downtime-Deploys-On-A-Budget.jpg",
    title: "Zero-Downtime Deploys on a Budget",
    excerpt:
      "CI/CD, blue-green deployments, and health checks — without the enterprise price tag.",
    sections: [
      { type: "h2", text: "Blue-Green with Coolify" },
      {
        type: "p",
        text: "Coolify gives you blue-green deployments on a single $6/mo VPS. Two containers run simultaneously; health checks gate traffic switching; rollback is one click.",
      },
      { type: "h2", text: "GitHub Actions Pipeline" },
      {
        type: "p",
        text: "A lean GitHub Actions workflow: lint → test → build Docker image → push to registry → trigger Coolify webhook. Total time: under 90 seconds for a Next.js app.",
      },
      { type: "quote", text: '"Deploy fearlessly. Roll back instantly."' },
    ],
    category: "DevOps",
    categoryText: "text-cyan-600 dark:text-cyan-400",
    categoryBg: "bg-cyan-500/10 border-cyan-500/20",
    gradient: "from-cyan-700 via-sky-800 to-blue-950",
    glow: "rgba(6,182,212,0.45)",
    artColor: "#67e8f9",
    date: "Apr 22, 2026",
    readTime: "6 min",
    author: "Ravi Gupta",
    authorRole: "Founder · ERVFlow",
    tags: ["DevOps", "CI/CD", "Docker"],
    size: "sm",
  },
];

export const SIZE_CLASSES: Record<PostSize, string> = {
  hero: "md:col-span-2 lg:col-span-2 lg:row-span-2",
  tall: "md:col-span-1 lg:col-span-1 lg:row-span-2",
  wide: "md:col-span-2 lg:col-span-2 lg:row-span-1",
  sm: "md:col-span-1 lg:col-span-1 lg:row-span-1",
};
