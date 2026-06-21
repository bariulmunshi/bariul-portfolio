import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const AdminResearch = () => {
    const [research, setResearch] =
        useState([]);

    useEffect(() => {
        fetchResearch();
    }, []);

    const fetchResearch = async () => {
        try {
            const { data } =
                await apiClient.get(
                    `${import.meta.env.VITE_API_URL}/api/research`
                );

            setResearch(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteHandler = async (id) => {
        const confirmDelete =
            window.confirm(
                "Delete this research?"
            );

        if (!confirmDelete) return;

        try {
            await apiClient.delete(
                `${import.meta.env.VITE_API_URL}/api/research/${id}`
            );

            alert(
                "Research deleted successfully"
            );

            fetchResearch();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold mb-8">
                All Research
            </h1>

            <div className="space-y-4">
                {research.map((item) => (
                    <div
                        key={item._id}
                        className="border p-5 rounded-xl"
                    >
                        <h2 className="text-xl font-bold">
                            {item.title}
                        </h2>

                        <p className="mt-2">
                            {item.journal} (
                            {item.year})
                        </p>

                        <a
                            href={
                                item.paperLink
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="underline block mt-3"
                        >
                            View Paper
                        </a>

                        <button
                            onClick={() =>
                                deleteHandler(
                                    item._id
                                )
                            }
                            className="mt-4 border px-4 py-2 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminResearch;