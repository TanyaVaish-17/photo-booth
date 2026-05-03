import { SVG_FRAMES, layoutConfig, LAYOUT_DIMS, svgToDataUrl } from "../components/shared/PhotoFrame";

const FILTER_MAP = {
  "Original":      null,
  "Black & White": "grayscale(1)",
  "Cool":          "hue-rotate(180deg) saturate(1.4) brightness(1.05)",
  "Warm":          "sepia(0.45) saturate(1.3) brightness(1.05)",
  "Retro":         "sepia(0.35) contrast(1.1) saturate(0.85) brightness(0.95)",
};

const PAD = 8;
const GAP = 4;

function loadImage(src, timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Never set crossOrigin on data: URLs — it causes browsers to reject them
    if (!src.startsWith("data:")) img.crossOrigin = "anonymous";
    const timer = setTimeout(() => reject(new Error("loadImage timeout")), timeoutMs);
    img.onload  = () => { clearTimeout(timer); resolve(img); };
    img.onerror = (e) => { clearTimeout(timer); reject(e); };
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
  } catch (e) {
    console.warn("drawPhoto failed, using placeholder:", e?.message || e);
    ctx.fillStyle = "#2d2040";
    ctx.fillRect(x, y, w, h);
  }
}

/**
 * Renders the complete photo strip — photos, filter, frame overlay,
 * drag-and-drop stickers, and watermark — onto an offscreen canvas.
 *
 * @param {{ capturedImages: string[], layout: string, frame: string,
 *           filter: string, stickerPlacements: object[], scale?: number }} opts
 * @returns {Promise<string>} PNG data URL of the composited strip
 */
export async function renderStripToDataUrl({
  capturedImages = [],
  layout = "vertical",
  frame,
  filter,
  stickerPlacements = [],
  scale = 2,
}) {
  console.log("[render] start — layout:", layout, "images:", capturedImages.length, "frame:", frame, "filter:", filter);

  const SCALE = scale;
  const dims  = LAYOUT_DIMS[layout] || LAYOUT_DIMS.vertical;
  const CW    = dims.w * SCALE;
  const CH    = dims.h * SCALE;
  const cPAD  = PAD * SCALE;
  const cGAP  = GAP * SCALE;
  const IW    = CW - cPAD * 2;
  const IH    = CH - cPAD * 2;

  const canvas = document.createElement("canvas");
  canvas.width  = CW;
  canvas.height = CH;
  const ctx = canvas.getContext("2d");

  // ── Background ──
  ctx.fillStyle = "#18122B";
  ctx.fillRect(0, 0, CW, CH);
  console.log("[render] background done");

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
    console.log(`[render] drawing photo ${i + 1}/${capturedImages.length}`);
    await drawPhoto(ctx, capturedImages[i], x, y, cellW, cellH, 4 * SCALE);
  }
  ctx.filter = "none";
  console.log("[render] photos done");

  // ── Frame overlay ──
  const frameKey = frame?.startsWith("frame") ? frame : null;
  if (frameKey && SVG_FRAMES[frameKey]) {
    try {
      console.log("[render] drawing frame:", frameKey);
      const frameUrl = svgToDataUrl(SVG_FRAMES[frameKey](CW, CH));
      const frameImg = await loadImage(frameUrl);
      ctx.drawImage(frameImg, 0, 0, CW, CH);
      console.log("[render] frame done");
    } catch (e) { console.warn("[render] frame skipped:", e?.message); }
  }

  // ── Drag-and-drop sticker placements ──
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
    } catch (e) { console.warn("[render] sticker skipped:", e?.message); }
  }

  // ── Watermark ──
  ctx.font = `bold ${Math.round(CW * 0.035)}px sans-serif`;
  ctx.fillStyle = "rgba(249,168,212,0.6)";
  ctx.textAlign = "right";
  ctx.fillText("K-Click Booth 💖", CW - cPAD, CH - cPAD);

  const dataUrl = canvas.toDataURL("image/png");
  console.log("[render] complete — dataUrl length:", dataUrl.length);
  return dataUrl;
}