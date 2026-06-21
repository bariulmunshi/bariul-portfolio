import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublishedBlogs } from "../services/blogService";
import useScrollReveal from "../hooks/useScrollReveal";
import SectionHeading from "./SectionHeading";

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

const BlogTeaserSection = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const scopeRef = useScrollReveal();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPublishedBlogs();
                setPosts(data.slice(0, 3));
            } catch (error) {
                console.error("Failed to fetch blog posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Keep the homepage clean when there's nothing published yet —
    // unlike Projects, this section simply doesn't render rather than
    // showing an empty-state placeholder.
    if (!loading && posts.length === 0) {
        return null;
    }

    return (
        <section
            ref={scopeRef}
            className="px-6 md:px-8 py-20 md:py-28 max-w-6xl mx-auto"
        >
            <SectionHeading
                eyebrow="09 · Writing"
                title="From the blog"
                description="Notes on AI, web development, teaching, and research."
                align="center"
            />

            {loading ? (
                <div className="grid sm:grid-cols-3 gap-6">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="h-56 rounded-2xl bg-ink-950/5 dark:bg-paper-50/5 animate-pulse"
                        />
                    ))}
                </div>
            ) : (
                <div className="grid sm:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <Link
                            key={post._id}
                            to={`/blog/${post.slug}`}
                            data-reveal
                            className="
                                group rounded-2xl overflow-hidden
                                border border-ink-950/10 dark:border-paper-50/10
                                bg-white dark:bg-ink-900
                                transition-all duration-300
                                hover:border-signal-500/40
                                flex flex-col
                            "
                        >
                            {post.coverImage ? (
                                <div className="h-36 overflow-hidden">
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            ) : (
                                <div className="h-36 bg-gradient-to-br from-signal-500/15 via-transparent to-data-500/10" />
                            )}

                            <div className="p-5 flex flex-col flex-1">
                                <p className="font-mono-tag text-[11px] text-signal-600 dark:text-signal-400 mb-2">
                                    {formatDate(post.createdAt)}
                                </p>
                                <h3 className="font-[var(--font-display)] font-semibold text-base mb-2 text-ink-950 dark:text-paper-50 group-hover:text-signal-600 dark:group-hover:text-signal-400 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-ink-600 dark:text-paper-100/60 leading-6 line-clamp-2">
                                    {post.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <div className="flex justify-center mt-14">
                <Link
                    to="/blog"
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
                    Read all posts
                    <span aria-hidden="true">→</span>
                </Link>
            </div>
        </section>
    );
};

export default BlogTeaserSection;
