import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { sendChatMessage } from "../services/chatService";

const SUGGESTED_QUESTIONS = [
    "What does Bariul do?",
    "What are his research interests?",
    "What's his tech stack?",
    "How can I contact him?",
];

const AIChatWidget = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "Hi! I'm Bariul's AI assistant. Ask me anything about his work, research, or experience.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const panelRef = useRef(null);
    const scrollRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        if (open && panelRef.current) {
            gsap.fromTo(
                panelRef.current,
                { opacity: 0, y: 16, scale: 0.97 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                }
            );
        }
    }, [open]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages, loading]);

    const handleSend = async (overrideText) => {
        const text = (overrideText ?? input).trim();
        if (!text || loading) return;

        const nextMessages = [...messages, { role: "user", content: text }];
        setMessages(nextMessages);
        setInput("");
        setError("");
        setLoading(true);

        try {
            const history = nextMessages
                .filter((m) => m.role === "user" || m.role === "assistant")
                .slice(0, -1); // exclude the message we just added; sent separately
            const reply = await sendChatMessage(text, history);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: reply },
            ]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating toggle button */}
            <button
                ref={buttonRef}
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close AI assistant" : "Open AI assistant"}
                className="
                    fixed bottom-6 right-6 z-[60]
                    w-14 h-14 rounded-full
                    bg-ink-950 dark:bg-paper-50
                    text-paper-50 dark:text-ink-950
                    shadow-xl
                    flex items-center justify-center
                    transition-transform duration-300
                    hover:scale-105
                    active:scale-95
                "
            >
                {open ? (
                    <span className="text-xl">✕</span>
                ) : (
                    <span className="relative flex items-center justify-center">
                        <span className="text-lg">💬</span>
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-signal-500 animate-pulse" />
                    </span>
                )}
            </button>

            {/* Chat panel */}
            {open && (
                <div
                    ref={panelRef}
                    className="
                        fixed bottom-24 right-6 z-[60]
                        w-[92vw] max-w-sm
                        h-[70vh] max-h-[560px]
                        rounded-2xl
                        bg-paper-50 dark:bg-ink-900
                        border border-ink-950/10 dark:border-paper-50/10
                        shadow-2xl
                        flex flex-col
                        overflow-hidden
                    "
                >
                    {/* Header */}
                    <div
                        className="
                            px-5 py-4
                            border-b border-ink-950/10 dark:border-paper-50/10
                            flex items-center gap-3
                            bg-ink-950 dark:bg-ink-950
                        "
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-signal-500 animate-pulse" />
                        <div>
                            <p className="text-paper-50 text-sm font-medium font-[var(--font-display)]">
                                Ask about Bariul
                            </p>
                            <p className="text-paper-100/50 text-xs font-mono-tag">
                                AI assistant · powered by Claude
                            </p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
                    >
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`flex ${
                                    m.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`
                                        max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-6
                                        ${
                                            m.role === "user"
                                                ? "bg-ink-950 text-paper-50 dark:bg-paper-50 dark:text-ink-950 rounded-br-sm"
                                                : "bg-ink-950/5 dark:bg-paper-50/10 text-ink-800 dark:text-paper-100/90 rounded-bl-sm"
                                        }
                                    `}
                                >
                                    {m.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-ink-950/5 dark:bg-paper-50/10 flex gap-1.5">
                                    {[0, 1, 2].map((d) => (
                                        <span
                                            key={d}
                                            className="w-1.5 h-1.5 rounded-full bg-ink-600 dark:bg-paper-100/50 animate-bounce"
                                            style={{
                                                animationDelay: `${d * 0.12}s`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {error && (
                            <p className="text-xs text-center text-red-500 px-2">
                                {error}
                            </p>
                        )}

                        {messages.length === 1 && !loading && (
                            <div className="pt-2 flex flex-wrap gap-2">
                                {SUGGESTED_QUESTIONS.map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => handleSend(q)}
                                        className="
                                            text-xs px-3 py-1.5 rounded-full
                                            border border-ink-950/15 dark:border-paper-50/20
                                            text-ink-700 dark:text-paper-100/75
                                            hover:border-signal-500 hover:text-signal-600
                                            dark:hover:text-signal-400
                                            transition-colors
                                        "
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="border-t border-ink-950/10 dark:border-paper-50/10 p-3 flex items-end gap-2">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask a question..."
                            rows={1}
                            className="
                                flex-1 resize-none
                                bg-ink-950/5 dark:bg-paper-50/10
                                rounded-xl px-3.5 py-2.5
                                text-sm text-ink-950 dark:text-paper-50
                                placeholder:text-ink-600/50 dark:placeholder:text-paper-100/40
                                focus:outline-none focus:ring-1 focus:ring-signal-500
                                max-h-24
                            "
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={loading || !input.trim()}
                            aria-label="Send message"
                            className="
                                w-10 h-10 shrink-0 rounded-xl
                                bg-ink-950 dark:bg-paper-50
                                text-paper-50 dark:text-ink-950
                                flex items-center justify-center
                                disabled:opacity-40
                                transition-opacity
                            "
                        >
                            →
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChatWidget;
