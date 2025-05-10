import { FileTextIcon } from "@radix-ui/react-icons";
import {
  BellIcon,
  Share2Icon,
  SearchIcon,
  Instagram,
  Github,
  Linkedin,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import { Marquee } from "../magicui/marquee";
import AnimatedListDemo from "../ui/animated-list-demo";
import { motion } from "framer-motion";

// Replace this with your actual links
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
    color: "text-gray-800 hover:text-black",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/nasir-nadaf-2014362a0/",
    color: "text-blue-600 hover:text-blue-700",
  },
];

// Mock data for scanHistory and statusIcons
const scanHistory = [
  { name: "Scan 1", body: "No harmful content detected.", status: "safe" },
  {
    name: "Scan 2",
    body: "Potential harmful content found.",
    status: "warning",
  },
];

const statusIcons = {
  safe: FileTextIcon,
  warning: BellIcon,
};

const statusColors = {
  safe: {
    bg: "bg-green-100",
    border: "border-green-300",
    text: "text-green-700",
  },
  warning: {
    bg: "bg-yellow-100",
    border: "border-yellow-300",
    text: "text-yellow-700",
  },
};

const features = [
  {
    Icon: FileTextIcon,
    name: "User History",
    description: "See your past scans with AI-generated safety insights.",
    href: "/history",
    cta: "View history",
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
    Icon: BellIcon,
    name: "Real-time Alerts",
    description: "Get instant alerts when harmful content is detected.",
    href: "/alerts",
    cta: "Configure alerts",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "Our Socials",
    description: "Follow us and stay connected on your favorite platforms.",
    href: "#",
    cta: "Visit profiles",
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
              className="group flex items-center gap-3 rounded-md p-2 transition-all duration-300 hover:bg-white/10"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <Icon className={cn("h-5 w-5", social.color)} />
              </div>
              <span className="text-sm font-medium text-white group-hover:underline transition-all duration-300">
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
    name: "Content Analyzer",
    description: "Upload any file to scan for harmful content using AI.",
    className: "col-span-3 lg:col-span-1",
    href: "/",
    cta: "Scan now",
    background: (
      <div  className="absolute right-0 top-10 flex h-full w-full items-center justify-center">
        <div className="rounded-xl bg-gradient-to-br from-red-500/30 to-yellow-500/30 p-6 text-center shadow-lg backdrop-blur-sm">
          <p className="text-sm font-semibold text-white">
            Drag & drop or select a file
          </p>
          <p className="text-xs text-white/70 mt-2">
            AI will automatically scan for harmful content.
          </p>
        </div>
      </div>
    ),
  },
];

export function HarmfulDetectionFeatureGrid() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
