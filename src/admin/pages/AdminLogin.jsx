import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAdminAuth } from "../context/AdminAuthContext";
import { Mail, Lock, LogIn, Shield, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@ucp.com");
  const [password, setPassword] = useState("admin123");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login({ email, password, remember });
      toast.success("Welcome!");
      navigate("/admin", { replace: true });
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md animate-fadeIn">
        {/* Card with subtle glassmorphism */}
        <div className="relative rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-xl shadow-slate-200/50 p-8 md:p-10">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex p-3 rounded-2xl bg-blue-600 shadow-md shadow-blue-500/20 mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              Admin Login
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Demo credentials:{" "}
              <span className="font-medium text-slate-700">
                admin@ucp.com
              </span>{" "}
              /{" "}
              <span className="font-medium text-slate-700">
                admin123
              </span>
            </p>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  className="w-full rounded-xl border border-slate-200 bg-white/60 pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition duration-200"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-xl border border-slate-200 bg-white/60 pl-10 pr-10 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition duration-200"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0 transition duration-200"
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline transition duration-200"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign in
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Custom fade-in animation – subtle and fast */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}