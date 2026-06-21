import axios from "axios";

/**
 * Shared axios instance for authenticated (admin) API calls.
 * Automatically attaches the JWT from localStorage as a Bearer token,
 * so individual service files don't need to repeat this logic.
 */
const apiClient = axios.create();

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// If a token is invalid/expired, the backend returns 401 — bounce back
// to login rather than leaving the admin stuck on a broken page.
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem("adminToken");
            if (
                typeof window !== "undefined" &&
                !window.location.pathname.startsWith("/admin/login")
            ) {
                window.location.href = "/admin/login";
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
