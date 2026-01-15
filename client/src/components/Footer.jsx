import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* About */}
        <div>
          <h3 className="font-semibold mb-3">LearnHub</h3>
          <p className="text-sm text-gray-400 pr-12">
            A modern online learning platform for 
            academic and skill-based education.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/courses" className="hover:underline">Courses</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><Link to="/register" className="hover:underline">Register</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-400">Email: support@learnhub.com</p>
          <p className="text-sm text-gray-400">Phone: +91 90000 00000</p>
          <p className="text-sm text-gray-400">Location: India</p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} Online Academy. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;