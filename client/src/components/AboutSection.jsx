import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const AboutSection = () => {
    const scopeRef = useScrollReveal();

    return (
        <section
            ref={scopeRef}
            className="px-6 md:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        >
            <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-16 items-start">
                <SectionHeading
                    eyebrow="01 · About"
                    title="Bridging classrooms and research labs"
                />

                <div data-reveal className="space-y-6">
                    <p className="text-lg leading-8 text-ink-700 dark:text-paper-100/75">
                        I'm an instructor and aspiring researcher
                        with a background in Computer Science and
                        Engineering. I enjoy teaching future
                        technologists while exploring Healthcare
                        AI, Medical Imaging, and Explainable
                        Artificial Intelligence.
                    </p>

                    <p className="text-lg leading-8 text-ink-700 dark:text-paper-100/75">
                        My goal is to bridge the gap between
                        education, research, and real-world
                        applications &mdash; creating meaningful
                        learning experiences and impactful
                        technological solutions.
                    </p>

                    <Link
                        to="/about"
                        className="
                            inline-flex items-center gap-1.5
                            mt-4 px-7 py-3.5
                            rounded-full
                            font-medium text-sm
                            border border-ink-950/15 dark:border-paper-50/20
                            text-ink-950 dark:text-paper-50
                            transition-all duration-300
                            hover:border-signal-500 hover:-translate-y-0.5
                        "
                    >
                        Read full bio
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
