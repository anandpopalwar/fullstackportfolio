import React from "react";
import DraggableSvg from "../components/DraggableSvg";
import { Moon, Sun } from "lucide-react";
import Text from "../components/ui/Text";
import GlassSurface from "../components/ui/GlassSurface";

const Navbar = ({ isDarkMode, containerRef }) => {
  return (
    <nav className="fixed top-0 w-full z-[1000] p-2 md:p-4">


      <GlassSurface
        width={"max-w-7xl"}
        height={"auto"}
        borderRadius={50}
        className="mx-auto  backdrop-blur-2xl border p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] transition-all bg-black/5 border-black/10"
        saturation={0}
        Displace={50}
        Blur={"100px"}
      >
        <div className="flex justify-between items-center w-full">
          <div className="text-lg md:text-2xl font-black tracking-tighter flex items-center gap-2">
            <DraggableSvg isDarkMode={isDarkMode} containerRef={containerRef} />
            <Text
              as="span"
              variant="heading3"
              className="text-lg md:text-2xl text-neutral-900 tracking-[-0.5%]"
            >
              Anand Popalwar
            </Text>
          </div>
          <div className="flex gap-3 md:gap-4 items-center text-xs md:text-sm font-black tracking-tighter">
            <div className="hidden sm:flex gap-6 md:gap-8">
              <a
                href="#projects"
                className="hover:underline hover:underline-offset-4 transition-colors uppercase"
              >
                Projects
              </a>
            </div>
            <a
              href="#contact"
              className={`font-mono px-5 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-black tracking-tighter transition-all hover:scale-105 bg-black text-white hover:bg-blue-600`}
            >
              Say Hi 👋
            </a>
          </div>
        </div>
      </GlassSurface>;
      {/* <div
        className={`max-w-7xl mx-auto flex justify-between items-center backdrop-blur-2xl border p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] transition-all ${
          isDarkMode
            ? "bg-white/5 border-white/10"
            : "bg-black/5 border-black/10"
        }`}
      >
        <div className="text-lg md:text-2xl font-black tracking-tighter flex items-center gap-2">
          <DraggableSvg isDarkMode={isDarkMode} containerRef={containerRef} />
          <Text
            as="span"
            variant="heading3"
            className="text-lg md:text-2xl font-black tracking-tighter"
          >
            ANAND POPALWAR
          </Text>
        </div>
        <div className="flex gap-3 md:gap-4 items-center text-xs md:text-sm font-black tracking-tighter">
          <div className="hidden sm:flex gap-6 md:gap-8">
            <a
              href="#projects"
              className="hover:underline hover:underline-offset-4 transition-colors uppercase"
            >
              Projects
            </a>
          </div>
          <a
            href="#contact"
            className={`font-mono px-5 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-black tracking-tighter transition-all hover:scale-105 ${
              isDarkMode
                ? "bg-white text-black hover:bg-yellow-400"
                : "bg-black text-white hover:bg-blue-600"
            }`}
          >
            Say Hi 👋
          </a>
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;

