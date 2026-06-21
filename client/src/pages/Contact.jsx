/* const Contact = () => {
    return (
        <div className="p-8">
            Contact Page
        </div>
    );
};

export default Contact; */

import ContactForm from "../components/ContactForm";

const Contact = () => {
    return (
        <section className="px-8 py-20 max-w-6xl mx-auto">
            {/* Heading */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold">
                    Contact Me
                </h1>

                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-7">
                    Open for research collaboration,
                    freelance opportunities, academic
                    discussions, and tech projects.
                </p>
            </div>

            {/* Contact Form */}
            <ContactForm />

            {/* Contact Details */}
            <div className="mt-16 grid md:grid-cols-2 gap-8">
                <div className="border rounded-xl p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Direct Contact
                    </h2>

                    <p className="mb-3">
                        📧 Email:
                        mdbariulmunshi@gmail.com
                    </p>

                    <p className="mb-3">
                        📱 WhatsApp:
                        +8801894009091
                    </p>

                    <p>
                        📍 Location:
                        Dhaka, Bangladesh
                    </p>
                </div>

                <div className="border rounded-xl p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Social Links
                    </h2>

                    <div className="space-y-3">
                        <a
                            href="https://www.linkedin.com/in/mdbariulmunshi/"
                            target="_blank"
                            rel="noreferrer"
                            className="block underline"
                        >
                            LinkedIn
                        </a>

                        <a
                            href="https://github.com/bariulmunshi"
                            target="_blank"
                            rel="noreferrer"
                            className="block underline"
                        >
                            GitHub
                        </a>

                        <a
                            href="https://www.facebook.com/mdbariulmunshi1/"
                            target="_blank"
                            rel="noreferrer"
                            className="block underline"
                        >
                            Facebook
                        </a>
                    </div>
                </div>
            </div>

            {/* Availability */}
            <div className="mt-12 border rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Availability
                </h2>

                <p className="leading-7">
                    Currently available for:
                    research collaboration, AI/ML
                    projects, portfolio development,
                    and freelance opportunities.
                </p>
            </div>
        </section>
    );
};

export default Contact;