// src/registry/example/animated-list-demo.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const items = ["Content flagged", "User alerted", "Logged to database", "Slack notification sent"];

export default function AnimatedListDemo({ className }: { className?: string }) {
  return (
    <ul className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.3 }}
          className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-sm"
        >
          {item}
        </motion.li>
      ))}
    </ul>
  );
}
