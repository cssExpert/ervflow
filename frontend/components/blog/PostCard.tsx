"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { MoveRight, Clock } from "lucide-react";
import type { Post } from "@/lib/blog-data";
import Icon from "@/components/common/Icon";

export type PostCardVariant = "featured" | "half" | "third";

const spring = { type: "spring", damping: 30, stiffness: 300 } as const;

/* Derive thumbnail path — smaller webp for card use, original kept for hero */
function thumbSrc(src: string): string {
  return src.replace("/images/Blogs/", "/images/Blogs/thumbs/");
}

/* Post thumbnail — featured image when set, gradient art as fallback */
function Cover({
  post,
  className,
  priority = false,
}: {
  post: Post;
  className: string;
  priority?: boolean;
}) {
  if (post.featuredImage) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={thumbSrc(post.featuredImage)}
          alt={`${post.title} — featured image`}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-linear-to-br ${post.gradient} ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 22% 18%, rgba(255,255,255,0.22) 0%, transparent 55%)",
        }}
      />
      <span className="absolute bottom-2 right-4 font-black text-5xl sm:text-6xl text-white/10 select-none tracking-tight whitespace-nowrap">
        {post.category}
      </span>
    </div>
  );
}

function MetaRow({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <m.span
        layoutId={`blog-badge-${post.id}`}
        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${post.categoryBg} ${post.categoryText}`}
        transition={spring}
      >
        {post.category}
      </m.span>
      <span className="mr-auto text-xs text-zinc-600 dark:text-neutral-400">
        {post.date}
      </span>
      <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-primary-500/10 text-primary-700 dark:text-primary-400">
        <Clock size={10} aria-hidden="true" />
        {post.readTime}
      </span>
    </div>
  );
}

function AuthorChip({ post }: { post: Post }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <span
        className={`w-12 h-12 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}
        aria-hidden="true"
      >
        <Icon
          name="Logo"
          size="32"
          fill="currentColor"
          role="button"
          className="w-8 h-8"
        />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-zinc-800 dark:text-white truncate">
          {post.author}
        </p>
        <p className="text-xs text-zinc-600 dark:text-neutral-400 truncate">
          {post.authorRole}
        </p>
      </div>
    </div>
  );
}

function ReadMore() {
  return (
    <span className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold rounded-full border border-black/10 dark:border-white/15 text-zinc-700 dark:text-neutral-200 group-hover:bg-primary-500 group-hover:border-primary-500 group-hover:text-white transition-colors duration-200 flex-shrink-0">
      Read More
      <MoveRight size={14} aria-hidden="true" />
    </span>
  );
}

interface Props {
  post: Post;
  index: number;
  variant: PostCardVariant;
  onSelect: (id: string) => void;
}

export default function PostCard({ post, index, variant }: Props) {
  const isFeatured = variant === "featured";
  const isHalf = variant === "half";

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <m.div
        className="group h-full cursor-pointer"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{
          duration: 0.5,
          delay: index * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ y: -4 }}
      >
        <m.article
          layoutId={`blog-card-${post.id}`}
          className="relative h-full flex flex-col overflow-hidden rounded-2xl
          bg-white dark:bg-white/3
          border border-black/8 dark:border-white/8
          shadow-xs hover:shadow-xs transition-shadow duration-300"
          style={{ borderRadius: 16 }}
          transition={spring}
        >
          {isFeatured ? (
            <div className="flex flex-col lg:flex-row flex-1">
              <Cover
                post={post}
                priority
                className="h-65 md:h-85 lg:h-auto lg:w-1/2"
              />
              <div className="flex flex-col flex-1 p-6 sm:p-8 lg:p-12">
                <MetaRow post={post} />
                <m.h2
                  layoutId={`blog-title-${post.id}`}
                  className="my-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-zinc-800 dark:text-white"
                  transition={spring}
                >
                  {post.title}
                </m.h2>
                <p className="text-zinc-600 dark:text-neutral-300 leading-relaxed mb-8 max-w-lg">
                  {post.excerpt}
                </p>
                <div className="flex-1" />
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <AuthorChip post={post} />
                  <ReadMore />
                </div>
              </div>
            </div>
          ) : (
            <>
              <Cover
                post={post}
                className={isHalf ? "h-60 md:h-75" : "h-50 md:h-60"}
              />
              <div className="flex flex-col flex-1 p-6">
                <MetaRow post={post} />
                <m.h2
                  layoutId={`blog-title-${post.id}`}
                  className={`my-3 font-extrabold tracking-tight leading-snug text-zinc-800 dark:text-white ${
                    isHalf ? "text-xl sm:text-2xl" : "text-lg"
                  }`}
                  transition={spring}
                >
                  {post.title}
                </m.h2>
                <p
                  className={`text-sm text-zinc-600 dark:text-neutral-300 leading-relaxed ${
                    isHalf ? "line-clamp-3" : "line-clamp-2"
                  }`}
                >
                  {post.excerpt}
                </p>
                <div className="flex-1" />
                <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
                  <AuthorChip post={post} />
                  {isHalf && <ReadMore />}
                </div>
              </div>
            </>
          )}
        </m.article>
      </m.div>
    </Link>
  );
}
