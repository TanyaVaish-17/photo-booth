import React from "react";
import { SVG_FRAMES } from "../shared/PhotoFrame";

// Helper to turn SVG string → data URL for preview thumbnails
function svgToDataUrl(svgStr) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgStr.trim())}`;
}

const FRAME_LABELS = {
  frame1: "Polaroid 🤍",
  frame2: "Floral 🌸",
  frame3: "Starlight ⭐",
  frame4: "Luxury 👑",
  frame5: "Kawaii 🎀",
  frame6: "Blossom 🌺",
  frame7: "Film 🎞️",
  frame8: "Neon 💜",
};

// We need to export SVG_FRAMES from PhotoFrame — make sure that export exists
const frameKeys = Object.keys(FRAME_LABELS);

export default function PhotoFrameSelector({ selectedFrame, onSelectFrame }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-2">
      {frameKeys.map((key) => {
        const svgFn = SVG_FRAMES[key];
        const previewUrl = svgFn ? svgToDataUrl(svgFn(120, 160)) : null;
        return (
          <div key={key}
            onClick={() => onSelectFrame(key)}
            className={`cursor-pointer rounded-xl border-4 transition-all hover:scale-105 overflow-hidden bg-gray-900 ${
              selectedFrame === key ? "border-pink-500 scale-105 shadow-lg" : "border-transparent hover:border-pink-300"
            }`}>
            {previewUrl && (
              <img src={previewUrl} alt={key}
                className="w-full h-28 object-fill" />
            )}
            <p className="text-center text-xs py-1 text-pink-300 font-semibold bg-gray-900">
              {FRAME_LABELS[key]}
            </p>
          </div>
        );
      })}
    </div>
  );
}