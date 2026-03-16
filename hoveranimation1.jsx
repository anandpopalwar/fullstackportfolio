import React, { useState, useRef, useEffect } from 'react';

/**
 * Note: We are using a script-injected version of GSAP to ensure 
 * compatibility in this preview environment.
 */

const Drops2 = () => {
    const [hoveredService, setHoveredService] = useState(null);
    const [gsapLoaded, setGsapLoaded] = useState(false);

    // Inject GSAP via CDN since local imports are failing
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
        script.async = true;
        script.onload = () => setGsapLoaded(true);
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const services = [
        {
            id: 'branding',
            title: 'BRANDING',
            tags: [
                'Logo Design',
                'Photo Direction',
                'Campaign',
                'Illustration',
                'Packaging',
                'Content',
                'Identity',
                'Naming'
            ],
            image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 'digital',
            title: 'DIGITAL',
            tags: [
                'Web Design',
                'UI/UX Design',
                'E-commerce',
                'App Dev',
                'Prototyping',
                'SEO Strategy'
            ],
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 'motion',
            title: 'MOTION',
            tags: [
                '2D Animation',
                '3D Modeling',
                'Explainer',
                'Social Media',
                'VFX',
                'Sound'
            ],
            image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800'
        }
    ];

    if (!gsapLoaded) {
        return (
            <div className="min-h-screen bg-[#110e0e] flex items-center justify-center">
                <div className="text-red-600 animate-pulse text-xl font-serif italic">Loading Animation Engine...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#110e0e] text-white flex flex-col items-center justify-center font-sans overflow-hidden selection:bg-red-600 px-4">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-5xl font-serif italic mb-1 text-[#f3f3f3]">We know what</h2>
                <h1 className="text-4xl md:text-7xl font-bold text-[#f3f3f3] uppercase tracking-tighter">we're good at!</h1>
            </div>

            {/* Services List */}
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

            {/* Footer CTA */}
            <div className="mt-12 md:mt-16">
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full text-base md:text-lg font-bold transition-transform active:scale-95">
                    Let's Talk
                </button>
            </div>
        </div>
    );
};

const ServiceItem = ({ service, isAnyHovered, isThisHovered, onHover, onLeave }) => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const revealRef = useRef(null);
    const tagsRef = useRef([]);
    const imageRef = useRef(null);
    const learnMoreRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const gsap = window.gsap;
        if (!gsap) return;

        if (isThisHovered) {
            // HOVER ON ANIMATION
            const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 0.7 } });

            gsap.set(revealRef.current, { opacity: 1, visibility: 'visible' });

            const imgScale = isMobile ? 0.75 : 1;
            const radiusMult = isMobile ? 0.65 : 1.1;

            tl.fromTo(imageRef.current,
                { y: -30, opacity: 0, scale: 0.6 * imgScale, rotate: -5 },
                { y: 0, opacity: 1, scale: imgScale, rotate: 0 }
            );

            const totalTags = service.tags.length;
            tagsRef.current.forEach((tag, i) => {
                if (!tag) return;

                const angle = (i / totalTags) * Math.PI * 2;
                const radiusX = (160 + Math.random() * 80) * radiusMult;
                const radiusY = (100 + Math.random() * 60) * radiusMult;

                const x = Math.cos(angle) * radiusX;
                const y = Math.sin(angle) * radiusY;
                const rotate = (Math.random() - 0.5) * 40;

                tl.fromTo(tag,
                    { x: 0, y: 0, opacity: 0, scale: 0.2 },
                    { x, y, opacity: 1, scale: 1, rotation: rotate, duration: 0.6 },
                    "-=0.5"
                );
            });

            tl.fromTo(learnMoreRef.current,
                { y: 15, opacity: 0 },
                { y: 0, opacity: 1 },
                "-=0.4"
            );

            gsap.to(titleRef.current, { color: '#ef4444', opacity: 1, scale: 1.05, duration: 0.4 });
        } else {
            // HOVER OFF ANIMATION
            const tlOut = gsap.timeline({
                defaults: { ease: "power4.in", duration: 0.4 },
                onComplete: () => {
                    gsap.set(revealRef.current, { visibility: 'hidden' });
                }
            });

            // Animate tags back to center
            tagsRef.current.forEach((tag) => {
                if (!tag) return;
                tlOut.to(tag, {
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0.2,
                    rotation: 0
                }, 0); // "0" starts all animations at once
            });

            // Animate image back
            tlOut.to(imageRef.current, {
                y: -30,
                opacity: 0,
                scale: 0.6,
                rotate: -5
            }, 0);

            // Fade out Learn More
            tlOut.to(learnMoreRef.current, { opacity: 0, y: 10 }, 0);

            // Fade out the whole container slightly later
            tlOut.to(revealRef.current, { opacity: 0, duration: 0.2 }, "-=0.2");

            // Reset Title
            gsap.to(titleRef.current, {
                color: isAnyHovered ? '#222' : '#ef4444',
                opacity: isAnyHovered ? 0.3 : 1,
                scale: 1,
                duration: 0.3
            });
        }
    }, [isThisHovered, isAnyHovered, service.tags.length, isMobile]);

    const handleClick = () => {
        if (isMobile) {
            if (isThisHovered) onLeave();
            else onHover();
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full py-4 md:py-10 cursor-pointer flex flex-col items-center justify-center transition-all"
            onMouseEnter={!isMobile ? onHover : undefined}
            onMouseLeave={!isMobile ? onLeave : undefined}
            onClick={handleClick}
        >
            <div
                ref={revealRef}
                className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center invisible"
            >
                <div
                    ref={imageRef}
                    className="w-48 h-32 md:w-80 md:h-48 rounded-lg md:rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-[#1a1a1a]"
                >
                    <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x250?text=Service'; }}
                    />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    {service.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            ref={el => tagsRef.current[idx] = el}
                            className="absolute bg-white text-black px-2 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-sm font-bold tracking-tight whitespace-nowrap shadow-xl border border-gray-100 uppercase"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <h2
                ref={titleRef}
                className="text-[12vw] md:text-9xl font-black tracking-tighter select-none z-10 leading-none transition-all duration-300"
            >
                {service.title}
            </h2>

            <div
                ref={learnMoreRef}
                className="mt-2 md:mt-4 z-30 opacity-0 pointer-events-none"
            >
                <span className="text-white border-b border-white pb-0.5 text-[10px] md:text-sm font-bold uppercase tracking-widest italic">
                    Explore Service
                </span>
            </div>
        </div>
    );
};

export default Drops2;