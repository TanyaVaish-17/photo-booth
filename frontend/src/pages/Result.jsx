import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Share2, RefreshCw } from "lucide-react";
import PageLayout from "../components/layout/PageLayout";
import PhotoFrame from "../components/shared/PhotoFrame";
import DownloadButton from "../components/shared/DownloadButton";
import { useAuth } from "../context/AuthContext";
import { useMemories } from "../hooks/useMemories";

export default function Result() {
  const { state }  = useLocation();
  const navigate   = useNavigate();
  const { user }   = useAuth();
  const { saveMemory, saving } = useMemories();

  const images            = state?.images            || [];
  const layout            = state?.layout            || "vertical";
  const frame             = state?.frame             || null;
  const filter            = state?.filter            || null;
  const stickerPlacements = state?.stickerPlacements || [];

  const [saved,     setSaved]     = useState(false);
  const [saveError, setSaveError] = useState("");
  const [shared,    setShared]    = useState(false);

  const handleSaveMemory = async () => {
    setSaveError("");
    try {
      await saveMemory({ imageDataUrl: images[0] || "", layout, frame, filter, stickers: [] });
      setSaved(true);
    } catch (err) { setSaveError(err.message); }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "My K-Click Booth Strip 📸", text: "Check out my cute K-style photo strip! 💕", url: window.location.href });
        setShared(true);
      } catch (_) {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
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
      <main className="py-10 px-4" style={{maxWidth:900, margin:"0 auto"}}>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-pink-700 drop-shadow-lg">🎉 Your K-Photo Strip!</h2>
          <p className="text-pink-400 mt-1 text-sm">Download, share or save to your Memories Wall 💕</p>
        </div>

        {/* Two column */}
        <div style={{display:"flex", flexDirection:"row", gap:24, alignItems:"flex-start", flexWrap:"wrap", justifyContent:"center"}}>

          {/* LEFT — photo strip */}
          <div style={{flexShrink:0}} className="bg-white/90 rounded-3xl shadow-2xl p-5 flex flex-col items-center gap-2">
            <p className="text-pink-400 font-semibold text-xs tracking-widest uppercase">Your Strip</p>
            <PhotoFrame
              layout={layout} frame={frame} filter={filter}
              stickerPlacements={stickerPlacements} images={images}
            />
          </div>

          {/* RIGHT — compact action cards */}
          <div style={{flex:"1 1 260px", minWidth:240, display:"flex", flexDirection:"column", gap:10}}>

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
              <button onClick={handleShare}
                className="flex items-center gap-1.5 bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow transition hover:scale-105 whitespace-nowrap">
                <Share2 size={12} /> Share
              </button>
            </div>

            {/* Save to Memories */}
            <div className="flex items-center justify-between bg-rose-50 rounded-2xl px-4 py-3 border border-rose-100">
              <div>
                <p className="font-semibold text-rose-700 text-sm">🌸 Save to Memories</p>
                <p className="text-xs text-rose-300">
                  {!user ? "Sign in to save" : saved ? "Saved! ✅" : "Add to your Memories Wall"}
                </p>
              </div>
              <div className="flex-shrink-0">
                {user ? (
                  saved
                    ? <Link to="/memories"><button className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow transition whitespace-nowrap">View 🌸</button></Link>
                    : <button onClick={handleSaveMemory} disabled={saving}
                        className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow transition hover:scale-105 disabled:opacity-50 whitespace-nowrap">
                        {saving ? "Saving…" : "Save 💾"}
                      </button>
                ) : (
                  <Link to="/auth"><button className="bg-rose-400 hover:bg-rose-500 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow transition whitespace-nowrap">Sign In</button></Link>
                )}
              </div>
            </div>

            {saveError && <p className="text-red-400 text-xs px-1">{saveError}</p>}

            {/* Restart */}
            <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
              <div>
                <p className="font-semibold text-gray-600 text-sm">🔄 Start Over</p>
                <p className="text-xs text-gray-400">Fresh session at the booth</p>
              </div>
              <button onClick={() => navigate("/booth")}
                className="flex items-center gap-1.5 bg-gray-500 hover:bg-gray-600 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow transition hover:scale-105 whitespace-nowrap">
                <RefreshCw size={12} /> Restart
              </button>
            </div>

          </div>
        </div>
      </main>
    </PageLayout>
  );
}