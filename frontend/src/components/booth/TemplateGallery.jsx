import React from "react";

const templates = [
  {
    id: 1,
    name: "Kawaii Red 🌸",
    layout: "vertical3",  // 3 rows × 1 col — portrait, fits frame1 perfectly
    frame: "frame5",      // kawaii bow frame (no bottom label that cuts photos)
    stickers: [],
    filter: "Warm",
    emoji: "🌸",
    bg: "from-pink-300 to-rose-400",
    desc: "3-shot vertical strip · warm tones",
  },
  {
    id: 2,
    name: "Seoul Street ⭐",
    layout: "vertical4",  // 4 rows × 1 col — portrait frame works correctly
    frame: "frame3",      // star/purple frame
    stickers: [],
    filter: "Cool",
    emoji: "⭐",
    bg: "from-purple-300 to-blue-400",
    desc: "4-shot vertical strip · cool city vibes",
  },
  {
    id: 3,
    name: "Cherry Blossom 🌺",
    layout: "strip3",     // 3 rows × 1 col
    frame: "frame6",      // cherry blossom frame
    stickers: [],
    filter: "Original",
    emoji: "🌺",
    bg: "from-pink-200 to-fuchsia-300",
    desc: "3-shot strip · fresh floral look",
  },
  {
    id: 4,
    name: "K-Drama ✨",
    layout: "vertical4",  // 4-shot vertical
    frame: "frame4",      // gold luxury frame
    stickers: [],
    filter: "Retro",
    emoji: "✨",
    bg: "from-yellow-200 to-orange-300",
    desc: "4-shot classic strip · retro finish",
  },
  {
    id: 5,
    name: "Pastel Dreams 🧁",
    layout: "collage",    // 2×2 = 4 equal squares
    frame: "frame5",      // kawaii frame
    stickers: [],
    filter: "Warm",
    emoji: "🧁",
    bg: "from-indigo-200 to-pink-200",
    desc: "4-shot collage · equal squares",
  },
  {
    id: 6,
    name: "B&W Classic 🖤",
    layout: "vertical3",
    frame: "frame7",      // film strip frame
    stickers: [],
    filter: "Black & White",
    emoji: "🖤",
    bg: "from-gray-300 to-gray-500",
    desc: "3-shot strip · timeless monochrome",
  },
];

export default function TemplateGallery({ onSelect, selectedTemplate }) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <p className="text-pink-500 text-sm mb-6">
        Pick a template — it sets the layout, frame, and filter for you!
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 px-2 pb-6">
        {templates.map((template) => {
          const isSelected = selectedTemplate?.id === template.id;
          return (
            <div key={template.id} onClick={() => onSelect(template)}
              className={`cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 border-4 ${
                isSelected ? "border-rose-500 scale-105" : "border-pink-200 hover:border-pink-400"
              }`}
            >
              <div className={`h-36 bg-gradient-to-br ${template.bg} flex flex-col items-center justify-center gap-2`}>
                <span className="text-5xl">{template.emoji}</span>
                <span className="text-white text-xs font-semibold bg-black/20 px-2 py-0.5 rounded-full">
                  {template.filter}
                </span>
              </div>
              <div className="p-3 bg-white/90 text-center">
                <h4 className="text-sm font-bold text-pink-700 leading-tight">{template.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{template.desc}</p>
                {isSelected && (
                  <span className="inline-block mt-2 text-xs bg-rose-500 text-white px-3 py-0.5 rounded-full font-semibold">
                    ✓ Selected
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}