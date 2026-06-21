import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLogin = () => {
    const navigate = useNavigate();
console.log(import.meta.env.VITE_API_URL);
    const [email, setEmail] = useState("");
    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data } =
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/auth/login`,
                    {
                        email,
                        password,
                    }
                );

            localStorage.setItem(
                "adminToken",
                data.token
            );

            alert("Login Successful");

            navigate("/admin/dashboard");
        } finally {
            setLoading(false);
        }
    };
useEffect(() => {
    const token =
        localStorage.getItem("adminToken");

    if (token) {
        navigate("/admin/dashboard");
    }
}, [navigate]);
    return (
        <div className="min-h-screen flex justify-center items-center">
            <form
                onSubmit={submitHandler}
                className="w-full max-w-md p-8 border rounded-xl"
            >
                <h1 className="text-3xl font-bold mb-6">
                    Admin Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                    className="w-full border p-3 mb-4 rounded"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                    className="w-full border p-3 mb-4 rounded"
                    required
                />

                <button
                    type="submit"
                    className="w-full border p-3 rounded"
                >
                    {loading
                        ? "Logging In..."
                        : "Login"}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;