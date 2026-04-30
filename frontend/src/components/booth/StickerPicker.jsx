import React, { useState } from "react";
import { SVG_STICKER_PACKS } from "./PhotoFrame";

export default function StickerPicker({ selectedStickers, setSelectedStickers }) {
  const [activePack, setActivePack] = useState("hearts");

  const toggleSticker = (emoji) => {
    if (selectedStickers.includes(emoji)) {
      setSelectedStickers(selectedStickers.filter(s => s !== emoji));
    } else if (selectedStickers.length < 6) {
      setSelectedStickers([...selectedStickers, emoji]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Pack tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {Object.entries(SVG_STICKER_PACKS).map(([key, pack]) => (
          <button key={key}
            onClick={() => setActivePack(key)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
              activePack === key ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-600 hover:bg-pink-200"
            }`}>
            {pack.name}
          </button>
        ))}
      </div>

      {/* Sticker grid */}
      <div className="flex flex-wrap gap-3 justify-center">
        {SVG_STICKER_PACKS[activePack].stickers.map(({ emoji }, idx) => (
          <button key={idx}
            onClick={() => toggleSticker(emoji)}
            className={`w-14 h-14 text-3xl rounded-xl border-2 transition-all hover:scale-110 ${
              selectedStickers.includes(emoji)
                ? "border-pink-500 bg-pink-100 scale-110"
                : "border-pink-200 bg-white hover:border-pink-300"
            }`}>
            {emoji}
          </button>
        ))}
      </div>

      {selectedStickers.length > 0 && (
        <div className="text-center">
          <p className="text-xs text-pink-400 mb-1">Selected ({selectedStickers.length}/6):</p>
          <div className="flex gap-2 justify-center flex-wrap">
            {selectedStickers.map((e, i) => (
              <button key={i} onClick={() => toggleSticker(e)}
                className="text-2xl w-10 h-10 bg-pink-50 rounded-lg border border-pink-200 hover:bg-red-50 transition-all"
                title="Click to remove">
                {e}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}