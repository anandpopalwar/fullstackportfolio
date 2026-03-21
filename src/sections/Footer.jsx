import React, { useState, useEffect } from "react";
import {
  FileDown,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Instagram,
  Dribbble,
  ArrowUpRight,
} from "lucide-react";
import { FunkySVG } from "../components/DraggableSvg";

const socials = [
  {
    Icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anandpopalwar",
    hoverClass: "hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white"
  },
  { Icon: Mail, label: "Email", href: "anandpopalwar444@gmail.com", hoverClass: "hover:bg-[#ea4335] hover:border-[#ea4335] hover:text-white" },
  { Icon: Github, label: "GitHub", href: "https://github.com/anandpopalwar", hoverClass: "hover:bg-[#333333] hover:border-[#333333] hover:text-white" },
  { Icon: Twitter, label: "Twitter", href: "#", hoverClass: "hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white" },
  { Icon: Instagram, label: "Instagram", href: "#", hoverClass: "hover:bg-[#E1306C] hover:border-[#E1306C] hover:text-white" },
  { Icon: Dribbble, label: "Dribbble", href: "#", hoverClass: "hover:bg-[#ea4c89] hover:border-[#ea4c89] hover:text-white" },
];

export default function Footer() {
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
      className="relative z-10 bg-[#ffffff] text-[#050505] py-20 lg:py-32 overflow-hidden border-t border-zinc-100 font-sans"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* MASSIVE TYPOGRAPHY HEADLINE */}
        <div className="w-full mb-16 lg:mb-28 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-[14vw] sm:text-[12vw] lg:text-[10rem] xl:text-[11.5rem] font-black uppercase leading-[0.8] tracking-[-0.04em] flex flex-wrap justify-center lg:justify-start gap-x-[3vw] lg:gap-x-8 gap-y-2 lg:gap-y-6 ">
            <span className="">LET'S</span>
          </h2>
          <h2 className="text-[14vw] sm:text-[12vw] lg:text-[10rem] xl:text-[11.5rem] font-black uppercase leading-[0.8] tracking-[-0.04em] flex flex-wrap justify-center lg:justify-start gap-x-[3vw] lg:gap-x-8 gap-y-2 lg:gap-y-6 ">
            <span className="text-red-600">LOCK IN</span>
          </h2>
          <h2 className="text-[14vw] sm:text-[12vw] lg:text-[10rem] xl:text-[11.5rem] font-black uppercase leading-[0.8] tracking-[-0.04em] flex flex-wrap justify-center lg:justify-start gap-x-[3vw] lg:gap-x-8 gap-y-2 lg:gap-y-6 ">
            <span className="text-black">&</span>
          </h2>
          <h2 className="text-[14vw] sm:text-[12vw] lg:text-[10rem] xl:text-[11.5rem] font-black uppercase leading-[0.8] tracking-[-0.04em] flex flex-wrap justify-center lg:justify-start gap-x-[3vw] lg:gap-x-8 gap-y-2 lg:gap-y-6 ">
            <span className="text-red-600">COOK</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-end">
          {/* LEFT COLUMN */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center lg:items-start space-y-8 text-center lg:text-left">
            {/* Avatar & Name */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-16 h-16 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-zinc-100 flex items-center justify-center border border-zinc-200 p-2">
                <FunkySVG />
              </div>
              <span className="text-3xl sm:text-4xl font-black tracking-tighter text-[#050505]">
                ANAND POPALWAR
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-md leading-relaxed">
              Crafting premium digital experiences, enterprise dashboards, and
              real-time systems.
            </p>

            {/* Meta tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm font-bold tracking-widest uppercase text-zinc-900 pt-2">
              <div className="flex items-center gap-2 px-5 py-3 bg-zinc-100/80 rounded-xl border border-zinc-200">
                <MapPin className="w-5 h-5 text-red-500" /> Navi Mumbai, IN
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-zinc-100/80 rounded-xl border border-zinc-200">
                <Clock className="w-5 h-5 text-blue-500" />{" "}
                {localTime || "00:00 AM"}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col space-y-6 lg:ml-auto w-full lg:max-w-md items-center lg:items-end">
            {/* 2x3 Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 w-[75%] sm:w-full max-w-[280px] sm:max-w-none">
              {socials.map(({ Icon, label, href, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`group aspect-square rounded-[1rem] sm:rounded-[2rem] bg-zinc-100/80 border border-zinc-200 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-sm text-zinc-800 ${hoverClass || "hover:bg-zinc-200"}`}
                >
                  <Icon
                    className="w-6 h-6 sm:w-10 sm:h-10 transition-transform group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                </a>
              ))}
            </div>

            {/* Resume Button */}
            <a
              href="#"
              className="group relative flex items-center justify-between w-full p-2 bg-[#ccff00] rounded-[2rem] hover:bg-[#b8e600] transition-colors duration-300 shadow-[0_10px_40px_-10px_rgba(204,255,0,0.5)] overflow-hidden"
            >
              <div className="flex items-center gap-3 md:gap-4 px-6 sm:px-8 py-3 sm:py-4">
                <FileDown
                  className="w-6 h-6 sm:w-8 sm:h-8 text-[#050505]"
                  strokeWidth={2.5}
                />
                <span className="text-[#050505] font-black uppercase text-xl sm:text-2xl tracking-tighter mt-1">
                  GRAB RESUME
                </span>
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#050505] flex-shrink-0 rounded-[1.5rem] flex items-center justify-center mr-1 group-hover:rotate-12 transition-transform duration-300">
                <ArrowUpRight
                  className="w-7 h-7 sm:w-8 sm:h-8 text-[#ccff00]"
                  strokeWidth={2.5}
                />
              </div>
            </a>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-20 sm:mt-32 pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-center md:text-left">
          <span>© {new Date().getFullYear()} Anand Popalwar</span>
          <span>Gen Z × Millennial Aesthetics</span>
        </div>
      </div>
    </section>
  );
}
