import axios from "axios";

export const getResearch =
    async () => {
        const { data } =
            await axios.get(
                `${import.meta.env.VITE_API_URL}/api/research`
            );

        return data.data;
    };