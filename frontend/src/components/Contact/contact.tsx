
import Navbar from "../Navbar";

const Contact = () => {


  return (
    <div className="min-h-screen w-screen flex flex-col bg-zinc-950">
      {/* Navbar */}
     <Navbar/>


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
