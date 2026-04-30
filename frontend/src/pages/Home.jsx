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

      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center text-center px-4 bg-gradient-to-br from-pink-100 to-red-100">
        <img src="https://cdn-icons-png.flaticon.com/512/742/742751.png" alt="Smiley" className="absolute top-10 left-10 w-16 animate-[wiggle_0.3s_ease-in-out_infinite]" />
        <img src={Ribbon} alt="Ribbon" className="absolute bottom-20 right-16 w-20 animate-[flutter_0.5s_ease-in-out_infinite]" />
        <img src={teddyBear} alt="TeddyBear" className="absolute top-1/1.5 left-6 w-40 animate-[cuddle_1s_ease-in-out_infinite] bear" />
        <img src="https://cdn-icons-png.flaticon.com/512/833/833472.png" alt="Heart" className="absolute top-20 left-1/2 transform -translate-x-1/2 w-12 animate-[heartbeat_1s_ease-in-out_infinite]" />
        <img src={fingerHeart} alt="Finger Heart" className="absolute bottom-20 left-80 w-24 animate-bounce heart" />

        <div className="z-10 max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-extrabold text-pink-700 mb-4 drop-shadow-lg">
            Capture Your K-Moment!
          </h2>
          <p className="text-lg text-pink-600 mb-6 drop-shadow-sm">
            A cute Korean-style photo booth to save your favorite memories with adorable filters & layouts 💖
          </p>
          <Link to="/booth">
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full shadow-xl transition transform hover:scale-105">
              Start Booth 🎀
            </button>
          </Link>
        </div>

        <img src={themeImage} alt="Cute Booth Illustration" className="absolute right-4 top-[50%] -translate-y-[40%] w-[420px] md:w-[500px] lg:w-[600px] max-h-[90vh] object-contain z-10 opacity-90 pointer-events-none theme-image" />
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 text-center">
        <h3 className="text-3xl md:text-4xl font-extrabold text-pink-700 mb-12 drop-shadow-lg">
          <span className="inline-block animate-[twinkle_1s_ease-in-out_infinite]">✨</span> How K-Booth Works <span className="inline-block animate-[twinkle_1s_ease-in-out_infinite]">✨</span>
        </h3>
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            { icon: "🎞️", title: "Choose Layout", desc: "Pick your perfect strip or collage style to match your vibe!" },
            { icon: "📸", title: "Snap Photos",   desc: "Pose with friends or solo — let K-Booth capture your cutest moments!" },
            { icon: "💾", title: "Download Strip", desc: "Instantly save and share your K-photostrip online or print it!" },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white/70 backdrop-blur-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 animate-bounce">{icon}</div>
              <h4 className="text-lg sm:text-xl font-bold text-pink-700 mb-1 sm:mb-2">{title}</h4>
              <p className="text-xs sm:text-sm text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Layouts */}
      <section className="py-16 px-6 bg-gradient-to-br from-red-100 to-pink-50">
        <h3 className="text-3xl md:text-4xl font-extrabold text-pink-700 mb-12 drop-shadow-lg text-center">
          <span className="flower-animate">🌸</span> Popular Layouts <span className="flower-animate">🌸</span>
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            { title: "Vertical Strip", description: "Classic 4-cut style. Great for selfies! 📸", img: layout1 },
            { title: "Square Grid",   description: "Perfect for couple or group poses 💕",      img: layout2 },
            { title: "Collage Frame", description: "Aesthetic frames for fun themes 🎀",         img: layout3 },
          ].map((layout, index) => (
            <div key={index} className={`bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition duration-300 transform hover:-translate-y-2 ${index === 2 ? "card3" : ""}`}>
              <img src={layout.img} alt={layout.title} className="h-64 w-full object-contain bg-pink-50 rounded-t-3xl" />
              <div className="p-4 text-center">
                <p className="font-semibold text-pink-700 text-lg">{layout.title}</p>
                <p className="text-sm text-gray-600 mt-1">{layout.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* K-Filter Magic */}
      <section className="relative py-16 px-6 bg-pink-50 text-center overflow-hidden">
        <div className="absolute top-4 left-6 text-pink-300 text-4xl animate-bounce-slow">💖</div>
        <div className="absolute bottom-6 right-10 text-pink-200 text-5xl animate-pulse">💖</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-100 text-7xl opacity-20 animate-spin-slow">💗</div>
        <h3 className="text-3xl md:text-4xl font-extrabold text-pink-700 mb-10 drop-shadow-lg">
          <span className="heartbeat">💘</span> K-Filter Magic <span className="heartbeat">💘</span>
        </h3>
        <p className="text-pink-600 max-w-2xl mx-auto mb-10 text-base md:text-lg">
          Experience the charm of K-style filters — from dreamy glow to sparkly effects and pastel overlays. Make your pictures feel like a K-drama scene!
        </p>
        <Link to="/booth">
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full shadow-xl hover:scale-105 transition-all duration-300">
            Try Filters 🎨
          </button>
        </Link>
      </section>

      {/* K-Memories Wall */}
      <section className="py-16 px-6 bg-gradient-to-br from-pink-50 to-rose-100">
        <h3 className="text-3xl md:text-4xl font-extrabold text-pink-700 mb-12 drop-shadow-lg text-center">
          <span className="flower-animate">🌸</span> K-Memories Wall <span className="flower-animate">🌸</span>
        </h3>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {[memory1, memory2, memory3].map((imgSrc, index) => (
            <div key={index} className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition duration-300 transform hover:-translate-y-1 ${index === 2 ? "card3" : ""}`}>
              <div className="bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 flex items-center justify-center min-h-[18rem]">
                <img src={imgSrc} alt={`Memory ${index + 1}`} className="w-full h-auto max-h-[18rem] object-contain" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-rose-200 to-transparent" />
              <div className="p-4 text-center relative z-10">
                <p className="text-pink-700 font-semibold text-lg">📸 Memory {index + 1}</p>
                <p className="text-sm text-gray-600 mt-1">Captured with our cutest K-filter & layout — a perfect memory! 💖</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </PageLayout>
  );
}