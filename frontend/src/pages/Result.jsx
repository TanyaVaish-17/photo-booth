import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import PhotoFrame from "../components/PhotoFrame";
import DownloadButton from "../components/DownloadButton";

export default function Result() {
  // Booth.jsx navigates here with state: { images, layout, frame, filter, stickers }
  const { state } = useLocation();

  const images   = state?.images   || [];
  const layout   = state?.layout   || "vertical";
  const frame    = state?.frame    || null;
  const filter   = state?.filter   || null;
  const stickers = state?.stickers || [];

  return (
    <div className="font-sans text-gray-800 bg-gradient-to-b from-pink-200 via-pink-100 to-red-100 min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-pink-100/80 backdrop-blur shadow-md px-6 py-4">
        <div className="relative flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-pink-700 drop-shadow-sm tracking-wide">
            <span className="text-pink-600">K</span>-Click{" "}
            <span className="animate-ping inline-block">📸</span>
          </h1>
          <div className="flex gap-8 text-lg font-semibold text-pink-700 ml-auto">
            {["Home", "Booth", "Result"].map((item, index) => (
              <Link
                key={index}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative hover:text-pink-600 transition after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-pink-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-pink-700 mb-4 drop-shadow-lg">
          Your K-Photo Strip 🎞️
        </h2>
        <p className="text-pink-500 mb-10 text-lg">
          Looking cute! Download and share your moment 💕
        </p>

        {images.length === 0 ? (
          /* No images → guide the user back */
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
            {/* Photo strip preview */}
            <div className="bg-white/80 rounded-2xl p-6 shadow-lg inline-block mb-8 max-w-sm w-full">
              <PhotoFrame
                layout={layout}
                frame={frame}
                filter={filter}
                stickers={stickers}
                images={images}
              />
            </div>

            {/* Individual photo grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {images.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={img}
                    alt={`Photo ${idx + 1}`}
                    className="rounded-xl border-4 border-white shadow-lg object-cover w-full aspect-video"
                  />
                  <span className="absolute bottom-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition">
                    #{idx + 1}
                  </span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/booth">
                <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-all duration-300">
                  🔄 Take New Photos
                </button>
              </Link>

              <DownloadButton
                capturedImages={images}
                layout={layout}
                frame={frame}
                filter={filter}
                stickers={stickers}
              />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-200 text-pink-900 py-4 mt-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-row items-start justify-between gap-6">
          <div className="w-[30%]">
            <h1 className="text-2xl font-extrabold text-pink-700 tracking-wide mb-1">
              <span className="text-pink-600">K</span>-Click{" "}
              <span className="animate-ping inline-block">📸</span>
            </h1>
            <p className="text-sm text-pink-800">Capture your cutest K-moments in style! 💕</p>
          </div>
          <div className="w-[30%]">
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <ul className="space-y-1 font-medium">
              <li><a href="/" className="flex items-center gap-2 hover:text-rose-700 transition">🏠 Home</a></li>
              <li><a href="/booth" className="flex items-center gap-2 hover:text-rose-700 transition">📷 Booth</a></li>
              <li><a href="/result" className="flex items-center gap-2 hover:text-rose-700 transition">🎞️ Result</a></li>
            </ul>
          </div>
          <div className="w-[30%]">
            <h2 className="text-lg font-semibold mb-2">Connect With Us 💌</h2>
            <div className="flex space-x-4">
              <a href="mailto:contact@kclickbooth.com" className="hover:text-rose-700 transition"><Mail size={20} /></a>
              <a href="tel:+1234567890" className="hover:text-rose-700 transition"><Phone size={20} /></a>
              <a href="https://facebook.com/kclickbooth" target="_blank" rel="noopener noreferrer" className="hover:text-rose-700 transition"><Facebook size={20} /></a>
              <a href="https://instagram.com/kclickbooth" target="_blank" rel="noopener noreferrer" className="hover:text-rose-700 transition"><Instagram size={20} /></a>
              <a href="https://twitter.com/kclickbooth" target="_blank" rel="noopener noreferrer" className="hover:text-rose-700 transition"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-pink-900/70 select-none text-sm">
          © 2025 <span className="font-semibold text-pink-800">K-Click Booth</span> — Built with 💖 by Your Team
        </p>
      </footer>
    </div>
  );
}