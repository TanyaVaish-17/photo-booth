import React, { useState } from "react";
import { renderStripToDataUrl } from "../../utils/renderStripToDataUrl";

export default function DownloadButton({
  capturedImages = [],
  layout = "vertical",
  frame,
  filter,
  stickerPlacements = [],
}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!capturedImages || capturedImages.length === 0) {
      alert("No images to download!");
      return;
    }
    setLoading(true);
    try {
      const dataUrl = await renderStripToDataUrl({
        capturedImages, layout, frame, filter, stickerPlacements,
      });
      const link = document.createElement("a");
      link.download = `k-click-booth-${Date.now()}.png`;
      link.href = dataUrl;
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
      className={`flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow transition whitespace-nowrap ${
        loading || capturedImages.length === 0
          ? "opacity-50 cursor-not-allowed"
          : "hover:scale-105"
      }`}
    >
      {loading ? "⏳ Preparing…" : "⬇️ Download"}
    </button>
  );
}