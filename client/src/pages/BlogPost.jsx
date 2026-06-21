import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getBlogBySlug } from "../services/blogService";

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                setNotFound(false);
                const data = await getBlogBySlug(slug);
                setBlog(data);
            } catch (err) {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) {
        return (
            <div className="px-6 py-24 max-w-3xl mx-auto">
                <div className="h-6 w-32 bg-ink-950/5 dark:bg-paper-50/10 rounded-full animate-pulse mb-6" />
                <div className="h-10 w-full bg-ink-950/5 dark:bg-paper-50/10 rounded-xl animate-pulse mb-4" />
                <div className="h-64 w-full bg-ink-950/5 dark:bg-paper-50/10 rounded-2xl animate-pulse" />
            </div>
        );
    }

    if (notFound || !blog) {
        return (
            <div className="px-6 py-24 max-w-2xl mx-auto text-center">
                <p className="font-mono-tag text-signal-600 dark:text-signal-400 mb-3">
                    404
                </p>
                <h1 className="font-[var(--font-display)] text-2xl font-semibold mb-4 text-ink-950 dark:text-paper-50">
                    Post not found
                </h1>
                <p className="text-ink-600 dark:text-paper-100/60 mb-8">
                    This post may have been moved or unpublished.
                </p>
                <button
                    onClick={() => navigate("/blog")}
                    className="px-6 py-3 rounded-full bg-ink-950 text-paper-50 dark:bg-paper-50 dark:text-ink-950 text-sm font-medium"
                >
                    ← Back to all posts
                </button>
            </div>
        );
    }

    const plainExcerpt = blog.excerpt;
    const canonicalUrl =
        typeof window !== "undefined"
            ? `${window.location.origin}/blog/${blog.slug}`
            : "";

    return (
        <>
            <Helmet>
                <title>{blog.title} | Md. Bariul Munshi</title>
                <meta name="description" content={plainExcerpt} />
                <link rel="canonical" href={canonicalUrl} />

                <meta property="og:type" content="article" />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={plainExcerpt} />
                {blog.coverImage && (
                    <meta property="og:image" content={blog.coverImage} />
                )}
                <meta property="og:url" content={canonicalUrl} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={blog.title} />
                <meta name="twitter:description" content={plainExcerpt} />
                {blog.coverImage && (
                    <meta name="twitter:image" content={blog.coverImage} />
                )}
            </Helmet>

            <article className="px-6 md:px-8 py-16 max-w-3xl mx-auto">
                <Link
                    to="/blog"
                    className="font-mono-tag text-xs text-signal-600 dark:text-signal-400 inline-flex items-center gap-1.5 mb-8 hover:gap-2 transition-all"
                >
                    ← back to writing
                </Link>

                <h1 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold leading-tight mb-4 text-ink-950 dark:text-paper-50">
                    {blog.title}
                </h1>

                <div className="flex items-center gap-3 text-sm text-ink-600 dark:text-paper-100/60 mb-8 font-mono-tag">
                    <span>{formatDate(blog.createdAt)}</span>
                    <span>·</span>
                    <span>{blog.readingMinutes} min read</span>
                </div>

                {blog.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {blog.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-3 py-1 rounded-full bg-signal-500/10 text-signal-600 dark:text-signal-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {blog.coverImage && (
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full rounded-2xl mb-10 max-h-[420px] object-cover"
                    />
                )}

                <div
                    className="prose-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                <div className="mt-14 pt-8 border-t border-ink-950/10 dark:border-paper-50/10 flex items-center justify-between">
                    <Link
                        to="/blog"
                        className="text-sm font-medium text-ink-950 dark:text-paper-50 hover:text-signal-600 dark:hover:text-signal-400 transition-colors"
                    >
                        ← More posts
                    </Link>
                    <Link
                        to="/contact"
                        className="text-sm font-medium text-ink-950 dark:text-paper-50 hover:text-signal-600 dark:hover:text-signal-400 transition-colors"
                    >
                        Get in touch →
                    </Link>
                </div>
            </article>
        </>
    );
};

export default BlogPost;
