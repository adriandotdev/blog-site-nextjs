/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
	Editor,
	EditorContent,
	EditorContext,
	ReactNodeViewRenderer,
	useEditor,
} from "@tiptap/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
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

// --- Tiptap Node ---
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Hooks ---
import { useIsMobile } from "@/hooks/use-mobile";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

import Placeholder from "@tiptap/extension-placeholder";

import CodeBlockComponent from "@/components/custom-tiptap/CodeBlock";
import { Separator } from "@/components/tiptap-ui-primitive/separator";
import { SelectBlogs } from "@/db/schema";
import { cn, estimateReadTimeFromHTML } from "@/lib/utils";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Document } from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import { isNil } from "lodash";
import { all, createLowlight } from "lowlight";
import { useSession } from "next-auth/react";

const lowlight = createLowlight(all);

type SimpleEditorProps = {
	isEditable: boolean;
	isViewing?: boolean;
	blog: SelectBlogs;
};

export function SimpleEditor({ isEditable, blog }: SimpleEditorProps) {
	const session = useSession();

	const isMobile = useIsMobile();
	const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
		"main"
	);

	// States
	const [title, setTitle] = useState(blog.title ?? "");
	const [description, setDescription] = useState(blog.description ?? "");
	const [content, setContent] = useState(blog.content ?? "");

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
		editable: isEditable,
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
				placeholder: "Blog description",
			}),
		],
		editable: isEditable,
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
		editable: isEditable,
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
				placeholder: "Write something…",
			}),
			Dropcursor,
		],
		content: content,
		onUpdate: ({ editor }: { editor: Editor }) => {
			setContent(editor.getHTML());
		},
	});

	useEffect(() => {
		if (!isMobile && mobileView !== "main") {
			setMobileView("main");
		}
	}, [isMobile, mobileView]);

	useEffect(() => {
		if (!isNil(blog)) {
			setTitle(blog.title);
			setDescription(blog.description ?? "");
			setContent(blog.content);

			titleEditor?.commands.setContent(blog.title);
			descriptionEditor?.commands.setContent(blog.description);
			editor?.commands.setContent(blog.content);
		}
	}, [blog, titleEditor, descriptionEditor, editor]);

	return (
		<EditorContext.Provider value={{ editor }}>
			<div className={cn("content-wrapper overflow-y-hidden p-0")}>
				<EditorContent editor={titleEditor} className="title-editor-content " />
				{editor && (
					<>
						<div className="max-w-[640px] my-0 mx-auto px-[2.5rem] w-full mb-3 flex justify-between flex-wrap mt-2">
							<p className="font-medium">{session.data?.user?.name}</p>
							<div className="flex gap-3 text-gray-500 font-medium dark:text-gray-400">
								<p>{estimateReadTimeFromHTML(content)}</p>
								{"·"}
								<p>{format(new Date(blog.updatedAt), "MMMM d, yyyy")}</p>
							</div>
						</div>
						<div className="px-[2.5rem]">
							<Separator
								orientation="horizontal"
								className=" max-w-[550px] w-full ] border-[0.5] my-0 mx-auto mb-3"
							/>
						</div>
					</>
				)}

				<EditorContent
					editor={descriptionEditor}
					className="description-editor-content"
				/>
				<EditorContent
					editor={editor}
					role="presentation"
					className="simple-editor-content"
				/>
			</div>
		</EditorContext.Provider>
	);
}
