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
import AnimatedHeading from "../components/ui/AnimatedHeading";
import SocialIcon from "../components/ui/SocialIcon";
import CustomButton from "../components/ui/CustomButton";
import Text from "../components/ui/Text";

const socials = [
  {
    Icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anandpopalwar",
    hoverClass: "hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white",
  },
  {
    Icon: Mail,
    label: "Email",
    href: "anandpopalwar444@gmail.com",
    hoverClass: "hover:bg-[#ea4335] hover:border-[#ea4335] hover:text-white",
  },
  {
    Icon: Github,
    label: "GitHub",
    href: "https://github.com/anandpopalwar",
    hoverClass: "hover:bg-[#333333] hover:border-[#333333] hover:text-white",
  },
  // { Icon: Twitter, label: "Twitter", href: "#", hoverClass: "hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white" },
  // { Icon: Instagram, label: "Instagram", href: "#", hoverClass: "hover:bg-[#E1306C] hover:border-[#E1306C] hover:text-white" },
  // { Icon: Dribbble, label: "Dribbble", href: "#", hoverClass: "hover:bg-[#ea4c89] hover:border-[#ea4c89] hover:text-white" },
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
        {"OPEN TO WORK".split(" ").map((word) => (
          <AnimatedHeading
            title={word}
            className="mb-4 lg:mb-8 w-full flex flex-col items-center lg:items-start text-center lg:text-left"
          />
        ))}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-end">
          {/* LEFT COLUMN */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center lg:items-start space-y-8 text-center lg:text-left">
            {/* Avatar & Name */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-16 h-16 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-zinc-100 flex items-center justify-center border border-zinc-200 p-2">
                <FunkySVG />
              </div>
              <Text variant="heading3" as="span" className="text-3xl sm:text-4xl font-black tracking-tighter text-[#050505]">
                ANAND POPALWAR
              </Text>
            </div>

            {/* Subtitle */}
            <Text variant="body" as="p" className="text-zinc-500 text-lg md:text-xl font-medium max-w-md">
              Crafting premium digital experiences, enterprise dashboards, and
              real-time systems.
            </Text>

            {/* Meta tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm font-bold tracking-widest uppercase text-zinc-900 pt-2">
              <div className="flex items-center gap-2 px-5 py-3 bg-zinc-100/80 rounded-xl border border-zinc-200">
                <MapPin className="w-5 h-5 text-blue-600" /> Navi Mumbai, IN
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
            <div className="grid grid-cols-3 gap-4 sm:gap-6 w-[75%] sm:w-full max-w-[280px] sm:max-w-none justify-items-center mb-8">
              {socials.map(({ Icon, label, href, hoverClass }) => (
                <SocialIcon
                  key={label}
                  href={href}
                  ariaLabel={label}
                  icon={
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                  }
                  lightMode={true}
                  className={`w-16 h-16 sm:w-20 sm:h-20 ${hoverClass}`}
                />
              ))}
            </div>

            {/* Resume Button */}
            <div className="w-full">
              <CustomButton
                variant="secondary"
                className="w-full !rounded-[2rem] border-zinc-200 text-lg py-5 group"
                onClick={() => window.open("#", "_blank")}
              >
                <div className="flex items-center justify-center gap-3 w-full">
                  <FileDown className="w-6 h-6 group-hover:text-white transition-colors" />
                  <span className="mt-1">GRAB RESUME</span>
                  <ArrowUpRight className="w-6 h-6 ml-2 group-hover:text-white transition-colors" />
                </div>
              </CustomButton>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-20 sm:mt-32 pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-center md:text-left">
          <Text variant="monoBody" as="span">© {new Date().getFullYear()} Anand Popalwar</Text>
          <Text variant="monoBody" as="span">Gen Z × Millennial Aesthetics</Text>
        </div>
      </div>
    </section>
  );
}
