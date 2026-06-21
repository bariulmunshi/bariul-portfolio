import mongoose from "mongoose";

const researchSchema =
    new mongoose.Schema(
        {
            title: {
                type: String,
                required: true,
            },

            journal: {
                type: String,
                required: true,
            },

            year: {
                type: Number,
                required: true,
            },

            abstract: {
                type: String,
                required: true,
            },

            paperLink: {
                type: String,
                default: "",
            },

            githubLink: {
                type: String,
                default: "",
            },
        },
        {
            timestamps: true,
        }
    );

const Research = mongoose.model(
    "Research",
    researchSchema
);

export default Research;