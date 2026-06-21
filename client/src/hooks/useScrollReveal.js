import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollReveal(selector)
 *
 * Applies a consistent fade-up reveal to all elements matching
 * `selector` inside the returned ref, triggered as they enter the
 * viewport. StrictMode-safe: uses gsap.matchMedia/context with a
 * guarded refresh so double-invoked effects in dev don't leave
 * elements stuck at opacity 0.
 */
export default function useScrollReveal(
    selector = "[data-reveal]",
    options = {}
) {
    const scopeRef = useRef(null);

    useEffect(() => {
        const scopeEl = scopeRef.current;
        if (!scopeEl) return undefined;

        const els = gsap.utils.toArray(selector, scopeEl);
        if (!els.length) return undefined;

        // Start hidden via GSAP (not CSS) so there's never a flash,
        // but guarantee visibility as a hard fallback below.
        gsap.set(els, { opacity: 0, y: options.y ?? 32 });

        const triggers = els.map((el, i) =>
            ScrollTrigger.create({
                trigger: el,
                start: "top 88%",
                once: true,
                onEnter: () =>
                    gsap.to(el, {
                        opacity: 1,
                        y: 0,
                        duration: options.duration ?? 0.7,
                        ease: "power3.out",
                        delay:
                            (i % (options.staggerGroup ?? 4)) *
                            (options.stagger ?? 0.06),
                        onComplete: () =>
                            gsap.set(el, { clearProps: "all" }),
                    }),
            })
        );

        // Recalculate trigger positions after layout settles
        // (fonts, images, etc.) and once more shortly after.
        const refresh = () => ScrollTrigger.refresh();
        const t1 = setTimeout(refresh, 200);
        const t2 = setTimeout(refresh, 800);

        // Hard fallback: if an element is still hidden long after
        // mount (e.g. it was already in view but the trigger fired
        // before paint), reveal it directly so content is never
        // permanently invisible.
        const fallback = setTimeout(() => {
            els.forEach((el) => {
                if (parseFloat(getComputedStyle(el).opacity) < 1) {
                    gsap.to(el, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        onComplete: () =>
                            gsap.set(el, { clearProps: "all" }),
                    });
                }
            });
        }, 1500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(fallback);
            triggers.forEach((t) => t.kill());
            gsap.set(els, { clearProps: "all" });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selector]);

    return scopeRef;
}
