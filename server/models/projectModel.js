import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        technologies: {
            type: [String],
            required: true,
        },

        githubLink: {
            type: String,
            default: "",
        },

        liveLink: {
            type: String,
            default: "",
        },

        image: {
            type: String,
            default: "",
        },

        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;