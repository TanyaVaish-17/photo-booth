import React from "react";

export default function CaptureButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-6 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
      }`}
    >
      Click Me! 💖
    </button>
  );
}
