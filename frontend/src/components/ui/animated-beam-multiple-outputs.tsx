// src/registry/example/animated-beam-multiple-outputs.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AnimatedBeamMultipleOutputDemo({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center", className)}>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-xl"
      />
    </div>
  );
}
