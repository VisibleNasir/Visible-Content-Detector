import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Image, Video } from "lucide-react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const dummyHistory = [
  {
    type: "Text",
    icon: <FileText className="w-6 h-6 text-blue-500" />,
    content: "This is a test message with inappropriate content.",
    result: "Harmful",
    date: "2025-04-24 10:30 AM",
  },
  {
    type: "Image",
    icon: <Image className="w-6 h-6 text-green-500" />,
    content: "screenshot_001.png",
    result: "Safe",
    date: "2025-04-23 08:15 PM",
  },
  {
    type: "Video",
    icon: <Video className="w-6 h-6 text-yellow-500" />,
    content: "user_clip.mp4",
    result: "Harmful",
    date: "2025-04-22 06:00 PM",
  },
];

const History = () => {
  const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
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
      
              {/* Overlay */}
              {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMobileMenu} />
              )}
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Detection History</h1>

        <div className="flex justify-center mb-10">
          <Button onClick={() => navigate("/detect")} className="text-white">
            Run New Detection
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyHistory.map((item, index) => (
            <Card key={index} className="bg-muted/50 border-border">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-4">
                  {item.icon}
                  <h2 className="text-lg font-semibold">{item.type} Detection</h2>
                </div>

                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Content:</span> {item.content}
                </div>

                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Result:</span>{" "}
                  <Badge
                    variant={item.result === "Harmful" ? "destructive" : "secondary"}
                  >
                    {item.result}
                  </Badge>
                </div>

                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Date:</span> {item.date}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
