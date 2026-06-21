import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/projectService";
import useScrollReveal from "../hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const ProjectsSection = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const scopeRef = useScrollReveal();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await getProjects();
            const featuredProjects = data.filter(
                (project) => project.featured === true
            );
            setProjects(featuredProjects);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            ref={scopeRef}
            className="px-6 md:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        >
            <SectionHeading
                eyebrow="05 · Projects"
                title="Featured work"
                description="A selection of applications I've designed, built, and shipped."
                align="center"
            />

            {loading ? (
                <div className="grid md:grid-cols-2 gap-8">
                    {[0, 1].map((i) => (
                        <div
                            key={i}
                            className="h-80 rounded-2xl bg-ink-950/5 dark:bg-paper-50/5 animate-pulse"
                        />
                    ))}
                </div>
            ) : projects.length === 0 ? (
                <div
                    data-reveal
                    className="text-center py-16 rounded-2xl border border-dashed border-ink-950/15 dark:border-paper-50/15"
                >
                    <p className="text-ink-600 dark:text-paper-100/60">
                        Featured projects are on their way. Check
                        back soon, or browse everything in the
                        meantime.
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            data-reveal
                            className="
                                group rounded-2xl overflow-hidden
                                border border-ink-950/10 dark:border-paper-50/10
                                bg-white dark:bg-ink-900
                                transition-all duration-300
                                hover:border-signal-500/40
                                hover:shadow-[var(--shadow-glow-signal)]
                            "
                        >
                            {project.image && (
                                <div className="overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}

                            <div className="p-7">
                                <h3 className="font-[var(--font-display)] text-2xl font-semibold text-ink-950 dark:text-paper-50">
                                    {project.title}
                                </h3>

                                <p className="mt-4 leading-7 text-ink-600 dark:text-paper-100/65">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-5">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="font-mono-tag px-3 py-1 rounded-full text-xs border border-ink-950/10 dark:border-paper-50/15 text-ink-600 dark:text-paper-100/65"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3 mt-7">
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
                                            px-5 py-2.5 rounded-full text-sm font-medium
                                            bg-ink-950 text-paper-50 dark:bg-paper-50 dark:text-ink-950
                                            transition-all duration-300 hover:-translate-y-0.5
                                        "
                                    >
                                        GitHub
                                    </a>

                                    {project.liveLink && (
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="
                                                px-5 py-2.5 rounded-full text-sm font-medium
                                                border border-ink-950/15 dark:border-paper-50/20
                                                text-ink-950 dark:text-paper-50
                                                transition-all duration-300 hover:border-signal-500 hover:-translate-y-0.5
                                            "
                                        >
                                            Live Website
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center mt-14">
                <Link
                    to="/projects"
                    className="
                        inline-flex items-center gap-1.5
                        px-7 py-3.5 rounded-full
                        font-medium text-sm
                        border border-ink-950/15 dark:border-paper-50/20
                        text-ink-950 dark:text-paper-50
                        transition-all duration-300
                        hover:border-signal-500 hover:-translate-y-0.5
                    "
                >
                    See all projects
                    <span aria-hidden="true">→</span>
                </Link>
            </div>
        </section>
    );
};

export default ProjectsSection;
