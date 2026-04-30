import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-pink-100/80 backdrop-blur shadow-md px-6 py-4">
      <div className="relative flex items-center justify-between">
        <Link to="/">
          <h1 className="text-3xl font-extrabold text-pink-700 drop-shadow-sm tracking-wide font-gowun">
            <span className="text-pink-600">K</span>-Click{" "}
            <span className="animate-ping inline-block">📸</span>
          </h1>
        </Link>

        <div className="flex gap-8 text-lg font-semibold text-pink-700 ml-auto">
          {[
            { label: "Home", to: "/" },
            { label: "Booth", to: "/booth" },
          ].map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="relative hover:text-pink-600 transition after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-pink-500 hover:after:w-full after:transition-all after:duration-300"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}