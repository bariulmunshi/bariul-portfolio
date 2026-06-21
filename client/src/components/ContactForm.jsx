import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import useScrollReveal from "../hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const ContactForm = () => {
    const form = useRef();
    const [status, setStatus] = useState("idle"); // idle | sending | sent | error
    const scopeRef = useScrollReveal();

    const sendEmail = async (e) => {
        e.preventDefault();
        setStatus("sending");

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setStatus("sent");
            form.current.reset();
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    const inputClass = `
        w-full rounded-xl p-4
        bg-paper-100/60 dark:bg-ink-800
        border border-ink-950/10 dark:border-paper-50/10
        text-ink-950 dark:text-paper-50
        placeholder:text-ink-600/50 dark:placeholder:text-paper-100/35
        outline-none transition-colors duration-200
        focus:border-signal-500
    `;

    return (
        <section
            ref={scopeRef}
            className="px-6 md:px-8 py-20 md:py-28 max-w-3xl mx-auto"
        >
            <SectionHeading
                eyebrow="08 · Contact"
                title="Send me a message"
                align="center"
            />

            <form
                ref={form}
                onSubmit={sendEmail}
                data-reveal
                className="space-y-5"
            >
                <input
                    type="text"
                    name="from_name"
                    placeholder="Your Name"
                    required
                    className={inputClass}
                />

                <input
                    type="email"
                    name="from_email"
                    placeholder="Your Email"
                    required
                    className={inputClass}
                />

                <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="6"
                    required
                    className={inputClass}
                />

                <button
                    type="submit"
                    disabled={status === "sending"}
                    className="
                        px-8 py-3.5 rounded-full
                        font-medium text-sm
                        bg-ink-950 text-paper-50 dark:bg-paper-50 dark:text-ink-950
                        transition-all duration-300
                        hover:shadow-[var(--shadow-glow-signal)] hover:-translate-y-0.5
                        disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                    "
                >
                    {status === "sending" ? "Sending…" : "Send Message"}
                </button>

                {status === "sent" && (
                    <p className="text-sm text-data-500 font-medium">
                        Message sent successfully. Thank you!
                    </p>
                )}
                {status === "error" && (
                    <p className="text-sm text-red-500 font-medium">
                        Something went wrong. Please try again or
                        email me directly.
                    </p>
                )}
            </form>
        </section>
    );
};

export default ContactForm;
