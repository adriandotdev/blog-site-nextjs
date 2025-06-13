"use client";

import { BubbleMenu, EditorContent } from "@tiptap/react";
import * as React from "react";

// --- Tiptap Core Extensions ---

// --- Custom Extensions ---

// --- UI Primitives ---
import {
	ToolbarGroup,
	ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";

// --- Icons ---

// --- Hooks ---
import { useIsMobile } from "@/hooks/use-mobile";

// --- Components ---

// --- Lib ---

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

// import content from "@/components/tiptap-templates/simple/data/content.json";
import { useState } from "react";

import { publishBlog, saveBlogAsDraft } from "@/app/actions";
import { Button as ShadCnButton } from "@/components/ui/button";
import { useCustomEditor } from "@/contexts/useEditor";
import { SelectBlogs } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

type SimpleEditorProps = {
	isEditable: boolean;
	isViewing?: boolean;
	draftBlog?: SelectBlogs;
};

export function WriteEditor({
	isEditable,
	isViewing,
	draftBlog,
}: SimpleEditorProps) {
	const session = useSession();

	const {
		title,
		setTitle,
		description,
		setDescription,
		content,
		setContent,
		titleEditor,
		descriptionEditor,
		editor,
	} = useCustomEditor();
	const isMobile = useIsMobile();

	const [mobileView, setMobileView] = React.useState<
		"main" | "highlighter" | "link"
	>("main");

	// States

	const [isPublishing, setPublishing] = useState(false);
	const [isSavingAsDraft, setSaveAsDraft] = useState(false);
	const [hasInitializedDraft, setHasInitializedDraft] = useState(false);

	const handleSavingAsDraft = React.useCallback(async () => {
		try {
			setSaveAsDraft(true);
			await saveBlogAsDraft(
				{
					id: draftBlog?.id ?? undefined,
					title,
					description,
					content,
				},
				session.data?.user?.email as string
			);
		} catch (err) {
			console.error("Error in saving blog as draft", err);
		} finally {
			setSaveAsDraft(false);
		}
	}, [content, description, session.data?.user?.email, title, draftBlog]);

	const handlePublish = React.useCallback(async () => {
		try {
			setPublishing(true);
			await publishBlog(
				{
					id: draftBlog?.id ?? undefined,
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
	}, [content, description, session.data?.user?.email, title, draftBlog]);

	const shouldDisable = () =>
		titleEditor?.isEmpty || editor?.isEmpty || !isEditable;

	React.useEffect(() => {
		if (!isMobile && mobileView !== "main") {
			setMobileView("main");
		}
	}, [isMobile, mobileView]);

	React.useEffect(() => {
		const canInitialize =
			draftBlog &&
			!hasInitializedDraft &&
			titleEditor?.commands &&
			descriptionEditor?.commands &&
			editor?.commands;

		if (canInitialize) {
			setTitle(draftBlog.title);
			setDescription(draftBlog.description ?? "");
			setContent(draftBlog.content);

			if (
				titleEditor.commands &&
				descriptionEditor.commands &&
				editor.commands
			) {
				titleEditor.commands.setContent(draftBlog.title ?? "");
				descriptionEditor.commands.setContent(draftBlog.description ?? "");
				editor.commands.setContent(draftBlog.content ?? "");
			}
			setHasInitializedDraft(true);
		}
	}, [
		descriptionEditor.commands,
		draftBlog,
		editor.commands,
		hasInitializedDraft,
		setContent,
		setDescription,
		setTitle,
		titleEditor.commands,
	]);

	return (
		<>
			{!isViewing && (
				<div>
					<div className="flex gap-2 justify-end mt-3">
						<ShadCnButton
							className="disabled:cursor-not-allowed"
							disabled={shouldDisable()}
							onClick={handleSavingAsDraft}
						>
							{isSavingAsDraft ? "Saving..." : "Save as draft"}
						</ShadCnButton>
						<ShadCnButton
							className="disabled:cursor-not-allowed"
							disabled={shouldDisable()}
							onClick={handlePublish}
						>
							{isPublishing ? "Publishing..." : "Publish"}
						</ShadCnButton>
					</div>
					{/* <Toolbar
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
						<MainToolbarContent
							onHighlighterClick={() => setMobileView("highlighter")}
							onLinkClick={() => setMobileView("link")}
							isMobile={isMobile}
							isEditable={isEditable}
							isViewing={isViewing as boolean}
						/>
					</Toolbar> */}
				</div>
			)}

			<div className={cn("content-wrapper overflow-y-hidden pb-10")}>
				<EditorContent editor={titleEditor} className="title-editor-content" />
				<EditorContent
					editor={descriptionEditor}
					className="description-editor-content"
				/>
				{editor && (
					<BubbleMenu
						editor={editor}
						tippyOptions={{
							duration: 100,
							placement: "auto",
						}}
					>
						<div className="bubble-menu">
							<ToolbarGroup>
								<MarkButton type="bold" />
								<MarkButton type="italic" />
								<MarkButton type="strike" />
								<MarkButton type="code" />
								<MarkButton type="underline" />
								{/* {!isMobile ? (
                                    <ColorHighlightPopover />
                                ) : (
                                    <ColorHighlightPopoverButton onClick={onHighlighterClick} />
                                )}
                                {!isMobile ? (
                                    <LinkPopover />
                                ) : (
                                    <LinkButton onClick={onLinkClick} />
                                )} */}
							</ToolbarGroup>
							<ToolbarSeparator />
							<ToolbarGroup>
								<TextAlignButton align="left" />
								<TextAlignButton align="center" />
								<TextAlignButton align="right" />
								<TextAlignButton align="justify" />
							</ToolbarGroup>

							<ToolbarGroup>
								<MarkButton type="superscript" />
								<MarkButton type="subscript" />
							</ToolbarGroup>
						</div>
					</BubbleMenu>
				)}
				<EditorContent
					editor={editor}
					role="presentation"
					className="simple-editor-content"
				/>
			</div>
		</>
	);
}
