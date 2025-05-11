// components/Navbar.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const menuItems = ["Home", "Detect", "History", "Contact"];

  const handleNavigation = (label: string) => {
    const path = label.toLowerCase() === "home" ? "/" : `/${label.toLowerCase()}`;
    navigate(path);
    setMobileMenuOpen(false); // Also closes mobile menu
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-zinc-300 shadow-sm">
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
        <div className="hidden md:flex items-center  gap-10 text-zinc-700 font-medium text-lg">
          {menuItems.map((label, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(label)}
              className="hover:text-zinc-950 transition-colors cursor-pointer"
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
          {menuItems.map((label, index) => (
            <li
              key={index}
              className="hover:text-zinc-950 transition-colors cursor-pointer"
              onClick={() => handleNavigation(label)}
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
  );
};

export default Navbar;
