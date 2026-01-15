import { useState } from "react";
import { loginUser } from "../services/authApi";
import { setToken, getRole } from "../utils/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });
      setToken(res.data.token);

      const redirectTo = location.state?.from || "/";
      const role = getRole();

      if (role === "admin") navigate("/admin");
      else navigate(redirectTo);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 m-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            Academy Login
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Access your courses and dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Email address
            </label>
            <input
              type="email"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-slate-300 outline-none"
              placeholder="student@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-slate-300 outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-2.5 rounded-lg hover:bg-slate-900 transition"
          >
            Sign In
          </button>
          <p className="text-xs text-slate-500 text-center mt-4">
            Secure access for students & administrators
          </p>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-slate-600">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-slate-800 font-medium hover:underline"
            >
              Create one
            </Link>
          </p>

          <Link to="/forgot-password" className="block mt-2 hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
