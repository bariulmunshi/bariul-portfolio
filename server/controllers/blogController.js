import Blog from "../models/blogModel.js";

// Turn a title into a URL-safe slug, e.g. "My First Post!" -> "my-first-post"
const slugify = (text) =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

const estimateReadingMinutes = (html) => {
    const text = html.replace(/<[^>]*>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
};

// ---------- Public ----------

// GET /api/blog  — published posts only, newest first
export const getPublishedBlogs = async (req, res) => {
    try {
        const { tag } = req.query;
        const filter = { published: true };
        if (tag) filter.tags = tag;

        const blogs = await Blog.find(filter)
            .select("-content") // list view doesn't need full body
            .sort({ createdAt: -1 });

        res.json({ success: true, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/blog/:slug — single published post, increments view count
export const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            { slug: req.params.slug, published: true },
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!blog) {
            return res
                .status(404)
                .json({ success: false, message: "Post not found" });
        }

        res.json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ---------- Admin (protected) ----------

// GET /api/blog/admin/all — everything, including drafts
export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .select("-content")
            .sort({ createdAt: -1 });
        res.json({ success: true, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/blog/admin/:id — full post by id, for editing (drafts included)
export const getBlogByIdAdmin = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res
                .status(404)
                .json({ success: false, message: "Post not found" });
        }
        res.json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /api/blog
export const createBlog = async (req, res) => {
    try {
        const { title, excerpt, content, coverImage, tags, published } =
            req.body;

        if (!title || !excerpt || !content) {
            return res.status(400).json({
                success: false,
                message: "Title, excerpt, and content are required",
            });
        }

        let baseSlug = slugify(title);
        let slug = baseSlug;
        let suffix = 1;
        // Guarantee uniqueness even if two posts share a title
        while (await Blog.findOne({ slug })) {
            slug = `${baseSlug}-${suffix++}`;
        }

        const blog = await Blog.create({
            title,
            slug,
            excerpt,
            content,
            coverImage: coverImage || "",
            tags: Array.isArray(tags) ? tags : [],
            published: Boolean(published),
            readingMinutes: estimateReadingMinutes(content),
        });

        res.status(201).json({ success: true, data: blog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// PUT /api/blog/:id
export const updateBlog = async (req, res) => {
    try {
        const { title, excerpt, content, coverImage, tags, published } =
            req.body;

        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res
                .status(404)
                .json({ success: false, message: "Post not found" });
        }

        if (title && title !== blog.title) {
            let baseSlug = slugify(title);
            let slug = baseSlug;
            let suffix = 1;
            while (
                await Blog.findOne({ slug, _id: { $ne: blog._id } })
            ) {
                slug = `${baseSlug}-${suffix++}`;
            }
            blog.slug = slug;
            blog.title = title;
        }

        if (excerpt !== undefined) blog.excerpt = excerpt;
        if (content !== undefined) {
            blog.content = content;
            blog.readingMinutes = estimateReadingMinutes(content);
        }
        if (coverImage !== undefined) blog.coverImage = coverImage;
        if (tags !== undefined) blog.tags = Array.isArray(tags) ? tags : [];
        if (published !== undefined) blog.published = Boolean(published);

        await blog.save();

        res.json({ success: true, data: blog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// DELETE /api/blog/:id
export const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
