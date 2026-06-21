import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import useScrollReveal from "../hooks/useScrollReveal";

const categories = [
    "All",
    "Machine Learning",
    "Deep Learning",
    "Web Development",
    "Research",
    "Python",
];

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const scopeRef = useScrollReveal();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await getProjects();
            setProjects(data);
            setFilteredProjects(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const filterProjects = (category) => {
        setSelectedCategory(category);

        if (category === "All") {
            setFilteredProjects(projects);
            return;
        }

        const filtered = projects.filter((project) =>
            project.technologies.some((tech) =>
                tech.toLowerCase().includes(category.toLowerCase())
            )
        );

        setFilteredProjects(filtered);
    };

    return (
        <section
            ref={scopeRef}
            className="px-6 md:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        >
            <div data-reveal className="text-center mb-12">
                <p className="font-mono-tag text-xs md:text-sm text-signal-600 dark:text-signal-400 mb-3">
                    Projects
                </p>
                <h1 className="font-[var(--font-display)] text-4xl md:text-5xl font-semibold tracking-tight text-ink-950 dark:text-paper-50">
                    Everything I've built
                </h1>
            </div>

            {/* Category Tabs */}
            <div data-reveal className="flex flex-wrap justify-center gap-2.5 mb-14">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => filterProjects(category)}
                        className={`
                            px-4 py-2 rounded-full text-sm font-medium
                            border transition-all duration-200
                            ${
                                selectedCategory === category
                                    ? "bg-ink-950 text-paper-50 dark:bg-paper-50 dark:text-ink-950 border-transparent"
                                    : "border-ink-950/15 dark:border-paper-50/20 text-ink-700 dark:text-paper-100/75 hover:border-signal-500"
                            }
                        `}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="grid md:grid-cols-2 gap-8">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-80 rounded-2xl bg-ink-950/5 dark:bg-paper-50/5 animate-pulse"
                        />
                    ))}
                </div>
            ) : filteredProjects.length === 0 ? (
                <div
                    data-reveal
                    className="text-center py-16 rounded-2xl border border-dashed border-ink-950/15 dark:border-paper-50/15"
                >
                    <p className="text-ink-600 dark:text-paper-100/60">
                        No projects in this category yet.
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    {filteredProjects.map((project) => (
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
                                        className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}

                            <div className="p-6">
                                <h2 className="font-[var(--font-display)] text-xl font-semibold text-ink-950 dark:text-paper-50">
                                    {project.title}
                                </h2>

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

                                <div className="flex gap-5 mt-6">
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm font-medium text-ink-950 dark:text-paper-50 hover:text-signal-600 dark:hover:text-signal-400 transition-colors"
                                        >
                                            GitHub →
                                        </a>
                                    )}

                                    {project.liveLink && (
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm font-medium text-ink-950 dark:text-paper-50 hover:text-signal-600 dark:hover:text-signal-400 transition-colors"
                                        >
                                            Live Demo →
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Projects;
