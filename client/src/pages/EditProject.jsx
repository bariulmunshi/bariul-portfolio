import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

const EditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            title: "",
            description: "",
            technologies: "",
            githubLink: "",
            liveLink: "",
            image: "",
            featured: false,
        });

    const [newImage, setNewImage] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {
        fetchProject();
    }, []);

    const fetchProject = async () => {
        const { data } =
            await apiClient.get(
                `${import.meta.env.VITE_API_URL}/api/projects`
            );

        const project =
            data.data.find(
                (item) => item._id === id
            );

        if (project) {
            setFormData({
                ...project,
                technologies:
                    project.technologies.join(
                        ", "
                    ),
            });
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } =
            e.target;

        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            let imageUrl =
                formData.image;

            // Upload new image if selected
            if (newImage) {
                const formDataImage =
                    new FormData();

                formDataImage.append(
                    "image",
                    newImage
                );

                const uploadRes =
                    await apiClient.post(
                        `${import.meta.env.VITE_API_URL}/api/upload`,
                        formDataImage
                    );

                imageUrl =
                    uploadRes.data.imageUrl;
            }

            await apiClient.put(
                `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
                {
                    ...formData,
                    technologies:
                        formData.technologies.split(
                            ","
                        ),
                    image: imageUrl,
                }
            );

            alert(
                "Project updated successfully"
            );

            navigate("/admin/projects");
        } catch (error) {
            console.log(error);
            alert(
                "Failed to update project"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold mb-8">
                Edit Project
            </h1>

            <form
                onSubmit={submitHandler}
                className="space-y-4"
            >
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <textarea
                    name="description"
                    value={
                        formData.description
                    }
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    type="text"
                    name="technologies"
                    value={
                        formData.technologies
                    }
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    type="text"
                    name="githubLink"
                    value={
                        formData.githubLink
                    }
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    type="text"
                    name="liveLink"
                    value={
                        formData.liveLink
                    }
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                {/* Featured checkbox */}
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="featured"
                        checked={
                            formData.featured
                        }
                        onChange={handleChange}
                    />

                    <label>
                        Featured Project
                    </label>
                </div>

                {/* Old Image Preview */}
                {formData.image && (
                    <img
                        src={formData.image}
                        alt="Project"
                        className="w-40 rounded"
                    />
                )}

                {/* New Image Upload */}
                <input
                    type="file"
                    onChange={(e) =>
                        setNewImage(
                            e.target.files[0]
                        )
                    }
                    className="w-full"
                />

                <button
                    type="submit"
                    className="border px-6 py-3 rounded"
                >
                    {loading
                        ? "Updating..."
                        : "Update Project"}
                </button>
            </form>
        </div>
    );
};

export default EditProject;