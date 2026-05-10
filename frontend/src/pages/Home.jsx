import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import themeImage from "../assets/h1.png";
import fingerHeart from "../assets/sticker6.png";
import teddyBear from "../assets/sticker3.png";
import Ribbon from "../assets/sticker1.png";
import layout1 from "../assets/layouts/layout1.png";
import layout2 from "../assets/layouts/layout2.png";
import layout3 from "../assets/layouts/layout3.png";
import memory1 from "../assets/memory1.jpg";
import memory2 from "../assets/memory2.jpg";
import memory3 from "../assets/memory3.jpg";
import "../styles/animations.css";

export default function Home() {
  return (
    <PageLayout>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 overflow-hidden flex items-center">

        {/* ── Background depth blobs ── */}
        <div className="hidden md:block absolute top-[-100px] right-[-100px] w-[680px] h-[680px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(252,231,243,0.85) 0%, rgba(254,205,221,0.35) 55%, transparent 75%)" }} />
        <div className="hidden md:block absolute bottom-[-60px] left-[-60px] w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,228,230,0.7) 0%, rgba(253,164,175,0.15) 65%, transparent 82%)" }} />

        {/* ── Stickers pinned well clear of text column ── */}

        {/* Heart — above illustration column */}
        <span
          className="hidden md:block absolute top-8 right-[44%] pointer-events-none z-10 select-none"
          style={{ fontSize:36, animation: "heartbeat 1.5s ease-in-out infinite", lineHeight:1 }}>❤️</span>




        {/* ── 2-column grid ── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-20 py-16 md:py-24">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 lg:gap-12 items-center min-h-[80svh] md:min-h-0 content-center">

            {/* ══ LEFT — Text ══ */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left col-span-1 md:col-span-1">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-pink-200/70 border border-pink-300/50 text-pink-700 text-xs font-bold px-4 py-2 rounded-full mb-5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse flex-shrink-0" />
                ✨ Korean-style Photo Booth ✨
              </div>

              {/* Heading — one line on desktop with responsive size */}
              <h1 className="font-black text-pink-800 leading-[1.12] tracking-tight mb-5
                text-[2rem] sm:text-5xl md:text-[2.6rem] lg:text-[3.2rem] xl:text-[3.6rem]">
                <span className="block text-pink-700">Capture Your</span>
                <span className="block relative pb-1">
                  <span className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(135deg, #db2777 0%, #e11d48 50%, #f43f5e 100%)" }}>
                    K-Moment!
                  </span>
                  {/* Pink underline */}
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full pointer-events-none"
                    style={{ background: "linear-gradient(90deg, #f472b6, #fb7185, transparent)" }} />
                </span>
              </h1>

              {/* Description */}
              <p className="text-pink-600/80 leading-relaxed mb-7
                text-sm md:text-base lg:text-[1.05rem]
                max-w-[310px] sm:max-w-[360px] md:max-w-[340px] lg:max-w-[400px]">
                A cute Korean-style photo booth to save your favorite memories with adorable filters & layouts 💖
              </p>

              {/* CTAs — centered on mobile, row on desktop */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 mb-7 w-full sm:w-auto">
                <Link to="/booth" className="w-full sm:w-auto">
                  <button
                    className="relative w-full sm:w-auto text-white font-black text-base px-8 py-3.5 rounded-full overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] active:scale-95 focus:outline-none"
                    style={{
                      background: "linear-gradient(135deg, #ec4899 0%, #e11d48 60%, #f43f5e 100%)",
                      boxShadow: "0 8px 28px rgba(236,72,153,0.45), 0 2px 8px rgba(244,63,94,0.25), inset 0 1px 0 rgba(255,255,255,0.25)"
                    }}>
                    <span className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 55%)" }} />
                    <span className="relative z-10">Start Booth 🎀</span>
                  </button>
                </Link>

                <Link to="/memories" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto text-pink-600 hover:text-pink-700 font-semibold text-sm flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-full border border-pink-200 hover:border-pink-300 bg-white/50 hover:bg-pink-50 transition-all duration-200">
                    My Memories →
                  </button>
                </Link>
              </div>

              {/* 3 feature pills — always fits on one row */}
              <div className="flex flex-row flex-wrap justify-center md:justify-start gap-2">
                {[
                  { icon: "🎞️", text: "4 Layouts" },
                  { icon: "✨",  text: "K-Filters" },
                  { icon: "💾",  text: "Free Download" },
                ].map(({ icon, text }) => (
                  <span key={text}
                    className="flex items-center gap-1.5 bg-white/70 text-pink-600 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-pink-200/70 shadow-sm whitespace-nowrap">
                    <span>{icon}</span> {text}
                  </span>
                ))}
              </div>
            </div>

            {/* ══ RIGHT — Illustration ══ */}
            <div className="hidden md:flex order-1 md:order-2 items-center justify-center relative">

              {/* Soft radial glow */}
              <div className="hidden md:block absolute inset-[-20%] pointer-events-none"
                style={{ background: "radial-gradient(ellipse 75% 75% at 52% 50%, rgba(251,207,232,0.65) 0%, rgba(254,205,221,0.25) 55%, transparent 75%)" }} />

              {/* Main illustration — .theme-image hides on mobile via CSS */}
              <img src={themeImage} alt="K-Click Photo Booth"
                className="theme-image relative z-10 pointer-events-none object-contain select-none drop-shadow-2xl
                  md:w-full md:max-w-[460px] lg:max-w-[540px] xl:max-w-[600px]"
              />

              {/* Floating badge — repositioned slightly lower and inward */}
              <div className="hidden md:flex absolute -bottom-5 left-[15%] z-20 items-center gap-2.5
                bg-white/95 rounded-2xl px-3.5 py-2.5 shadow-lg border border-pink-100"
                style={{ animation: "bounce-slow 3.5s ease-in-out infinite" }}>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-base shadow-sm flex-shrink-0">
                  📸
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-black text-pink-800">4 Photo Layouts</p>
                  <p className="text-[10px] text-pink-400">strips, grids & collages</p>
                </div>
              </div>

              {/* Floating badge — top-right, inside illustration column */}
              <div className="hidden md:flex absolute top-[5%] -right-4 z-20 items-center gap-2
                bg-white/95 rounded-2xl px-3.5 py-2.5 shadow-lg border border-pink-100"
                style={{ animation: "bounce-slow 2.8s ease-in-out infinite", animationDelay: "0.9s" }}>
                <span style={{ fontSize:14, animation: "heartbeat 1.5s ease-in-out infinite", display:"inline-block" }}>💖</span>
                <p className="text-xs font-black text-pink-800">K-Style Filters</p>
              </div>


            </div>

          </div>
        </div>
      </section>


            {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 text-center">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-pink-700 mb-2 drop-shadow-sm">
          <span className="inline-block animate-[twinkle_1s_ease-in-out_infinite]">✨</span>
          {" "}How K-Booth Works{" "}
          <span className="inline-block animate-[twinkle_1s_ease-in-out_infinite]">✨</span>
        </h3>
        <p className="text-pink-400 text-xs sm:text-sm mb-8 md:mb-10">Three simple steps to your cutest memories 💕</p>

        <div className="grid gap-4 sm:gap-5 md:gap-7 grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto">
          {[
            { icon: "🎞️", title: "Choose Layout",  desc: "Pick your perfect strip or collage style to match your vibe!", step: "01" },
            { icon: "📸", title: "Snap Photos",    desc: "Pose with friends or solo — let K-Booth capture your cutest moments!", step: "02" },
            { icon: "💾", title: "Download Strip", desc: "Instantly save and share your K-photostrip online or print it!", step: "03" },
          ].map(({ icon, title, desc, step }) => (
            <div key={title} className="group relative bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-md shadow-pink-100/40 hover:shadow-lg hover:shadow-pink-200/50 transition-all duration-300 hover:-translate-y-1 border border-pink-100/60 text-left sm:text-center">
              {/* Step badge */}
              <span className="absolute top-3 right-3 sm:hidden text-[10px] font-black text-pink-300 bg-pink-50 px-1.5 py-0.5 rounded-full">{step}</span>

              {/* Mobile: horizontal layout. Desktop: vertical */}
              <div className="flex items-center gap-4 sm:flex-col sm:items-center sm:gap-0">
                <div className="text-3xl sm:text-4xl sm:mb-3 flex-shrink-0 animate-bounce">{icon}</div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-pink-700 mb-1">{title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          POPULAR LAYOUTS
      ══════════════════════════════════════ */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 bg-gradient-to-br from-red-100 to-pink-50">
        <div className="text-center mb-8 md:mb-10">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-pink-700 drop-shadow-sm">
            <span className="flower-animate">🌸</span>{" "}Popular Layouts{" "}<span className="flower-animate">🌸</span>
          </h3>
          <p className="text-pink-400 text-xs sm:text-sm mt-1.5">Find your perfect photo strip style 🎀</p>
        </div>

        {/* On mobile: horizontal scrollable row. On sm+: 3-col grid */}
        <div className="flex gap-4 overflow-x-auto pb-3 sm:pb-0 snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:overflow-visible sm:gap-5 md:gap-6 max-w-5xl mx-auto scrollbar-hide">
          {[
            { title: "Vertical Strip",  description: "Classic 4-cut style. Great for selfies! 📸", img: layout1 },
            { title: "Square Grid",     description: "Perfect for couple or group poses 💕",        img: layout2 },
            { title: "Collage Frame",   description: "Aesthetic frames for fun themes 🎀",           img: layout3 },
          ].map((layout, index) => (
            <div key={index}
              className="flex-none w-[72vw] max-w-[260px] sm:w-auto sm:max-w-none snap-center bg-white rounded-2xl shadow-md shadow-pink-100/40 hover:shadow-lg hover:shadow-pink-200/50 overflow-hidden transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-[3/4] sm:h-52 md:h-60 w-full bg-gradient-to-b from-pink-50 to-rose-50 flex items-center justify-center overflow-hidden">
                <img src={layout.img} alt={layout.title}
                  className="w-full h-full object-cover object-center" />
              </div>
              <div className="p-3.5 sm:p-4 text-center">
                <p className="font-bold text-pink-700 text-sm sm:text-base">{layout.title}</p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{layout.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile scroll hint */}
        <p className="sm:hidden text-center text-pink-300 text-xs mt-3 animate-pulse">← swipe to explore →</p>
      </section>

      {/* ══════════════════════════════════════
          K-FILTER MAGIC
      ══════════════════════════════════════ */}
      <section className="relative py-10 sm:py-14 md:py-16 px-4 sm:px-6 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 sm:left-6 text-pink-200 text-3xl sm:text-4xl animate-bounce-slow pointer-events-none">💖</div>
        <div className="absolute bottom-5 right-5 sm:right-10 text-pink-100 text-4xl sm:text-5xl animate-pulse pointer-events-none">💖</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-100 text-6xl sm:text-7xl opacity-10 animate-spin-slow pointer-events-none">💗</div>

        <div className="relative z-10 max-w-xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-pink-700 mb-3 drop-shadow-sm">
            <span className="heartbeat">💘</span>{" "}K-Filter Magic{" "}<span className="heartbeat">💘</span>
          </h3>

          {/* Mobile: compact filter pill preview */}
          <div className="md:hidden flex flex-wrap justify-center gap-2 mb-4">
            {["🌸 Dreamy", "⭐ Sparkle", "🎀 Pastel", "🖤 B&W", "🌅 Warm"].map(f => (
              <span key={f} className="bg-white/70 text-pink-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-pink-200 shadow-sm">
                {f}
              </span>
            ))}
          </div>

          <p className="text-pink-600 mb-6 text-sm sm:text-base md:text-lg leading-relaxed px-1">
            Experience the charm of K-style filters — from dreamy glow to sparkly effects and pastel overlays. Make your pictures feel like a K-drama scene!
          </p>

          <Link to="/booth">
            <button
              className="relative text-white font-semibold text-sm sm:text-base px-7 py-2.5 sm:px-8 sm:py-3 rounded-full overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #ec4899 0%, #e11d48 60%, #f43f5e 100%)",
                boxShadow: "0 6px 20px rgba(236,72,153,0.45), inset 0 1px 0 rgba(255,255,255,0.2)"
              }}>
              <span className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 55%)" }} />
              <span className="relative z-10">Try Filters 🎨</span>
            </button>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          K-MEMORIES WALL
      ══════════════════════════════════════ */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 bg-gradient-to-br from-pink-50 to-rose-100">
        <div className="text-center mb-8 md:mb-10">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-pink-700 drop-shadow-sm">
            <span className="flower-animate">🌸</span>{" "}K-Memories Wall{" "}<span className="flower-animate">🌸</span>
          </h3>
          <p className="text-pink-400 text-xs sm:text-sm mt-1.5">Real strips saved by our K-Booth users 💕</p>
        </div>

        {/* Same card structure as Popular Layouts for consistency */}
        <div className="flex gap-4 overflow-x-auto pb-3 sm:pb-0 snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:overflow-visible sm:gap-5 md:gap-6 max-w-5xl mx-auto scrollbar-hide">
          {[
            { img: memory1, title: "Memory 1", description: "Cutest K-filter & layout 💖" },
            { img: memory2, title: "Memory 2", description: "Cutest K-filter & layout 💖" },
            { img: memory3, title: "Memory 3", description: "Cutest K-filter & layout 💖" },
          ].map((mem, index) => (
            <div key={index}
              className="flex-none w-[72vw] max-w-[260px] sm:w-auto sm:max-w-none snap-center bg-white rounded-2xl shadow-md shadow-pink-100/40 hover:shadow-lg hover:shadow-pink-200/50 overflow-hidden transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-[3/4] sm:h-52 md:h-60 w-full bg-gradient-to-b from-pink-50 to-rose-50 flex items-center justify-center overflow-hidden">
                <img src={mem.img} alt={mem.title}
                  className="w-full h-full object-cover object-center" />
              </div>
              <div className="p-3.5 sm:p-4 text-center">
                <p className="font-bold text-pink-700 text-sm sm:text-base">📸 {mem.title}</p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{mem.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile scroll hint */}
        <p className="sm:hidden text-center text-pink-300 text-xs mt-3 animate-pulse">← swipe to see more →</p>

        {/* CTA */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link to="/booth">
            <button
              className="relative text-white font-bold text-sm sm:text-base px-7 py-2.5 sm:px-8 sm:py-3 rounded-full overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #ec4899 0%, #e11d48 60%, #f43f5e 100%)",
                boxShadow: "0 6px 20px rgba(236,72,153,0.45), inset 0 1px 0 rgba(255,255,255,0.2)"
              }}>
              <span className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 55%)" }} />
              <span className="relative z-10">Create Your Memory 📸</span>
            </button>
          </Link>
        </div>
      </section>

    </PageLayout>
  );
}