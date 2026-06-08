"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import Icon from "@/components/common/Icon";

const socialLinks = [
  {
    icon: <Icon name="GitHub" size="20" className="w-5 h-5" />,
    href: "https://github.com/cssExpert",
    label: "GitHub",
  },
  {
    icon: <Icon name="LinkedIn" size="16" className="w-4 h-4" />,
    href: "https://www.linkedin.com/in/gr8ravi/",
    label: "LinkedIn",
  },
  {
    icon: <Icon name="TwitterX" size="20" className="w-5 h-5" />,
    href: "https://x.com/2n2ngupta",
    label: "Twitter / X",
  },
  {
    icon: <Mail size={18} />,
    href: "mailto:ravigupta.exe@gmail.com",
    label: "Email",
  },
];

const Social = () => {
  return (
    <>
      <div className="flex items-center gap-3">
        {socialLinks.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            aria-label={s.label}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="w-9 h-9 rounded-full border border-muted-foreground flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary/40 transition-all duration-300"
          >
            {s.icon}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Social;
