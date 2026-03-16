import React, { useState, useEffect } from 'react';
import { ChevronRight, FileText, MapPin, Clock, Github, Linkedin, Mail } from 'lucide-react';
import { FunkySVG } from './DraggableSvg';

export default function Footer({ isDarkMode }) {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="contact"
      className={`py-12 md:py-20 border-t relative z-10 transition-colors duration-700 ${isDarkMode ? "border-white/10" : "border-black/10"
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-5xl md:text-[10rem] font-black uppercase leading-none tracking-tighter italic transition-colors duration-500">
            Let's <br />
            {/* Massive CREATE ghost-text background with blue-to-yellow gradient stroke and glow */}
            <span className="transition-all duration-700 inline-block mt-1 md:mt-2 text-stroke-2 bg-clip-text-stroke bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              Create
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          <div className="col-span-1 md:col-span-2 space-y-4 md:space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shadow-2xl transform rotate-12">
                <FunkySVG />
              </div>
              <span className="text-xl md:text-2xl font-black italic tracking-tighter">
                ANAND POPALWAR
              </span>
            </div>
            <p className="text-sm md:text-lg max-w-sm font-medium opacity-50 leading-relaxed">
              AI Dashboards & Real-time systems. Navi Mumbai, IN.
            </p>
            <div className="flex items-center gap-3 md:gap-4">
              {[Github, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl border transition-all hover:scale-110 ${isDarkMode
                    ? "border-white/10 bg-white/5 hover:bg-white hover:text-black"
                    : "border-black/10 bg-black/5 hover:bg-black hover:text-white"
                    }`}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-6 md:space-y-8">
            <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] opacity-30">
              Explore
            </h4>
            <ul className="space-y-3 md:space-y-4 text-base md:text-lg font-black italic">
              {['Home', 'Toolkit', 'Drops'].map((link) => (
                <li key={link}>
                  <a href={link === 'Home' ? '#' : `#${link.toLowerCase()}`} className="hover:text-blue-500 flex items-center gap-2 group">
                    {link} <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6 md:space-y-8">
            <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] opacity-30">
              Status
            </h4>
            <div className="space-y-4 md:space-y-6 text-xs md:text-sm font-bold">
              <div className="flex items-center gap-2 md:gap-3">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-500" /> Navi Mumbai, IN
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" /> {localTime || "00:00"}
              </div>
              <button className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 bg-blue-600 text-white rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl">
                <FileText className="w-4 h-4 md:w-5 md:h-5" /> Download CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
