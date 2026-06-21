import Project from "../models/projectModel.js";

/*
GET All Projects
*/
export const getProjects = async (
    req,
    res
) => {
    try {
        const projects =
            await Project.find().sort({
                createdAt: -1,
            });

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
CREATE Project
*/
export const createProject = async (
    req,
    res
) => {
    try {
        const project =
            await Project.create(req.body);

        res.status(201).json({
            success: true,
            data: project,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/*
DELETE Project
*/
export const deleteProject = async (
    req,
    res
) => {
    try {
        const project =
            await Project.findById(
                req.params.id
            );

        if (!project) {
            return res.status(404).json({
                success: false,
                message:
                    "Project not found",
            });
        }

        await Project.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message:
                "Project deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
/*
UPDATE Project
*/
export const updateProject = async (
    req,
    res
) => {
    try {
        const project =
            await Project.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                }
            );

        if (!project) {
            return res.status(404).json({
                success: false,
                message:
                    "Project not found",
            });
        }

        res.status(200).json({
            success: true,
            data: project,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};