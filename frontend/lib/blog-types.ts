export type PostSize = "hero" | "tall" | "wide" | "sm";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StepItem {
  title: string;
  description: string;
}

export interface PostSection {
  type:
    | "h2"
    | "h3"
    | "p"
    | "code"
    | "quote"
    | "ul"
    | "problem"
    | "solution"
    | "steps"
    | "takeaways"
    | "faq"
    | "cta"
    | "image";
  text: string;
  items?: string[];
  steps?: StepItem[];
  faqs?: FAQItem[];
  cta?: { label: string; href: string };
  src?: string;
  caption?: string;
  wide?: boolean;
}

export interface Post {
  id: string;
  slug: string;
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
  bio?: string;
  featuredImage: string;
  tags: string[];
  size: PostSize;
  relatedIds?: string[];
}

export const SIZE_CLASSES: Record<PostSize, string> = {
  hero: "md:col-span-2 lg:col-span-2 lg:row-span-2",
  tall: "md:col-span-1 lg:col-span-1 lg:row-span-2",
  wide: "md:col-span-2 lg:col-span-2 lg:row-span-1",
  sm: "md:col-span-1 lg:col-span-1 lg:row-span-1",
};
