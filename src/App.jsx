import React, { useState, useRef } from "react";
import { Sun, Moon } from "lucide-react";

import Hero from "./sections/Hero";
import DraggableSvg from "./components/DraggableSvg";
import Toolkit from "./sections/Toolkit";
import Drops from "./sections/Drops";
import GeminiWidget from "./components/GeminiWidget";
import Drops2 from "./sections/hoveranimation1";
import Drops3 from "../hoveranimation2";
import Stack from "./sections/Stack";
import Stacks from "./sections/Stacks";
import TechStack from "./sections/TechStack";
import Navbar from "./sections/Navbar";
import ProjectShowcase from "./sections/ProjectShowcase";
import StickyFooter from "./components/StickyFooter";
import Contact from "./sections/Contact";

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
      <main
        className={`relative z-10 px-0 ${isDarkMode ? "bg-[#000000]" : "bg-[#ffffff]"
          }`}
      >
        <Hero />
        <TechStack />
        <ProjectShowcase />
        <Contact />
      </main>
      {/* Spacer for ScrollTrigger room */}
      <div className="h-50" aria-hidden="true" />
      <StickyFooter />
    </div>
  );
}
