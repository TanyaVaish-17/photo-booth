import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Share2, RefreshCw, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import PageLayout from "../components/layout/PageLayout";
import PhotoFrame from "../components/shared/PhotoFrame";
import DownloadButton from "../components/shared/DownloadButton";
import { useAuth } from "../context/AuthContext";
import { useMemories } from "../hooks/useMemories";
import { renderStripToDataUrl } from "../utils/renderStripToDataUrl";

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toast, onDismiss }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (!toast) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timerRef.current);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";
  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        animation: "toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
      }}
    >
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(24px) scale(0.92); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)   scale(1); }
        }
      `}</style>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: isSuccess ? "#fff1f2" : "#fef2f2",
          border: `1.5px solid ${isSuccess ? "#fda4af" : "#fca5a5"}`,
          borderRadius: 99,
          padding: "10px 20px",
          boxShadow: "0 8px 32px rgba(236,72,153,0.18)",
          minWidth: 220,
        }}
      >
        {isSuccess
          ? <CheckCircle2 size={18} color="#e11d48" />
          : <XCircle     size={18} color="#dc2626" />}
        <span style={{ fontSize: 13, fontWeight: 700, color: isSuccess ? "#be185d" : "#b91c1c" }}>
          {toast.message}
        </span>
        {isSuccess && (
          <Link to="/memories" style={{ marginLeft: 6 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, color: "white",
              background: "#ec4899", borderRadius: 99, padding: "3px 10px",
              whiteSpace: "nowrap",
            }}>
              View 🌸
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

// ─── Result ───────────────────────────────────────────────────────────────────
export default function Result() {
  const { state }  = useLocation();
  const navigate   = useNavigate();
  const { user }   = useAuth();
  const { saveMemory } = useMemories();

  const images            = state?.images            || [];
  const layout            = state?.layout            || "vertical";
  const frame             = state?.frame             || null;
  const filter            = state?.filter            || null;
  const stickerPlacements = state?.stickerPlacements || [];

  const [saved,    setSaved]    = useState(false);
  const [saving,   setSaving]   = useState(false);
  const [shared,   setShared]   = useState(false);
  const [toast,    setToast]    = useState(null);   // { type: "success"|"error", message }

  const showToast = (type, message) => setToast({ type, message });
  const dismissToast = () => setToast(null);

  // ── Save the fully-composited strip to Firebase Storage + Firestore ──
  const handleSaveMemory = async () => {
    if (saving || saved) return;
    setSaving(true);
    console.log("[save] handleSaveMemory started");
    try {
      console.log("[save] calling renderStripToDataUrl...");
      const renderPromise = renderStripToDataUrl({
        capturedImages: images,
        layout,
        frame,
        filter,
        stickerPlacements,
        scale: 1,
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Render timed out — please try again.")), 25000)
      );

      const compositeDataUrl = await Promise.race([renderPromise, timeoutPromise]);
      console.log("[save] render complete, dataUrl length:", compositeDataUrl?.length);

      console.log("[save] calling saveMemory (Firebase upload)...");
      await saveMemory({
        imageDataUrl: compositeDataUrl,
        layout,
        frame,
        filter,
        stickers: stickerPlacements,
      });
      console.log("[save] saveMemory complete ✅");

      setSaved(true);
      showToast("success", "Saved to your Memories Wall! 🌸");
    } catch (err) {
      console.error("[save] FAILED:", err);
      const msg = err?.message || "Save failed. Please try again.";
      showToast("error", msg.length > 80 ? "Save failed. Check your connection and try again." : msg);
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My K-Click Booth Strip 📸",
          text:  "Check out my cute K-style photo strip! 💕",
          url:   window.location.href,
        });
        setShared(true);
      } catch (_) {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      showToast("success", "Link copied to clipboard!");
    }
  };

  if (images.length === 0) {
    return (
      <PageLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
          <span className="text-6xl mb-4">📷</span>
          <h3 className="text-2xl font-bold text-pink-600 mb-2">No photos yet!</h3>
          <p className="text-pink-400 mb-8 text-sm">Head to the Booth first.</p>
          <Link to="/booth">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-all">
              Go to Booth 📸
            </button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Toast toast={toast} onDismiss={dismissToast} />

      <main className="py-10 px-4" style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-pink-700 drop-shadow-lg">🎉 Your K-Photo Strip!</h2>
          <p className="text-pink-400 mt-1 text-sm">Download, share or save to your Memories Wall 💕</p>
        </div>

        {/* Two column */}
        <div style={{ display: "flex", flexDirection: "row", gap: 24, alignItems: "flex-start", flexWrap: "wrap", justifyContent: "center" }}>

          {/* LEFT — photo strip */}
          <div style={{ flexShrink: 0 }} className="bg-white/90 rounded-3xl shadow-2xl p-5 flex flex-col items-center gap-2">
            <p className="text-pink-400 font-semibold text-xs tracking-widest uppercase">Your Strip</p>
            <PhotoFrame
              layout={layout} frame={frame} filter={filter}
              stickerPlacements={stickerPlacements} images={images}
            />
          </div>

          {/* RIGHT — action cards */}
          <div style={{ flex: "1 1 260px", minWidth: 240, display: "flex", flexDirection: "column", gap: 10 }}>

            <p className="text-sm font-extrabold text-pink-700">What would you like to do?</p>

            {/* Download */}
            <div className="flex items-center justify-between bg-pink-50 rounded-2xl px-4 py-3 border border-pink-100">
              <div>
                <p className="font-semibold text-pink-700 text-sm">⬇️ Download</p>
                <p className="text-xs text-pink-300">Save as PNG to your device</p>
              </div>
              <DownloadButton
                capturedImages={images} layout={layout} frame={frame}
                filter={filter} stickerPlacements={stickerPlacements}
              />
            </div>

            {/* Share */}
            <div className="flex items-center justify-between bg-purple-50 rounded-2xl px-4 py-3 border border-purple-100">
              <div>
                <p className="font-semibold text-purple-700 text-sm">🔗 Share</p>
                <p className="text-xs text-purple-300">{shared ? "Link copied! ✅" : "Share or copy link"}</p>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow transition hover:scale-105 whitespace-nowrap"
              >
                <Share2 size={12} /> Share
              </button>
            </div>

            {/* Save to Memories */}
            <div className={`flex items-center justify-between rounded-2xl px-4 py-3 border transition-all duration-300 ${
              saved
                ? "bg-green-50 border-green-200"
                : "bg-rose-50 border-rose-100"
            }`}>
              <div>
                <p className={`font-semibold text-sm ${saved ? "text-green-700" : "text-rose-700"}`}>
                  🌸 Save to Memories
                </p>
                <p className={`text-xs ${saved ? "text-green-400" : "text-rose-300"}`}>
                  {!user   ? "Sign in to save your strip"
                  : saved  ? "Saved to your Memories Wall ✅"
                  : saving ? "Rendering & uploading…"
                  :          "Add to your Memories Wall"}
                </p>
              </div>

              <div className="flex-shrink-0">
                {!user ? (
                  <Link to="/auth">
                    <button className="bg-rose-400 hover:bg-rose-500 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow transition whitespace-nowrap">
                      Sign In
                    </button>
                  </Link>
                ) : saved ? (
                  <Link to="/memories">
                    <button className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow transition hover:scale-105 whitespace-nowrap">
                      View 🌸
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={handleSaveMemory}
                    disabled={saving}
                    className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow transition hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {saving
                      ? <><Loader2 size={12} className="animate-spin" /> Saving…</>
                      : <>💾 Save</>
                    }
                  </button>
                )}
              </div>
            </div>

            {/* Restart */}
            <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
              <div>
                <p className="font-semibold text-gray-600 text-sm">🔄 Start Over</p>
                <p className="text-xs text-gray-400">Fresh session at the booth</p>
              </div>
              <button
                onClick={() => navigate("/booth")}
                className="flex items-center gap-1.5 bg-gray-500 hover:bg-gray-600 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow transition hover:scale-105 whitespace-nowrap"
              >
                <RefreshCw size={12} /> Restart
              </button>
            </div>

          </div>
        </div>
      </main>
    </PageLayout>
  );
}