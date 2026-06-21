import { useState } from "react";
import apiClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
    const navigate = useNavigate();

    const [title, setTitle] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [technologies, setTechnologies] =
        useState("");

    const [githubLink, setGithubLink] =
        useState("");

    const [liveLink, setLiveLink] =
        useState("");

    const [featured, setFeatured] =
        useState(false);

    const [image, setImage] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            let imageUrl = "";

            // Upload image first
            if (image) {
                const formData =
                    new FormData();

                formData.append(
                    "image",
                    image
                );

                const uploadRes =
                    await apiClient.post(
                        `${import.meta.env.VITE_API_URL}/api/upload`,
                        formData
                    );

                imageUrl =
                    uploadRes.data.imageUrl;
            }

            // Save project
            await apiClient.post(
                `${import.meta.env.VITE_API_URL}/api/projects`,
                {
                    title,
                    description,
                    technologies:
                        technologies.split(","),
                    githubLink,
                    liveLink,
                    image: imageUrl,
                    featured,
                }
            );

            alert(
                "Project Added Successfully"
            );

            navigate("/admin/projects");
        } catch (error) {
            console.log(error);
            alert("Failed to add project");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold mb-8">
                Add Project
            </h1>

            <form
                onSubmit={submitHandler}
                className="space-y-4"
            >
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(
                            e.target.value
                        )
                    }
                    className="w-full border p-3 rounded"
                    required
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                    className="w-full border p-3 rounded"
                    required
                />

                <input
                    type="text"
                    placeholder="Technologies (comma separated)"
                    value={technologies}
                    onChange={(e) =>
                        setTechnologies(
                            e.target.value
                        )
                    }
                    className="w-full border p-3 rounded"
                />

                <input
                    type="text"
                    placeholder="GitHub Link"
                    value={githubLink}
                    onChange={(e) =>
                        setGithubLink(
                            e.target.value
                        )
                    }
                    className="w-full border p-3 rounded"
                />

                <input
                    type="text"
                    placeholder="Live Link"
                    value={liveLink}
                    onChange={(e) =>
                        setLiveLink(
                            e.target.value
                        )
                    }
                    className="w-full border p-3 rounded"
                />

                {/* Featured Checkbox */}
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) =>
                            setFeatured(
                                e.target.checked
                            )
                        }
                    />

                    <label>
                        Featured Project
                    </label>
                </div>

                <input
                    type="file"
                    onChange={(e) =>
                        setImage(
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
                        ? "Uploading..."
                        : "Add Project"}
                </button>
            </form>
        </div>
    );
};

export default AddProject;