import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogsAdmin, deleteBlog } from "../services/blogService";

const AdminBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const data = await getAllBlogsAdmin();
            setBlogs(data);
        } catch (err) {
            setError("Couldn't load posts. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Delete "${title}"? This can't be undone.`)) {
            return;
        }
        try {
            await deleteBlog(id);
            setBlogs((prev) => prev.filter((b) => b._id !== id));
        } catch (err) {
            alert("Failed to delete post");
        }
    };

    return (
        <div className="min-h-screen px-6 md:px-10 py-12 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="font-mono-tag text-xs text-signal-600 dark:text-signal-400 mb-2">
                        admin · blog
                    </p>
                    <h1 className="font-[var(--font-display)] text-3xl font-semibold text-ink-950 dark:text-paper-50">
                        Manage Posts
                    </h1>
                </div>
                <Link
                    to="/admin/add-blog"
                    className="px-5 py-2.5 rounded-full bg-ink-950 text-paper-50 dark:bg-paper-50 dark:text-ink-950 text-sm font-medium hover:-translate-y-0.5 transition-transform"
                >
                    + New Post
                </Link>
            </div>

            {loading && (
                <p className="text-ink-600 dark:text-paper-100/60">
                    Loading posts...
                </p>
            )}

            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && blogs.length === 0 && (
                <div className="border border-dashed border-ink-950/15 dark:border-paper-50/15 rounded-2xl p-10 text-center text-ink-600 dark:text-paper-100/60">
                    No posts yet. Create your first one!
                </div>
            )}

            <div className="space-y-3">
                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="
                            flex items-center justify-between gap-4
                            border border-ink-950/10 dark:border-paper-50/10
                            rounded-2xl px-5 py-4
                            bg-paper-50 dark:bg-ink-900
                        "
                    >
                        <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="font-medium text-ink-950 dark:text-paper-50 truncate">
                                    {blog.title}
                                </h2>
                                <span
                                    className={`shrink-0 text-[10px] font-mono-tag px-2 py-0.5 rounded-full ${
                                        blog.published
                                            ? "bg-data-500/15 text-data-500"
                                            : "bg-ink-950/10 dark:bg-paper-50/15 text-ink-600 dark:text-paper-100/60"
                                    }`}
                                >
                                    {blog.published ? "Published" : "Draft"}
                                </span>
                            </div>
                            <p className="text-xs text-ink-600 dark:text-paper-100/50 font-mono-tag">
                                /blog/{blog.slug} · {blog.views || 0} views
                            </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <Link
                                to={`/admin/edit-blog/${blog._id}`}
                                className="px-4 py-2 rounded-full text-sm border border-ink-950/15 dark:border-paper-50/20 hover:border-signal-500 transition-colors"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(blog._id, blog.title)}
                                className="px-4 py-2 rounded-full text-sm border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminBlog;
