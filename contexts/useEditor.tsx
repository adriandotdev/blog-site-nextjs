"use client";

import { Editor, ReactNodeViewRenderer } from "@tiptap/react";
import {
	createContext,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";

import { useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Underline } from "@tiptap/extension-underline";
import { StarterKit } from "@tiptap/starter-kit";

// --- Custom Extensions ---
import { Link } from "@/components/tiptap-extension/link-extension";
import { Selection } from "@/components/tiptap-extension/selection-extension";
import { TrailingNode } from "@/components/tiptap-extension/trailing-node-extension";

// --- UI Primitives ---

// --- Tiptap Node ---
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---

// --- Icons ---

// --- Hooks ---

// --- Components ---

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

// import content from "@/components/tiptap-templates/simple/data/content.json";

import Placeholder from "@tiptap/extension-placeholder";

import CodeBlockComponent from "@/components/custom-tiptap/CodeBlock";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Document } from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import { all, createLowlight } from "lowlight";

const lowlight = createLowlight(all);

interface EditorContextType {
	titleEditor: Editor;
	descriptionEditor: Editor;
	editor: Editor;
	title: string;
	setTitle: React.Dispatch<SetStateAction<string>>;
	description: string;
	setDescription: React.Dispatch<SetStateAction<string>>;
	content: string;
	setContent: React.Dispatch<SetStateAction<string>>;
}

// 2. Create the context with a default value (optional)
const CustomEditorContext = createContext<EditorContextType | undefined>(
	undefined
);

// 3. Provider component
export const EditorProvider = ({ children }: { children: ReactNode }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [description, setDescription] = useState("");

	const TitleDocument = Document.extend({
		content: "heading",
	});

	const DescriptionDocument = Document.extend({
		content: "paragraph",
	});

	const titleEditor = useEditor({
		immediatelyRender: false,
		extensions: [
			TitleDocument,
			StarterKit.configure({
				document: false,
				heading: {
					levels: [1],
				},
			}),
			Placeholder.configure({
				placeholder: "Your title here",
			}),
		],
		content: title,

		onUpdate: ({ editor }: { editor: Editor }) => {
			setTitle(editor.getHTML());
		},
	});

	const descriptionEditor = useEditor({
		immediatelyRender: false,
		extensions: [
			DescriptionDocument,
			StarterKit.configure({
				document: false,
			}),
			Placeholder.configure({
				placeholder: "Your description here",
			}),
		],
		content: description,
		onUpdate: ({ editor }: { editor: Editor }) => {
			setDescription(editor.getHTML());
		},
	});

	const editor = useEditor({
		immediatelyRender: false,
		editorProps: {
			attributes: {
				autocomplete: "off",
				autocorrect: "off",
				autocapitalize: "off",
				"aria-label": "Main content area, start typing to enter text.",
			},
		},
		editable: true,
		extensions: [
			StarterKit.configure({
				codeBlock: false,
			}),
			TextAlign.configure({ types: ["heading", "paragraph"] }),
			Underline,
			TaskList,
			TaskItem.configure({ nested: true }),
			Highlight.configure({ multicolor: true }),
			Image,
			Typography,
			Superscript,
			Subscript,
			Selection,
			ImageUploadNode.configure({
				accept: "image/*",
				maxSize: MAX_FILE_SIZE,
				limit: 3,
				upload: handleImageUpload,
				onError: (error) => console.error("Upload failed:", error),
			}),
			TrailingNode,
			Link.configure({ openOnClick: false }),
			CodeBlockLowlight.extend({
				addNodeView() {
					return ReactNodeViewRenderer(CodeBlockComponent);
				},
			}).configure({
				lowlight,
				defaultLanguage: "javascript",
				languageClassPrefix: "language-",
				exitOnArrowDown: true,
			}),
			Placeholder.configure({
				placeholder: ({ node }) => {
					switch (node.type.name) {
						case "heading":
							return `Heading ${node.attrs.level}`;
						case "paragraph":
							return "Write something...";
						case "blockquote":
							return "Blockquote...";
						case "bulletList":
							return "List your ideas...";
						case "orderedList":
							return "Add steps or a sequence...";
						case "taskList":
							return "Add a task...";
						default:
							return "Write something...";
					}
				},
			}),
			Dropcursor,
		],
		content: content,
		onUpdate: ({ editor }: { editor: Editor }) => {
			setContent(editor.getHTML());
		},
	});

	return (
		<CustomEditorContext.Provider
			value={{
				titleEditor: titleEditor!,
				descriptionEditor: descriptionEditor!,
				editor: editor!,
				title,
				setTitle,
				description,
				setDescription,
				content,
				setContent,
			}}
		>
			{children}
		</CustomEditorContext.Provider>
	);
};

// 4. Custom hook to consume the context
export const useCustomEditor = (): EditorContextType => {
	const context = useContext(CustomEditorContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
