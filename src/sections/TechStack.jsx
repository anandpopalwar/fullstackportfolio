import React, { useRef, useEffect, useCallback, useState } from "react";
import Matter from "matter-js";
import { skills } from "./Toolkit";

// Collision category for tag bodies only (walls/floor stay at default 0x0001)
const TAG_CATEGORY = 0x0002;

// ---------------------------------------------------------------------------
// Helper – measure a tag's rendered size before creating the physics body
// ---------------------------------------------------------------------------
function getTagDimensions(text) {
  const el = document.createElement("div");
  el.style.position = "absolute";
  el.style.visibility = "hidden";
  el.style.opacity = "1";
  el.style.fontSize = "1.2rem";
  el.style.padding = "0.5rem 1.2rem";
  el.style.whiteSpace = "nowrap";
  el.style.display = "flex";
  el.style.alignItems = "center";
  el.style.gap = "0.5rem";
  el.innerHTML = `<span style="width:20px;height:20px;display:inline-block;"></span><span>${text}</span>`;
  document.body.appendChild(el);
  const { offsetWidth: w, offsetHeight: h } = el;
  document.body.removeChild(el);
  return { w: w + 8, h: h + 4 };
}

// ---------------------------------------------------------------------------
// ServiceRow
// ---------------------------------------------------------------------------
function ServiceRow() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const dropZoneRef = useRef(null);

  const engineRef = useRef(null);
  const tagRefs = useRef([]);
  const tagBodiesRef = useRef([]);
  const rafIdRef = useRef(null);
  const hasPlayedRef = useRef(false);
  const mouseConstraintRef = useRef(null);
  const dragDelayTimerRef = useRef(null);

  const [showTags, setShowTags] = useState(false);

  // -----------------------------------------------------------------------
  // Cleanup
  // -----------------------------------------------------------------------
  const cleanup = useCallback(() => {
    if (dragDelayTimerRef.current) {
      clearTimeout(dragDelayTimerRef.current);
      dragDelayTimerRef.current = null;
    }
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (mouseConstraintRef.current && engineRef.current) {
      Matter.Composite.remove(engineRef.current.world, mouseConstraintRef.current);
      mouseConstraintRef.current = null;
    }
    tagBodiesRef.current = [];
    if (engineRef.current) {
      Matter.Composite.clear(engineRef.current.world, false);
      Matter.Engine.clear(engineRef.current);
      engineRef.current = null;
    }
  }, []);

  // -----------------------------------------------------------------------
  // Start physics
  // -----------------------------------------------------------------------
  const startPhysics = useCallback(() => {
    const zone = dropZoneRef.current;
    const title = titleRef.current;
    if (!zone || !title) return;

    const zoneW = zone.offsetWidth;
    const floorY = title.offsetTop + title.offsetHeight;

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 1.8 } });
    engineRef.current = engine;

    // Static boundaries — 2000px thick to prevent drag-tunneling
    Matter.Composite.add(engine.world, [
      // Floor: inner edge at floorY, extends 2000px downward
      Matter.Bodies.rectangle(zoneW / 2, floorY + 1000, zoneW + 200, 2000, {
        isStatic: true,
        collisionFilter: { category: 0x0001, mask: 0xFFFF },
      }),
      // Left wall: inner edge at x=0, extends 2000px leftward
      Matter.Bodies.rectangle(-1000, floorY / 2, 2000, floorY * 3, {
        isStatic: true,
        collisionFilter: { category: 0x0001, mask: 0xFFFF },
      }),
      // Right wall: inner edge at x=zoneW, extends 2000px rightward
      Matter.Bodies.rectangle(zoneW + 1000, floorY / 2, 2000, floorY * 3, {
        isStatic: true,
        collisionFilter: { category: 0x0001, mask: 0xFFFF },
      }),
    ]);

    // Create physics bodies for each skill with TAG_CATEGORY
    skills.forEach((skill, i) => {
      const { w, h } = getTagDimensions(skill.name);

      const body = Matter.Bodies.rectangle(
        Math.random() * (zoneW - w - 20) + w / 2 + 10,
        -(Math.random() * 60 + 30 + i * 30),
        w,
        h,
        {
          chamfer: { radius: h / 2 },
          restitution: 0.4,
          friction: 0.3,
          density: 0.002,
          angle: (Math.random() - 0.5) * 0.5,
          collisionFilter: {
            category: TAG_CATEGORY,
            mask: 0xFFFF, // collides with everything (walls + other tags)
          },
        }
      );
      Matter.Composite.add(engine.world, body);
      tagBodiesRef.current.push(body);
    });

    // rAF sync loop
    const tick = () => {
      Matter.Engine.update(engine, 1000 / 60);
      tagBodiesRef.current.forEach((body, i) => {
        const el = tagRefs.current[i];
        if (!el) return;
        const x = body.position.x - el.offsetWidth / 2;
        const y = body.position.y - el.offsetHeight / 2;
        el.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`;
      });
      rafIdRef.current = requestAnimationFrame(tick);
    };
    rafIdRef.current = requestAnimationFrame(tick);

    // ---------------------------------------------------------------
    // Delayed MouseConstraint — only activates AFTER tags have landed
    // ---------------------------------------------------------------
    const dropDuration = skills.length * 100 + 800;
    dragDelayTimerRef.current = setTimeout(() => {
      if (!engineRef.current || !dropZoneRef.current) return;

      const mouse = Matter.Mouse.create(dropZoneRef.current);
      mouse.pixelRatio = 1;

      // ------------------------------------------------------------------
      // Strip ALL of Matter.js's default event listeners — they call
      // preventDefault() unconditionally, which kills page scrolling.
      // ------------------------------------------------------------------
      const el = mouse.element;
      el.removeEventListener("mousewheel", mouse.mousewheel);
      el.removeEventListener("DOMMouseScroll", mouse.mousewheel);
      el.removeEventListener("mousedown", mouse.mousedown);
      el.removeEventListener("mousemove", mouse.mousemove);
      el.removeEventListener("mouseup", mouse.mouseup);
      el.removeEventListener("touchstart", mouse.mousedown);
      el.removeEventListener("touchmove", mouse.mousemove);
      el.removeEventListener("touchend", mouse.mouseup);

      // ------------------------------------------------------------------
      // Re-bind custom handlers: only preventDefault when grabbing a body
      // ------------------------------------------------------------------
      const getPoint = (e) => {
        const rect = el.getBoundingClientRect();
        const src = e.touches ? e.touches[0] : e;
        return { x: src.clientX - rect.left, y: src.clientY - rect.top };
      };

      const isOverBody = (pt) => {
        const bodies = Matter.Composite.allBodies(engineRef.current.world)
          .filter((b) => !b.isStatic);
        return Matter.Query.point(bodies, pt).length > 0;
      };

      // Track whether we started on a body (for touch sequences)
      let draggingBody = false;

      // Mouse events (desktop)
      el.addEventListener("mousedown", (e) => {
        const pt = getPoint(e);
        draggingBody = isOverBody(pt);
        mouse.mousedown(e);
      });
      el.addEventListener("mousemove", (e) => {
        mouse.mousemove(e);
      });
      el.addEventListener("mouseup", (e) => {
        mouse.mouseup(e);
        draggingBody = false;
      });

      // Touch events (mobile) — passive: false so we CAN preventDefault
      el.addEventListener("touchstart", (e) => {
        const pt = getPoint(e);
        draggingBody = isOverBody(pt);
        mouse.mousedown(e);
      }, { passive: true });

      el.addEventListener("touchmove", (e) => {
        mouse.mousemove(e);
        if (draggingBody && e.cancelable) {
          e.preventDefault(); // block scroll ONLY when dragging a tag
        }
      }, { passive: false });

      el.addEventListener("touchend", (e) => {
        mouse.mouseup(e);
        draggingBody = false;
      }, { passive: true });

      const mouseConstraint = Matter.MouseConstraint.create(engineRef.current, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          damping: 0.1,
          render: { visible: false },
        },
        collisionFilter: {
          mask: TAG_CATEGORY,
        },
      });

      Matter.Composite.add(engineRef.current.world, mouseConstraint);
      mouseConstraintRef.current = mouseConstraint;
    }, dropDuration);
  }, []);

  // -----------------------------------------------------------------------
  // IntersectionObserver — fire once
  // -----------------------------------------------------------------------
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasPlayedRef.current) {
          hasPlayedRef.current = true;
          observer.disconnect();
          setShowTags(true);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      cleanup();
    };
  }, [cleanup]);

  // Start physics after tags are rendered in DOM
  useEffect(() => {
    if (showTags) {
      requestAnimationFrame(() => {
        setTimeout(() => startPhysics(), 100);
      });
    }
  }, [showTags, startPhysics]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[25vh] md:min-h-[25vh] pt-10 md:pt-20 px-4 md:px-6 pb-4 md:pb-10 flex flex-col items-center overflow-visible font-sans"
    >
      {["MY", "SUPER", "POWERS"].map((name) => (
        <h1
          ref={titleRef}
          key={name}
          className="relative z-10 text-[7rem] md:text-[10rem] font-bold uppercase tracking-tighter leading-[0.85] text-red-600 px-4 select-none"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {name}
        </h1>
      ))}

      {/* Drop zone — pointer-events-auto so MouseConstraint can detect clicks */}
      <div
        ref={dropZoneRef}
        className="absolute top-0 left-0 w-full h-full z-15 pointer-events-auto"
        style={{ touchAction: "pan-y" }}
      >
        {showTags &&
          skills.map((skill, i) => (
            <div
              key={i}
              ref={(el) => (tagRefs.current[i] = el)}
              className="absolute top-0 left-0 flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-[#1a1a1a] text-[#f0f0f0] text-lg md:text-xl whitespace-nowrap opacity-0 animate-[fadeIn_0.3s_ease_forwards] will-change-transform cursor-grab active:cursor-grabbing select-none"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="w-5 h-5 shrink-0 pointer-events-none">{skill.icon}</span>
              <span className="italic pointer-events-none">{skill.name}</span>
            </div>
          ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main Export
// ---------------------------------------------------------------------------
export default function TechStack() {
  return <ServiceRow />;
}
