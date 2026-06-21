import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * useGsapEntrance(buildTimeline)
 *
 * Wraps gsap.context() + cleanup in a StrictMode-safe way:
 * - runs `buildTimeline(tl, scopeEl)` once to populate a gsap.timeline()
 * - clears GSAP's inline styles once the timeline completes, so a
 *   double-invoked effect (React StrictMode in dev) never leaves
 *   elements stuck at opacity: 0 mid-animation.
 *
 * Usage:
 *   const scopeRef = useGsapEntrance((tl) => {
 *     tl.from(".thing", { opacity: 0, y: 20 });
 *   });
 *   <section ref={scopeRef}>...</section>
 */
export default function useGsapEntrance(buildTimeline, deps = []) {
    const scopeRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
            });
            buildTimeline(tl, scopeRef.current);

            tl.eventCallback("onComplete", () => {
                const targets = tl.getChildren(true, true, false);
                const els = new Set();
                targets.forEach((t) => {
                    (t.targets ? t.targets() : []).forEach((el) =>
                        els.add(el)
                    );
                });
                if (els.size) {
                    gsap.set(Array.from(els), { clearProps: "all" });
                }
            });
        }, scopeRef);

        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return scopeRef;
}
