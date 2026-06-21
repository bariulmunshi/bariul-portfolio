import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-ink-950/10 dark:border-paper-50/10 bg-paper-50 dark:bg-ink-950">
            <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 grid md:grid-cols-4 gap-10">
                <div>
                    <h2 className="font-[var(--font-display)] text-2xl font-semibold mb-4 text-ink-950 dark:text-paper-50">
                        Md. Bariul Munshi
                    </h2>

                    <p className="leading-7 text-ink-600 dark:text-paper-100/60">
                        Instructor, researcher, and Healthcare AI
                        enthusiast focused on building practical
                        AI systems, teaching future technologists,
                        and creating impactful digital solutions.
                    </p>
                </div>

                <div>
                    <h3 className="font-mono-tag text-xs text-signal-600 dark:text-signal-400 mb-4">
                        Quick Links
                    </h3>

                    <div className="flex flex-col gap-3 text-ink-700 dark:text-paper-100/75">
                        <Link to="/" className="hover:text-signal-600 dark:hover:text-signal-400 transition-colors w-fit">Home</Link>
                        <Link to="/about" className="hover:text-signal-600 dark:hover:text-signal-400 transition-colors w-fit">About</Link>
                        <Link to="/projects" className="hover:text-signal-600 dark:hover:text-signal-400 transition-colors w-fit">Projects</Link>
                        <Link to="/blog" className="hover:text-signal-600 dark:hover:text-signal-400 transition-colors w-fit">Blog</Link>
                        <Link to="/courses" className="hover:text-signal-600 dark:hover:text-signal-400 transition-colors w-fit">Courses</Link>
                        <Link to="/contact" className="hover:text-signal-600 dark:hover:text-signal-400 transition-colors w-fit">Contact</Link>
                    </div>
                </div>

                <div>
                    <h3 className="font-mono-tag text-xs text-signal-600 dark:text-signal-400 mb-4">
                        Contact
                    </h3>

                    <div className="space-y-3 text-ink-700 dark:text-paper-100/75">
                        <p>📍 Mirpur-1, Dhaka, Bangladesh</p>
                        <p>📧 mdbariulmunshi@gmail.com</p>
                        <p>📱 +8801894009091</p>
                        <p>💬 WhatsApp Available</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-mono-tag text-xs text-signal-600 dark:text-signal-400 mb-4">
                        Connect
                    </h3>

                    <div className="flex flex-col gap-3 text-ink-700 dark:text-paper-100/75">
                        <a href="https://www.linkedin.com/in/mdbariulmunshi/" target="_blank" rel="noreferrer" className="hover:text-signal-600 dark:hover:text-signal-400 transition-colors w-fit">LinkedIn</a>
                        <a href="https://github.com/bariulmunshi" target="_blank" rel="noreferrer" className="hover:text-signal-600 dark:hover:text-signal-400 transition-colors w-fit">GitHub</a>
                        <a href="https://www.youtube.com/@BariulAcademy" target="_blank" rel="noreferrer" className="hover:text-signal-600 dark:hover:text-signal-400 transition-colors w-fit">Bariul Academy</a>
                        <a href="https://www.facebook.com/mdbariulmunshi1" target="_blank" rel="noreferrer" className="hover:text-signal-600 dark:hover:text-signal-400 transition-colors w-fit">Facebook</a>
                    </div>
                </div>
            </div>

            <div className="border-t border-ink-950/10 dark:border-paper-50/10 text-center py-6 px-6 text-sm text-ink-600 dark:text-paper-100/50">
                <p>© 2026 Md. Bariul Munshi. All Rights Reserved.</p>
                <p className="mt-2">Built with React, Node.js, Express, MongoDB, and Tailwind CSS.</p>
                <p className="mt-2">Designed & Developed by Md. Bariul Munshi</p>
            </div>
        </footer>
    );
};

export default Footer;
