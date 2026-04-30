import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageLayout({ children }) {
  return (
    <div className="font-sans text-gray-800">
      <div className="bg-gradient-to-b from-pink-200 via-pink-100 to-red-100 min-h-screen w-full flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}