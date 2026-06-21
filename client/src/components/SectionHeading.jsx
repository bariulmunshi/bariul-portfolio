/**
 * Consistent section header: mono-tag eyebrow (numbered/labeled by
 * the index the content actually has) + display heading + optional
 * supporting copy.
 */
const SectionHeading = ({
    eyebrow,
    title,
    description,
    align = "left",
}) => {
    const alignClass =
        align === "center"
            ? "text-center mx-auto"
            : "text-left";

    return (
        <div
            data-reveal
            className={`mb-12 md:mb-16 max-w-2xl ${alignClass}`}
        >
            {eyebrow && (
                <p className="font-mono-tag text-xs md:text-sm text-signal-600 dark:text-signal-400 mb-3 flex items-center gap-2 not-italic">
                    {align === "center" && (
                        <span className="inline-block w-2 h-2 rounded-full bg-signal-500" />
                    )}
                    {eyebrow}
                </p>
            )}
            <h2
                className="
                    font-[var(--font-display)]
                    text-3xl md:text-4xl
                    font-semibold
                    tracking-tight
                    text-ink-950 dark:text-paper-50
                "
            >
                {title}
            </h2>
            {description && (
                <p className="mt-4 text-base md:text-lg leading-7 text-ink-600 dark:text-paper-100/60">
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeading;
