"use client";

import {
	Editor,
	EditorContent,
	EditorContext,
	ReactNodeViewRenderer,
	useEditor,
} from "@tiptap/react";
import * as React from "react";

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
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
	Toolbar,
	ToolbarGroup,
	ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { BlockQuoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import {
	ColorHighlightPopover,
	ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover";
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { LinkButton, LinkPopover } from "@/components/tiptap-ui/link-popover";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

// --- Icons ---

// --- Hooks ---
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";

// --- Components ---

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

// import content from "@/components/tiptap-templates/simple/data/content.json";
import { useState } from "react";

import Placeholder from "@tiptap/extension-placeholder";

import { publishBlog } from "@/app/actions";
import CodeBlockComponent from "@/components/custom-tiptap/CodeBlock";
import { Button as ShadCnButton } from "@/components/ui/button";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Document } from "@tiptap/extension-document";
import { all, createLowlight } from "lowlight";
import { useSession } from "next-auth/react";

const lowlight = createLowlight(all);

const MainToolbarContent = ({
	onHighlighterClick,
	onLinkClick,
	isMobile,
	isEditable,
	isViewing,
}: {
	onHighlighterClick: () => void;
	onLinkClick: () => void;
	isMobile: boolean;
	isEditable: boolean;
	isViewing: boolean;
}) => {
	return (
		<>
			{isEditable && !isViewing && (
				<>
					<Spacer />

					<ToolbarGroup>
						<UndoRedoButton action="undo" />
						<UndoRedoButton action="redo" />
					</ToolbarGroup>

					<ToolbarSeparator />

					<ToolbarGroup>
						<HeadingDropdownMenu levels={[1, 2, 3, 4]} />
						<ListDropdownMenu
							types={["bulletList", "orderedList", "taskList"]}
						/>
						<BlockQuoteButton />
						<CodeBlockButton />
					</ToolbarGroup>

					<ToolbarSeparator />

					<ToolbarGroup>
						<MarkButton type="bold" />
						<MarkButton type="italic" />
						<MarkButton type="strike" />
						<MarkButton type="code" />
						<MarkButton type="underline" />
						{!isMobile ? (
							<ColorHighlightPopover />
						) : (
							<ColorHighlightPopoverButton onClick={onHighlighterClick} />
						)}
						{!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
					</ToolbarGroup>

					<ToolbarSeparator />

					<ToolbarGroup>
						<MarkButton type="superscript" />
						<MarkButton type="subscript" />
					</ToolbarGroup>

					<ToolbarSeparator />

					<ToolbarGroup>
						<TextAlignButton align="left" />
						<TextAlignButton align="center" />
						<TextAlignButton align="right" />
						<TextAlignButton align="justify" />
					</ToolbarGroup>

					<ToolbarSeparator />

					<ToolbarGroup>
						<ImageUploadButton text="Add" />
					</ToolbarGroup>

					<Spacer />

					{isMobile && <ToolbarSeparator />}
				</>
			)}
		</>
	);
};

type SimpleEditorProps = {
	isEditable: boolean;
	isViewing?: boolean;
	blogTitle?: string;
	blogDescription?: string;
	blogContent?: string;
};

export function SimpleEditor({
	isEditable,
	isViewing,
	blogTitle,
	blogDescription,
	blogContent,
}: SimpleEditorProps) {
	const session = useSession();

	const isMobile = useIsMobile();
	const windowSize = useWindowSize();
	const [mobileView, setMobileView] = React.useState<
		"main" | "highlighter" | "link"
	>("main");
	const toolbarRef = React.useRef<HTMLDivElement>(null);

	const [title, setTitle] = useState(blogTitle ?? "");
	const [description, setDescription] = useState(blogDescription ?? "");
	const [content, setContent] = useState(blogContent ?? "");
	const [isPublishing, setPublishing] = useState(false);

	const TitleDocument = Document.extend({
		content: "heading",
	});

	const DescriptionDocument = Document.extend({
		content: "paragraph",
	});

	const titleEditor = useEditor({
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
		],
		content: content,
		onUpdate: ({ editor }: { editor: Editor }) => {
			setContent(editor.getHTML());
		},
	});

	const shouldDisable = () =>
		titleEditor?.isEmpty || editor?.isEmpty || !isEditable;

	const bodyRect = useCursorVisibility({
		editor,
		overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
	});

	React.useEffect(() => {
		if (!isMobile && mobileView !== "main") {
			setMobileView("main");
		}
	}, [isMobile, mobileView]);

	return (
		<EditorContext.Provider value={{ editor }}>
			{!isViewing && (
				<div className="flex gap-2 justify-end mt-3">
					<ShadCnButton
						className="disabled:cursor-not-allowed"
						disabled={shouldDisable()}
					>
						Save as Draft
					</ShadCnButton>
					<ShadCnButton
						className="disabled:cursor-not-allowed"
						disabled={shouldDisable()}
						onClick={async () => {
							try {
								setPublishing(true);
								await publishBlog(
									{
										title,
										description,
										content,
									},
									session.data?.user?.email as string
								);
							} catch (err) {
								console.error("Error in publishing a blog", err);
							} finally {
								setPublishing(false);
							}
						}}
					>
						{isPublishing ? "Publishing..." : "Publish"}
					</ShadCnButton>
				</div>
			)}

			<Toolbar
				ref={toolbarRef}
				style={
					isMobile
						? {
								bottom: `calc(100% - ${windowSize.height - bodyRect.y}px)`,
								overflow: "auto",
						  }
						: {}
				}
				className="overflow-x-auto mt-3 "
				variant={`${isMobile ? "floating" : "fixed"}`}
			>
				{/* {mobileView === "main" && !isViewing ? (
					<MainToolbarContent
						onHighlighterClick={() => setMobileView("highlighter")}
						onLinkClick={() => setMobileView("link")}
						isMobile={isMobile}
					/>
				) : (
					<MobileToolbarContent
						type={mobileView === "highlighter" ? "highlighter" : "link"}
						onBack={() => setMobileView("main")}
					/>
				)} */}
				<MainToolbarContent
					onHighlighterClick={() => setMobileView("highlighter")}
					onLinkClick={() => setMobileView("link")}
					isMobile={isMobile}
					isEditable={isEditable}
					isViewing={isViewing as boolean}
				/>
			</Toolbar>

			<div className="content-wrapper  overflow-y-scroll">
				<EditorContent editor={titleEditor} className="title-editor-content" />
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
