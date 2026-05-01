import React, { useRef, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Share2 } from "lucide-react";
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

  const images   = state?.images   || [];
  const layout   = state?.layout   || "vertical";
  const frame    = state?.frame    || null;
  const filter   = state?.filter   || null;
  const stickers = state?.stickers || [];

  const [saved,     setSaved]     = useState(false);
  const [saveError, setSaveError] = useState("");
  const [shared,    setShared]    = useState(false);

  const handleSaveMemory = async () => {
    setSaveError("");
    try {
      await saveMemory({ imageDataUrl: images[0] || "", layout, frame, filter, stickers });
      setSaved(true);
    } catch (err) {
      setSaveError(err.message);
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
    }
  };

  const handleRestart = () => navigate("/booth");

  return (
    <PageLayout>
      <main className="max-w-5xl mx-auto py-16 px-4 text-center">

        {/* Header */}
        <div className="mb-10">
          <span className="text-5xl">🎉</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-pink-700 mt-3 mb-2 drop-shadow-lg">
            Your K-Photo Strip!
          </h2>
          <p className="text-pink-400 text-lg">
            Looking adorable! Download, share or save it to your Memories Wall 💕
          </p>
        </div>

        {images.length === 0 ? (
          /* Empty state */
          <div className="bg-white/80 rounded-3xl p-12 shadow-xl max-w-md mx-auto">
            <span className="text-6xl block mb-4">📷</span>
            <h3 className="text-xl font-bold text-pink-600 mb-2">No photos yet!</h3>
            <p className="text-pink-400 mb-8 text-sm">Head to the Booth to take some cute K-shots first.</p>
            <Link to="/booth">
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-all">
                Go to Booth 📸
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">

            {/* Left — Photo strip */}
            <div className="bg-white/90 rounded-3xl shadow-2xl p-6 flex flex-col items-center gap-4 lg:sticky lg:top-28">
              <p className="text-pink-500 font-semibold text-sm">🎞️ Your Strip</p>
              <PhotoFrame layout={layout} frame={frame} filter={filter} stickers={stickers} images={images} />
            </div>

            {/* Right — Actions + individual photos */}
            <div className="flex-1 flex flex-col gap-6 text-left">

              {/* Action Cards */}
              <div className="bg-white/90 rounded-3xl shadow-xl p-6">
                <h3 className="text-lg font-extrabold text-pink-700 mb-4">What would you like to do?</h3>

                <div className="flex flex-col gap-3">

                  {/* Download */}
                  <div className="flex items-center justify-between bg-pink-50 rounded-2xl px-4 py-3 border border-pink-100">
                    <div>
                      <p className="font-semibold text-pink-700 text-sm">⬇️ Download</p>
                      <p className="text-xs text-pink-400">Save as a PNG to your device</p>
                    </div>
                    <DownloadButton
                      capturedImages={images} layout={layout}
                      frame={frame} filter={filter} stickers={stickers}
                    />
                  </div>

                  {/* Share */}
                  <div className="flex items-center justify-between bg-purple-50 rounded-2xl px-4 py-3 border border-purple-100">
                    <div>
                      <p className="font-semibold text-purple-700 text-sm">🔗 Share</p>
                      <p className="text-xs text-purple-400">
                        {shared ? "Link copied to clipboard! ✅" : "Share this page or copy link"}
                      </p>
                    </div>
                    <button onClick={handleShare}
                      className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-bold py-2 px-4 rounded-full shadow transition hover:scale-105">
                      <Share2 size={14} /> Share
                    </button>
                  </div>

                  {/* Save to Memories */}
                  <div className="flex items-center justify-between bg-rose-50 rounded-2xl px-4 py-3 border border-rose-100">
                    <div>
                      <p className="font-semibold text-rose-700 text-sm">🌸 Save to Memories</p>
                      <p className="text-xs text-rose-400">
                        {!user
                          ? "Sign in to save to your Memories Wall"
                          : saved
                            ? "Saved! View it in your Memories Wall ✅"
                            : "Add this strip to your personal Memories Wall"}
                      </p>
                    </div>
                    {user ? (
                      saved ? (
                        <Link to="/memories">
                          <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded-full shadow transition hover:scale-105">
                            View 🌸
                          </button>
                        </Link>
                      ) : (
                        <button onClick={handleSaveMemory} disabled={saving}
                          className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold py-2 px-4 rounded-full shadow transition hover:scale-105 disabled:opacity-50">
                          {saving ? "Saving…" : "Save 💾"}
                        </button>
                      )
                    ) : (
                      <Link to="/auth">
                        <button className="bg-rose-400 hover:bg-rose-500 text-white text-sm font-bold py-2 px-4 rounded-full shadow transition hover:scale-105">
                          Sign In
                        </button>
                      </Link>
                    )}
                  </div>

                  {saveError && (
                    <p className="text-red-400 text-xs px-1">{saveError}</p>
                  )}

                  {/* Restart */}
                  <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                    <div>
                      <p className="font-semibold text-gray-600 text-sm">🔄 Start Over</p>
                      <p className="text-xs text-gray-400">Go back to the booth for a fresh session</p>
                    </div>
                    <button onClick={handleRestart}
                      className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold py-2 px-4 rounded-full shadow transition hover:scale-105">
                      Restart
                    </button>
                  </div>

                </div>
              </div>

              {/* Individual photos grid */}
              <div className="bg-white/90 rounded-3xl shadow-xl p-6">
                <h3 className="text-lg font-extrabold text-pink-700 mb-4">📷 Individual Shots</h3>
                <div className="grid grid-cols-2 gap-3">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img src={img} alt={`Photo ${idx + 1}`}
                        className="rounded-xl border-4 border-white shadow-lg object-cover w-full aspect-video" />
                      <span className="absolute bottom-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition">
                        #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </PageLayout>
  );
}