import React, { useState, useRef, useEffect } from "react";

/**
 * Note: We are using a script-injected version of GSAP to ensure
 * compatibility in this preview environment.
 */

const Drops3 = () => {
  const [hoveredService, setHoveredService] = useState(null);
  const [gsapLoaded, setGsapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script.async = true;
    script.onload = () => setGsapLoaded(true);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const services = [
    {
      id: "branding",
      title: "BRANDING",
      tags: [
        "Logo Design",
        "Photo Direction",
        "Campaign",
        "Illustration",
        "Packaging",
        "Content",
        "Identity",
        "Naming",
      ],
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "digital",
      title: "DIGITAL",
      tags: [
        "Web Design",
        "UI/UX Design",
        "E-commerce",
        "App Dev",
        "Prototyping",
        "SEO Strategy",
        "Analytics",
      ],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "motion",
      title: "MOTION",
      tags: [
        "2D Animation",
        "3D Modeling",
        "Explainer",
        "Social Media",
        "VFX",
        "Sound",
        "Editing",
      ],
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    },
  ];

  if (!gsapLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 animate-pulse text-xl font-serif italic">
          Loading Physics Engine...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center font-sans overflow-hidden selection:bg-blue-600 px-4">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-5xl font-serif italic mb-1 text-[#f3f3f3]">
          We know what
        </h2>
        <h1 className="text-4xl md:text-7xl font-bold text-[#f3f3f3] uppercase tracking-tighter">
          we're good at!
        </h1>
      </div>

      <div className="flex flex-col items-center w-full max-w-4xl">
        {services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            isAnyHovered={hoveredService !== null}
            isThisHovered={hoveredService === service.id}
            onHover={() => setHoveredService(service.id)}
            onLeave={() => setHoveredService(null)}
          />
        ))}
      </div>

      <div className="mt-12 md:mt-16">
        <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
          Let's Talk
        </button>
      </div>
    </div>
  );
};

const ServiceItem = ({
  service,
  isAnyHovered,
  isThisHovered,
  onHover,
  onLeave,
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const revealRef = useRef(null);
  const imageRef = useRef(null);
  const learnMoreRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    let ctx = gsap.context(() => {
      if (isThisHovered) {
        const tl = gsap.timeline();

        gsap.set(revealRef.current, { opacity: 1, visibility: "visible" });

        // Image falls with a heavy thud
        tl.fromTo(
          imageRef.current,
          { y: -300, opacity: 0, scale: 0.5, rotate: -15 },
          {
            y: 0,
            opacity: 1,
            scale: isMobile ? 0.75 : 1,
            rotate: 0,
            duration: 0.5,
            ease: "bounce.out",
          },
        );

        // Tags drop from high up, clustered in center, then splash out
        tl.fromTo(
          ".tag-item",
          {
            y: -500,
            x: () => (Math.random() - 0.5) * 100, // Start clustered
            opacity: 0,
            scale: 0.3,
            rotation: () => (Math.random() - 0.5) * 90,
          },
          {
            y: 0,
            x: 0, // Settle into natural flex position
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            stagger: {
              each: 0.03,
              from: "random",
            },
            ease: "bounce.out", // Physics-style rebound
          },
          "-=0.3",
        );

        tl.fromTo(
          learnMoreRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" },
          "-=0.4",
        );

        gsap.to(titleRef.current, {
          color: "#ef4444",
          scale: 1.02,
          duration: 0.3,
        });
      } else {
        const tlOut = gsap.timeline({
          onComplete: () =>
            gsap.set(revealRef.current, { visibility: "hidden" }),
        });

        // "Explode" away when leaving
        tlOut.to(
          ".tag-item",
          {
            y: 100,
            x: () => (Math.random() - 0.5) * 200,
            opacity: 0,
            scale: 0.5,
            duration: 0.3,
            stagger: 0.01,
          },
          0,
        );

        tlOut.to(
          imageRef.current,
          { y: 150, opacity: 0, scale: 0.5, duration: 0.3 },
          0,
        );
        tlOut.to(revealRef.current, { opacity: 0, duration: 0.2 }, 0.2);

        gsap.to(titleRef.current, {
          color: isAnyHovered ? "#1a1a1a" : "#ef4444",
          opacity: isAnyHovered ? 0.2 : 1,
          scale: 1,
          duration: 0.2,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isThisHovered, isAnyHovered, isMobile]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-4 md:py-10 cursor-pointer flex flex-col items-center justify-center group"
      onMouseEnter={() => !isMobile && onHover()}
      onMouseLeave={() => !isMobile && onLeave()}
      onClick={() => isMobile && (isThisHovered ? onLeave() : onHover())}
    >
      <div
        ref={revealRef}
        className="absolute inset-0 pointer-events-none z-20 flex flex-col items-center justify-center invisible overflow-visible"
      >
        <div
          ref={imageRef}
          className="w-48 h-32 md:w-80 md:h-48 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10  mb-8"
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-[95vw] md:max-w-3xl px-6">
          {service.tags.map((tag, idx) => (
            <span
              key={idx}
              className="tag-item bg-white text-black px-4 py-2 rounded-lg text-[10px] md:text-sm font-black shadow-[0_10px_20px_rgba(0,0,0,0.3)] border-b-4 border-gray-300 uppercase tracking-tight"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <h2
        ref={titleRef}
        className="text-[14vw] md:text-[10rem] font-black tracking-[ -0.05em] select-none z-10 leading-[0.85] transition-all duration-300"
      >
        {service.title}
      </h2>

      <div
        ref={learnMoreRef}
        className="mt-8 z-30 opacity-0 pointer-events-none"
      >
        <span className="bg-white text-black px-4 py-1 rounded text-[10px] md:text-xs font-bold uppercase tracking-widest">
          View Projects
        </span>
      </div>
    </div>
  );
};

export default Drops3;
