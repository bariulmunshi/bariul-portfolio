import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../services/apiClient";
import {
    getBlogByIdAdmin,
    updateBlog,
    deleteBlog,
} from "../services/blogService";
import RichTextEditor from "../components/RichTextEditor";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [published, setPublished] = useState(false);
    const [coverFile, setCoverFile] = useState(null);
    const [coverPreview, setCoverPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const blog = await getBlogByIdAdmin(id);
                setTitle(blog.title);
                setExcerpt(blog.excerpt);
                setContent(blog.content);
                setTags((blog.tags || []).join(", "));
                setPublished(blog.published);
                setCoverPreview(blog.coverImage || "");
            } catch (err) {
                setError("Couldn't load this post.");
            } finally {
                setFetching(false);
            }
        };
        load();
    }, [id]);

    const handleCoverChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setCoverFile(file);
        setCoverPreview(URL.createObjectURL(file));
    };

    const submitHandler = async (e, nextPublished) => {
        e.preventDefault();
        setError("");

        if (!title.trim() || !excerpt.trim() || !content.trim()) {
            setError("Title, excerpt, and content are all required.");
            return;
        }

        try {
            setLoading(true);

            let coverImage = coverPreview;
            if (coverFile) {
                const formData = new FormData();
                formData.append("image", coverFile);
                const uploadRes = await apiClient.post(
                    `${import.meta.env.VITE_API_URL}/api/upload`,
                    formData
                );
                coverImage = uploadRes.data.imageUrl;
            }

            await updateBlog(id, {
                title,
                excerpt,
                content,
                coverImage,
                tags: tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                published: nextPublished,
            });

            navigate("/admin/blog");
        } catch (err) {
            setError(
                err?.response?.data?.message || "Failed to update post."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete this post permanently?")) return;
        try {
            await deleteBlog(id);
            navigate("/admin/blog");
        } catch (err) {
            alert("Failed to delete post.");
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
                <p className="text-ink-600 dark:text-paper-100/60">
                    Loading post...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-6 md:px-10 py-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="font-mono-tag text-xs text-signal-600 dark:text-signal-400 mb-2">
                        admin · blog · edit
                    </p>
                    <h1 className="font-[var(--font-display)] text-3xl font-semibold text-ink-950 dark:text-paper-50">
                        Edit Post
                    </h1>
                </div>
                <span
                    className={`text-xs font-mono-tag px-3 py-1 rounded-full ${
                        published
                            ? "bg-data-500/15 text-data-500"
                            : "bg-ink-950/10 dark:bg-paper-50/15 text-ink-600 dark:text-paper-100/60"
                    }`}
                >
                    {published ? "Published" : "Draft"}
                </span>
            </div>

            <form className="space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-ink-700 dark:text-paper-100/80">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-ink-950/15 dark:border-paper-50/15 bg-paper-50 dark:bg-ink-900 focus:outline-none focus:ring-1 focus:ring-signal-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5 text-ink-700 dark:text-paper-100/80">
                        Excerpt
                    </label>
                    <textarea
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        maxLength={300}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-ink-950/15 dark:border-paper-50/15 bg-paper-50 dark:bg-ink-900 focus:outline-none focus:ring-1 focus:ring-signal-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5 text-ink-700 dark:text-paper-100/80">
                        Cover image
                    </label>
                    {coverPreview && (
                        <img
                            src={coverPreview}
                            alt="Cover preview"
                            className="w-full h-48 object-cover rounded-xl mb-3"
                        />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverChange}
                        className="text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5 text-ink-700 dark:text-paper-100/80">
                        Tags
                    </label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-ink-950/15 dark:border-paper-50/15 bg-paper-50 dark:bg-ink-900 focus:outline-none focus:ring-1 focus:ring-signal-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5 text-ink-700 dark:text-paper-100/80">
                        Content
                    </label>
                    <RichTextEditor value={content} onChange={setContent} />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <div className="flex flex-wrap gap-3 pt-2">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={(e) => submitHandler(e, published)}
                        className="px-6 py-3 rounded-full border border-ink-950/15 dark:border-paper-50/20 text-sm font-medium disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save changes"}
                    </button>

                    {!published ? (
                        <button
                            type="button"
                            disabled={loading}
                            onClick={(e) => submitHandler(e, true)}
                            className="px-6 py-3 rounded-full bg-ink-950 text-paper-50 dark:bg-paper-50 dark:text-ink-950 text-sm font-medium disabled:opacity-50"
                        >
                            Publish
                        </button>
                    ) : (
                        <button
                            type="button"
                            disabled={loading}
                            onClick={(e) => submitHandler(e, false)}
                            className="px-6 py-3 rounded-full bg-ink-950 text-paper-50 dark:bg-paper-50 dark:text-ink-950 text-sm font-medium disabled:opacity-50"
                        >
                            Unpublish
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={handleDelete}
                        className="px-6 py-3 rounded-full border border-red-500/30 text-red-500 text-sm font-medium ml-auto"
                    >
                        Delete post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBlog;
