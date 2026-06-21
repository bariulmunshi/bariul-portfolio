import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import NeuralBackground from "./NeuralBackground";

const Hero = () => {
    const rootRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                onComplete: () => {
                    // Clear inline styles GSAP added so layout stays
                    // controlled by CSS after the entrance plays once.
                    gsap.set(
                        ".hero-eyebrow, .hero-line, .hero-sub, .hero-cta, .hero-portrait",
                        { clearProps: "all" }
                    );
                },
            });

            tl.from(".hero-eyebrow", {
                opacity: 0,
                y: 12,
                duration: 0.6,
            })
                .from(
                    ".hero-line",
                    {
                        opacity: 0,
                        y: 28,
                        duration: 0.8,
                        stagger: 0.08,
                    },
                    "-=0.3"
                )
                .from(
                    ".hero-sub",
                    { opacity: 0, y: 16, duration: 0.6 },
                    "-=0.4"
                )
                .from(
                    ".hero-cta",
                    {
                        opacity: 0,
                        y: 16,
                        duration: 0.5,
                        stagger: 0.08,
                    },
                    "-=0.35"
                )
                .from(
                    ".hero-portrait",
                    {
                        opacity: 0,
                        scale: 0.92,
                        duration: 0.9,
                        ease: "power2.out",
                    },
                    "-=0.7"
                );
        }, rootRef);

        return () => {
            // On StrictMode's double-invoke unmount, jump to the end
            // instead of mid-flight revert so nothing is left at
            // opacity: 0 if this effect doesn't get to remount.
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={rootRef}
            className="
                relative overflow-hidden
                min-h-[92vh]
                flex items-center
                px-6 md:px-8 py-20
                border-b border-ink-900/10 dark:border-paper-50/10
            "
        >
            {/* Signature background */}
            <NeuralBackground density={55} />

            {/* Soft radial vignette so text stays legible over the canvas */}
            <div
                className="
                    pointer-events-none absolute inset-0
                    bg-[radial-gradient(ellipse_80%_60%_at_30%_20%,rgba(250,248,243,0.55),transparent_60%)]
                    dark:bg-[radial-gradient(ellipse_80%_60%_at_30%_20%,rgba(11,13,16,0.65),transparent_60%)]
                "
            />

            <div
                className="
                    relative z-10
                    max-w-6xl mx-auto w-full
                    grid md:grid-cols-[1.15fr_0.85fr]
                    gap-12 md:gap-16
                    items-center
                "
            >
                {/* Left Content */}
                <div>
                    <p
                        className="
                            hero-eyebrow
                            font-mono-tag text-xs md:text-sm
                            text-signal-600 dark:text-signal-400
                            mb-5
                            flex items-center gap-2
                        "
                    >
                        <span className="inline-block w-2 h-2 rounded-full bg-signal-500 animate-pulse" />
                        teach() · research() · build()
                    </p>

                    <h1
                        className="
                            font-[var(--font-display)]
                            text-[2.6rem] sm:text-6xl md:text-7xl
                            font-semibold
                            mb-6
                            leading-[1.05]
                            tracking-tight
                            text-ink-950 dark:text-paper-50
                        "
                    >
                        <span className="hero-line block">
                            Md. Bariul
                        </span>
                        <span className="hero-line block">
                            Munshi
                        </span>
                    </h1>

                    <h2
                        className="
                            hero-line
                            text-xl md:text-2xl
                            mb-6
                            font-medium
                            text-ink-700 dark:text-paper-100/90
                        "
                    >
                        Instructor{" "}
                        <span className="text-signal-500">·</span>{" "}
                        AI Researcher{" "}
                        <span className="text-signal-500">·</span>{" "}
                        Full-Stack Developer
                    </h2>

                    <p
                        className="
                            hero-sub
                            text-base md:text-lg leading-7
                            max-w-xl
                            text-ink-600 dark:text-paper-100/60
                        "
                    >
                        I teach future technologists, build
                        production-grade web applications, and
                        research Healthcare AI, Medical Imaging,
                        and Explainable Deep Learning.
                    </p>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-wrap gap-4">
                        <a
                            href="/resume/Md_Bariul_Munshi_Resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="
                                hero-cta
                                px-7 py-3.5
                                rounded-full
                                font-medium text-sm
                                bg-ink-950 text-paper-50
                                dark:bg-paper-50 dark:text-ink-950
                                transition-all duration-300
                                hover:shadow-[var(--shadow-glow-signal)]
                                hover:-translate-y-0.5
                            "
                        >
                            View Résumé
                        </a>

                        <a
                            href="/resume/Md_Bariul_Munshi_Resume.pdf"
                            download
                            className="
                                hero-cta
                                px-7 py-3.5
                                rounded-full
                                font-medium text-sm
                                border border-ink-950/15 dark:border-paper-50/20
                                text-ink-950 dark:text-paper-50
                                transition-all duration-300
                                hover:border-signal-500
                                hover:-translate-y-0.5
                            "
                        >
                            Download CV
                        </a>

                        <a
                            href="/contact"
                            className="
                                hero-cta
                                px-7 py-3.5
                                rounded-full
                                font-medium text-sm
                                text-ink-950 dark:text-paper-50
                                transition-all duration-300
                                hover:text-signal-600 dark:hover:text-signal-400
                                flex items-center gap-1.5
                            "
                        >
                            Get in touch
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>

                {/* Right Portrait */}
                <div className="hero-portrait flex justify-center md:justify-end">
                    <div className="relative">
                        <div
                            className="
                                absolute -inset-3 rounded-[2rem]
                                bg-gradient-to-br from-signal-500/25 via-transparent to-data-500/20
                                blur-2xl
                            "
                            aria-hidden="true"
                        />
                        <img
                            src="/images/bariul.jpg"
                            alt="Md Bariul Munshi"
                            className="
                                relative
                                w-64 h-64
                                sm:w-80 sm:h-80
                                md:w-96 md:h-96
                                object-cover
                                rounded-[2rem]
                                shadow-2xl
                                ring-1 ring-ink-950/10 dark:ring-paper-50/10
                            "
                        />
                        <div
                            className="
                                absolute -bottom-4 -left-4
                                font-mono-tag text-[11px]
                                px-3 py-1.5 rounded-full
                                bg-paper-50 dark:bg-ink-900
                                border border-ink-950/10 dark:border-paper-50/15
                                shadow-lg
                                text-ink-700 dark:text-paper-100/80
                            "
                        >
                            Savar, Dhaka · BANGLADESH
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
