import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

  return (
    <div className=" min-h-screen w-screen flex flex-col">
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

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Get in Touch</h1>
        <p className="text-center text-muted-foreground mb-10">
          Have questions or feedback? We'd love to hear from you.
        </p>

        <Card className="bg-muted/50 border-border shadow-xl">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="example@email.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Write your message..." rows={5} />
            </div>

            <Button className="w-full text-white">Send Message</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
