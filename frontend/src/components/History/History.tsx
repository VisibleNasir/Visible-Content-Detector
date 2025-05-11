import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Image, Video, Menu, X } from "lucide-react";
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
    <div className="min-h-screen w-screen flex flex-col bg-zinc-950">
      {/* Navbar */}
        <div className="sticky top-0 z-50 w-full bg-white shadow-sm">
  <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
    {/* Logo Section */}
    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
      <img src="./logo.png" alt="logo" className="w-10 h-10 object-contain" />
      <span className="text-xl font-bold text-zinc-800 tracking-wide">
        Harmful Detector
      </span>
    </div>

    {/* Desktop Navigation */}
    <div className="hidden md:flex items-center gap-10 text-zinc-700 font-medium text-lg">
      {["Home", "Detect", "History", "Contact"].map((label, index) => (
        <button
          key={index}
          onClick={() => navigate(`/${label.toLowerCase() === "home" ? "" : label.toLowerCase()}`)}
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
    <div
      className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
      onClick={toggleMobileMenu}
    />
  )}
</div>


      {/* Content */}
      <div className="max-w-6xl mx-auto p-6 text-white">
        <h1 className="text-4xl font-bold text-center mb-10">Detection History</h1>

        <div className="flex justify-center mb-10">
          <Button onClick={() => navigate("/detect")} className="text-white">
            Run New Detection
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyHistory.map((item, index) => (
            <Card key={index} className="bg-muted/50 border border-zinc-700">
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
  );
};

export default History;