import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublishedBlogs } from "../services/blogService";
import SectionHeading from "../components/SectionHeading";
import useScrollReveal from "../hooks/useScrollReveal";

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTag, setActiveTag] = useState(null);

    const scopeRef = useScrollReveal();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const data = await getPublishedBlogs(activeTag);
                setBlogs(data);
            } catch (err) {
                setError("Couldn't load posts right now.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [activeTag]);

    const allTags = Array.from(
        new Set(blogs.flatMap((b) => b.tags || []))
    ).slice(0, 10);

    return (
        <div ref={scopeRef} className="px-6 md:px-8 py-20 max-w-5xl mx-auto min-h-[70vh]">
            <SectionHeading
                eyebrow="Writing"
                title="Notes on AI, teaching, and building things"
                description="Thoughts and tutorials from my work in research, education, and software development."
            />

            {allTags.length > 0 && (
                <div data-reveal
                    className="flex flex-wrap gap-2 justify-center mb-12">
                    <button
                        onClick={() => setActiveTag(null)}
                        className={`text-xs px-3.5 py-1.5 rounded-full border transition-colors ${
                            !activeTag
                                ? "bg-ink-950 text-paper-50 dark:bg-paper-50 dark:text-ink-950 border-transparent"
                                : "border-ink-950/15 dark:border-paper-50/20 text-ink-700 dark:text-paper-100/75 hover:border-signal-500"
                        }`}
                    >
                        All
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`text-xs px-3.5 py-1.5 rounded-full border transition-colors ${
                                activeTag === tag
                                    ? "bg-ink-950 text-paper-50 dark:bg-paper-50 dark:text-ink-950 border-transparent"
                                    : "border-ink-950/15 dark:border-paper-50/20 text-ink-700 dark:text-paper-100/75 hover:border-signal-500"
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            )}

            {loading && (
                <div className="grid sm:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-64 rounded-2xl bg-ink-950/5 dark:bg-paper-50/5 animate-pulse"
                        />
                    ))}
                </div>
            )}

            {!loading && error && (
                <p className="text-center text-red-500">{error}</p>
            )}

            {!loading && !error && blogs.length === 0 && (
                <div data-reveal
                    className="border border-dashed border-ink-950/15 dark:border-paper-50/15 rounded-2xl p-12 text-center text-ink-600 dark:text-paper-100/60">
                    No posts published yet. Check back soon!
                </div>
            )}

            <div className="grid sm:grid-cols-2 gap-6">
                {blogs.map((blog) => (
                    <Link
                        key={blog._id}
                        to={`/blog/${blog.slug}`}
                        data-reveal
                        className="
                            group
                            rounded-2xl overflow-hidden
                            border border-ink-950/10 dark:border-paper-50/10
                            bg-paper-50 dark:bg-ink-900
                            hover:border-signal-500/50
                            transition-colors duration-300
                            flex flex-col
                        "
                    >
                        {blog.coverImage ? (
                            <div className="h-44 overflow-hidden">
                                <img
                                    src={blog.coverImage}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ) : (
                            <div className="h-44 bg-gradient-to-br from-signal-500/15 via-transparent to-data-500/10" />
                        )}

                        <div className="p-5 flex flex-col flex-1">
                            <p className="font-mono-tag text-[11px] text-signal-600 dark:text-signal-400 mb-2">
                                {formatDate(blog.createdAt)} ·{" "}
                                {blog.readingMinutes} min read
                            </p>
                            <h3 className="font-[var(--font-display)] font-semibold text-lg mb-2 text-ink-950 dark:text-paper-50 group-hover:text-signal-600 dark:group-hover:text-signal-400 transition-colors">
                                {blog.title}
                            </h3>
                            <p className="text-sm text-ink-600 dark:text-paper-100/60 leading-6 line-clamp-3">
                                {blog.excerpt}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Blog;
