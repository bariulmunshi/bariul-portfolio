import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIChatWidget from "./components/AIChatWidget";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";

// Blog and all /admin pages are code-split: regular visitors never
// download the rich-text editor or admin-only bundles.
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminProjects = lazy(() => import("./pages/AdminProjects"));
const AddProject = lazy(() => import("./pages/AddProject"));
const EditProject = lazy(() => import("./pages/EditProject"));
const AddResearch = lazy(() => import("./pages/AddResearch"));
const AdminResearch = lazy(() => import("./pages/AdminResearch"));
const AdminBlog = lazy(() => import("./pages/AdminBlog"));
const AddBlog = lazy(() => import("./pages/AddBlog"));
const EditBlog = lazy(() => import("./pages/EditBlog"));

import ProtectedRoute from "./components/ProtectedRoute";

const PageFallback = () => (
    <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-signal-500 border-t-transparent animate-spin" />
    </div>
);

function AppShell() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");

    return (
        <div
            className="
                min-h-screen
                bg-paper-50
                text-ink-950
                dark:bg-ink-950
                dark:text-paper-50
                transition-colors duration-300
            "
        >
            {/* Public Pages */}
            <Navbar />

            <Suspense fallback={<PageFallback />}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />

                {/* Admin Routes */}
                <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/projects"
                    element={
                        <ProtectedRoute>
                            <AdminProjects />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/add-project"
                    element={
                        <ProtectedRoute>
                            <AddProject />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/edit-project/:id"
                    element={
                        <ProtectedRoute>
                            <EditProject />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/add-research"
                    element={
                        <ProtectedRoute>
                            <AddResearch />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/research"
                    element={
                        <ProtectedRoute>
                            <AdminResearch />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/blog"
                    element={
                        <ProtectedRoute>
                            <AdminBlog />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/add-blog"
                    element={
                        <ProtectedRoute>
                            <AddBlog />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/edit-blog/:id"
                    element={
                        <ProtectedRoute>
                            <EditBlog />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            </Suspense>

            {/* Global Footer */}
            <Footer />

            {/* AI assistant — visitor-facing only, hidden on admin routes */}
            {!isAdminRoute && <AIChatWidget />}
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppShell />
        </BrowserRouter>
    );
}

export default App;