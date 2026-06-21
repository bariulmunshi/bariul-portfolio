import { useCallback, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import apiClient from "../services/apiClient";

const ToolbarButton = ({ onClick, active, children, label }) => (
    <button
        type="button"
        onClick={onClick}
        aria-label={label}
        title={label}
        className={`
            px-2.5 py-1.5 rounded-lg text-sm font-medium
            transition-colors
            ${
                active
                    ? "bg-ink-950 text-paper-50 dark:bg-paper-50 dark:text-ink-950"
                    : "text-ink-700 dark:text-paper-100/80 hover:bg-ink-950/5 dark:hover:bg-paper-50/10"
            }
        `}
    >
        {children}
    </button>
);

const RichTextEditor = ({ value, onChange, placeholder }) => {
    const fileInputRef = useRef(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-signal-600 dark:text-signal-400 underline underline-offset-2",
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "rounded-xl my-4 max-w-full",
                },
            }),
            Placeholder.configure({
                placeholder: placeholder || "Start writing...",
            }),
        ],
        content: value || "",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose-editor focus:outline-none min-h-[300px] px-4 py-3",
            },
        },
    });

    const handleSetLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl || "https://");
        if (url === null) return;
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }, [editor]);

    const handleImageButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !editor) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const { data } = await apiClient.post(
                `${import.meta.env.VITE_API_URL}/api/upload`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            if (data?.imageUrl) {
                editor.chain().focus().setImage({ src: data.imageUrl }).run();
            }
        } catch (err) {
            alert("Image upload failed. Please try again.");
        } finally {
            e.target.value = "";
        }
    };

    if (!editor) return null;

    return (
        <div className="border border-ink-950/15 dark:border-paper-50/15 rounded-2xl overflow-hidden bg-paper-50 dark:bg-ink-900">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-ink-950/10 dark:border-paper-50/10 bg-ink-950/[0.02] dark:bg-paper-50/[0.03]">
                <ToolbarButton
                    label="Bold"
                    active={editor.isActive("bold")}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <strong>B</strong>
                </ToolbarButton>
                <ToolbarButton
                    label="Italic"
                    active={editor.isActive("italic")}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <em>I</em>
                </ToolbarButton>
                <ToolbarButton
                    label="Strikethrough"
                    active={editor.isActive("strike")}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <span className="line-through">S</span>
                </ToolbarButton>

                <span className="w-px h-5 bg-ink-950/10 dark:bg-paper-50/15 mx-1" />

                <ToolbarButton
                    label="Heading 2"
                    active={editor.isActive("heading", { level: 2 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                >
                    H2
                </ToolbarButton>
                <ToolbarButton
                    label="Heading 3"
                    active={editor.isActive("heading", { level: 3 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                >
                    H3
                </ToolbarButton>

                <span className="w-px h-5 bg-ink-950/10 dark:bg-paper-50/15 mx-1" />

                <ToolbarButton
                    label="Bullet list"
                    active={editor.isActive("bulletList")}
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    • List
                </ToolbarButton>
                <ToolbarButton
                    label="Numbered list"
                    active={editor.isActive("orderedList")}
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    1. List
                </ToolbarButton>
                <ToolbarButton
                    label="Quote"
                    active={editor.isActive("blockquote")}
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                >
                    " Quote
                </ToolbarButton>
                <ToolbarButton
                    label="Code block"
                    active={editor.isActive("codeBlock")}
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                >
                    {"</>"}
                </ToolbarButton>

                <span className="w-px h-5 bg-ink-950/10 dark:bg-paper-50/15 mx-1" />

                <ToolbarButton
                    label="Link"
                    active={editor.isActive("link")}
                    onClick={handleSetLink}
                >
                    🔗 Link
                </ToolbarButton>
                <ToolbarButton label="Insert image" onClick={handleImageButtonClick}>
                    🖼 Image
                </ToolbarButton>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageFileChange}
                />

                <span className="w-px h-5 bg-ink-950/10 dark:bg-paper-50/15 mx-1" />

                <ToolbarButton
                    label="Undo"
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    ↺
                </ToolbarButton>
                <ToolbarButton
                    label="Redo"
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    ↻
                </ToolbarButton>
            </div>

            {/* Editable area */}
            <EditorContent editor={editor} />
        </div>
    );
};

export default RichTextEditor;
