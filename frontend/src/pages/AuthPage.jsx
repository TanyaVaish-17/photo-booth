import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageLayout from "../components/layout/PageLayout";

export default function AuthPage() {
  const [mode, setMode]         = useState("login"); // "login" | "signup"
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const { login, signup, loginGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await signup(email, password, name);
      }
      navigate("/memories");
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await loginGoogle();
      navigate("/memories");
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-8 w-full max-w-md border border-pink-100">

          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-5xl">🎀</span>
            <h2 className="text-3xl font-extrabold text-pink-700 mt-3 mb-1">
              {mode === "login" ? "Welcome Back!" : "Join K-Click Booth"}
            </h2>
            <p className="text-pink-400 text-sm">
              {mode === "login"
                ? "Sign in to see your memories 💕"
                : "Create an account to save your K-moments 💖"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-semibold text-pink-600 mb-1">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your cute name 🌸"
                  required
                  className="w-full border border-pink-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-pink-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full border border-pink-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-pink-600 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full border border-pink-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl shadow-md hover:scale-[1.02] transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "Please wait…" : mode === "login" ? "Sign In 💖" : "Create Account 🎀"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-pink-100" />
            <span className="text-xs text-pink-300 font-medium">or</span>
            <div className="flex-1 h-px bg-pink-100" />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-pink-200 bg-white hover:bg-pink-50 text-gray-700 font-semibold py-3 rounded-xl shadow-sm hover:scale-[1.02] transition-all duration-200 disabled:opacity-50"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Toggle mode */}
          <p className="text-center text-sm text-pink-400 mt-6">
            {mode === "login" ? (
              <>Don't have an account?{" "}
                <button onClick={() => { setMode("signup"); setError(""); }}
                  className="text-pink-600 font-bold hover:underline">Sign Up</button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button onClick={() => { setMode("login"); setError(""); }}
                  className="text-pink-600 font-bold hover:underline">Sign In</button>
              </>
            )}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}

function friendlyError(code) {
  const map = {
    "auth/user-not-found":       "No account found with this email.",
    "auth/wrong-password":       "Incorrect password. Please try again.",
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-email":        "Please enter a valid email address.",
    "auth/weak-password":        "Password must be at least 6 characters.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/invalid-credential":   "Invalid email or password.",
  };
  return map[code] || "Something went wrong. Please try again.";
}