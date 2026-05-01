import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-pink-100/80 backdrop-blur shadow-md px-6 py-4">
      <div className="relative flex items-center justify-between max-w-7xl mx-auto">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl font-extrabold text-pink-700 drop-shadow-sm tracking-wide">
            <span className="text-pink-600">K</span>-Click{" "}
            <span className="animate-ping inline-block">📸</span>
          </h1>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6 text-lg font-semibold text-pink-700">
          {[
            { label: "Home",     to: "/" },
            { label: "Booth",    to: "/booth" },
            { label: "Memories", to: "/memories" },
          ].map(({ label, to }) => (
            <Link key={label} to={to}
              className="relative hover:text-pink-600 transition after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-pink-500 hover:after:w-full after:transition-all after:duration-300">
              {label}
            </Link>
          ))}

          {/* Auth area */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown((p) => !p)}
                className="flex items-center gap-2 bg-pink-200 hover:bg-pink-300 text-pink-700 px-3 py-1.5 rounded-full transition text-sm font-semibold"
              >
                {user.photoURL
                  ? <img src={user.photoURL} alt="avatar" className="w-6 h-6 rounded-full object-cover" />
                  : <User size={16} />}
                <span className="max-w-[100px] truncate">
                  {user.displayName || user.email.split("@")[0]}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-pink-100 rounded-2xl shadow-xl py-2 z-50">
                  <Link to="/memories" onClick={() => setShowDropdown(false)}
                    className="block px-4 py-2 text-sm text-pink-600 hover:bg-pink-50 transition">
                    🌸 My Memories
                  </Link>
                  <hr className="my-1 border-pink-100" />
                  <button onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-50 transition flex items-center gap-2">
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth">
              <button className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow transition hover:scale-105">
                Sign In 💖
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}