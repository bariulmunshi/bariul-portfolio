import axios from "axios";
import apiClient from "./apiClient";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/blog`;

// ---------- Public ----------

export const getPublishedBlogs = async (tag) => {
    const url = tag ? `${BASE_URL}?tag=${encodeURIComponent(tag)}` : BASE_URL;
    const { data } = await axios.get(url);
    return data.data;
};

export const getBlogBySlug = async (slug) => {
    const { data } = await axios.get(`${BASE_URL}/${slug}`);
    return data.data;
};

// ---------- Admin (authenticated) ----------

export const getAllBlogsAdmin = async () => {
    const { data } = await apiClient.get(`${BASE_URL}/admin/all`);
    return data.data;
};

export const getBlogByIdAdmin = async (id) => {
    const { data } = await apiClient.get(`${BASE_URL}/admin/${id}`);
    return data.data;
};

export const createBlog = async (payload) => {
    const { data } = await apiClient.post(BASE_URL, payload);
    return data.data;
};

export const updateBlog = async (id, payload) => {
    const { data } = await apiClient.put(`${BASE_URL}/${id}`, payload);
    return data.data;
};

export const deleteBlog = async (id) => {
    const { data } = await apiClient.delete(`${BASE_URL}/${id}`);
    return data;
};
