// Homepage.tsx

import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
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

  return (
    <>
      <div className="bg-zinc-950 min-h-screen w-screen flex flex-col ">
        {/* Navbar */}
        <div className="grid-cols-1 bg-zinc-950 sticky top-0 z-50 flex justify-between items-start w-full px-10 py-3">
          <div className="flex items-center gap-2 h-16">
            <img src="./logo.png" alt="logo" className="w-10 h-8" />
            <div className="logo text-white text-xl font-bold cursor-pointer">
              Harmful Content Detector
            </div>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links hidden md:flex justify-between items-center w-1/2 pr-40 h-16">
            <ul className="flex justify-between items-center w-full md:text-2xl lg:text-4xl">
              {["Home", "Detect", "History", "Contact"].map((label, index) => (
                <li
                  key={index}
                  className="text-white text-lg font-semibold cursor-pointer"
                  onClick={() => navigate(`/${label.toLowerCase() === "home" ? "" : label.toLowerCase()}`)}
                >
                  {label}
                </li>
                
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Menu */}
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
            {["Home", "Detect", "History", "Contact"].map((label, index) => (
              <li
                key={index}
                className="text-white text-lg font-semibold cursor-pointer"
                onClick={() => {
                  navigate(`/${label.toLowerCase() === "home" ? "" : label.toLowerCase()}`);
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
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMobileMenu} />
        )}

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
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              className="absolute top-50 z-30 flex flex-col items-center"
            >
              <p className="text-white text-sm mb-2">Scroll Down</p>
              <svg className="w-6 h-6 text-white animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Detect Section */}
        <div className="flex flex-col items-center justify-center text-white min-h-screen w-full gap-20">
          <div className="flex flex-col items-center w-full bg-gradient-to-br from-zinc-900 to-zinc-950 h-full ">
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-semibold py-6 text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 via-white to-zinc-700">
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
          <Accordion type="single" collapsible className="w-1/2 align-center justify-center"> 
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Online Harmful Content Detection?</AccordionTrigger>
              <AccordionContent>
                Our project is an AI-powered tool designed to detect harmful content across text, images, and video files.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does the detection work?</AccordionTrigger>
              <AccordionContent>
                Text: Analyzes for hate or abuse. Image: Detects explicit visuals. Video: Processes frames for review.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Who can use this tool?</AccordionTrigger>
              <AccordionContent>
                Useful for social media platforms, developers, institutions, and safety-focused communities.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* How It Works Section */}
<div className="text-white py-16 px-8 ">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
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
      <div key={idx} className="bg-zinc-800 p-6 rounded-2xl shadow-lg text-center space-y-4">
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
          <p className="text-lg mb-8">Start detecting harmful content with our AI now.</p>
          <button
            onClick={() => navigate("/detect")}
            className="bg-yellow-200 hover:cursor-pointer text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition-all"
          >
            Try Now
          </button>
        </div>

        {/* Footer */}
        <footer className=" text-white py-6 text-center border-t border-zinc-700">
          <p className="text-sm">© {new Date().getFullYear()} Chaincare . All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Homepage;
