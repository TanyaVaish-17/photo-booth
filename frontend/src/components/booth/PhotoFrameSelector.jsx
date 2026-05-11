import React from "react";
import { SVG_FRAMES } from "../shared/PhotoFrame";

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

const frameKeys = Object.keys(FRAME_LABELS);

export default function PhotoFrameSelector({ selectedFrame, onSelectFrame }) {
  return (
    <>
      {/* ── Mobile: horizontal swipe carousel ── */}
      <div className="flex md:hidden gap-2.5 overflow-x-auto pb-2"
        style={{ scrollbarWidth:"none", msOverflowStyle:"none", scrollSnapType:"x mandatory" }}>
        {frameKeys.map((key) => {
          const svgFn = SVG_FRAMES[key];
          const previewUrl = svgFn ? svgToDataUrl(svgFn(120, 160)) : null;
          const isSel = selectedFrame === key;
          return (
            <div key={key} onClick={() => onSelectFrame(key)}
              style={{ flexShrink:0, width:76, scrollSnapAlign:"start", cursor:"pointer",
                borderRadius:14, overflow:"hidden",
                border: isSel ? "2.5px solid #ec4899" : "2px solid rgba(244,114,182,0.2)",
                boxShadow: isSel ? "0 0 0 3px rgba(236,72,153,0.18), 0 4px 14px rgba(236,72,153,0.28)" : "0 2px 6px rgba(0,0,0,0.08)",
                transform: isSel ? "scale(1.06)" : "scale(1)",
                transition:"all 0.2s ease",
                background:"#111827" }}>
              {previewUrl && (
                <img src={previewUrl} alt={key}
                  style={{ width:"100%", height:96, objectFit:"fill", display:"block" }} />
              )}
              <p style={{ margin:0, padding:"4px 3px", textAlign:"center",
                fontSize:9, fontWeight:700,
                color: isSel ? "#f472b6" : "#9ca3af",
                background:"#111827", lineHeight:1.3 }}>
                {FRAME_LABELS[key]}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Desktop: original 2→4 col grid (unchanged) ── */}
      <div className="hidden md:grid grid-cols-2 sm:grid-cols-4 gap-4 px-2">
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
                <img src={previewUrl} alt={key} className="w-full h-28 object-fill" />
              )}
              <p className="text-center text-xs py-1 text-pink-300 font-semibold bg-gray-900">
                {FRAME_LABELS[key]}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}