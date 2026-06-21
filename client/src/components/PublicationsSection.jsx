import useScrollReveal from "../hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const publications = [
    {
        title: "An Ensemble Approach to Predict Multi-disease using Machine Learning and Web App",
        area: "Healthcare AI",
        status: "Manuscript",
        link: "https://github.com/bariulmunshi/Multi-Disease-Prediction-Web-App",
    },
    {
        title: "A Comparison Study of Deep CNN Architecture in Detecting Kidney Cancer",
        area: "Medical Imaging",
        status: "Manuscript",
        link: "https://github.com/bariulmunshi/complete-deep-learning-code-for-research",
    },
    {
        title: "Flower Identification by Deep Learning Approach and Computer Vision",
        area: "Computer Vision",
        status: "Manuscript",
        link: "https://github.com/bariulmunshi/Flower-Identification",
    },
];

const PublicationsSection = () => {
    const scopeRef = useScrollReveal();

    return (
        <section
            ref={scopeRef}
            className="px-6 md:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        >
            <SectionHeading
                eyebrow="06 · Publications"
                title="Research publications"
                description="Centered on Healthcare AI, Explainable Artificial Intelligence, Medical Imaging, and Computer Vision."
            />

            <div className="space-y-5">
                {publications.map((publication, index) => (
                    <div
                        key={index}
                        data-reveal
                        className="
                            rounded-2xl p-7
                            border border-ink-950/10 dark:border-paper-50/10
                            bg-white dark:bg-ink-900
                            transition-all duration-300
                            hover:border-signal-500/40
                        "
                    >
                        <h3 className="text-xl md:text-2xl font-semibold text-ink-950 dark:text-paper-50">
                            {publication.title}
                        </h3>

                        <div className="flex flex-wrap gap-3 mt-4">
                            <span className="font-mono-tag text-xs px-3 py-1.5 rounded-full bg-signal-500/10 text-signal-600 dark:text-signal-400">
                                {publication.area}
                            </span>
                            <span className="font-mono-tag text-xs px-3 py-1.5 rounded-full bg-ink-950/5 dark:bg-paper-50/10 text-ink-600 dark:text-paper-100/65">
                                {publication.status}
                            </span>
                        </div>

                        <a
                            href={publication.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-ink-950 dark:text-paper-50 hover:text-signal-600 dark:hover:text-signal-400 transition-colors"
                        >
                            View details
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PublicationsSection;
