import type { Metadata } from "next";
import { Inter, Merienda } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import LoaderDismiss from "@/components/common/LoaderDismiss";

const interFont = Inter({ subsets: ["latin"], display: "swap" });
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
    "no-code platform",
    "low-code platform",
    "landing page builder",
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
      className={cn(
        "h-full antialiased",
        interFont.className,
        merienda.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        {/* Theme init — runs before React to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        {/* Loader styles injected into <head> so they render before any JS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          #ervflow-loader {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background: #000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 24px;
            transition: opacity 0.45s ease, visibility 0.45s ease;
          }
          #ervflow-loader.is-hidden {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
          }
          #ervflow-loader-wordmark {
            font-size: 1.5rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            color: #fff;
          }
          #ervflow-loader-wordmark span {
            color: #f76235;
          }
          #ervflow-loader-track {
            width: 160px;
            height: 2px;
            border-radius: 9999px;
            background: rgba(255,255,255,0.1);
            overflow: hidden;
          }
          #ervflow-loader-bar {
            height: 100%;
            border-radius: 9999px;
            background: #f76235;
            animation: loaderSlide 1.1s ease-in-out infinite;
          }
          @keyframes loaderSlide {
            0%   { transform: translateX(-100%); }
            50%  { transform: translateX(0%); }
            100% { transform: translateX(100%); }
          }
        `,
          }}
        />
      </head>
      <body className="h-full">
        {/* Pure-HTML loader — visible before any JS runs */}
        <div id="ervflow-loader" aria-hidden="true">
          <div id="ervflow-loader-wordmark">
            ERV<span>Flow</span>
          </div>
          <div id="ervflow-loader-track">
            <div id="ervflow-loader-bar" />
          </div>
        </div>

        {/* LoaderDismiss removes the loader after React hydrates */}
        <LoaderDismiss />

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
