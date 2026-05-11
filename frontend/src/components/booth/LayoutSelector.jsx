import React from "react";

const layouts = [
  { name: "Vertical Strip 📸", value: "vertical",  frames: 4, preview: "4 photos · 1 column" },
  { name: "Collage Grid ✨",   value: "collage",    frames: 4, preview: "4 equal photos · 2×2" },
  { name: "Triple Strip 🎞️",  value: "strip3",     frames: 3, preview: "3 photos · 1 column" },
];

export default function LayoutSelector({ selectedLayout, onSelect }) {
  return (
    <>
      {/* ── Mobile: horizontal swipe chips ── */}
      <div className="flex md:hidden gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth:"none", msOverflowStyle:"none" }}>
        <style>{`.ls-scroll::-webkit-scrollbar{display:none}`}</style>
        {layouts.map((layout) => {
          const isSelected = selectedLayout?.value === layout.value;
          return (
            <button key={layout.value} onClick={() => onSelect(layout)}
              className="flex-shrink-0 flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-2xl font-semibold border-2 transition-all text-left"
              style={{
                background: isSelected ? "linear-gradient(135deg,#ec4899,#f43f5e)" : "rgba(255,255,255,0.85)",
                borderColor: isSelected ? "#ec4899" : "rgba(244,114,182,0.35)",
                color: isSelected ? "white" : "#9d174d",
                boxShadow: isSelected ? "0 4px 14px rgba(236,72,153,0.35)" : "0 2px 6px rgba(0,0,0,0.06)",
                transform: isSelected ? "scale(1.04)" : "scale(1)",
                minWidth: 100,
              }}>
              <span className="text-xs font-bold leading-tight whitespace-nowrap">{layout.name}</span>
              <span className="text-[10px] opacity-70 whitespace-nowrap">{layout.preview}</span>
            </button>
          );
        })}
      </div>

      {/* ── Desktop: original layout (unchanged) ── */}
      <div className="hidden md:flex flex-wrap justify-center gap-4">
        {layouts.map((layout) => {
          const isSelected = selectedLayout?.value === layout.value;
          return (
            <button key={layout.value} onClick={() => onSelect(layout)}
              className={`px-5 py-3 rounded-2xl font-semibold border-2 transition-all flex flex-col items-center gap-1 min-w-[130px] ${
                isSelected
                  ? "bg-pink-500 text-white border-pink-500 shadow-md scale-105"
                  : "bg-white border-pink-300 text-pink-700 hover:bg-pink-50 hover:scale-105"
              }`}>
              <span className="text-base">{layout.name}</span>
              <span className={`text-xs font-normal ${isSelected ? "text-pink-100" : "text-pink-400"}`}>{layout.preview}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}