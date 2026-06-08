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
  title: "ERVFlow — Build Beautiful Websites",
  description:
    "A powerful drag-and-drop visual website builder with Tailwind CSS",
  openGraph: {
    title: "ERVFlow — Build Beautiful Websites",
    description:
      "A powerful drag-and-drop visual website builder with Tailwind CSS",
  },
  icons: {
    icon: "/favicon.svg",
  },
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
