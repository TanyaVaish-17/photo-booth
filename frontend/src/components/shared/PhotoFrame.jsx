import React from "react";

export const filterStyleMap = {
  "Original":      "none",
  "Black & White": "grayscale(1)",
  "Cool":          "hue-rotate(180deg) saturate(1.4) brightness(1.05)",
  "Warm":          "sepia(0.45) saturate(1.3) brightness(1.05)",
  "Retro":         "sepia(0.35) contrast(1.1) saturate(0.85) brightness(0.95)",
};

export const LAYOUT_DIMS = {
  vertical:   { w: 280, h: 420 },
  vertical3:  { w: 280, h: 380 },
  vertical4:  { w: 280, h: 420 },
  collage:    { w: 280, h: 280 },
  horizontal: { w: 380, h: 220 },
  square2:    { w: 380, h: 220 },
  strip3:     { w: 280, h: 380 },
};

export const layoutConfig = {
  vertical:   { rows: 4, cols: 1, count: 4 },
  vertical3:  { rows: 3, cols: 1, count: 3 },
  vertical4:  { rows: 4, cols: 1, count: 4 },
  collage:    { rows: 2, cols: 2, count: 4 },
  horizontal: { rows: 1, cols: 2, count: 2 },
  square2:    { rows: 1, cols: 2, count: 2 },
  strip3:     { rows: 3, cols: 1, count: 3 },
};

const PAD = 8;
const GAP = 4;

// ─── SVG Frames ───────────────────────────────────────────────────────────────
export const SVG_FRAMES = {
  frame1: (w, h) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect x="4" y="4" width="${w-8}" height="${h-8}" rx="12" ry="12"
            fill="none" stroke="white" stroke-width="16"/>
      <rect x="4" y="${h-48}" width="${w-8}" height="44" fill="white" opacity="0.88"/>
      <text x="14"     y="20" font-size="16">🤍</text>
      <text x="${w-30}" y="20" font-size="16">🤍</text>
      <text x="14"     y="${h-6}" font-size="16">🤍</text>
      <text x="${w-30}" y="${h-6}" font-size="16">🤍</text>
    </svg>`,

  frame2: (w, h) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect x="3" y="3" width="${w-6}" height="${h-6}" rx="14" ry="14"
            fill="none" stroke="#ff69b4" stroke-width="6"/>
      <rect x="10" y="10" width="${w-20}" height="${h-20}" rx="10" ry="10"
            fill="none" stroke="#ffb6c1" stroke-width="3" stroke-dasharray="8,5"/>
      <text x="${w/2-32}" y="18" font-size="15">🌸🌸🌸🌸</text>
      <text x="${w/2-32}" y="${h-3}" font-size="15">🌸🌸🌸🌸</text>
    </svg>`,

  frame3: (w, h) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect x="2" y="2" width="${w-4}" height="${h-4}" rx="16" ry="16"
            fill="none" stroke="#c084fc" stroke-width="5"/>
      <text x="4"       y="22"    font-size="18">⭐</text>
      <text x="${w-26}" y="22"    font-size="18">⭐</text>
      <text x="4"       y="${h-3}" font-size="18">⭐</text>
      <text x="${w-26}" y="${h-3}" font-size="18">⭐</text>
      <circle cx="2"      cy="${h/2}" r="5" fill="#c084fc"/>
      <circle cx="${w-2}" cy="${h/2}" r="5" fill="#c084fc"/>
      <text x="${w/2-38}" y="16" font-size="12" fill="#c084fc" font-weight="bold">✨ K-CLICK ✨</text>
    </svg>`,

  frame4: (w, h) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect x="3" y="3" width="${w-6}" height="${h-6}" rx="4" ry="4"
            fill="none" stroke="#d4af37" stroke-width="8"/>
      <rect x="11" y="11" width="${w-22}" height="${h-22}" rx="2" ry="2"
            fill="none" stroke="#f5d060" stroke-width="2"/>
      <text x="2"       y="20"    font-size="16">👑</text>
      <text x="${w-22}" y="20"    font-size="16">👑</text>
      <text x="2"       y="${h-2}" font-size="16">✨</text>
      <text x="${w-22}" y="${h-2}" font-size="16">✨</text>
    </svg>`,

  frame5: (w, h) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect x="3" y="3" width="${w-6}" height="${h-6}" rx="20" ry="20"
            fill="none" stroke="#f9a8d4" stroke-width="10"/>
      <text x="${w/2-12}" y="16" font-size="20">🎀</text>
      <text x="8"         y="${h-4}" font-size="14">💖</text>
      <text x="${w/2-8}"  y="${h-4}" font-size="14">🌟</text>
      <text x="${w-22}"   y="${h-4}" font-size="14">💖</text>
    </svg>`,

  frame6: (w, h) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect x="3" y="3" width="${w-6}" height="${h-6}" rx="8" ry="8"
            fill="none" stroke="#fb7185" stroke-width="5"/>
      <text x="0"       y="22"     font-size="18">🌺</text>
      <text x="${w-22}" y="22"     font-size="18">🌺</text>
      <text x="0"       y="${h-2}" font-size="18">🌺</text>
      <text x="${w-22}" y="${h-2}" font-size="18">🌺</text>
    </svg>`,

  frame7: (w, h) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect x="0" y="0" width="18" height="${h}" fill="#222" opacity="0.85"/>
      <rect x="${w-18}" y="0" width="18" height="${h}" fill="#222" opacity="0.85"/>
      ${Array.from({length: Math.floor(h/32)}, (_, i) => `
        <rect x="4" y="${20 + i*32}" width="10" height="18" rx="2" fill="white" opacity="0.7"/>
        <rect x="${w-14}" y="${20 + i*32}" width="10" height="18" rx="2" fill="white" opacity="0.7"/>
      `).join("")}
      <text x="${w/2-28}" y="${h-5}" font-size="11" fill="white" opacity="0.8">K-CLICK BOOTH 📸</text>
    </svg>`,

  frame8: (w, h) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <filter id="ng"><feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect x="3" y="3" width="${w-6}" height="${h-6}" rx="12" ry="12"
            fill="none" stroke="#a855f7" stroke-width="4" filter="url(#ng)"/>
      <rect x="7" y="7" width="${w-14}" height="${h-14}" rx="10" ry="10"
            fill="none" stroke="#ec4899" stroke-width="2" opacity="0.6"/>
      <text x="6"       y="20"    font-size="14">💜</text>
      <text x="${w-20}" y="20"    font-size="14">💜</text>
      <text x="6"       y="${h-4}" font-size="14">💗</text>
      <text x="${w-20}" y="${h-4}" font-size="14">💗</text>
    </svg>`,
};

export function svgToDataUrl(svgStr) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgStr.trim())}`;
}

// ─── Sticker packs ────────────────────────────────────────────────────────────
export const SVG_STICKER_PACKS = {
  hearts:  { name: "Hearts 💖",  stickers: ["💖","💗","💝","💓","💞","🩷","❤️","🫶"].map(e=>({emoji:e,label:e})) },
  stars:   { name: "Stars ✨",   stickers: ["⭐","🌟","✨","💫","🌠","⚡","🔆","🌙"].map(e=>({emoji:e,label:e})) },
  flowers: { name: "Flowers 🌸", stickers: ["🌸","🌺","🌼","🌻","🌹","💐","🌷","🍀"].map(e=>({emoji:e,label:e})) },
  kawaii:  { name: "Kawaii 🎀",  stickers: ["🎀","🍭","🧁","🍬","🍰","🎂","🧸","🪆"].map(e=>({emoji:e,label:e})) },
  animals: { name: "Animals 🐰", stickers: ["🐰","🐱","🐶","🐼","🦊","🐨","🦄","🐸"].map(e=>({emoji:e,label:e})) },
  kpop:    { name: "K-Pop 💅",   stickers: ["👑","💅","🪞","💄","👄","💋","🕶️","📸"].map(e=>({emoji:e,label:e})) },
};

function makeStickerDataUrl(emoji, size = 80) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <text x="${size/2}" y="${size*0.75}" font-size="${size*0.7}" text-anchor="middle">${emoji}</text>
  </svg>`;
  return svgToDataUrl(svg);
}

export function getStickerUrl(emoji) { return makeStickerDataUrl(emoji, 80); }

function PhotoCell({ src, index, x, y, w, h }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: w, height: h,
      overflow: "hidden", borderRadius: 4, background: "#2d2040",
    }}>
      {src
        ? <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", color:"#f9a8d4", fontSize:10 }}>
            Photo {index+1}
          </div>
      }
    </div>
  );
}

// ─── PhotoFrame — accepts stickerPlacements for drag-and-drop positions ───────
// stickerPlacements: Array of { emoji, x, y, size, rotate } in pixels
// stickers (legacy):  Array of emoji strings → auto-placed at corners
export default function PhotoFrame({
  layout = "vertical",
  frame,
  stickerPlacements = [],   // [{emoji, x, y, size, rotate}]
  filter,
  images = [],
}) {
  const dims = LAYOUT_DIMS[layout] || LAYOUT_DIMS.vertical;
  const cfg  = layoutConfig[layout]  || layoutConfig.vertical;
  const FW   = dims.w;
  const FH   = dims.h;
  const IW   = FW - PAD * 2;
  const IH   = FH - PAD * 2;

  const filterValue = filterStyleMap[filter] || "none";
  const frameKey    = frame?.startsWith("frame") ? frame : "frame1";
  const frameSvg    = SVG_FRAMES[frameKey] ? svgToDataUrl(SVG_FRAMES[frameKey](FW, FH)) : null;

  const cellW = (IW - GAP * (cfg.cols - 1)) / cfg.cols;
  const cellH = (IH - GAP * (cfg.rows - 1)) / cfg.rows;

  // Decide which sticker system to use:
  // if stickerPlacements provided → use those (drag-and-drop mode)
  // else fall back to legacy auto-position from stickers[]
  const STICKER_POS_FRAC = [
    { top: 0.014, left: 0.021, rotate: "15deg",  sizeFrac: 0.16 },
    { top: 0.014, left: 0.80,  rotate: "-12deg", sizeFrac: 0.16 },
    { top: 0.44,  left: 0.82,  rotate: "8deg",   sizeFrac: 0.14 },
    { top: 0.85,  left: 0.021, rotate: "-8deg",  sizeFrac: 0.16 },
    { top: 0.81,  left: 0.75,  rotate: "18deg",  sizeFrac: 0.14 },
    { top: 0.43,  left: 0.014, rotate: "-5deg",  sizeFrac: 0.13 },
  ];

  return (
    <div style={{
      position:"relative", width:FW, height:FH, margin:"0 auto",
      borderRadius:12, overflow:"hidden", background:"#18122B",
      flexShrink:0, boxShadow:"0 8px 32px rgba(0,0,0,0.3)",
    }}>
      {/* LAYER 1 — Photos */}
      <div style={{
        position:"absolute", top:PAD, left:PAD, width:IW, height:IH,
        zIndex:1, filter:filterValue,
      }}>
        {Array.from({ length: cfg.count }, (_, i) => {
          const col = i % cfg.cols;
          const row = Math.floor(i / cfg.cols);
          return (
            <PhotoCell key={i} src={images[i]} index={i}
              x={col * (cellW + GAP)} y={row * (cellH + GAP)}
              w={cellW} h={cellH} />
          );
        })}
      </div>

      {/* LAYER 2 — Frame */}
      {frameSvg && (
        <img src={frameSvg} alt="frame" style={{
          position:"absolute", top:0, left:0, width:"100%", height:"100%",
          objectFit:"fill", pointerEvents:"none", zIndex:2,
        }} />
      )}

      {/* LAYER 3 — Drag-and-drop placed stickers */}
      {stickerPlacements.map((s, i) => {
        const src = makeStickerDataUrl(s.emoji, 80);
        return (
          <img key={"placed-"+i} src={src} alt="" style={{
            position:"absolute",
            left: s.x, top: s.y,
            width: s.size, height: s.size,
            objectFit:"contain",
            transform:"rotate("+(s.rotate||0)+"deg)",
            pointerEvents:"none", zIndex:3,
            background:"transparent",
          }} />
        );
      })}
    </div>
  );
}