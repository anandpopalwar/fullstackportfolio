import { useRef } from "react";
import {
  ArrowRight,
  Linkedin,
  Atom,
  Cpu,
  Zap,
  Wifi,
  Database,
} from "lucide-react";
// import self from "../assets/anand_crop.png";
import self from "../assets/me.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ isDarkMode }) {
  const parallaxRef = useRef(null);

  useGSAP(() => {
    gsap.to(parallaxRef.current, {
      y: -100, // Negative value moves it in the opposite direction (upwards) as you scroll
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: window.innerHeight,
        scrub: 1, // Adds a 1-second smoothing delay for buttery smoothness
      },
    });
  });
  return (
    <>
      <section className="min-h-[100vh] flex flex-col justify-end md:justify-center max-w-7xl mx-auto pt-20 md:pt-24 pb-24 md:pb-12 px-4 md:px-6 relative overflow-hidden">
        {/* Background Image Area (Absolute) */}
        <div className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none lg:justify-start lg:pl-[10%] xl:pl-[15%]">
          {/* Visual background glow */}
          {/* <div className="absolute inset-0 bg-blue-500/10 md:bg-blue-500/20 blur-[80px] md:blur-[120px] rounded-full mix-blend-screen opacity-50 animate-pulse"></div> */}

          <div
            ref={parallaxRef}
            className="w-full max-w-[500px] md:max-w-[700px]"
          >
            <img
              src={self}
              alt="Anand Popalwar"
              draggable="false"
              className={`w-full object-contain transition-all scale-[1.7] md:scale-[1.5] origin-center md:origin-right opacity-30 md:opacity-60 lg:opacity-80 select-none pointer-events-none ${isDarkMode ? "invert" : ""}`}
            />
          </div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 w-full flex flex-col items-start md:items-end text-left md:text-right space-y-6 md:space-y-8 mt-16 md:mt-0">
          <div className="flex flex-col items-start md:items-end max-w-3xl w-full">
            {/* Massive Responsive Typography */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] font-black leading-[0.85] tracking-tighter uppercase mb-4 md:mb-5 select-none">
              Anand <br />
              Popalwar
            </h1>

            {/* Tagline */}
            <p className="text-base md:text-xl font-medium md:w-2/3 opacity-80 mb-8 md:mb-10 leading-relaxed">
              Specialized in building enterprise analytics dashboards and
              scalable web platforms.
            </p>

            {/* CTA Buttons */}
            <div className="flex w-full flex-wrap items-center justify-center md:justify-end gap-4 md:gap-6 mb-8 md:mb-10">
              <a
                href="#contact"
                className="group relative flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold transition-all duration-300  hover:bg-[#0A66C2] hover:border-[#0A66C2] md:px-8 md:py-4 backdrop-blur-md hidden sm:flex"
              >
                <span className="flex items-center gap-2 transition-transform duration-300 group-hover:-translate-y-[200%]">
                  Say Hola 👋
                </span>
                <span className="absolute flex items-center gap-2 translate-y-[200%] transition-transform duration-300 group-hover:translate-y-0 text-white">
                  <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-white" />{" "}
                  Linkedin
                </span>
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
    </>
  );
}
