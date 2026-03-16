import React, { useState, useRef } from "react";
import { Sun, Moon } from "lucide-react";

import Hero from "./components/Hero";
import DraggableSvg from "./components/DraggableSvg";
import Toolkit from "./components/Toolkit";
import Drops from "./components/Drops";
import Footer from "./components/Footer";
import GeminiWidget from "./components/GeminiWidget";
import Drops2 from "../hoveranimation1";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className={`min-h-screen font-sans transition-colors duration-700 ${isDarkMode ? "bg-[#000000] text-white" : "bg-[#ffffff] text-black"
        } overflow-hidden`}
    >
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-20">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600 blur-[80px] md:blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-pink-600 blur-[150px] rounded-full opacity-40" />
      </div>

      <nav className="fixed top-0 w-full z-[1000] p-2 md:p-4">
        <div
          className={`max-w-7xl mx-auto flex justify-between items-center backdrop-blur-2xl border p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] transition-all ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
            }`}
        >
          <div className="text-lg md:text-2xl font-black italic tracking-tighter flex items-center gap-2">
            <DraggableSvg isDarkMode={isDarkMode} containerRef={containerRef} />
            <span>
              ANAND<span className="text-blue-500">.</span>POPALWAR
            </span>
          </div>
          <div className="flex gap-3 md:gap-4 items-center uppercase text-[9px] md:text-[10px] font-black tracking-[0.2em]">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 md:p-2.5 rounded-full border transition-all hover:scale-110"
            >
              {isDarkMode ? (
                <Sun className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
              )}
            </button>
            <div className="hidden sm:flex gap-6 md:gap-8">
              <a href="#toolkit" className="hover:text-yellow-400 transition-colors">
                Toolkit
              </a>
              <a href="#drops" className="hover:text-blue-400 transition-colors">
                Drops
              </a>
            </div>
            <a
              href="#contact"
              className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[9px] md:text-[10px] font-black tracking-widest transition-all hover:scale-105 ${isDarkMode ? "bg-white text-black hover:bg-yellow-400" : "bg-black text-white hover:bg-blue-600"
                }`}
            >
              TALK
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 px-0">
        <Hero isDarkMode={isDarkMode} />

        {/* Stats Section */}
        <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { val: "97%", label: "Load Reduction", color: "bg-yellow-400 text-black" },
              { val: "200+", label: "Active Users", color: "bg-blue-600 text-white" },
              {
                val: "35%",
                label: "Dev Boost",
                color: isDarkMode
                  ? "bg-[#0a0a0a] border-white/10 text-white"
                  : "bg-slate-50 border-black/10 text-black",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-2xl transition-all hover:-translate-y-2 ${stat.color} ${stat.color.includes("border") ? "border" : ""
                  }`}
              >
                <div className="text-5xl md:text-8xl font-black italic tracking-tighter">
                  {stat.val}
                </div>
                <p className="font-black text-[10px] md:text-xs uppercase mt-3 md:mt-4 tracking-[0.2em] opacity-60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Toolkit isDarkMode={isDarkMode} />
        <Drops isDarkMode={isDarkMode} />
        <Drops2 isDarkMode={isDarkMode} />
        <Footer isDarkMode={isDarkMode} />
      </main>

      <GeminiWidget isDarkMode={isDarkMode} />
    </div>
  );
}
