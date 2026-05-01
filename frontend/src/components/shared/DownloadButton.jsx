import React, { useState } from "react";
import { SVG_FRAMES, layoutConfig, LAYOUT_DIMS, svgToDataUrl } from "./PhotoFrame";

const FILTER_MAP = {
  "Original":      null,
  "Black & White": "grayscale(1)",
  "Cool":          "hue-rotate(180deg) saturate(1.4) brightness(1.05)",
  "Warm":          "sepia(0.45) saturate(1.3) brightness(1.05)",
  "Retro":         "sepia(0.35) contrast(1.1) saturate(0.85) brightness(0.95)",
};

// Legacy auto-placement positions (used when stickerPlacements is empty)
const STICKER_POS_FRAC = [
  { top: 0.014, left: 0.021, rotate: 15,  sizeFrac: 0.16 },
  { top: 0.014, left: 0.80,  rotate: -12, sizeFrac: 0.16 },
  { top: 0.44,  left: 0.82,  rotate: 8,   sizeFrac: 0.14 },
  { top: 0.85,  left: 0.021, rotate: -8,  sizeFrac: 0.16 },
  { top: 0.81,  left: 0.75,  rotate: 18,  sizeFrac: 0.14 },
  { top: 0.43,  left: 0.014, rotate: -5,  sizeFrac: 0.13 },
];

const PAD = 8;
const GAP = 4;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload  = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function emojiToDataUrl(emoji, size = 80) {
  const c = document.createElement("canvas");
  c.width = size; c.height = size;
  const ctx = c.getContext("2d");
  ctx.clearRect(0, 0, size, size);
  ctx.font = `${size * 0.75}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, size / 2, size / 2);
  return c.toDataURL("image/png");
}

async function drawPhoto(ctx, src, x, y, w, h, radius = 4) {
  try {
    const img   = await loadImage(src);
    const scale = Math.max(w / img.width, h / img.height);
    const sw = w / scale, sh = h / scale;
    const sx = (img.width - sw) / 2, sy = (img.height - sh) / 2;
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
    ctx.clip();
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
    ctx.restore();
  } catch {
    ctx.fillStyle = "#2d2040";
    ctx.fillRect(x, y, w, h);
  }
}

export default function DownloadButton({
  capturedImages = [],
  layout = "vertical",
  frame,
  filter,
  stickerPlacements = [],   // drag-and-drop positions [{emoji, x, y, size, rotate}]
}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!capturedImages || capturedImages.length === 0) {
      alert("No images to download!");
      return;
    }
    setLoading(true);

    try {
      const SCALE = 2;
      const dims  = LAYOUT_DIMS[layout] || LAYOUT_DIMS.vertical;
      const CW    = dims.w * SCALE;
      const CH    = dims.h * SCALE;
      const cPAD  = PAD * SCALE;
      const cGAP  = GAP * SCALE;
      const IW    = CW - cPAD * 2;
      const IH    = CH - cPAD * 2;

      const canvas = document.createElement("canvas");
      canvas.width = CW; canvas.height = CH;
      const ctx = canvas.getContext("2d");

      // ── Background ──
      ctx.fillStyle = "#18122B";
      ctx.fillRect(0, 0, CW, CH);

      // ── Photos with filter ──
      const cssFilter = FILTER_MAP[filter] || null;
      if (cssFilter) ctx.filter = cssFilter;

      const cfg   = layoutConfig[layout] || layoutConfig.vertical;
      const cellW = (IW - cGAP * (cfg.cols - 1)) / cfg.cols;
      const cellH = (IH - cGAP * (cfg.rows - 1)) / cfg.rows;

      for (let i = 0; i < Math.min(capturedImages.length, cfg.count); i++) {
        const col = i % cfg.cols;
        const row = Math.floor(i / cfg.cols);
        const x   = cPAD + col * (cellW + cGAP);
        const y   = cPAD + row * (cellH + cGAP);
        await drawPhoto(ctx, capturedImages[i], x, y, cellW, cellH, 4 * SCALE);
      }
      ctx.filter = "none";

      // ── Frame overlay ──
      const frameKey = frame?.startsWith("frame") ? frame : "frame1";
      if (SVG_FRAMES[frameKey]) {
        try {
          const frameUrl = svgToDataUrl(SVG_FRAMES[frameKey](CW, CH));
          const frameImg = await loadImage(frameUrl);
          ctx.drawImage(frameImg, 0, 0, CW, CH);
        } catch (e) { console.warn("Frame skipped:", e); }
      }

      // ── Stickers: drag-and-drop placements from Preview tab ──
      for (const s of stickerPlacements) {
        try {
          const size = Math.round(s.size * SCALE);
          const x    = Math.round(s.x    * SCALE);
          const y    = Math.round(s.y    * SCALE);
          const url  = emojiToDataUrl(s.emoji, size * 2);
          const img  = await loadImage(url);
          ctx.save();
          ctx.translate(x + size / 2, y + size / 2);
          ctx.rotate(((s.rotate || 0) * Math.PI) / 180);
          ctx.drawImage(img, -size / 2, -size / 2, size, size);
          ctx.restore();
        } catch { /* skip */ }
      }

      // ── Watermark ──
      ctx.font = `bold ${Math.round(CW * 0.035)}px sans-serif`;
      ctx.fillStyle = "rgba(249,168,212,0.6)";
      ctx.textAlign = "right";
      ctx.fillText("K-Click Booth 💖", CW - cPAD, CH - cPAD);

      // ── Trigger download ──
      const link = document.createElement("a");
      link.download = `k-click-booth-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading || capturedImages.length === 0}
      className={`bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ${
        loading || capturedImages.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
      }`}
    >
      {loading ? "⏳ Preparing…" : "Download Strip 🎞️"}
    </button>
  );
}