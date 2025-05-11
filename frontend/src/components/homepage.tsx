// Homepage.tsx

import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import Detect from "./homepage/Detect";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Upload, BrainCircuit, BarChart3 } from "lucide-react";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HarmfulDetectionFeatureGrid } from "./homepage/bentoDemo";

const Homepage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const detectSectionRef = useRef<HTMLDivElement>(null); // 👈 Ref to Detect section

  const scrollToDetect = () => {
    detectSectionRef.current?.scrollIntoView({ behavior: "smooth" }); // 👈 Scroll
  };

  return (
    <>
      <div className="bg-zinc-950 min-h-screen w-screen flex flex-col ">
        {/* Navbar */}
        <div className="sticky top-0 z-50 w-full bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            {/* Logo Section */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src="./logo.png"
                alt="logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold text-zinc-800 tracking-wide">
                Harmful Detector
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10 text-zinc-700 font-medium text-lg">
              {["Home", "Detect", "History", "Contact"].map((label, index) => (
                <button
                  key={index}
                  onClick={() =>
                    navigate(
                      `/${
                        label.toLowerCase() === "home"
                          ? ""
                          : label.toLowerCase()
                      }`
                    )
                  }
                  className="hover:text-blue-600 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-zinc-800">
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:hidden`}
          >
            <div className="flex justify-end p-4">
              <button onClick={toggleMobileMenu} className="text-zinc-800">
                <X size={28} />
              </button>
            </div>
            <ul className="flex flex-col px-6 space-y-6 mt-10 text-lg font-semibold text-zinc-800">
              {["Home", "Detect", "History", "Contact"].map((label, index) => (
                <li
                  key={index}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                  onClick={() => {
                    navigate(
                      `/${
                        label.toLowerCase() === "home"
                          ? ""
                          : label.toLowerCase()
                      }`
                    );
                    toggleMobileMenu();
                  }}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Overlay */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
              onClick={toggleMobileMenu}
            />
          )}
        </div>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-white min-h-screen w-lvw relative">
          <div className="relative flex h-full w-full flex-col items-center justify-center">
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold max-w-7xl py-6 text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 via-white to-zinc-700">
              Protect Minds From Harm!
            </h1>
            <InteractiveGridPattern
              className={cn(
                "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                "inset-y-[-400%] h-[370%] skew-y-12"
              )}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute top-50 z-30 flex flex-col items-center cursor-pointer"
              onClick={scrollToDetect}
            >
              <p className="text-white text-sm mb-2">Scroll Down</p>
              <svg
                className="w-6 h-6 text-white animate-bounce"
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

        {/* Detect Section */}

        <div
          ref={detectSectionRef}
          className="flex flex-col items-center justify-center text-white min-h-screen w-full gap-20"
        >
          <div className="flex flex-col items-center w-full bg-gradient-to-br from-zinc-900 to-zinc-950  ">
            <h1 className="text-4xl md:text-4xl mt-19 lg:text-5xl font-semibold py-6 text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 via-white to-zinc-700">
              Detect it !
            </h1>
            <Detect />
          </div>
          <div className="flex flex-col items-center">
            <HarmfulDetectionFeatureGrid />
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="flex align-center justify-center text-white py-10 w-vw">
          <Accordion
            type="single"
            collapsible
            className="w-1/2 align-center justify-center"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What is Online Harmful Content Detection?
              </AccordionTrigger>
              <AccordionContent>
                Our project is an AI-powered tool designed to detect harmful
                content across text, images, and video files.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does the detection work?</AccordionTrigger>
              <AccordionContent>
                Text: Analyzes for hate or abuse. Image: Detects explicit
                visuals. Video: Processes frames for review.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Who can use this tool?</AccordionTrigger>
              <AccordionContent>
                Useful for social media platforms, developers, institutions, and
                safety-focused communities.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* How It Works Section */}
        <div className="text-white py-16 px-8 ">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {[
              {
                icon: <Upload className="w-12 h-12 text-white" />,
                title: "1. Upload Your Content",
                desc: "Text, images or video — you decide.",
              },
              {
                icon: <BrainCircuit className="w-12 h-12 text-white" />,
                title: "2. Our AI Analyzes It",
                desc: "Powerful models scan for harmful elements.",
              },
              {
                icon: <BarChart3 className="w-12 h-12 text-white" />,
                title: "3. Get Actionable Results",
                desc: "Receive real-time classification instantly.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-zinc-800 p-6 rounded-2xl shadow-lg text-center space-y-4"
              >
                <div className="flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-zinc-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white py-16 px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready for safe life ?</h2>
          <p className="text-lg mb-8">
            Start detecting harmful content with our AI now.
          </p>
          <button
            onClick={scrollToDetect}
            className="bg-yellow-200 hover:cursor-pointer text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition-all"
          >
            Try Now
          </button>
        </div>

        {/* Footer */}
        <footer className="flex align-center justify-center text-white py-6 text-center border-t border-zinc-700">
          <aside className="flex gap-2 items-center">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z" />
            </svg>
            <nav className="flex align-center justify-center gap-4 ml-4">
              <a
                href="https://www.youtube.com/@VisibleNasir"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </nav>
            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
          </aside>
        </footer>
      </div>
    </>
  );
};

export default Homepage;
