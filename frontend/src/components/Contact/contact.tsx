import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Contact = () => {
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


      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 text-white">
        <h1 className="text-4xl font-bold text-center mb-10">Contact Us</h1>
        <p className="text-center mb-6">
          If you have any questions, feedback, or concerns about the platform or its functionality, feel free to reach out.
        </p>

        <form className="space-y-6 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded text-white"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded text-white"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded text-white"
          />
          <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white">
            Send Message
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="flex align-center justify-center text-white py-6 text-center border-t border-zinc-700">
        <aside className="flex gap-2 items-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.672 15.226l-2.432.811...z" />
          </svg>
          <nav className="flex align-center justify-center gap-4 ml-4">
            <a href="https://www.youtube.com/@VisibleNasir" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-3.604-.246-11.631...z" />
              </svg>
            </a>
          </nav>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
      </footer>
    </div>
  );
};

export default Contact;
