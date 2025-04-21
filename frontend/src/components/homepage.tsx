import { useNavigate } from "react-router-dom";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Detect from "./homepage/Detect";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
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

  return (
    <>
      <div className="bg-black min-h-screen w-screen flex flex-col">
        {/* Navbar */}
        <div className="grid-cols-1 bg-zinc-950 border-b-0 border-gray-50 sticky top-0 z-50 gradient-to-r flex justify-between flex-nowrap items-start w-full px-10 py-3 outline ">
          <div className="flex items-center gap-2  h-16">
            <img src="./logo.png" alt="logo" className="w-10 h-8" />
            <div className="logo text-white text-xl font-bold cursor-pointer">
              Harmfull Content Detector
            </div>
          </div>

          {/* Mobile menu toggle button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links hidden md:flex justify-between items-center w-1/2 pr-40 h-16">
            <ul className="flex justify-between items-center w-full md:text-2xl lg:text-4x">
              <div>
                <li
                  className="text-white text-lg font-semibold cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  Home
                </li>
              </div>
              <div>
                <li
                  className="text-white text-lg font-semibold cursor-pointer"
                  onClick={() => navigate("/detect")}
                >
                  Detect
                </li>
              </div>
              <div>
                <li
                  className="text-white text-lg font-semibold cursor-pointer"
                  onClick={() => navigate("/songs")}
                >
                  History
                </li>
              </div>
              <div>
                <li
                  className="text-white text-lg font-semibold cursor-pointer"
                  onClick={() => navigate("/contact")}
                >
                  Contact
                </li>
              </div>
            </ul>
          </div>
        </div>

        {/* Mobile Side Navigation */}
        <div
          className={`fixed top-0 right-0 h-full bg-black w-64 z-50 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleMobileMenu} className="text-white">
              <X size={24} />
            </button>
          </div>

          <ul className="flex flex-col p-4 space-y-6">
            <li
              className="text-white text-lg font-semibold cursor-pointer"
              onClick={() => {
                navigate("/");
                toggleMobileMenu();
              }}
            >
              Home
            </li>
            <li
              className="text-white text-lg font-semibold cursor-pointer"
              onClick={() => {
                navigate("/detect");
                toggleMobileMenu();
              }}
            >
              Detect
            </li>
            <li
              className="text-white text-lg font-semibold cursor-pointer"
              onClick={() => {
                navigate("/songs");
                toggleMobileMenu();
              }}
            >
              History
            </li>
            <li
              className="text-white text-lg font-semibold cursor-pointer"
              onClick={() => {
                navigate("/contact");
                toggleMobileMenu();
              }}
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Overlay when mobile menu is open */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMobileMenu}
          ></div>
        )}

<div className="flex flex-col items-center justify-center text-white min-h-screen w-full relative">
  <div className="relative flex h-full w-full flex-col items-center justify-center bg-background">
    <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold max-w-7xl   py-6 bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700">
      Protect Minds From Harm! <br />
    </h1>

    <InteractiveGridPattern
      className={cn(
        "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
        "inset-y-[-300%] h-[570%] skew-y-12"
      )}
    />

    {/* Scroll Down Indicator */}
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="absolute top-50 z-30 flex flex-col items-center"
    >
      <p className="text-white text-sm mb-2">Scroll Down</p>
      <svg
        className="w-6 h-6 text-white animate-bounce"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </motion.div>
  </div>
</div>

<div className="flex flex-col items-center justify-center text-white min-h-screen w-full gap-20">
  <div className="flex flex-col items-center justify-center text-white">
    <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700">
      Detect it !<br />
    </h1>
    <Detect />
  </div>

  <div className="flex flex-col items-center justify-center text-white">
    <HarmfulDetectionFeatureGrid />
  </div>
</div>

        <div className="flex align-center justify-center  text-white ">
          <Accordion type="single" collapsible className="w-1/2">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What is Online Harmful Content Detection?
              </AccordionTrigger>
              <AccordionContent>
                Our project is an AI-powered tool designed to detect harmful
                content across text, images, and video files. It provides a
                quick and efficient way to ensure content safety on digital
                platforms.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does the detection work?</AccordionTrigger>
              <AccordionContent>
                The system uses machine learning models for each type of media:
                Text: Analyzes input for hate speech, abuse, or sensitive
                content. Image: Uses deep learning to scan for explicit or
                violent imagery. Video: Breaks videos into frames and evaluates
                them for inappropriate scenes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Who can use this tool?</AccordionTrigger>
              <AccordionContent>
                This tool is ideal for: Social media moderators Online platform
                developers Educational institutions Anyone building safe
                AI-integrated platforms
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Homepage;
