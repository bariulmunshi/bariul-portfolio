import useScrollReveal from "../hooks/useScrollReveal";

const coreSkills = [
    "Python", "Machine Learning", "Deep Learning", "TensorFlow",
    "PyTorch", "Computer Vision", "Medical Imaging", "React.js",
    "Next.js", "Node.js", "MongoDB", "WordPress", "SEO", "Research Writing",
];

const whatIDo = [
    "AI/ML Research (Healthcare AI)",
    "Deep Learning Model Development",
    "MERN Stack Web Development",
    "Portfolio & Business Website Development",
    "WordPress Development",
    "SEO Optimization",
    "Technical Content Writing",
];

const About = () => {
    const scopeRef = useScrollReveal();

    return (
        <section
            ref={scopeRef}
            className="px-6 md:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        >
            {/* Intro */}
            <div data-reveal className="max-w-3xl mx-auto mb-20 text-center">
                <div className="flex justify-center mb-8">
                    <img
                        src="/images/mdbariulmunshi.png"
                        alt="Md. Bariul Munshi"
                        className="
                            w-56 h-56 md:w-64 md:h-64
                            object-cover rounded-[2rem]
                            shadow-2xl
                            ring-1 ring-ink-950/10 dark:ring-paper-50/10
                        "
                    />
                </div>

                <h1 className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold tracking-tight text-ink-950 dark:text-paper-50">
                    Md. Bariul Munshi
                </h1>

                <p className="mt-3 font-mono-tag text-sm text-signal-600 dark:text-signal-400">
                    Instructor · AI Researcher · Full-Stack Developer
                </p>

                <p className="mt-8 text-lg leading-8 text-ink-600 dark:text-paper-100/65 max-w-2xl mx-auto">
                    I'm a Computer Science graduate, instructor, AI
                    researcher, and full-stack web developer from
                    Bangladesh. My journey combines education,
                    technology, and research to build impactful
                    digital solutions &mdash; with a focus on
                    Healthcare AI, Medical Imaging, and Explainable
                    AI, alongside teaching and mentoring future
                    technologists.
                </p>
            </div>

            {/* Journey + What I Do */}
            <div className="grid md:grid-cols-2 gap-10 mb-16">
                <div
                    data-reveal
                    className="rounded-2xl p-8 border border-ink-950/10 dark:border-paper-50/10 bg-white dark:bg-ink-900"
                >
                    <h2 className="font-[var(--font-display)] text-2xl font-semibold mb-4 text-ink-950 dark:text-paper-50">
                        My Journey
                    </h2>

                    <p className="leading-8 text-ink-600 dark:text-paper-100/65">
                        Currently, I work as an Instructor at IMB
                        Polytechnic Institute, where I teach
                        computer science and guide students in
                        technology and career development.
                    </p>

                    <p className="leading-8 mt-4 text-ink-600 dark:text-paper-100/65">
                        Alongside teaching, I actively work on
                        Healthcare AI research, focusing on medical
                        imaging, explainable machine learning, deep
                        learning, and computer vision.
                    </p>
                </div>

                <div
                    data-reveal
                    className="rounded-2xl p-8 border border-ink-950/10 dark:border-paper-50/10 bg-white dark:bg-ink-900"
                >
                    <h2 className="font-[var(--font-display)] text-2xl font-semibold mb-4 text-ink-950 dark:text-paper-50">
                        What I Do
                    </h2>

                    <ul className="space-y-3 leading-7 text-ink-600 dark:text-paper-100/65">
                        {whatIDo.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-signal-500 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Core Skills */}
            <div data-reveal className="mb-16">
                <h2 className="font-[var(--font-display)] text-2xl font-semibold mb-6 text-ink-950 dark:text-paper-50">
                    Core Skills
                </h2>

                <div className="flex flex-wrap gap-2.5">
                    {coreSkills.map((skill) => (
                        <span
                            key={skill}
                            className="
                                px-4 py-2 rounded-full text-sm font-medium
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

            {/* Mission */}
            <div
                data-reveal
                className="
                    rounded-2xl p-8 md:p-10
                    border border-signal-500/25
                    bg-gradient-to-br from-signal-500/[0.06] to-transparent
                "
            >
                <h2 className="font-[var(--font-display)] text-2xl font-semibold mb-4 text-ink-950 dark:text-paper-50">
                    My Mission
                </h2>

                <p className="leading-8 text-ink-600 dark:text-paper-100/65">
                    My mission is to bridge education, research, and
                    technology by developing intelligent systems
                    that solve real-world problems. I aim to
                    contribute to advanced Healthcare AI research,
                    pursue fully funded PhD opportunities, and build
                    meaningful software products that create
                    impact.
                </p>
            </div>
        </section>
    );
};

export default About;
