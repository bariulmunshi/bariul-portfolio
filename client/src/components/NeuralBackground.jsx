import { useEffect, useRef } from "react";

/**
 * Signature element: an interactive neural-node field.
 * Nodes drift slowly; nearby nodes connect with a faint line; lines
 * brighten near the cursor. This is a literal visual reference to the
 * subject's own field (neural networks / deep learning) rather than a
 * generic particle effect.
 */
const NeuralBackground = ({ density = 55, className = "" }) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let raf;
        let width, height, dpr;
        let nodes = [];

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const isDark = () =>
            document.documentElement.classList.contains("dark");

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.round(
                (width * height) / (16000 / (density / 55))
            );
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.18,
                vy: (Math.random() - 0.5) * 0.18,
                r: Math.random() * 1.4 + 0.6,
            }));
        };

        const step = () => {
            ctx.clearRect(0, 0, width, height);
            const dark = isDark();
            const lineBase = dark
                ? "255, 255, 255"
                : "20, 20, 25";
            const accent = "255, 138, 61"; // signal-500

            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > width) n.vx *= -1;
                if (n.y < 0 || n.y > height) n.vy *= -1;

                for (let j = i + 1; j < nodes.length; j++) {
                    const m = nodes[j];
                    const dx = n.x - m.x;
                    const dy = n.y - m.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = 130;
                    if (dist < maxDist) {
                        const mx = mouseRef.current.x;
                        const my = mouseRef.current.y;
                        const midX = (n.x + m.x) / 2;
                        const midY = (n.y + m.y) / 2;
                        const mouseDist = Math.sqrt(
                            (midX - mx) ** 2 + (midY - my) ** 2
                        );
                        const mouseBoost = Math.max(
                            0,
                            1 - mouseDist / 180
                        );
                        const baseOpacity =
                            (1 - dist / maxDist) * (dark ? 0.16 : 0.1);
                        const opacity =
                            baseOpacity + mouseBoost * 0.5;
                        const color =
                            mouseBoost > 0.08 ? accent : lineBase;

                        ctx.strokeStyle = `rgba(${color}, ${opacity})`;
                        ctx.lineWidth = mouseBoost > 0.08 ? 1.1 : 0.6;
                        ctx.beginPath();
                        ctx.moveTo(n.x, n.y);
                        ctx.lineTo(m.x, m.y);
                        ctx.stroke();
                    }
                }
            }

            for (const n of nodes) {
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = dark
                    ? "rgba(255, 255, 255, 0.45)"
                    : "rgba(20, 20, 25, 0.35)";
                ctx.fill();
            }

            raf = requestAnimationFrame(step);
        };

        const handleMouse = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };
        const handleLeave = () => {
            mouseRef.current = { x: -9999, y: -9999 };
        };

        resize();
        window.addEventListener("resize", resize);
        canvas.addEventListener("mousemove", handleMouse);
        canvas.addEventListener("mouseleave", handleLeave);

        if (!prefersReducedMotion) {
            raf = requestAnimationFrame(step);
        } else {
            // Draw a single static frame for reduced-motion users
            step();
            cancelAnimationFrame(raf);
        }

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouse);
            canvas.removeEventListener("mouseleave", handleLeave);
        };
    }, [density]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full ${className}`}
            aria-hidden="true"
        />
    );
};

export default NeuralBackground;
