import React, { useState, useEffect } from 'react';
import { FileText, MapPin, Clock, Github, Linkedin, Mail, Twitter, Instagram, Dribbble } from 'lucide-react';
import { FunkySVG } from '../components/DraggableSvg';

const socials = [
  { Icon: Github, label: "GitHub", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
  { Icon: Mail, label: "Email", href: "#" },
  { Icon: Twitter, label: "Twitter", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Dribbble, label: "Dribbble", href: "#" },
];

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
      className={`relative z-10 py-16 md:py-28 border-t transition-colors duration-700 overflow-hidden ${isDarkMode ? "border-white/10" : "border-black/10"
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* ── Two-column layout: LEFT heading + branding | RIGHT socials + resume ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* LEFT — Heading + Branding */}
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl sm:text-6xl md:text-[6rem] lg:text-[8rem] font-black uppercase leading-[0.85] tracking-tighter select-none">
              Let's <br />
              <span className="inline-block mt-1 md:mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(147,51,234,0.5)]">
                Lock In
              </span>
              <br />
              <span className="inline-block mt-1 md:mt-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(236,72,153,0.4)]">
                & Cook
              </span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shadow-2xl transform rotate-12">
                  <FunkySVG />
                </div>
                <span className="text-xl md:text-2xl font-black italic tracking-tighter">
                  ANAND POPALWAR
                </span>
              </div>
              <p className="text-sm md:text-lg max-w-sm font-medium opacity-50 leading-relaxed">
                Crafting enterprise AI dashboards & real-time systems with obsessive attention to detail.
              </p>
              <div className="space-y-2 text-xs md:text-sm font-bold">
                <div className="flex items-center gap-2 md:gap-3">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-500" /> Navi Mumbai, IN
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" /> {localTime || "00:00"}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Social Grid + Resume */}
          <div className="flex flex-col items-start lg:items-end gap-6 lg:pt-8">
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`group p-4 md:p-5 rounded-2xl border transition-all duration-300 hover:scale-110 hover:-translate-y-1 flex items-center justify-center ${isDarkMode
                      ? "border-white/10 bg-white/5 hover:bg-white hover:text-black"
                      : "border-black/10 bg-black/5 hover:bg-black hover:text-white"
                    }`}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>

            <a
              href="#"
              className="flex items-center gap-3 px-8 py-4 bg-[#adff2f] text-black rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-[#c8ff5c] transition-all duration-300 shadow-[0_0_30px_rgba(173,255,47,0.3)] hover:shadow-[0_0_50px_rgba(173,255,47,0.5)] hover:-translate-y-1"
            >
              <FileText className="w-5 h-5" />
              Grab Resume
            </a>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs opacity-30 font-bold uppercase tracking-widest">
          <span>© {new Date().getFullYear()} Anand Popalwar</span>
          <span>Built with React + Vite + Tailwind</span>
        </div>
      </div>
    </section>
  );
}
