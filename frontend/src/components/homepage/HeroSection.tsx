import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";

interface HeroSectionProps {
  scrollToDetect: () => void;
}

const HeroSectionSnippet: React.FC<HeroSectionProps> = ({ scrollToDetect }) => {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants for the headline
  const headlineVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  // Animation for the "Harm" light-passing effect
  const harmVariants = {
    initial: { backgroundPosition: "0% 50%" },
    animate: shouldReduceMotion
      ? { backgroundPosition: "0% 50%" }
      : {
          backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"],
          transition: {
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          },
        },
  };

  // Animation for the glow effect
  const glowVariants = {
    initial: { boxShadow: "0 0 8px rgba(250, 204, 21, 0.5)" },
    animate: shouldReduceMotion
      ? { boxShadow: "0 0 8px rgba(250, 204, 21, 0.5)" }
      : {
          boxShadow: [
            "0 0 8px rgba(250, 204, 21, 0.5)",
            "0 0 16px rgba(250, 204, 21, 0.8)",
            "0 0 8px rgba(250, 204, 21, 0.5)",
          ],
          transition: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        },
  };



  // Animation for the scroll down button
  const scrollVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    },
    hover: { scale: 1.1, color: "#3b82f6" }, // blue-400 on hover
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-zinc-950">
      {/* Background InteractiveGridPattern with radial gradient overlay */}
      <div className="absolute inset-0 z-0">
        <InteractiveGridPattern
          className={cn(
            "opacity-50",
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 space-y-4">
        <motion.h1
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-4xl py-6 text-center text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400"
        >
          Protect Minds From{" "}
          <motion.span
            variants={harmVariants}
            initial="initial"
            animate="animate"
            className="relative inline-block text-zinc-950 px-2 rounded-md"
            style={{
              backgroundImage: "linear-gradient(90deg, #facc15, #fef08a, #facc15)",
              backgroundSize: "200% 100%",
            }}
          >
            <motion.span
              variants={glowVariants}
              initial="initial"
              animate="animate"
              className="relative z-10"
            >
              Harm
            </motion.span>
            <span className="absolute inset-0 opacity-0" aria-hidden="true" />
          </motion.span>
          !
        </motion.h1>


        {/* Scroll Down Button */}
        <motion.div
          variants={scrollVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="absolute top-60 flex flex-col items-center cursor-pointer"
          onClick={scrollToDetect}
          role="button"
          aria-label="Scroll to Detect Section"
        >
          <p className="text-zinc-400 text-sm mb-2">Scroll Down</p>
          <svg
            className="w-6 h-6 text-zinc-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSectionSnippet;