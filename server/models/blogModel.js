import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        excerpt: {
            type: String,
            required: true,
            maxlength: 300,
        },

        // Rich HTML content produced by the TipTap editor
        content: {
            type: String,
            required: true,
        },

        coverImage: {
            type: String,
            default: "",
        },

        tags: {
            type: [String],
            default: [],
        },

        // Drafts are visible only in the admin panel; published posts
        // are the only ones returned by the public-facing endpoints.
        published: {
            type: Boolean,
            default: false,
        },

        views: {
            type: Number,
            default: 0,
        },

        readingMinutes: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
