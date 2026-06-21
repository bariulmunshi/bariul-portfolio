import useScrollReveal from "../hooks/useScrollReveal";

const links = [
    {
        label: "Email",
        value: "mdbariulmunshi@gmail.com",
        href: "mailto:mdbariulmunshi@gmail.com",
    },
    {
        label: "LinkedIn",
        value: "linkedin.com/in/mdbariulmunshi",
        href: "https://www.linkedin.com/in/mdbariulmunshi",
    },
    {
        label: "GitHub",
        value: "github.com/bariulmunshi",
        href: "https://github.com/bariulmunshi",
    },
];

const ContactSection = () => {
    const scopeRef = useScrollReveal();

    return (
        <section
            ref={scopeRef}
            className="px-6 md:px-8 pb-20 md:pb-28 max-w-3xl mx-auto"
        >
            <div
                data-reveal
                className="grid sm:grid-cols-3 gap-4"
            >
                {links.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        target={link.label !== "Email" ? "_blank" : undefined}
                        rel="noreferrer"
                        className="
                            rounded-2xl p-5 text-center
                            border border-ink-950/10 dark:border-paper-50/10
                            bg-white dark:bg-ink-900
                            transition-all duration-300
                            hover:border-signal-500/40 hover:-translate-y-1
                        "
                    >
                        <p className="font-mono-tag text-xs text-signal-600 dark:text-signal-400 mb-1.5">
                            {link.label}
                        </p>
                        <p className="text-sm text-ink-700 dark:text-paper-100/75 break-all">
                            {link.value}
                        </p>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default ContactSection;
