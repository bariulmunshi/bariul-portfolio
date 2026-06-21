import axios from "axios";

// const API_URL = "http://localhost:5000/api/projects";
//const API_URL = "https://your-backend.onrender.com/api/projects";
const API_URL = "https://bariul-portfolio.onrender.com/api/projects";

export const getProjects = async () => {
    const response = await axios.get(API_URL);

    return response.data.data;
};  