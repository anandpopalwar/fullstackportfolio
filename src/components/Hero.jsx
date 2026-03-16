import React from "react";
import {
  Sparkles,
  Terminal,
  Zap,
  Atom,
  Cpu,
  Wifi,
  Database,
  ArrowRight,
  Github,
  Mail,
  Linkedin,
} from "lucide-react";
// import self from "../assets/anand_crop.png";
import self from "../assets/me.png";

export default function Hero({ isDarkMode }) {
  return (
    <>
      <section className="min-h-[90vh] flex flex-col justify-center max-w-7xl mx-auto pt-20 md:pt-24 pb-12 px-4 md:px-6 relative overflow-hidden">

        {/* Background Image Area (Absolute) */}
        <div className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none lg:justify-start lg:pl-[10%] xl:pl-[15%]">
          {/* Visual background glow */}
          {/* <div className="absolute inset-0 bg-blue-500/10 md:bg-blue-500/20 blur-[80px] md:blur-[120px] rounded-full mix-blend-screen opacity-50 animate-pulse"></div> */}

          <img
            src={self}
            alt="Anand Popalwar"
            className={`w-full max-w-[500px] md:max-w-[700px] object-contain transition-all scale-[1.5] origin-right opacity-30 md:opacity-60 lg:opacity-80 ${isDarkMode ? "invert" : ""}`}
          />
        </div>

        {/* Foreground Content - Right Aligned */}
        <div className="relative z-10 w-full flex flex-col items-end text-right space-y-6 md:space-y-8 mt-16 md:mt-0">
          <div className="flex flex-col items-end max-w-3xl">
            {/* Massive Responsive Typography */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] font-black leading-[0.85] tracking-tighter uppercase mb-6 md:mb-8 select-none">
              Anand <br />
              Popalwar.
            </h1>

            {/* Tagline */}
            <p className="text-base md:text-xl lg:text-2xl font-medium opacity-80 mb-8 md:mb-10 italic leading-relaxed backdrop-blur-sm bg-black/5 rounded-2xl p-2 md:p-4 border border-white/5 md:border-transparent md:backdrop-blur-none md:bg-transparent">
              MERN Developer building data-driven dashboards, secure
              authentication systems, and scalable web applications with React
              and Node.js.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-4 md:gap-6 mb-8 md:mb-10">
              <a
                href="#contact"
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold transition-all backdrop-blur-md hover:-translate-y-1 hidden sm:flex"
              >
                Say Hi on
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" /> Linkedin
              </a>
              <a
                href="#drops"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1"
              >
                View Projects <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Marquee */}
      <div className="py-6 md:py-8 border-y border-white/5 overflow-hidden flex whitespace-nowrap bg-blue-600/5">
        <div className="flex animate-marquee gap-8 md:gap-16 items-center">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 md:gap-8 text-lg md:text-2xl font-black opacity-30 uppercase italic text-white"
            >
              <span>React JS</span> <Atom className="w-5 h-5 md:w-8 md:h-8" />
              <span>Node JS</span> <Cpu className="w-5 h-5 md:w-8 md:h-8" />
              <span>Next JS</span> <Zap className="w-5 h-5 md:w-8 md:h-8" />
              <span>WebSockets</span> <Wifi className="w-5 h-5 md:w-8 md:h-8" />
              <span>MongoDB</span>{" "}
              <Database className="w-5 h-5 md:w-8 md:h-8" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
