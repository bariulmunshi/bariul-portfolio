import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import { createBlog } from "../services/blogService";
import RichTextEditor from "../components/RichTextEditor";

const AddBlog = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [coverFile, setCoverFile] = useState(null);
    const [coverPreview, setCoverPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCoverChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setCoverFile(file);
        setCoverPreview(URL.createObjectURL(file));
    };

    const submitHandler = async (e, publishNow) => {
        e.preventDefault();
        setError("");

        if (!title.trim() || !excerpt.trim() || !content.trim()) {
            setError("Title, excerpt, and content are all required.");
            return;
        }

        try {
            setLoading(true);

            let coverImage = "";
            if (coverFile) {
                const formData = new FormData();
                formData.append("image", coverFile);
                const uploadRes = await apiClient.post(
                    `${import.meta.env.VITE_API_URL}/api/upload`,
                    formData
                );
                coverImage = uploadRes.data.imageUrl;
            }

            await createBlog({
                title,
                excerpt,
                content,
                coverImage,
                tags: tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                published: publishNow,
            });

            navigate("/admin/blog");
        } catch (err) {
            setError(
                err?.response?.data?.message || "Failed to save post."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen px-6 md:px-10 py-12 max-w-3xl mx-auto">
            <p className="font-mono-tag text-xs text-signal-600 dark:text-signal-400 mb-2">
                admin · blog · new
            </p>
            <h1 className="font-[var(--font-display)] text-3xl font-semibold text-ink-950 dark:text-paper-50 mb-8">
                New Post
            </h1>

            <form className="space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-ink-700 dark:text-paper-100/80">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Post title"
                        className="w-full px-4 py-3 rounded-xl border border-ink-950/15 dark:border-paper-50/15 bg-paper-50 dark:bg-ink-900 focus:outline-none focus:ring-1 focus:ring-signal-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5 text-ink-700 dark:text-paper-100/80">
                        Excerpt{" "}
                        <span className="font-normal opacity-60">
                            (short summary shown on the blog list, max 300 chars)
                        </span>
                    </label>
                    <textarea
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        maxLength={300}
                        rows={3}
                        placeholder="A one or two sentence summary..."
                        className="w-full px-4 py-3 rounded-xl border border-ink-950/15 dark:border-paper-50/15 bg-paper-50 dark:bg-ink-900 focus:outline-none focus:ring-1 focus:ring-signal-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5 text-ink-700 dark:text-paper-100/80">
                        Cover image{" "}
                        <span className="font-normal opacity-60">(optional)</span>
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
                        Tags{" "}
                        <span className="font-normal opacity-60">
                            (comma separated)
                        </span>
                    </label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="AI, Web Development, Tutorial"
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

                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={(e) => submitHandler(e, false)}
                        className="px-6 py-3 rounded-full border border-ink-950/15 dark:border-paper-50/20 text-sm font-medium disabled:opacity-50"
                    >
                        Save as draft
                    </button>
                    <button
                        type="button"
                        disabled={loading}
                        onClick={(e) => submitHandler(e, true)}
                        className="px-6 py-3 rounded-full bg-ink-950 text-paper-50 dark:bg-paper-50 dark:text-ink-950 text-sm font-medium disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Publish"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;
