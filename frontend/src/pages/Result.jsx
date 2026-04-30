import React from "react";
import { useLocation, Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import PhotoFrame from "../components/shared/PhotoFrame";
import DownloadButton from "../components/shared/DownloadButton";

export default function Result() {
  const { state } = useLocation();

  const images   = state?.images   || [];
  const layout   = state?.layout   || "vertical";
  const frame    = state?.frame    || null;
  const filter   = state?.filter   || null;
  const stickers = state?.stickers || [];

  return (
    <PageLayout>
      <main className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-pink-700 mb-4 drop-shadow-lg">
          Your K-Photo Strip 🎞️
        </h2>
        <p className="text-pink-500 mb-10 text-lg">
          Looking cute! Download and share your moment 💕
        </p>

        {images.length === 0 ? (
          <div className="bg-white/70 rounded-2xl p-10 shadow-md">
            <p className="text-pink-400 text-xl mb-6">
              No photos yet! Head to the Booth to take some. 📸
            </p>
            <Link to="/booth">
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-all duration-300">
                Go to Booth →
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white/80 rounded-2xl p-6 shadow-lg inline-block mb-8 max-w-sm w-full">
              <PhotoFrame layout={layout} frame={frame} filter={filter} stickers={stickers} images={images} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
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

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/booth">
                <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-all duration-300">
                  🔄 Take New Photos
                </button>
              </Link>
              <DownloadButton capturedImages={images} layout={layout} frame={frame} filter={filter} stickers={stickers} />
            </div>
          </>
        )}
      </main>
    </PageLayout>
  );
}