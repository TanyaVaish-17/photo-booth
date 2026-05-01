import React, { useState, useRef, useCallback } from "react";
import { X, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { SVG_STICKER_PACKS, LAYOUT_DIMS, layoutConfig, SVG_FRAMES, svgToDataUrl, filterStyleMap } from "../shared/PhotoFrame";

const PAD = 8;
const GAP = 4;

const SNAP_ZONES = [
  { name: "top-left",      x: 0.04, y: 0.03 },
  { name: "top-right",     x: 0.76, y: 0.03 },
  { name: "bottom-left",   x: 0.04, y: 0.80 },
  { name: "bottom-right",  x: 0.76, y: 0.80 },
  { name: "top-center",    x: 0.40, y: 0.03 },
  { name: "bottom-center", x: 0.40, y: 0.80 },
  { name: "left-center",   x: 0.04, y: 0.42 },
  { name: "right-center",  x: 0.76, y: 0.42 },
];
const SNAP_THRESHOLD = 30;

function makeStickerDataUrl(emoji, size = 80) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <text x="${size/2}" y="${size*0.75}" font-size="${size*0.7}" text-anchor="middle">${emoji}</text>
  </svg>`;
  return svgToDataUrl(svg);
}

function PhotoCell({ src, index, x, y, w, h }) {
  return (
    <div style={{ position:"absolute", left:x, top:y, width:w, height:h, overflow:"hidden", borderRadius:4, background:"#2d2040" }}>
      {src
        ? <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", color:"#f9a8d4", fontSize:10 }}>
            Photo {index+1}
          </div>
      }
    </div>
  );
}

// StickerCanvas renders ONLY the sticker picker panel + draggable frame
// The static preview frame is rendered separately in Booth.jsx on the left
export default function StickerCanvas({ layout="vertical", frame, filter, images=[], placements, onPlacementsChange }) {
  const [activePack, setActivePack] = useState("hearts");
  const [selectedId, setSelectedId] = useState(null);
  const [snapHint,   setSnapHint]   = useState(null);
  const containerRef  = useRef(null);
  const draggingRef   = useRef(null);

  const dims  = LAYOUT_DIMS[layout] || LAYOUT_DIMS.vertical;
  const cfg   = layoutConfig[layout]  || layoutConfig.vertical;
  const FW    = dims.w;
  const FH    = dims.h;
  const IW    = FW - PAD * 2;
  const IH    = FH - PAD * 2;
  const cellW = (IW - GAP * (cfg.cols - 1)) / cfg.cols;
  const cellH = (IH - GAP * (cfg.rows - 1)) / cfg.rows;

  const filterValue = filterStyleMap[filter] || "none";
  const frameKey    = frame?.startsWith("frame") ? frame : "frame1";
  const frameSvg    = SVG_FRAMES[frameKey] ? svgToDataUrl(SVG_FRAMES[frameKey](FW, FH)) : null;

  const addSticker = (emoji) => {
    if (placements.length >= 8) return;
    const size = Math.round(0.15 * Math.min(FW, FH));
    const newP = { id: Date.now(), emoji, x: Math.round(FW/2 - size/2), y: Math.round(FH/2 - size/2), size, rotate: 0 };
    onPlacementsChange([...placements, newP]);
    setSelectedId(newP.id);
  };

  const removeSticker  = (id) => { onPlacementsChange(placements.filter(p => p.id !== id)); setSelectedId(null); };
  const rotateSticker  = (id, d) => onPlacementsChange(placements.map(p => p.id===id ? {...p, rotate:(p.rotate||0)+d} : p));
  const resizeSticker  = (id, d) => onPlacementsChange(placements.map(p => p.id===id ? {...p, size:Math.max(20,Math.min(120,(p.size||40)+d))} : p));

  const trySnap = useCallback((x, y) => {
    for (const zone of SNAP_ZONES) {
      if (Math.hypot(x - zone.x*FW, y - zone.y*FH) < SNAP_THRESHOLD) {
        setSnapHint(zone.name);
        return { x: Math.round(zone.x*FW), y: Math.round(zone.y*FH) };
      }
    }
    setSnapHint(null);
    return null;
  }, [FW, FH]);

  const onPointerDown = (e, id) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = placements.find(s => s.id === id);
    draggingRef.current = { id, startX: e.clientX, startY: e.clientY, origX: p.x, origY: p.y };
    setSelectedId(id);
  };

  const onPointerMove = useCallback((e) => {
    if (!draggingRef.current) return;
    const { id, startX, startY, origX, origY } = draggingRef.current;
    const rect   = containerRef.current?.getBoundingClientRect();
    const scaleX = rect ? FW / rect.width  : 1;
    const scaleY = rect ? FH / rect.height : 1;
    const p      = placements.find(s => s.id === id);
    const size   = p?.size || 40;
    let newX = Math.max(0, Math.min(FW-size, origX + (e.clientX-startX)*scaleX));
    let newY = Math.max(0, Math.min(FH-size, origY + (e.clientY-startY)*scaleY));
    const snapped = trySnap(newX, newY);
    if (snapped) { newX = snapped.x; newY = snapped.y; }
    onPlacementsChange(placements.map(s => s.id===id ? {...s, x:Math.round(newX), y:Math.round(newY)} : s));
  }, [placements, FW, FH, trySnap, onPlacementsChange]);

  const onPointerUp = useCallback(() => { draggingRef.current = null; setSnapHint(null); }, []);

  return (
    <div className="flex flex-col gap-4 w-full">

      {/* ── Sticker picker panel ── */}
      <div className="bg-white/90 rounded-2xl shadow-md p-4 border border-pink-100">
        <p className="text-pink-600 font-semibold text-sm mb-3 text-center">
          🎨 Pick a sticker — drag it on the strip!
          {placements.length >= 8 && <span className="text-rose-400 ml-2">(max 8)</span>}
        </p>

        {/* Pack tabs */}
        <div className="flex flex-wrap gap-1.5 justify-center mb-3">
          {Object.entries(SVG_STICKER_PACKS).map(([key, pack]) => (
            <button key={key} onClick={() => setActivePack(key)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                activePack === key ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-600 hover:bg-pink-200"
              }`}>
              {pack.name}
            </button>
          ))}
        </div>

        {/* Sticker grid */}
        <div className="flex flex-wrap gap-2 justify-center">
          {SVG_STICKER_PACKS[activePack].stickers.map(({ emoji }, idx) => (
            <button key={idx} onClick={() => addSticker(emoji)}
              disabled={placements.length >= 8}
              className="w-11 h-11 text-2xl rounded-xl border-2 border-pink-200 bg-white hover:border-pink-400 hover:scale-110 transition-all disabled:opacity-40">
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* ── Selected sticker controls ── */}
      {selectedId && (
        <div className="flex items-center justify-center gap-2 bg-white/90 rounded-full px-4 py-2 shadow border border-pink-100">
          <span className="text-xs text-pink-500 font-semibold">Selected:</span>
          <button onClick={() => rotateSticker(selectedId, -15)} title="Rotate left"
            className="p-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 transition">
            <RotateCw size={13} className="scale-x-[-1]" />
          </button>
          <button onClick={() => rotateSticker(selectedId, 15)} title="Rotate right"
            className="p-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 transition">
            <RotateCw size={13} />
          </button>
          <button onClick={() => resizeSticker(selectedId, -8)} title="Shrink"
            className="p-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 transition">
            <ZoomOut size={13} />
          </button>
          <button onClick={() => resizeSticker(selectedId, 8)} title="Grow"
            className="p-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 transition">
            <ZoomIn size={13} />
          </button>
          <button onClick={() => removeSticker(selectedId)} title="Remove"
            className="p-1.5 rounded-full bg-red-100 hover:bg-red-200 text-red-500 transition">
            <X size={13} />
          </button>
        </div>
      )}

      {snapHint && (
        <p className="text-xs text-pink-500 font-semibold animate-pulse text-center">
          📌 Snapping to {snapHint.replace("-", " ")}!
        </p>
      )}

      {/* ── Draggable frame ── */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-pink-400 font-medium">Drag stickers on the strip below 👇</p>
        <div
          ref={containerRef}
          onClick={() => setSelectedId(null)}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{
            position:"relative", width:FW, height:FH, borderRadius:12, overflow:"hidden",
            background:"#18122B", boxShadow:"0 8px 32px rgba(0,0,0,0.3)",
            cursor:"default", userSelect:"none",
            outline: snapHint ? "2px dashed #f472b6" : "none",
          }}
        >
          {/* Photos */}
          <div style={{ position:"absolute", top:PAD, left:PAD, width:IW, height:IH, zIndex:1, filter:filterValue, pointerEvents:"none" }}>
            {Array.from({ length: cfg.count }, (_, i) => {
              const col = i % cfg.cols, row = Math.floor(i / cfg.cols);
              return <PhotoCell key={i} src={images[i]} index={i} x={col*(cellW+GAP)} y={row*(cellH+GAP)} w={cellW} h={cellH} />;
            })}
          </div>

          {/* Frame */}
          {frameSvg && (
            <img src={frameSvg} alt="frame" style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", objectFit:"fill", pointerEvents:"none", zIndex:2 }} />
          )}

          {/* Draggable stickers */}
          {placements.map((s) => (
            <div key={s.id}
              onPointerDown={(e) => onPointerDown(e, s.id)}
              onClick={(e) => { e.stopPropagation(); setSelectedId(s.id); }}
              style={{
                position:"absolute", left:s.x, top:s.y, width:s.size, height:s.size,
                cursor:"grab", zIndex: s.id===selectedId ? 10 : 3,
                outline: s.id===selectedId ? "2px dashed #f472b6" : "none",
                outlineOffset:2, borderRadius:4, touchAction:"none",
              }}
            >
              <img src={makeStickerDataUrl(s.emoji, 80)} alt="" style={{
                width:"100%", height:"100%", objectFit:"contain",
                transform:`rotate(${s.rotate||0}deg)`, pointerEvents:"none", background:"transparent",
              }} />
            </div>
          ))}

          {/* Snap dots */}
          {SNAP_ZONES.map((zone) => (
            <div key={zone.name} style={{
              position:"absolute", left:zone.x*FW+4, top:zone.y*FH+4, width:5, height:5,
              borderRadius:"50%", background: snapHint===zone.name ? "#f472b6" : "rgba(244,114,182,0.2)",
              pointerEvents:"none", zIndex:5, transition:"background 0.15s",
            }} />
          ))}
        </div>

        <p className="text-xs text-pink-300 text-center">Click to select • Drag to move • Use controls above to edit</p>
      </div>
    </div>
  );
}