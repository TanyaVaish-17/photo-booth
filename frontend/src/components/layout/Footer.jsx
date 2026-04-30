import React from "react";
import { Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-200 text-pink-900 py-4">
      <div className="max-w-7xl mx-auto px-6 flex flex-row items-start justify-between gap-6">

        {/* Logo & tagline */}
        <div className="w-[30%]">
          <Link to="/">
            <h1 className="text-2xl font-extrabold text-pink-700 tracking-wide font-gowun mb-1">
              <span className="text-pink-600">K</span>-Click{" "}
              <span className="animate-ping inline-block">📸</span>
            </h1>
          </Link>
          <p className="text-sm text-pink-800">
            Capture your cutest K-moments in style! 💕
          </p>
        </div>

        {/* Quick links */}
        <div className="w-[30%]">
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-1 font-medium">
            <li>
              <Link to="/" className="flex items-center gap-2 hover:text-rose-700 transition">
                🏠 Home
              </Link>
            </li>
            <li>
              <Link to="/booth" className="flex items-center gap-2 hover:text-rose-700 transition">
                📷 Booth
              </Link>
            </li>
          </ul>
        </div>

        {/* Social links */}
        <div className="w-[30%]">
          <h2 className="text-lg font-semibold mb-2">Connect With Us 💌</h2>
          <div className="flex space-x-4">
            <a href="mailto:contact@kclickbooth.com" className="hover:text-rose-700 transition" aria-label="Email">
              <Mail size={20} />
            </a>
            <a href="tel:+1234567890" className="hover:text-rose-700 transition" aria-label="Phone">
              <Phone size={20} />
            </a>
            <a href="https://facebook.com/kclickbooth" target="_blank" rel="noopener noreferrer" className="hover:text-rose-700 transition" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com/kclickbooth" target="_blank" rel="noopener noreferrer" className="hover:text-rose-700 transition" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com/kclickbooth" target="_blank" rel="noopener noreferrer" className="hover:text-rose-700 transition" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-pink-900/70 select-none text-sm">
        © 2025{" "}
        <span className="font-semibold text-pink-800">K-Click Booth</span> —
        Built with{" "}
        <span role="img" aria-label="love">💖</span>{" "}
        by Tanya
      </p>
    </footer>
  );
}