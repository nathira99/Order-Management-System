import { Link } from "react-router-dom";
import { getToken, getRole, logout } from "../utils/auth";
import { LucideHeartHandshake } from "lucide-react";

function Navbar() {
  const token = getToken();
  const role = getRole();

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-screen px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LucideHeartHandshake className="text-slate-900" size={48} />
          {/* Logo / Brand */}
          <Link to="/" className="text-4xl font-bold text-slate-800">
            Online Academy
          </Link>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/courses"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="text-slate-700 hover:text-blue-600 font-medium"
          >
            About
          </Link>

          {!token ? (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to={role === "admin" ? "/admin" : "/dashboard"}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="text-red-500 hover:underline font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
