import Research from "../models/researchModel.js";

// Get all research
export const getResearch =
    async (req, res) => {
        try {
            const research =
                await Research.find().sort({
                    createdAt: -1,
                });

            res.json({
                success: true,
                data: research,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// Add research
export const createResearch =
    async (req, res) => {
        try {
            const research =
                await Research.create(
                    req.body
                );

            res.status(201).json({
                success: true,
                data: research,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// Delete research
export const deleteResearch =
    async (req, res) => {
        try {
            await Research.findByIdAndDelete(
                req.params.id
            );

            res.json({
                success: true,
                message:
                    "Research deleted successfully",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };