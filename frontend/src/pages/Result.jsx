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
      try { await navigator.share({ title: "My K-Click Booth Strip 📸", text: "Check out my cute K-style photo strip! 💕", url: window.location.href }); setShared(true); } catch (_) {}
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
      <main className="max-w-5xl mx-auto py-12 px-4">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-pink-700 drop-shadow-lg">🎉 Your K-Photo Strip!</h2>
          <p className="text-pink-400 mt-1 text-sm">Download, share or save to your Memories Wall 💕</p>
        </div>

        {/* ── Side by side: strip LEFT, everything else RIGHT ── */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* LEFT — Photo strip (fixed width, doesn't stretch) */}
          <div className="bg-white/90 rounded-3xl shadow-2xl p-5 flex flex-col items-center gap-2 flex-shrink-0">
            <p className="text-pink-400 font-semibold text-xs tracking-wide">🎞️ Your Strip</p>
            <PhotoFrame layout={layout} frame={frame} filter={filter} stickerPlacements={stickerPlacements} images={images} />
          </div>

          {/* RIGHT — Actions + shots stacked */}
          <div className="flex flex-col gap-4 flex-1 min-w-0">

            {/* Action cards */}
            <div className="bg-white/90 rounded-3xl shadow-xl p-5">
              <h3 className="text-sm font-extrabold text-pink-700 mb-3">What would you like to do?</h3>
              <div className="flex flex-col gap-2">

                <ActionRow color="pink">
                  <ActionInfo title="⬇️ Download" desc="Save as PNG to your device" />
                  <DownloadButton capturedImages={images} layout={layout} frame={frame} filter={filter} stickerPlacements={stickerPlacements} />
                </ActionRow>

                <ActionRow color="purple">
                  <ActionInfo title="🔗 Share" desc={shared ? "Link copied! ✅" : "Share or copy link"} />
                  <button onClick={handleShare}
                    className="flex items-center gap-1.5 bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold py-2 px-4 rounded-full shadow transition hover:scale-105 whitespace-nowrap">
                    <Share2 size={12} /> Share
                  </button>
                </ActionRow>

                <ActionRow color="rose">
                  <ActionInfo
                    title="🌸 Save to Memories"
                    desc={!user ? "Sign in to save" : saved ? "Saved! ✅" : "Add to your Memories Wall"}
                  />
                  {user ? (
                    saved
                      ? <Link to="/memories"><button className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 px-4 rounded-full shadow transition hover:scale-105 whitespace-nowrap">View 🌸</button></Link>
                      : <button onClick={handleSaveMemory} disabled={saving}
                          className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold py-2 px-4 rounded-full shadow transition hover:scale-105 disabled:opacity-50 whitespace-nowrap">
                          {saving ? "Saving…" : "Save 💾"}
                        </button>
                  ) : (
                    <Link to="/auth"><button className="bg-rose-400 hover:bg-rose-500 text-white text-xs font-bold py-2 px-4 rounded-full shadow transition hover:scale-105 whitespace-nowrap">Sign In</button></Link>
                  )}
                </ActionRow>

                {saveError && <p className="text-red-400 text-xs px-1">{saveError}</p>}

                <ActionRow color="gray">
                  <ActionInfo title="🔄 Start Over" desc="Fresh session at the booth" />
                  <button onClick={() => navigate("/booth")}
                    className="flex items-center gap-1.5 bg-gray-500 hover:bg-gray-600 text-white text-xs font-bold py-2 px-4 rounded-full shadow transition hover:scale-105 whitespace-nowrap">
                    <RefreshCw size={12} /> Restart
                  </button>
                </ActionRow>

              </div>
            </div>

            {/* Individual shots */}
            <div className="bg-white/90 rounded-3xl shadow-xl p-5">
              <h3 className="text-sm font-extrabold text-pink-700 mb-3">📷 Individual Shots</h3>
              <div className="grid grid-cols-2 gap-2">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img src={img} alt={`Photo ${idx+1}`}
                      className="rounded-xl border-4 border-white shadow object-cover w-full aspect-video" />
                    <span className="absolute bottom-1.5 left-1.5 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition">
                      #{idx+1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </PageLayout>
  );
}

const colorMap = {
  pink:   "bg-pink-50 border-pink-100",
  purple: "bg-purple-50 border-purple-100",
  rose:   "bg-rose-50 border-rose-100",
  gray:   "bg-gray-50 border-gray-100",
};

const ActionRow = ({ color, children }) => (
  <div className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-2.5 border ${colorMap[color]}`}>
    {children}
  </div>
);

const ActionInfo = ({ title, desc }) => (
  <div className="min-w-0">
    <p className="font-semibold text-gray-700 text-xs">{title}</p>
    <p className="text-xs text-gray-400 truncate">{desc}</p>
  </div>
);