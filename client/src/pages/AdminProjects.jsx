import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { Link } from "react-router-dom";

const AdminProjects = () => {
    const [projects, setProjects] =
        useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } =
                await apiClient.get(
                    `${import.meta.env.VITE_API_URL}/api/projects`
                );

            setProjects(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProject = async (id) => {
        try {
            await apiClient.delete(
                `${import.meta.env.VITE_API_URL}/api/projects/${id}`
            );

            setProjects(
                projects.filter(
                    (project) =>
                        project._id !== id
                )
            );

            alert(
                "Project deleted successfully"
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold mb-8">
                All Projects
            </h1>

            <div className="space-y-4">
                {projects.map((project) => (
                    <div
                        key={project._id}
                        className="border p-5 rounded-xl"
                    >
                        <h2 className="text-xl font-bold">
                            {project.title}
                        </h2>

                        <p className="mt-2">
                            {project.description}
                        </p>

                        <button
                            onClick={() =>
                                deleteProject(
                                    project._id
                                )
                            }
                            className="mt-4 border px-4 py-2 rounded bg-red-500 text-white"
                        >
                            Delete
                        </button>
                        <Link
    to={`/admin/edit-project/${project._id}`}
    className="mt-4 ml-3 border px-4 py-2 rounded"
>
    Edit
</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminProjects;