import useScrollReveal from "../hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const experiences = [
    {
        role: "Instructor",
        organization: "IMB Polytechnic Institute",
        duration: "February 2026 – Present",
        current: true,
    },
    {
        role: "Jr. Instructor",
        organization: "Dhamrai Polytechnic Institute",
        duration: "February 2025 – January 2026",
    },
    {
        role: "Junior Executive - Service & Solution",
        organization: "Star Tech",
        duration: "November 2024 – February 2025",
    },
    {
        role: "Service Operations Intern",
        organization: "Quantigo AI",
        duration: "October 2024 – November 2024",
    },
    {
        role: "Data Science Intern",
        organization: "Oasis Infobyte",
        duration: "February 2024 – March 2024",
    },
];

const ExperienceSection = () => {
    const scopeRef = useScrollReveal();

    return (
        <section
            ref={scopeRef}
            className="px-6 md:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        >
            <SectionHeading
                eyebrow="03 · Experience"
                title="Professional journey"
                description="Across education, technology, AI services, and research."
                align="center"
            />

            <div className="relative ml-3 md:ml-6 space-y-8 border-l-2 border-ink-950/10 dark:border-paper-50/10">
                {experiences.map((experience, index) => (
                    <div key={index} data-reveal className="relative pl-9 md:pl-12">
                        <div
                            className={`
                                absolute -left-[9px] top-6
                                w-4 h-4 rounded-full
                                ring-4 ring-paper-50 dark:ring-ink-950
                                ${
                                    experience.current
                                        ? "bg-signal-500"
                                        : "bg-ink-950/30 dark:bg-paper-50/30"
                                }
                            `}
                        />

                        <div
                            className="
                                rounded-2xl p-6
                                border border-ink-950/10 dark:border-paper-50/10
                                bg-white dark:bg-ink-900
                                transition-all duration-300
                                hover:border-signal-500/40
                            "
                        >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                                <h3 className="text-xl md:text-2xl font-semibold text-ink-950 dark:text-paper-50">
                                    {experience.role}
                                </h3>

                                <span className="font-mono-tag text-xs px-3 py-1.5 rounded-full bg-signal-500/10 text-signal-600 dark:text-signal-400 w-fit">
                                    {experience.duration}
                                </span>
                            </div>

                            <p className="mt-2 text-lg text-ink-600 dark:text-paper-100/65">
                                {experience.organization}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExperienceSection;
