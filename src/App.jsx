import React, { useState, useRef } from "react";
import { Sun, Moon } from "lucide-react";

import Hero from "./sections/Hero";
import DraggableSvg from "./components/DraggableSvg";
import Toolkit from "./sections/Toolkit";
import Drops from "./sections/Drops";
import GeminiWidget from "./components/GeminiWidget";
import Drops2 from "./sections/hoveranimation1";
import Drops3 from "../hoveranimation2";
import Footer from "./sections/Footer";
import Stack from "./sections/Stack";
import Stacks from "./sections/Stacks";
import TechStack from "./sections/TechStack";
import Navbar from "./sections/Navbar";
import ProjectShowcase from "./sections/ProjectShowcase";

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

      <Navbar {...{ isDarkMode, setIsDarkMode, containerRef }} />
      <main className="relative z-10 px-0">
        <Hero isDarkMode={isDarkMode} />

        {/* Stats Section */}
        {/* <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                val: "97%",
                label: "Load Reduction",
                color: "bg-yellow-400 text-black",
              },
              {
                val: "200+",
                label: "Active Users",
                color: "bg-blue-600 text-white",
              },
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
        </section> */}

        {/* <Stack isDarkMode={isDarkMode} />
        <Stacks /> */}
        <TechStack />
        {/* <Toolkit isDarkMode={isDarkMode} /> */}
        {/* <Drops isDarkMode={isDarkMode} /> */}
        <ProjectShowcase />
        {/* <Drops2 isDarkMode={isDarkMode} /> */}
        {/* <Drops3 isDarkMode={isDarkMode} /> */}
        <Footer isDarkMode={isDarkMode} />
      </main>

      <GeminiWidget isDarkMode={isDarkMode} />
    </div>
  );
}
