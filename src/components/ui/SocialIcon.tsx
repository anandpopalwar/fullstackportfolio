import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
  className?: string;
  ariaLabel?: string;
  lightMode?: boolean; // Toggle for adapting glassmorphism to light/dark styles
}

export default function SocialIcon({
  icon,
  href,
  className = "",
  ariaLabel,
  lightMode = false,
}: SocialIconProps) {
  const iconRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = iconRef.current;
    if (!el) return;

    // quickTo for highly performant tracking to the mouse directly
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      // Distance from center of component
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);

      // Magnetic pull scaling down the intensity to 40%
      xTo(relX * 0.4);
      yTo(relY * 0.4);
    };

    const handleMouseLeave = () => {
      // Snap back firmly
      xTo(0);
      yTo(0);
      gsap.to(el, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    };

    const handleMouseEnter = () => {
      gsap.to(el, { scale: 1.15, duration: 0.3, ease: "power2.out" });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const themeClasses = lightMode
    ? "bg-zinc-200/50 border-zinc-300 text-zinc-800 hover:text-[#2563eb] hover:border-[#2563eb]"
    : "bg-white/10 border-white/20 text-white hover:text-[#2563eb] hover:bg-white/20 hover:border-white/30";

  return (
    <a
      ref={iconRef}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      className={`relative flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md border transition-colors shadow-sm ${themeClasses} ${className}`}
    >
      <span className="w-5 h-5 flex items-center justify-center pointer-events-none">
        {icon}
      </span>
    </a>
  );
}
