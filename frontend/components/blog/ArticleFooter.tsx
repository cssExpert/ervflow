"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Link2, Check, Tag, Mail, CheckCircle2 } from "lucide-react";

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.265 5.633 5.899-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
import type { Post } from "@/lib/blog-types";

function ShareButtons({ post }: { post: Post }) {
  const [copied, setCopied] = useState(false);

  const encoded = encodeURIComponent(post.title);

  const share = (platform: "x" | "linkedin") => {
    const url = encodeURIComponent(window.location.href);
    const target =
      platform === "x"
        ? `https://twitter.com/intent/tweet?text=${encoded}&url=${url}`
        : `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encoded}`;
    window.open(target, "_blank", "noopener,noreferrer");
  };

  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-neutral-500 mr-1">
        Share
      </span>
      <button
        onClick={() => share("x")}
        aria-label="Share on X"
        className="flex items-center gap-1.5 px-3.5 py-1.5 h-7.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-neutral-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-black/8 dark:border-white/8 cursor-pointer"
      >
        <XIcon size={11} />
      </button>
      <button
        onClick={() => share("linkedin")}
        aria-label="Share on LinkedIn"
        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-neutral-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-black/8 dark:border-white/8 cursor-pointer"
      >
        <LinkedInIcon size={11} /> LinkedIn
      </button>
      <button
        onClick={copy}
        aria-label="Copy link"
        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-neutral-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-black/8 dark:border-white/8 cursor-pointer"
      >
        {copied ? (
          <>
            <Check size={11} className="text-emerald-500" aria-hidden="true" />{" "}
            Copied!
          </>
        ) : (
          <>
            <Link2 size={11} aria-hidden="true" /> Copy link
          </>
        )}
      </button>
    </div>
  );
}

function RelatedCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block cursor-pointer h-full">
      <article className="h-full flex flex-col rounded-xl overflow-hidden border border-zinc-200 dark:border-white/8 bg-white dark:bg-white/2 hover:border-primary-500/30 transition-colors duration-200">
        {post.featuredImage ? (
          <div className="relative h-36 shrink-0 overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={`${post.title} cover`}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ) : (
          <div
            className={`h-36 shrink-0 bg-linear-to-br ${post.gradient}`}
            aria-hidden="true"
          />
        )}
        <div className="p-4 flex flex-col flex-1">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border self-start ${post.categoryBg} ${post.categoryText}`}
          >
            {post.category}
          </span>
          <p className="mt-2 text-sm font-bold text-zinc-800 dark:text-white leading-snug line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-1">
            {post.title}
          </p>
          <p className="mt-2 text-xs text-zinc-500 dark:text-neutral-500">
            {post.readTime} read
          </p>
        </div>
      </article>
    </Link>
  );
}

function NewsletterBlock() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="rounded-2xl p-8 bg-zinc-900 dark:bg-white/3 border border-white/8 text-center">
      <div className="inline-flex items-center gap-1.5 bg-primary-500/20 text-primary-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
        <Mail size={11} aria-hidden="true" /> ERVFlow Newsletter
      </div>
      <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
        Stay ahead of the curve
      </p>
      <p className="text-sm text-neutral-400 mb-6 max-w-sm mx-auto">
        Deep-dives on Next.js, AI, TypeScript, and DevOps — straight to your
        inbox.
      </p>
      {sent ? (
        <p className="flex items-center gap-2 text-sm font-semibold text-white">
          <CheckCircle2 size={18} aria-hidden="true" />
          You&apos;re on the list — thanks for subscribing!
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setSent(true);
          }}
          className="mx-auto max-w-2xl flex flex-col sm:flex-row gap-2 sm:gap-0 sm:bg-white sm:rounded-sm p-1.5 md:p-2"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="Type your email address..."
            className="grow px-5 py-2.5 text-md text-zinc-800 placeholder:text-zinc-500 bg-white rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ring-0!"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-2.5 md:py-3.5 md:px-8 text-sm md:text-base font-bold text-white bg-zinc-900 hover:bg-primary shadow-md rounded-sm transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Subscribe Free
          </button>
        </form>
      )}
    </div>
  );
}

export default function ArticleFooter({
  post,
  related,
}: {
  post: Post;
  related: Post[];
}) {
  return (
    <div className="px-6 pb-20 border-t border-black/8 dark:border-white/8">
      <div className="max-w-4xl mx-auto pt-8 space-y-12">
        {/* Tags + Share */}
        <div className="flex flex-col sm:flex-row gap-5 sm:items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Tag
              size={13}
              className="text-zinc-400 dark:text-neutral-500"
              aria-hidden="true"
            />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-black/4 dark:bg-white/5 border border-black/8 dark:border-white/8 text-zinc-600 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <ShareButtons post={post} />
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div>
            <p className="text-base font-bold text-zinc-800 dark:text-white mb-5">
              Related Articles
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {related.map((p) => (
                <RelatedCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        )}

        {/* Newsletter */}
        <NewsletterBlock />
      </div>
    </div>
  );
}
