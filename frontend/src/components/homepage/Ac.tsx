import { motion } from "framer-motion";
import { HelpCircle, Brain, Users, Upload, BrainCircuit, BarChart3 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Animation variants for FAQ items
const faqItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeInOut" } },
};

// Animation variants for How It Works cards
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
};

// Animation variants for CTA section
const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

// FAQ Accordion Section
const FAQSection = ({  }: { scrollToDetect: () => void }) => (
  <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white py-16 px-8">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-center mb-12 text-zinc-100"
    >
      Frequently Asked Questions
    </motion.h2>
    <div className="max-w-5xl mx-auto">
      <Accordion type="single" collapsible className="space-y-4">
        {[
          {
            value: "item-1",
            icon: <HelpCircle className="w-6 h-6 text-blue-400" />,
            trigger: "What is Online Harmful Content Detection?",
            content:
              "Our project is an AI-powered tool designed to detect harmful content across text, images, and video files, ensuring safer digital environments.",
          },
          {
            value: "item-2",
            icon: <Brain className="w-6 h-6 text-green-400" />,
            trigger: "How does the detection work?",
            content:
              "Text: Analyzes for hate speech or abuse. Image: Detects explicit or harmful visuals. Video: Processes frames for comprehensive review.",
          },
          {
            value: "item-3",
            icon: <Users className="w-6 h-6 text-yellow-400" />,
            trigger: "Who can use this tool?",
            content:
              "Ideal for social media platforms, developers, institutions, and safety-focused communities looking to moderate content effectively.",
          },
        ].map((item) => (
          <motion.div
            key={item.value}
            variants={faqItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AccordionItem
              value={item.value}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 hover:bg-zinc-850 transition-colors duration-200"
            >
              <AccordionTrigger className="text-2xl font-semibold text-zinc-100 hover:no-underline">
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.trigger}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-zinc-300 text-base">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  </div>
);

// How It Works Section
const HowItWorksSection = () => (
  <div className="relative text-white py-16 px-8 overflow-hidden">
    {/* Subtle background grid pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="h-full w-full bg-[linear-gradient(to_right,#3f3f46_1px,transparent_1px),linear-gradient(to_bottom,#3f3f46_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-center mb-12 text-zinc-100"
    >
      How It Works
    </motion.h2>
    <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto relative z-10">
      {[
        {
          icon: <Upload className="w-16 h-16 text-blue-400" />,
          title: "1. Upload Your Content",
          desc: "Easily upload text, images, or videos for analysis.",
        },
        {
          icon: <BrainCircuit className="w-16 h-16 text-green-400" />,
          title: "2. AI-Powered Analysis",
          desc: "Our advanced models scan for harmful content in real-time.",
        },
        {
          icon: <BarChart3 className="w-16 h-16 text-yellow-400" />,
          title: "3. Actionable Results",
          desc: "Receive instant classifications and insights.",
        },
      ].map((step, idx) => (
        <motion.div
          key={idx}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true }}
          className="bg-zinc-900 p-6 rounded-2xl border border-zinc-700 shadow-lg text-center space-y-4"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="flex justify-center"
          >
            {step.icon}
          </motion.div>
          <h3 className="text-xl font-semibold text-zinc-100">{step.title}</h3>
          <p className="text-zinc-300">{step.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

// CTA Section
const CTASection = ({ scrollToDetect }: { scrollToDetect: () => void }) => (
  <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 text-white py-16 px-8 text-center overflow-hidden">
    {/* Animated gradient wave background */}
    <motion.div
      className="absolute inset-0 opacity-20"
      animate={{
        background: [
          "linear-gradient(45deg, #3f3f46, transparent)",
          "linear-gradient(45deg, transparent, #3f3f46)",
          "linear-gradient(45deg, #3f3f46, transparent)",
        ],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      variants={ctaVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative z-10"
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-4 text-zinc-100"
        animate={{ y: [0, -2, -1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        Ready for a Safer Digital Life?
      </motion.h2>
      <p className="text-lg text-zinc-300 mb-8">
        Start detecting harmful content with our AI-powered tool today.
      </p>
      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
        <button
          onClick={scrollToDetect}
          className="bg-zinc-200 cursor-pointer text-zinc-950 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-gradient-to-r hover:from-zinc-200 hover:to-zinc-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
        >
          Try Now
        </button>
      </motion.div>
    </motion.div>
  </div>
);

// Export all sections for integration into Homepage
export { FAQSection, HowItWorksSection, CTASection };