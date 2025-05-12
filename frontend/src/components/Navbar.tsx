"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, PencilIcon, HistoryIcon, MailIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";



// Social media icons
const Icons = {
  linkedin: (props: React.HTMLAttributes<SVGElement>) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  ),
  x: (props: React.HTMLAttributes<SVGElement>) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      />
    </svg>
  ),
  youtube: (props: React.HTMLAttributes<SVGElement>) => (
    <svg
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M29.41,9.26a3.5,3.5,0,0,0-2.47-2.47C24.76,6.2,16,6.2,16,6.2s-8.76,0-10.94.59A3.5,3.5,0,0,0,2.59,9.26,36.13,36.13,0,0,0,2,16a36.13,36.13,0,0,0,.59,6.74,3.5,3.5,0,0,0,2.47,2.47C7.24,25.8,16,25.8,16,25.8s8.76,0,10.94-.59a3.5,3.5,0,0,0,2.47-2.47A36.13,36.13,0,0,0,30,16,36.13,36.13,0,0,0,29.41,9.26ZM13.2,20.2V11.8L20.47,16Z" />
    </svg>
  ),
  github: (props: React.HTMLAttributes<SVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.467-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.042.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
};

// Navigation and social data
const DATA = {
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/detect", icon: PencilIcon, label: "Detect" },
    { href: "/history", icon: HistoryIcon, label: "History" },
    { href: "/contact", icon: MailIcon, label: "Contact" },
  ],
  social: [
    {
      name: "Github",
      url: "https://github.com/VisibleNasir/Visible-Content-Detector",
      icon: Icons.github,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/nasir-nadaf-2014362a0/",
      icon: Icons.linkedin,
    },
    
    {
      name: "YouTube",
      url: "https://www.youtube.com/@VisibleNasir",
      icon: Icons.youtube,
    },
  ],
};

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-5 left-0 right-0 z-50 flex justify-center">
      <TooltipProvider>
        <div className="bg-zinc-900 rounded-full p-2 shadow-lg border border-zinc-800 flex items-center gap-2">
          {DATA.navbar.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  aria-label={item.label}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full",
                    pathname === item.href
                      ? "bg-zinc-700 text-zinc-100"
                      : "text-zinc-400 hover:text-zinc-100"
                  )}
                >
                  <item.icon className="size-6" />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-800 text-zinc-100 border-zinc-700">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          <div className="h-6 w-px bg-zinc-700" />
          {DATA.social.map((social) => (
            <Tooltip key={social.name}>
              <TooltipTrigger asChild>
                <Link
                  href={social.url}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full text-zinc-400 hover:text-zinc-100"
                  )}
                >
                  <social.icon className="size-6" />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-800 text-zinc-100 border-zinc-700">
                <p>{social.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Navbar;