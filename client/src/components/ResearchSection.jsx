import { useEffect, useState } from "react";
import { getResearch } from "../services/researchService";
import useScrollReveal from "../hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const ResearchSection = () => {
    const [research, setResearch] = useState([]);
    const scopeRef = useScrollReveal();

    useEffect(() => {
        fetchResearch();
    }, []);

    const fetchResearch = async () => {
        try {
            const data = await getResearch();
            setResearch(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section
            ref={scopeRef}
            className="px-6 md:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        >
            <SectionHeading
                eyebrow="07 · Philosophy"
                title="My approach to research"
            />

            <p
                data-reveal
                className="leading-8 text-lg text-ink-700 dark:text-paper-100/75 max-w-3xl -mt-4 mb-12"
            >
                I believe research should not only advance
                theoretical knowledge but also solve real-world
                problems that improve human life. My focus is on
                building practical, data-driven, and
                interpretable AI systems &mdash; especially in
                healthcare &mdash; where technology can directly
                support decision-making and save lives. I value
                simplicity over complexity, reproducibility over
                hype, and impact over publication count. For me,
                true research success is when an idea moves
                beyond papers and becomes a usable solution for
                society.
            </p>

            {research.length > 0 && (
                <div className="space-y-6">
                    {research.map((item) => (
                        <div
                            key={item._id}
                            data-reveal
                            className="
                                rounded-2xl p-7
                                border border-ink-950/10 dark:border-paper-50/10
                                bg-white dark:bg-ink-900
                                transition-all duration-300
                                hover:border-data-500/40
                            "
                        >
                            <h3 className="text-2xl font-semibold text-ink-950 dark:text-paper-50">
                                {item.title}
                            </h3>

                            <p className="mt-2 font-mono-tag text-xs text-ink-600 dark:text-paper-100/55">
                                {item.journal} · {item.year}
                            </p>

                            <p className="mt-4 leading-7 text-ink-600 dark:text-paper-100/65">
                                {item.abstract}
                            </p>

                            <div className="flex gap-5 mt-6">
                                {item.paperLink && (
                                    <a
                                        href={item.paperLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm font-medium text-ink-950 dark:text-paper-50 hover:text-data-500 transition-colors"
                                    >
                                        View paper →
                                    </a>
                                )}

                                {item.githubLink && (
                                    <a
                                        href={item.githubLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm font-medium text-ink-950 dark:text-paper-50 hover:text-data-500 transition-colors"
                                    >
                                        GitHub →
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ResearchSection;
