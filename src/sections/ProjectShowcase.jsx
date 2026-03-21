import React, { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Map,
  MapPin,
  Printer,
  BarChart3,
  Lock,
  Globe,
  X,
  Sparkles,
  Wifi,
} from "lucide-react";
import StackIcon from "tech-stack-icons";

// ---------------------------------------------------------------------------
// Helpers & Data
// ---------------------------------------------------------------------------
const TechChip = ({ tag }) => (
  <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-[#1a1a1a] text-[#f0f0f0] text-lg md:text-xl whitespace-nowrap select-none">
    <span className="w-5 h-5 shrink-0 pointer-events-none">
      {tag.icon}
    </span>
    <span className="italic pointer-events-none">{tag.name}</span>
  </div>
);

const LucideIcon = ({ name }) => {
  switch (name) {
    case "react":
      return (
        <StackIcon
          name="react"
          className="w-4 h-4 sm:w-5 sm:h-5 grayscale-0 rounded-full bg-white"
        />
      );
    case "typescript":
      return <StackIcon name="typescript" className="w-4 h-4 sm:w-5 sm:h-5" />;
    case "js":
      return <StackIcon name="js" className="w-4 h-4 sm:w-5 sm:h-5" />;
    case "sass":
      return <StackIcon name="sass" className="w-4 h-4 sm:w-5 sm:h-5" />;
    case "socketio":
      return (
        <StackIcon
          name="socketio"
          className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full"
        />
      );
    case "docker":
      return <StackIcon name="docker" className="w-4 h-4 sm:w-5 sm:h-5" />;
    default:
      return (
        <StackIcon
          name="git"
          className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full"
        />
      );
  }
};

const SERVICES = [
  {
    id: "gmr_warora",
    title: "GMR Warora",
    role: "Frontend Lead Developer",
    tags: [
      { name: "React.js", icon: <LucideIcon name="react" /> },
      { name: "TypeScript", icon: <LucideIcon name="typescript" /> },
      { name: "JavaScript", icon: <LucideIcon name="js" /> },
      { name: "SCSS", icon: <LucideIcon name="sass" /> },
      { name: "WebSocket", icon: <Wifi size={14} /> },
      { name: "socket.io", icon: <LucideIcon name="socketio" /> },
      { name: "Axios", icon: <Globe size={14} /> },
      { name: "Protomaps", icon: <Map size={14} /> },
      { name: "Leaflet", icon: <MapPin size={14} /> },
      { name: "print-js", icon: <Printer size={14} /> },
      { name: "chart.js", icon: <BarChart3 size={14} /> },
      { name: "Docker", icon: <LucideIcon name="docker" /> },
      { name: "RBAC", icon: <Lock size={14} /> },
    ],
    desc: [
      "Led development of enterprise-scale real-time vehicle tracking system.",
      "Implemented multi-language support (EN/HIN/GUJ/MAR) without any third party packages.",
      "Integrated Offline interactive maps.",
      "Designed 4-level RBAC ( User > Role > Module > Action ) using custom React hooks.",
      "Built reusable component library (20+ modules) with lazy loading and code splitting.",
      "Integrated weighbridge, GRN workflows, Form 15, and audit logging for full traceability.",
    ],
    shape: "rounded-[80px_20px_100px_40px]",
    image: "GMR_LOGO_PLACEHOLDER",
  },
  {
    id: "mahindra",
    title: "Mahindra Logistics",
    role: "Frontend Developer",
    tags: [
      { name: "React.js", icon: <LucideIcon name="react" /> },
      { name: "TypeScript", icon: <LucideIcon name="typescript" /> },
      { name: "JavaScript", icon: <LucideIcon name="js" /> },
      { name: "SCSS", icon: <LucideIcon name="sass" /> },
      { name: "socket.io", icon: <LucideIcon name="socketio" /> },
      { name: "Axios", icon: <Globe size={14} /> },
      { name: "chart.js", icon: <BarChart3 size={14} /> },
      { name: "Docker", icon: <LucideIcon name="docker" /> },
    ],
    desc: [
      "Built real-time glove production monitoring with AI-powered defect detection.",
      "Enabled live updates, notifications, and file downloads with low-latency UX.",
    ],
    image: "MAHINDRA_LOGO_PLACEHOLDER",
  },
  {
    id: "dpl",
    title: "DPL Dashboard",
    role: "Frontend Developer",
    tags: [
      { name: "React.js", icon: <LucideIcon name="react" /> },
      { name: "TypeScript", icon: <LucideIcon name="typescript" /> },
      { name: "JavaScript", icon: <LucideIcon name="js" /> },
      { name: "SCSS", icon: <LucideIcon name="sass" /> },
      { name: "socket.io", icon: <LucideIcon name="socketio" /> },
      { name: "Axios", icon: <Globe size={14} /> },
      { name: "chart.js", icon: <BarChart3 size={14} /> },
      { name: "Docker", icon: <LucideIcon name="docker" /> },
    ],
    desc: [
      "Visualized AI box detection outputs with server-side pagination and reusable components.",
      "Implemented secure API flows and centralized async state management.",
    ],
    image: "DPL_LOGO_PLACEHOLDER",
  },
];

const ACCENT = "#ef4444";

// ---------------------------------------------------------------------------
// Unified GSAP Portal Modal (Mobile & Desktop)
// ---------------------------------------------------------------------------
const ProjectModal = ({ project, onClose }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const itemsRef = useRef([]);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Custom cursor tracking for desktop close button
    if (!window.gsap || window.innerWidth < 768) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position to bottom center of the view
    window.gsap.set(cursor, {
      x: window.innerWidth / 2,
      y: window.innerHeight - 120,
      xPercent: -50,
      yPercent: -50,
    });

    let xTo = window.gsap.quickTo(cursor, "x", {
      duration: 0.4,
      ease: "power3.out",
    });
    let yTo = window.gsap.quickTo(cursor, "y", {
      duration: 0.4,
      ease: "power3.out",
    });

    const onMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    // Prevent body scroll structurally during modal view
    document.body.style.overflow = "hidden";

    // Animate In safely if GSAP is loaded
    if (window.gsap) {
      const tl = window.gsap.timeline();

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power3.out",
      });

      tl.fromTo(
        contentRef.current,
        { scale: 0.95, y: 30, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: "power4.out" },
        "<0.1",
      );

      tl.fromTo(
        itemsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power3.out" },
        "<0.1",
      );
    } else {
      if (overlayRef.current) overlayRef.current.style.opacity = 1;
      if (contentRef.current) {
        contentRef.current.style.opacity = 1;
        contentRef.current.style.transform = "scale(1) translateY(0)";
      }
      itemsRef.current.forEach((item) => {
        if (item) {
          item.style.opacity = 1;
          item.style.transform = "translateY(0)";
        }
      });
    }

    const handleEsc = (e) => {
      if (e.key === "Escape") closeAnimation();
    };
    window.addEventListener("keydown", handleEsc);

    contentRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const closeAnimation = () => {
    if (!window.gsap) {
      onClose();
      return;
    }

    const tl = window.gsap.timeline({
      onComplete: onClose,
    });

    tl.to(contentRef.current, {
      scale: 1.05,
      opacity: 0,
      duration: 0.3,
      ease: "power4.in",
    });

    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.25,
        ease: "power3.in",
      },
      "<0.1",
    );
  };

  if (!project) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-9999 flex items-end sm:items-center justify-center sm:p-6 bg-zinc-950/40 opacity-0 md:cursor-none"
      style={{ backdropFilter: "blur(8px)" }}
      onClick={closeAnimation}
    >
      {/* Custom Cursor Close Button (Desktop Only) */}
      <div
        ref={cursorRef}
        className="hidden md:flex pointer-events-none fixed top-0 left-0 z-10000 w-24 h-24 bg-[#ef4444] rounded-full items-center justify-center text-white shadow-2xl will-change-transform scale-100"
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <X className="w-8 h-8 stroke-3" />
        </div>
      </div>

      {/* Grainy Texture overlay on backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      ></div>

      <div
        ref={contentRef}
        tabIndex="-1"
        className="relative w-full sm:max-w-2xl lg:max-w-[700px] bg-[#ffffff] rounded-t-[40px] sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[85vh] md:cursor-none focus:outline-none"
        onClick={(e) => {
          if (window.innerWidth < 768) {
            e.stopPropagation();
          }
        }}
        style={{ opacity: 0 }}
      >
        {/* Header container ensuring Close Button overlaps nothing */}
        <div className="w-full flex justify-end p-6 pb-0 shrink-0 md:hidden">
          <button
            onClick={closeAnimation}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-50 hover:bg-[#050505] border border-zinc-200 hover:border-[#050505] rounded-full flex items-center justify-center text-[#050505] hover:text-white transition-colors duration-300 shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content Section utilizing matching vertical stack layout */}
        <div className="px-8 pb-8 sm:px-12 sm:pb-12 pt-4 sm:pt-6 flex-1 overflow-y-auto custom-scrollbar">
          {/* Title */}
          <h3
            ref={(el) => (itemsRef.current[0] = el)}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tighter text-[#ef4444] leading-[0.85] mb-5"
            style={{ fontFamily: "'Inter', sans-serif", opacity: 0 }}
          >
            {project.title}
          </h3>

          {/* Badge (Role) */}
          <div
            ref={(el) => (itemsRef.current[1] = el)}
            className="inline-flex items-center px-4 py-2 mb-8 bg-zinc-100 text-[#050505] text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full shadow-sm"
            style={{ opacity: 0 }}
          >
            {project.role}
          </div>

          {/* Tech Chip Grid */}
          <div
            ref={(el) => (itemsRef.current[2] = el)}
            className="flex flex-wrap gap-2 sm:gap-3 mb-10"
            style={{ opacity: 0 }}
          >
            {project.tags.map((tag, idx) => (
              <TechChip key={idx} tag={tag} />
            ))}
          </div>

          {/* Bullet List */}
          <ul
            ref={(el) => (itemsRef.current[3] = el)}
            className="space-y-5 pl-5 list-outside border-t border-zinc-100 pt-8"
            style={{ opacity: 0 }}
          >
            {project.desc.map((d, idx) => (
              <li
                key={idx}
                className="text-sm sm:text-base text-[#050505] leading-relaxed relative flex items-start"
              >
                <span className="absolute -left-5 top-2 w-2 h-2 rounded-full bg-[#ef4444] shrink-0 shadow-sm"></span>
                <span className="font-medium">{d}</span>
              </li>
            ))}
          </ul>

          {/* Primary Buttons */}
          <div
            ref={(el) => (itemsRef.current[4] = el)}
            className="mt-12 flex justify-center w-full pb-4"
            style={{ opacity: 0 }}
          >
            {/* Unified Modal Close Button */}
            <button
              onClick={closeAnimation}
              className="inline-flex md:hidden items-center justify-center gap-2 px-8 py-3 sm:px-10 sm:py-3.5 text-[#050505] hover:text-white bg-white hover:bg-[#050505] border border-zinc-200 hover:border-[#050505] rounded-full font-black uppercase tracking-widest text-[10px] sm:text-xs transition-colors duration-300 focus:outline-none shadow-[0_8px_30px_-5px_rgba(0,0,0,0.15)]"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>CLOSE</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function ProjectShowcase() {
  const containerRef = useRef(null);
  const titleRefs = useRef([]);
  const rowRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [gsapLoaded, setGsapLoaded] = useState(false);

  // Dynamic GSAP Loader
  useEffect(() => {
    if (window.gsap) {
      setGsapLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script.async = true;
    script.onload = () => setGsapLoaded(true);
    document.body.appendChild(script);
    return () => { };
  }, []);

  // ─── Desktop Magnetic Title Pull ───
  useEffect(() => {
    if (!gsapLoaded || !window.gsap) return;

    const handleMouseMoveRow = (e, index) => {
      const title = titleRefs.current[index];
      const row = rowRefs.current[index];
      if (!title || !row || selectedProject) return; // Disable pull if modal is open

      const rect = title.getBoundingClientRect();
      const titleCenterX = rect.left + rect.width / 2;
      const titleCenterY = rect.top + rect.height / 2;

      const distanceX = e.clientX - titleCenterX;
      const distanceY = e.clientY - titleCenterY;

      const pullX = distanceX * 0.05;
      const pullY = distanceY * 0.1;

      window.gsap.to(title, {
        x: pullX,
        y: pullY,
        duration: 0.8,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const handleMouseLeaveRow = (index) => {
      const title = titleRefs.current[index];
      if (!title) return;
      window.gsap.to(title, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const listeners = [];

    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      const move = (e) => handleMouseMoveRow(e, i);
      const leave = () => handleMouseLeaveRow(i);
      row.addEventListener("mousemove", move);
      row.addEventListener("mouseleave", leave);
      listeners.push({ row, move, leave });
    });

    return () => {
      listeners.forEach(({ row, move, leave }) => {
        row.removeEventListener("mousemove", move);
        row.removeEventListener("mouseleave", leave);
      });
    };
  }, [gsapLoaded, SERVICES.length, selectedProject]);

  // Handlers
  const handleRowEnter = useCallback((i) => {
    setActiveIndex(i);
  }, []);

  const handleRowLeave = useCallback(() => {
    setActiveIndex(-1);
  }, []);

  const handleRowTap = useCallback((i) => {
    setActiveIndex(-1); // Clear active visual index so scrolling states pause cleanly
    setSelectedProject(SERVICES[i]); // Opens the unified modal
  }, []);

  return (
    <section
      ref={containerRef}
      className={`relative w-full py-16 md:py-28 px-4 md:px-8 lg:px-16 bg-[#ffffff]`}
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-10 md:mb-14">
        <div className="flex items-center justify-start border-b-2 border-zinc-100 pb-6">
          <h2
            className="italic text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#050505]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            W Projects Only
          </h2>
        </div>
      </div>

      {/* Project Rows */}
      <div
        className="max-w-7xl mx-auto relative z-10"
        onMouseLeave={handleRowLeave}
      >
        {SERVICES.map((project, i) => {
          const isActive = activeIndex === i && !selectedProject;
          const isDimmed = activeIndex >= 0 && !isActive && !selectedProject;

          return (
            <div
              key={project.id}
              ref={(el) => (rowRefs.current[i] = el)}
              className={`border-b border-zinc-200 transition-all duration-500 hover:border-zinc-300 cursor-pointer`}
              onMouseEnter={() => handleRowEnter(i)}
              onClick={() => handleRowTap(i)}
            >
              {/* Row Header */}
              <div
                className={`group flex items-center justify-between gap-4 md:gap-8 py-8 md:py-14 transition-all duration-500 ${isDimmed ? "opacity-30 grayscale" : "opacity-100"
                  } ${isActive ? "bg-zinc-50/80 -mx-4 px-4 rounded-[32px]" : ""}`}
              >
                {/* Title and Role Container */}
                <div className="flex flex-col gap-2 md:gap-3 flex-1 min-w-0 justify-center">
                  <h3
                    ref={(el) => (titleRefs.current[i] = el)}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter leading-none transition-colors duration-500 select-none truncate"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: isActive ? ACCENT : "#050505",
                    }}
                  >
                    {project.title}
                  </h3>
                  <span
                    className="text-xs md:text-sm font-bold uppercase tracking-widest transition-colors duration-500"
                    style={{
                      color: isActive ? "#050505" : ACCENT,
                    }}
                  >
                    {project.role}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Unified Detail Modal ── */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
