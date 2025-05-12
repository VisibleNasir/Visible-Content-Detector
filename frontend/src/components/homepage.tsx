// Homepage.tsx

import { useRef } from "react";
import Detect from "./homepage/Detect";
import { HarmfulDetectionFeatureGrid } from "./homepage/bentoDemo";
import Navbar from "./Navbar";
import HeroSectionSnippet from "./homepage/HeroSection";
import { CTASection, FAQSection, HowItWorksSection } from "./homepage/Ac";

const Homepage = () => {
  const detectSectionRef = useRef<HTMLDivElement>(null); // 👈 Ref to Detect section

  const scrollToDetect = () => {
    detectSectionRef.current?.scrollIntoView({ behavior: "smooth" }); // 👈 Scroll
  };

  return (
    <>
      <div className="bg-zinc-950 min-h-screen w-screen flex flex-col ">
        <Navbar/>

        {/* Hero Section */}
        <div className="relative flex h-lvh w-full ">
          <HeroSectionSnippet scrollToDetect={scrollToDetect} />
        </div>

        {/* Detect Section */}

        <div
          ref={detectSectionRef}
          className="flex flex-col items-center  justify-center text-white min-h-screen w-full gap-20"
        >
          <div className="flex flex-col items-center w-full bg-gradient-to-br from-zinc-900 to-zinc-950  ">
            <h1 className="text-4xl md:text-4xl    lg:text-5xl font-semibold py-6 text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 via-white to-zinc-700">
              Detect it !
            </h1>
            <Detect />
          </div>
          <div className="flex flex-col items-center">
            <HarmfulDetectionFeatureGrid />
          </div>
        </div>

        {/* FAQ Accordion */}
        <FAQSection scrollToDetect={scrollToDetect} />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* CTA Section */}
        <CTASection scrollToDetect={scrollToDetect} />

        {/* Footer */}
        <footer className="flex align-center justify-center text-white py-6 text-center border-t border-zinc-700">
          
        </footer>
      </div>
    </>
  );
};

export default Homepage;
