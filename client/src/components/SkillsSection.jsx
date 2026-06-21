import useScrollReveal from "../hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const skills = {
    "Programming Languages": [
        "Python",
        "JavaScript",
        "C/C++",
        "PHP",
    ],
    "AI / Machine Learning": [
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "Pandas",
        "Computer Vision",
        "Medical Imaging",
        "Deep Learning",
        "Streamlit",
    ],
    "Web Development": [
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "MySQL",
    ],
    "Tools & Platforms": [
        "Git",
        "GitHub",
        "JupyterLab",
        "Google Colab",
        "VS Code",
        "Linux",
    ],
    "CMS & Digital Marketing": [
        "WordPress",
        "Elementor Pro",
        "SEO",
        "Google Ads",
        "Meta Ads",
        "Email Marketing",
    ],
};

const SkillsSection = () => {
    const scopeRef = useScrollReveal();

    return (
        <section
            ref={scopeRef}
            className="px-6 md:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        >
            <SectionHeading
                eyebrow="04 · Skills"
                title="Technical stack"
                description="Spanning software development, AI research, and digital solutions."
                align="center"
            />

            <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(skills).map(([category, items]) => (
                    <div
                        key={category}
                        data-reveal
                        className="
                            group relative
                            rounded-2xl p-7
                            border border-ink-950/10 dark:border-paper-50/10
                            bg-white dark:bg-ink-900
                            transition-all duration-300
                            hover:border-signal-500/40
                            hover:shadow-[var(--shadow-glow-signal)]
                        "
                    >
                        <h3 className="font-[var(--font-display)] text-xl font-semibold mb-5 text-ink-950 dark:text-paper-50">
                            {category}
                        </h3>

                        <div className="flex flex-wrap gap-2.5">
                            {items.map((skill) => (
                                <span
                                    key={skill}
                                    className="
                                        px-3.5 py-1.5
                                        rounded-full
                                        text-sm
                                        font-medium
                                        border border-ink-950/10 dark:border-paper-50/15
                                        text-ink-700 dark:text-paper-100/75
                                        transition-colors duration-200
                                        hover:bg-signal-500 hover:text-white hover:border-signal-500
                                    "
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SkillsSection;
