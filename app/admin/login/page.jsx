"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiArrowRight,
} from "react-icons/fi";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://chemicalsallied.in/api/admin/adminlogin",
        { email, password }
      );

      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">

        {/* ===== Left Branding Panel ===== */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white p-12 relative">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Admin Portal
            </h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Securely manage products, categories, inquiries, and system data
              from your centralized dashboard.
            </p>
          </div>

          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} Chemicals Allied
          </div>
        </div>

        {/* ===== Login Form ===== */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">

            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Link href="/">
                <img
                  src="https://5.imimg.com/data5/UM/WQ/MY-4137588/chemical-90x90.jpg"
                  alt="logo"
                  className="h-16 w-16 object-contain"
                />
              </Link>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-800">
                Sign in to your account
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Enter your credentials to access the dashboard
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex gap-3 text-sm">
                <FiAlertCircle className="mt-0.5 text-red-500" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a13045] focus:border-[#a13045] outline-none transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a13045] focus:border-[#a13045] outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#a13045] hover:bg-[#8a2a3b] text-white rounded-xl font-medium transition-all duration-300 flex justify-center items-center disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <>
                    Sign In
                    <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
