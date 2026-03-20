import React from 'react'
import DraggableSvg from '../components/DraggableSvg'
import { Moon, Sun } from 'lucide-react'

const Navbar = ({ isDarkMode, setIsDarkMode, containerRef }) => {
    return (
        <nav className="fixed top-0 w-full z-[1000] p-2 md:p-4">
            <div
                className={`max-w-7xl mx-auto flex justify-between items-center backdrop-blur-2xl border p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] transition-all ${isDarkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-black/5 border-black/10"
                    }`}
            >
                <div className="text-lg md:text-2xl font-black italic tracking-tighter flex items-center gap-2">
                    <DraggableSvg isDarkMode={isDarkMode} containerRef={containerRef} />
                    <span>
                        ANAND<span className="text-blue-500">.</span>POPALWAR
                    </span>
                </div>
                <div className="flex gap-3 md:gap-4 items-center uppercase text-[9px] md:text-[10px] font-black tracking-[0.2em]">
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="p-2 md:p-2.5 rounded-full border transition-all hover:scale-110"
                    >
                        {isDarkMode ? (
                            <Sun className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-400" />
                        ) : (
                            <Moon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
                        )}
                    </button>
                    <div className="hidden sm:flex gap-6 md:gap-8">
                        <a
                            href="#drops"
                            className="hover:text-blue-400 transition-colors"
                        >
                            Drops
                        </a>
                    </div>
                    <a
                        href="#contact"
                        className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[9px] md:text-[10px] font-black tracking-widest transition-all hover:scale-105 ${isDarkMode
                            ? "bg-white text-black hover:bg-yellow-400"
                            : "bg-black text-white hover:bg-blue-600"
                            }`}
                    >
                        Connect
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar