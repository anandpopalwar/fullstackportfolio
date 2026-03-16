import { Atom, Database } from 'lucide-react'

const CodeWindow = () => {
    return (
        <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg bg-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden shadow-2xl transform transition-transform hover:scale-105 hover:-rotate-1 duration-700 select-none cursor-default group">

            {/* Window Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80 group-hover:bg-red-500 transition-colors"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80 group-hover:bg-yellow-500 transition-colors"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80 group-hover:bg-green-500 transition-colors"></div>
                <span className="ml-2 mt-px text-[10px] md:text-xs font-mono text-white/40 tracking-wider">developer.js</span>
            </div>

            {/* Code Content */}
            <div className="p-4 md:p-6 lg:p-8 font-mono text-xs md:text-sm leading-loose overflow-x-auto text-left">
                <pre>
                    <code className="text-white/80">
                        <span className="text-purple-400 italic">const</span> <span className="text-blue-400">profile</span> = {"{"}<br />
                        &nbsp;&nbsp;<span className="text-slate-300">name</span>: <span className="text-green-400">'Anand Popalwar'</span>,<br />
                        &nbsp;&nbsp;<span className="text-slate-300">role</span>: <span className="text-green-400">'MERN Stack Dev'</span>,<br />
                        &nbsp;&nbsp;<span className="text-slate-300">skills</span>: [<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">'React'</span>, <span className="text-green-400">'Node.js'</span>,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">'MongoDB'</span>, <span className="text-green-400">'Express'</span><br />
                        &nbsp;&nbsp;],<br />
                        &nbsp;&nbsp;<span className="text-blue-400">execute</span>: <span className="text-purple-400 italic">async</span> () {"=>"} {"{"}<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400 italic">await</span> <span className="text-yellow-200">buildAwesomeStuff</span>();<br />
                        &nbsp;&nbsp;{"}"}<br />
                        {"};"}<br />
                        <br />
                        <span className="text-blue-400">profile</span>.<span className="text-yellow-200">execute</span>();
                    </code>
                </pre>
            </div>

            {/* Animated Floating Elements attached to the window */}
            <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 bg-black/40 backdrop-blur-lg border border-white/10 p-3 md:p-4 rounded-2xl shadow-xl animate-bounce-subtle">
                <Atom className="w-6 h-6 md:w-8 md:h-8 text-blue-400 animate-spin-slow" />
            </div>

            <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-black/40 backdrop-blur-lg border border-white/10 p-3 md:p-4 rounded-2xl shadow-xl animate-bounce-subtle" style={{ animationDelay: '1.2s' }}>
                <Database className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
            </div>
        </div>
    )
}

export default CodeWindow