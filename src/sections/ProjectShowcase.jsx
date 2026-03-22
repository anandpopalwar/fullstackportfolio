import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
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
import ProjectModal from "../components/ui/ProjectModal";

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

const ACCENT = "#2563eb";

// ---------------------------------------------------------------------------
// Unified GSAP Portal Modal (Mobile & Desktop)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function ProjectShowcase() {
  const containerRef = useRef(null);
  const titleRefs = useRef([]);
  const rowRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedProject, setSelectedProject] = useState(null);

  // ─── Desktop Magnetic Title Pull ───
  useEffect(() => {
    if (!gsap) return;

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

      gsap.to(title, {
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
      gsap.to(title, {
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
  }, [selectedProject]);

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
      <div className="max-w-7xl mx-auto mb-4 md:mb-6">
        <div className="flex items-center justify-start border-b-2 border-zinc-100 pb-2">
          <h2
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter leading-none text-[#050505] underline underline-offset-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Projects
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
                className={`group flex items-center justify-between gap-4 md:gap-8 py-8 md:py-14 transition-all duration-500 ${
                  isDimmed ? "opacity-30 grayscale" : "opacity-100"
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
                    className="text-xs md:text-sm font-bold uppercase tracking-widest transition-colors duration-500 pl-2 md:pl-4"
                    style={{
                      color: isActive ? "#050505" : ACCENT,
                    }}
                  >
                    {project.role}
                    <span className="text-black">.</span>
                  </span>

                  {/* Description Highlights */}
                  <ul className="pl-2 md:pl-4 mt-2 space-y-1 md:space-y-1.5 transition-opacity duration-500">
                    {project.desc.slice(0, 2).map((point, idx) => (
                      <li
                        key={idx}
                        className="text-xs md:text-sm text-zinc-500 font-medium line-clamp-1 border-l-[3px] border-zinc-200 pl-3"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
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
