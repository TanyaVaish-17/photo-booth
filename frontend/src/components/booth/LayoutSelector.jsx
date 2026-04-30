import React from "react";

const layouts = [
  {
    name: "Vertical Strip 📸",
    value: "vertical",
    frames: 4,
    preview: "4 photos · 1 column",
    icon: "▬▬▬▬",
  },
  {
    name: "Collage Grid ✨",
    value: "collage",
    frames: 4,
    preview: "4 equal photos · 2×2",
    icon: "▪▪\n▪▪",
  },
  {
    name: "Triple Strip 🎞️",
    value: "strip3",
    frames: 3,
    preview: "3 photos · 1 column",
    icon: "▬▬▬",
  },
];

export default function LayoutSelector({ selectedLayout, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {layouts.map((layout) => {
        const isSelected = selectedLayout?.value === layout.value;
        return (
          <button
            key={layout.value}
            onClick={() => onSelect(layout)}
            className={`px-5 py-3 rounded-2xl font-semibold border-2 transition-all flex flex-col items-center gap-1 min-w-[130px] ${
              isSelected
                ? "bg-pink-500 text-white border-pink-500 shadow-md scale-105"
                : "bg-white border-pink-300 text-pink-700 hover:bg-pink-50 hover:scale-105"
            }`}
          >
            <span className="text-base">{layout.name}</span>
            <span className={`text-xs font-normal ${isSelected ? "text-pink-100" : "text-pink-400"}`}>
              {layout.preview}
            </span>
          </button>
        );
      })}
    </div>
  );
}