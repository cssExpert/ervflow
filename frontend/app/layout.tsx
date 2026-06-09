import type { Metadata } from "next";
import { Inter, Merienda } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const interFont = Inter({ subsets: ["latin"] });
const merienda = Merienda({
  subsets: ["latin"],
  variable: "--font-merienda",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ervflow.com"),
  title: "ERVFlow — Build Beautiful Websites",
  description:
    "ERVFlow is a modern AI-powered visual website builder with drag-and-drop editing, Tailwind CSS support, automation workflows, CMS tools, and Next.js-powered performance.",
  keywords: [
    "ERVFlow",
    "website builder",
    "AI website builder",
    "visual editor",
    "drag and drop builder",
    "Next.js builder",
    "Tailwind CSS editor",
    "React website builder",
    "TypeScript website builder",
    "no-code platform",
    "low-code platform",
    "landing page builder",
    "CMS platform",
    "AI design platform",
    "responsive website builder",
    "workflow automation",
    "design to code",
    "frontend builder",
    "visual development platform",
    "website automation",
    "website publishing platform",
    "modern SaaS platform",
    "smart CMS",
    "online web editor",
  ],
  authors: [{ name: "ERVFlow", url: "https://ervflow.com" }],
  creator: "ERVFlow",
  publisher: "ERVFlow",
  robots: { index: true, follow: true },
  openGraph: {
    title: "ERVFlow — Build Beautiful Websites",
    description:
      "AI-powered visual website builder for modern teams using Next.js, Tailwind CSS, automation workflows, and drag-and-drop editing.",
    url: "https://ervflow.com",
    siteName: "ERVFlow",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "ERVFlow" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ERVFlow — Build Beautiful Websites",
    description:
      "AI-powered drag-and-drop visual website builder powered by Next.js and Tailwind CSS.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  alternates: { canonical: "https://ervflow.com" },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // 1. interFont.variable injects '--font-inter' into the DOM
      // 2. 'font-sans' tells Tailwind to use the 'sans' configuration we just added
      className={cn(
        "h-full",
        "antialiased",
        interFont.className,
        merienda.className,
      )}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before React hydration to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="h-full">
        <ThemeProvider>
          <TooltipProvider>
            <Header />
            {children}
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
