import useScrollReveal from "../hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const education = [
    {
        degree: "Bachelor of Science in Computer Science & Engineering",
        institute: "Daffodil International University",
        year: "2020 - 2023",
        result: "CGPA 3.49 / 4.00",
    },
    {
        degree: "Higher Secondary Certificate (HSC)",
        institute: "Govt. Rajendra College, Faridpur",
        year: "2016 - 2019",
        result: "GPA 3.42 / 5.00",
    },
    {
        degree: "Secondary School Certificate (SSC)",
        institute: "Bhanga Govt. Pilot High School",
        year: "2015 - 2016",
        result: "GPA 5.00 / 5.00",
    },
];

const EducationSection = () => {
    const scopeRef = useScrollReveal();

    return (
        <section
            ref={scopeRef}
            className="px-6 md:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        >
            <SectionHeading
                eyebrow="02 · Education"
                title="Academic foundation"
                description="In Computer Science, Artificial Intelligence, and Research."
                align="center"
            />

            <div className="relative ml-3 md:ml-6 space-y-8 border-l-2 border-ink-950/10 dark:border-paper-50/10">
                {education.map((item, index) => (
                    <div key={index} data-reveal className="relative pl-9 md:pl-12">
                        <div
                            className="
                                absolute -left-[9px] top-6
                                w-4 h-4 rounded-full
                                bg-data-500
                                ring-4 ring-paper-50 dark:ring-ink-950
                            "
                        />

                        <div
                            className="
                                rounded-2xl p-6
                                border border-ink-950/10 dark:border-paper-50/10
                                bg-white dark:bg-ink-900
                                transition-all duration-300
                                hover:border-data-500/40
                            "
                        >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                                <h3 className="text-xl md:text-2xl font-semibold text-ink-950 dark:text-paper-50">
                                    {item.degree}
                                </h3>

                                <span className="font-mono-tag text-xs px-3 py-1.5 rounded-full bg-data-500/10 text-data-500 w-fit">
                                    {item.year}
                                </span>
                            </div>

                            <p className="mt-2 text-lg text-ink-600 dark:text-paper-100/65">
                                {item.institute}
                            </p>

                            <p className="mt-3 font-medium text-ink-600/80 dark:text-paper-100/50">
                                {item.result}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EducationSection;
