import Anthropic from "@anthropic-ai/sdk";
import bariulProfile from "../data/bariulProfile.js";

// The SDK reads ANTHROPIC_API_KEY from process.env automatically,
// but we pass it explicitly so a missing key fails clearly at call time
// instead of silently inside the SDK.
const getClient = () => {
    if (!process.env.ANTHROPIC_API_KEY) {
        return null;
    }
    return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
};

// Very small in-memory rate limiter: max N requests per IP per window.
// Resets on server restart — fine for a portfolio site's traffic level.
const RATE_LIMIT = 20; // requests
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const hits = new Map(); // ip -> [timestamps]

const isRateLimited = (ip) => {
    const now = Date.now();
    const timestamps = (hits.get(ip) || []).filter(
        (t) => now - t < RATE_WINDOW_MS
    );
    timestamps.push(now);
    hits.set(ip, timestamps);
    return timestamps.length > RATE_LIMIT;
};

const MAX_MESSAGE_LENGTH = 800;
const MAX_HISTORY_MESSAGES = 12;

export const chatWithAssistant = async (req, res) => {
    try {
        const ip =
            req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
            req.socket.remoteAddress ||
            "unknown";

        if (isRateLimited(ip)) {
            return res.status(429).json({
                success: false,
                message:
                    "Too many messages right now — please wait a few minutes and try again.",
            });
        }

        const { message, history } = req.body;

        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required.",
            });
        }

        if (message.length > MAX_MESSAGE_LENGTH) {
            return res.status(400).json({
                success: false,
                message: `Please keep messages under ${MAX_MESSAGE_LENGTH} characters.`,
            });
        }

        const client = getClient();
        if (!client) {
            // Key not configured yet — fail clearly instead of crashing,
            // so the frontend can show a friendly fallback.
            return res.status(503).json({
                success: false,
                message:
                    "The AI assistant isn't configured yet. Please try the contact form instead.",
            });
        }

        // Build a bounded conversation history (avoid unbounded token growth)
        const safeHistory = Array.isArray(history)
            ? history
                  .slice(-MAX_HISTORY_MESSAGES)
                  .filter(
                      (m) =>
                          m &&
                          (m.role === "user" || m.role === "assistant") &&
                          typeof m.content === "string"
                  )
                  .map((m) => ({
                      role: m.role,
                      content: m.content.slice(0, MAX_MESSAGE_LENGTH),
                  }))
            : [];

        const response = await client.messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 500,
            system: bariulProfile,
            messages: [...safeHistory, { role: "user", content: message }],
        });

        const textBlock = response.content.find((b) => b.type === "text");

        return res.status(200).json({
            success: true,
            reply: textBlock ? textBlock.text : "",
        });
    } catch (error) {
        console.error("Chat assistant error:", error.message);
        return res.status(500).json({
            success: false,
            message:
                "Something went wrong reaching the assistant. Please try again shortly.",
        });
    }
};
