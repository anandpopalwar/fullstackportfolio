import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Project Data
// ---------------------------------------------------------------------------
const PROJECTS = [
  {
    id: 1,
    title: "Aether Dynamics",
    category: "Aerospace",
    year: "2024",
    description:
      "Next-gen propulsion systems engineered for deep-space transit with real-time telemetry dashboards.",
  },
  {
    id: 2,
    title: "Veridian Labs",
    category: "Biotech",
    year: "2024",
    description:
      "CRISPR visualization suite with genomic data pipelines and interactive sequence editors.",
  },
  {
    id: 3,
    title: "Obsidian Finance",
    category: "Fintech",
    year: "2023",
    description:
      "Algorithmic trading platform with sub-millisecond order execution and live P&L analytics.",
  },
  {
    id: 4,
    title: "Nova Terraforms",
    category: "Climate Tech",
    year: "2023",
    description:
      "Carbon capture monitoring with satellite imagery overlays and environmental impact scoring.",
  },
  {
    id: 5,
    title: "Phantom Audio",
    category: "Creative Tech",
    year: "2022",
    description:
      "Spatial audio engine with WebGL waveform visualizations and real-time DSP processing.",
  },
];

const ACCENT = "#ef4444";

// ---------------------------------------------------------------------------
// ProjectShowcase
// ---------------------------------------------------------------------------
export default function ProjectShowcase() {
  const containerRef = useRef(null);
  const revealRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(-1);

  // -------------------------------------------------------------------------
  // Touch detection + resize listener
  // -------------------------------------------------------------------------
  useEffect(() => {
    const check = () => {
      setIsTouchDevice(
        window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // -------------------------------------------------------------------------
  // GSAP cursor-following (desktop only)
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (isTouchDevice) return;

    const reveal = revealRef.current;
    const container = containerRef.current;
    if (!reveal || !container) return;

    const xSet = gsap.quickSetter(reveal, "x", "px");
    const ySet = gsap.quickSetter(reveal, "y", "px");

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      xSet(e.clientX - rect.left - 140);
      ySet(e.clientY - rect.top - 140);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [isTouchDevice]);

  // -------------------------------------------------------------------------
  // Reveal box animation (desktop only)
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (isTouchDevice) return;

    const reveal = revealRef.current;
    if (!reveal) return;

    if (activeIndex >= 0) {
      gsap.to(reveal, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        overwrite: true,
      });
    } else {
      gsap.to(reveal, {
        scale: 0.5,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        overwrite: true,
      });
    }
  }, [activeIndex, isTouchDevice]);

  const handleRowEnter = useCallback(
    (i) => {
      if (!isTouchDevice) setActiveIndex(i);
    },
    [isTouchDevice]
  );

  const handleRowLeave = useCallback(() => {
    if (!isTouchDevice) setActiveIndex(-1);
  }, [isTouchDevice]);

  const handleRowTap = useCallback(
    (i) => {
      if (isTouchDevice) {
        setExpandedMobile((prev) => (prev === i ? -1 : i));
      }
    },
    [isTouchDevice]
  );

  return (
    <section
      ref={containerRef}
      className={`relative w-full py-16 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden bg-white ${
        !isTouchDevice ? "cursor-none" : ""
      }`}
      onMouseLeave={handleRowLeave}
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-10 md:mb-14">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
            Projects
          </span>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
            {PROJECTS.length} Works
          </span>
        </div>
      </div>

      {/* Project Rows */}
      <div className="max-w-7xl mx-auto">
        {PROJECTS.map((project, i) => {
          const isActive = !isTouchDevice && activeIndex === i;
          const isDimmed = !isTouchDevice && activeIndex >= 0 && !isActive;
          const isMobileExpanded = isTouchDevice && expandedMobile === i;

          return (
            <div
              key={project.id}
              className="border-b border-zinc-100 transition-all duration-500"
              onMouseEnter={() => handleRowEnter(i)}
              onClick={() => handleRowTap(i)}
            >
              {/* Row */}
              <div
                className={`flex items-center gap-3 md:gap-8 py-5 md:py-10 transition-all duration-500 ${
                  isDimmed ? "opacity-20" : "opacity-100"
                }`}
              >
                {/* Index */}
                <span
                  className="text-xs md:text-sm font-mono tabular-nums w-8 shrink-0 transition-colors duration-300"
                  style={{
                    color: isActive || isMobileExpanded ? ACCENT : "#a1a1aa",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title */}
                <h3
                  className="flex-1 text-[2rem] sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none transition-all duration-500 select-none"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    color:
                      isActive || isMobileExpanded ? ACCENT : "#09090b",
                    transform:
                      isActive
                        ? "translateX(16px)"
                        : "translateX(0px)",
                  }}
                >
                  {project.title}
                </h3>

                {/* Category + Year (desktop) */}
                <div className="hidden md:flex flex-col items-end gap-1 shrink-0">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-300">
                    {project.year}
                  </span>
                </div>

                {/* Arrow */}
                <div
                  className="w-9 h-9 md:w-12 md:h-12 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500"
                  style={{
                    borderColor:
                      isActive || isMobileExpanded
                        ? ACCENT
                        : "#e4e4e7",
                    background:
                      isActive || isMobileExpanded
                        ? `${ACCENT}10`
                        : "transparent",
                  }}
                >
                  <ArrowUpRight
                    className="w-4 h-4 md:w-5 md:h-5 transition-all duration-500"
                    style={{
                      color:
                        isActive || isMobileExpanded
                          ? ACCENT
                          : "#a1a1aa",
                      transform:
                        isActive || isMobileExpanded
                          ? "rotate(0deg)"
                          : "rotate(-45deg)",
                    }}
                  />
                </div>
              </div>

              {/* Mobile Expanded Drawer */}
              {isTouchDevice && (
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isMobileExpanded ? "200px" : "0px",
                    opacity: isMobileExpanded ? 1 : 0,
                  }}
                >
                  <div className="pb-6 pl-11 pr-4 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      <span className="font-bold uppercase tracking-widest">
                        {project.category}
                      </span>
                      <span className="font-mono">{project.year}</span>
                    </div>
                    <p className="text-sm text-zinc-600 leading-relaxed max-w-lg">
                      {project.description}
                    </p>
                    <button
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest py-2 transition-colors"
                      style={{ color: ACCENT }}
                    >
                      View Case Study
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Desktop Cursor-Following Reveal Box ── */}
      {!isTouchDevice && (
        <div
          ref={revealRef}
          className="pointer-events-none absolute top-0 left-0 z-50"
          style={{
            width: 280,
            height: 280,
            opacity: 0,
            scale: 0.5,
            willChange: "transform",
          }}
        >
          <div
            className="relative w-full h-full rounded-3xl border border-zinc-200 overflow-hidden flex flex-col justify-end p-6"
            style={{
              background: `radial-gradient(circle at 30% 20%, ${ACCENT}18, transparent 60%), rgba(255,255,255,0.92)`,
              backdropFilter: "blur(20px)",
              boxShadow: `0 20px 60px -15px ${ACCENT}20, 0 0 0 1px rgba(0,0,0,0.04)`,
            }}
          >
            {/* Inner glow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-20"
              style={{
                boxShadow: `inset 0 0 60px ${ACCENT}25`,
              }}
            />

            {/* Content */}
            {activeIndex >= 0 && (
              <div className="relative z-10 space-y-3">
                <p className="text-zinc-600 text-xs md:text-sm leading-relaxed line-clamp-4">
                  {PROJECTS[activeIndex].description}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-black uppercase tracking-widest"
                    style={{ color: ACCENT }}
                  >
                    View Case Study
                  </span>
                  <ArrowUpRight
                    className="w-3 h-3"
                    style={{ color: ACCENT }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
