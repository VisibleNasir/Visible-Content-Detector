import { FileTextIcon } from "@radix-ui/react-icons";
import {
  Share2Icon,
  SearchIcon,
  Instagram,
  Github,
  Linkedin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import { Marquee } from "../magicui/marquee";
import { motion } from "framer-motion";

// Social links for the project
const socials = [
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/nasir_01010/",
    color: "text-pink-500 hover:text-pink-600",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/VisibleNasir",
    color: "text-zinc-100 hover:text-zinc-200",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/nasir-nadaf-2014362a0/",
    color: "text-blue-600 hover:text-blue-700",
  },
];

// Mock data for scanHistory
const scanHistory = [
  { name: "Text Scan", body: "No harmful content detected.", status: "safe" },
  { name: "Image Scan", body: "Harmful content detected.", status: "warning" },
  { name: "Video Scan", body: "No harmful content detected.", status: "safe" },
];

const statusIcons = {
  safe: FileTextIcon,
  warning: FileTextIcon,
};

const statusColors = {
  safe: {
    bg: "bg-green-400/20",
    border: "border-green-400/50",
    text: "text-green-400",
  },
  warning: {
    bg: "bg-red-400/20",
    border: "border-red-400/50",
    text: "text-red-400",
  },
};

const features = [
  {
    Icon: FileTextIcon,
    name: "Scan History",
    description: "Review your past text, image, and video scans with AI safety insights.",
    href: "/history",
    cta: "View History",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:25s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      >
        {scanHistory.map((item, idx) => {
          const Icon = statusIcons[item.status as keyof typeof statusIcons];
          const color = statusColors[item.status as keyof typeof statusColors];
          return (
            <figure
              key={idx}
              className={cn(
                "relative w-52 mr-4 cursor-pointer overflow-hidden rounded-xl border p-4",
                color.bg,
                color.border,
                "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none hover:scale-105"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={cn("h-4 w-4", color.text)} />
                <figcaption
                  className={cn("text-sm font-semibold truncate", color.text)}
                >
                  {item.name}
                </figcaption>
              </div>
              <blockquote className={cn("text-xs", color.text)}>
                {item.body}
              </blockquote>
            </figure>
          );
        })}
      </Marquee>
    ),
  },
  {
    Icon: Github,
    name: "Contribute",
    description: "Join our open-source project to enhance AI-powered harmful content detection.",
    href: "https://github.com/VisibleNasir/Visible-Content-Detector",
    cta: "Contribute Now",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute right-0 top-10 flex h-full w-full items-center justify-center">
        <div className="rounded-xl bg-gradient-to-br from-zinc-700/30 to-zinc-900/30 p-6 text-center shadow-lg backdrop-blur-sm">
          <p className="text-sm font-semibold text-zinc-100">
            Fork, Star, or Submit a PR
          </p>
          <p className="text-xs text-zinc-400 mt-2">
            Help us improve Visible Content Detector
          </p>
        </div>
      </div>
    ),
  },
  {
    Icon: Share2Icon,
    name: "Connect With Us",
    description: "Follow our socials for updates and community engagement.",
    href: "#",
    cta: "Join Our Community",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute top-6 left-6 flex gap-5 items-center justify-center">
        {socials.map((social, idx) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="group flex items-center gap-3 rounded-md p-2 transition-all duration-300 hover:bg-zinc-800"
              aria-label={`Visit our ${social.name} profile`}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800">
                <Icon className={cn("h-5 w-5", social.color)} />
              </div>
              <span className="text-sm font-medium text-zinc-100 group-hover:underline transition-all duration-300">
                {social.name}
              </span>
            </motion.a>
          );
        })}
      </div>
    ),
  },
  {
    Icon: SearchIcon,
    name: "Content Scanner",
    description: "Scan text, images, or videos for harmful content with AI.",
    className: "col-span-3 lg:col-span-1",
    href: "/detect",
    cta: "Start Scanning",
    background: (
      <div className="absolute right-0 top-10 flex h-full w-full items-center justify-center">
        <div className="rounded-xl bg-gradient-to-br from-zinc-700/30 to-zinc-900/30 p-6 text-center shadow-lg backdrop-blur-sm">
          <p className="text-sm font-semibold text-zinc-100">
            Upload text, image, or video
          </p>
          <p className="text-xs text-zinc-400 mt-2">
            AI-powered scanning for harmful content
          </p>
        </div>
      </div>
    ),
  },
];

export function HarmfulDetectionFeatureGrid() {
  return (
    <BentoGrid className="bg-zinc-950 p-4 sm:p-6 lg:p-8">
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}