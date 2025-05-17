
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
        
      </footer>
    </div>
  );
};

export default Contact;
