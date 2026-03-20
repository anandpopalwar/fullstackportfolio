import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';

export default function GeminiWidget({ isDarkMode }) {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const scrollEndRef = useRef(null);

  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      text: "Hey! I'm Anand's AI twin. Ready to see the technical raindrops? ✨",
    },
  ]);

  const callGemini = async (prompt) => {
    // In a real application, the API key should not be exposed.
    // Assuming the user handles server-side API calls. For demo, we mock it or fail gracefully.
    const apiKey = "";
    const systemPrompt = `Anand Popalwar: Fullstack Dev, 2+ yrs exp at Ease My Ai. Professional, funky. 97% load time boost.`;
    try {
      if (!apiKey) {
        return "Hey there! I am Anand's AI assistant. To make me fully interactive, please add a Gemini API key in my code!";
      }
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
          }),
        }
      );
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (err) {
      return "Hiccup! ✨ Something went wrong.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userMessage.trim() || isAiLoading) return;
    const history = [...chatHistory, { role: "user", text: userMessage }];
    setChatHistory(history);
    setUserMessage("");
    setIsAiLoading(true);
    const aiResponse = await callGemini(userMessage);
    setChatHistory([...history, { role: "assistant", text: aiResponse }]);
    setIsAiLoading(false);
  };

  useEffect(() => {
    if (isAiOpen) {
      scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isAiOpen]);

  return (
    <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-[2000]">
      {!isAiOpen ? (
        <button
          onClick={() => setIsAiOpen(true)}
          className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all"
        >
          <Sparkles className="w-5 h-5 md:w-7 md:h-7 animate-pulse" />
        </button>
      ) : (
        <div
          className={`w-[85vw] sm:w-[400px] h-[500px] md:h-[600px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col border shadow-2xl animate-in slide-in-from-bottom-10 ${isDarkMode ? "bg-[#080808] border-white/10 text-white" : "bg-white border-black/5 text-black"
            }`}
        >
          <div className="p-4 md:p-6 bg-blue-600 text-white flex justify-between items-center font-black text-[10px] md:text-xs tracking-widest">
            <div className="flex items-center gap-2 md:gap-3">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" /> ANAND AI ✨
            </div>
            <button
              onClick={() => setIsAiOpen(false)}
              className="bg-white/10 p-1.5 rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 text-[11px] md:text-xs font-medium">
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 md:p-4 rounded-2xl md:rounded-3xl ${msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : isDarkMode
                        ? "bg-white/5 border border-white/10 rounded-tl-none"
                        : "bg-black/5 rounded-tl-none"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isAiLoading && (
              <div className="flex items-center gap-2 md:gap-3 opacity-40 italic">
                <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />{" "}
                Thinking...
              </div>
            )}
            <div ref={scrollEndRef} />
          </div>
          <form
            onSubmit={handleSendMessage}
            className={`p-4 md:p-6 border-t flex gap-2 md:gap-3 ${isDarkMode ? "border-white/10 bg-white/5" : "border-black/5 bg-black/5"
              }`}
          >
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent border-none outline-none text-[11px] md:text-sm placeholder:opacity-30"
            />
            <button
              type="submit"
              className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg md:rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform"
            >
              <Send className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
