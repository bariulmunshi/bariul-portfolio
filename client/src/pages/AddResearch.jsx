import { useState } from "react";
import apiClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";

const AddResearch = () => {
    const navigate = useNavigate();

    const [title, setTitle] =
        useState("");

    const [journal, setJournal] =
        useState("");

    const [year, setYear] =
        useState("");

    const [abstract, setAbstract] =
        useState("");

    const [paperLink, setPaperLink] =
        useState("");

    const [githubLink, setGithubLink] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await apiClient.post(
                `${import.meta.env.VITE_API_URL}/api/research`,
                {
                    title,
                    journal,
                    year,
                    abstract,
                    paperLink,
                    githubLink,
                }
            );

            alert(
                "Research Added Successfully"
            );

            navigate(
                "/admin/research"
            );
        } catch (error) {
            console.log(error);
            alert(
                "Failed to add research"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold mb-8">
                Add Research
            </h1>

            <form
                onSubmit={submitHandler}
                className="space-y-4"
            >
                <input
                    type="text"
                    placeholder="Research Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(
                            e.target.value
                        )
                    }
                    className="w-full border p-3 rounded"
                    required
                />

                <input
                    type="text"
                    placeholder="Journal / Conference"
                    value={journal}
                    onChange={(e) =>
                        setJournal(
                            e.target.value
                        )
                    }
                    className="w-full border p-3 rounded"
                    required
                />

                <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) =>
                        setYear(
                            e.target.value
                        )
                    }
                    className="w-full border p-3 rounded"
                    required
                />

                <textarea
                    placeholder="Abstract"
                    value={abstract}
                    onChange={(e) =>
                        setAbstract(
                            e.target.value
                        )
                    }
                    className="w-full border p-3 rounded"
                    required
                />

                <input
                    type="text"
                    placeholder="Paper Link"
                    value={paperLink}
                    onChange={(e) =>
                        setPaperLink(
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

                <button
                    type="submit"
                    className="border px-6 py-3 rounded"
                >
                    {loading
                        ? "Saving..."
                        : "Add Research"}
                </button>
            </form>
        </div>
    );
};

export default AddResearch; 