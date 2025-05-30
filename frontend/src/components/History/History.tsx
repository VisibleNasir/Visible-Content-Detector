import React, { useState, useEffect, JSX } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Image as ImageIcon, Video, AlertCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Navbar from "../Navbar";

// Interfaces for type safety
interface HistoryItem {
  id: string;
  type: "Text" | "Image" | "Video";
  icon: JSX.Element;
  content: string;
  result: "Harmful" | "Safe";
  date: string;
}

interface HistoryProps {
  historyItems?: HistoryItem[];
}

// Mock data (replace with API in production)
const dummyHistory: HistoryItem[] = [
  {
    id: "1",
    type: "Text",
    icon: <FileText className="w-5 h-5 text-blue-400" />,
    content: "This is a test message with inappropriate content.",
    result: "Harmful",
    date: "2025-04-24T10:30:00",
  },
  {
    id: "2",
    type: "Image",
    icon: <ImageIcon className="w-5 h-5 text-green-400" />,
    content: "screenshot_001.png",
    result: "Safe",
    date: "2025-04-23T20:15:00",
  },
  {
    id: "3",
    type: "Video",
    icon: <Video className="w-5 h-5 text-yellow-400" />,
    content: "user_clip.mp4",
    result: "Harmful",
    date: "2025-04-22T18:00:00",
  },
];

// Format date using date-fns
const formatDate = (dateString: string): string => {
  try {
    return format(new Date(dateString), "MMM d, yyyy, h:mm a");
  } catch {
    return dateString;
  }
};

  return (
    <div className="min-h-screen w-screen flex flex-col">
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
                  
              {/*  */}
              {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMobileMenu} />
              )}
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Detection History</h1>
// Reusable HistoryItem component
interface HistoryItemProps {
  item: HistoryItem;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => (
  <div className="relative pl-10 pb-8 last:pb-0">
    {/* Timeline dot and line */}
    <div className="absolute left-0 top-2 w-5 h-5 rounded-full bg-zinc-700 border-2 border-zinc-500 shadow-sm" />
    <div className="absolute left-2 top-7 bottom-0 w-1 bg-gradient-to-b from-zinc-700 to-zinc-600" />
    
    <Card
      className="bg-gradient-to-br from-zinc-900 to-zinc-850 border border-zinc-800 hover:shadow-md transition-all duration-300"
      role="region"
      aria-labelledby={`history-item-${item.id}`}
    >
      <CardContent className="p-5 flex items-center gap-4">
        <div className="flex-shrink-0">{item.icon}</div>
        <div className="flex-1 min-w-0">
          <h3
            id={`history-item-${item.id}`}
            className="text-base font-bold text-zinc-100 truncate"
          >
            {item.type}: {item.content}
          </h3>
          <div className="text-xs text-zinc-400 mt-1">
            <span className="font-medium text-zinc-300">Date:</span> {formatDate(item.date)}
          </div>
        </div>
        <Badge
          variant={item.result === "Harmful" ? "destructive" : "default"}
          className={cn(
            item.result === "Harmful"
              ? "bg-red-600 text-white"
              : "bg-green-600 text-white",
            "text-xs font-semibold px-2 py-1"
          )}
        >
          {item.result}
        </Badge>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-zinc-700 text-zinc-100 hover:bg-zinc-800 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950 transition-colors duration-200"
        >
          <Link to={`/history/${item.id}`} aria-label={`View details for ${item.type} detection`}>
            Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  </div>
);

// Animation variants for staggered effect
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } },
};

// Main History component
const History: React.FC<HistoryProps> = ({ historyItems = dummyHistory }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate async data fetching
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800); // Slightly faster for polish
  }, []);

  // Handler for New Detection button
  const handleNewDetection = () => {
    console.log("Navigating to /detect"); // Debugging log, remove in production
    navigate("/detect");
  };

  return (
    <div className="min-h-screen w-screen flex flex-col bg-zinc-950 text-zinc-100 ">
      <Navbar />
      <main className="max-w-5xl mx-auto p-8 sm:p-12 w-full ">
        {/* Header */}
        {isLoading ? (
          <Skeleton className="h-10 w-48 mx-auto mb-12 bg-zinc-800 rounded-lg" />
        ) : (
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-3xl sm:text-4xl font-bold text-center mb-12 text-zinc-100 "
          >
            Detection History
          </motion.h1>  
        )}

        {/* History Timeline */}
        {isLoading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, idx) => (
              <Skeleton
                key={idx}
                className="h-20 w-full bg-zinc-800 rounded-lg  "
              />
            ))}
          </div>
        ) : historyItems.length === 0 ? (
          <div className=" text-center bg-gradient-to-br from-zinc-900 to-zinc-850 border border-zinc-800 rounded-lg p-8">
            <AlertCircle className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
            <p className="text-base text-zinc-300 mb-6">
              No detection history available. Start by running a new detection.
            </p>
            <Button
              onClick={handleNewDetection}
              className="bg-zinc-200 text-zinc-950 px-6 py-3 rounded-lg font-semibold hover:bg-zinc-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              Detect New Content
            </Button>
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              {historyItems.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <HistoryItem item={item} />
                </motion.div>
              ))}
            </motion.div>
            {/* Centered New Detection Button */}
            {isLoading ? null : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="flex justify-center mt-12"
              >
                <Button
                  onClick={handleNewDetection}
                  className="bg-zinc-200 text-zinc-950 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-zinc-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
                  aria-label="Run New Detection"
                >
                  Detect New Content
                </Button>
              </motion.div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default History;