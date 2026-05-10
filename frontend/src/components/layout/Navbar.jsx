import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, User, Menu, X, Camera } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
    setShowDropdown(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
    setMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { label: "Home",     to: "/",         icon: "🏠" },
    { label: "Booth",    to: "/booth",    icon: "📸" },
    { label: "Memories", to: "/memories", icon: "🌸" },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <>
      {/* ═══════════ NAVBAR BAR ═══════════ */}
      <nav className="sticky top-0 z-50 bg-pink-100/95 backdrop-blur-sm border-b border-pink-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-xl md:text-3xl font-extrabold text-pink-700 tracking-wide">
              <span className="text-pink-600">K</span>-Click{" "}
              <span className="animate-ping inline-block text-base">📸</span>
            </h1>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 text-lg font-semibold text-pink-700">
            {navLinks.map(({ label, to }) => (
              <Link key={label} to={to}
                className={`relative hover:text-pink-600 transition-colors
                  after:absolute after:-bottom-1 after:left-0 after:h-[2px]
                  after:bg-pink-500 after:transition-all after:duration-300
                  ${isActive(to) ? "text-pink-600 after:w-full" : "after:w-0 hover:after:w-full"}`}>
                {label}
              </Link>
            ))}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setShowDropdown(p => !p)}
                  className="flex items-center gap-2 bg-pink-200 hover:bg-pink-300 text-pink-700 px-3 py-1.5 rounded-full transition text-sm font-semibold">
                  {user.photoURL
                    ? <img src={user.photoURL} alt="avatar" className="w-6 h-6 rounded-full object-cover" />
                    : <User size={16} />}
                  <span className="max-w-[100px] truncate">{user.displayName || user.email.split("@")[0]}</span>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-pink-100 rounded-2xl shadow-xl py-2 z-[60]">
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
                <button
                  className="text-white text-sm font-bold px-5 py-2 rounded-full transition-all hover:scale-105 hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#ec4899,#f43f5e)", boxShadow: "0 4px 14px rgba(236,72,153,0.4)" }}>
                  Sign In 💖
                </button>
              </Link>
            )}
          </div>

          {/* Mobile right */}
          <div className="flex md:hidden items-center gap-2">
            {user && (
              <button onClick={() => setShowDropdown(p => !p)}
                className="flex items-center gap-1.5 bg-pink-100 border border-pink-200 text-pink-700 px-2.5 py-1.5 rounded-full text-xs font-semibold">
                {user.photoURL
                  ? <img src={user.photoURL} alt="avatar" className="w-5 h-5 rounded-full object-cover" />
                  : <User size={12} />}
                <span className="max-w-[55px] truncate">{user.displayName || user.email.split("@")[0]}</span>
              </button>
            )}
            <button
              onClick={() => setMenuOpen(p => !p)}
              className="p-2 rounded-xl bg-pink-200 text-pink-700 hover:bg-pink-300 active:scale-95 transition"
              aria-label="Toggle menu">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile user dropdown */}
        {showDropdown && user && (
          <div className="md:hidden absolute right-4 top-14 w-44 bg-white border border-pink-100 rounded-2xl shadow-xl py-2 z-[60]">
            <Link to="/memories" onClick={() => setShowDropdown(false)}
              className="block px-4 py-2.5 text-sm text-pink-600 hover:bg-pink-50 transition">
              🌸 My Memories
            </Link>
            <hr className="my-1 border-pink-100" />
            <button onClick={handleLogout}
              className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-50 transition flex items-center gap-2">
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        )}
      </nav>

      {/* ═══════════ MOBILE DRAWER ═══════════ */}

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/20"
          style={{ backdropFilter: "blur(2px)" }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Drawer — only rendered when open, so it NEVER blocks clicks when closed */}
      {menuOpen && (
      <div
        className="fixed z-50 md:hidden"
        style={{
          top: "56px",
          right: "12px",
          width: "220px",
          animation: "drawerIn 0.2s ease forwards",
        }}>
        <style>{`@keyframes drawerIn{from{opacity:0;transform:translateY(-8px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.97)",
          borderRadius: "20px",
          border: "1px solid rgba(251,207,232,0.8)",
          boxShadow: "0 8px 32px rgba(236,72,153,0.15), 0 2px 8px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}>

          {/* Header — logo + close */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px 10px", borderBottom: "1px solid rgba(252,231,243,0.8)" }}>
            <Link to="/" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: 10, background: "linear-gradient(135deg,#ec4899,#f43f5e)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(236,72,153,0.35)" }}>
                <Camera size={13} color="white" />
              </div>
              <div style={{ lineHeight: 1.2 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 900, color: "#be185d" }}>K-Click</p>
                <p style={{ margin: 0, fontSize: 9, color: "#f9a8d4" }}>Photo Booth</p>
              </div>
            </Link>
            <button onClick={() => setMenuOpen(false)}
              style={{ width: 24, height: 24, borderRadius: "50%", background: "#fce7f3", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#ec4899" }}>
              <X size={12} />
            </button>
          </div>

          {/* Sign In CTA — top, only when logged out */}
          {!user && (
            <div style={{ padding: "10px 12px 6px" }}>
              <button
                onClick={() => { setMenuOpen(false); navigate("/auth"); }}
                style={{
                  width: "100%", padding: "9px 0", borderRadius: 14, border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg,#ec4899,#f43f5e)",
                  color: "white", fontWeight: 800, fontSize: 13,
                  boxShadow: "0 4px 14px rgba(236,72,153,0.35)",
                  transition: "transform 0.15s",
                }}>
                Sign In 💖
              </button>
            </div>
          )}

          {/* Nav links */}
          <div style={{ padding: "8px 10px 10px" }}>
            <p style={{ margin: "0 0 6px 4px", fontSize: 9, fontWeight: 900, color: "#fbb6ce", textTransform: "uppercase", letterSpacing: "0.1em" }}>Navigation</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {navLinks.map(({ label, to, icon }) => (
                <Link key={label} to={to} onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "9px 12px", borderRadius: 12, textDecoration: "none",
                    fontWeight: 700, fontSize: 13,
                    transition: "transform 0.1s, background 0.15s",
                    ...(isActive(to)
                      ? { background: "linear-gradient(135deg,#ec4899,#f43f5e)", color: "white", boxShadow: "0 3px 10px rgba(236,72,153,0.3)" }
                      : { background: "rgba(252,231,243,0.5)", color: "#be185d", border: "1px solid rgba(251,207,232,0.6)" }
                    )
                  }}>
                  <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{icon}</span>
                  <span style={{ flex: 1 }}>{label}</span>
                  {isActive(to) && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.6)" }} />}
                </Link>
              ))}
            </div>
          </div>

          {/* User section — only when logged in */}
          {user && (
            <div style={{ padding: "0 10px 10px", borderTop: "1px solid rgba(252,231,243,0.8)", paddingTop: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: "rgba(252,231,243,0.4)", borderRadius: 12, marginBottom: 6 }}>
                {user.photoURL
                  ? <img src={user.photoURL} alt="avatar" style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", border: "2px solid #fce7f3", flexShrink: 0 }} />
                  : <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#f472b6,#fb7185)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <User size={14} color="white" />
                    </div>}
                <div style={{ overflow: "hidden", flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#be185d", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.displayName || "User"}</p>
                  <p style={{ margin: 0, fontSize: 9, color: "#f9a8d4", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.email}</p>
                </div>
              </div>
              <button onClick={handleLogout}
                style={{ width: "100%", padding: "7px 0", borderRadius: 12, background: "#fef2f2", border: "1px solid #fecaca", color: "#f87171", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                <LogOut size={11} /> Sign Out
              </button>
            </div>
          )}

          {/* Bottom tagline */}
          <p style={{ margin: 0, textAlign: "center", fontSize: 9, color: "#fbb6ce", padding: "4px 0 10px" }}>✨ K-Click Photo Booth ✨</p>
        </div>
      </div>
      )}
    </>
  );
}