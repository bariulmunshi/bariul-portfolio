import {
    Link,
    useNavigate,
} from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem(
            "adminToken"
        );

        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-64 bg-gray-900 text-white p-6">
                <h2 className="text-2xl font-bold mb-8">
                    Admin Panel
                </h2>

                <div className="space-y-4">
                    <Link
                        to="/admin/dashboard"
                        className="block"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/projects"
                        className="block"
                    >
                        Projects
                    </Link>
<Link
                        to="/admin/research"
                        className="block"
                    >
                        Research
                    </Link>
                    <Link
                        to="/admin/add-project"
                        className="block"
                    >
                        Add Project
                    </Link>
<Link
    to="/admin/add-research"
    className="block"
>
    Add Research
</Link>
                    <Link
                        to="/admin/blog"
                        className="block"
                    >
                        Blog
                    </Link>
                    <Link
                        to="/admin/add-blog"
                        className="block"
                    >
                        Add Blog Post
                    </Link>
                    <button
                        onClick={logoutHandler}
                        className="block text-left"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="flex-1 p-10">
                <h1 className="text-4xl font-bold mb-6">
                    Dashboard
                </h1>

                <div className="border rounded-xl p-6">
                    <h2 className="text-2xl font-semibold">
                        Welcome Bariul
                    </h2>

                    <p className="mt-3">
                        Manage your portfolio
                        projects, research works
                        and content.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;